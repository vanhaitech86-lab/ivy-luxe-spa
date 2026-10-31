// Đối tác Affiliate — dữ liệu thật. Khoá kho (tiền tố ivyw:):
//   aff:<email>               → { email, name, phone, type, code, rate, bankName, bankNum, bankHolder, createdAt }
//   aff-code:<CODE>           → email
//   aff-list                  → [email, ...]
//   affc:<CODE>:<YYYY-MM-DD>  → số lượt click trong ngày (giữ 120 ngày)
//   affc:<CODE>:total         → tổng lượt click
//   aff-pay:<email>           → [{ id, amount, status: 'pending'|'paid'|'rejected', createdAt, doneAt, bank }]
//   aff-members:<CODE>        → [email, ...] thành viên đăng ký tài khoản qua link của đối tác (F1 trực tiếp)
// Hoa hồng 1 TẦNG DUY NHẤT: doanh thu khách (spa nhập trong CRM khi khách đã đến) × 10%.
// Không có hoa hồng tầng 2 (F2): đối tác chỉ thấy và chỉ hưởng từ người đến trực tiếp qua link của mình.
// Trong 15 ngày đầu sau khi khách dùng dịch vụ: "chờ đối soát"; sau đó mới rút được.
const { randomBytes } = require('node:crypto');
const { getStore } = require('./store');
const C = require('./crm');

const HOLD_DAYS = 15;
const COMMISSION_RATE = 10; // cố định cho mọi đối tác
const DEFAULT_RATE = COMMISSION_RATE;
const REF_COOKIE = 'ivy_ref';
const MIN_PAYOUT = 200000;
const TYPES = {
  individual: 'Cá nhân / KOL',
  hotel: 'Khách sạn / Homestay',
  guide: 'Hướng dẫn viên du lịch',
  agency: 'Đại lý du lịch',
  creator: 'KOL / Content Creator / Reviewer',
  driver: 'Tài xế / Grab',
  other: 'Khác',
};

const clean = (v, max) => String(v == null ? '' : v).replace(/[\u0000-\u001f\u007f<>]/g, ' ').replace(/\s+/g, ' ').trim().slice(0, max);

/** Mã giới thiệu: chữ hoa, số, gạch dưới; bỏ tiền tố IVY- nếu có. */
function normCode(raw) {
  return String(raw || '').trim().toUpperCase().replace(/^IVY-/, '').replace(/[^A-Z0-9_]/g, '').slice(0, 24);
}
const dayKey = (t) => new Date(t + 7 * 3600000).toISOString().slice(0, 10); // ngày theo giờ Việt Nam

async function getPartner(email) {
  return email ? getStore().get('aff:' + String(email).toLowerCase()) : null;
}
async function partnerByCode(code) {
  const c = normCode(code);
  if (!c) return null;
  const email = await getStore().get('aff-code:' + c);
  return email ? getPartner(email) : null;
}

// byAdmin: Chủ Spa / Quản trị tạo link cho tài khoản có sẵn; phoneOptional: tài khoản đã đăng nhập tự kích hoạt.
// Hai trường hợp này số điện thoại không bắt buộc.
async function createPartner(email, b, { byAdmin = false, phoneOptional = Boolean(byAdmin) } = {}) {
  const store = getStore();
  const name = clean(b.name, 80);
  const phone = clean(b.phone, 20);
  if (name.length < 2) throw Object.assign(new Error('Vui lòng nhập Tên đối tác / Họ tên.'), { status: 400 });
  if ((phone || !phoneOptional) && !/^\+?\d{8,15}$/.test(phone.replace(/[\s.\-()]/g, ''))) throw Object.assign(new Error('Số điện thoại chưa đúng.'), { status: 400 });
  let code = normCode(b.code) || normCode(email.replace(/^u:/, '').split('@')[0]);
  if (code.length < 3) code = (code + 'IVY' + randomBytes(2).toString('hex').toUpperCase()).slice(0, 12);
  const existing = await getPartner(email);
  const owner = await store.get('aff-code:' + code);
  if (owner && owner !== email) {
    if (normCode(b.code)) throw Object.assign(new Error('Mã giới thiệu "' + code + '" đã có người dùng, vui lòng chọn mã khác.'), { status: 409 });
    code = (code.slice(0, 18) + randomBytes(2).toString('hex').toUpperCase());
  }
  const partner = {
    ...(existing || {}),
    email,
    name,
    phone,
    type: TYPES[b.type] ? b.type : 'individual',
    code: existing && existing.code ? existing.code : code, // giữ mã cũ để link đã chia sẻ không hỏng
    createdBy: existing && existing.createdBy ? existing.createdBy : (byAdmin ? byAdmin : undefined),
    rate: COMMISSION_RATE,
    createdAt: existing && existing.createdAt ? existing.createdAt : Date.now(),
  };
  await store.set('aff:' + email, partner);
  await store.set('aff-code:' + partner.code, email);
  const list = (await store.get('aff-list')) || [];
  if (!list.includes(email)) await store.set('aff-list', [email, ...list]);
  return partner;
}

async function savePartner(p) {
  await getStore().set('aff:' + p.email, p);
}

/** Đếm click (mỗi IP chỉ tính 1 lần / mã / ngày). */
async function recordClick(code, ip) {
  const p = await partnerByCode(code);
  if (!p) return false;
  const store = getStore();
  const today = dayKey(Date.now());
  if ((await store.hit('affclick:' + p.code + ':' + today + ':' + ip, 86400)) > 1) return true;
  await store.incr('affc:' + p.code + ':' + today, 120 * 86400);
  await store.incr('affc:' + p.code + ':total');
  return true;
}

async function clickSeries(code, days = 90) {
  const keys = [];
  const labels = [];
  for (let i = days - 1; i >= 0; i--) {
    const d = dayKey(Date.now() - i * 86400000);
    labels.push(d);
    keys.push('affc:' + code + ':' + d);
  }
  const vals = await getStore().mget([...keys, 'affc:' + code + ':total']);
  const total = Number(vals.pop()) || 0;
  return { total, days: labels.map((d, i) => ({ d, n: Number(vals[i]) || 0 })) };
}

function maskName(name) {
  const parts = String(name || '').trim().split(/\s+/);
  if (!parts[0]) return 'Khách';
  const last = parts[parts.length - 1];
  return (parts.length > 1 ? parts[0] + ' ' : '') + last.charAt(0) + '***';
}
function maskPhone(phone) {
  const p = String(phone || '');
  return p.length > 6 ? p.slice(0, 4) + '****' + p.slice(-3) : '****';
}

const pct = (n) => Math.round((n * COMMISSION_RATE) / 100);

/** Mỗi đơn đặt dịch vụ trên web của khách F1 = 1 dòng doanh số (số tiền theo hoá đơn). */
function bookingRow(l, bk, now) {
  const done = bk.status === 'paid' || (C.DONE_TIERS.includes(l.tier) && bk.status !== 'cancelled');
  const doneAt = bk.paidAt || l.completedAt || bk.createdAt;
  const releaseAt = doneAt + HOLD_DAYS * 86400000;
  let status, state;
  if (bk.status === 'cancelled') { status = 'Đơn đã huỷ'; state = 'cancel'; }
  else if (done) { if (now < releaseAt) { status = 'Chờ đối soát (15 ngày)'; state = 'hold'; } else { status = 'Đã hoàn tất'; state = 'done'; } }
  else if (bk.status === 'claimed') { status = 'Khách đã chuyển khoản – chờ spa xác nhận'; state = 'wait'; }
  else if (bk.pay === 'qr') { status = 'Đã đặt lịch – chờ thanh toán QR'; state = 'wait'; }
  else { status = 'Đã đặt lịch – thanh toán tại quầy'; state = 'wait'; }
  return {
    id: bk.code, createdAt: bk.createdAt,
    customer: maskName(l.name) + (l.country ? ' · ' + l.country : ''), phone: maskPhone(l.phone),
    service: bk.service + (bk.guests > 1 ? ' × ' + bk.guests : ''),
    amount: state === 'cancel' ? 0 : bk.total, // doanh số theo hoá đơn (đã trừ 10% nếu trả trước QR)
    commission: done ? pct(bk.total) : 0, rate: COMMISSION_RATE,
    confirmed: done, status, state, releaseAt: state === 'hold' ? releaseAt : 0,
  };
}

/** Đơn của đối tác = khách trong CRM được gắn mã giới thiệu của đối tác. */
function buildOrders(partner, leads) {
  const now = Date.now();
  const rate = COMMISSION_RATE;
  const mine = leads.filter((l) => l.ref === partner.code);
  const rows = [];
  mine.filter((l) => (l.bookings || []).length).forEach((l) => l.bookings.forEach((bk) => rows.push(bookingRow(l, bk, now))));
  return rows.concat(mine.filter((l) => !(l.bookings || []).length).map((l) => {
    const done = C.DONE_TIERS.includes(l.tier);
    const revenue = l.revenue || 0;
    const commission = done && revenue ? Math.round((revenue * rate) / 100) : 0;
    const releaseAt = (l.completedAt || l.updatedAt || l.createdAt) + HOLD_DAYS * 86400000;
    let status, state;
    if (l.tier === 'lost') { status = 'Khách huỷ / không đến'; state = 'cancel'; }
    else if (done && revenue) {
      if (now < releaseAt) { status = 'Chờ đối soát (15 ngày)'; state = 'hold'; } else { status = 'Đã hoàn tất'; state = 'done'; }
    } else if (done) { status = 'Đã đến spa – chờ spa cập nhật giá trị'; state = 'wait'; }
    else if (l.tier === 'booked') { status = 'Đã đặt lịch – chờ khách đến'; state = 'wait'; }
    else { status = 'Khách tiềm năng – spa đang tư vấn'; state = 'lead'; }
    return {
      id: 'IVY-' + String(l.id).slice(-6).toUpperCase(),
      createdAt: l.createdAt,
      customer: maskName(l.name) + (l.country ? ' · ' + l.country : ''),
      phone: maskPhone(l.phone),
      service: String(l.need || 'Liên hệ tư vấn').slice(0, 140),
      amount: done ? revenue : 0,
      commission,
      rate,
      confirmed: done && revenue > 0,
      status,
      state,
      releaseAt: state === 'hold' ? releaseAt : 0,
    };
  })).sort((a, b) => b.createdAt - a.createdAt);
}

/** Doanh số Affiliate: tổng giá trị đơn khách F1 đã đặt, phần đã xác nhận, tháng này, 6 tháng gần nhất. */
function salesStats(orders) {
  const live = orders.filter((o) => o.state !== 'cancel' && o.amount > 0);
  const sum = (arr) => arr.reduce((t, o) => t + o.amount, 0);
  const monthKey = (t) => dayKey(t).slice(0, 7);
  const thisMonth = monthKey(Date.now());
  const months = [];
  const d = new Date(thisMonth + '-01T00:00:00+07:00');
  for (let i = 5; i >= 0; i--) {
    const m = new Date(d.getFullYear(), d.getMonth() - i, 15);
    months.push(m.getFullYear() + '-' + String(m.getMonth() + 1).padStart(2, '0'));
  }
  return {
    total: sum(live),
    confirmed: sum(live.filter((o) => o.confirmed)),
    month: sum(live.filter((o) => monthKey(o.createdAt) === thisMonth)),
    orders: live.length,
    series: months.map((m) => ({
      m,
      total: sum(live.filter((o) => monthKey(o.createdAt) === m)),
      confirmed: sum(live.filter((o) => o.confirmed && monthKey(o.createdAt) === m)),
    })),
  };
}

function maskEmail(email) {
  const e = String(email || '');
  if (e.startsWith('u:')) return 'Tài khoản ' + e.slice(2, 4).toUpperCase() + '***';
  const [name, domain] = e.split('@');
  return (name || '').slice(0, 2) + '***@' + (domain || '');
}

/** Mã đối tác từ cookie ivy_ref (đặt khi khách mở link ?ref=MÃ, giữ 30 ngày); không tự giới thiệu chính mình. */
async function refFromCookie(req, email) {
  const raw = String(req.headers.cookie || '').split(';').map((c) => c.trim()).find((c) => c.startsWith(REF_COOKIE + '='));
  if (!raw) return '';
  const p = await partnerByCode(decodeURIComponent(raw.slice(REF_COOKIE.length + 1)));
  return p && p.email !== String(email || '').toLowerCase() ? p.code : '';
}

/** Ghi nhận 1 thành viên F1 (tài khoản đã xác nhận) cho đối tác có mã code. */
async function addMember(code, email) {
  const c = normCode(code);
  if (!c || !email) return;
  const store = getStore();
  const list = (await store.get('aff-members:' + c)) || [];
  if (!list.includes(email)) await store.set('aff-members:' + c, [email, ...list].slice(0, 5000));
}

/** Thành viên F1 của đối tác (che bớt tên, Gmail). */
async function members(partner) {
  const store = getStore();
  const emails = (await store.get('aff-members:' + partner.code)) || [];
  if (!emails.length) return [];
  const [users, partners] = await Promise.all([
    store.mget(emails.map((e) => 'user:' + e)),
    store.mget(emails.map((e) => 'aff:' + e)),
  ]);
  return emails.map((e, i) => users[i] && {
    name: maskName(users[i].name),
    email: maskEmail(e),
    joinedAt: users[i].verifiedAt || users[i].createdAt || 0,
    via: users[i].googleSub ? 'Google' : 'Gmail',
    partner: Boolean(partners[i]),
  }).filter(Boolean).sort((a, b) => b.joinedAt - a.joinedAt);
}

async function getPayouts(email) {
  return (await getStore().get('aff-pay:' + email)) || [];
}

function summarize(orders, payouts) {
  const sum = (arr, f) => arr.reduce((s, x) => s + f(x), 0);
  const earned = sum(orders.filter((o) => o.state === 'done'), (o) => o.commission);
  const hold = sum(orders.filter((o) => o.state === 'hold'), (o) => o.commission);
  const paid = sum(payouts.filter((p) => p.status === 'paid'), (p) => p.amount);
  const requested = sum(payouts.filter((p) => p.status === 'pending'), (p) => p.amount);
  return {
    ordersSuccess: orders.filter((o) => o.state === 'done' || o.state === 'hold').length,
    ordersPending: orders.filter((o) => o.state === 'wait' || o.state === 'lead').length,
    pendingAmount: hold,
    earnedAmount: earned,
    paidAmount: paid,
    requestedAmount: requested,
    availableAmount: Math.max(0, earned - paid - requested),
  };
}

/** Toàn bộ số liệu Dashboard của 1 đối tác. */
async function dashboard(partner) {
  const [leads, clicks, payouts, f1] = await Promise.all([C.listLeads(), clickSeries(partner.code), getPayouts(partner.email), members(partner)]);
  const orders = buildOrders(partner, leads);
  const monthStart = dayKey(Date.now()).slice(0, 8) + '01';
  const monthClicks = clicks.days.filter((d) => d.d >= monthStart).reduce((s, d) => s + d.n, 0);
  return { orders, members: f1, clicks: { ...clicks, month: monthClicks }, payouts, summary: summarize(orders, payouts), sales: salesStats(orders) };
}

/** Bảng vinh danh tháng này — Top 20 theo số đơn rồi lượt click. Chỉ hiện tên/ảnh hiển thị, không lộ doanh thu hay hoa hồng. */
async function ranking(meEmail) {
  const store = getStore();
  const emails = (await store.get('aff-list')) || [];
  const partners = (await store.mget(emails.map((e) => 'aff:' + e))).filter(Boolean);
  const leads = await C.listLeads();
  const today = dayKey(Date.now());
  const monthStart = new Date(today.slice(0, 8) + '01T00:00:00+07:00').getTime();
  const dayKeys = [];
  for (let t = monthStart; dayKey(t) <= today; t += 86400000) dayKeys.push(dayKey(t));
  const rows = await Promise.all(partners.map(async (p) => {
    const orders = buildOrders(p, leads).filter((o) => o.state !== 'cancel' && o.createdAt >= monthStart);
    const clicks = (await store.mget(dayKeys.map((d) => 'affc:' + p.code + ':' + d))).reduce((t, n) => t + (Number(n) || 0), 0);
    const me = p.email === meEmail;
    return {
      me,
      name: p.displayName || (me ? p.name : maskName(p.name)),
      avatar: p.avatar || '',
      type: TYPES[p.type] || '',
      orders: orders.length,
      clicks,
    };
  }));
  const sorted = rows.filter((r) => r.orders > 0 || r.clicks > 0 || r.me).sort((a, b) => b.orders - a.orders || b.clicks - a.clicks);
  const top = sorted.slice(0, 20).map((r) => ({ ...r, rank: sorted.indexOf(r) + 1 }));
  const mine = sorted.find((r) => r.me);
  if (mine && !top.some((r) => r.me)) top.push({ ...mine, rank: sorted.indexOf(mine) + 1 }); // ngoài Top 20 vẫn thấy hạng của mình
  return top;
}

async function requestPayout(partner, amount) {
  const store = getStore();
  amount = Math.round(Number(amount) || 0);
  if (!partner.bankName || !partner.bankNum || !partner.bankHolder) throw Object.assign(new Error('Vui lòng cập nhật tài khoản ngân hàng trước khi rút tiền.'), { status: 400 });
  const { summary } = await dashboard(partner);
  if (amount < MIN_PAYOUT) throw Object.assign(new Error('Số tiền rút tối thiểu là 200.000đ.'), { status: 400 });
  if (amount > summary.availableAmount) throw Object.assign(new Error('Số dư khả dụng chỉ còn ' + summary.availableAmount.toLocaleString('vi-VN') + 'đ.'), { status: 400 });
  const list = await getPayouts(partner.email);
  const item = {
    id: 'RUT-' + Date.now().toString(36).toUpperCase(),
    amount,
    status: 'pending',
    createdAt: Date.now(),
    bank: { bankName: partner.bankName, bankNum: partner.bankNum, bankHolder: partner.bankHolder },
  };
  await store.set('aff-pay:' + partner.email, [item, ...list]);
  return item;
}

/** Danh sách đối tác cho Dashboard quản trị. */
async function adminList() {
  const store = getStore();
  const emails = (await store.get('aff-list')) || [];
  const partners = (await store.mget(emails.map((e) => 'aff:' + e))).filter(Boolean);
  const leads = await C.listLeads();
  return Promise.all(partners.map(async (p) => {
    const payouts = await getPayouts(p.email);
    const orders = buildOrders(p, leads);
    const clicks = Number(await store.get('affc:' + p.code + ':total')) || 0;
    const f1 = ((await store.get('aff-members:' + p.code)) || []).length;
    return { ...p, rate: COMMISSION_RATE, members: f1, sales: salesStats(orders), typeLabel: TYPES[p.type] || '', clicks, leads: orders.length, summary: summarize(orders, payouts), payouts };
  }));
}

async function setPayoutStatus(email, id, status) {
  const list = await getPayouts(email);
  const item = list.find((x) => x.id === id);
  if (!item) throw Object.assign(new Error('Không tìm thấy yêu cầu rút tiền.'), { status: 404 });
  if (!['paid', 'rejected'].includes(status)) throw Object.assign(new Error('Trạng thái không hợp lệ.'), { status: 400 });
  item.status = status;
  item.doneAt = Date.now();
  await getStore().set('aff-pay:' + email, list);
  return item;
}

module.exports = {
  TYPES, HOLD_DAYS, DEFAULT_RATE, COMMISSION_RATE, MIN_PAYOUT, REF_COOKIE,
  refFromCookie, addMember, members,
  normCode, getPartner, partnerByCode, createPartner, savePartner,
  recordClick, dashboard, ranking, requestPayout, adminList, setPayoutStatus, clean,
};
