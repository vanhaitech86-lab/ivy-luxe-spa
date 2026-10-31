// GET /api/products — sản phẩm/dịch vụ Admin đăng từ Dashboard (chỉ những mục đang hiện)
// + bản sửa Bảng giá gốc (giá, tên, ảnh, ẩn) để trang chủ áp lên js/menu-data.js.
const H = require('./_lib/http');
const C = require('./_lib/crm');

module.exports = async (req, res) => {
  if (req.method !== 'GET') return H.send(res, 405, { error: 'Sai phương thức.' });
  try {
    const [all, raw] = await Promise.all([C.listProducts(), C.listMenuOverrides()]);
    const products = all.filter((p) => !p.hidden).map(({ createdBy, updatedBy, ...p }) => p);
    const overrides = {};
    Object.entries(raw).forEach(([id, { updatedAt, updatedBy, ...o }]) => { overrides[id] = o; });
    res.setHeader('CDN-Cache-Control', 'public, s-maxage=30, stale-while-revalidate=300');
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.end(JSON.stringify({ products, overrides }));
  } catch (e) {
    console.error('[products]', e);
    return H.send(res, 200, { products: [], overrides: {} });
  }
};
