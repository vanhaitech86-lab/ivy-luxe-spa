// GET /api/img?id=… — ảnh sản phẩm Admin tải lên Dashboard.
const { getStore } = require('./_lib/store');

module.exports = async (req, res) => {
  const id = new URL(req.url, 'http://x').searchParams.get('id') || '';
  if (!/^I\w{6,40}$/.test(id)) {
    res.statusCode = 404;
    return res.end();
  }
  try {
    const img = await getStore().get('img:' + id);
    if (!img) {
      res.statusCode = 404;
      return res.end();
    }
    res.statusCode = 200;
    res.setHeader('Content-Type', img.type);
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.end(Buffer.from(img.b64, 'base64'));
  } catch (e) {
    console.error('[img]', e);
    res.statusCode = 500;
    res.end();
  }
};
