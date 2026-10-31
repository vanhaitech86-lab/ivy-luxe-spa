// GET /api/promos — Ưu đãi / Promotion Admin đăng từ Dashboard (đang hiện, chưa hết hạn).
const C = require('./_lib/crm');

module.exports = async (req, res) => {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  if (req.method !== 'GET') {
    res.statusCode = 405;
    return res.end(JSON.stringify({ error: 'Sai phương thức.' }));
  }
  try {
    const today = new Date(Date.now() + 7 * 3600000).toISOString().slice(0, 10); // giờ Việt Nam
    const promos = (await C.listPromos())
      .filter((p) => !p.hidden && (!p.validUntil || p.validUntil >= today))
      .map(({ createdBy, updatedBy, ...p }) => p);
    res.setHeader('CDN-Cache-Control', 'public, s-maxage=30, stale-while-revalidate=300');
    res.statusCode = 200;
    res.end(JSON.stringify({ promos }));
  } catch (e) {
    console.error('[promos]', e);
    res.statusCode = 200;
    res.end(JSON.stringify({ promos: [] }));
  }
};
