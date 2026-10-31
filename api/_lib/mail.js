// Gửi thư cho khách: ưu tiên Gmail (GMAIL_USER + GMAIL_APP_PASSWORD, mật khẩu ứng dụng 16 ký tự),
// hoặc Resend (RESEND_API_KEY + MAIL_FROM). Chạy thử trên máy khi chưa cài: in thư ra màn hình.

const BRAND = 'IVY LUXE SPA';

function canSend() {
  return Boolean((process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD) || process.env.RESEND_API_KEY);
}

async function sendMail({ to, subject, html, text }) {
  if (process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD) {
    const nodemailer = require('nodemailer');
    const t = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_APP_PASSWORD.replace(/\s+/g, '') },
    });
    await t.sendMail({ from: `"${BRAND}" <${process.env.GMAIL_USER}>`, to, subject, html, text });
    return;
  }
  if (process.env.RESEND_API_KEY) {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from: process.env.MAIL_FROM || `${BRAND} <onboarding@resend.dev>`, to: [to], subject, html, text }),
    });
    if (!res.ok) throw new Error('Resend ' + res.status + ' ' + (await res.text()).slice(0, 200));
    return;
  }
  if (process.env.VERCEL_ENV === 'production') throw new Error('Chưa cài đặt hộp thư gửi.');
  console.log(`\n[THƯ CHẠY THỬ] tới ${to}\nTiêu đề: ${subject}\n${text}\n`);
}

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

function layout(title, bodyHtml) {
  return `<!doctype html><html><body style="margin:0;background:#0b1f17;font-family:Arial,Helvetica,sans-serif;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#0b1f17;padding:28px 12px;"><tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;background:#ffffff;border-radius:14px;overflow:hidden;border:1px solid #d4af37;">
<tr><td style="background:#16271f;padding:22px 26px;border-bottom:3px solid #d4af37;">
<div style="font-family:Georgia,serif;font-size:22px;letter-spacing:2px;color:#ecc876;font-weight:bold;">IVY LUXE SPA</div>
<div style="font-size:11px;letter-spacing:3px;color:#a3b5ad;margin-top:4px;">MASSAGE BODY &amp; WELLNESS</div></td></tr>
<tr><td style="padding:28px 26px;color:#1d2b24;font-size:15px;line-height:1.6;">
<h2 style="font-family:Georgia,serif;color:#16271f;font-size:20px;margin:0 0 14px;">${title}</h2>${bodyHtml}</td></tr>
<tr><td style="background:#f7f5ee;padding:16px 26px;font-size:12px;color:#6b7a72;line-height:1.5;">
Số 48 phố Hà Trung, phường Hoàn Kiếm, TP. Hà Nội · Hotline/Zalo 098 971 3660<br>Nếu bạn không thực hiện yêu cầu này, hãy bỏ qua thư.</td></tr>
</table></td></tr></table></body></html>`;
}

function verifyMail(name, link) {
  return {
    subject: 'Xác nhận đăng ký tài khoản IVY LUXE SPA',
    text: `Xin chào ${name},\n\nCảm ơn bạn đã đăng ký tài khoản IVY LUXE SPA. Bấm vào liên kết sau để xác nhận Gmail (hiệu lực 24 giờ):\n${link}\n\nIVY LUXE SPA - 48 Hà Trung, Hoàn Kiếm, Hà Nội`,
    html: layout(
      'Xác nhận đăng ký tài khoản',
      `<p style="margin:0 0 12px;">Xin chào <strong>${esc(name)}</strong>,</p>
<p style="margin:0 0 20px;">Cảm ơn bạn đã đăng ký tài khoản thành viên IVY LUXE SPA. Bấm nút dưới đây để xác nhận Gmail và kích hoạt tài khoản.</p>
<p style="text-align:center;margin:0 0 22px;"><a href="${esc(link)}" style="display:inline-block;background:#d4af37;color:#16271f;text-decoration:none;font-weight:bold;letter-spacing:1px;padding:14px 30px;border-radius:8px;">XÁC NHẬN ĐĂNG KÝ</a></p>
<p style="margin:0;font-size:13px;color:#6b7a72;">Liên kết có hiệu lực trong 24 giờ. Nếu nút không bấm được, hãy mở địa chỉ sau:<br><span style="word-break:break-all;color:#16271f;">${esc(link)}</span></p>`
    ),
  };
}

function resetMail(name, otp) {
  return {
    subject: `Mã đặt lại mật khẩu IVY LUXE SPA: ${otp}`,
    text: `Xin chào ${name},\n\nMã xác thực để đặt lại mật khẩu của bạn là: ${otp}\nMã có hiệu lực trong 15 phút. Không chia sẻ mã này cho bất kỳ ai.\n\nIVY LUXE SPA`,
    html: layout(
      'Mã đặt lại mật khẩu',
      `<p style="margin:0 0 12px;">Xin chào <strong>${esc(name)}</strong>,</p>
<p style="margin:0 0 18px;">Mã xác thực (OTP) để đặt lại mật khẩu của bạn là:</p>
<p style="text-align:center;margin:0 0 18px;"><span style="display:inline-block;font-size:30px;letter-spacing:8px;font-weight:bold;color:#16271f;background:#f7f0d8;border:1px dashed #d4af37;border-radius:8px;padding:12px 22px;">${otp}</span></p>
<p style="margin:0;font-size:13px;color:#6b7a72;">Mã có hiệu lực trong 15 phút. Không chia sẻ mã này cho bất kỳ ai, kể cả nhân viên spa.</p>`
    ),
  };
}

function loginLockedMail(name) {
  return {
    subject: 'Cảnh báo: tài khoản IVY LUXE SPA của bạn vừa bị tạm khóa',
    text: `Xin chào ${name},\n\nTài khoản của bạn vừa bị tạm khóa 30 phút do có người nhập sai mật khẩu quá 5 lần liên tiếp. Nếu không phải bạn, vui lòng đặt lại mật khẩu ngay bằng chức năng "Quên Mật Khẩu".\n\nIVY LUXE SPA`,
    html: layout(
      'Cảnh báo đăng nhập sai nhiều lần',
      `<p style="margin:0 0 12px;">Xin chào <strong>${esc(name)}</strong>,</p>
<p style="margin:0 0 18px;">Tài khoản của bạn vừa bị <strong>tạm khóa 30 phút</strong> do có người nhập sai mật khẩu quá 5 lần liên tiếp.</p>
<p style="margin:0;font-size:13px;color:#6b7a72;">Nếu không phải bạn, vui lòng dùng chức năng "Quên Mật Khẩu" để đặt lại mật khẩu ngay khi hết thời gian khóa.</p>`
    ),
  };
}

module.exports = { canSend, sendMail, verifyMail, resetMail, loginLockedMail };
