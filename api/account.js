// /api/account?a=register|resend|verify|login|me|logout|forgot|reset
// Đăng ký bằng Gmail + mật khẩu → thư xác nhận → đăng nhập. Đăng nhập Google ở /api/auth/google.
const { getStore } = require('./_lib/store');
const H = require('./_lib/http');
const U = require('./_lib/users');
const M = require('./_lib/mail');
const A = require('./_lib/aff');

const DAY = 86400;
const REMEMBER_DAYS = 30;

function sessionCookies(req, user, remember) {
  const exp = Date.now() + (remember ? REMEMBER_DAYS * DAY * 1000 : DAY * 1000);
  const value = H.seal({ e: user.email, exp });
  return [H.cookie(req, H.SESSION_COOKIE, value, remember ? { maxAge: REMEMBER_DAYS * DAY } : {})];
}

async function currentUser(req) {
  const s = H.unseal(H.getCookie(req, H.SESSION_COOKIE));
  if (!s) return null;
  const u = await U.getUser(s.e);
  return u && u.verified ? u : null;
}

async function tooMany(key, limit, windowSec) {
  return (await getStore().hit(key, windowSec)) > limit;
}

const NEXT_PAGES = ['/', '/affiliate'];
const safeNext = (n) => (NEXT_PAGES.includes(n) ? n : '/');

async function sendVerify(req, user, next = '/') {
  const token = H.randomToken();
  await getStore().set('verify:' + H.sha(token), { e: user.email, next: safeNext(next) }, DAY);
  const link = `${H.origin(req)}/api/account?a=verify&token=${token}`;
  await M.sendMail({ to: user.email, ...M.verifyMail(user.name, link) });
}

/** Tạo tài khoản (chưa xác nhận) + gửi thư xác nhận. Trả { status, body } để trang Affiliate dùng chung. */
async function registerAccount(req, b) {
    const send = (status, body) => ({ status, body });
    if (b.website) return send(200, { ok: true, email: U.normEmail(b.email) });
    const name = String(b.name || '').trim().replace(/\s+/g, ' ').slice(0, 60);
    const email = U.normEmail(b.email);
    const phone = U.normPhone(b.phone);
    const password = String(b.password || '');
    if (name.length < 2) return send(400, { error: 'Vui lòng nhập Họ và Tên.' });
    if (!U.EMAIL_RE.test(email) || email.length > 120) return send(400, { error: 'Địa chỉ Gmail không đúng định dạng.' });
    if (phone && !/^0\d{9,10}$/.test(phone)) return send(400, { error: 'Số điện thoại không đúng (VD: 0912345678).' });
    if (password.length < 6 || password.length > 100) return send(400, { error: 'Mật khẩu cần tối thiểu 6 ký tự.' });
    if (password !== String(b.confirm || '')) return send(400, { error: 'Mật khẩu nhập lại không khớp.' });
    if (await tooMany('reg-ip:' + H.clientIp(req), 10, 3600)) return send(429, { error: 'Bạn thao tác quá nhiều lần, vui lòng thử lại sau ít phút.' });

    const existing = await U.getUser(email);
    if (existing && existing.verified) {
      return send(409, { error: 'exists', google: !existing.hash, message: 'Gmail này đã có tài khoản. Vui lòng đăng nhập.' });
    }
    if (phone) {
      const owner = await getStore().get('phone:' + phone);
      if (owner && owner !== email) return send(409, { error: 'Số điện thoại này đã dùng cho một tài khoản khác.' });
    }
    if (await tooMany('mail:' + email, 5, 3600)) return send(429, { error: 'Đã gửi nhiều thư xác nhận tới Gmail này. Vui lòng kiểm tra hộp thư (cả mục Spam) hoặc thử lại sau 1 giờ.' });

    // Đăng ký qua link giới thiệu (cookie ivy_ref) → thành viên F1 của đối tác đó (ghi nhận khi xác nhận Gmail)
    const ref = existing?.ref || await A.refFromCookie(req, email);
    const user = { email, name, phone, hash: H.hashPassword(password), verified: false, createdAt: existing?.createdAt || Date.now(), ...(ref ? { ref } : {}) };
    await U.saveUser(user);
    await sendVerify(req, user, b.next);
    return send(200, { ok: true, email });
}

const handlers = {
  async register(req, res, b) {
    const r = await registerAccount(req, b);
    return H.send(res, r.status, r.body);
  },

  async resend(req, res, b) {
    const email = U.normEmail(b.email);
    const user = await U.getUser(email);
    // Không tiết lộ Gmail có tồn tại hay không.
    if (!user || user.verified) return H.send(res, 200, { ok: true, verified: Boolean(user && user.verified) });
    if (await tooMany('mail:' + email, 5, 3600)) return H.send(res, 429, { error: 'Đã gửi nhiều thư tới Gmail này. Vui lòng kiểm tra cả mục Spam hoặc thử lại sau 1 giờ.' });
    await sendVerify(req, user, b.next);
    return H.send(res, 200, { ok: true });
  },

  async verify(req, res) {
    const url = new URL(req.url, 'http://x');
    const token = url.searchParams.get('token') || '';
    const key = 'verify:' + H.sha(token);
    const rec = token ? await getStore().get(key) : null;
    const email = rec && typeof rec === 'object' ? rec.e : rec;
    const next = rec && typeof rec === 'object' ? safeNext(rec.next) : '/';
    const user = email ? await U.getUser(email) : null;
    if (!user) return H.redirect(res, next + '?xac-nhan=het-han');
    if (!user.verified) {
      user.verified = true;
      user.verifiedAt = Date.now();
      await U.saveUser(user);
      if (user.ref) await A.addMember(user.ref, user.email);
      await require('./_lib/notify').notify(require('./_lib/notify').accountText(user, 'Gmail + mật khẩu (đã xác nhận Gmail)'));
    }
    await getStore().del(key);
    return H.redirect(res, next + '?xac-nhan=ok');
  },

  async login(req, res, b) {
    const id = String(b.identifier || '').trim();
    const password = String(b.password || '');
    if (!id || !password) return H.send(res, 400, { error: 'Vui lòng nhập Gmail/Số điện thoại và Mật khẩu.' });
    const idKey = 'login:' + (id.includes('@') ? U.normEmail(id) : /^[+\d\s.\-()]+$/.test(id) ? U.normPhone(id) : id.toLowerCase());
    const lockKey = 'lock:' + idKey;
    if (await getStore().get(lockKey)) {
      return H.send(res, 423, { error: 'Tài khoản tạm khóa do nhập sai mật khẩu quá 5 lần. Vui lòng thử lại sau 30 phút hoặc dùng "Quên Mật Khẩu".' });
    }
    if (await tooMany(idKey, 8, 900) || await tooMany('login-ip:' + H.clientIp(req), 30, 900)) {
      return H.send(res, 429, { error: 'Bạn nhập sai quá nhiều lần. Vui lòng thử lại sau 15 phút hoặc dùng "Quên Mật Khẩu".' });
    }
    const user = await U.findByIdentifier(id);
    if (!user || !H.checkPassword(password, user.hash)) {
      if (user) {
        const fails = await getStore().hit('fail:' + idKey, 1800);
        if (fails >= 5) {
          await getStore().set(lockKey, { at: Date.now() }, 1800);
          try {
            await M.sendMail({ to: user.email, ...M.loginLockedMail(user.name) });
          } catch (e) { console.error('[account] loginLockedMail', e); }
          return H.send(res, 423, { error: 'Tài khoản tạm khóa do nhập sai mật khẩu quá 5 lần. Vui lòng thử lại sau 30 phút hoặc dùng "Quên Mật Khẩu".' });
        }
      }
      if (user && !user.hash && user.googleSub) return H.send(res, 401, { error: 'Tài khoản này đăng ký bằng Google. Vui lòng bấm "Đăng nhập nhanh bằng Google" hoặc dùng "Quên Mật Khẩu" để đặt mật khẩu.' });
      return H.send(res, 401, { error: 'Sai tài khoản (Gmail / Số điện thoại / Tên đăng nhập) hoặc mật khẩu. Vui lòng kiểm tra lại.' });
    }
    if (!user.verified) return H.send(res, 403, { error: 'unverified', email: user.email, message: 'Tài khoản chưa xác nhận Gmail. Vui lòng mở thư xác nhận trong Gmail của bạn.' });
    await getStore().del('fail:' + idKey);
    await getStore().del(lockKey);
    user.lastLoginAt = Date.now();
    await U.saveUser(user);
    return H.send(res, 200, { ok: true, user: U.publicUser(user, await U.roleOf(user.email)) }, sessionCookies(req, user, b.remember !== false));
  },

  async me(req, res) {
    const user = await currentUser(req);
    return H.send(res, 200, { user: user ? U.publicUser(user, await U.roleOf(user.email)) : null });
  },

  async logout(req, res) {
    return H.send(res, 200, { ok: true }, [H.cookie(req, H.SESSION_COOKIE, '', { maxAge: 0 })]);
  },

  async forgot(req, res, b) {
    const user = await U.findByIdentifier(b.identifier);
    if (await tooMany('forgot-ip:' + H.clientIp(req), 10, 3600)) return H.send(res, 429, { error: 'Bạn thao tác quá nhiều lần, vui lòng thử lại sau.' });
    // Luôn trả lời giống nhau để không lộ tài khoản nào tồn tại.
    if (user && user.verified && !user.username && !(await tooMany('mail:' + user.email, 5, 3600))) {
      const otp = String(Math.floor(100000 + Math.random() * 900000));
      await getStore().set('reset:' + user.email, { otp: H.sha(otp), tries: 0 }, 900);
      await M.sendMail({ to: user.email, ...M.resetMail(user.name, otp) });
    }
    return H.send(res, 200, { ok: true });
  },

  async reset(req, res, b) {
    const user = await U.findByIdentifier(b.identifier);
    const otp = String(b.otp || '').trim();
    const password = String(b.password || '');
    if (password.length < 6 || password.length > 100) return H.send(res, 400, { error: 'Mật khẩu mới cần tối thiểu 6 ký tự.' });
    if (password !== String(b.confirm || '')) return H.send(res, 400, { error: 'Mật khẩu mới và Xác nhận mật khẩu không khớp.' });
    const rec = user ? await getStore().get('reset:' + user.email) : null;
    if (!rec || rec.tries >= 5) return H.send(res, 400, { error: 'Mã OTP đã hết hạn. Vui lòng bấm "Gửi lại mã mới".' });
    if (H.sha(otp) !== rec.otp) {
      rec.tries += 1;
      await getStore().set('reset:' + user.email, rec, 900);
      return H.send(res, 400, { error: 'Mã OTP không đúng. Vui lòng kiểm tra lại thư trong Gmail.' });
    }
    user.hash = H.hashPassword(password);
    await U.saveUser(user);
    await getStore().del('reset:' + user.email);
    return H.send(res, 200, { ok: true, email: user.email });
  },
};

module.exports = async (req, res) => {
  const a = new URL(req.url, 'http://x').searchParams.get('a') || '';
  const fn = Object.prototype.hasOwnProperty.call(handlers, a) ? handlers[a] : null;
  if (!fn) return H.send(res, 404, { error: 'Không tìm thấy.' });
  const isGet = a === 'verify' || a === 'me';
  if (isGet ? req.method !== 'GET' : req.method !== 'POST') return H.send(res, 405, { error: 'Sai phương thức.' });
  // Chỉ nhận JSON (form giả mạo từ trang khác không gửi được kiểu này nếu không qua CORS).
  if (!isGet && !String(req.headers['content-type'] || '').includes('application/json')) return H.send(res, 415, { error: 'Sai định dạng.' });
  try {
    const body = isGet ? {} : await H.readBody(req);
    return await fn(req, res, body);
  } catch (e) {
    console.error('[account]', a, e);
    return H.send(res, 500, { error: 'Hệ thống đang bận, vui lòng thử lại sau ít phút hoặc gọi Hotline/Zalo 098 971 3660.' });
  }
};

module.exports.currentUser = currentUser;
module.exports.registerAccount = registerAccount;
module.exports.sessionCookies = sessionCookies;
