// Tiện ích chung cho các hàm /api: đọc body, trả JSON, cookie phiên đăng nhập ký HMAC.
const { createHash, createHmac, randomBytes, scryptSync, timingSafeEqual } = require('node:crypto');

const SITE = 'https://ivyluxe.com.vn';
const SITE_HOSTS = ['ivyluxe.com.vn', 'www.ivyluxe.com.vn', 'ivyluxe-web.vercel.app'];
const SESSION_COOKIE = 'ivyw_s';

async function readBody(req, maxBytes = 20000) {
  if (req.body && typeof req.body === 'object') return req.body;
  if (typeof req.body === 'string') return safeJson(req.body);
  const chunks = [];
  let size = 0;
  for await (const c of req) {
    size += c.length;
    if (size > maxBytes) break;
    chunks.push(c);
  }
  return safeJson(Buffer.concat(chunks).toString('utf8'));
}
function safeJson(s) {
  try {
    const v = JSON.parse(s || '{}');
    return v && typeof v === 'object' ? v : {};
  } catch {
    return {};
  }
}

function send(res, status, data, cookies = []) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  if (cookies.length) res.setHeader('Set-Cookie', cookies);
  res.end(JSON.stringify(data));
}
function redirect(res, location, cookies = []) {
  res.statusCode = 302;
  res.setHeader('Location', location);
  res.setHeader('Cache-Control', 'no-store');
  if (cookies.length) res.setHeader('Set-Cookie', cookies);
  res.end();
}

/** Địa chỉ gốc của web: dùng đúng tên miền khách đang mở nếu là tên miền chính thức (hoặc localhost khi chạy thử). */
function origin(req) {
  const host = String(req.headers['x-forwarded-host'] || req.headers.host || '').split(',')[0].trim();
  const name = host.split(':')[0];
  if (SITE_HOSTS.includes(name)) return `https://${name === 'www.ivyluxe.com.vn' ? 'ivyluxe.com.vn' : name}`;
  if (process.env.VERCEL_ENV !== 'production' && (name === 'localhost' || name === '127.0.0.1')) return `http://${host}`;
  return SITE;
}
const isHttps = (req) => origin(req).startsWith('https://');

function clientIp(req) {
  return String(req.headers['x-forwarded-for'] || req.socket?.remoteAddress || '').split(',')[0].trim() || 'unknown';
}

function getCookie(req, name) {
  const raw = req.headers.cookie || '';
  for (const part of raw.split(';')) {
    const i = part.indexOf('=');
    if (i > 0 && part.slice(0, i).trim() === name) return decodeURIComponent(part.slice(i + 1).trim());
  }
  return '';
}
function cookie(req, name, value, { maxAge, path = '/', httpOnly = true } = {}) {
  let c = `${name}=${encodeURIComponent(value)}; Path=${path}; SameSite=Lax`;
  if (httpOnly) c += '; HttpOnly';
  if (isHttps(req)) c += '; Secure';
  if (maxAge !== undefined) c += `; Max-Age=${maxAge}`;
  return c;
}

// Khoá ký phiên: SESSION_SECRET nếu có, nếu không thì suy ra từ token Redis (không bao giờ gửi ra trình duyệt).
function secret() {
  const s = process.env.SESSION_SECRET || process.env.KV_REST_API_TOKEN || (process.env.VERCEL_ENV === 'production' ? '' : 'ivy-local-dev');
  if (!s) throw new Error('Thiếu khoá ký phiên.');
  return createHash('sha256').update('ivyw-session|' + s).digest();
}
function seal(obj) {
  const body = Buffer.from(JSON.stringify(obj)).toString('base64url');
  return body + '.' + createHmac('sha256', secret()).update(body).digest('base64url');
}
function unseal(token) {
  if (!token || !token.includes('.')) return null;
  const [body, sig] = token.split('.');
  const want = createHmac('sha256', secret()).update(body).digest('base64url');
  if (sig.length !== want.length || !timingSafeEqual(Buffer.from(sig), Buffer.from(want))) return null;
  try {
    const v = JSON.parse(Buffer.from(body, 'base64url').toString());
    return v && v.exp > Date.now() ? v : null;
  } catch {
    return null;
  }
}

function hashPassword(pw) {
  const salt = randomBytes(16).toString('hex');
  return `${salt}:${scryptSync(pw, salt, 32).toString('hex')}`;
}
function checkPassword(pw, stored) {
  if (!stored || !stored.includes(':')) return false;
  const [salt, h] = stored.split(':');
  const got = scryptSync(pw, salt, 32);
  const want = Buffer.from(h, 'hex');
  return got.length === want.length && timingSafeEqual(got, want);
}

const randomToken = () => randomBytes(32).toString('base64url');
const sha = (s) => createHash('sha256').update(s).digest('hex');

module.exports = {
  SITE, SESSION_COOKIE,
  readBody, send, redirect, origin, clientIp, getCookie, cookie,
  seal, unseal, hashPassword, checkPassword, randomToken, sha,
};
