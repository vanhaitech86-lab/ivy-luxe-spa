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

function layout(title, bodyHtml, foot) {
  return `<!doctype html><html><body style="margin:0;background:#0b1f17;font-family:Arial,Helvetica,sans-serif;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#0b1f17;padding:28px 12px;"><tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;background:#ffffff;border-radius:14px;overflow:hidden;border:1px solid #d4af37;">
<tr><td style="background:#16271f;padding:22px 26px;border-bottom:3px solid #d4af37;">
<div style="font-family:Georgia,serif;font-size:22px;letter-spacing:2px;color:#ecc876;font-weight:bold;">IVY LUXE SPA</div>
<div style="font-size:11px;letter-spacing:3px;color:#a3b5ad;margin-top:4px;">MASSAGE BODY &amp; WELLNESS</div></td></tr>
<tr><td style="padding:28px 26px;color:#1d2b24;font-size:15px;line-height:1.6;">
<h2 style="font-family:Georgia,serif;color:#16271f;font-size:20px;margin:0 0 14px;">${title}</h2>${bodyHtml}</td></tr>
<tr><td style="background:#f7f5ee;padding:16px 26px;font-size:12px;color:#6b7a72;line-height:1.5;">
Số 48 phố Hà Trung, phường Hoàn Kiếm, TP. Hà Nội · Hotline/Zalo 098 971 3660<br>${foot || 'Nếu bạn không thực hiện yêu cầu này, hãy bỏ qua thư.'}</td></tr>
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

// ---------- Hoá đơn đặt dịch vụ + lời chúc mừng (theo ngôn ngữ khách dùng trên web) ----------
const BILL = {
  vi: { created: 'Đặt dịch vụ thành công', claimed: 'Đã ghi nhận thanh toán', paid: 'Spa đã nhận tiền – đơn đã xác nhận',
    hi: 'Kính chào', intro: 'IVY LUXE SPA xin chúc mừng Anh/Chị đã đặt dịch vụ thành công. Dưới đây là hoá đơn của Anh/Chị:',
    code: 'Mã đơn', service: 'Dịch vụ', time: 'Thời gian hẹn', guests: 'Số khách', listed: 'Giá niêm yết', disc: 'Ưu đãi trả trước qua QR (−10%)',
    payQr: 'Số tiền cần chuyển khoản', paidQr: 'Đã thanh toán', payCash: 'Thanh toán tại quầy', tzNote: 'giờ Việt Nam (GMT+7)',
    st: { pending_qr: 'Chờ chuyển khoản', pending_cash: 'Thanh toán tại quầy khi đến', claimed: 'Đã chuyển khoản – spa đang đối soát', paid: 'Đã nhận tiền ✓' }, status: 'Trạng thái',
    bank: 'Thông tin chuyển khoản', bankNote: 'Nội dung chuyển khoản',
    thanks: 'Cảm ơn bạn đã sử dụng dịch vụ của IVY LUXE - Hẹn gặp bạn tại 48 Hà Trung - Phường Hoàn Kiếm - Thành phố Hà Nội để sử dụng dịch vụ của chúng tôi',
    foot: 'Thư gửi tự động khi bạn đặt dịch vụ trên ivyluxe.com.vn. Nếu không phải bạn đặt, vui lòng báo Hotline 098 971 3660.' },
  en: { created: 'Booking confirmed', claimed: 'Payment recorded', paid: 'Payment received – booking confirmed',
    hi: 'Dear', intro: 'Congratulations! Your IVY LUXE SPA booking is confirmed. Here is your bill:',
    code: 'Booking code', service: 'Service', time: 'Appointment', guests: 'Guests', listed: 'Listed price', disc: 'QR prepayment discount (−10%)',
    payQr: 'Amount to transfer', paidQr: 'Paid', payCash: 'Pay at the spa', tzNote: 'Vietnam time (GMT+7)',
    st: { pending_qr: 'Awaiting transfer', pending_cash: 'Pay at the spa on arrival', claimed: 'Transferred – being verified', paid: 'Payment received ✓' }, status: 'Status',
    bank: 'Bank transfer details', bankNote: 'Transfer note',
    thanks: 'Thank you for choosing IVY LUXE - See you at 48 Ha Trung Street - Hoan Kiem Ward - Hanoi to enjoy our services',
    foot: 'Automatic email sent after your booking on ivyluxe.com.vn. If you did not make this booking, please call +84 98 971 3660.' },
  zh: { created: '预约成功', claimed: '已记录付款', paid: '已收到付款 – 预约已确认',
    hi: '尊敬的', intro: '恭喜您成功预约 IVY LUXE SPA！以下是您的账单：',
    code: '订单号', service: '服务项目', time: '预约时间', guests: '人数', listed: '标价', disc: '二维码预付优惠（−10%）',
    payQr: '应转账金额', paidQr: '已付款', payCash: '到店付款', tzNote: '越南时间 (GMT+7)',
    st: { pending_qr: '等待转账', pending_cash: '到店付款', claimed: '已转账 – 核对中', paid: '已收款 ✓' }, status: '状态',
    bank: '转账信息', bankNote: '转账备注',
    thanks: '感谢您选择 IVY LUXE —— 期待在河内还剑坊河中街48号与您相见，为您提供服务',
    foot: '此邮件在您于 ivyluxe.com.vn 预约后自动发送。如非本人操作，请致电 +84 98 971 3660。' },
  ja: { created: 'ご予約が完了しました', claimed: 'お支払いを記録しました', paid: 'ご入金を確認しました – ご予約確定',
    hi: '', sfx: ' 様', intro: 'IVY LUXE SPA のご予約が完了しました。おめでとうございます。ご請求内容は以下の通りです：',
    code: '予約番号', service: 'メニュー', time: 'ご予約日時', guests: '人数', listed: '定価', disc: 'QR事前決済割引（−10%）',
    payQr: 'お振込金額', paidQr: 'お支払い済み', payCash: '店頭でお支払い', tzNote: 'ベトナム時間 (GMT+7)',
    st: { pending_qr: 'お振込待ち', pending_cash: 'ご来店時にお支払い', claimed: 'お振込済み – 確認中', paid: '入金確認済み ✓' }, status: 'ステータス',
    bank: 'お振込先', bankNote: '振込メモ',
    thanks: 'IVY LUXE をお選びいただきありがとうございます。ハノイ・ホアンキエム区ハーチュン通り48番地でお待ちしております',
    foot: 'ivyluxe.com.vn でのご予約後に自動送信されるメールです。お心当たりのない場合は +84 98 971 3660 までご連絡ください。' },
  ko: { created: '예약이 완료되었습니다', claimed: '결제가 기록되었습니다', paid: '입금 확인 – 예약 확정',
    hi: '', sfx: ' 고객님', intro: 'IVY LUXE SPA 예약을 축하드립니다! 고객님의 영수증은 아래와 같습니다:',
    code: '예약 번호', service: '서비스', time: '예약 시간', guests: '인원', listed: '정가', disc: 'QR 선결제 할인 (−10%)',
    payQr: '이체 금액', paidQr: '결제 완료', payCash: '현장 결제', tzNote: '베트남 시간 (GMT+7)',
    st: { pending_qr: '이체 대기', pending_cash: '방문 시 결제', claimed: '이체 완료 – 확인 중', paid: '입금 확인 ✓' }, status: '상태',
    bank: '계좌 이체 정보', bankNote: '이체 메모',
    thanks: 'IVY LUXE를 선택해 주셔서 감사합니다 - 하노이 호안끼엠 하쭝 48번지에서 뵙겠습니다',
    foot: 'ivyluxe.com.vn 예약 후 자동 발송된 메일입니다. 본인이 예약하지 않았다면 +84 98 971 3660으로 연락해 주세요.' },
  ru: { created: 'Бронирование подтверждено', claimed: 'Оплата зарегистрирована', paid: 'Оплата получена – бронь подтверждена',
    hi: 'Уважаемый(ая)', intro: 'Поздравляем! Ваше бронирование в IVY LUXE SPA успешно оформлено. Ваш счёт:',
    code: 'Номер брони', service: 'Услуга', time: 'Время записи', guests: 'Гостей', listed: 'Цена по прайсу', disc: 'Скидка за предоплату по QR (−10%)',
    payQr: 'Сумма к переводу', paidQr: 'Оплачено', payCash: 'Оплата в спа', tzNote: 'время Вьетнама (GMT+7)',
    st: { pending_qr: 'Ожидает перевода', pending_cash: 'Оплата при визите', claimed: 'Переведено – проверяется', paid: 'Оплата получена ✓' }, status: 'Статус',
    bank: 'Реквизиты для перевода', bankNote: 'Назначение платежа',
    thanks: 'Спасибо, что выбрали IVY LUXE! Ждём Вас по адресу: ул. Ха Чунг, 48, район Хоанкием, Ханой',
    foot: 'Письмо отправлено автоматически после бронирования на ivyluxe.com.vn. Если это были не Вы, позвоните +84 98 971 3660.' },
  fr: { created: 'Réservation confirmée', claimed: 'Paiement enregistré', paid: 'Paiement reçu – réservation confirmée',
    hi: 'Bonjour', intro: 'Félicitations ! Votre réservation chez IVY LUXE SPA est confirmée. Voici votre facture :',
    code: 'N° de réservation', service: 'Soin', time: 'Rendez-vous', guests: 'Personnes', listed: 'Prix affiché', disc: 'Remise prépaiement QR (−10%)',
    payQr: 'Montant à virer', paidQr: 'Payé', payCash: 'Paiement au spa', tzNote: 'heure du Vietnam (GMT+7)',
    st: { pending_qr: 'En attente du virement', pending_cash: 'Paiement sur place', claimed: 'Virement effectué – en vérification', paid: 'Paiement reçu ✓' }, status: 'Statut',
    bank: 'Coordonnées bancaires', bankNote: 'Libellé du virement',
    thanks: 'Merci d\'avoir choisi IVY LUXE - Au plaisir de vous accueillir au 48 rue Ha Trung - Hoan Kiem - Hanoï',
    foot: 'E-mail envoyé automatiquement après votre réservation sur ivyluxe.com.vn. Si ce n\'est pas vous, appelez le +84 98 971 3660.' },
};
const vnd = (n) => (Number(n) || 0).toLocaleString('vi-VN') + 'đ';
const fmtDay = (d) => (/^\d{4}-\d{2}-\d{2}$/.test(d) ? d.slice(8, 10) + '/' + d.slice(5, 7) + '/' + d.slice(0, 4) : d);

/** kind: 'created' (vừa đặt) | 'claimed' (khách báo đã chuyển khoản) | 'paid' (spa xác nhận đã nhận tiền) */
function bookingMail(lead, b, kind = 'created') {
  const L = BILL[b.lang] || BILL.vi;
  const title = L[kind] || L.created;
  const st = kind === 'paid' ? 'paid' : kind === 'claimed' ? 'claimed' : b.pay === 'qr' ? 'pending_qr' : 'pending_cash';
  const totalLabel = b.pay === 'qr' ? (st === 'pending_qr' ? L.payQr : L.paidQr) : (kind === 'paid' ? L.paidQr : L.payCash);
  const when = `${b.time} · ${fmtDay(b.date)} (${L.tzNote})`;
  const rows = [
    [L.code, b.code], [L.service, b.service], [L.time, when], [L.guests, b.guests],
    [L.listed, vnd(b.gross)], ...(b.discount ? [[L.disc, '−' + vnd(b.discount)]] : []), [L.status, L.st[st]],
  ];
  const tr = (k, v, extra = '') => `<tr><td style="padding:9px 0;border-bottom:1px solid #eee5c8;color:#5a6560;font-size:14px;">${esc(k)}</td><td style="padding:9px 0;border-bottom:1px solid #eee5c8;text-align:right;font-weight:bold;color:#16271f;font-size:14px;${extra}">${esc(v)}</td></tr>`;
  const bank = st === 'pending_qr'
    ? `<div style="margin:18px 0 0;padding:14px 16px;background:#f2f7ff;border:1px solid #c9dcf5;border-radius:10px;font-size:14px;line-height:1.7;">
<strong>${esc(L.bank)}</strong><br>Sacombank · <strong style="color:#0053A0;">020113149011</strong> · HKD IVY LUXE SPA<br>${esc(L.payQr)}: <strong style="color:#B22222;">${vnd(b.total)}</strong><br>${esc(L.bankNote)}: <strong>${esc(b.code)}</strong></div>` : '';
  const html = layout(title, `<p style="margin:0 0 12px;">${esc(L.hi)} <strong>${esc(lead.name)}</strong>${esc(L.sfx || ',')}</p>
<p style="margin:0 0 16px;">${esc(L.intro)}</p>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#fbf8ef;border:1px dashed #d4af37;border-radius:10px;padding:6px 16px;">
${rows.map(([k, v]) => tr(k, v)).join('')}
<tr><td style="padding:12px 0 6px;font-size:15px;color:#16271f;">${esc(totalLabel)}</td><td style="padding:12px 0 6px;text-align:right;font-size:22px;font-weight:bold;color:#9b1c2c;">${vnd(b.total)}</td></tr>
</table>${bank}
<div style="margin:20px 0 0;padding:20px 18px;background:#0f3d2a;border-radius:12px;text-align:center;color:#ecc876;font-family:Georgia,serif;font-size:16px;line-height:1.55;font-weight:bold;">&#10084;<br>${esc(L.thanks)}</div>
<p style="text-align:center;margin:18px 0 0;font-size:14px;">Hotline / Zalo / WhatsApp: <a href="tel:+84989713660" style="color:#16271f;font-weight:bold;">098 971 3660</a></p>`, esc(L.foot));
  const text = `${title}\n\n${[L.hi, lead.name].filter(Boolean).join(' ')}${L.sfx || ','}\n${L.intro}\n\n${rows.map(([k, v]) => k + ': ' + v).join('\n')}\n${totalLabel}: ${vnd(b.total)}\n`
    + (st === 'pending_qr' ? `\n${L.bank}: Sacombank 020113149011 – HKD IVY LUXE SPA – ${L.bankNote}: ${b.code}\n` : '')
    + `\n${L.thanks}\n\nIVY LUXE SPA – 48 Hà Trung, Hoàn Kiếm, Hà Nội – Hotline 098 971 3660`;
  return { subject: `${title} – IVY LUXE SPA · ${b.code}`, html, text };
}

/** Gửi hoá đơn cho khách (nếu có Gmail). Không bao giờ làm hỏng thao tác chính; tối đa 6 thư/ngày cho mỗi địa chỉ. */
async function sendBookingMail(lead, booking, kind) {
  try {
    if (!lead || !lead.email || !booking || !canSend()) return false;
    const { getStore } = require('./store');
    if ((await getStore().hit('mail-to:' + lead.email, 86400)) > 6) return false;
    await sendMail({ to: lead.email, ...bookingMail(lead, booking, kind) });
    return true;
  } catch (e) {
    console.error('[mail] booking', e);
    return false;
  }
}

module.exports = { canSend, sendMail, verifyMail, resetMail, loginLockedMail, bookingMail, sendBookingMail };
