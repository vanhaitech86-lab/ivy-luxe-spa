// Kho dữ liệu tài khoản khách.
// - Vercel: Upstash Redis (KV_REST_API_URL + KV_REST_API_TOKEN), khoá có tiền tố "ivyw:"
// - Máy tính (chưa có Redis): mỗi khoá là 1 file trong .data/
const fs = require('node:fs');
const path = require('node:path');

const P = 'ivyw:';

function redis(url, token) {
  const cmd = async (...args) => {
    const res = await fetch(url, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify(args),
    });
    if (!res.ok) throw new Error(`Redis lỗi ${res.status}`);
    return (await res.json()).result;
  };
  return {
    async get(key, prefix = P) {
      const raw = await cmd('GET', prefix + key);
      return raw ? JSON.parse(raw) : null;
    },
    async set(key, value, ttlSec) {
      if (ttlSec) await cmd('SET', P + key, JSON.stringify(value), 'EX', ttlSec);
      else await cmd('SET', P + key, JSON.stringify(value));
    },
    async del(key) {
      await cmd('DEL', P + key);
    },
    async mget(keys) {
      if (!keys.length) return [];
      const out = [];
      for (let i = 0; i < keys.length; i += 200) {
        const raws = await cmd('MGET', ...keys.slice(i, i + 200).map((k) => P + k));
        for (const raw of raws) out.push(raw ? JSON.parse(raw) : null);
      }
      return out;
    },
    async incr(key, ttlSec) {
      const n = Number(await cmd('INCR', P + key));
      if (ttlSec && n === 1) await cmd('EXPIRE', P + key, ttlSec);
      return n;
    },
    async hit(key, windowSec) {
      const k = `${P}rl:${key}`;
      const n = Number(await cmd('INCR', k));
      if (n === 1) await cmd('EXPIRE', k, windowSec);
      return n;
    },
    /** Mọi giá trị có khoá bắt đầu bằng prefix (VD: 'user:'). */
    async scanValues(prefix, limit = 5000) {
      const keys = [];
      let cursor = '0';
      do {
        const [next, found] = await cmd('SCAN', cursor, 'MATCH', P + prefix + '*', 'COUNT', 1000);
        cursor = String(next);
        keys.push(...found.map((k) => k.slice(P.length)));
      } while (cursor !== '0' && keys.length < limit);
      return (await this.mget(keys.slice(0, limit))).filter(Boolean);
    },
  };
}

function files() {
  const dir = process.env.DATA_DIR || path.join(process.cwd(), '.data');
  const file = (k) => path.join(dir, k.replace(/[^a-zA-Z0-9_@.-]/g, '_') + '.json');
  const read = (k) => {
    try {
      const v = JSON.parse(fs.readFileSync(file(k), 'utf8'));
      if (v && v.exp && v.exp < Date.now()) return null;
      return v ? v.value : null;
    } catch {
      return null;
    }
  };
  const write = (k, value, ttlSec) => {
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(file(k), JSON.stringify({ value, exp: ttlSec ? Date.now() + ttlSec * 1000 : 0 }));
  };
  return {
    async get(key, prefix = P) {
      return read(prefix + key);
    },
    async set(key, value, ttlSec) {
      write(P + key, value, ttlSec);
    },
    async del(key) {
      fs.rmSync(file(P + key), { force: true });
    },
    async mget(keys) {
      return keys.map((k) => read(P + k));
    },
    async incr(key, ttlSec) {
      const n = (read(P + key) || 0) + 1;
      write(P + key, n, n === 1 ? ttlSec : undefined);
      return n;
    },
    async hit(key, windowSec) {
      const k = `${P}rl:${key}`;
      const n = (read(k) || 0) + 1;
      write(k, n, n === 1 ? windowSec : undefined);
      return n;
    },
    async scanValues(prefix) {
      const start = path.basename(file(P + prefix)).replace(/\.json$/, '');
      let names = [];
      try { names = fs.readdirSync(dir); } catch { return []; }
      return names.filter((n) => n.startsWith(start) && n.endsWith('.json')).map((n) => {
        try {
          const v = JSON.parse(fs.readFileSync(path.join(dir, n), 'utf8'));
          return v && (!v.exp || v.exp >= Date.now()) ? v.value : null;
        } catch {
          return null;
        }
      }).filter(Boolean);
    },
  };
}

let store;
function getStore() {
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  if (url && token) return (store ??= redis(url, token));
  if (process.env.VERCEL_ENV === 'production') throw new Error('Chưa nối kho dữ liệu (KV_REST_API_URL).');
  return (store ??= files());
}

module.exports = { getStore };
