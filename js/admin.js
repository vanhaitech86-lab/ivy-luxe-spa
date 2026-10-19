/**
 * IVY LUXE SPA - ADMIN PORTAL APPLICATION SCRIPT
 * Số 48 phố Hà Trung, phường Hoàn Kiếm, thành phố Hà Nội
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // Seed default data if not present
  initSeedAdminData();

  // Check Admin Login
  checkAdminAuth();

  // Clock in topbar
  updateAdminClock();
  setInterval(updateAdminClock, 1000);

  // Tab switching
  initAdminTabs();

  // Initialize all sections
  renderDashboard();
  renderBookingsTable();
  renderServicesGrid();
  renderAffiliatesTable();
  renderSePayTransactions();
  initManualBookingForm();
  initPartnerAdminForm();
  initSePayConfigForm();
});

// Seed Initial Data
function initSeedAdminData() {
  // 1. Bookings
  if (!localStorage.getItem('ivy_bookings')) {
    const defaultBookings = [
      {
        id: 'IVY8892',
        name: 'Trần Văn Bình',
        phone: '0981234567',
        service: 'IVY SPECIAL - COMBO 1 (HOT) - 90 PHÚT',
        branch: 'Số 48 phố Hà Trung, phường Hoàn Kiếm, thành phố Hà Nội',
        date: '2026-10-19',
        time: '14:30',
        guests: '2 Khách',
        affCode: 'IVY-HOTEL_HANOI',
        totalPrice: 1600000,
        payableAmount: 1368000,
        payMethod: 'sepay-qr',
        payMethodLabel: 'Thanh Toán VietQR SePay (Giảm thêm 5%)',
        status: 'Đã thanh toán (Sacombank SePay)',
        paymentStatus: 'Đã thanh toán qua Sacombank',
        createdAt: '2026-10-18T10:30:00.000Z'
      },
      {
        id: 'IVY7731',
        name: 'David Smith (Du khách Anh)',
        phone: '+44 7911 123456',
        service: 'IVY SPECIAL - COMBO 3 - 120 PHÚT',
        branch: 'Số 48 phố Hà Trung, phường Hoàn Kiếm, thành phố Hà Nội',
        date: '2026-10-19',
        time: '16:00',
        guests: '1 Khách',
        affCode: 'IVY-MINH_TOUR',
        totalPrice: 1000000,
        payableAmount: 900000,
        payMethod: 'sepay-qr',
        payMethodLabel: 'Thanh Toán VietQR SePay',
        status: 'Đã thanh toán (Sacombank SePay)',
        paymentStatus: 'Đã thanh toán qua Sacombank',
        createdAt: '2026-10-18T11:15:00.000Z'
      },
      {
        id: 'IVY6520',
        name: 'Nguyễn Thị Hương',
        phone: '0912999888',
        service: 'IVY SPECIAL - COMBO 2 - 70/75 PHÚT',
        branch: 'Số 48 phố Hà Trung, phường Hoàn Kiếm, thành phố Hà Nội',
        date: '2026-10-20',
        time: '18:30',
        guests: '3 Khách',
        affCode: 'Không có',
        totalPrice: 1350000,
        payableAmount: 100000,
        payMethod: 'deposit',
        payMethodLabel: 'Đặt Cọc Giữ Chỗ (100.000đ)',
        status: 'Đã cọc (100.000đ)',
        paymentStatus: 'Đã cọc qua Sacombank',
        createdAt: '2026-10-18T13:45:00.000Z'
      },
      {
        id: 'IVY5419',
        name: 'Hoàng Minh Quân',
        phone: '0908777666',
        service: 'IVY SPECIAL - COMBO 1 (HOT) - 90 PHÚT',
        branch: 'Số 48 phố Hà Trung, phường Hoàn Kiếm, thành phố Hà Nội',
        date: '2026-10-21',
        time: '15:00',
        guests: '2 Khách',
        affCode: 'Không có',
        totalPrice: 1600000,
        payableAmount: 1600000,
        payMethod: 'cash',
        payMethodLabel: 'Tiền mặt tại quầy',
        status: 'Chờ xác nhận (Tiền mặt)',
        paymentStatus: 'Chưa thanh toán',
        createdAt: '2026-10-18T14:10:00.000Z'
      }
    ];
    localStorage.setItem('ivy_bookings', JSON.stringify(defaultBookings));
  }

  // 2. SePay Transactions
  if (!localStorage.getItem('ivy_transactions')) {
    const defaultTx = [
      {
        id: 'TX179231201',
        bookingCode: 'IVY8892',
        customerName: 'Trần Văn Bình',
        amount: 1368000,
        bank: 'Sacombank',
        accountNumber: '020113149011',
        accountName: 'HKD IVY LUXE SPA',
        gateway: 'SePay VietQR Auto',
        status: 'THÀNH CÔNG',
        time: '18/10/2026 10:32:15'
      },
      {
        id: 'TX179231202',
        bookingCode: 'IVY7731',
        customerName: 'David Smith',
        amount: 900000,
        bank: 'Sacombank',
        accountNumber: '020113149011',
        accountName: 'HKD IVY LUXE SPA',
        gateway: 'SePay VietQR Auto',
        status: 'THÀNH CÔNG',
        time: '18/10/2026 11:16:40'
      },
      {
        id: 'TX179231203',
        bookingCode: 'IVY6520',
        customerName: 'Nguyễn Thị Hương',
        amount: 100000,
        bank: 'Sacombank',
        accountNumber: '020113149011',
        accountName: 'HKD IVY LUXE SPA',
        gateway: 'SePay VietQR Auto',
        status: 'THÀNH CÔNG',
        time: '18/10/2026 13:46:10'
      }
    ];
    localStorage.setItem('ivy_transactions', JSON.stringify(defaultTx));
  }
}

// Check Admin Authentication
function checkAdminAuth() {
  const overlay = document.getElementById('admin-login-overlay');
  const app = document.getElementById('admin-app');
  const displayName = document.getElementById('admin-display-name');

  // Danh sách 2 email duy nhất có quyền quản trị tối cao
  const ALLOWED_ADMINS = ['ivyspahanoi@gmail.com', 'vanhaitech.86@gmail.com'];
  const ADMIN_PASS = 'Admin6789a@';

  let currentUser = null;
  try {
    currentUser = JSON.parse(localStorage.getItem('ivy_current_user') || 'null');
  } catch (e) {}

  if (currentUser) {
    const userEmail = (currentUser.email || '').toLowerCase().trim();
    if (currentUser.role === 'admin' && ALLOWED_ADMINS.includes(userEmail)) {
      if (overlay) overlay.style.display = 'none';
      if (app) app.style.display = 'flex';
      if (displayName) displayName.textContent = currentUser.name || (userEmail === 'vanhaitech.86@gmail.com' ? 'Admin Kỹ Thuật (Văn Hải)' : 'Quản Trị Viên IVY LUXE');
      return;
    } else {
      alert('Truy cập bị từ chối!\nTrang này chỉ dành riêng cho Quản Trị Viên được cấp quyền nội bộ. Tài khoản của bạn không có quyền truy cập.');
      localStorage.removeItem('ivy_current_user');
      window.location.href = 'index.html';
      return;
    }
  }

  if (overlay) overlay.style.display = 'flex';
  if (app) app.style.display = 'none';

  // Handle Login Form
  const loginForm = document.getElementById('admin-login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const rawUser = document.getElementById('admin-input-user')?.value.trim() || '';
      const pass = document.getElementById('admin-input-pass')?.value || '';
      const userLower = rawUser.toLowerCase().trim();

      const adminNames = {
        'ivyspahanoi@gmail.com': 'Quản Trị Viên IVY LUXE',
        'vanhaitech.86@gmail.com': 'Admin Kỹ Thuật (Văn Hải)'
      };

      if (ALLOWED_ADMINS.includes(userLower) && pass === ADMIN_PASS) {
        const adminUser = {
          email: userLower,
          name: adminNames[userLower] || 'Quản Trị Viên IVY LUXE',
          role: 'admin'
        };
        localStorage.setItem('ivy_current_user', JSON.stringify(adminUser));
        if (overlay) overlay.style.display = 'none';
        if (app) app.style.display = 'flex';
        if (displayName) displayName.textContent = adminUser.name;
        renderDashboard();
      } else {
        alert('Đăng nhập thất bại!\nTài khoản hoặc mật khẩu quản trị viên không chính xác. Quyền truy cập bị từ chối.');
      }
    });
  }

  // Handle Logout
  const logoutBtn = document.getElementById('admin-btn-logout');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      if (confirm('Bạn có chắc chắn muốn đăng xuất khỏi trang Quản trị?')) {
        localStorage.removeItem('ivy_current_user');
        window.location.reload();
      }
    });
  }
}

// Clock in Topbar
function updateAdminClock() {
  const clock = document.getElementById('admin-current-clock');
  if (!clock) return;
  const now = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
  clock.textContent = now.toLocaleDateString('vi-VN', options);
}

// Tab Switching
function initAdminTabs() {
  const navItems = document.querySelectorAll('.sb-nav-item');
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      const tabName = item.getAttribute('data-tab');
      switchAdminTab(tabName);
    });
  });
}

function switchAdminTab(tabName) {
  const navItems = document.querySelectorAll('.sb-nav-item');
  const sections = document.querySelectorAll('.admin-section');
  const pageTitle = document.getElementById('admin-page-title');

  navItems.forEach(item => {
    if (item.getAttribute('data-tab') === tabName) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });

  sections.forEach(sec => {
    if (sec.id === 'sec-' + tabName) {
      sec.classList.add('active');
    } else {
      sec.classList.remove('active');
    }
  });

  const titles = {
    dashboard: 'Bảng Tổng Quan Hoạt Động',
    bookings: 'Quản Lý Đặt Lịch & Khách Hàng',
    services: 'Quản Lý Bảng Dịch Vụ & Giá',
    affiliates: 'Quản Lý Đối Tác & Link Tiếp Thị',
    sepay: 'Cấu Hình Thanh Toán Tự Động SePay (Sacombank)'
  };
  if (pageTitle && titles[tabName]) {
    pageTitle.textContent = titles[tabName];
  }
}

// 1. DASHBOARD OVERVIEW
function renderDashboard() {
  const bookings = JSON.parse(localStorage.getItem('ivy_bookings') || '[]');
  const transactions = JSON.parse(localStorage.getItem('ivy_transactions') || '[]');
  const affStore = JSON.parse(localStorage.getItem('ivy_affiliates_data') || '{"partners":[]}');

  // Revenue calculation
  let totalRev = 0;
  bookings.forEach(b => {
    if (b.status && (b.status.includes('thanh toán') || b.status.includes('cọc') || b.status.includes('hoàn thành'))) {
      totalRev += (b.payableAmount || b.totalPrice || 0);
    }
  });

  const pendingCount = bookings.filter(b => b.status && b.status.includes('Chờ')).length;

  // KPI elements
  const kpiRev = document.getElementById('kpi-revenue');
  const kpiBookings = document.getElementById('kpi-bookings');
  const kpiPending = document.getElementById('kpi-pending-bookings');
  const kpiTx = document.getElementById('kpi-sepay-tx');
  const kpiAff = document.getElementById('kpi-affiliates');
  const kpiAffCom = document.getElementById('kpi-aff-commission');
  const sbCount = document.getElementById('sb-booking-count');

  if (kpiRev) kpiRev.textContent = totalRev.toLocaleString('vi-VN') + 'đ';
  if (kpiBookings) kpiBookings.textContent = bookings.length;
  if (kpiPending) kpiPending.textContent = pendingCount + ' đơn chờ xử lý';
  if (kpiTx) kpiTx.textContent = transactions.length + ' giao dịch';
  if (kpiAff) kpiAff.textContent = affStore.partners.length;
  if (sbCount) sbCount.textContent = bookings.length;

  let totalCom = 0;
  affStore.partners.forEach(p => totalCom += (p.commission || 0));
  if (kpiAffCom) kpiAffCom.textContent = 'Hoa hồng: ' + totalCom.toLocaleString('vi-VN') + 'đ';

  // Render Recent Bookings Table in Dashboard
  const dashBookingsTbody = document.getElementById('dash-recent-bookings');
  if (dashBookingsTbody) {
    const recent5 = bookings.slice(0, 5);
    if (!recent5.length) {
      dashBookingsTbody.innerHTML = '<tr><td colspan="6" style="text-align:center;">Chưa có lịch hẹn nào</td></tr>';
    } else {
      dashBookingsTbody.innerHTML = recent5.map(b => `
        <tr>
          <td><strong style="color:#ECC876;">${b.id}</strong></td>
          <td><strong>${b.name}</strong><br><small style="color:#A3B5AD;">${b.phone}</small></td>
          <td>${b.service.split('-')[0] || b.service}</td>
          <td>${b.date} (${b.time})</td>
          <td>${(b.payableAmount || 0).toLocaleString('vi-VN')}đ</td>
          <td>${renderStatusBadge(b.status)}</td>
        </tr>
      `).join('');
    }
  }

  // Render Recent SePay Transactions in Dashboard
  const dashTxTbody = document.getElementById('dash-recent-tx');
  if (dashTxTbody) {
    const recentTx = transactions.slice(0, 5);
    if (!recentTx.length) {
      dashTxTbody.innerHTML = '<tr><td colspan="5" style="text-align:center;">Chưa có giao dịch SePay nào</td></tr>';
    } else {
      dashTxTbody.innerHTML = recentTx.map(tx => `
        <tr>
          <td><code>${tx.id}</code></td>
          <td>${tx.customerName} (Đơn: ${tx.bookingCode})</td>
          <td><strong style="color:#25D366;">+${tx.amount.toLocaleString('vi-VN')}đ</strong></td>
          <td><small>${tx.time}</small></td>
          <td><span class="status-badge status-paid">Thành Công</span></td>
        </tr>
      `).join('');
    }
  }
}

// Helper: Status badge
function renderStatusBadge(status = '') {
  if (status.includes('thanh toán') || status.includes('cọc')) {
    return `<span class="status-badge status-paid">${status}</span>`;
  }
  if (status.includes('hoàn thành')) {
    return `<span class="status-badge status-completed">${status}</span>`;
  }
  if (status.includes('Hủy') || status.includes('hủy')) {
    return `<span class="status-badge status-cancelled">${status}</span>`;
  }
  return `<span class="status-badge status-pending">${status || 'Chờ xác nhận'}</span>`;
}

// 2. BOOKINGS TABLE MANAGEMENT
function renderBookingsTable() {
  const tbody = document.getElementById('admin-bookings-tbody');
  if (!tbody) return;

  const bookings = JSON.parse(localStorage.getItem('ivy_bookings') || '[]');
  const search = document.getElementById('booking-search-input')?.value.toLowerCase().trim() || '';
  const filter = document.getElementById('booking-filter-status')?.value || 'all';

  const filtered = bookings.filter(b => {
    const matchSearch = !search || 
      b.name.toLowerCase().includes(search) || 
      b.phone.toLowerCase().includes(search) || 
      b.id.toLowerCase().includes(search) ||
      b.service.toLowerCase().includes(search);

    let matchFilter = true;
    if (filter === 'pending') matchFilter = b.status && b.status.includes('Chờ');
    if (filter === 'paid') matchFilter = b.status && (b.status.includes('thanh toán') || b.status.includes('cọc'));
    if (filter === 'completed') matchFilter = b.status && b.status.includes('hoàn thành');
    if (filter === 'cancelled') matchFilter = b.status && (b.status.includes('Hủy') || b.status.includes('hủy'));

    return matchSearch && matchFilter;
  });

  if (!filtered.length) {
    tbody.innerHTML = '<tr><td colspan="11" style="text-align:center; padding:30px;">Không tìm thấy lịch đặt nào phù hợp</td></tr>';
    return;
  }

  tbody.innerHTML = filtered.map(b => `
    <tr>
      <td><strong style="color:#ECC876;">${b.id}</strong></td>
      <td><strong>${b.name}</strong></td>
      <td><a href="tel:${b.phone}" style="color:#FFF; text-decoration:none;"><i class="fa fa-phone"></i> ${b.phone}</a></td>
      <td title="${b.service}">${b.service.length > 25 ? b.service.slice(0, 25) + '...' : b.service}</td>
      <td>${b.date} (${b.time})</td>
      <td>${b.guests}</td>
      <td><strong style="color:#ECC876;">${(b.payableAmount || b.totalPrice || 0).toLocaleString('vi-VN')}đ</strong></td>
      <td><small>${b.payMethodLabel || 'Tiền mặt'}</small></td>
      <td><small style="color:#25D366;">${b.affCode || 'Trực tiếp'}</small></td>
      <td>
        <select class="admin-select" style="padding:4px 8px; font-size:0.75rem; width:auto;" onchange="updateBookingStatus('${b.id}', this.value)">
          <option value="Chờ xác nhận (Tiền mặt)" ${b.status && b.status.includes('Chờ xác nhận') ? 'selected' : ''}>Chờ xác nhận</option>
          <option value="Đã cọc (100.000đ)" ${b.status && b.status.includes('Đã cọc') ? 'selected' : ''}>Đã cọc SePay</option>
          <option value="Đã thanh toán (Sacombank SePay)" ${b.status && b.status.includes('Đã thanh toán') ? 'selected' : ''}>Đã thanh toán 100%</option>
          <option value="Đã hoàn thành trị liệu" ${b.status && b.status.includes('hoàn thành') ? 'selected' : ''}>Đã hoàn thành</option>
          <option value="Đã hủy lịch hẹn" ${b.status && b.status.includes('hủy') ? 'selected' : ''}>Hủy đơn</option>
        </select>
      </td>
      <td>
        <div style="display:flex; gap:6px;">
          <a href="https://wa.me/84${b.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Chào bạn, IVY LUXE SPA (Số 48 phố Hà Trung, P. Hoàn Kiếm, Hà Nội) xin xác nhận lịch hẹn của bạn: ' + b.id)}" target="_blank" class="btn-sm-gold" title="Nhắn WhatsApp / Zalo"><i class="fa fa-whatsapp"></i></a>
          <button type="button" class="btn-sm-gold" style="border-color:red; color:red;" onclick="deleteBooking('${b.id}')" title="Xóa đơn"><i class="fa fa-trash"></i></button>
        </div>
      </td>
    </tr>
  `).join('');
}

// Update booking status
window.updateBookingStatus = function(bookingId, newStatus) {
  const bookings = JSON.parse(localStorage.getItem('ivy_bookings') || '[]');
  const target = bookings.find(x => x.id === bookingId);
  if (target) {
    target.status = newStatus;
    localStorage.setItem('ivy_bookings', JSON.stringify(bookings));
    renderDashboard();
  }
};

// Delete booking
window.deleteBooking = function(bookingId) {
  if (confirm('Bạn có chắc chắn muốn xóa đơn đặt lịch ' + bookingId + '?')) {
    let bookings = JSON.parse(localStorage.getItem('ivy_bookings') || '[]');
    bookings = bookings.filter(x => x.id !== bookingId);
    localStorage.setItem('ivy_bookings', JSON.stringify(bookings));
    renderDashboard();
    renderBookingsTable();
  }
};

// Search & Filter listeners
const bookingSearch = document.getElementById('booking-search-input');
const bookingFilter = document.getElementById('booking-filter-status');
if (bookingSearch) bookingSearch.addEventListener('input', renderBookingsTable);
if (bookingFilter) bookingFilter.addEventListener('change', renderBookingsTable);

// Export CSV
const exportBtn = document.getElementById('btn-export-bookings-csv');
if (exportBtn) {
  exportBtn.addEventListener('click', () => {
    const bookings = JSON.parse(localStorage.getItem('ivy_bookings') || '[]');
    if (!bookings.length) {
      alert('Chưa có dữ liệu đặt lịch để xuất file!');
      return;
    }

    let csvContent = '\uFEFF'; // UTF-8 BOM for Excel
    csvContent += 'Mã Đơn,Khách Hàng,Số Điện Thoại,Dịch Vụ,Ngày Đến,Giờ Hẹn,Số Khách,Số Tiền,Hình Thức,Mã Affiliate,Trạng Thái,Thời Gian Tạo\n';

    bookings.forEach(b => {
      csvContent += `"${b.id}","${b.name}","${b.phone}","${b.service}","${b.date}","${b.time}","${b.guests}","${b.payableAmount || b.totalPrice}","${b.payMethodLabel || ''}","${b.affCode || ''}","${b.status}","${b.createdAt}"\n`;
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'IVY_LUXE_SPA_BOOKINGS_' + new Date().toISOString().split('T')[0] + '.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  });
}

// 3. SERVICES MANAGEMENT
function renderServicesGrid() {
  const container = document.getElementById('admin-services-container');
  if (!container) return;

  const defaultServices = [
    {
      id: 'combo-1',
      name: 'IVY SPECIAL - COMBO 1 (HOT)',
      duration: '90 Phút',
      price: 800000,
      desc: 'Tặng kèm ngâm chân thảo dược + Massage body (30\') + Gội đầu dưỡng sinh (30\') + Facial & Vệ sinh tai (30\').',
      img: 'assets/images/head_spa_ritual.jpg',
      status: 'Đang Phục Vụ'
    },
    {
      id: 'combo-2',
      name: 'IVY SPECIAL - COMBO 2 (RELAX)',
      duration: '70 - 75 Phút',
      price: 450000,
      desc: 'Tặng kèm ngâm chân thảo dược + Massage chân bấm huyệt (30\') + Tẩy tế bào chết chân (30\') + Đắp mặt nạ chân (10\').',
      img: 'assets/images/foot_soak_care.jpg',
      status: 'Đang Phục Vụ'
    },
    {
      id: 'combo-3',
      name: 'IVY SPECIAL - COMBO 3 (ROYAL)',
      duration: '120 Phút',
      price: 1000000,
      desc: 'Tặng kèm ngâm chân thảo dược + Massage body toàn thân (45\') + Tẩy tế bào chết (30\') + Facial & Ear Clean (45\').',
      img: 'assets/images/couple_suite_bath.jpg',
      status: 'Đang Phục Vụ'
    },
    {
      id: 'body-aromatherapy',
      name: 'Massage Body Tinh Dầu Trị Liệu',
      duration: '60 - 90 Phút',
      price: 550000,
      desc: 'Sử dụng tinh dầu thảo mộc hữu cơ cao cấp giúp lưu thông khí huyết, giải tỏa căng thẳng toàn thân.',
      img: 'assets/images/facial_gold_care.jpg',
      status: 'Đang Phục Vụ'
    },
    {
      id: 'hot-stone-spa',
      name: 'Massage Đá Nóng Nham Thạch',
      duration: '90 Phút',
      price: 700000,
      desc: 'Đá khoáng nham thạch tự nhiên giữ nhiệt sâu, đả thông kinh lạc, giảm đau nhức xương khớp và mỏi vai gáy.',
      img: 'assets/images/hero_spa_luxury.jpg',
      status: 'Đang Phục Vụ'
    },
    {
      id: 'herbal-foot-bath',
      name: 'Ngâm Chân Thảo Dược & Massage Chân',
      duration: '60 Phút',
      price: 350000,
      desc: 'Nước cốt lá thuốc Dao Đỏ cùng gừng tươi và muối khoáng, massage bấm huyệt đạo bàn chân.',
      img: 'assets/images/foot_soak_care.jpg',
      status: 'Đang Phục Vụ'
    }
  ];

  let services = defaultServices;
  try {
    const saved = localStorage.getItem('ivy_admin_services');
    if (saved) services = JSON.parse(saved);
    else localStorage.setItem('ivy_admin_services', JSON.stringify(defaultServices));
  } catch (e) {}

  container.innerHTML = services.map(s => `
    <div class="admin-service-card">
      <img src="${s.img}" alt="${s.name}" class="admin-service-img">
      <div class="admin-service-body">
        <h4 class="admin-service-title">${s.name}</h4>
        <div class="admin-service-meta">
          <span style="color:#A3B5AD;"><i class="fa fa-clock-o"></i> ${s.duration}</span>
          <span class="admin-service-price">${s.price.toLocaleString('vi-VN')}đ</span>
        </div>
        <p class="admin-service-desc">${s.desc}</p>
        <div style="display:flex; justify-content:space-between; align-items:center; border-top:1px solid rgba(255,255,255,0.08); padding-top:10px;">
          <span class="status-badge status-paid">${s.status}</span>
          <button type="button" class="btn-sm-gold" onclick="editServicePrice('${s.id}')"><i class="fa fa-pencil"></i> Sửa Giá</button>
        </div>
      </div>
    </div>
  `).join('');

  // Populate manual booking service select
  const mbSelect = document.getElementById('mb-service');
  if (mbSelect) {
    mbSelect.innerHTML = services.map(s => `
      <option value="${s.name} - ${s.price.toLocaleString('vi-VN')}đ">${s.name} (${s.duration} - ${s.price.toLocaleString('vi-VN')}đ)</option>
    `).join('');
  }
}

// Edit Service Price Prompt
window.editServicePrice = function(serviceId) {
  let services = JSON.parse(localStorage.getItem('ivy_admin_services') || '[]');
  const s = services.find(x => x.id === serviceId);
  if (!s) return;

  const newPriceStr = prompt('Nhập giá mới cho gói [' + s.name + '] (VNĐ):', s.price);
  if (newPriceStr !== null) {
    const newPrice = parseInt(newPriceStr.replace(/[^0-9]/g, ''), 10);
    if (!isNaN(newPrice) && newPrice > 0) {
      s.price = newPrice;
      localStorage.setItem('ivy_admin_services', JSON.stringify(services));
      renderServicesGrid();
      alert('Đã cập nhật giá mới: ' + newPrice.toLocaleString('vi-VN') + 'đ');
    }
  }
};

// 4. AFFILIATES PARTNERS TABLE
function renderAffiliatesTable(filterText = '') {
  const tbody = document.getElementById('admin-affiliates-tbody');
  if (!tbody) return;

  const affStore = JSON.parse(localStorage.getItem('ivy_affiliates_data') || '{"partners":[]}');
  let partners = affStore.partners || [];

  if (filterText) {
    const q = filterText.toLowerCase();
    partners = partners.filter(p => 
      (p.name && p.name.toLowerCase().includes(q)) ||
      (p.phone && p.phone.includes(q)) ||
      (p.code && p.code.toLowerCase().includes(q)) ||
      (p.email && p.email.toLowerCase().includes(q))
    );
  }

  if (!partners.length) {
    tbody.innerHTML = '<tr><td colspan="11" style="text-align:center; padding:30px; color:#A3B5AD;">Không tìm thấy đối tác tiếp thị nào</td></tr>';
    return;
  }

  const originUrl = window.location.origin;

  tbody.innerHTML = partners.map(p => {
    const fullLink = originUrl + '/?ref=' + encodeURIComponent(p.code);
    const ratePercent = parseInt((p.commissionRate || '30%').replace('%', ''), 10) || 30;
    const rev = p.revenue || (p.ordersSuccess ? p.ordersSuccess * 900000 : 0);
    const com = p.commission || p.pendingAmount || Math.round(rev * (ratePercent / 100));
    const paid = p.receivedAmount || 0;
    const ordersCount = p.ordersSuccess || p.bookings || 0;
    const bankDetails = p.bankName ? `${p.bankName} - ${p.bankNum || ''} (${p.bankHolder || ''})` : (p.bank || 'Chưa cập nhật');

    return `
      <tr>
        <td>
          <strong>${p.name || 'Đối Tác'}</strong>
          ${p.email ? `<div style="font-size:0.75rem; color:#8FA59B;">${p.email}</div>` : ''}
        </td>
        <td>${p.phone || '---'}</td>
        <td><span class="status-badge status-completed">${p.typeName || p.type || 'Đối Tác VIP'}</span></td>
        <td><strong style="color:#ECC876; font-size:1rem;">${p.code}</strong></td>
        <td>
          <a href="${fullLink}" target="_blank" style="color:#D4AF37; font-size:0.8rem; text-decoration:none; display:inline-flex; align-items:center; gap:4px;" title="Mở link tiếp thị">
            <span>/?ref=${p.code}</span> <i class="fa fa-external-link"></i>
          </a>
        </td>
        <td><strong>${(p.clicks || 0).toLocaleString('vi-VN')}</strong></td>
        <td><strong style="color:#25D366;">${ordersCount} đơn</strong></td>
        <td>${rev.toLocaleString('vi-VN')}đ</td>
        <td>
          <strong style="color:#D4AF37; font-size:0.95rem;">${com.toLocaleString('vi-VN')}đ</strong>
          <div style="font-size:0.75rem; color:#8FA59B;">Tỷ lệ: ${p.commissionRate || '30%'}</div>
          ${paid > 0 ? `<div style="font-size:0.72rem; color:#25D366;">Đã chi trả: ${paid.toLocaleString('vi-VN')}đ</div>` : ''}
        </td>
        <td><small style="color:#DDE5E1;">${bankDetails}</small></td>
        <td>
          <button type="button" class="btn-sm-gold" onclick="payoutAffiliate('${p.code}', ${com})">
            <i class="fa fa-check"></i> Chi Trả
          </button>
        </td>
      </tr>
    `;
  }).join('');
}

// Search Partners Filter
const affSearchInput = document.getElementById('aff-search-input');
if (affSearchInput) {
  affSearchInput.addEventListener('input', (e) => {
    renderAffiliatesTable(e.target.value.trim());
  });
}

// Add Partner Modal Handling
function initPartnerAdminForm() {
  const openBtn = document.getElementById('btn-open-add-partner-modal');
  const modal = document.getElementById('modal-add-partner');
  const form = document.getElementById('form-add-affiliate-partner');

  if (openBtn && modal) {
    openBtn.addEventListener('click', () => {
      modal.style.display = 'flex';
    });
  }

  if (form && modal) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('ap-name').value.trim();
      const phone = document.getElementById('ap-phone').value.trim();
      const email = document.getElementById('ap-email').value.trim();
      let code = document.getElementById('ap-code').value.trim().toUpperCase().replace(/[^A-Z0-9_-]/g, '');
      const type = document.getElementById('ap-type').value;
      const rate = document.getElementById('ap-commission-rate').value;
      const bank = document.getElementById('ap-bank').value.trim();

      if (!code) code = 'IVY-' + Math.floor(1000 + Math.random() * 9000);

      const affStore = JSON.parse(localStorage.getItem('ivy_affiliates_data') || '{"partners":[]}');
      if (!affStore.partners) affStore.partners = [];

      const existing = affStore.partners.find(p => p.code && p.code.toUpperCase() === code);
      if (existing) {
        alert('Mã tiếp thị [' + code + '] đã tồn tại. Vui lòng chọn mã khác!');
        return;
      }

      affStore.partners.unshift({
        name,
        phone,
        email,
        code,
        typeName: type,
        commissionRate: rate,
        bank,
        clicks: 0,
        monthClicks: 0,
        ordersSuccess: 0,
        ordersPending: 0,
        pendingAmount: 0,
        receivedAmount: 0,
        orders: [],
        createdAt: new Date().toISOString()
      });

      localStorage.setItem('ivy_affiliates_data', JSON.stringify(affStore));
      modal.style.display = 'none';
      form.reset();

      renderAffiliatesTable();
      alert(`🎉 Đã thêm đối tác mới [${name}] thành công!\nMã giới thiệu: ${code} (Hoa hồng: ${rate})`);
    });
  }
}

window.payoutAffiliate = function(code, amount) {
  if (amount <= 0) {
    alert('Đối tác [' + code + '] chưa có hoa hồng khả dụng để chi trả!');
    return;
  }
  const confirmPayout = confirm(`Xác nhận đã chuyển khoản chi trả hoa hồng ${amount.toLocaleString('vi-VN')}đ cho đối tác [${code}]?`);
  if (confirmPayout) {
    const affStore = JSON.parse(localStorage.getItem('ivy_affiliates_data') || '{"partners":[]}');
    const partner = affStore.partners.find(p => p.code === code);
    if (partner) {
      partner.receivedAmount = (partner.receivedAmount || 0) + (partner.pendingAmount || amount);
      partner.pendingAmount = 0;
      partner.commission = 0;
      localStorage.setItem('ivy_affiliates_data', JSON.stringify(affStore));
      renderAffiliatesTable();
      alert(`✓ Đã ghi nhận quyết toán thành công ${amount.toLocaleString('vi-VN')}đ cho đối tác ${code}!`);
    }
  }
};

// 5. SEPAY TRANSACTIONS LIST & CONFIG
function renderSePayTransactions() {
  const tbody = document.getElementById('sepay-full-tx-tbody');
  if (!tbody) return;

  const transactions = JSON.parse(localStorage.getItem('ivy_transactions') || '[]');

  if (!transactions.length) {
    tbody.innerHTML = '<tr><td colspan="8" style="text-align:center; padding:30px;">Chưa có giao dịch SePay nào</td></tr>';
    return;
  }

  tbody.innerHTML = transactions.map(tx => `
    <tr>
      <td><code>${tx.id}</code></td>
      <td><strong style="color:#ECC876;">${tx.bookingCode}</strong></td>
      <td><strong>${tx.customerName}</strong></td>
      <td><strong style="color:#25D366;">+${tx.amount.toLocaleString('vi-VN')}đ</strong></td>
      <td>Sacombank</td>
      <td>${tx.accountNumber || '020113149011'}</td>
      <td>${tx.time}</td>
      <td><span class="status-badge status-paid">Thành Công</span></td>
    </tr>
  `).join('');
}

function initSePayConfigForm() {
  const form = document.getElementById('sepay-config-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Đã lưu cấu hình SePay và tài khoản Sacombank 020113149011 thành công!');
    });
  }
}

// 6. MANUAL BOOKING MODAL
function initManualBookingForm() {
  const openBtn = document.getElementById('btn-open-add-booking-modal');
  const modal = document.getElementById('modal-add-booking');
  const form = document.getElementById('form-add-manual-booking');

  if (openBtn && modal) {
    openBtn.addEventListener('click', () => {
      // Set today's date
      const dateInput = document.getElementById('mb-date');
      if (dateInput) dateInput.value = new Date().toISOString().split('T')[0];
      modal.style.display = 'flex';
    });
  }

  if (form && modal) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('mb-name')?.value.trim();
      const phone = document.getElementById('mb-phone')?.value.trim();
      const service = document.getElementById('mb-service')?.value;
      const date = document.getElementById('mb-date')?.value;
      const time = document.getElementById('mb-time')?.value;
      const guests = document.getElementById('mb-guests')?.value;
      const status = document.getElementById('mb-payment-status')?.value;

      const newId = 'IVY' + Math.floor(1000 + Math.random() * 9000);
      const bookings = JSON.parse(localStorage.getItem('ivy_bookings') || '[]');
      
      bookings.unshift({
        id: newId,
        name,
        phone,
        service,
        date,
        time,
        guests,
        payableAmount: 800000,
        payMethodLabel: status,
        status: status,
        affCode: 'Thêm thủ công',
        createdAt: new Date().toISOString()
      });

      localStorage.setItem('ivy_bookings', JSON.stringify(bookings));
      modal.style.display = 'none';
      form.reset();

      renderDashboard();
      renderBookingsTable();
      alert('Đã thêm lịch hẹn mới thành công: ' + newId);
    });
  }
}

window.closeAdminModal = function(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.style.display = 'none';
};
