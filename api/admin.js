// /api/admin?a=… — Dashboard quản trị (cần đăng nhập web bằng tài khoản được cấp quyền).
// Quyền: admin (xem toàn bộ CRM, đăng sản phẩm/ưu đãi, tạo link Affiliate) < owner (+ cấp quyền, xoá toàn bộ dữ liệu).
// Vai trò staff cũ không còn vào được Dashboard — CRM chỉ dành cho Chủ Spa và Quản trị viên.
const H = require('./_lib/http');
const U = require('./_lib/users');
const C = require('./_lib/crm');
const A = require('./_lib/aff');
const { getStore } = require('./_lib/store');
const { currentUser } = require('./account');

const routes = {
  // [phương thức, quyền tối thiểu, xử lý]
  me: ['GET', 'admin', async (ctx) => ({ user: U.publicUser(ctx.user, ctx.role), tiers: C.TIERS, categories: C.CATEGORIES })],

  leads: ['GET', 'admin', async () => ({ leads: await C.listLeads() })],
  'lead-save': ['POST', 'admin', async (ctx, b) => {
    if (b.id) {
      const lead = await C.updateLead(String(b.id), b, ctx.user.email);
      if (!lead) throw Object.assign(new Error('Không tìm thấy khách.'), { status: 404 });
      return { lead };
    }
    if (!String(b.name || '').trim()) throw Object.assign(new Error('Vui lòng nhập Họ tên.'), { status: 400 });
    if (!/^\+?\d{8,15}$/.test(String(b.phone || '').replace(/[\s.\-()]/g, ''))) throw Object.assign(new Error('Số điện thoại không hợp lệ.'), { status: 400 });
    return { lead: await C.addLead(b, { source: 'admin', tier: b.tier, by: ctx.user.email }) };
  }],
  // Đơn đặt dịch vụ: xác nhận đã nhận tiền (paid) / huỷ (cancelled) / đặt lại chờ (pending)
  'booking-set': ['POST', 'admin', async (ctx, b) => {
    const r = await C.setBookingStatus({ leadId: String(b.leadId || ''), code: String(b.code || ''), status: String(b.status || ''), by: ctx.user.email });
    return { lead: r.lead };
  }],
  'lead-delete': ['POST', 'admin', async (ctx, b) => ({ ok: await C.deleteLead(String(b.id || '')) })],

  products: ['GET', 'admin', async () => ({ products: await C.listProducts() })],
  'product-save': ['POST', 'admin', async (ctx, b) => ({ product: await C.saveProduct(b, ctx.user.email) })],
  'product-delete': ['POST', 'admin', async (ctx, b) => ({ ok: await C.deleteProduct(String(b.id || '')) })],
  menu: ['GET', 'admin', async () => ({ overrides: await C.listMenuOverrides() })],
  'menu-save': ['POST', 'admin', async (ctx, b) => ({ override: await C.saveMenuOverride(b, ctx.user.email) })],
  'menu-reset': ['POST', 'admin', async (ctx, b) => ({ ok: await C.resetMenuOverride(b.id) })],
  promos: ['GET', 'admin', async () => ({ promos: await C.listPromos() })],
  'promo-save': ['POST', 'admin', async (ctx, b) => ({ promo: await C.savePromo(b, ctx.user.email) })],
  'promo-delete': ['POST', 'admin', async (ctx, b) => ({ ok: await C.deletePromo(String(b.id || '')) })],
  image: ['POST', 'admin', async (ctx, b) => ({ url: await C.saveImage(b.dataUrl) })],

  affiliates: ['GET', 'admin', async () => ({ partners: await A.adminList(), holdDays: A.HOLD_DAYS, types: A.TYPES, rate: A.COMMISSION_RATE })],
  // Tài khoản đã đăng ký trên web (Gmail đã xác nhận + tài khoản đăng nhập bằng tên) để tạo link Affiliate
  'aff-accounts': ['GET', 'admin', async () => {
    const users = await getStore().scanValues('user:');
    const partners = new Set(((await getStore().get('aff-list')) || []).map(String));
    const accounts = users.filter((u) => u && u.email && (u.verified || u.googleSub)).map((u) => ({
      email: u.email, name: u.name || '', phone: u.phone || '', username: Boolean(u.username),
      label: u.username ? 'Tên đăng nhập: ' + u.name : u.email, partner: partners.has(u.email),
    }));
    return { accounts: accounts.sort((a, b) => Number(a.partner) - Number(b.partner) || a.label.localeCompare(b.label)) };
  }],
  'aff-create': ['POST', 'admin', async (ctx, b) => {
    const email = String(b.email || '').trim().toLowerCase();
    const user = await U.getUser(email);
    if (!user || !(user.verified || user.googleSub)) throw Object.assign(new Error('Tài khoản này chưa đăng ký hoặc chưa xác nhận Gmail.'), { status: 404 });
    const partner = await A.createPartner(user.email, { ...b, name: b.name || user.name, phone: b.phone || user.phone || '' }, { byAdmin: ctx.user.email });
    return { partner };
  }],
  'payout-set': ['POST', 'owner', async (ctx, b) => ({ payout: await A.setPayoutStatus(U.normEmail(b.email), String(b.id || ''), b.status) })],

  // Bot Telegram: kiểm tra cấu hình + kết nối webhook (token đọc từ biến môi trường, không bao giờ trả ra trình duyệt)
  'telegram-status': ['GET', 'owner', async () => {
    const hasToken = Boolean(process.env.TELEGRAM_BOT_TOKEN);
    const hasAI = Boolean(process.env.ANTHROPIC_API_KEY || process.env.GEMINI_API_KEY);
    const ai = process.env.ANTHROPIC_API_KEY ? 'Claude' : process.env.GEMINI_API_KEY ? 'Gemini (' + (process.env.GEMINI_MODEL || 'gemini-3.5-flash') + ')' : '';
    let webhook = null;
    if (hasToken) {
      const { tg } = require('./telegram');
      const info = await tg('getWebhookInfo', {});
      webhook = info && info.result ? { url: info.result.url || '', pending: info.result.pending_update_count || 0, lastError: info.result.last_error_message || '' } : null;
    }
    return { hasToken, hasAI, ai, webhook, username: await getStore().get('tg-bot-username') };
  }],
  // Bot báo tin quản trị (Dealwebsite, NOTIFY_BOT_TOKEN)
  'notify-status': ['GET', 'owner', async () => {
    const N = require('./_lib/notify');
    const hasToken = Boolean(N.TOKEN());
    let webhook = null;
    if (hasToken) {
      const info = await N.tg('getWebhookInfo', {});
      webhook = info && info.result ? { url: info.result.url || '', lastError: info.result.last_error_message || '' } : null;
    }
    return { hasToken, webhook, username: await getStore().get('nb-username'), chats: await N.listChats() };
  }],
  'notify-setup': ['POST', 'owner', async (ctx, b, req) => {
    const N = require('./_lib/notify');
    if (!N.TOKEN()) throw Object.assign(new Error('Chưa cài NOTIFY_BOT_TOKEN trên Vercel.'), { status: 400 });
    const me = await N.tg('getMe', {});
    if (!me.ok) throw Object.assign(new Error('Token bot báo tin không đúng: ' + (me.description || '')), { status: 400 });
    await getStore().set('nb-username', me.result.username);
    const hook = await N.tg('setWebhook', { url: H.origin(req) + '/api/notify-bot', secret_token: N.webhookSecret(), allowed_updates: ['message'], drop_pending_updates: true });
    if (!hook.ok) throw Object.assign(new Error('Telegram từ chối webhook: ' + (hook.description || '')), { status: 400 });
    await N.tg('setMyCommands', { commands: [{ command: 'ketnoi', description: 'Kết nối nhóm nhận tin báo (kèm mã)' }, { command: 'huy', description: 'Ngừng nhận tin báo' }] });
    return { ok: true, username: me.result.username };
  }],
  'notify-pair': ['POST', 'owner', async () => {
    const code = String(require('node:crypto').randomInt(100000, 1000000));
    await getStore().set('notify-pair:' + code, 1, 900);
    return { code };
  }],
  'notify-remove': ['POST', 'owner', async (ctx, b) => {
    const N = require('./_lib/notify');
    const chats = await N.listChats();
    await getStore().set('notify-chats', chats.filter((c) => String(c.id) !== String(b.id)));
    return { ok: true };
  }],
  'notify-test': ['POST', 'owner', async (ctx) => {
    const N = require('./_lib/notify');
    await N.notify('🔔 Tin thử từ Dashboard IVYLUXE SPA & NAIL (' + (ctx.user.name || ctx.user.email) + '). Nhóm này đang nhận thông báo bình thường.');
    return { ok: true };
  }],
  'telegram-setup': ['POST', 'owner', async (ctx, b, req) => {
    if (!process.env.TELEGRAM_BOT_TOKEN) throw Object.assign(new Error('Chưa cài TELEGRAM_BOT_TOKEN trên Vercel.'), { status: 400 });
    const { tg, webhookSecret } = require('./telegram');
    const me = await tg('getMe', {});
    if (!me.ok) throw Object.assign(new Error('Token bot Telegram không đúng: ' + (me.description || '')), { status: 400 });
    await getStore().set('tg-bot-username', me.result.username);
    // Máy chủ Telegram (nước ngoài) có lúc không tra được DNS tên miền .vn → thử tiếp địa chỉ Vercel của cùng website
    const bases = [...new Set([H.origin(req), 'https://ivyluxe-web.vercel.app'])];
    const errors = [];
    let url = '';
    for (const base of bases) {
      const hook = await tg('setWebhook', {
        url: base + '/api/telegram',
        secret_token: webhookSecret(),
        allowed_updates: ['message'],
        drop_pending_updates: true,
      });
      if (hook.ok) { url = base + '/api/telegram'; break; }
      errors.push(base + ' → ' + (hook.description || JSON.stringify(hook).slice(0, 200)));
    }
    if (!url) {
      console.error('[telegram-setup]', errors.join(' | '));
      throw Object.assign(new Error('Telegram từ chối webhook: ' + errors.join(' | ')), { status: 400 });
    }
    await tg('setMyCommands', { commands: [{ command: 'start', description: 'Bắt đầu tư vấn với IVYLUXE SPA & NAIL' }] });
    return { ok: true, username: me.result.username, url, errors };
  }],
  roles: ['GET', 'owner', async () => {
    const roles = await U.getRoles();
    const entries = await Promise.all(Object.entries(roles).map(async ([email, role]) => {
      if (!email.startsWith('u:')) return { email, role };
      const u = await U.getUser(email);
      return { email, role, username: u ? u.name : email.slice(2) };
    }));
    return { owners: U.ownerEmails(), roles: entries.sort((a, b) => a.email.localeCompare(b.email)) };
  }],
  // Tài khoản quản trị đăng nhập bằng TÊN + mật khẩu (dùng chung cho nhiều nhân viên). Tạo lại cùng tên = đổi mật khẩu.
  'account-create': ['POST', 'owner', async (ctx, b) => {
    const username = String(b.username || '').trim();
    const password = String(b.password || '');
    if (!U.USERNAME_RE.test(username)) throw Object.assign(new Error('Tên đăng nhập 3–30 ký tự, chỉ gồm chữ không dấu, số, dấu . _ -'), { status: 400 });
    if (password.length < 8 || !/[A-Za-z]/.test(password) || !/\d/.test(password)) throw Object.assign(new Error('Mật khẩu tối thiểu 8 ký tự, có cả chữ và số.'), { status: 400 });
    if (password !== String(b.confirm || '')) throw Object.assign(new Error('Mật khẩu nhập lại không khớp.'), { status: 400 });
    const role = 'admin';
    const key = U.usernameKey(username);
    const existing = await U.getUser(key);
    await getStore().set('user:' + key, {
      email: key, name: username, phone: '', username: true, hash: H.hashPassword(password), verified: true,
      createdAt: existing ? existing.createdAt : Date.now(), createdBy: ctx.user.email,
    });
    const roles = await U.getRoles();
    roles[key] = role;
    await getStore().set('roles', roles);
    return { ok: true, updated: Boolean(existing) };
  }],
  'account-delete': ['POST', 'owner', async (ctx, b) => {
    const key = String(b.email || '');
    if (!key.startsWith('u:')) throw Object.assign(new Error('Chỉ xoá được tài khoản đăng nhập bằng tên.'), { status: 400 });
    await getStore().del('user:' + key);
    const roles = await U.getRoles();
    delete roles[key];
    await getStore().set('roles', roles);
    return { ok: true };
  }],
  'role-set': ['POST', 'owner', async (ctx, b) => {
    const email = U.normEmail(b.email);
    if (!U.EMAIL_RE.test(email)) throw Object.assign(new Error('Gmail không đúng định dạng.'), { status: 400 });
    if (U.ownerEmails().includes(email)) throw Object.assign(new Error('Đây là tài khoản Chủ Spa, không đổi quyền được.'), { status: 400 });
    const roles = await U.getRoles();
    if (b.role === 'admin') roles[email] = 'admin';
    else delete roles[email];
    await getStore().set('roles', roles);
    return { ok: true };
  }],
  reset: ['POST', 'owner', async (ctx, b) => {
    if (b.confirm !== 'XOA') throw Object.assign(new Error('Thiếu xác nhận.'), { status: 400 });
    return { deleted: await C.clearLeads() };
  }],
};

module.exports = async (req, res) => {
  const a = new URL(req.url, 'http://x').searchParams.get('a') || '';
  const route = Object.prototype.hasOwnProperty.call(routes, a) ? routes[a] : null;
  if (!route) return H.send(res, 404, { error: 'Không tìm thấy.' });
  const [method, need, fn] = route;
  if (req.method !== method) return H.send(res, 405, { error: 'Sai phương thức.' });
  if (method === 'POST' && !String(req.headers['content-type'] || '').includes('application/json')) return H.send(res, 415, { error: 'Sai định dạng.' });
  try {
    const user = await currentUser(req);
    if (!user) return H.send(res, 401, { error: 'login', message: 'Vui lòng đăng nhập.' });
    const role = await U.roleOf(user.email);
    if (!U.atLeast(role, need)) return H.send(res, 403, { error: 'forbidden', role, message: 'Tài khoản của bạn chưa được cấp quyền cho mục này.' });
    const body = method === 'POST' ? await H.readBody(req, a === 'image' ? 1200000 : 20000) : {};
    return H.send(res, 200, await fn({ user, role }, body, req));
  } catch (e) {
    if (e.status) return H.send(res, e.status, { error: e.message });
    console.error('[admin]', a, e);
    return H.send(res, 500, { error: 'Hệ thống đang bận, vui lòng thử lại.' });
  }
};
