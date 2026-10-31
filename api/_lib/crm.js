// CRM & sản phẩm cho Dashboard quản trị. Khoá kho (tiền tố ivyw:):
//   lead:<id>          → { id, name, phone, country, residence, need, tier, note, source, ref, revenue, completedAt, createdAt, updatedAt, history[] }
//   lead-ids           → [id, ...] (mới nhất trước)
//   lead-phone:<sđt>   → id (gộp khách để không trùng)
//   products           → [{ id, cat, name_vi, name_en, desc_vi, desc_en, duration_vi, duration_en, price_vnd, image, popular, hidden, ... }]
//   img:<id>           → { type, b64 } (ảnh sản phẩm tải lên từ Dashboard)
//   lead.bookings      → [{ code, service, guests, date, time, pay: 'qr'|'cash', gross, discount, total,
//                            status: 'pending'|'claimed'|'paid'|'cancelled', createdAt, claimedAt, paidAt }]
//                         Từng đơn đặt dịch vụ trên web — dùng để đo doanh số Affiliate theo từng đơn.
//   menu-overrides     → { <id dịch vụ gốc>: { name_vi?, name_en?, price_vnd?, price_vnd_max?, image?, hidden?, updatedAt, updatedBy } }
const { randomBytes } = require('node:crypto');
const { getStore } = require('./store');
const { normPhone } = require('./users');

// 9 tầng khách hàng — mỗi tầng một màu (nền tối → chữ sáng, nền sáng → chữ tối)
const TIERS = [
  { key: 'new', label: 'Lead mới', bg: '#DDF5E6', fg: '#0F3D24' },
  { key: 'contacted', label: 'Đã liên hệ', bg: '#D5ECFB', fg: '#0B3555' },
  { key: 'consulting', label: 'Đang tư vấn', bg: '#0E8C9B', fg: '#FFFFFF' },
  { key: 'booked', label: 'Đã đặt lịch', bg: '#2E9E4F', fg: '#FFFFFF' },
  { key: 'visited', label: 'Đã đến spa', bg: '#1B4332', fg: '#F1F8F4' },
  { key: 'returning', label: 'Khách quay lại', bg: '#F2E14C', fg: '#3D3500' },
  { key: 'vip', label: 'Khách VIP', bg: '#E8912D', fg: '#2B1500' },
  { key: 'followup', label: 'Chăm sóc lại', bg: '#F9D3E3', fg: '#5C1233' },
  { key: 'lost', label: 'Không tiềm năng', bg: '#7B1E2B', fg: '#FFF1F2' },
];
const TIER_KEYS = TIERS.map((t) => t.key);
// Tầng tính là "đã dùng dịch vụ" → được tính hoa hồng Affiliate theo doanh thu
const DONE_TIERS = ['visited', 'returning', 'vip'];

const CATEGORIES = [
  { key: 'combos', label: 'IVY Special Combos' },
  { key: 'packages', label: 'Gói Hoàng Gia & Dưỡng Sinh, Da' },
  { key: 'massage', label: 'Massage Body Toàn Thân' },
  { key: 'foot', label: 'Foot Massage (Trị Liệu Chân)' },
  { key: 'nails', label: 'Chăm Sóc & Làm Đẹp Móng (Nails)' },
  { key: 'waxing', label: 'Dịch Vụ Waxing (Triệt Lông)' },
  { key: 'eyelash', label: 'Nối Mi & Tạo Hình Chân Mày' },
];
const CAT_KEYS = CATEGORIES.map((c) => c.key);

const newId = (p) => p + Date.now().toString(36) + randomBytes(4).toString('hex');
const clean = (v, max) => String(v == null ? '' : v).replace(/[\u0000-\u001f\u007f]/g, ' ').replace(/\s+/g, ' ').trim().slice(0, max);
const cleanText = (v, max) => String(v == null ? '' : v).replace(/[\u0000-\u0009\u000b-\u001f\u007f]/g, ' ').trim().slice(0, max);

// Khoá đơn giản để 2 thao tác ghi cùng lúc không giẫm lên nhau
async function withLock(name, fn) {
  const store = getStore();
  for (let i = 0; i < 40; i++) {
    if ((await store.hit('lock:' + name, 5)) === 1) {
      try {
        return await fn();
      } finally {
        await store.del('rl:lock:' + name);
      }
    }
    await new Promise((r) => setTimeout(r, 120));
  }
  throw new Error('Hệ thống đang bận, vui lòng thử lại.');
}

function validPhone(p) {
  const n = String(p || '').replace(/[\s.\-()]/g, '');
  return /^\+?\d{8,15}$/.test(n) ? n : '';
}

function leadFields(b) {
  return {
    name: clean(b.name, 80),
    phone: validPhone(b.phone),
    country: clean(b.country, 60),
    residence: clean(b.residence, 120),
    need: cleanText(b.need, 600),
  };
}

async function listLeads() {
  const store = getStore();
  const ids = (await store.get('lead-ids')) || [];
  const leads = await store.mget(ids.map((id) => 'lead:' + id));
  return leads.filter(Boolean);
}

// ---------- Đơn đặt dịch vụ (giá tính lại trên máy chủ theo Bảng giá) ----------
const QR_DISCOUNT = 0.10; // trả trước qua QR giảm 10% trên hoá đơn
const normName = (s) => String(s || '').normalize('NFC').toLowerCase().replace(/\s+/g, ' ').trim();

async function servicePrice(service) {
  const full = normName(service);
  if (!full) return 0;
  const labels = [full, normName(String(service).replace(/\s*\([^()]*(₫|đ|vnđ|vnd)\)\s*$/i, ''))];
  const overrides = await listMenuOverrides();
  for (const cat of Object.keys(MENU)) {
    for (const item of MENU[cat]) {
      const o = overrides[item.id] || {};
      // Tên ở mọi ngôn ngữ (vi, en, zh, ja, ko…) + tên Admin đã sửa
      const names = [...Object.keys(item).filter((k) => k.startsWith('name_')).map((k) => item[k]), o.name_vi, o.name_en].filter(Boolean).map(normName);
      if (labels.some((l) => names.includes(l))) return o.price_vnd || item.price_vnd || 0;
    }
  }
  return 0;
}

/** Đơn đặt từ web: tính lại giá theo Bảng giá × số khách; trả trước QR giảm 10%. */
async function bookingFrom(b) {
  const x = b && typeof b === 'object' ? b : {};
  const guests = Math.min(50, Math.max(1, parseInt(x.guests, 10) || 1));
  let unit = await servicePrice(x.service);
  if (!unit) unit = Math.min(50000000, Math.max(0, Math.round(Number(x.unit) || 0))); // dịch vụ không có trong Bảng giá
  const gross = unit * guests;
  const pay = x.pay === 'qr' ? 'qr' : 'cash';
  const discount = pay === 'qr' ? Math.round(gross * QR_DISCOUNT) : 0;
  return {
    code: clean(x.code, 20).replace(/[^\w-]/g, '') || newId('B').slice(0, 10),
    service: clean(x.service, 160).replace(/\s*\([^()]*(₫|đ)\)\s*$/, ''), // bỏ phần giá "(800.000 ₫)" ở cuối tên
    guests, date: clean(x.date, 20), time: clean(x.time, 10), pay,
    gross, discount, total: gross - discount,
    status: 'pending', createdAt: Date.now(), claimedAt: 0, paidAt: 0,
  };
}

/** Khách để lại thông tin (form web, đặt lịch) hoặc nhân viên thêm tay. Trùng số điện thoại → gộp vào khách cũ. */
async function addLead(input, { source = 'form', tier = 'new', by = '', ref = '', booking = null } = {}) {
  const f = leadFields(input);
  const store = getStore();
  const phoneKey = 'lead-phone:' + normPhone(f.phone);
  return withLock('leads', async () => {
    const now = Date.now();
    const existingId = await store.get(phoneKey);
    const existing = existingId ? await store.get('lead:' + existingId) : null;
    if (existing) {
      for (const k of ['name', 'country', 'residence']) if (f[k]) existing[k] = f[k];
      if (f.need && !String(existing.need || '').includes(f.need)) {
        existing.need = cleanText((existing.need ? existing.need + '\n' : '') + f.need, 2000);
      }
      if (ref && !existing.ref) existing.ref = ref; // giữ đối tác giới thiệu đầu tiên
      if (booking) existing.bookings = [booking, ...(existing.bookings || []).filter((x) => x.code !== booking.code)].slice(0, 50);
      if (source === 'booking' && ['new', 'contacted', 'consulting', 'followup'].includes(existing.tier)) existing.tier = 'booked';
      existing.updatedAt = now;
      existing.history = [...(existing.history || []), { at: now, by: by || source, text: 'Để lại thông tin lần nữa (' + source + ')' }].slice(-30);
      await store.set('lead:' + existing.id, existing);
      const ids = (await store.get('lead-ids')) || [];
      await store.set('lead-ids', [existing.id, ...ids.filter((x) => x !== existing.id)]);
      return existing;
    }
    const lead = {
      id: newId('L'),
      ...f,
      tier: TIER_KEYS.includes(tier) ? tier : 'new',
      note: '',
      source,
      ref: ref || '',
      revenue: 0,
      bookings: booking ? [booking] : [],
      completedAt: DONE_TIERS.includes(tier) ? now : 0,
      createdAt: now,
      updatedAt: now,
      history: [{ at: now, by: by || source, text: 'Tạo lead' }],
    };
    await store.set('lead:' + lead.id, lead);
    await store.set(phoneKey, lead.id);
    const ids = (await store.get('lead-ids')) || [];
    await store.set('lead-ids', [lead.id, ...ids].slice(0, 20000));
    return lead;
  });
}

async function updateLead(id, b, by) {
  const store = getStore();
  const lead = await store.get('lead:' + id);
  if (!lead) return null;
  const now = Date.now();
  const f = leadFields({ ...lead, ...b });
  if (b.phone !== undefined && !f.phone) throw Object.assign(new Error('Số điện thoại không hợp lệ.'), { status: 400 });
  const changes = [];
  if (b.tier && TIER_KEYS.includes(b.tier) && b.tier !== lead.tier) {
    changes.push('Chuyển tầng: ' + TIERS.find((t) => t.key === lead.tier)?.label + ' → ' + TIERS.find((t) => t.key === b.tier).label);
    lead.tier = b.tier;
    if (DONE_TIERS.includes(b.tier) && !lead.completedAt) lead.completedAt = now;
  }
  if (b.revenue !== undefined) {
    const rev = Math.max(0, Math.round(Number(String(b.revenue).replace(/[^\d]/g, '')) || 0));
    if (rev !== (lead.revenue || 0)) changes.push('Doanh thu: ' + rev.toLocaleString('vi-VN') + 'đ');
    lead.revenue = rev;
  }
  if (f.phone !== lead.phone) {
    await store.del('lead-phone:' + normPhone(lead.phone));
    await store.set('lead-phone:' + normPhone(f.phone), lead.id);
  }
  Object.assign(lead, f);
  if (b.note !== undefined) lead.note = cleanText(b.note, 2000);
  lead.updatedAt = now;
  lead.history = [...(lead.history || []), { at: now, by, text: changes.join('; ') || 'Cập nhật thông tin' }].slice(-30);
  await store.set('lead:' + id, lead);
  return lead;
}

/** Khách báo đã chuyển khoản (QR) → 'claimed'; Chủ Spa/Quản trị xác nhận → 'paid' hoặc huỷ → 'cancelled'. */
async function setBookingStatus({ phone, leadId, code, status, by = '' }) {
  const store = getStore();
  return withLock('leads', async () => {
    const id = leadId || (phone ? await store.get('lead-phone:' + normPhone(validPhone(phone))) : '');
    const lead = id ? await store.get('lead:' + id) : null;
    const bk = lead && (lead.bookings || []).find((x) => x.code === code);
    if (!bk) throw Object.assign(new Error('Không tìm thấy đơn đặt dịch vụ.'), { status: 404 });
    const now = Date.now();
    if (status === 'claimed') {
      if (bk.status !== 'pending') return { lead, booking: bk };
      bk.status = 'claimed'; bk.claimedAt = now;
    } else if (status === 'paid' || status === 'cancelled' || status === 'pending') {
      bk.status = status;
      if (status === 'paid') bk.paidAt = now;
    } else {
      throw Object.assign(new Error('Trạng thái không hợp lệ.'), { status: 400 });
    }
    const label = { claimed: 'Khách báo đã chuyển khoản', paid: 'Xác nhận đã nhận tiền', cancelled: 'Huỷ đơn', pending: 'Đặt lại chờ thanh toán' }[status];
    lead.updatedAt = now;
    lead.history = [...(lead.history || []), { at: now, by: by || 'web', text: label + ' — đơn ' + code + ' (' + bk.total.toLocaleString('vi-VN') + 'đ)' }].slice(-30);
    await store.set('lead:' + lead.id, lead);
    return { lead, booking: bk };
  });
}

async function deleteLead(id) {
  const store = getStore();
  return withLock('leads', async () => {
    const lead = await store.get('lead:' + id);
    if (lead) await store.del('lead-phone:' + normPhone(lead.phone));
    await store.del('lead:' + id);
    const ids = (await store.get('lead-ids')) || [];
    await store.set('lead-ids', ids.filter((x) => x !== id));
    return true;
  });
}

async function clearLeads() {
  const store = getStore();
  return withLock('leads', async () => {
    const leads = await listLeads();
    for (const l of leads) {
      await store.del('lead:' + l.id);
      await store.del('lead-phone:' + normPhone(l.phone));
    }
    await store.set('lead-ids', []);
    return leads.length;
  });
}

// ---------- Sản phẩm / dịch vụ đăng lên web ----------
async function listProducts() {
  return (await getStore().get('products')) || [];
}

function productFields(b) {
  const price = Math.round(Number(String(b.price_vnd || '').replace(/[^\d]/g, '')) || 0);
  const priceMax = Math.round(Number(String(b.price_vnd_max || '').replace(/[^\d]/g, '')) || 0);
  const image = clean(b.image, 300);
  return {
    cat: CAT_KEYS.includes(b.cat) ? b.cat : 'massage',
    name_vi: clean(b.name_vi, 120),
    name_en: clean(b.name_en, 120),
    desc_vi: cleanText(b.desc_vi, 600),
    desc_en: cleanText(b.desc_en, 600),
    duration_vi: clean(b.duration_vi, 40),
    duration_en: clean(b.duration_en, 40),
    price_vnd: price,
    price_vnd_max: priceMax > price ? priceMax : 0,
    // Chỉ nhận ảnh trong web (assets/…) hoặc ảnh đã tải lên Dashboard (/api/img?id=…)
    image: /^(assets\/images\/[\w.\-]+|\/api\/img\?id=[\w]+)$/.test(image) ? image : '',
    popular: Boolean(b.popular),
    hidden: Boolean(b.hidden),
  };
}

async function saveProduct(b, by) {
  return withLock('products', async () => {
    const list = await listProducts();
    const f = productFields(b);
    if (!f.name_vi) throw Object.assign(new Error('Vui lòng nhập Tên sản phẩm (tiếng Việt).'), { status: 400 });
    if (!f.price_vnd) throw Object.assign(new Error('Vui lòng nhập Giá (VNĐ).'), { status: 400 });
    const now = Date.now();
    const idx = b.id ? list.findIndex((p) => p.id === b.id) : -1;
    let item;
    if (idx >= 0) {
      item = { ...list[idx], ...f, updatedAt: now, updatedBy: by };
      list[idx] = item;
    } else {
      item = { id: newId('P'), ...f, createdAt: now, updatedAt: now, createdBy: by, updatedBy: by };
      list.unshift(item);
    }
    await getStore().set('products', list);
    return item;
  });
}

async function deleteProduct(id) {
  return withLock('products', async () => {
    const list = await listProducts();
    await getStore().set('products', list.filter((p) => p.id !== id));
    return true;
  });
}

// ---------- Ưu đãi / Promotion (ảnh + mô tả) đăng lên trang chủ ----------
//   promos → [{ id, image, badge, title_vi, title_en, desc_vi, desc_en, offer_vi, offer_en, validUntil, hidden, createdAt, ... }]
async function listPromos() {
  return (await getStore().get('promos')) || [];
}

async function savePromo(b, by) {
  return withLock('promos', async () => {
    const list = await listPromos();
    const image = clean(b.image, 300);
    const f = {
      image: /^(assets\/images\/[\w.\-]+|\/api\/img\?id=[\w]+)$/.test(image) ? image : '',
      badge: clean(b.badge, 24),
      title_vi: clean(b.title_vi, 120),
      title_en: clean(b.title_en, 120),
      desc_vi: cleanText(b.desc_vi, 1000),
      desc_en: cleanText(b.desc_en, 1000),
      offer_vi: clean(b.offer_vi, 120),
      offer_en: clean(b.offer_en, 120),
      validUntil: /^\d{4}-\d{2}-\d{2}$/.test(String(b.validUntil || '')) ? b.validUntil : '',
      hidden: Boolean(b.hidden),
    };
    if (!f.image) throw Object.assign(new Error('Vui lòng tải ảnh hoặc chọn ảnh cho ưu đãi.'), { status: 400 });
    if (!f.title_vi) throw Object.assign(new Error('Vui lòng nhập Tiêu đề ưu đãi (tiếng Việt).'), { status: 400 });
    if (!f.desc_vi) throw Object.assign(new Error('Vui lòng nhập Mô tả ưu đãi (tiếng Việt).'), { status: 400 });
    const now = Date.now();
    const idx = b.id ? list.findIndex((p) => p.id === b.id) : -1;
    let item;
    if (idx >= 0) {
      item = { ...list[idx], ...f, updatedAt: now, updatedBy: by };
      list[idx] = item;
    } else {
      item = { id: newId('K'), ...f, createdAt: now, updatedAt: now, createdBy: by, updatedBy: by };
      list.unshift(item);
    }
    await getStore().set('promos', list.slice(0, 60));
    return item;
  });
}

async function deletePromo(id) {
  return withLock('promos', async () => {
    const list = await listPromos();
    await getStore().set('promos', list.filter((p) => p.id !== id));
    return true;
  });
}

// ---------- Bảng giá gốc (js/menu-data.js): Quản trị sửa giá / tên / ảnh / ẩn ----------
const MENU = require('../../js/menu-data.js');
function menuItem(id) {
  for (const cat of Object.keys(MENU)) {
    const item = MENU[cat].find((x) => x.id === id);
    if (item) return { cat, item };
  }
  return null;
}

async function listMenuOverrides() {
  return (await getStore().get('menu-overrides')) || {};
}

/** Chỉ lưu những gì khác bản gốc; không còn gì khác → xoá bản sửa (về bản gốc). */
async function saveMenuOverride(b, by) {
  const found = menuItem(String(b.id || ''));
  if (!found) throw Object.assign(new Error('Không tìm thấy dịch vụ này trong Bảng giá.'), { status: 404 });
  const orig = found.item;
  const name_vi = clean(b.name_vi, 120);
  const name_en = clean(b.name_en, 120);
  const price = Math.round(Number(String(b.price_vnd || '').replace(/[^\d]/g, '')) || 0);
  const priceMax = Math.round(Number(String(b.price_vnd_max || '').replace(/[^\d]/g, '')) || 0);
  const image = clean(b.image, 300);
  if (!name_vi) throw Object.assign(new Error('Vui lòng nhập Tên dịch vụ (tiếng Việt).'), { status: 400 });
  if (!price) throw Object.assign(new Error('Vui lòng nhập Giá (VNĐ).'), { status: 400 });
  if (image && !/^(assets\/images\/[\w.\-]+|\/api\/img\?id=[\w]+)$/.test(image)) throw Object.assign(new Error('Ảnh không hợp lệ.'), { status: 400 });
  const o = {};
  if (name_vi !== orig.name_vi) o.name_vi = name_vi;
  if (name_en && name_en !== orig.name_en) o.name_en = name_en;
  if (price !== orig.price_vnd) o.price_vnd = price;
  const max = priceMax > price ? priceMax : 0;
  if (max !== (orig.price_vnd_max || 0)) o.price_vnd_max = max;
  if (image && image !== orig.image) o.image = image;
  if (b.hidden) o.hidden = true;
  return withLock('menu', async () => {
    const all = await listMenuOverrides();
    if (Object.keys(o).length) all[orig.id] = { ...o, updatedAt: Date.now(), updatedBy: by };
    else delete all[orig.id];
    await getStore().set('menu-overrides', all);
    return all[orig.id] || null;
  });
}

async function resetMenuOverride(id) {
  return withLock('menu', async () => {
    const all = await listMenuOverrides();
    delete all[String(id || '')];
    await getStore().set('menu-overrides', all);
    return true;
  });
}

async function saveImage(dataUrl) {
  const m = /^data:(image\/(?:jpeg|png|webp));base64,([A-Za-z0-9+/=]+)$/.exec(String(dataUrl || ''));
  if (!m) throw Object.assign(new Error('Ảnh không hợp lệ (chỉ nhận JPG, PNG, WEBP).'), { status: 400 });
  if (m[2].length > 950000) throw Object.assign(new Error('Ảnh quá lớn, vui lòng chọn ảnh nhỏ hơn.'), { status: 400 });
  const id = newId('I');
  await getStore().set('img:' + id, { type: m[1], b64: m[2] });
  return '/api/img?id=' + id;
}

module.exports = {
  TIERS, TIER_KEYS, DONE_TIERS, CATEGORIES,
  listLeads, addLead, updateLead, deleteLead, clearLeads, bookingFrom, setBookingStatus, QR_DISCOUNT,
  listProducts, saveProduct, deleteProduct, saveImage,
  listPromos, savePromo, deletePromo,
  listMenuOverrides, saveMenuOverride, resetMenuOverride,
};
