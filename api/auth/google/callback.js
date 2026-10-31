// Google gọi về sau khi khách chọn tài khoản: tạo/ghép tài khoản theo Gmail rồi đăng nhập.
const H = require('../../_lib/http');
const G = require('../../_lib/google');
const U = require('../../_lib/users');
const A = require('../../_lib/aff');

module.exports = async (req, res) => {
  const clear = H.cookie(req, G.OAUTH_COOKIE, '', { maxAge: 0, path: '/api/auth/google' });
  const q = new URL(req.url, 'http://x').searchParams;
  const st = H.unseal(H.getCookie(req, G.OAUTH_COOKIE));
  const dest = st && ['/admin', '/affiliate'].includes(st.next) ? st.next : '/';
  const back = (r, extra = []) => H.redirect(res, dest + '?google=' + r, [clear, ...extra]);
  if (q.get('error')) return back('huy');
  if (!st || st.state !== q.get('state') || !q.get('code')) return back('loi');
  try {
    const cfg = await G.getGoogleConfig();
    if (!cfg) return back('chua-cai');
    const g = await G.exchangeCode(cfg, q.get('code'), st.verifier, st.nonce, H.origin(req) + G.CALLBACK);

    let user = await U.getUser(g.email);
    let joined = false; // tài khoản mới xác nhận lần đầu → ghi nhận thành viên F1 nếu đến qua link giới thiệu
    if (!user) {
      const ref = await A.refFromCookie(req, g.email);
      user = { email: g.email, name: g.name, phone: '', hash: null, verified: true, createdAt: Date.now(), ...(ref ? { ref } : {}) };
      joined = true;
    } else if (!user.verified) {
      joined = true;
      // Đăng ký mật khẩu chưa xác nhận có thể do người khác gõ nhầm/giả mạo Gmail này → bỏ mật khẩu đó.
      user.hash = null;
      user.verified = true;
    } else if (user.googleSub && user.googleSub !== g.sub) {
      return back('sai-tai-khoan');
    }
    user.googleSub = g.sub;
    user.verifiedAt = user.verifiedAt || Date.now();
    user.lastLoginAt = Date.now();
    if (!user.name) user.name = g.name;
    await U.saveUser(user);
    if (joined && user.ref) await A.addMember(user.ref, user.email);
    if (joined) await require('../../_lib/notify').notify(require('../../_lib/notify').accountText(user, 'Google'));

    const days = st.remember ? 30 : 1;
    const session = H.seal({ e: user.email, exp: Date.now() + days * 86400 * 1000 });
    return back('ok', [H.cookie(req, H.SESSION_COOKIE, session, st.remember ? { maxAge: days * 86400 } : {})]);
  } catch (e) {
    console.error('[google] callback', e);
    return back('loi');
  }
};
