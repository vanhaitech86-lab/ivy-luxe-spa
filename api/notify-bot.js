// POST /api/notify-bot — Telegram gọi về cho bot báo tin "Dealwebsite".
// Ghép nhóm: Chủ Spa tạo mã trong Dashboard → trong nhóm gõ  /ketnoi MÃ  → nhóm bắt đầu nhận tin báo.
// Gỡ nhóm: gõ /huy trong nhóm, hoặc bấm Gỡ trong Dashboard.
const { timingSafeEqual } = require('node:crypto');
const H = require('./_lib/http');
const { getStore } = require('./_lib/store');
const N = require('./_lib/notify');

const reply = (chatId, text) => N.tg('sendMessage', { chat_id: chatId, text }).catch(() => {});

module.exports = async (req, res) => {
  if (req.method !== 'POST') return H.send(res, 405, { error: 'Sai phương thức.' });
  if (!N.TOKEN()) return H.send(res, 503, { error: 'Chưa cài NOTIFY_BOT_TOKEN.' });
  const got = String(req.headers['x-telegram-bot-api-secret-token'] || '');
  const want = N.webhookSecret();
  if (got.length !== want.length || !timingSafeEqual(Buffer.from(got), Buffer.from(want))) return H.send(res, 401, { error: 'Sai mã bí mật.' });

  const update = await H.readBody(req, 200000);
  const msg = update.message;
  if (!msg || typeof msg.text !== 'string' || !msg.chat) return H.send(res, 200, { ok: true });
  const store = getStore();
  if ((await store.hit('nb-upd:' + update.update_id, 86400)) > 1) return H.send(res, 200, { ok: true });

  const chat = msg.chat;
  const m = msg.text.trim().match(/^\/(\w+)(?:@\w+)?\s*(.*)$/);
  if (!m) return H.send(res, 200, { ok: true }); // bot báo tin không trò chuyện
  const [, cmd, arg] = m;
  try {
    if (cmd === 'start' || cmd === 'help') {
      await reply(chat.id, 'Đây là bot báo tin nội bộ của IVYLUXE SPA & NAIL (khách đăng ký, đặt lịch, chuyển khoản).\n\nĐể nhận tin trong nhóm này: Chủ Spa vào ivyluxe.com.vn/admin → Phân quyền → "Bot báo tin" → Tạo mã kết nối, rồi gõ tại đây:\n/ketnoi MÃ\n\nNgừng nhận tin: /huy');
    } else if (cmd === 'ketnoi') {
      const code = String(arg || '').replace(/\D/g, '');
      const ok = code.length === 6 && (await store.hit('nb-try:' + chat.id, 3600)) <= 10 && (await store.get('notify-pair:' + code));
      if (!ok) {
        await reply(chat.id, 'Mã kết nối không đúng hoặc đã hết hạn (mã dùng trong 15 phút). Vui lòng tạo mã mới trong Dashboard.');
      } else {
        await store.del('notify-pair:' + code);
        const chats = (await N.listChats()).filter((c) => c.id !== chat.id);
        chats.push({ id: chat.id, title: chat.title || [chat.first_name, chat.last_name].filter(Boolean).join(' ') || 'Chat riêng', type: chat.type, addedAt: Date.now() });
        await store.set('notify-chats', chats);
        await reply(chat.id, '✅ Đã kết nối! Từ giờ nhóm này sẽ nhận thông báo khi có khách đăng ký tài khoản, để lại thông tin, đặt lịch hoặc báo đã chuyển khoản trên ivyluxe.com.vn.');
      }
    } else if (cmd === 'huy') {
      const chats = await N.listChats();
      if (chats.some((c) => c.id === chat.id)) {
        await store.set('notify-chats', chats.filter((c) => c.id !== chat.id));
        await reply(chat.id, 'Đã ngừng gửi thông báo vào nhóm này.');
      }
    }
  } catch (e) {
    console.error('[notify-bot]', e);
  }
  return H.send(res, 200, { ok: true });
};
