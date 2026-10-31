// Chạy thử website trên máy: node server-local.js  →  mở http://localhost:3000
// Phục vụ file tĩnh + các hàm /api giống Vercel. Không có Redis thì dữ liệu lưu tạm trong thư mục .data
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const root = __dirname;
const port = Number(process.env.PORT || 3000);
try { process.loadEnvFile(path.join(root, '.env.local')); } catch {}
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.jpg': 'image/jpeg', '.png': 'image/png', '.webp': 'image/webp', '.svg': 'image/svg+xml', '.json': 'application/json', '.ico': 'image/x-icon', '.xml': 'application/xml; charset=utf-8', '.txt': 'text/plain; charset=utf-8' };

function apiFile(p) {
  const base = path.join(root, p.slice(1));
  if (!base.startsWith(path.join(root, 'api') + path.sep) || p.includes('/_lib')) return null;
  return [base + '.js', path.join(base, 'index.js')].find((f) => fs.existsSync(f)) || null;
}

http.createServer(async (req, res) => {
  const p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  if (p.startsWith('/api/')) {
    const f = apiFile(p);
    if (!f) { res.statusCode = 404; return res.end('not found'); }
    try { return await require(f)(req, res); } catch (e) { console.error(e); res.statusCode = 500; return res.end('error'); }
  }
  let f = path.normalize(path.join(root, p === '/' ? 'index.html' : p));
  const blocked = path.relative(root, f).split(path.sep).some((x) => x.startsWith('.') || x === 'api' || x === 'node_modules');
  if (blocked || !f.startsWith(root + path.sep)) { res.statusCode = 403; return res.end(); }
  if (fs.existsSync(f) && fs.statSync(f).isDirectory()) f = path.join(f, 'index.html');
  if (!fs.existsSync(f) && fs.existsSync(f + '.html')) f += '.html';
  fs.readFile(f, (err, buf) => {
    if (err) { res.statusCode = 404; return res.end('not found'); }
    res.setHeader('Content-Type', types[path.extname(f)] || 'application/octet-stream');
    res.end(buf);
  });
}).listen(port, () => console.log('IVYLUXE SPA & NAIL: http://localhost:' + port));
