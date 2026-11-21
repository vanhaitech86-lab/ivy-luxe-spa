// POST /api/leads — khách để lại thông tin trên web (form tư vấn, đặt lịch kèm đơn & số tiền) → vào CRM.
const H = require('./_lib/http');
const C = require('./_lib/crm');
const { getStore } = require('./_lib/store');
const A = require('./_lib/aff');
const { currentUser } = require('./account');
const N = require('./_lib/notify');
const M = require('./_lib/mail');
const { EMAIL_RE, normEmail } = require('./_lib/users');

// POST /api/leads?a=paid — khách bấm "Tôi đã chuyển khoản" (QR) → đơn chuyển "chờ spa xác nhận".
module.exports = async (req, res) => {
  if (req.method !== 'POST') return H.send(res, 405, { error: 'Sai phương thức.' });
  if (!String(req.headers['content-type'] || '').includes('application/json')) return H.send(res, 415, { error: 'Sai định dạng.' });
  try {
    const b = await H.readBody(req);
    if (new URL(req.url, 'http://x').searchParams.get('a') === 'paid') {
      if ((await getStore().hit('paid-ip:' + H.clientIp(req), 600)) > 20) return H.send(res, 429, { error: 'Bạn thao tác quá nhiều lần, vui lòng thử lại sau.' });
      const { lead, booking, changed } = await C.setBookingStatus({ phone: b.phone, code: String(b.code || ''), status: 'claimed' });
      let mailed = false;
      if (changed) {
        // Gửi hoá đơn "đã thanh toán" + lời chúc mừng cho khách và báo nhóm quản trị — làm song song cho nhanh
        [mailed] = await Promise.all([M.sendBookingMail(lead, booking, 'claimed'), N.notify(N.paidText(lead, booking))]);
      }
      return H.send(res, 200, { ok: true, booking, mailed });
    }
    // Ô ẩn chống máy spam: người thật không điền
    if (b.website) return H.send(res, 200, { ok: true });
    if (String(b.name || '').trim().length < 2) return H.send(res, 400, { error: 'Vui lòng nhập Họ tên.' });
    if (!/^\+?\d{8,15}$/.test(String(b.phone || '').replace(/[\s.\-()]/g, ''))) return H.send(res, 400, { error: 'Số điện thoại chưa đúng (VD: 0912345678 hoặc +84912345678).' });
    if ((await getStore().hit('lead-ip:' + H.clientIp(req), 600)) > 8) return H.send(res, 429, { error: 'Bạn gửi quá nhiều lần, vui lòng thử lại sau ít phút.' });
    const source = b.source === 'booking' ? 'booking' : 'form';
    // Đặt dịch vụ / thanh toán online: bắt buộc Gmail để gửi hoá đơn cho khách
    if (source === 'booking' && !EMAIL_RE.test(normEmail(b.email))) return H.send(res, 400, { error: 'Vui lòng nhập Gmail để nhận hoá đơn (VD: ten@gmail.com).' });
    // Gắn đối tác giới thiệu: mã trên link (?ref=MÃ) → nếu không có, tài khoản đang đăng nhập là thành viên F1 của ai
    let partner = b.ref ? await A.partnerByCode(b.ref) : null;
    const user = await currentUser(req).catch(() => null);
    if (!partner && user && user.ref) partner = await A.partnerByCode(user.ref);
    if (partner && user && partner.email === user.email) partner = null; // không tự giới thiệu chính mình
    const booking = source === 'booking' && b.booking ? await C.bookingFrom(b.booking, {
      name: b.name, phone: b.phone, email: b.email, ref: partner ? partner.code : '',
      account: user ? (user.username ? user.name : user.email) : '', ip: H.clientIp(req), ua: req.headers['user-agent'] || '',
    }) : null;
    const lead = await C.addLead(b, { source, tier: source === 'booking' ? 'booked' : 'new', ref: partner ? partner.code : '', booking });
    // Hoá đơn + lời chúc mừng gửi tới Gmail khách (đơn QR: kèm thông tin chuyển khoản) và báo nhóm quản trị
    const mailTo = booking ? { ...lead, email: normEmail(b.email) } : null;
    const [mailed] = await Promise.all([booking ? M.sendBookingMail(mailTo, booking, 'created') : false, N.notify(N.leadText({ ...lead, email: mailTo ? mailTo.email : lead.email }, { source, booking }))]);
    return H.send(res, 200, { ok: true, booking, mailed });
  } catch (e) {
    if (e.status) return H.send(res, e.status, { error: e.message });
    console.error('[leads]', e);
    return H.send(res, 500, { error: 'Hệ thống đang bận, vui lòng gọi Hotline/Zalo 098 971 3660.' });
  }
};
