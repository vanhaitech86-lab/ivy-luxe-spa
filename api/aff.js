// /api/aff?a=… — Đối tác Affiliate (dữ liệu thật trên máy chủ).
//   me        GET  : tài khoản đang đăng nhập + hồ sơ đối tác + số liệu Dashboard
//                    (&auto=1: tài khoản đã đăng nhập nhưng chưa có hồ sơ → tự kích hoạt đối tác)
//   register  POST : đăng ký đối tác (đã đăng nhập → tạo hồ sơ; chưa có tài khoản → tạo tài khoản + thư xác nhận Gmail)
//   bank      POST : lưu tài khoản ngân hàng nhận hoa hồng
//   payout    POST : gửi yêu cầu rút hoa hồng khả dụng
//   click     POST : ghi nhận 1 lượt click link giới thiệu (?ref=MÃ)
const H = require('./_lib/http');
const U = require('./_lib/users');
const A = require('./_lib/aff');
const { getStore } = require('./_lib/store');
const account = require('./account');
const C = require('./_lib/crm');

function publicPartner(p) {
  return {
    name: p.name, email: p.email, phone: p.phone, type: p.type, typeLabel: A.TYPES[p.type] || '',
    displayName: p.displayName || '', avatar: p.avatar || '',
    code: p.code, rate: A.COMMISSION_RATE, bankName: p.bankName || '', bankNum: p.bankNum || '', bankHolder: p.bankHolder || '',
    createdAt: p.createdAt,
  };
}

const routes = {
  async me(req, res) {
    const user = await account.currentUser(req);
    if (!user) return H.send(res, 401, { error: 'login' });
    let partner = await A.getPartner(user.email);
    let activated = false;
    if (!partner && new URL(req.url, 'http://x').searchParams.get('auto') === '1') {
      const phone = /^\+?\d{8,15}$/.test(String(user.phone || '').replace(/[\s.\-()]/g, '')) ? user.phone : '';
      const name = String(user.name || '').trim().length >= 2 ? user.name : user.email.replace(/^u:/, '').split('@')[0];
      partner = await A.createPartner(user.email, { name, phone, type: 'individual' }, { phoneOptional: true });
      activated = true;
    }
    const base = { user: { name: user.name, email: user.email, phone: user.phone || '' }, types: A.TYPES, holdDays: A.HOLD_DAYS, minPayout: A.MIN_PAYOUT };
    if (!partner) return H.send(res, 200, { ...base, partner: null });
    const [dash, ranking] = await Promise.all([A.dashboard(partner), A.ranking(user.email)]);
    return H.send(res, 200, { ...base, activated, partner: publicPartner(partner), ...dash, ranking });
  },

  async register(req, res, b) {
    if (b.website) return H.send(res, 200, { ok: true, needVerify: true, email: U.normEmail(b.email) });
    const user = await account.currentUser(req);
    if (user) {
      const partner = await A.createPartner(user.email, { ...b, name: b.name || user.name, phone: b.phone || user.phone });
      return H.send(res, 200, { ok: true, partner: publicPartner(partner) });
    }
    // Chưa đăng nhập: tạo tài khoản web (chưa xác nhận) + gửi thư xác nhận, lưu sẵn hồ sơ đối tác
    const email = U.normEmail(b.email);
    if (!U.EMAIL_RE.test(email)) return H.send(res, 400, { error: 'Vui lòng nhập Gmail đúng định dạng.' });
    const existing = await U.getUser(email);
    if (existing && existing.verified) return H.send(res, 409, { error: 'exists', message: 'Gmail này đã có tài khoản. Vui lòng Đăng nhập để kích hoạt đối tác.' });
    // Kiểm tra thông tin đối tác trước khi tạo tài khoản
    const code = A.normCode(b.code);
    if (code) {
      const owner = await getStore().get('aff-code:' + code);
      if (owner && owner !== email) return H.send(res, 409, { error: 'Mã giới thiệu "' + code + '" đã có người dùng, vui lòng chọn mã khác.' });
    }
    const r = await account.registerAccount(req, { name: b.name, email, password: b.password, confirm: b.confirm || b.password, next: '/affiliate', website: b.website });
    if (r.status !== 200) return H.send(res, r.status, r.body);
    await A.createPartner(email, b);
    return H.send(res, 200, { ok: true, needVerify: true, email });
  },

  async bank(req, res, b) {
    const user = await account.currentUser(req);
    if (!user) return H.send(res, 401, { error: 'login' });
    const partner = await A.getPartner(user.email);
    if (!partner) return H.send(res, 404, { error: 'Bạn chưa đăng ký đối tác.' });
    const bankName = A.clean(b.bankName, 60);
    const bankNum = String(b.bankNum || '').replace(/[^\d]/g, '').slice(0, 24);
    const bankHolder = A.clean(b.bankHolder, 60).toUpperCase();
    if (!bankName || bankNum.length < 6 || bankHolder.length < 3) return H.send(res, 400, { error: 'Vui lòng nhập đủ Ngân hàng, Số tài khoản và Tên chủ tài khoản.' });
    Object.assign(partner, { bankName, bankNum, bankHolder });
    await A.savePartner(partner);
    return H.send(res, 200, { ok: true, partner: publicPartner(partner) });
  },

  async payout(req, res, b) {
    const user = await account.currentUser(req);
    if (!user) return H.send(res, 401, { error: 'login' });
    const partner = await A.getPartner(user.email);
    if (!partner) return H.send(res, 404, { error: 'Bạn chưa đăng ký đối tác.' });
    if ((await getStore().hit('payout:' + user.email, 3600)) > 5) return H.send(res, 429, { error: 'Bạn thao tác quá nhiều lần, vui lòng thử lại sau.' });
    const item = await A.requestPayout(partner, b.amount);
    const N = require('./_lib/notify');
    await N.notify('💸 ĐỐI TÁC YÊU CẦU RÚT HOA HỒNG\n\n' + N.line('Đối tác', partner.name + ' (IVY-' + partner.code + ')') + N.line('Số tiền', N.money(item.amount)) + N.line('Ngân hàng', [item.bank.bankName, item.bank.bankNum, item.bank.bankHolder].join(' – ')) + '\n👉 Duyệt tại ivyluxe.com.vn/admin → Affiliate');
    return H.send(res, 200, { ok: true, payout: item });
  },

  // Hồ sơ hiển thị trên Bảng vinh danh: tên + ảnh đại diện (ảnh thu nhỏ trên máy khách rồi gửi lên)
  async profile(req, res, b) {
    const user = await account.currentUser(req);
    if (!user) return H.send(res, 401, { error: 'login' });
    const partner = await A.getPartner(user.email);
    if (!partner) return H.send(res, 404, { error: 'Bạn chưa đăng ký đối tác.' });
    if ((await getStore().hit('aff-profile:' + user.email, 3600)) > 20) return H.send(res, 429, { error: 'Bạn thao tác quá nhiều lần, vui lòng thử lại sau.' });
    const name = A.clean(b.displayName, 40);
    if (name.length < 2) return H.send(res, 400, { error: 'Tên hiển thị cần ít nhất 2 ký tự.' });
    partner.displayName = name;
    if (b.avatar && String(b.avatar).startsWith('data:image/')) partner.avatar = await C.saveImage(b.avatar);
    await A.savePartner(partner);
    return H.send(res, 200, { ok: true, partner: publicPartner(partner) });
  },

  async click(req, res, b) {
    const ok = await A.recordClick(b.code, H.clientIp(req));
    return H.send(res, 200, { ok });
  },
};

module.exports = async (req, res) => {
  const a = new URL(req.url, 'http://x').searchParams.get('a') || '';
  const fn = Object.prototype.hasOwnProperty.call(routes, a) ? routes[a] : null;
  if (!fn) return H.send(res, 404, { error: 'Không tìm thấy.' });
  const isGet = a === 'me';
  if (isGet ? req.method !== 'GET' : req.method !== 'POST') return H.send(res, 405, { error: 'Sai phương thức.' });
  if (!isGet && !String(req.headers['content-type'] || '').includes('application/json')) return H.send(res, 415, { error: 'Sai định dạng.' });
  try {
    return await fn(req, res, isGet ? {} : await H.readBody(req));
  } catch (e) {
    if (e.status) return H.send(res, e.status, { error: e.message });
    console.error('[aff]', a, e);
    return H.send(res, 500, { error: 'Hệ thống đang bận, vui lòng thử lại sau ít phút.' });
  }
};
