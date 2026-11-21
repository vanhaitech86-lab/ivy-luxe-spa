# IVYLUXE SPA & NAIL — website

Website, Dashboard quản trị (CRM) và chương trình Affiliate của IVYLUXE SPA & NAIL (https://ivyluxe.com.vn).

- Giao diện: HTML/CSS/JS tĩnh (`index.html`, `affiliate.html`, `admin.html`, `privacy.html`).
- Máy chủ: hàm serverless Vercel trong `api/` (đăng ký/đăng nhập, Google OAuth, CRM leads, Affiliate, ưu đãi, sản phẩm).
- Dữ liệu: Upstash Redis (tiền tố khoá `ivyw:`).

## Biến môi trường (đặt trong Vercel, KHÔNG ghi vào mã)

`KV_REST_API_URL`, `KV_REST_API_TOKEN`, `SESSION_SECRET`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`,
`GMAIL_USER`, `GMAIL_APP_PASSWORD`, `OWNER_EMAILS` (tuỳ chọn), `TELEGRAM_BOT_TOKEN` (tuỳ chọn).

## Triển khai

```bash
npx vercel deploy --prod --yes
```

## Phân quyền

Chủ Spa (owner) cấp quyền Quản trị viên theo Gmail ở Dashboard → Phân quyền.
