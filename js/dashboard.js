// Dashboard quản trị IVYLUXE SPA & NAIL — CRM Leads đa tầng, đăng sản phẩm, phân quyền.
(function () {
  'use strict';

  // 9 màu theo thứ tự tầng khách hàng
  const TIER_CLASS = {
    new: 'c-mint', contacted: 'c-sky', consulting: 'c-glow', booked: 'c-green', visited: 'c-forest',
    returning: 'c-lime', vip: 'c-amber', followup: 'c-pink', lost: 'c-wine',
  };
  const PALETTE = ['c-mint', 'c-sky', 'c-glow', 'c-green', 'c-forest', 'c-lime', 'c-amber', 'c-pink', 'c-wine'];
  const BAR_COLORS = ['#0E8C9B', '#2E9E4F', '#1B4332', '#E8912D', '#7B1E2B', '#F2E14C', '#9CC9EC', '#F2A7C6', '#8ED3A8'];
  const ROLE_LABEL = { owner: 'Chủ Spa', admin: 'Quản trị viên', staff: 'Nhân viên (không còn xem CRM)' };
  const ROLE_CLASS = { owner: 'c-wine', admin: 'c-amber', staff: 'c-sky' };
  const SOURCE_LABEL = { form: 'Form web', booking: 'Đặt lịch web', admin: 'Nhập tay', telegram: 'Bot Telegram', webchat: 'Chat website' };
  const SPA_IMAGES = [
    'hero_spa_luxury.jpg', 'spa_water_basin_hero.jpg', 'head_spa_ritual.jpg', 'hot_stone_massage.jpg', 'facial_gold_care.jpg',
    'foot_soak_care.jpg', 'couple_suite_bath.jpg', 'real_ivy_spa_nail_wide.jpg', 'real_ivy_spa_nail_collage.jpg',
    'real_ivy_headspa_suite.jpg', 'real_ivy_foot_guests.jpg', 'real_ivy_reception_lobby.jpg', 'real_ivy_spa_black_uniform.jpg',
    'loc_hatrung_lounge.jpg', 'loc_hatrung_living.jpg', 'loc_hatrung_flora.jpg',
  ];

  const state = { me: null, role: 'customer', tiers: [], categories: [], leads: [], products: [], view: 'overview', layout: 'table', tierFilter: '', search: '' };
  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => [...root.querySelectorAll(s)];
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const rank = (r) => ({ customer: 0, staff: 1, admin: 2, owner: 3 }[r] || 0);
  const can = (need) => rank(state.role) >= rank(need);
  const tierOf = (key) => state.tiers.find((t) => t.key === key) || state.tiers[0] || { key: 'new', label: 'Lead mới' };
  const fmtDate = (ms) => (ms ? new Date(ms).toLocaleString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : '');
  const fmtMoney = (n) => Number(n || 0).toLocaleString('vi-VN') + ' ₫';

  function toast(msg, err) {
    const t = $('#toast');
    t.textContent = msg;
    t.className = 'toast show' + (err ? ' err' : '');
    clearTimeout(toast.t);
    toast.t = setTimeout(() => (t.className = 'toast'), 2600);
  }

  async function api(action, body) {
    const opts = body === undefined
      ? { credentials: 'same-origin', cache: 'no-store' }
      : { method: 'POST', credentials: 'same-origin', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) };
    let res, data;
    try {
      res = await fetch('/api/admin?a=' + action, opts);
      data = await res.json().catch(() => ({}));
    } catch (e) {
      throw new Error('Không kết nối được máy chủ, vui lòng kiểm tra mạng.');
    }
    if (res.status === 401) { showGate('login'); throw new Error('Phiên đăng nhập đã hết, vui lòng đăng nhập lại.'); }
    if (!res.ok) throw new Error(data.message || data.error || 'Có lỗi xảy ra.');
    return data;
  }

  // ---------- Đăng nhập ----------
  function showGate(which, email) {
    $('#app').hidden = true;
    $('#gate').hidden = false;
    $('#gate-loading').hidden = which !== 'loading';
    $('#gate-login').hidden = which !== 'login';
    $('#gate-denied').hidden = which !== 'denied';
    if (email) $('#gate-denied-email').textContent = email;
  }

  async function boot() {
    showGate('loading');
    const params = new URLSearchParams(location.search);
    const g = params.get('google');
    if (g) history.replaceState(null, '', location.pathname);
    try {
      const res = await fetch('/api/admin?a=me', { credentials: 'same-origin', cache: 'no-store' });
      const data = await res.json().catch(() => ({}));
      if (res.status === 401) {
        showGate('login');
        if (g && g !== 'ok') $('#gate-msg').textContent = { huy: 'Bạn đã huỷ đăng nhập Google.', 'chua-cai': 'Đăng nhập Google chưa được cài đặt.' }[g] || 'Đăng nhập Google chưa thành công, vui lòng thử lại.';
        return;
      }
      if (res.status === 403) {
        const me = await fetch('/api/account?a=me', { credentials: 'same-origin', cache: 'no-store' }).then((r) => r.json()).catch(() => ({}));
        showGate('denied', me.user ? me.user.email : '');
        return;
      }
      if (!res.ok) throw new Error(data.error || 'Lỗi máy chủ');
      state.me = data.user;
      state.role = data.user.role;
      state.tiers = data.tiers;
      state.categories = data.categories;
      startApp();
    } catch (e) {
      showGate('login');
      $('#gate-msg').textContent = e.message;
    }
  }

  $('#gate-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const msg = $('#gate-msg');
    msg.textContent = 'Đang đăng nhập…';
    msg.className = 'gate-msg';
    try {
      const res = await fetch('/api/account?a=login', {
        method: 'POST', credentials: 'same-origin', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier: $('#gate-id').value.trim(), password: $('#gate-pass').value, remember: true }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        msg.className = 'gate-msg is-err';
        msg.textContent = data.error === 'unverified' ? 'Tài khoản chưa xác nhận Gmail. Vui lòng mở thư xác nhận trong Gmail.' : (data.error || 'Đăng nhập chưa thành công.');
        return;
      }
      $('#gate-pass').value = '';
      boot();
    } catch (err) {
      msg.className = 'gate-msg is-err';
      msg.textContent = 'Không kết nối được máy chủ.';
    }
  });

  $$('.js-logout').forEach((b) => b.addEventListener('click', async () => {
    await fetch('/api/account?a=logout', { method: 'POST', credentials: 'same-origin', headers: { 'Content-Type': 'application/json' }, body: '{}' }).catch(() => {});
    try { localStorage.removeItem('ivy_current_user'); } catch (e) {}
    location.reload();
  }));

  // ---------- Khung ứng dụng ----------
  function startApp() {
    $('#gate').hidden = true;
    $('#app').hidden = false;
    $('#me-name').textContent = state.me.name || state.me.email;
    const roleEl = $('#me-role');
    roleEl.textContent = ROLE_LABEL[state.role] || state.role;
    roleEl.className = 'side-user-role ' + (ROLE_CLASS[state.role] || '');
    $$('.nav-btn').forEach((b) => { b.hidden = b.dataset.need ? !can(b.dataset.need) : false; });
    $('#btn-reset').closest('.danger-zone').hidden = !can('owner');
    renderTierFilter();
    loadLeads();
    if (can('admin')) { loadProducts(); loadMenu(); loadAffiliates(); loadPromos(); loadAffAccounts(); }
    if (can('owner')) { loadRoles(); loadTelegram(); loadNotify(); }
    clearInterval(startApp.timer);
    startApp.timer = setInterval(() => { if (!document.hidden && $('#lead-modal').hidden && $('#product-modal').hidden) loadLeads(true); }, 60000);
  }

  function setView(view) {
    state.view = view;
    $$('.nav-btn').forEach((b) => b.classList.toggle('active', b.dataset.view === view));
    $$('.view').forEach((v) => { v.hidden = v.id !== 'view-' + view; });
    window.scrollTo(0, 0);
  }
  $$('.nav-btn').forEach((b) => b.addEventListener('click', () => setView(b.dataset.view)));
  $$('.js-refresh').forEach((b) => b.addEventListener('click', () => loadLeads()));

  // ---------- Leads ----------
  async function loadLeads(silent) {
    try {
      const data = await api('leads');
      state.leads = data.leads || [];
      renderAll();
      if (!silent) toast('Đã cập nhật dữ liệu');
    } catch (e) {
      if (!silent) toast(e.message, true);
    }
  }

  function renderAll() {
    renderOverview();
    renderTierFilter();
    renderLeads();
  }

  function filteredLeads() {
    const q = state.search.trim().toLowerCase();
    return state.leads.filter((l) => {
      if (state.tierFilter && l.tier !== state.tierFilter) return false;
      if (!q) return true;
      return [l.name, l.phone, l.country, l.residence, l.need, l.note].some((v) => String(v || '').toLowerCase().includes(q));
    });
  }

  function renderOverview() {
    const leads = state.leads;
    const weekAgo = Date.now() - 7 * 86400000;
    const count = (keys) => leads.filter((l) => keys.includes(l.tier)).length;
    const stats = [
      { label: 'Tổng khách trong CRM', value: leads.length, note: 'Mọi tầng', cls: 'c-forest' },
      { label: 'Lead mới 7 ngày', value: leads.filter((l) => l.createdAt >= weekAgo).length, note: 'Từ form web, đặt lịch, nhập tay', cls: 'c-glow' },
      { label: 'Đã đặt lịch / đến spa', value: count(['booked', 'visited']), note: 'Đang phục vụ', cls: 'c-green' },
      { label: 'Khách quay lại & VIP', value: count(['returning', 'vip']), note: 'Khách trung thành', cls: 'c-amber' },
    ];
    $('#stat-row').innerHTML = stats.map((s) => `
      <div class="stat ${s.cls}"><div class="stat-label">${esc(s.label)}</div><div class="stat-value">${s.value}</div><div class="stat-note">${esc(s.note)}</div></div>`).join('');

    $('#tier-tiles').innerHTML = state.tiers.map((t) => `
      <button type="button" class="tier-tile ${TIER_CLASS[t.key]}" data-tier="${t.key}"><b>${count([t.key])}</b><span>${esc(t.label)}</span></button>`).join('');
    $$('#tier-tiles .tier-tile').forEach((b) => b.addEventListener('click', () => { state.tierFilter = b.dataset.tier; setView('leads'); renderTierFilter(); renderLeads(); }));

    const recent = [...leads].sort((a, b) => b.createdAt - a.createdAt).slice(0, 6);
    $('#recent-leads').innerHTML = recent.length ? recent.map((l) => `
      <button type="button" class="recent-item" data-id="${esc(l.id)}">
        <span class="recent-main"><strong>${esc(l.name)}</strong><small>${esc(l.phone)} · ${esc(l.country || 'Chưa rõ quốc gia')} · ${esc(fmtDate(l.createdAt))}</small></span>
        <span class="tier-badge ${TIER_CLASS[l.tier]}">${esc(tierOf(l.tier).label)}</span>
      </button>`).join('') : '<div class="empty">Chưa có khách nào. Khách điền form "Nhận tư vấn" hoặc đặt lịch trên web sẽ hiện ở đây.</div>';
    $$('#recent-leads .recent-item').forEach((b) => b.addEventListener('click', () => openLead(b.dataset.id)));

    const byCountry = {};
    leads.forEach((l) => { const c = (l.country || 'Chưa rõ').trim(); byCountry[c] = (byCountry[c] || 0) + 1; });
    const rows = Object.entries(byCountry).sort((a, b) => b[1] - a[1]).slice(0, 9);
    const max = rows.length ? rows[0][1] : 1;
    $('#country-bars').innerHTML = rows.length ? rows.map(([c, n], i) => `
      <div class="bar-row"><span class="bar-name" title="${esc(c)}">${esc(c)}</span><span class="bar-track"><span class="bar-fill" style="width:${Math.max(6, (n / max) * 100)}%;background:${BAR_COLORS[i % BAR_COLORS.length]}"></span></span><b>${n}</b></div>`).join('')
      : '<div class="empty">Chưa có dữ liệu quốc gia.</div>';
  }

  function renderTierFilter() {
    const counts = {};
    state.leads.forEach((l) => { counts[l.tier] = (counts[l.tier] || 0) + 1; });
    $('#tier-filter').innerHTML = `<button type="button" class="chip all ${state.tierFilter ? '' : 'active'}" data-tier="">Tất cả<span class="n">${state.leads.length}</span></button>` +
      state.tiers.map((t) => `<button type="button" class="chip ${TIER_CLASS[t.key]} ${state.tierFilter === t.key ? 'active' : ''}" data-tier="${t.key}">${esc(t.label)}<span class="n">${counts[t.key] || 0}</span></button>`).join('');
    $$('#tier-filter .chip').forEach((b) => b.addEventListener('click', () => { state.tierFilter = b.dataset.tier; renderTierFilter(); renderLeads(); }));
  }

  function tierSelect(lead) {
    return `<select class="tier-select ${TIER_CLASS[lead.tier]}" data-id="${esc(lead.id)}" aria-label="Tầng khách hàng">` +
      state.tiers.map((t) => `<option value="${t.key}" ${t.key === lead.tier ? 'selected' : ''}>${esc(t.label)}</option>`).join('') + '</select>';
  }

  function renderLeads() {
    const list = filteredLeads();
    $('#leads-table-wrap').hidden = state.layout !== 'table';
    $('#leads-kanban').hidden = state.layout !== 'kanban';
    if (state.layout === 'table') {
      const cols = ['Họ tên', 'Số điện thoại', 'Quốc gia', 'Nơi sống', 'Nhu cầu', 'Tầng khách', 'Ngày & nguồn', 'Ghi chú', 'Thao tác'];
      $('#leads-table-wrap').innerHTML = `
        <table class="lead-table">
          <thead><tr>${cols.map((c, i) => `<th class="${PALETTE[i]}">${c}</th>`).join('')}</tr></thead>
          <tbody>${list.length ? list.map((l) => `
            <tr data-id="${esc(l.id)}">
              <td><strong>${esc(l.name)}</strong>${l.ref ? `<br><span class="lead-ref c-pink" title="Khách do đối tác giới thiệu">IVY-${esc(l.ref)}</span>` : ''}${l.revenue ? `<br><span class="src">Doanh thu: ${fmtMoney(l.revenue)}</span>` : ''}${(l.bookings || []).filter((b) => b.status !== 'cancelled').length ? `<br><span class="src">Đơn web: ${fmtMoney(l.bookings.filter((b) => b.status !== 'cancelled').reduce((t, b) => t + b.total, 0))}${l.bookings.some((b) => b.status === 'claimed') ? ' · <b style="color:#B45309">chờ xác nhận tiền</b>' : ''}</span>` : ''}</td>
              <td class="phone"><a href="tel:${esc(l.phone)}" data-stop>${esc(l.phone)}</a></td>
              <td>${esc(l.country)}</td>
              <td>${esc(l.residence)}</td>
              <td class="need">${esc(l.need)}</td>
              <td data-stop>${tierSelect(l)}</td>
              <td>${esc(fmtDate(l.createdAt))}<br><span class="src">${esc(SOURCE_LABEL[l.source] || l.source || '')}</span></td>
              <td class="note">${esc(l.note)}</td>
              <td data-stop><div class="row-actions">
                <a class="icon-btn" href="https://zalo.me/${esc(String(l.phone).replace(/^\+?84/, '0'))}" target="_blank" rel="noopener" title="Nhắn Zalo">Z</a>
                <button type="button" class="icon-btn js-edit" title="Sửa"><i class="fa fa-pencil"></i></button>
              </div></td>
            </tr>`).join('') : `<tr><td colspan="9"><div class="empty">${state.leads.length ? 'Không có khách khớp bộ lọc.' : 'CRM đang trống. Khách để lại thông tin trên web sẽ tự vào đây (tầng "Lead mới").'}</div></td></tr>`}
          </tbody>
        </table>`;
      $$('#leads-table-wrap tbody tr[data-id]').forEach((tr) => tr.addEventListener('click', (e) => {
        if (e.target.closest('[data-stop]') && !e.target.closest('.js-edit')) return;
        openLead(tr.dataset.id);
      }));
    } else {
      $('#leads-kanban').innerHTML = state.tiers.filter((t) => !state.tierFilter || t.key === state.tierFilter).map((t) => {
        const items = list.filter((l) => l.tier === t.key);
        return `<div class="kb-col" data-tier="${t.key}">
          <div class="kb-head ${TIER_CLASS[t.key]}"><span>${esc(t.label)}</span><span class="n">${items.length}</span></div>
          <div class="kb-body">${items.map((l) => `
            <button type="button" class="kb-card" draggable="true" data-id="${esc(l.id)}" style="border-left-color:${t.bg}">
              <strong>${esc(l.name)}</strong><small>${esc(l.phone)} · ${esc(l.country || '—')}</small>
              ${l.need ? `<span class="kb-need">${esc(l.need)}</span>` : ''}
            </button>`).join('') || '<div class="empty">Kéo khách vào đây</div>'}</div>
        </div>`;
      }).join('');
      $$('#leads-kanban .kb-card').forEach((c) => {
        c.addEventListener('click', () => openLead(c.dataset.id));
        c.addEventListener('dragstart', (e) => { e.dataTransfer.setData('text/plain', c.dataset.id); e.dataTransfer.effectAllowed = 'move'; });
      });
      $$('#leads-kanban .kb-col').forEach((col) => {
        col.addEventListener('dragover', (e) => { e.preventDefault(); col.classList.add('drop'); });
        col.addEventListener('dragleave', () => col.classList.remove('drop'));
        col.addEventListener('drop', (e) => { e.preventDefault(); col.classList.remove('drop'); changeTier(e.dataTransfer.getData('text/plain'), col.dataset.tier); });
      });
    }
    $$('.tier-select').forEach((s) => s.addEventListener('change', () => changeTier(s.dataset.id, s.value)));
  }

  async function changeTier(id, tier) {
    const lead = state.leads.find((l) => l.id === id);
    if (!lead || lead.tier === tier) return;
    try {
      const { lead: saved } = await api('lead-save', { id, tier });
      Object.assign(lead, saved);
      renderAll();
      toast(`${lead.name} → ${tierOf(tier).label}`);
    } catch (e) {
      toast(e.message, true);
      renderLeads();
    }
  }

  $('#lead-search').addEventListener('input', (e) => { state.search = e.target.value; renderLeads(); });
  $$('.seg-btn').forEach((b) => b.addEventListener('click', () => {
    state.layout = b.dataset.layout;
    $$('.seg-btn').forEach((x) => x.classList.toggle('active', x === b));
    renderLeads();
  }));

  // ---------- Hộp sửa khách ----------
  let pickedTier = 'new';
  function renderTierPicker() {
    $('#lf-tiers').innerHTML = state.tiers.map((t) => `<button type="button" class="${TIER_CLASS[t.key]} ${t.key === pickedTier ? 'on' : ''}" data-tier="${t.key}">${esc(t.label)}</button>`).join('');
    $$('#lf-tiers button').forEach((b) => b.addEventListener('click', () => { pickedTier = b.dataset.tier; renderTierPicker(); }));
  }

  function openModal(id) {
    const m = $(id);
    m.hidden = false;
    document.body.style.overflow = 'hidden';
    setTimeout(() => { const f = m.querySelector('input:not([type=hidden]), select'); if (f) f.focus(); }, 30);
  }
  function closeModal(m) {
    m.hidden = true;
    document.body.style.overflow = '';
  }
  $$('.modal').forEach((m) => {
    m.addEventListener('click', (e) => { if (e.target === m || e.target.closest('[data-close]')) closeModal(m); });
  });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') $$('.modal').forEach((m) => { if (!m.hidden) closeModal(m); }); });

  function openLead(id) {
    const lead = id ? state.leads.find((l) => l.id === id) : null;
    $('#lead-modal-title').textContent = lead ? 'Thông tin khách' : 'Thêm khách mới';
    $('#lf-id').value = lead ? lead.id : '';
    $('#lf-name').value = lead ? lead.name : '';
    $('#lf-phone').value = lead ? lead.phone : '';
    $('#lf-country').value = lead ? lead.country : '';
    $('#lf-residence').value = lead ? lead.residence : '';
    $('#lf-need').value = lead ? lead.need : '';
    $('#lf-note').value = lead ? lead.note : '';
    $('#lf-revenue').value = lead && lead.revenue ? lead.revenue : '';
    $('#lf-ref').textContent = lead && lead.ref ? 'IVY-' + lead.ref : (lead ? 'Khách tự đến (không qua đối tác)' : 'Nhập tay');
    pickedTier = lead ? lead.tier : 'new';
    renderTierPicker();
    renderLeadBookings(lead);
    $('#lf-history').innerHTML = lead && lead.history ? lead.history.slice().reverse().map((h) => `<div>${esc(fmtDate(h.at))} · ${esc(h.by || '')}: ${esc(h.text)}</div>`).join('') : '';
    $('#lf-delete').hidden = !(lead && can('admin'));
    openModal('#lead-modal');
  }
  $('#btn-add-lead').addEventListener('click', () => openLead(null));

  // Đơn đặt dịch vụ của khách: số tiền theo hoá đơn, cách thanh toán, xác nhận đã nhận tiền / huỷ
  const BK_STATUS = {
    pending: ['Chờ thanh toán', 'c-sky'], claimed: ['Khách báo đã chuyển khoản', 'c-glow'],
    paid: ['Đã nhận tiền', 'c-green'], cancelled: ['Đã huỷ', 'c-wine'],
  };
  function renderLeadBookings(lead) {
    const list = (lead && lead.bookings) || [];
    $('#lf-bookings-wrap').hidden = !list.length;
    $('#lf-bookings').innerHTML = list.map((b) => {
      const [label, cls] = BK_STATUS[b.status] || BK_STATUS.pending;
      return `<div class="bk-item">
        <div class="bk-main"><strong>${esc(b.service)}${b.guests > 1 ? ' × ' + b.guests : ''}</strong>
          <small>Mã ${esc(b.code)} · ${esc(b.date)} ${esc(b.time)} · ${b.pay === 'qr' ? 'Trả trước QR (−10%)' : 'Trả tại quầy'}</small></div>
        <div class="bk-money"><b>${fmtMoney(b.total)}</b>${b.discount ? `<small>Giá niêm yết ${fmtMoney(b.gross)}</small>` : ''}</div>
        <span class="tier-badge ${cls}">${label}</span>
        <div class="bk-actions">
          ${b.status !== 'paid' && b.status !== 'cancelled' ? `<button type="button" class="btn-gold js-bk" data-code="${esc(b.code)}" data-status="paid"><i class="fa fa-check"></i> Đã nhận tiền</button>` : ''}
          ${b.status !== 'cancelled' ? `<button type="button" class="btn-danger-outline js-bk" data-code="${esc(b.code)}" data-status="cancelled">Huỷ đơn</button>` : `<button type="button" class="btn-outline js-bk" data-code="${esc(b.code)}" data-status="pending">Khôi phục</button>`}
        </div>
      </div>`;
    }).join('');
    $$('#lf-bookings .js-bk').forEach((btn) => btn.addEventListener('click', async () => {
      const label = { paid: 'xác nhận ĐÃ NHẬN TIỀN cho', cancelled: 'HUỶ', pending: 'khôi phục' }[btn.dataset.status];
      if (!confirm('Bạn chắc chắn ' + label + ' đơn ' + btn.dataset.code + '?')) return;
      try {
        const { lead: saved } = await api('booking-set', { leadId: lead.id, code: btn.dataset.code, status: btn.dataset.status });
        const i = state.leads.findIndex((l) => l.id === saved.id);
        if (i >= 0) state.leads[i] = saved;
        renderAll();
        renderLeadBookings(saved);
        toast('Đã cập nhật đơn ' + btn.dataset.code);
      } catch (e) {
        toast(e.message, true);
      }
    }));
  }

  $('#lead-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const body = {
      id: $('#lf-id').value || undefined,
      name: $('#lf-name').value, phone: $('#lf-phone').value, country: $('#lf-country').value,
      residence: $('#lf-residence').value, need: $('#lf-need').value, note: $('#lf-note').value, tier: pickedTier,
      revenue: $('#lf-revenue').value,
    };
    const btn = e.submitter || $('#lead-form button[type=submit]');
    btn.disabled = true;
    try {
      const { lead } = await api('lead-save', body);
      const i = state.leads.findIndex((l) => l.id === lead.id);
      if (i >= 0) state.leads[i] = lead; else state.leads.unshift(lead);
      renderAll();
      closeModal($('#lead-modal'));
      toast('Đã lưu thông tin khách');
    } catch (err) {
      toast(err.message, true);
    } finally {
      btn.disabled = false;
    }
  });

  $('#lf-delete').addEventListener('click', async () => {
    const id = $('#lf-id').value;
    const lead = state.leads.find((l) => l.id === id);
    if (!lead || !confirm(`Xoá khách "${lead.name}" khỏi CRM?`)) return;
    try {
      await api('lead-delete', { id });
      state.leads = state.leads.filter((l) => l.id !== id);
      renderAll();
      closeModal($('#lead-modal'));
      toast('Đã xoá khách');
    } catch (e) {
      toast(e.message, true);
    }
  });

  // Xuất CSV (mở được bằng Excel, giữ dấu tiếng Việt)
  $('#btn-export').addEventListener('click', () => {
    const rows = [['Họ tên', 'Số điện thoại', 'Quốc gia', 'Nơi sống', 'Nhu cầu', 'Tầng khách', 'Nguồn', 'Ngày tạo', 'Ghi chú']]
      .concat(filteredLeads().map((l) => [l.name, l.phone, l.country, l.residence, l.need, tierOf(l.tier).label, SOURCE_LABEL[l.source] || l.source, fmtDate(l.createdAt), l.note]));
    const csv = rows.map((r) => r.map((v) => {
      let s = String(v == null ? '' : v);
      if (/^[=+\-@]/.test(s)) s = "'" + s; // chặn công thức Excel
      return '"' + s.replace(/"/g, '""') + '"';
    }).join(',')).join('\r\n');
    const blob = new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'IVYLUXE-Leads-' + new Date().toISOString().slice(0, 10) + '.csv';
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  });

  // ---------- Sản phẩm ----------
  async function loadProducts() {
    try {
      state.products = (await api('products')).products || [];
      renderProducts();
    } catch (e) {
      toast(e.message, true);
    }
  }

  function catLabel(key) {
    const c = state.categories.find((x) => x.key === key);
    return c ? c.label : key;
  }

  function renderProducts() {
    const list = state.products;
    $('#product-list').innerHTML = list.length ? list.map((p, i) => `
      <article class="product-card">
        <img src="${esc(p.image || 'assets/images/hero_spa_luxury.jpg')}" alt="" loading="lazy">
        <div class="product-body">
          <span class="product-cat ${PALETTE[(state.categories.findIndex((c) => c.key === p.cat) + 2) % PALETTE.length]}">${esc(catLabel(p.cat))}</span>
          <h3>${esc(p.name_vi)}</h3>
          <div class="product-price">${fmtMoney(p.price_vnd)}${p.price_vnd_max ? ' – ' + fmtMoney(p.price_vnd_max) : ''}</div>
          <div class="product-meta">${esc(p.duration_vi || '')}${p.popular ? ' · ★ Lựa chọn VIP' : ''}</div>
          ${p.hidden ? '<span class="badge-hidden c-pink">Đang ẩn khỏi web</span>' : ''}
        </div>
        <div class="product-foot"><button type="button" class="btn-outline js-edit-product" data-id="${esc(p.id)}"><i class="fa fa-pencil"></i> Sửa</button></div>
      </article>`).join('') : '<div class="empty">Chưa có sản phẩm nào được đăng. Bấm "Đăng sản phẩm mới" để thêm dịch vụ lên Bảng giá website.</div>';
    $$('.js-edit-product').forEach((b) => b.addEventListener('click', () => openProduct(b.dataset.id)));
  }

  function setImage(url) {
    $('#pf-image').value = url || '';
    const prev = $('#pf-preview');
    prev.hidden = !url;
    if (url) prev.src = url;
  }

  function openProduct(id) {
    const p = id ? state.products.find((x) => x.id === id) : null;
    $('#product-modal-title').textContent = p ? 'Sửa sản phẩm' : 'Đăng sản phẩm mới';
    $('#pf-cat').innerHTML = state.categories.map((c) => `<option value="${c.key}">${esc(c.label)}</option>`).join('');
    $('#pf-image-pick').innerHTML = '<option value="">— hoặc chọn ảnh có sẵn của spa —</option>' + SPA_IMAGES.map((f) => `<option value="assets/images/${f}">${f.replace(/\.jpg$/, '').replace(/_/g, ' ')}</option>`).join('');
    $('#pf-id').value = p ? p.id : '';
    $('#pf-cat').value = p ? p.cat : 'massage';
    $('#pf-name-vi').value = p ? p.name_vi : '';
    $('#pf-name-en').value = p ? p.name_en : '';
    $('#pf-desc-vi').value = p ? p.desc_vi : '';
    $('#pf-desc-en').value = p ? p.desc_en : '';
    $('#pf-dur-vi').value = p ? p.duration_vi : '';
    $('#pf-dur-en').value = p ? p.duration_en : '';
    $('#pf-price').value = p ? p.price_vnd : '';
    $('#pf-price-max').value = p && p.price_vnd_max ? p.price_vnd_max : '';
    $('#pf-popular').checked = Boolean(p && p.popular);
    $('#pf-hidden').checked = Boolean(p && p.hidden);
    $('#pf-image-msg').textContent = '';
    $('#pf-file').value = '';
    setImage(p ? p.image : '');
    $('#pf-delete').hidden = !p;
    openModal('#product-modal');
  }
  $('#btn-add-product').addEventListener('click', () => openProduct(null));
  $('#pf-image-pick').addEventListener('change', (e) => { if (e.target.value) setImage(e.target.value); });

  // Thu nhỏ ảnh trên máy (tối đa 1400px, JPEG) rồi tải lên → trả về địa chỉ ảnh
  async function uploadImage(file, msg) {
    msg.textContent = 'Đang xử lý ảnh…';
    const dataUrl = await new Promise((resolve, reject) => {
      const img = new Image();
      const url = URL.createObjectURL(file);
      img.onload = () => {
        const scale = Math.min(1, 1400 / Math.max(img.width, img.height));
        const c = document.createElement('canvas');
        c.width = Math.round(img.width * scale);
        c.height = Math.round(img.height * scale);
        c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
        URL.revokeObjectURL(url);
        let q = 0.85, out = c.toDataURL('image/jpeg', q);
        while (out.length > 900000 && q > 0.4) { q -= 0.1; out = c.toDataURL('image/jpeg', q); }
        resolve(out);
      };
      img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('Không đọc được ảnh này.')); };
      img.src = url;
    });
    msg.textContent = 'Đang tải ảnh lên…';
    const { url } = await api('image', { dataUrl });
    msg.textContent = 'Đã tải ảnh lên.';
    return url;
  }

  $('#pf-file').addEventListener('change', async (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    try {
      setImage(await uploadImage(file, $('#pf-image-msg')));
      $('#pf-image-pick').value = '';
    } catch (err) {
      $('#pf-image-msg').textContent = err.message;
    }
  });

  $('#product-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const body = {
      id: $('#pf-id').value || undefined,
      cat: $('#pf-cat').value, name_vi: $('#pf-name-vi').value, name_en: $('#pf-name-en').value,
      desc_vi: $('#pf-desc-vi').value, desc_en: $('#pf-desc-en').value,
      duration_vi: $('#pf-dur-vi').value, duration_en: $('#pf-dur-en').value,
      price_vnd: $('#pf-price').value, price_vnd_max: $('#pf-price-max').value,
      image: $('#pf-image').value, popular: $('#pf-popular').checked, hidden: $('#pf-hidden').checked,
    };
    const btn = e.submitter || $('#product-form button[type=submit]');
    btn.disabled = true;
    try {
      const { product } = await api('product-save', body);
      const i = state.products.findIndex((p) => p.id === product.id);
      if (i >= 0) state.products[i] = product; else state.products.unshift(product);
      renderProducts();
      closeModal($('#product-modal'));
      toast(product.hidden ? 'Đã lưu (đang ẩn khỏi web)' : 'Đã đăng lên website');
    } catch (err) {
      toast(err.message, true);
    } finally {
      btn.disabled = false;
    }
  });

  $('#pf-delete').addEventListener('click', async () => {
    const id = $('#pf-id').value;
    const p = state.products.find((x) => x.id === id);
    if (!p || !confirm(`Xoá sản phẩm "${p.name_vi}" khỏi website?`)) return;
    try {
      await api('product-delete', { id });
      state.products = state.products.filter((x) => x.id !== id);
      renderProducts();
      closeModal($('#product-modal'));
      toast('Đã xoá sản phẩm');
    } catch (e) {
      toast(e.message, true);
    }
  });

  // ---------- Bảng giá gốc (js/menu-data.js) — sửa giá / tên / ảnh / ẩn ----------
  const MENU = window.IVY_MENU || {};
  const menuState = { overrides: {}, cat: '', q: '' };
  function menuFind(id) {
    for (const cat of Object.keys(MENU)) {
      const item = MENU[cat].find((x) => x.id === id);
      if (item) return { cat, item };
    }
    return null;
  }
  // Dịch vụ sau khi áp bản sửa (giống cách trang chủ hiển thị)
  function menuEffective(item) {
    const o = menuState.overrides[item.id] || {};
    const max = o.price_vnd_max === 0 ? 0 : (o.price_vnd_max || item.price_vnd_max || 0);
    return {
      name_vi: o.name_vi || item.name_vi, name_en: o.name_en || item.name_en,
      price_vnd: o.price_vnd || item.price_vnd, price_vnd_max: max,
      image: o.image || item.image, hidden: Boolean(o.hidden), edited: Boolean(menuState.overrides[item.id]),
    };
  }

  async function loadMenu() {
    try {
      menuState.overrides = (await api('menu')).overrides || {};
      renderMenu();
    } catch (e) {
      toast(e.message, true);
    }
  }

  function renderMenu() {
    const cats = Object.keys(MENU);
    const sel = $('#menu-cat');
    if (!sel.options.length) {
      sel.innerHTML = '<option value="">Tất cả nhóm dịch vụ</option>' + cats.map((c) => `<option value="${esc(c)}">${esc(catLabel(c))}</option>`).join('');
    }
    const q = menuState.q.trim().toLowerCase();
    const groups = cats.filter((c) => !menuState.cat || c === menuState.cat).map((c) => {
      const rows = MENU[c].map((item) => ({ item, e: menuEffective(item) }))
        .filter(({ item, e }) => !q || [e.name_vi, e.name_en, item.name_vi].some((v) => String(v || '').toLowerCase().includes(q)));
      if (!rows.length) return '';
      return `<div class="menu-group"><h3 class="menu-group-title">${esc(catLabel(c))} <span>${rows.length}</span></h3>${rows.map(({ item, e }) => `
        <div class="menu-row${e.hidden ? ' is-hidden' : ''}">
          <img src="${esc(e.image)}" alt="" loading="lazy">
          <div class="menu-row-main">
            <strong>${esc(e.name_vi)}</strong>
            <small>${esc(e.name_en)}</small>
            <span class="menu-row-tags">${e.hidden ? '<span class="badge-hidden c-pink">Đang ẩn khỏi web</span>' : ''}${e.edited && !e.hidden ? '<span class="badge-hidden c-amber">Đã sửa</span>' : ''}</span>
          </div>
          <div class="menu-row-price">${fmtMoney(e.price_vnd)}${e.price_vnd_max ? '<br><small>đến ' + fmtMoney(e.price_vnd_max) + '</small>' : ''}</div>
          <button type="button" class="btn-outline js-edit-menu" data-id="${esc(item.id)}"><i class="fa fa-pencil"></i> Sửa</button>
        </div>`).join('')}</div>`;
    }).join('');
    $('#menu-list').innerHTML = groups || '<div class="empty">Không có dịch vụ khớp tìm kiếm.</div>';
    $$('.js-edit-menu').forEach((b) => b.addEventListener('click', () => openMenuItem(b.dataset.id)));
  }
  $('#menu-search').addEventListener('input', (e) => { menuState.q = e.target.value; renderMenu(); });
  $('#menu-cat').addEventListener('change', (e) => { menuState.cat = e.target.value; renderMenu(); });

  function setMenuImage(url) {
    $('#mf-image').value = url || '';
    $('#mf-preview').src = url || '';
  }

  function openMenuItem(id) {
    const found = menuFind(id);
    if (!found) return;
    const { item } = found;
    const e = menuEffective(item);
    $('#menu-modal-title').textContent = 'Sửa dịch vụ: ' + e.name_vi;
    $('#mf-orig').innerHTML = `<i class="fa fa-info-circle"></i> Bản gốc: <strong>${esc(item.name_vi)}</strong> · ${fmtMoney(item.price_vnd)}${item.price_vnd_max ? ' – ' + fmtMoney(item.price_vnd_max) : ''} · nhóm ${esc(catLabel(found.cat))}`;
    $('#mf-image-pick').innerHTML = '<option value="">— hoặc chọn ảnh có sẵn của spa —</option>' + SPA_IMAGES.map((f) => `<option value="assets/images/${f}">${f.replace(/\.jpg$/, '').replace(/_/g, ' ')}</option>`).join('');
    $('#mf-id').value = item.id;
    $('#mf-name-vi').value = e.name_vi;
    $('#mf-name-en').value = e.name_en;
    $('#mf-price').value = e.price_vnd;
    $('#mf-price-max').value = e.price_vnd_max || '';
    $('#mf-hidden').checked = e.hidden;
    $('#mf-file').value = '';
    $('#mf-image-msg').textContent = '';
    setMenuImage(e.image);
    $('#mf-reset').hidden = !e.edited;
    openModal('#menu-modal');
  }
  $('#mf-image-pick').addEventListener('change', (e) => { if (e.target.value) setMenuImage(e.target.value); });
  $('#mf-file').addEventListener('change', async (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    try {
      setMenuImage(await uploadImage(file, $('#mf-image-msg')));
      $('#mf-image-pick').value = '';
    } catch (err) {
      $('#mf-image-msg').textContent = err.message;
    }
  });

  $('#menu-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = $('#mf-id').value;
    const btn = e.submitter || $('#menu-form button[type=submit]');
    btn.disabled = true;
    try {
      const { override } = await api('menu-save', {
        id, name_vi: $('#mf-name-vi').value, name_en: $('#mf-name-en').value,
        price_vnd: $('#mf-price').value, price_vnd_max: $('#mf-price-max').value,
        image: $('#mf-image').value, hidden: $('#mf-hidden').checked,
      });
      if (override) menuState.overrides[id] = override; else delete menuState.overrides[id];
      renderMenu();
      closeModal($('#menu-modal'));
      toast(override && override.hidden ? 'Đã ẩn dịch vụ khỏi website' : override ? 'Đã lưu, website cập nhật sau khoảng 30 giây' : 'Không có thay đổi so với bản gốc');
    } catch (err) {
      toast(err.message, true);
    } finally {
      btn.disabled = false;
    }
  });

  $('#mf-reset').addEventListener('click', async () => {
    const id = $('#mf-id').value;
    const found = menuFind(id);
    if (!found || !confirm(`Khôi phục "${found.item.name_vi}" về giá, tên, ảnh gốc và hiện lại trên web?`)) return;
    try {
      await api('menu-reset', { id });
      delete menuState.overrides[id];
      renderMenu();
      closeModal($('#menu-modal'));
      toast('Đã khôi phục bản gốc');
    } catch (e) {
      toast(e.message, true);
    }
  });

  // ---------- Ưu đãi / Promotion ----------
  async function loadPromos() {
    try {
      state.promos = (await api('promos')).promos || [];
      renderPromos();
    } catch (e) {
      toast(e.message, true);
    }
  }

  function renderPromos() {
    const list = state.promos || [];
    const today = new Date(Date.now() + 7 * 3600000).toISOString().slice(0, 10);
    $('#promo-list').innerHTML = list.length ? list.map((p) => {
      const expired = p.validUntil && p.validUntil < today;
      return `
      <article class="product-card promo-card">
        <img src="${esc(p.image)}" alt="" loading="lazy">
        ${p.badge ? `<span class="tier-badge c-amber promo-badge">${esc(p.badge)}</span>` : ''}
        <div class="product-body">
          <h3>${esc(p.title_vi)}</h3>
          ${p.offer_vi ? `<div class="product-price">${esc(p.offer_vi)}</div>` : ''}
          <div class="promo-desc">${esc(p.desc_vi)}</div>
          <div class="product-meta">${p.validUntil ? 'Đến ' + esc(p.validUntil.split('-').reverse().join('/')) : 'Không giới hạn ngày'}</div>
          ${p.hidden ? '<span class="badge-hidden c-pink">Đang ẩn khỏi web</span>' : expired ? '<span class="badge-hidden c-wine">Đã hết hạn – tự ẩn</span>' : '<span class="badge-hidden c-green">Đang hiện trên web</span>'}
        </div>
        <div class="product-foot"><button type="button" class="btn-outline js-edit-promo" data-id="${esc(p.id)}"><i class="fa fa-pencil"></i> Sửa</button></div>
      </article>`;
    }).join('') : '<div class="empty">Chưa có ưu đãi nào. Bấm "Đăng ưu đãi mới" để đăng ảnh + mô tả Promotion lên trang chủ.</div>';
    $$('.js-edit-promo').forEach((b) => b.addEventListener('click', () => openPromo(b.dataset.id)));
  }

  function setPromoImage(url) {
    $('#kf-image').value = url || '';
    const prev = $('#kf-preview');
    prev.hidden = !url;
    if (url) prev.src = url;
  }

  function openPromo(id) {
    const p = id ? (state.promos || []).find((x) => x.id === id) : null;
    $('#promo-modal-title').textContent = p ? 'Sửa ưu đãi' : 'Đăng ưu đãi mới';
    $('#kf-image-pick').innerHTML = '<option value="">— hoặc chọn ảnh có sẵn của spa —</option>' + SPA_IMAGES.map((f) => `<option value="assets/images/${f}">${f.replace(/\.jpg$/, '').replace(/_/g, ' ')}</option>`).join('');
    $('#kf-id').value = p ? p.id : '';
    $('#kf-title-vi').value = p ? p.title_vi : '';
    $('#kf-title-en').value = p ? p.title_en : '';
    $('#kf-badge').value = p ? p.badge : '';
    $('#kf-until').value = p ? p.validUntil : '';
    $('#kf-offer-vi').value = p ? p.offer_vi : '';
    $('#kf-offer-en').value = p ? p.offer_en : '';
    $('#kf-desc-vi').value = p ? p.desc_vi : '';
    $('#kf-desc-en').value = p ? p.desc_en : '';
    $('#kf-hidden').checked = Boolean(p && p.hidden);
    $('#kf-file').value = '';
    $('#kf-image-msg').textContent = '';
    setPromoImage(p ? p.image : '');
    $('#kf-delete').hidden = !p;
    openModal('#promo-modal');
  }
  $('#btn-add-promo').addEventListener('click', () => openPromo(null));
  $('#kf-image-pick').addEventListener('change', (e) => { if (e.target.value) setPromoImage(e.target.value); });
  $('#kf-file').addEventListener('change', async (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    try {
      setPromoImage(await uploadImage(file, $('#kf-image-msg')));
      $('#kf-image-pick').value = '';
    } catch (err) {
      $('#kf-image-msg').textContent = err.message;
    }
  });

  $('#promo-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const body = {
      id: $('#kf-id').value || undefined, image: $('#kf-image').value,
      title_vi: $('#kf-title-vi').value, title_en: $('#kf-title-en').value, badge: $('#kf-badge').value,
      validUntil: $('#kf-until').value, offer_vi: $('#kf-offer-vi').value, offer_en: $('#kf-offer-en').value,
      desc_vi: $('#kf-desc-vi').value, desc_en: $('#kf-desc-en').value, hidden: $('#kf-hidden').checked,
    };
    const btn = e.submitter || $('#promo-form button[type=submit]');
    btn.disabled = true;
    try {
      const { promo } = await api('promo-save', body);
      state.promos = state.promos || [];
      const i = state.promos.findIndex((x) => x.id === promo.id);
      if (i >= 0) state.promos[i] = promo; else state.promos.unshift(promo);
      renderPromos();
      closeModal($('#promo-modal'));
      toast(promo.hidden ? 'Đã lưu (đang ẩn khỏi web)' : 'Đã đăng ưu đãi lên trang chủ');
    } catch (err) {
      toast(err.message, true);
    } finally {
      btn.disabled = false;
    }
  });

  $('#kf-delete').addEventListener('click', async () => {
    const id = $('#kf-id').value;
    const p = (state.promos || []).find((x) => x.id === id);
    if (!p || !confirm(`Xoá ưu đãi "${p.title_vi}" khỏi website?`)) return;
    try {
      await api('promo-delete', { id });
      state.promos = state.promos.filter((x) => x.id !== id);
      renderPromos();
      closeModal($('#promo-modal'));
      toast('Đã xoá ưu đãi');
    } catch (e) {
      toast(e.message, true);
    }
  });

  // ---------- Affiliate ----------
  async function loadAffiliates() {
    try {
      const data = await api('affiliates');
      state.partners = data.partners || [];
      if (data.types && !$('#af-type').options.length) {
        $('#af-type').innerHTML = Object.entries(data.types).map(([k, v]) => `<option value="${esc(k)}">${esc(v)}</option>`).join('');
      }
      renderAffiliates();
    } catch (e) {
      toast(e.message, true);
    }
  }
  $('#btn-aff-refresh').addEventListener('click', () => { loadAffiliates(); loadAffAccounts(); loadLeads(true); });

  const refLink = (code) => location.origin + '/?ref=' + encodeURIComponent(code);
  async function copyText(text) {
    try { await navigator.clipboard.writeText(text); } catch (e) {
      const t = document.createElement('textarea');
      t.value = text; document.body.appendChild(t); t.select(); document.execCommand('copy'); t.remove();
    }
    toast('Đã sao chép link: ' + text);
  }
  document.addEventListener('click', (e) => {
    const b = e.target.closest('.js-copy-link');
    if (b) copyText(b.dataset.link);
  });

  // Tài khoản đã đăng ký trên web → tạo link Affiliate
  async function loadAffAccounts() {
    try {
      state.affAccounts = (await api('aff-accounts')).accounts || [];
      renderAffAccounts();
    } catch (e) {
      $('#af-account').innerHTML = '<option value="">Không tải được danh sách tài khoản</option>';
    }
  }
  function renderAffAccounts() {
    const list = state.affAccounts || [];
    const keep = $('#af-account').value;
    $('#af-account').innerHTML = '<option value="">— Chọn tài khoản (' + list.length + ' tài khoản) —</option>' + list.map((a) =>
      `<option value="${esc(a.email)}">${esc(a.name ? a.name + ' · ' : '')}${esc(a.label)}${a.partner ? ' ✔ đã có link' : ''}</option>`).join('');
    if (keep) $('#af-account').value = keep;
  }
  $('#af-account').addEventListener('change', () => {
    const a = (state.affAccounts || []).find((x) => x.email === $('#af-account').value);
    const p = a && (state.partners || []).find((x) => x.email === a.email);
    $('#af-name').value = p ? p.name : (a ? a.name : '');
    $('#af-phone').value = p ? p.phone : (a ? a.phone : '');
    $('#af-type').value = p ? p.type : 'individual';
    $('#af-code').value = p ? p.code : '';
    $('#af-code').disabled = Boolean(p);
    $('#aff-created').hidden = true;
  });
  $('#aff-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = e.submitter || $('#aff-form button[type=submit]');
    btn.disabled = true;
    try {
      const { partner } = await api('aff-create', {
        email: $('#af-account').value, name: $('#af-name').value, phone: $('#af-phone').value,
        type: $('#af-type').value, code: $('#af-code').value,
      });
      const link = refLink(partner.code);
      $('#aff-created').innerHTML = `<i class="fa fa-check-circle"></i> Link Affiliate của <strong>${esc(partner.name)}</strong> (mã IVY-${esc(partner.code)}):
        <code>${esc(link)}</code><button type="button" class="btn-outline js-copy-link" data-link="${esc(link)}"><i class="fa fa-copy"></i> Sao chép</button>`;
      $('#aff-created').hidden = false;
      toast('Đã tạo link Affiliate');
      await loadAffiliates();
      await loadAffAccounts();
    } catch (err) {
      toast(err.message, true);
    } finally {
      btn.disabled = false;
    }
  });

  function renderAffiliates() {
    const ps = state.partners || [];
    const sum = (f) => ps.reduce((t, p) => t + f(p), 0);
    const stats = [
      { label: 'Đối tác đã đăng ký', value: ps.length, note: 'Khách sạn, HDV, KOL…', cls: 'c-forest' },
      { label: 'Tổng lượt click link', value: sum((p) => p.clicks), note: 'Mỗi khách / ngày tính 1 lần', cls: 'c-glow' },
      { label: 'Khách được giới thiệu', value: sum((p) => p.leads), note: 'Đã để lại thông tin / đặt lịch', cls: 'c-green' },
      { label: 'Hoa hồng phải trả', value: fmtMoney(sum((p) => p.summary.availableAmount + p.summary.requestedAmount)), note: 'Chờ đối soát: ' + fmtMoney(sum((p) => p.summary.pendingAmount)), cls: 'c-amber' },
    ];
    $('#aff-stat-row').innerHTML = stats.map((x) => `<div class="stat ${x.cls}"><div class="stat-label">${esc(x.label)}</div><div class="stat-value">${x.value}</div><div class="stat-note">${esc(x.note)}</div></div>`).join('');

    const pending = [];
    ps.forEach((p) => (p.payouts || []).filter((x) => x.status === 'pending').forEach((x) => pending.push({ p, x })));
    $('#aff-payouts').innerHTML = pending.length ? pending.map(({ p, x }) => `
      <div class="payout-item">
        <span class="tier-badge c-amber">${fmtMoney(x.amount)}</span>
        <div class="grow"><strong>${esc(p.name)}</strong> · IVY-${esc(p.code)}
          <small>${esc(x.bank.bankName)} – ${esc(x.bank.bankNum)} – ${esc(x.bank.bankHolder)} · gửi ${esc(fmtDate(x.createdAt))}</small></div>
        ${can('owner') ? `<button type="button" class="btn-gold js-pay" data-email="${esc(p.email)}" data-id="${esc(x.id)}" data-status="paid"><i class="fa fa-check"></i> Đã chuyển khoản</button>
        <button type="button" class="btn-danger-outline js-pay" data-email="${esc(p.email)}" data-id="${esc(x.id)}" data-status="rejected">Từ chối</button>` : '<small>Chờ Chủ Spa duyệt</small>'}
      </div>`).join('') : '<div class="empty">Không có yêu cầu rút tiền nào đang chờ.</div>';
    $$('.js-pay').forEach((b) => b.addEventListener('click', async () => {
      const label = b.dataset.status === 'paid' ? 'xác nhận ĐÃ CHUYỂN KHOẢN' : 'TỪ CHỐI';
      if (!confirm('Bạn chắc chắn ' + label + ' yêu cầu này?')) return;
      try { await api('payout-set', { email: b.dataset.email, id: b.dataset.id, status: b.dataset.status }); toast('Đã cập nhật yêu cầu rút tiền'); loadAffiliates(); } catch (e) { toast(e.message, true); }
    }));

    const cols = ['Đối tác', 'Loại hình', 'Mã giới thiệu', 'Liên hệ', 'Lượt click', 'Khách giới thiệu', 'Đơn hoàn tất', 'Hoa hồng 10%', 'Thành viên F1'];
    $('#aff-table-wrap').innerHTML = `<table class="aff-table">
      <thead><tr>${cols.map((c, i) => `<th class="${PALETTE[i]}">${c}</th>`).join('')}</tr></thead>
      <tbody>${ps.length ? ps.map((p) => `
        <tr>
          <td><strong>${esc(p.name)}</strong><br><span class="src">Từ ${esc(fmtDate(p.createdAt))}</span></td>
          <td>${esc(p.typeLabel)}</td>
          <td><strong>IVY-${esc(p.code)}</strong><br><button type="button" class="link-copy js-copy-link" data-link="${esc(refLink(p.code))}" title="${esc(refLink(p.code))}"><i class="fa fa-copy"></i> Sao chép link</button></td>
          <td>${esc(p.phone)}<br><span class="src">${esc(p.email.startsWith('u:') ? 'Tên đăng nhập: ' + p.email.slice(2).toUpperCase() : p.email)}</span></td>
          <td>${p.clicks}</td>
          <td>${p.leads}</td>
          <td>${p.summary.ordersSuccess}<br><span class="src">Doanh số: ${fmtMoney((p.sales && p.sales.total) || 0)}</span></td>
          <td>Khả dụng: <strong>${fmtMoney(p.summary.availableAmount)}</strong><br><span class="src">Chờ đối soát: ${fmtMoney(p.summary.pendingAmount)} · Đã trả: ${fmtMoney(p.summary.paidAmount)}</span></td>
          <td><strong>${p.members || 0}</strong><br><span class="src">đăng ký trực tiếp</span></td>
        </tr>`).join('') : '<tr><td colspan="9"><div class="empty">Chưa có đối tác nào. Tạo link ở khung phía trên, hoặc đối tác tự đăng ký ở ivyluxe.com.vn/affiliate.</div></td></tr>'}</tbody></table>`;
  }

  // ---------- Phân quyền ----------
  async function loadRoles() {
    try {
      const data = await api('roles');
      $('#role-list').innerHTML =
        data.owners.map((e) => `<div class="role-item"><span class="email">${esc(e)}</span><span class="tier-badge c-wine">Chủ Spa</span></div>`).join('') +
        (data.roles.length ? data.roles.map((r) => `
          <div class="role-item"><span class="email">${r.username ? '<i class="fa fa-key"></i> Tên đăng nhập: <strong>' + esc(r.username) + '</strong>' : esc(r.email)}</span>
            <span class="tier-badge ${ROLE_CLASS[r.role]}">${esc(ROLE_LABEL[r.role])}</span>
            <button type="button" class="icon-btn ${r.username ? 'js-del-account' : 'js-revoke'}" data-email="${esc(r.email)}" data-name="${esc(r.username || r.email)}" title="${r.username ? 'Xoá tài khoản' : 'Thu hồi quyền'}"><i class="fa fa-times"></i></button>
          </div>`).join('') : '<div class="empty">Chưa cấp quyền cho ai khác.</div>');
      $$('.js-del-account').forEach((b) => b.addEventListener('click', async () => {
        if (!confirm('Xoá tài khoản đăng nhập "' + b.dataset.name + '"? Người đang dùng tài khoản này sẽ không vào được nữa.')) return;
        try { await api('account-delete', { email: b.dataset.email }); toast('Đã xoá tài khoản'); loadRoles(); } catch (e) { toast(e.message, true); }
      }));
      $$('.js-revoke').forEach((b) => b.addEventListener('click', async () => {
        if (!confirm('Thu hồi quyền của ' + b.dataset.email + '?')) return;
        try { await api('role-set', { email: b.dataset.email, role: 'none' }); toast('Đã thu hồi quyền'); loadRoles(); } catch (e) { toast(e.message, true); }
      }));
    } catch (e) {
      toast(e.message, true);
    }
  }

  $('#role-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    try {
      await api('role-set', { email: $('#role-email').value, role: $('#role-select').value });
      $('#role-email').value = '';
      toast('Đã cấp quyền');
      loadRoles();
    } catch (err) {
      toast(err.message, true);
    }
  });

  $('#account-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = e.submitter || $('#account-form button[type=submit]');
    btn.disabled = true;
    try {
      const { updated } = await api('account-create', {
        username: $('#acc-username').value, role: $('#acc-role').value,
        password: $('#acc-password').value, confirm: $('#acc-confirm').value,
      });
      toast(updated ? 'Đã đổi mật khẩu tài khoản ' + $('#acc-username').value : 'Đã tạo tài khoản ' + $('#acc-username').value);
      e.target.reset();
      loadRoles();
    } catch (err) {
      toast(err.message, true);
    } finally {
      btn.disabled = false;
    }
  });

  // ---------- Bot Telegram ----------
  // ---------- Bot báo tin quản trị ----------
  async function loadNotify() {
    const box = $('#nb-status');
    try {
      const s = await api('notify-status');
      const ok = (v) => (v ? '✅' : '❌');
      const hooked = s.webhook && s.webhook.url && s.webhook.url.endsWith('/api/notify-bot');
      box.innerHTML = `${ok(s.hasToken)} Token bot báo tin (NOTIFY_BOT_TOKEN)<br>${ok(hooked)} Đã kết nối${s.username ? ' – bot <strong>@' + esc(s.username) + '</strong>' : ''}<br>${ok(s.chats.length)} Nhóm đang nhận tin: ${s.chats.length}`;
      $('#btn-nb-setup').disabled = !s.hasToken;
      $('#btn-nb-pair').disabled = !hooked;
      $('#btn-nb-test').disabled = !s.chats.length;
      $('#nb-chats').innerHTML = s.chats.map((c) => `<div class="role-item"><span class="email"><i class="fa fa-users"></i> ${esc(c.title)}</span><button type="button" class="icon-btn js-nb-remove" data-id="${esc(c.id)}" title="Gỡ nhóm"><i class="fa fa-times"></i></button></div>`).join('');
      $$('.js-nb-remove').forEach((b) => b.addEventListener('click', async () => {
        if (!confirm('Ngừng gửi thông báo vào nhóm này?')) return;
        try { await api('notify-remove', { id: b.dataset.id }); loadNotify(); } catch (e) { toast(e.message, true); }
      }));
    } catch (e) {
      box.textContent = e.message;
    }
  }
  $('#btn-nb-setup').addEventListener('click', async () => {
    try { const { username } = await api('notify-setup', {}); toast('Đã kết nối bot @' + username); loadNotify(); } catch (e) { toast(e.message, true); }
  });
  $('#btn-nb-pair').addEventListener('click', async () => {
    try {
      const { code } = await api('notify-pair', {});
      const el = $('#nb-code');
      el.hidden = false;
      el.innerHTML = `Mã kết nối (dùng trong 15 phút): <strong>${esc(code)}</strong><br>1. Thêm bot vào nhóm Telegram của quản trị viên.<br>2. Trong nhóm gõ: <code>/ketnoi ${esc(code)}</code><br>3. Bấm "Làm mới" hoặc tải lại trang để thấy nhóm trong danh sách.`;
    } catch (e) { toast(e.message, true); }
  });
  $('#btn-nb-test').addEventListener('click', async () => {
    try { await api('notify-test', {}); toast('Đã gửi tin thử vào nhóm'); } catch (e) { toast(e.message, true); }
  });

  async function loadTelegram() {
    const box = $('#tg-status');
    try {
      const s = await api('telegram-status');
      const ok = (v) => (v ? '✅' : '❌');
      const hooked = s.webhook && s.webhook.url && s.webhook.url.endsWith('/api/telegram');
      box.innerHTML = `${ok(s.hasToken)} Token bot Telegram (TELEGRAM_BOT_TOKEN)<br>${ok(s.hasAI)} Khoá AI${s.ai ? ': ' + esc(s.ai) : ' (GEMINI_API_KEY hoặc ANTHROPIC_API_KEY)'}<br>${ok(hooked)} Đã kết nối webhook${s.username ? ' – bot <strong>@' + esc(s.username) + '</strong>' : ''}${s.webhook && s.webhook.lastError ? '<br>⚠️ Lỗi gần nhất: ' + esc(s.webhook.lastError) : ''}`;
      $('#btn-tg-setup').disabled = !s.hasToken;
    } catch (e) {
      box.textContent = e.message;
    }
  }
  $('#btn-tg-setup').addEventListener('click', async () => {
    try {
      const { username, url } = await api('telegram-setup', {});
      toast('Đã kết nối bot @' + username + (url ? ' qua ' + url.replace(/^https:\/\//, '').replace(/\/api\/telegram$/, '') : ''));
      loadTelegram();
    } catch (e) {
      toast(e.message, true);
    }
  });

  $('#btn-reset').addEventListener('click', async () => {
    const typed = prompt('Thao tác này XOÁ TOÀN BỘ khách trong CRM và không thể hoàn tác.\nGõ chữ XOA (viết hoa) để xác nhận:');
    if (typed !== 'XOA') return;
    try {
      const { deleted } = await api('reset', { confirm: 'XOA' });
      toast('Đã xoá ' + deleted + ' khách. CRM đã được làm mới.');
      loadLeads(true);
    } catch (e) {
      toast(e.message, true);
    }
  });

  boot();
})();
