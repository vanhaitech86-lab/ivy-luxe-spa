# IVY LUXE SPA — Tổng hợp thông tin website (18/11/2026)

## 1. Link website

| Trang | Link | Ghi chú |
|---|---|---|
| Website chính | https://ivyluxe.com.vn | Gửi cho khách, luôn dùng `https` |
| Dashboard quản trị | https://ivyluxe.com.vn/admin | Chỉ chủ spa và nhân viên được cấp quyền |
| Trang đối tác Affiliate | https://ivyluxe.com.vn/affiliate | Khách sạn, đối tác giới thiệu khách |
| Chính sách bảo mật | https://ivyluxe.com.vn/privacy | |

- Địa chỉ: 48 Hà Trung, Hoàn Kiếm, Hà Nội
- Hotline/Zalo: 098 971 3660
- Mã nguồn: thư mục `ma-nguon-website/` trong file zip này. Repo GitHub riêng tư: `vibecode686868/ivyluxe-web`
- Hosting: Vercel, project `ivyluxe-web`. Lệnh deploy lại: `npx --yes vercel@64.2.0 deploy --prod --yes`

## 2. Đo lường quảng cáo đã cài

### Google Tag Manager — `GTM-KDFDQ47D` (17/11)
- Đã gắn vào `index.html` và `privacy.html`, không gắn vào trang quản trị.
- Container này đang là thẻ Google (Google tag) của tài khoản Google Ads `AW-18562979820`. Container đang bật:
  - tự ghi nhận lượt gửi form;
  - tự thu thập email/địa chỉ trong form để dùng cho chuyển đổi nâng cao (Google mã hoá trước khi gửi).

### Google Ads — chuyển đổi "Book appointment" (18/11)
- Thẻ gốc `gtag.js` AW-18562979820 nằm trong `index.html`, ngay sau khối GTM.
- Hàm `gtag_report_conversion(url, value, transactionId)`:
  - nhãn chuyển đổi: `AW-18562979820/tXRiCK7dprodEOyvwpNF`;
  - tiền tệ: VND.
- File `js/app.js` gọi hàm này khi máy chủ đã lưu đơn đặt lịch thành công. Mỗi lần gọi gửi kèm:
  - **giá trị** = số tiền khách phải trả;
  - **transaction_id** = mã đơn, để Google không đếm trùng khi khách tải lại trang.
- Khách bấm nút rồi bỏ ngang, hoặc đơn bị máy chủ từ chối, thì **không** được tính.

### Việc cần làm trong Google Ads
1. Vào Mục tiêu → Chuyển đổi → **Book appointment**. Sau lượt đặt lịch thật đầu tiên, trạng thái phải đổi sang "Đang ghi nhận".
2. Ở phần cài đặt giá trị của chuyển đổi này, chọn **"Sử dụng các giá trị khác nhau cho mỗi chuyển đổi"**.
3. **Không** tạo thêm thẻ chuyển đổi "Book appointment" trong GTM, nếu không sẽ đếm 2 lần.
4. Khi có khoảng 30–50 chuyển đổi/tháng, có thể chuyển sang giá thầu "Tối đa hoá giá trị chuyển đổi".

## 3. Bảo mật — đã sửa ngày 17/11/2026
- Đã gỡ khỏi `js/app.js` (file công khai) danh sách tài khoản có **mật khẩu ghi thẳng**: hai tài khoản admin, một tài khoản partner và một tài khoản khách mẫu.
- Đã gỡ form "Đăng nhập với Google" giả. Form này cho phép gõ Gmail admin là trình duyệt tự coi mình là quản trị viên. Nút Google giờ luôn đi qua trang đăng nhập thật của Google.
- Trình duyệt của khách tự xoá dữ liệu tài khoản kèm mật khẩu do bản cũ đã lưu.
- Dashboard vẫn bắt đăng nhập ở máy chủ. Người chưa đăng nhập gọi API quản trị sẽ bị từ chối (mã 401).
- Mọi khoá bí mật (Gmail, Google, Telegram, AI, cơ sở dữ liệu) chỉ nằm trong **biến môi trường Vercel**, không có trong mã nguồn.

### Anh cần làm ngay
1. **Đổi mật khẩu admin cũ** ở mọi nơi đang dùng: Dashboard, Gmail ivyspahanoi@gmail.com, tài khoản kỹ thuật vanhaitech.86@gmail.com. Mật khẩu cũ đã từng nằm công khai trong mã web, nên phải coi như đã lộ.
2. Bật **xác minh 2 bước** cho các Gmail trên và cho tài khoản Google Tag Manager, Google Ads.
3. Chỉ cấp quyền GTM cho người tin cậy. Ai có quyền GTM đều chạy được mã trên trang có form đăng nhập và đặt lịch.
4. Sửa **mục 5 trang Chính sách bảo mật**: hiện ghi "chỉ dùng cookie cần thiết", không còn đúng vì đã có GTM và Google Ads (Nghị định 13/2023). Nên thêm câu về cookie đo lường/quảng cáo, hoặc thêm bảng hỏi đồng ý cookie.

### Rủi ro còn lại
- Lịch hẹn khách tự đặt (tên, số điện thoại) vẫn lưu trong trình duyệt của chính khách để hiện mục "Lịch hẹn của bạn". Rủi ro thấp, chỉ đáng lo khi khách dùng máy chung.
- Lần quét Codex Security ngày 17/11 dừng vì chạm trần chi phí 5 USD. Không có lỗi nào được xác nhận; hai nghi vấn đều thuộc về GTM, đã nêu ở mục 3 và 4 phía trên.

## 4. Nội dung file zip
- `TONG-HOP-IVYSPA-1811.md`: file này.
- `ma-nguon-website/`: toàn bộ mã nguồn website, bản đang chạy ngày 18/11/2026.

Những thứ **cố ý không đưa vào** zip:
- `node_modules`, `.vercel`;
- file `.env` (khoá bí mật);
- `js/admin.js` và `css/admin.css`: admin cũ có ghi mật khẩu;
- `HUONG_DAN_SU_DUNG.txt`: có số điện thoại và tài khoản ngân hàng cũ;
- ảnh `*_backup`.

Sau ngày 17/11, các thay đổi về GTM, gỡ mật khẩu và Google Ads **chưa đẩy lên repo GitHub**. Mã trong zip này là bản mới nhất.
