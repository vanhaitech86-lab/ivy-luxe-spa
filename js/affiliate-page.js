// Trang Đối tác Affiliate — đọc/ghi dữ liệu THẬT trên máy chủ (/api/aff, /api/account).
// Giữ nguyên tên các hàm mà HTML gọi (onclick/onsubmit).
(function () {
  'use strict';

  const COOKIE_CHOICE_KEY = 'ivy_cookie_consent';
  let me = null;            // { user, partner, orders, clicks, payouts, summary, ranking }
  let currentAffiliate = null;
  let perfDays = 7;

  const $ = (id) => document.getElementById(id);
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const money = (n) => (Number(n) || 0).toLocaleString('vi-VN') + 'đ';
  const fmtDate = (ms) => (ms ? new Date(ms).toLocaleString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : '');
  const setText = (id, v) => { const el = $(id); if (el) el.textContent = v; };

  function showAffToast(message, type = 'success') {
    const container = $('aff-toast-container');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = `aff-toast aff-toast-${type}`;
    const icon = type === 'error' ? 'fa-exclamation-triangle' : type === 'info' ? 'fa-info-circle' : 'fa-check-circle';
    toast.innerHTML = `<i class="fa ${icon} aff-toast-icon"></i><div class="aff-toast-text"></div>`;
    toast.querySelector('.aff-toast-text').textContent = message;
    container.appendChild(toast);
    setTimeout(() => {
      toast.classList.add('aff-toast-hide');
      setTimeout(() => toast.remove(), 300);
    }, 3800);
  }

  function notice(html, kind) {
    const el = $('aff-auth-notice');
    if (!el) return;
    if (!html) { el.style.display = 'none'; return; }
    const ok = kind !== 'warn';
    el.style.display = 'block';
    el.style.background = ok ? '#EAF7EF' : '#FDF6E3';
    el.style.border = '1px solid ' + (ok ? '#9ED3B1' : '#E6C76A');
    el.style.color = ok ? '#14532D' : '#5C4510';
    el.innerHTML = html;
  }

  async function api(path, body) {
    const opts = body === undefined
      ? { credentials: 'same-origin', cache: 'no-store' }
      : { method: 'POST', credentials: 'same-origin', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) };
    try {
      const res = await fetch(path, opts);
      const data = await res.json().catch(() => ({}));
      return { ok: res.ok, status: res.status, data };
    } catch (e) {
      return { ok: false, status: 0, data: { error: 'Không kết nối được máy chủ, vui lòng kiểm tra mạng.' } };
    }
  }

  const refLink = (code, service) => window.location.origin + '/?ref=' + encodeURIComponent(code) + (service ? '&service=' + encodeURIComponent(service) : '');
  // Mã QR tạo ngay trên trình duyệt (thư viện qrcode-generator, MIT) — không gửi link ra dịch vụ ngoài
  const qr = (link, size) => {
    try {
      const q = qrcode(0, 'M');
      q.addData(link);
      q.make();
      const n = q.getModuleCount();
      const cell = Math.max(2, Math.floor(size / (n + 8)));
      const px = cell * (n + 8);
      const c = document.createElement('canvas');
      c.width = c.height = px;
      const g = c.getContext('2d');
      g.fillStyle = '#FFFFFF';
      g.fillRect(0, 0, px, px);
      g.fillStyle = '#10301E';
      for (let r = 0; r < n; r++) for (let k = 0; k < n; k++) if (q.isDark(r, k)) g.fillRect((k + 4) * cell, (r + 4) * cell, cell, cell);
      return c.toDataURL('image/png');
    } catch (e) {
      return 'https://api.qrserver.com/v1/create-qr-code/?size=' + size + 'x' + size + '&data=' + encodeURIComponent(link);
    }
  };

  // ---------- Chuyển màn hình ----------
  function switchAuthTab(type) {
    const isReg = type === 'register';
    $('btn-tab-reg').classList.toggle('active', isReg);
    $('btn-tab-login').classList.toggle('active', !isReg);
    $('aff-register-main-form').style.display = isReg ? 'block' : 'none';
    $('aff-login-main-form').style.display = isReg ? 'none' : 'block';
  }

  function showView(viewName) {
    const dash = viewName === 'dashboard';
    $('aff-view-register').style.display = dash ? 'none' : 'block';
    $('aff-view-dashboard').style.display = dash ? 'block' : 'none';
    setText('aff-mode-btn-text', dash ? 'Đăng Ký Đối Tác Mới' : 'Xem Dashboard Quản Lý');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async function toggleAffiliatePageMode() {
    if ($('aff-view-dashboard').style.display === 'none') {
      if (me && me.partner) { showView('dashboard'); return; }
      const data = await refreshAffData();
      if (data && data.partner) return;
      switchAuthTab('login');
      showAffToast('Vui lòng đăng nhập (Gmail, số điện thoại hoặc Google) để xem Dashboard Đối tác.', 'info');
      const f = $('aff-login-email');
      if (f) { f.scrollIntoView({ behavior: 'smooth', block: 'center' }); f.focus(); }
    } else {
      showView('register');
    }
  }

  function switchDashboardTab(tabId, el) {
    document.querySelectorAll('.aff-nav-pill').forEach((b) => b.classList.remove('active'));
    document.querySelectorAll('.aff-dash-tab-pane').forEach((p) => p.classList.remove('active'));
    const btn = el || document.querySelector('[data-dash-tab="' + tabId + '"]');
    if (btn) btn.classList.add('active');
    const target = $('dash-tab-' + tabId);
    if (target) target.classList.add('active');
  }

  // Ô ước tính hoa hồng (minh hoạ, không phải số liệu thật)
  function updateCommissionCalc(val) {
    const guests = parseInt(val, 10) || 1;
    const rate = 10; // hoa hồng cố định, 1 tầng
    const turnover = guests * 900000;
    setText('calc-guests-count', guests + ' khách');
    setText('calc-turnover-val', money(turnover));
    setText('calc-commission-val', money(Math.round((turnover * rate) / 100)));
    const tierEl = $('calc-tier-badge');
    if (tierEl) tierEl.innerHTML = '<i class="fa fa-check-circle"></i> Hoa hồng <strong>10% cố định · chỉ khách F1 trực tiếp</strong>';
  }

  // ---------- Tải & hiển thị số liệu thật ----------
  // Đã đăng nhập web → tự kích hoạt hồ sơ đối tác (auto=1) rồi mở thẳng Dashboard
  async function refreshAffData(toast) {
    const r = await api('/api/aff?a=me&auto=1');
    if (r.status === 401) { me = null; renderLoggedOut(); return null; }
    if (!r.ok) { showAffToast(r.data.error || 'Chưa tải được dữ liệu.', 'error'); return null; }
    me = r.data;
    if (me.partner) {
      renderDashboardData();
      if (me.activated) showAffToast('🎉 Đã kích hoạt tài khoản Đối tác cho ' + me.user.email + '. Link giới thiệu riêng của bạn đã sẵn sàng.');
      else if (toast) showAffToast('Đã cập nhật số liệu mới nhất.');
    } else {
      renderNeedPartnerProfile();
    }
    return me;
  }

  function fieldGroup(id) {
    const el = $(id);
    return el ? el.closest('.aff-input-group') : null;
  }

  function renderLoggedOut() {
    [fieldGroup('aff-input-email'), fieldGroup('aff-input-pass')].forEach((g) => { if (g) g.style.display = ''; });
    $('aff-input-email').required = true;
    $('aff-input-pass').required = true;
  }

  // Đã đăng nhập web (VD: Google) nhưng chưa có hồ sơ đối tác → chỉ cần điền tên, SĐT, mã
  function renderNeedPartnerProfile() {
    switchAuthTab('register');
    [fieldGroup('aff-input-email'), fieldGroup('aff-input-pass')].forEach((g) => { if (g) g.style.display = 'none'; });
    $('aff-input-email').required = false;
    $('aff-input-pass').required = false;
    if (!$('aff-input-fullname').value) $('aff-input-fullname').value = me.user.name || '';
    if (!$('aff-input-phone').value) $('aff-input-phone').value = me.user.phone || '';
    notice('<i class="fa fa-user-circle"></i> Bạn đang đăng nhập bằng <strong>' + esc(me.user.email) + '</strong>. Điền thêm thông tin bên dưới để kích hoạt tài khoản Đối tác.', 'ok');
    showView('register');
  }

  function renderDashboardData() {
    const p = me.partner;
    currentAffiliate = p;
    const s = me.summary;
    const code = p.code;
    const display = 'IVY-' + code;
    const link = refLink(code);

    setText('aff-dash-partner-name', 'Dashboard: ' + (p.name || 'Đối Tác Tiếp Thị'));
    setText('aff-dash-email-display', p.email);
    setText('aff-dash-code-display', display);
    setText('aff-dash-rate', (p.rate || 10) + '%');

    setText('stat-total-clicks', me.clicks.total);
    setText('stat-month-clicks', 'Tháng này: ' + me.clicks.month + ' lượt truy cập');
    setText('stat-orders-success', s.ordersSuccess);
    setText('stat-orders-pending', 'Đang chờ xử lý: ' + s.ordersPending + ' khách');
    setText('stat-pending-amount', money(s.pendingAmount));
    setText('stat-received-amount', money(s.availableAmount));
    setText('stat-received-sub', s.paidAmount ? 'Đã nhận: ' + money(s.paidAmount) + (s.requestedAmount ? ' · Đang chờ chuyển: ' + money(s.requestedAmount) : '') : (s.requestedAmount ? 'Đang chờ chuyển: ' + money(s.requestedAmount) : 'Sẵn sàng để rút về tài khoản'));

    const linkInput = $('dash-full-ref-link');
    if (linkInput) linkInput.value = link;
    const qrImg = $('dash-qr-img');
    if (qrImg) qrImg.src = qr(link, 200);
    const heroQr = $('aff-hero-qr-img');
    if (heroQr) heroQr.src = qr(link, 264);
    setText('dash-code-tag', display);
    setText('voucher-code-display', display);
    const vqr = $('voucher-qr-img');
    if (vqr) vqr.src = qr(link, 120);
    setText('dash-tpl-msg', `Dạ em gửi anh/chị ưu đãi trải nghiệm Massage Body & Spa đẳng cấp 5 sao tại IVYLUXE SPA & NAIL (Số 48 phố Hà Trung, phường Hoàn Kiếm, Hà Nội). Đặt qua link riêng này được GIẢM 10% & TẶNG NGÂM CHÂN THẢO DƯỢC: ${link} (Mã ưu đãi: ${display}) - Hotline/Zalo: 098 971 3660.`);
    setText('dash-tpl-msg-en', `Hello! For top-rated luxury massage & wellness in Hanoi Old Quarter, visit IVYLUXE SPA & NAIL at 48 Ha Trung, Hoan Kiem. Book with my VIP link for 10% OFF + FREE herbal foot soak: ${link} (Code: ${display}) - WhatsApp: +84 98 971 3660.`);

    setText('payout-avail-amount', money(s.availableAmount));
    if ($('bank-name-input')) $('bank-name-input').value = p.bankName || '';
    if ($('bank-account-num')) $('bank-account-num').value = p.bankNum || '';
    if ($('bank-account-holder')) $('bank-account-holder').value = p.bankHolder || '';

    renderNetworkTable();
    renderRanking();
    renderSales();
    renderProfile();
    filterPerformanceDays(perfDays, document.querySelector('.aff-time-pill.active'));
    updateCommissionCalc($('calc-guests-range') ? $('calc-guests-range').value : 25);
    notice('');
    showView('dashboard');
  }

  const STATE_STYLE = {
    done: 'background:#E8F8F0; color:#15803D;',
    hold: 'background:#FDF8EE; color:#9A7516;',
    wait: 'background:#EAF2FB; color:#1E4E8C;',
    lead: 'background:#EBF4EE; color:#123826;',
    cancel: 'background:#FBEAEC; color:#7B1E2B;',
  };

  // Thành viên F1: tạo tài khoản qua link của đối tác (không có tầng F2)
  function renderF1Table() {
    const tbody = $('dash-f1-rows');
    const list = me.members || [];
    setText('f1-count', list.length);
    setText('pill-network-count', list.length);
    setText('stat-f1-count', list.length);
    if (!tbody) return;
    if (!list.length) {
      tbody.innerHTML = `<tr><td colspan="5" style="text-align:center; padding:30px; color:var(--aff-gray-sub);">
        Chưa có thành viên F1. Gửi link giới thiệu cho bạn bè, khách lưu trú — ai mở link rồi tạo tài khoản trong 30 ngày sẽ hiện ở đây.
      </td></tr>`;
      return;
    }
    tbody.innerHTML = list.map((m) => `
      <tr>
        <td><strong>${esc(m.name)}</strong></td>
        <td>${esc(m.email)}</td>
        <td>${esc(fmtDate(m.joinedAt))}</td>
        <td>${esc(m.via)}</td>
        <td>${m.partner ? '<span class="aff-f1-tag yes">Đã là đối tác</span>' : '<span class="aff-f1-tag">Thành viên</span>'}</td>
      </tr>`).join('');
  }

  function renderNetworkTable() {
    renderF1Table();
    const tbody = $('dash-network-rows');
    if (!tbody) return;
    const orders = me.orders || [];
    if (!orders.length) {
      tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; padding:36px; color:var(--aff-gray-sub);">
        <i class="fa fa-info-circle" style="font-size:1.5rem; display:block; margin-bottom:8px; color:var(--aff-gold);"></i>
        Chưa có khách nào đến qua link của bạn. Khi khách mở link giới thiệu rồi <strong>để lại thông tin</strong> hoặc <strong>đặt lịch</strong> trên website, khách sẽ hiện ở đây ngay.
      </td></tr>`;
      return;
    }
    tbody.innerHTML = orders.map((o) => `
      <tr>
        <td><strong>${esc(o.id)}</strong><div style="font-size:0.78rem; color:var(--aff-gray-sub);">${esc(fmtDate(o.createdAt))}</div></td>
        <td><strong>${esc(o.customer)}</strong><div style="font-size:0.78rem; color:var(--aff-gray-sub);">${esc(o.phone)}</div></td>
        <td>${esc(o.service)}</td>
        <td><strong>${o.amount ? money(o.amount) : '—'}</strong></td>
        <td><strong style="color:var(--aff-gold);">${o.commission ? money(o.commission) : '—'}</strong> <span style="font-size:0.75rem; color:var(--aff-gray-sub);">(${esc(o.rate)}%)</span></td>
        <td><span class="aff-status-pill" style="${STATE_STYLE[o.state] || ''}">${esc(o.status)}</span>${o.releaseAt ? `<div style="font-size:0.74rem; color:var(--aff-gray-sub); margin-top:4px;">Rút được từ ${esc(new Date(o.releaseAt).toLocaleDateString('vi-VN'))}</div>` : ''}</td>
      </tr>`).join('');
  }

  // Bảng vinh danh Top 20 (ảnh + tên hiển thị, số đơn & lượt click — không lộ doanh thu/hoa hồng)
  function renderRanking() {
    const box = $('rank-rows');
    if (!box) return;
    const rows = me.ranking || [];
    const medal = (n) => `<span class="aff-rank-medal${n <= 3 ? ' aff-rank-' + n : ''}">${n}</span>`;
    box.innerHTML = rows.length ? rows.map((r) => `
      <div class="aff-leader-row${r.me ? ' is-me' : ''}">
        ${medal(r.rank)}
        <img class="aff-leader-avatar" src="${esc(r.avatar || 'assets/images/logo.png')}" alt="" loading="lazy">
        <div class="aff-leader-name"><strong data-no-i18n>${esc(r.name)}</strong>${r.me ? ' <span class="aff-me-tag">Bạn</span>' : ''}<small>${esc(r.type)}</small></div>
        <div class="aff-leader-stat"><b>${r.orders}</b><small>đơn</small></div>
        <div class="aff-leader-stat"><b>${r.clicks}</b><small>click</small></div>
      </div>`).join('') : '<div class="aff-leader-empty">Tháng này chưa có đối tác nào có đơn hoàn tất. Hãy là người đầu tiên!</div>';
  }

  // Hồ sơ hiển thị: tên + ảnh đại diện (thu nhỏ 320px trên máy rồi gửi lên)
  let pendingAvatar = '';
  function renderProfile() {
    const p = me.partner;
    if ($('aff-display-name') && document.activeElement !== $('aff-display-name')) $('aff-display-name').value = p.displayName || p.name || '';
    if ($('aff-avatar-img') && !pendingAvatar) $('aff-avatar-img').src = p.avatar || 'assets/images/logo.png';
  }
  function shrinkImage(file) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const url = URL.createObjectURL(file);
      img.onload = () => {
        const size = 320;
        const c = document.createElement('canvas');
        c.width = size; c.height = size;
        const k = Math.max(size / img.width, size / img.height);
        const w = img.width * k, h = img.height * k;
        c.getContext('2d').drawImage(img, (size - w) / 2, (size - h) / 2, w, h); // cắt vuông giữa ảnh
        URL.revokeObjectURL(url);
        resolve(c.toDataURL('image/jpeg', 0.86));
      };
      img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('Không đọc được ảnh này.')); };
      img.src = url;
    });
  }
  document.addEventListener('change', async (e) => {
    if (e.target.id !== 'aff-avatar-file' || !e.target.files[0]) return;
    try {
      pendingAvatar = await shrinkImage(e.target.files[0]);
      $('aff-avatar-img').src = pendingAvatar;
    } catch (err) { showAffToast(err.message, 'error'); }
  });
  async function saveAffProfile(e) {
    e.preventDefault();
    const btn = $('aff-btn-save-profile');
    if (btn) btn.disabled = true;
    const r = await api('/api/aff?a=profile', { displayName: $('aff-display-name').value.trim(), avatar: pendingAvatar || undefined });
    if (btn) btn.disabled = false;
    if (!r.ok) { showAffToast(r.data.error || 'Chưa lưu được.', 'error'); return; }
    pendingAvatar = '';
    showAffToast('✓ Đã lưu hồ sơ hiển thị!');
    await refreshAffData();
  }

  // Doanh số từ Affiliate: 3 thẻ + biểu đồ 6 tháng + đơn gần nhất
  function renderSales() {
    const s = me.sales || { total: 0, confirmed: 0, month: 0, orders: 0, series: [] };
    setText('sale-total', money(s.total));
    setText('sale-orders', s.orders + ' đơn');
    setText('sale-confirmed', money(s.confirmed));
    setText('sale-month', money(s.month));
    const cur = s.series.length ? s.series[s.series.length - 1].m : '';
    setText('sale-month-label', cur ? cur.split('-').reverse().join('/') : '—');
    const max = Math.max(1, ...s.series.map((x) => x.total));
    const short = (n) => (n >= 1e6 ? (n / 1e6).toFixed(n % 1e6 ? 1 : 0) + 'tr' : n >= 1e3 ? Math.round(n / 1e3) + 'k' : String(n));
    if ($('sale-chart')) $('sale-chart').innerHTML = s.series.map((x) => `
      <div class="aff-sale-col">
        <em>${x.total ? short(x.total) : ''}</em>
        <div class="aff-sale-bars">
          <i class="b-total" style="height:${Math.round((x.total / max) * 100)}%"></i>
          <i class="b-conf" style="height:${Math.round((x.confirmed / max) * 100)}%"></i>
        </div>
        <small>${x.m.split('-').reverse().join('/')}</small>
      </div>`).join('');
    const recent = (me.orders || []).filter((o) => o.amount > 0).slice(0, 5);
    if ($('sale-recent')) $('sale-recent').innerHTML = recent.length ? recent.map((o) => `
      <div class="aff-sale-item">
        <div><strong data-no-i18n>${esc(o.customer)}</strong><small>${esc(o.service)}</small></div>
        <div class="r"><b>${money(o.amount)}</b><span class="aff-status-pill st-${o.state}">${esc(o.status)}</span></div>
      </div>`).join('') : '<div class="aff-leader-empty">Chưa có đơn nào từ khách bạn giới thiệu. Khi khách F1 đặt dịch vụ trên website, doanh số hiện ở đây ngay.</div>';
  }

  // Biểu đồ click theo ngày (dữ liệu thật)
  function filterPerformanceDays(days, btn) {
    perfDays = days;
    document.querySelectorAll('.aff-time-pill').forEach((b) => b.classList.remove('active'));
    if (btn) btn.classList.add('active');
    else document.querySelectorAll('.aff-time-pill').forEach((b) => { if (parseInt(b.textContent, 10) === days) b.classList.add('active'); });
    const series = me && me.clicks ? me.clicks.days.slice(-days) : [];
    const total = series.reduce((s, d) => s + d.n, 0);
    setText('perf-clicks-count', total);
    setText('perf-sub-label', `lượt click qua link của bạn trong ${days} ngày qua`);

    // Gộp thành tối đa 15 điểm để biểu đồ dễ nhìn
    const buckets = [];
    const size = Math.max(1, Math.ceil(series.length / 15));
    for (let i = 0; i < series.length; i += size) buckets.push(series.slice(i, i + size).reduce((s, d) => s + d.n, 0));
    const max = Math.max(1, ...buckets);
    const pts = buckets.map((v, i) => [buckets.length === 1 ? 800 : (i / (buckets.length - 1)) * 800, 150 - (v / max) * 120]);
    if (pts.length) {
      const line = pts.map((p, i) => (i ? 'L' : 'M') + p[0].toFixed(1) + ',' + p[1].toFixed(1)).join(' ');
      $('chart-line-path').setAttribute('d', line);
      $('chart-area-path').setAttribute('d', line + ' L800,160 L0,160 Z');
      $('chart-points').innerHTML = pts.map((p, i) => `<circle cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="${i === pts.length - 1 ? 6 : 4}" fill="${i === pts.length - 1 ? '#D4AF37' : '#123826'}" stroke="${i === pts.length - 1 ? '#FFFFFF' : '#D4AF37'}" stroke-width="2.5"/>`).join('');
    }
    const labels = $('chart-x-labels');
    if (labels && series.length) {
      const pick = [0, Math.floor(series.length / 2), series.length - 1].map((i) => series[i].d.split('-').reverse().slice(0, 2).join('/'));
      labels.innerHTML = `<span>${pick[0]}</span><span>${pick[1]}</span><span>Hôm nay</span>`;
    }
  }

  // ---------- Đăng ký / đăng nhập ----------
  async function handleAffiliateRegister(e) {
    e.preventDefault();
    const btn = $('aff-btn-reg-submit');
    if (btn) btn.disabled = true;
    const body = {
      name: $('aff-input-fullname').value.trim(),
      phone: $('aff-input-phone').value.trim(),
      type: $('aff-input-type') ? $('aff-input-type').value : 'individual',
      code: $('aff-input-refcode').value.trim(),
      email: $('aff-input-email').value.trim(),
      password: $('aff-input-pass').value,
      website: $('aff-input-website') ? $('aff-input-website').value : '',
    };
    const r = await api('/api/aff?a=register', body);
    if (btn) btn.disabled = false;
    if (r.ok && r.data.needVerify) {
      notice('<i class="fa fa-envelope"></i> Đã gửi thư xác nhận tới <strong>' + esc(r.data.email) + '</strong>. Mở Gmail (xem cả mục Spam), bấm <strong>XÁC NHẬN ĐĂNG KÝ</strong>, rồi quay lại đây đăng nhập để vào Dashboard Đối Tác.', 'ok');
      e.target.reset();
      try { localStorage.setItem('ivy_pending_email', body.email); } catch (err) {}
      return;
    }
    if (r.ok) {
      showAffToast('🎉 Đăng ký Đối Tác thành công! Link giới thiệu riêng của bạn đã sẵn sàng.');
      await refreshAffData();
      return;
    }
    if (r.data.error === 'exists') {
      showAffToast(r.data.message || 'Gmail này đã có tài khoản. Vui lòng đăng nhập.', 'info');
      switchAuthTab('login');
      $('aff-login-email').value = body.email;
      return;
    }
    showAffToast(r.data.error || 'Chưa đăng ký được, vui lòng thử lại.', 'error');
  }

  async function handleAffiliateLogin(e) {
    e.preventDefault();
    const btn = $('aff-btn-login-submit');
    if (btn) btn.disabled = true;
    const r = await api('/api/account?a=login', { identifier: $('aff-login-email').value.trim(), password: $('aff-login-pass').value, remember: true });
    if (btn) btn.disabled = false;
    if (!r.ok) {
      showAffToast(r.data.error === 'unverified' ? 'Tài khoản chưa xác nhận Gmail. Vui lòng mở thư xác nhận trong Gmail.' : (r.data.error || 'Đăng nhập chưa thành công.'), 'error');
      return;
    }
    try { localStorage.setItem('ivy_current_user', JSON.stringify(r.data.user)); } catch (err) {}
    $('aff-login-pass').value = '';
    const data = await refreshAffData();
    if (data && data.partner) showAffToast('Đăng nhập thành công! Chào mừng ' + data.partner.name + '.');
  }

  async function handleAffiliateLogout() {
    await api('/api/account?a=logout', {});
    try { localStorage.removeItem('ivy_current_user'); } catch (e) {}
    me = null;
    currentAffiliate = null;
    renderLoggedOut();
    notice('');
    showAffToast('Đã đăng xuất khỏi Dashboard Đối Tác.', 'info');
    showView('register');
  }

  // Đăng nhập Google thật
  function openGoogleAuthModal() { window.location.href = '/api/auth/google?next=/affiliate'; }
  function closeGoogleAuthModal() { const m = $('aff-modal-google'); if (m) m.style.display = 'none'; }

  // ---------- Công cụ bán ----------
  function generateCustomServiceLink() {
    if (!currentAffiliate) return;
    const sel = $('tool-service-select');
    const link = refLink(currentAffiliate.code, sel ? sel.value : '');
    $('dash-full-ref-link').value = link;
    $('dash-qr-img').src = qr(link, 200);
  }

  function copyText(text, msg) {
    if (navigator.clipboard) navigator.clipboard.writeText(text).then(() => showAffToast(msg)).catch(() => prompt('Sao chép:', text));
    else prompt('Sao chép:', text);
  }

  function copyMyAffiliateLink() {
    if (!currentAffiliate) return;
    copyText(refLink(currentAffiliate.code), 'Đã sao chép đường link giới thiệu của bạn!');
    const t = $('aff-btn-copy-ref-text');
    if (t) { t.textContent = 'Đã sao chép! ✓'; setTimeout(() => { t.textContent = 'Sao chép Link Ref'; }, 2000); }
  }
  function copyInputVal(id) { const el = $(id); if (el && el.value) copyText(el.value, 'Đã sao chép đường link tiếp thị! Bạn có thể gửi ngay cho khách.'); }
  function saveQR(link) {
    if (!link) return;
    const a = document.createElement('a');
    a.href = qr(link, 1024);
    a.download = 'IVYLUXE_QR_' + (currentAffiliate ? currentAffiliate.code : 'AFF') + '.png';
    document.body.appendChild(a);
    a.click();
    a.remove();
    showAffToast('Đã tải mã QR về máy.');
  }
  function downloadAffiliateQR() { saveQR(currentLink()); }
  function downloadHeaderQR() { if (currentAffiliate) saveQR(refLink(currentAffiliate.code)); }
  function downloadVoucherCard() { showAffToast('Bạn có thể chụp màn hình thẻ Voucher hoặc gửi mã trực tiếp cho khách.', 'info'); }
  function currentLink() { return ($('dash-full-ref-link') && $('dash-full-ref-link').value) || window.location.origin; }
  function shareViaZalo() {
    copyText($('dash-tpl-msg') ? $('dash-tpl-msg').textContent : currentLink(), 'Đã sao chép tin nhắn kèm link! Đang mở Zalo...');
    window.open('https://chat.zalo.me/', '_blank', 'noopener');
  }
  function shareViaWhatsApp() {
    const msg = $('dash-tpl-msg-en') ? $('dash-tpl-msg-en').textContent : currentLink();
    window.open('https://wa.me/?text=' + encodeURIComponent(msg), '_blank', 'noopener');
  }
  function shareViaFacebook() { window.open('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(currentLink()), '_blank', 'noopener'); }
  function copyTemplateMsg(lang) {
    const el = $(lang === 'en' ? 'dash-tpl-msg-en' : 'dash-tpl-msg');
    if (el) copyText(el.innerText, 'Đã sao chép nội dung tin nhắn soạn sẵn!');
  }

  // ---------- Ngân hàng & rút tiền ----------
  async function saveBankInfo(e) {
    e.preventDefault();
    const r = await api('/api/aff?a=bank', {
      bankName: $('bank-name-input').value, bankNum: $('bank-account-num').value, bankHolder: $('bank-account-holder').value,
    });
    if (!r.ok) { showAffToast(r.data.error || 'Chưa lưu được.', 'error'); return; }
    me.partner = r.data.partner;
    currentAffiliate = me.partner;
    showAffToast('✓ Đã lưu thông tin tài khoản ngân hàng!');
  }

  function openPayoutModal() {
    if (!me || !me.partner) return;
    const avail = me.summary.availableAmount;
    setText('payout-modal-amount', money(avail));
    const input = $('payout-withdraw-input');
    if (input) input.value = avail > 0 ? avail : '';
    const summaryEl = $('payout-bank-summary');
    const p = me.partner;
    if (summaryEl) {
      summaryEl.innerHTML = p.bankName && p.bankNum
        ? `<div style="font-weight:700; color:#123826; margin-bottom:4px;"><i class="fa fa-university"></i> Ngân Hàng Nhận:</div>
           <div style="font-size:0.9rem; color:#374151;">${esc(p.bankName)} - ${esc(p.bankNum)}</div>
           <div style="font-size:0.85rem; color:#6B7280; font-weight:600;">Chủ TK: ${esc(p.bankHolder)}</div>`
        : `<div style="color:#B45309; font-size:0.88rem;"><i class="fa fa-exclamation-triangle"></i> Bạn chưa cập nhật tài khoản ngân hàng. Hãy chuyển sang tab <strong>Thanh toán</strong> để bổ sung trước khi rút tiền.</div>`;
    }
    $('aff-modal-payout').style.display = 'flex';
  }
  function closePayoutModal() { $('aff-modal-payout').style.display = 'none'; }

  async function confirmPayoutRequest() {
    const amount = parseInt(($('payout-withdraw-input') || {}).value, 10) || 0;
    const r = await api('/api/aff?a=payout', { amount });
    if (!r.ok) { showAffToast(r.data.error || 'Chưa gửi được yêu cầu.', 'error'); return; }
    closePayoutModal();
    showAffToast(`✓ Đã gửi yêu cầu rút ${money(amount)}. IVYLUXE SPA & NAIL sẽ chuyển khoản sau khi đối soát.`);
    refreshAffData();
  }

  function handleCookieChoice(accepted) {
    const banner = $('aff-cookie-banner');
    if (banner) banner.style.display = 'none';
    try { localStorage.setItem(COOKIE_CHOICE_KEY, accepted ? 'accepted' : 'denied'); } catch (e) {}
  }

  // Các nút cũ của bản demo (không còn dùng dữ liệu giả)
  function quickDemoLogin() { switchAuthTab('login'); }
  function simulateTestBooking() { refreshAffData(true); }
  function selectGoogleAccount() { openGoogleAuthModal(); }
  function confirmCustomGoogleAuth() { openGoogleAuthModal(); }

  Object.assign(window, {
    showAffToast, switchAuthTab, showView, toggleAffiliatePageMode, switchDashboardTab, updateCommissionCalc,
    refreshAffData, handleAffiliateRegister, handleAffiliateLogin, handleAffiliateLogout,
    openGoogleAuthModal, closeGoogleAuthModal, selectGoogleAccount, confirmCustomGoogleAuth, quickDemoLogin, simulateTestBooking,
    generateCustomServiceLink, copyMyAffiliateLink, copyInputVal, downloadAffiliateQR, downloadHeaderQR, downloadVoucherCard,
    shareViaZalo, shareViaWhatsApp, shareViaFacebook, copyTemplateMsg, filterPerformanceDays,
    saveBankInfo, saveAffProfile, openPayoutModal, closePayoutModal, confirmPayoutRequest, handleCookieChoice,
  });

  document.addEventListener('DOMContentLoaded', async () => {
    try {
      localStorage.removeItem('ivy_affiliates_data'); // dữ liệu mẫu cũ
      if (localStorage.getItem(COOKIE_CHOICE_KEY)) { const b = $('aff-cookie-banner'); if (b) b.style.display = 'none'; }
    } catch (e) {}

    const params = new URLSearchParams(window.location.search);
    const verify = params.get('xac-nhan');
    const google = params.get('google');
    const tab = params.get('tab');
    if (verify || google) history.replaceState(null, '', window.location.pathname + (tab ? '?tab=' + tab : ''));

    updateCommissionCalc(25);
    const data = await refreshAffData();
    if (data && data.partner && tab) switchDashboardTab(tab);

    if (!data) {
      if (verify === 'ok') {
        switchAuthTab('login');
        let pending = '';
        try { pending = localStorage.getItem('ivy_pending_email') || ''; } catch (e) {}
        if (pending) $('aff-login-email').value = pending;
        notice('<i class="fa fa-check-circle"></i> Xác nhận Gmail thành công! Mời bạn đăng nhập để vào Dashboard Đối Tác.', 'ok');
      } else if (verify) {
        switchAuthTab('login');
        notice('<i class="fa fa-exclamation-circle"></i> Liên kết xác nhận đã hết hạn hoặc đã được dùng. Hãy thử đăng nhập.', 'warn');
      } else if (google && google !== 'ok') {
        notice('<i class="fa fa-exclamation-circle"></i> Đăng nhập Google chưa thành công, vui lòng thử lại hoặc dùng Gmail + mật khẩu.', 'warn');
      }
      showView('register');
    }
  });
})();
