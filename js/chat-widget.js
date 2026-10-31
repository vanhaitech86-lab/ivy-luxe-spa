// Khung chat bot IVYLUXE trên website. Câu trả lời đến từ /api/chat — CHUNG bộ não với bot Telegram (api/_lib/bot.js).
// Hai giao diện dùng CHUNG một cuộc trò chuyện:
//   1. Nút chat nổi góc dưới-trái (mọi trang có nạp file này)
//   2. Mục "Nhắn tin với Chuyên viên Tư vấn" dạng iPhone trên trang chủ (khi trang có #ivy-phone-chat)
// Nhãn giao diện theo ngôn ngữ trang (vi / en / zh, ngôn ngữ khác dùng en); bot tự trả lời theo ngôn ngữ khách nhắn.
(function () {
  const STORE_KEY = 'ivy_chat_v1';
  const KEEP_MS = 3 * 86400000; // máy chủ giữ lịch sử 3 ngày → trình duyệt cũng vậy

  const L = {
    vi: {
      launcher: 'Tư vấn ngay',
      teaser: 'Anh/Chị cần tư vấn liệu trình hay bảng giá? Em hỗ trợ ngay ạ!',
      sub: 'Chuyên viên tư vấn · Đang trực tuyến',
      hello: 'Dạ, em kính chào Anh/Chị. Em là Chuyên viên Tư vấn Trị liệu của IVYLUXE SPA & NAIL, Số 48 phố Hà Trung, Hoàn Kiếm, Hà Nội.\nAnh/Chị đang muốn thư giãn toàn thân, giảm đau mỏi vai gáy, chăm sóc da mặt hay làm đẹp móng ạ?',
      chips: ['Bảng giá massage', 'Combo hot nhất', 'Giờ mở cửa & địa chỉ', 'Đặt lịch hẹn'],
      placeholder: 'Nhập câu hỏi của Anh/Chị…',
      phonePlaceholder: 'Tin nhắn',
      send: 'Gửi',
      reset: 'Cuộc trò chuyện mới',
      close: 'Đóng',
      note: 'Trợ lý AI của spa · Hotline/Zalo',
      error: 'Dạ, kết nối đang chập chờn. Anh/Chị vui lòng thử lại hoặc gọi Hotline/Zalo 098 971 3660 ạ.',
      today: 'Hôm nay',
      delivered: 'Đã gửi',
      secEyebrow: 'Tư vấn trực tuyến 24/7',
      secTitle: 'Nhắn Tin Với Chuyên Viên Tư Vấn',
      secDesc: 'Hỏi giá, chọn liệu trình phù hợp và giữ chỗ ngay trên điện thoại. Em trả lời trong vài giây, bằng Tiếng Việt, English hay 中文.',
      secPoints: ['Tư vấn liệu trình theo tình trạng cơ thể', 'Báo giá và ưu đãi đang áp dụng', 'Giữ chỗ: Để lại tên và SĐT, spa gọi xác nhận'],
    },
    en: {
      launcher: 'Chat with us',
      teaser: 'Need help choosing a treatment? Ask me anything!',
      sub: 'Wellness consultant · Online',
      hello: 'Welcome to IVYLUXE SPA & NAIL at 48 Ha Trung Street, Hoan Kiem, Hanoi. I am your wellness consultant.\nAre you looking for a full-body massage, relief for tired shoulders, facial care or nail care? You can chat in English, Tiếng Việt or 中文.',
      chips: ['Massage prices', 'Best combos', 'Opening hours & location', 'Book an appointment'],
      placeholder: 'Type your question…',
      phonePlaceholder: 'Message',
      send: 'Send',
      reset: 'New conversation',
      close: 'Close',
      note: 'AI assistant · Hotline/Zalo',
      error: 'Connection problem. Please try again or call/Zalo +84 98 971 3660.',
      today: 'Today',
      delivered: 'Delivered',
      secEyebrow: 'Online consultation 24/7',
      secTitle: 'Message Our Wellness Consultant',
      secDesc: 'Ask about prices, find the right treatment and reserve your spot from your phone. Replies in seconds, in English, Tiếng Việt or 中文.',
      secPoints: ['Treatment advice for your body condition', 'Prices and current offers', 'Reserve: Leave your name and phone, we call to confirm'],
    },
    zh: {
      launcher: '在线咨询',
      teaser: '需要推荐护理项目或查看价格吗？随时问我！',
      sub: '理疗顾问 · 在线',
      hello: '欢迎光临 IVYLUXE SPA & NAIL（河内还剑郡 Ha Trung 街 48 号）。我是您的理疗顾问。\n请问您想要全身放松按摩、缓解肩颈酸痛、面部护理还是美甲呢？',
      chips: ['按摩价格', '热门套餐', '营业时间和地址', '我要预约'],
      placeholder: '请输入您的问题…',
      phonePlaceholder: '信息',
      send: '发送',
      reset: '新的对话',
      close: '关闭',
      note: 'AI 助手 · 热线/Zalo',
      error: '网络连接不稳定，请重试或拨打热线/Zalo +84 98 971 3660。',
      today: '今天',
      delivered: '已送达',
      secEyebrow: '24/7 在线咨询',
      secTitle: '与理疗顾问在线聊天',
      secDesc: '在手机上咨询价格、选择适合的护理项目并立即预约。几秒内回复，支持中文、English 和 Tiếng Việt。',
      secPoints: ['根据身体状况推荐护理项目', '价格与当前优惠', '预约：留下姓名和电话，我们将致电确认'],
    },
  };

  function safeGet(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function safeSet(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* trình duyệt chặn lưu trữ */ } }

  const pageLang = () => {
    const l = (document.documentElement.lang || '').slice(0, 2) || safeGet('ivy_lang') || 'en';
    return /^(vi|en|zh|ja|ko|ru|fr)$/.test(l) ? l : 'en';
  };
  const T = () => L[pageLang()] || L.en;

  // ---------- Lõi chung: cuộc trò chuyện + gửi tin ----------
  function newSid() {
    const a = new Uint8Array(16);
    (window.crypto || window.msCrypto).getRandomValues(a);
    return Array.from(a, (b) => b.toString(16).padStart(2, '0')).join('');
  }
  function loadState() {
    try {
      const s = JSON.parse(safeGet(STORE_KEY) || 'null');
      if (s && s.sid && Date.now() - (s.at || 0) < KEEP_MS) return s;
    } catch (e) { /* bỏ qua dữ liệu hỏng */ }
    return { sid: newSid(), msgs: [], at: Date.now() };
  }
  let state = loadState();
  let busy = false;
  const views = [];
  const save = () => { state.at = Date.now(); state.msgs = state.msgs.slice(-40); safeSet(STORE_KEY, JSON.stringify(state)); };
  const renderAll = () => views.forEach((v) => v.render());

  async function send(text) {
    text = String(text || '').trim();
    if (!text || busy) return;
    state.msgs.push({ r: 'u', t: text });
    busy = true;
    save();
    renderAll();
    let reply;
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sid: state.sid, text, lang: pageLang(), ref: safeGet('ivy_affiliate_ref') || '' }),
      });
      const data = await res.json().catch(() => ({}));
      reply = data.reply || T().error;
    } catch (e) {
      reply = T().error;
    }
    busy = false;
    state.msgs.push({ r: 'b', t: reply });
    save();
    renderAll();
  }

  function resetChat() {
    if (busy) return;
    fetch('/api/chat?a=reset', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ sid: state.sid }) }).catch(() => {});
    state = { sid: newSid(), msgs: [], at: Date.now() };
    save();
    renderAll();
  }

  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  // Chữ của bot: chống chèn mã, tự tạo link cho số điện thoại và địa chỉ web
  function linkify(text) {
    return esc(text)
      .replace(/(https?:\/\/[^\s<]+[^\s<.,;:!?)])/g, '<a href="$1" target="_blank" rel="noopener">$1</a>')
      .replace(/(\+?84[\s.]?|0)(9\d)[\s.]?(\d{3})[\s.]?(\d{4})\b/g, (m, p, a, b, c) => `<a href="tel:+84${a}${b}${c}">${m}</a>`);
  }

  /**
   * Gắn một giao diện chat vào phần tử có sẵn khung: .js-body, .js-chips, .js-form, .js-input, .js-send.
   * cls: tên lớp cho bong bóng khách / bot / đang gõ / nút gợi ý; extra(body) vẽ thêm (VD: dòng "Đã gửi").
   */
  function makeView(el, cls, extra) {
    const q = (s) => el.querySelector(s);
    const body = q('.js-body');
    const input = q('.js-input');
    const sendBtn = q('.js-send');
    const form = q('.js-form');

    function bubble(role, text) {
      const div = document.createElement('div');
      div.className = role === 'u' ? cls.user : cls.bot;
      if (role === 'u') div.textContent = text;
      else div.innerHTML = linkify(text);
      return div;
    }
    function render() {
      body.innerHTML = '';
      if (cls.before) cls.before(body);
      body.appendChild(bubble('b', T().hello)); // lời chào theo ngôn ngữ trang, không gửi lên máy chủ
      state.msgs.forEach((m) => body.appendChild(bubble(m.r, m.t)));
      if (extra) extra(body);
      if (busy) {
        const typing = document.createElement('div');
        typing.className = cls.typing;
        typing.innerHTML = '<i></i><i></i><i></i>';
        body.appendChild(typing);
      }
      const chips = q('.js-chips');
      chips.innerHTML = '';
      if (!state.msgs.length) {
        T().chips.forEach((c) => {
          const b = document.createElement('button');
          b.type = 'button';
          b.className = cls.chip;
          b.textContent = c;
          b.addEventListener('click', () => send(c));
          chips.appendChild(b);
        });
      }
      sendBtn.disabled = busy;
      body.scrollTop = body.scrollHeight;
    }
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const v = input.value;
      input.value = '';
      input.style.height = '';
      send(v);
    });
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey && !e.isComposing) { // Enter gửi, Shift+Enter xuống dòng (gõ tiếng Trung/Việt không bị gửi giữa chừng)
        e.preventDefault();
        form.requestSubmit();
      }
    });
    input.addEventListener('input', () => { input.style.height = ''; input.style.height = Math.min(input.scrollHeight, 110) + 'px'; });
    const view = { render, input };
    views.push(view);
    return view;
  }

  // ---------- Giao diện 1: nút chat nổi ----------
  const root = document.createElement('div');
  root.id = 'ivy-chat';
  root.setAttribute('data-no-i18n', ''); // không để bộ dịch tự động của trang sửa câu trả lời của bot
  root.innerHTML = `
    <button type="button" class="ic-launcher" aria-haspopup="dialog">
      <span class="ic-launcher-icon"><i class="fa fa-commenting" aria-hidden="true"></i></span>
      <span class="ic-launcher-text"></span>
    </button>
    <div class="ic-teaser" hidden><span class="ic-teaser-text"></span><button type="button" class="ic-teaser-x" aria-label="×">×</button></div>
    <section class="ic-panel" role="dialog" aria-modal="false" aria-label="IVYLUXE SPA & NAIL">
      <header class="ic-head">
        <span class="ic-avatar" aria-hidden="true"></span>
        <div class="ic-title"><div class="ic-name">IVYLUXE SPA &amp; NAIL</div><div class="ic-sub"></div></div>
        <button type="button" class="ic-hbtn ic-reset"><i class="fa fa-refresh" aria-hidden="true"></i></button>
        <button type="button" class="ic-hbtn ic-close"><i class="fa fa-times" aria-hidden="true"></i></button>
      </header>
      <div class="ic-body js-body" aria-live="polite"></div>
      <div class="ic-chips js-chips"></div>
      <form class="ic-form js-form">
        <textarea class="ic-input js-input" rows="1" maxlength="1000"></textarea>
        <button type="submit" class="ic-send js-send"><i class="fa fa-paper-plane" aria-hidden="true"></i></button>
      </form>
      <div class="ic-note"><span class="ic-note-text"></span> <a href="tel:+84989713660">098 971 3660</a></div>
    </section>`;
  const $ = (s) => root.querySelector(s);
  const floating = makeView(root, { user: 'ic-msg ic-user', bot: 'ic-msg ic-bot', typing: 'ic-msg ic-bot ic-typing', chip: 'ic-chip' });

  function openFloating() {
    root.classList.add('ic-open');
    safeSet('ivy_chat_seen', '1');
    floating.render();
    setTimeout(() => floating.input.focus(), 50);
  }
  const closeFloating = () => root.classList.remove('ic-open');

  $('.ic-launcher').addEventListener('click', openFloating);
  $('.ic-teaser').addEventListener('click', (e) => {
    $('.ic-teaser').hidden = true;
    if (!e.target.closest('.ic-teaser-x')) openFloating();
  });
  $('.ic-close').addEventListener('click', closeFloating);
  $('.ic-reset').addEventListener('click', () => { resetChat(); floating.input.focus(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && root.classList.contains('ic-open')) closeFloating(); });

  // ---------- Giao diện 2: mục iPhone trên trang chủ ----------
  let phone = null;
  function mountPhone() {
    const host = document.getElementById('ivy-phone-chat');
    if (!host) return;
    host.setAttribute('data-no-i18n', '');
    host.innerHTML = `
      <div class="ip-wrap">
        <div class="ip-copy">
          <span class="ip-eyebrow"><i class="fa fa-commenting" aria-hidden="true"></i> <span class="js-sec-eyebrow"></span></span>
          <h2 class="ip-title js-sec-title"></h2>
          <p class="ip-desc js-sec-desc"></p>
          <ul class="ip-points js-sec-points"></ul>
        </div>
        <div class="ip-device" role="region" aria-label="IVYLUXE SPA & NAIL chat">
          <div class="ip-screen">
            <div class="ip-status" aria-hidden="true">
              <span class="ip-time">9:41</span>
              <span class="ip-island"></span>
              <span class="ip-icons"><i class="fa fa-signal"></i><i class="fa fa-wifi"></i><span class="ip-battery"><span></span></span></span>
            </div>
            <div class="ip-head">
              <button type="button" class="ip-back js-reset"><i class="fa fa-refresh" aria-hidden="true"></i></button>
              <div class="ip-contact">
                <span class="ip-avatar" aria-hidden="true"></span>
                <span class="ip-name">IVYLUXE SPA &amp; NAIL <i class="fa fa-angle-right" aria-hidden="true"></i></span>
              </div>
              <a class="ip-call" href="tel:+84989713660" aria-label="Hotline 098 971 3660"><i class="fa fa-phone" aria-hidden="true"></i></a>
            </div>
            <div class="ip-body js-body" aria-live="polite"></div>
            <div class="ip-chips js-chips"></div>
            <form class="ip-form js-form">
              <span class="ip-plus" aria-hidden="true"><i class="fa fa-plus"></i></span>
              <div class="ip-field">
                <textarea class="ip-input js-input" rows="1" maxlength="1000"></textarea>
                <button type="submit" class="ip-send js-send"><i class="fa fa-arrow-up" aria-hidden="true"></i></button>
              </div>
            </form>
            <div class="ip-home" aria-hidden="true"></div>
          </div>
        </div>
      </div>`;
    const q = (s) => host.querySelector(s);
    phone = makeView(host, {
      user: 'ip-msg ip-user',
      bot: 'ip-msg ip-bot',
      typing: 'ip-msg ip-bot ip-typing',
      chip: 'ip-chip',
      before: (body) => {
        const d = document.createElement('div');
        d.className = 'ip-day';
        d.textContent = T().today;
        body.appendChild(d);
      },
    }, (body) => {
      // Dòng "Đã gửi" dưới tin cuối của khách (giống ứng dụng Tin nhắn)
      const last = state.msgs[state.msgs.length - 1];
      if (last && last.r === 'u') {
        const d = document.createElement('div');
        d.className = 'ip-delivered';
        d.textContent = T().delivered;
        body.appendChild(d);
      }
    });
    q('.js-reset').addEventListener('click', resetChat);
    phone.applyLabels = () => {
      const t = T();
      q('.js-sec-eyebrow').textContent = t.secEyebrow;
      q('.js-sec-title').textContent = t.secTitle;
      q('.js-sec-desc').textContent = t.secDesc;
      q('.js-sec-points').innerHTML = t.secPoints.map((p) => `<li><i class="fa fa-check-circle" aria-hidden="true"></i> ${esc(p)}</li>`).join('');
      phone.input.placeholder = t.phonePlaceholder;
      q('.js-send').setAttribute('aria-label', t.send);
      q('.js-reset').title = t.reset;
      q('.js-reset').setAttribute('aria-label', t.reset);
    };
    // Đang xem mục nhắn tin → đánh dấu để CSS ẩn các nút nổi trên điện thoại (không đè khung chat)
    const device = q('.ip-device');
    const markActive = () => {
      const r = device.getBoundingClientRect();
      const seen = Math.min(window.innerHeight, r.bottom) - Math.max(0, r.top);
      document.body.classList.toggle('ivy-phone-chat-active', seen > Math.min(r.height, window.innerHeight) * 0.35);
    };
    window.addEventListener('scroll', markActive, { passive: true });
    window.addEventListener('resize', markActive);
    markActive();
    // Khách đã chat ở khung iPhone → không hiện lời mời của nút nổi nữa
    phone.input.addEventListener('focus', () => safeSet('ivy_chat_seen', '1'));
  }

  function applyLabels() {
    const t = T();
    $('.ic-launcher-text').textContent = t.launcher;
    $('.ic-launcher').setAttribute('aria-label', t.launcher);
    $('.ic-teaser-text').textContent = t.teaser;
    $('.ic-sub').textContent = t.sub;
    floating.input.placeholder = t.placeholder;
    $('.js-send').setAttribute('aria-label', t.send);
    $('.ic-reset').title = t.reset;
    $('.ic-reset').setAttribute('aria-label', t.reset);
    $('.ic-close').title = t.close;
    $('.ic-close').setAttribute('aria-label', t.close);
    $('.ic-note-text').textContent = t.note;
    if (phone) phone.applyLabels();
    renderAll();
  }

  function mount() {
    document.body.appendChild(root);
    mountPhone();
    applyLabels();
    // Trang đổi ngôn ngữ → đổi nhãn khung chat
    new MutationObserver(applyLabels).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
    // Tab khác vừa nhắn (cùng trình duyệt) → cập nhật cuộc trò chuyện
    window.addEventListener('storage', (e) => { if (e.key === STORE_KEY && !busy) { state = loadState(); renderAll(); } });
    // Lời mời nhỏ sau 8 giây, mỗi phiên một lần, khi khách chưa từng mở chat
    let teased = false;
    try { teased = Boolean(sessionStorage.getItem('ivy_chat_teased')); } catch (e) { /* bỏ qua */ }
    if (!safeGet('ivy_chat_seen') && !teased) {
      setTimeout(() => {
        if (root.classList.contains('ic-open') || safeGet('ivy_chat_seen')) return;
        $('.ic-teaser').hidden = false;
        try { sessionStorage.setItem('ivy_chat_teased', '1'); } catch (e) { /* bỏ qua */ }
      }, 8000);
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount);
  else mount();
})();
