// Bot báo tin cho quản trị viên (Telegram bot "Dealwebsite", token NOTIFY_BOT_TOKEN).
// Gửi tin vào các nhóm/chat đã ghép bằng mã kết nối Chủ Spa tạo trong Dashboard (khoá ivyw:notify-chats).
const { createHash } = require('node:crypto');
const { getStore } = require('./store');

const TOKEN = () => process.env.NOTIFY_BOT_TOKEN || '';
const webhookSecret = () => createHash('sha256').update('ivyw-notify|' + TOKEN()).digest('hex').slice(0, 48);

async function tg(method, body) {
  const res = await fetch(`https://api.telegram.org/bot${TOKEN()}/${method}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(6000),
  });
  return res.json().catch(() => ({}));
}

async function listChats() {
  return (await getStore().get('notify-chats')) || [];
}

const money = (n) => (Number(n) || 0).toLocaleString('vi-VN') + 'đ';
const line = (label, v) => (String(v || '').trim() ? `${label}: ${String(v).trim()}\n` : '');

/** Gửi 1 tin báo tới mọi nhóm đã kết nối. Không bao giờ làm hỏng thao tác chính nếu Telegram lỗi. */
async function notify(text) {
  try {
    if (!TOKEN()) return;
    const chats = await listChats();
    await Promise.all(chats.map((c) => tg('sendMessage', { chat_id: c.id, text: String(text).slice(0, 3900), link_preview_options: { is_disabled: true } }).catch(() => {})));
  } catch (e) {
    console.error('[notify]', e);
  }
}

const SOURCE = { form: 'Form tư vấn website', booking: 'Đặt lịch website', telegram: 'Bot Telegram IVYSPA', admin: 'Nhập tay' };

/** Khách mới / đặt lịch. */
function leadText(lead, { source, booking } = {}) {
  const b = booking;
  return (b ? '🗓 ĐẶT LỊCH MỚI' : '🆕 KHÁCH MỚI ĐỂ LẠI THÔNG TIN') + ' – IVYLUXE SPA & NAIL\n\n'
    + line('Khách', lead.name) + line('SĐT', lead.phone) + line('Quốc gia', lead.country) + line('Nơi ở', lead.residence)
    + (b ? line('Dịch vụ', b.service) + line('Thời gian', [b.time, b.date].filter(Boolean).join(' ngày ')) + line('Số khách', b.guests)
      + line('Thành tiền', money(b.total) + (b.pay === 'qr' ? ' (chuyển khoản QR, đã giảm ' + money(b.discount) + ')' : ' (thanh toán tại spa)')) + line('Mã đơn', b.code) : '')
    + (!b ? line('Nhu cầu', String(lead.need || '').split('\n').pop()) : '')
    + line('Nguồn', SOURCE[source] || source) + (lead.ref ? line('Đối tác giới thiệu', 'IVY-' + lead.ref) : '')
    + '\n👉 Xem & chăm sóc: ivyluxe.com.vn/admin';
}

function paidText(lead, b) {
  return '💰 KHÁCH BÁO ĐÃ CHUYỂN KHOẢN – cần kiểm tra tài khoản\n\n'
    + line('Khách', lead.name) + line('SĐT', lead.phone) + line('Mã đơn', b.code) + line('Dịch vụ', b.service)
    + line('Số tiền', money(b.total)) + line('Thời gian hẹn', [b.time, b.date].filter(Boolean).join(' ngày '))
    + '\n👉 Đối chiếu sao kê rồi bấm "Đã nhận tiền" tại ivyluxe.com.vn/admin';
}

function accountText(user, how) {
  return '👤 TÀI KHOẢN MỚI ĐĂNG KÝ\n\n' + line('Tên', user.name) + line('Gmail', user.email) + line('SĐT', user.phone)
    + line('Cách đăng ký', how) + (user.ref ? line('Qua đối tác', 'IVY-' + user.ref) : '');
}

module.exports = { TOKEN, webhookSecret, tg, listChats, notify, leadText, paidText, accountText, money, line };
