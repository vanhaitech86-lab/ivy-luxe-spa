// POST /api/telegram — Telegram gọi về mỗi khi có tin nhắn cho bot IVYSPA.
// Cần biến môi trường: TELEGRAM_BOT_TOKEN (từ @BotFather), ANTHROPIC_API_KEY (Claude API).
// Kết nối webhook: Dashboard → Phân quyền → "Bot Telegram" → Kết nối (gọi /api/admin?a=telegram-setup).
const { createHash, timingSafeEqual } = require('node:crypto');
const H = require('./_lib/http');
const { getStore } = require('./_lib/store');
const bot = require('./_lib/bot');

const TOKEN = () => process.env.TELEGRAM_BOT_TOKEN || '';
/** Mã bí mật Telegram gửi kèm mỗi lần gọi (sinh từ token bot, không cần thêm biến môi trường). */
const webhookSecret = () => createHash('sha256').update('ivyw-telegram|' + TOKEN()).digest('hex').slice(0, 48);

async function tg(method, body) {
  const res = await fetch(`https://api.telegram.org/bot${TOKEN()}/${method}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  return res.json().catch(() => ({}));
}

async function sendText(chatId, text, replyTo) {
  // Telegram giới hạn 4096 ký tự / tin
  const parts = [];
  for (let s = String(text); s.length; s = s.slice(3800)) parts.push(s.slice(0, 3800));
  for (let i = 0; i < parts.length; i++) {
    await tg('sendMessage', {
      chat_id: chatId,
      text: parts[i],
      ...(i === 0 && replyTo ? { reply_parameters: { message_id: replyTo, allow_sending_without_reply: true } } : {}),
      link_preview_options: { is_disabled: true },
    });
  }
}

// Lời chào theo ngôn ngữ ứng dụng Telegram của khách — cùng một công thức với bản tiếng Việt.
const WELCOMES = {
  vi: 'Dạ, em kính chào Anh/Chị. Em là Chuyên viên Tư vấn Trị liệu của IVYLUXE SPA & NAIL – Số 48 phố Hà Trung, Hoàn Kiếm, Hà Nội. Rất hân hạnh được đồng hành cùng Anh/Chị trong hành trình thư giãn và chăm sóc bản thân.\n\nAnh/Chị đang muốn thư giãn toàn thân, giảm đau mỏi vai gáy – chân, chăm sóc da mặt hay làm đẹp móng ạ? Em sẽ tư vấn liệu trình và giữ chỗ cho Anh/Chị ngay.',
  en: 'Good day and a warm welcome to IVYLUXE SPA & NAIL – 48 Ha Trung Street, Hoan Kiem, Hanoi. I am your wellness consultant, and it is my pleasure to accompany you on your journey of relaxation and self-care.\n\nMay I ask what you are looking for today – a full-body massage, relief for tired shoulders or feet, facial care, or nail care? I will recommend the right treatment and reserve a spot for you right away.',
  zh: '您好，热烈欢迎您来到 IVYLUXE SPA & NAIL（河内还剑郡河中街48号）。我是您的专属理疗顾问，很荣幸陪伴您享受放松与自我呵护的时光。\n\n请问您今天想要全身按摩放松、缓解肩颈或足部疲劳、面部护理，还是美甲呢？我会为您推荐合适的项目并马上为您预约。',
  ja: 'こんにちは。IVYLUXE SPA & NAIL（ハノイ・ホアンキエム区 ハーチュン通り48番地）へようこそお越しくださいました。私はお客様専任のセラピーコンサルタントでございます。癒しとセルフケアのひとときをご一緒できることを光栄に存じます。\n\n本日は全身マッサージ、肩・首や足の疲れのケア、フェイシャル、ネイルのうち、どちらをご希望でしょうか？最適なメニューをご提案し、すぐにお席をお取りいたします。',
  ko: '안녕하십니까, 고객님. 하노이 호안끼엠 하쭝 48번지 IVYLUXE SPA & NAIL에 오신 것을 진심으로 환영합니다. 저는 고객님의 전담 테라피 상담사입니다. 고객님의 휴식과 자기 관리 시간을 함께하게 되어 영광입니다.\n\n오늘은 전신 마사지, 어깨·발 피로 해소, 얼굴 관리, 네일 중 어떤 서비스를 원하십니까? 알맞은 코스를 추천해 드리고 바로 예약해 드리겠습니다.',
  ru: 'Здравствуйте! Сердечно приветствуем Вас в IVYLUXE SPA & NAIL – улица Ха Чунг, 48, район Хоанкием, Ханой. Я Ваш консультант по спа-процедурам и буду рад(а) сопровождать Вас на пути к отдыху и заботе о себе.\n\nПодскажите, пожалуйста, что Вас интересует сегодня: массаж всего тела, снятие усталости шеи, плеч или ног, уход за лицом или маникюр? Я подберу подходящую процедуру и сразу забронирую для Вас место.',
  fr: 'Bonjour et bienvenue chez IVYLUXE SPA & NAIL – 48 rue Ha Trung, Hoan Kiem, Hanoï. Je suis votre conseiller(ère) bien-être et c\'est un plaisir de vous accompagner dans ce moment de détente et de soin de soi.\n\nQue souhaitez-vous aujourd\'hui : un massage du corps, un soulagement des épaules ou des pieds fatigués, un soin du visage ou une beauté des ongles ? Je vous conseille le soin idéal et vous réserve une place tout de suite.',
};
const welcomeFor = (code) => WELCOMES[String(code || '').slice(0, 2).toLowerCase()] || WELCOMES.vi + '\n\nWelcome to IVYLUXE SPA & NAIL! You can chat with me in English, 中文, 日本語, 한국어, Русский or Français.';

module.exports = async (req, res) => {
  if (req.method !== 'POST') return H.send(res, 405, { error: 'Sai phương thức.' });
  if (!TOKEN()) return H.send(res, 503, { error: 'Chưa cài TELEGRAM_BOT_TOKEN.' });
  const got = String(req.headers['x-telegram-bot-api-secret-token'] || '');
  const want = webhookSecret();
  if (got.length !== want.length || !timingSafeEqual(Buffer.from(got), Buffer.from(want))) return H.send(res, 401, { error: 'Sai mã bí mật.' });

  const update = await H.readBody(req, 200000);
  const msg = update.message;
  // Luôn trả 200 để Telegram không gửi lại; bỏ qua những gì không phải tin nhắn chữ
  if (!msg || typeof msg.text !== 'string' || !msg.chat) return H.send(res, 200, { ok: true });
  const store = getStore();
  if ((await store.hit('tg-upd:' + update.update_id, 86400)) > 1) return H.send(res, 200, { ok: true }); // tin trùng

  const chat = msg.chat;
  const isGroup = chat.type === 'group' || chat.type === 'supergroup';
  const botName = String(process.env.TELEGRAM_BOT_USERNAME || (await store.get('tg-bot-username')) || '').toLowerCase();
  let text = msg.text.trim();

  try {
    // Lệnh
    const cmd = text.match(/^\/(\w+)(@\w+)?/);
    if (cmd) {
      if (cmd[2] && botName && cmd[2].slice(1).toLowerCase() !== botName) return H.send(res, 200, { ok: true });
      if (cmd[1] === 'start' || cmd[1] === 'help') {
        await bot.resetHistory(String(chat.id));
        await sendText(chat.id, isGroup ? WELCOMES.vi + '\n\nWelcome! You can chat with me in English, 中文, 日本語, 한국어, Русский or Français.' : welcomeFor(msg.from && msg.from.language_code), isGroup ? msg.message_id : null);
        return H.send(res, 200, { ok: true });
      }
      text = text.replace(cmd[0], '').trim();
      if (!text) return H.send(res, 200, { ok: true });
    }

    // Trong nhóm: chỉ trả lời khi được gọi tên @bot hoặc khi khách trả lời tin của bot
    if (isGroup) {
      const mentioned = botName && text.toLowerCase().includes('@' + botName);
      const replyToBot = msg.reply_to_message && msg.reply_to_message.from && msg.reply_to_message.from.is_bot
        && (!botName || String(msg.reply_to_message.from.username || '').toLowerCase() === botName);
      if (!mentioned && !replyToBot) return H.send(res, 200, { ok: true });
      if (botName) text = text.replace(new RegExp('@' + botName, 'ig'), '').trim();
    }
    if (!text) return H.send(res, 200, { ok: true });

    // Chống spam / giới hạn chi phí: tối đa 30 tin / 10 phút cho mỗi cuộc trò chuyện
    if ((await store.hit('tg-rate:' + chat.id, 600)) > 30) {
      await sendText(chat.id, 'Dạ, hiện bên em có nhiều tin nhắn cùng lúc. Anh/Chị vui lòng đợi ít phút hoặc gọi Hotline/Zalo 098 971 3660 ạ.', msg.message_id);
      return H.send(res, 200, { ok: true });
    }

    await tg('sendChatAction', { chat_id: chat.id, action: 'typing' });
    const sender = [msg.from && msg.from.first_name, msg.from && msg.from.last_name].filter(Boolean).join(' ') || 'Khách';
    const answer = await bot.reply(String(chat.id), `[${sender}]: ${text.slice(0, 2000)}`, { chatTitle: isGroup ? chat.title : '' });
    await sendText(chat.id, answer, isGroup ? msg.message_id : null);
  } catch (e) {
    console.error('[telegram]', e);
    await sendText(chat.id, 'Dạ, em xin lỗi, hệ thống đang bận. Anh/Chị vui lòng nhắn lại sau ít phút hoặc liên hệ Hotline/Zalo 098 971 3660 ạ.', msg.message_id).catch(() => {});
  }
  return H.send(res, 200, { ok: true });
};

module.exports.tg = tg;
module.exports.webhookSecret = webhookSecret;
