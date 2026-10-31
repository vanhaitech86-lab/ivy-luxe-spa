// Bấm "Đăng nhập / Đăng ký nhanh bằng Google" → chuyển sang trang chọn tài khoản Google.
const H = require('../../_lib/http');
const G = require('../../_lib/google');

module.exports = async (req, res) => {
  try {
    const cfg = await G.getGoogleConfig();
    if (!cfg) return H.redirect(res, '/?google=chua-cai');
    const state = H.randomToken();
    const nonce = H.randomToken();
    const verifier = H.randomToken();
    const q = new URL(req.url, 'http://x').searchParams;
    const remember = q.get('remember') !== '0';
    const next = ['/admin', '/affiliate'].includes(q.get('next')) ? q.get('next') : '/';
    const sealed = H.seal({ state, nonce, verifier, remember, next, exp: Date.now() + 10 * 60 * 1000 });
    const params = new URLSearchParams({
      client_id: cfg.clientId,
      redirect_uri: H.origin(req) + G.CALLBACK,
      response_type: 'code',
      scope: 'openid email profile',
      state,
      nonce,
      code_challenge: G.challenge(verifier),
      code_challenge_method: 'S256',
      prompt: 'select_account',
    });
    return H.redirect(res, 'https://accounts.google.com/o/oauth2/v2/auth?' + params, [
      H.cookie(req, G.OAUTH_COOKIE, sealed, { maxAge: 600, path: '/api/auth/google' }),
    ]);
  } catch (e) {
    console.error('[google] start', e);
    return H.redirect(res, '/?google=loi');
  }
};
