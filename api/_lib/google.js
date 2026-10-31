// Đăng nhập Google (OpenID Connect + PKCE).
// Client ID/Secret: biến môi trường GOOGLE_CLIENT_ID/GOOGLE_CLIENT_SECRET, hoặc dùng chung cấu hình
// "Đăng nhập Google" Chủ Spa đã dán trong CRM cũ (khoá ivy:google-oauth cùng kho Redis).
const { createHash } = require('node:crypto');
const { getStore } = require('./store');

const CALLBACK = '/api/auth/google/callback';
const OAUTH_COOKIE = 'ivyw_oauth';

async function getGoogleConfig() {
  if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
    return { clientId: process.env.GOOGLE_CLIENT_ID, clientSecret: process.env.GOOGLE_CLIENT_SECRET };
  }
  const c = await getStore().get('google-oauth', 'ivy:');
  return c && c.clientId && c.clientSecret ? c : null;
}

const challenge = (verifier) => createHash('sha256').update(verifier).digest('base64url');

/** Đổi mã lấy id_token trực tiếp từ Google (qua HTTPS), kiểm tra aud, iss, hạn, nonce và Gmail đã xác minh. */
async function exchangeCode(cfg, code, verifier, nonce, redirectUri) {
  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ code, client_id: cfg.clientId, client_secret: cfg.clientSecret, redirect_uri: redirectUri, grant_type: 'authorization_code', code_verifier: verifier }),
  });
  if (!res.ok) throw new Error('token ' + res.status + ' ' + (await res.text()).slice(0, 200));
  const { id_token } = await res.json();
  if (!id_token) throw new Error('no id_token');
  const p = JSON.parse(Buffer.from(id_token.split('.')[1] || '', 'base64url').toString());
  if (p.aud !== cfg.clientId) throw new Error('aud');
  if (p.iss !== 'https://accounts.google.com' && p.iss !== 'accounts.google.com') throw new Error('iss');
  if (typeof p.exp !== 'number' || p.exp * 1000 < Date.now()) throw new Error('exp');
  if (p.nonce !== nonce) throw new Error('nonce');
  if (p.email_verified !== true || typeof p.email !== 'string' || typeof p.sub !== 'string') throw new Error('email');
  const name = typeof p.name === 'string' && p.name ? p.name : p.email.split('@')[0];
  return { sub: p.sub, email: p.email.toLowerCase(), name: name.slice(0, 60) };
}

module.exports = { CALLBACK, OAUTH_COOKIE, getGoogleConfig, challenge, exchangeCode };
