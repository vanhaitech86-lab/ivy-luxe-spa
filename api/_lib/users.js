// Tài khoản khách hàng: lưu theo Gmail (chữ thường). Khoá kho:
//   user:<email>      → { email, name, phone, hash, verified, googleSub, createdAt }
//   phone:<sđt>       → email (để đăng nhập bằng số điện thoại)
//   verify:<sha(tok)> → email (liên kết xác nhận, hết hạn 24 giờ)
//   reset:<email>     → { otp: sha, tries } (mã quên mật khẩu, hết hạn 15 phút)
//   roles             → { <email>: 'admin' | 'staff' } (Chủ Spa cấp quyền quản trị theo Gmail)
const { getStore } = require('./store');

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const normEmail = (s) => String(s || '').trim().toLowerCase();
const normPhone = (s) => String(s || '').replace(/[\s.\-()]/g, '').replace(/^\+84/, '0');

async function getUser(email) {
  return email ? getStore().get('user:' + normEmail(email)) : null;
}
async function saveUser(u) {
  await getStore().set('user:' + u.email, u);
  if (u.verified && u.phone) await getStore().set('phone:' + normPhone(u.phone), u.email);
}
// Tài khoản quản trị đăng nhập bằng TÊN (VD: IVYLUXE) — lưu dưới khoá user:u:<tên viết thường>
const USERNAME_RE = /^[A-Za-z0-9_.-]{3,30}$/;
const usernameKey = (name) => 'u:' + String(name || '').trim().toLowerCase();

async function findByIdentifier(id) {
  const raw = String(id || '').trim();
  if (raw.includes('@')) return getUser(raw);
  const phone = normPhone(raw);
  if (/^0\d{9,10}$/.test(phone)) {
    const email = await getStore().get('phone:' + phone);
    return email ? getUser(email) : null;
  }
  if (USERNAME_RE.test(raw)) return getUser(usernameKey(raw));
  return null;
}

// Chủ Spa (toàn quyền, cấp quyền cho người khác). Thêm bằng biến môi trường OWNER_EMAILS (cách nhau dấu phẩy).
const OWNER_EMAILS = ['vibecode686868@gmail.com', 'ivyspahanoi@gmail.com'];
const ROLE_RANK = { customer: 0, staff: 1, admin: 2, owner: 3 };

function ownerEmails() {
  const extra = String(process.env.OWNER_EMAILS || '').split(',').map(normEmail).filter(Boolean);
  return [...new Set([...OWNER_EMAILS, ...extra])];
}
async function getRoles() {
  return (await getStore().get('roles')) || {};
}
async function roleOf(email) {
  const e = normEmail(email);
  if (ownerEmails().includes(e)) return 'owner';
  const r = (await getRoles())[e];
  return r === 'admin' || r === 'staff' ? r : 'customer';
}
const atLeast = (role, need) => (ROLE_RANK[role] || 0) >= ROLE_RANK[need];

/** Thông tin an toàn gửi về trình duyệt (không bao giờ có mật khẩu). */
function publicUser(u, role = 'customer') {
  return {
    name: u.name,
    email: u.username ? u.name : u.email,
    username: Boolean(u.username),
    phone: u.phone || '',
    role,
    authProvider: u.hash ? (u.googleSub ? 'password+google' : 'password') : 'google',
  };
}

module.exports = { USERNAME_RE, usernameKey, EMAIL_RE, normEmail, normPhone, getUser, saveUser, findByIdentifier, publicUser, ownerEmails, getRoles, roleOf, atLeast };
