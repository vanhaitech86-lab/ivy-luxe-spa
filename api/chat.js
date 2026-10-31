// POST /api/chat — khung chat bot trên website. Dùng CHUNG bộ não với bot Telegram (api/_lib/bot.js):
// cùng kiến thức, bảng giá, ưu đãi, quy tắc viết & xưng hô; khách để lại họ tên + SĐT → vào CRM (nguồn 'webchat').
// POST /api/chat?a=reset — bắt đầu cuộc trò chuyện mới.
const H = require('./_lib/http');
const A = require('./_lib/aff');
const { getStore } = require('./_lib/store');
const bot = require('./_lib/bot');

const BUSY = {
  vi: 'Dạ, hiện bên em có nhiều tin nhắn cùng lúc. Anh/Chị vui lòng đợi ít phút hoặc gọi Hotline/Zalo 098 971 3660 ạ.',
  en: 'We are receiving many messages right now. Please try again in a few minutes or call/Zalo +84 98 971 3660.',
};
const ERROR = {
  vi: 'Dạ, em xin lỗi, hệ thống đang bận. Anh/Chị vui lòng nhắn lại sau ít phút hoặc liên hệ Hotline/Zalo 098 971 3660 ạ.',
  en: 'Sorry, our system is busy. Please try again shortly or call/Zalo +84 98 971 3660.',
};

module.exports = async (req, res) => {
  if (req.method !== 'POST') return H.send(res, 405, { error: 'Sai phương thức.' });
  if (!String(req.headers['content-type'] || '').includes('application/json')) return H.send(res, 415, { error: 'Sai định dạng.' });
  const b = await H.readBody(req, 8000);
  const lang = /^(vi|en|zh|ja|ko|ru|fr)$/.test(b.lang) ? b.lang : 'en';
  const say = (m) => (lang === 'vi' ? m.vi : m.en);
  const sid = String(b.sid || '');
  if (!/^[A-Za-z0-9_-]{12,48}$/.test(sid)) return H.send(res, 400, { error: 'Thiếu mã cuộc trò chuyện.' });
  const key = 'web:' + sid;

  try {
    if (new URL(req.url, 'http://x').searchParams.get('a') === 'reset') {
      await bot.resetHistory(key);
      return H.send(res, 200, { ok: true });
    }
    const text = String(b.text || '').trim().slice(0, 1000);
    if (!text) return H.send(res, 400, { error: 'Tin nhắn trống.' });
    if (!bot.provider()) return H.send(res, 503, { reply: say(ERROR) });

    // Chống spam / giới hạn chi phí AI: theo IP, theo cuộc trò chuyện và tổng mỗi ngày
    const store = getStore();
    const day = new Date(Date.now() + 7 * 3600000).toISOString().slice(0, 10);
    const [ipHits, sidHits, dayHits] = await Promise.all([
      store.hit('chat-ip:' + H.clientIp(req), 600),
      store.hit('chat-sid:' + sid, 600),
      store.hit('chat-day:' + day, 86400),
    ]);
    if (ipHits > 40 || sidHits > 25 || dayHits > 3000) return H.send(res, 429, { reply: say(BUSY) });

    // Khách đến từ link Affiliate (?ref=MÃ) → khách để lại SĐT trong chat cũng được gắn cho đối tác
    const partner = b.ref ? await A.partnerByCode(String(b.ref)).catch(() => null) : null;
    const reply = await bot.reply(key, `[Khách website]: ${text}`, { channel: 'web', lang, ref: partner ? partner.code : '' });
    return H.send(res, 200, { reply });
  } catch (e) {
    console.error('[chat]', e);
    return H.send(res, 500, { reply: say(ERROR) });
  }
};
