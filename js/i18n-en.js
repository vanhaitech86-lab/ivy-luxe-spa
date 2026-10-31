// Dịch tự động toàn trang sang Tiếng Anh cho những chữ không gắn data-i18n.
// - IVY_VI_EN: từ điển "chữ Tiếng Việt (gộp khoảng trắng)" → "chữ Tiếng Anh".
// - ivyAutoTranslate(lang): lang khác 'vi' → thay chữ & thuộc tính (placeholder, title, alt, aria-label) theo từ điển;
//   lang 'vi' → trả lại chữ gốc. Nội dung JS vẽ thêm về sau được dịch qua MutationObserver.
(function () {
  'use strict';

  const DICT = {
    // ---------- Thanh trên cùng, tài khoản ----------
    'Quý khách được giới thiệu bởi Đối Tác': 'You were referred by our Partner',
    '— Tặng thêm': '— Bonus',
    '10% ƯU ĐÃI': '10% OFF',
    'MIỄN PHÍ NGÂM CHÂN THẢO DƯỢC': 'FREE HERBAL FOOT SOAK',
    'Đặc quyền miễn phí: Tắm tráng • Gửi hành lý an toàn • Đặt hộ xe sân bay giá rẻ': 'Free perks: Shower • Safe luggage storage • Low-cost airport car booking',
    'Chọn ngôn ngữ / Language': 'Language',
    'Tiếng Việt': 'Tiếng Việt',
    'Language / Ngôn ngữ': 'Language',
    'Khách': 'Guest',
    'Khách Hàng VIP': 'VIP Member',
    'Khách Hàng': 'Guest',
    'Trang Quản Trị Admin': 'Admin Dashboard',
    'Quản Lý Affiliate': 'Affiliate Dashboard',
    'Lịch Sử Đặt Hẹn': 'Booking History',
    'Đăng Xuất': 'Sign Out',
    'Đặt Lịch': 'Book Now',
    'Tài Khoản Thành Viên': 'Member Account',
    'Tài Khoản': 'Account',
    'Đóng banner': 'Close banner',
    'Chọn ngôn ngữ / Select Language': 'Select Language',
    'Select Language / Chọn Ngôn Ngữ': 'Select Language',
    'Ngôn ngữ / Language:': 'Language:',
    'Đóng Menu': 'Close Menu',

    // ---------- Banner đặt lịch ----------
    'ĐẶT LỊCH TRỰC TUYẾN • GIẢM 10%': 'BOOK ONLINE • 10% OFF',
    'Giảm 10% tất cả dịch vụ khi thanh toán trước qua mã QR': '10% off all services when you prepay by QR code',
    '· Giảm 10% tất cả dịch vụ khi thanh toán trước qua mã QR': '· 10% off all services when you prepay by QR code',
    'Đặt chỗ nhanh tại Số 48 Phố Hà Trung': 'Quick booking at 48 Ha Trung Street',
    'ĐẶT LỊCH · TRẢ TRƯỚC QR GIẢM 10%': 'BOOK NOW · 10% OFF WITH QR PREPAY',
    'Đặt Chỗ Nhanh Tại Số 48 Phố Hà Trung': 'Quick Booking at 48 Ha Trung Street',
    'Giữ phòng VIP • Chọn giờ & chuyên viên thư giãn': 'Reserve a VIP room • Choose your time & therapist',
    'ĐẶT NGAY': 'BOOK NOW',
    'Địa chỉ: SỐ 48 PHỐ HÀ TRUNG, PHƯỜNG HOÀN KIẾM, THÀNH PHỐ HÀ NỘI': 'Address: 48 HA TRUNG STREET, HOAN KIEM WARD, HANOI',
    'Tự nhập': 'Custom',
    'ĐẶT LỊCH TRẢI NGHIỆM (GIẢM 20%)': 'BOOK YOUR EXPERIENCE (20% OFF)',
    'Được tắm miễn phí': 'Free shower',
    'trước & sau liệu trình': 'before & after your treatment',
    'Được gửi hành lý miễn phí': 'Free luggage storage',
    '(không nhận đồ giá trị)': '(no valuables)',
    'Được đặt hộ xe ô tô sân bay giá rẻ': 'Low-cost airport car booking',
    '(Nội Bài)': '(Noi Bai)',
    'ĐẶT LỊCH TRỰC TUYẾN': 'ONLINE BOOKING',
    'Đặt Lịch Trực Tuyến 48 Hà Trung': 'Online Booking · 48 Ha Trung',
    'Đặt lịch hẹn trực tuyến': 'Book an appointment online',
    'Nhấn để chọn ngày đến': 'Tap to choose a date',
    'Nhấn để chọn giờ hẹn': 'Tap to choose a time',
    'Chuyển chế độ: Danh sách khung giờ hoặc Nhập giờ tùy ý': 'Switch: time slots or custom time',
    'Chuyển chế độ số khách': 'Switch guest input mode',
    'Chuyển chế độ giờ': 'Switch time mode',
    'Ví dụ: Nguyễn Thị Hoa': 'e.g. Emma Smith',

    // ---------- Ưu đãi ----------
    'ƯU ĐÃI & KHUYẾN MÃI MỚI': 'NEW OFFERS & PROMOTIONS',
    'Chương trình đang áp dụng tại IVYLUXE SPA & NAIL – Số 48 phố Hà Trung, Hoàn Kiếm, Hà Nội': 'Current offers at IVYLUXE SPA & NAIL – 48 Ha Trung Street, Hoan Kiem, Hanoi',
    'VNĐ (₫)': 'VND (₫)',
    'Ảnh Thực Tế Spa': 'Real Spa Photos',
    'Phòng VIP Dưỡng Sinh': 'VIP Wellness Room',

    // ---------- Affiliate trên trang chủ ----------
    'HỢP TÁC KINH DOANH · HOA HỒNG 10% (1 TẦNG)': 'PARTNER PROGRAM · 10% COMMISSION (SINGLE TIER)',
    'ĐỐI TÁC TIẾP THỊ & DASHBOARD AFFILIATE': 'AFFILIATE PARTNERS & DASHBOARD',
    'Dành riêng cho Khách sạn, Tour Guide, Lễ tân, Tài xế du lịch, Reviewer và Quý khách hàng. Đăng ký nhận link & mã QR riêng chỉ trong 30 giây để kiếm thu nhập thụ động bền vững!': 'For hotels, tour guides, receptionists, drivers, reviewers and loyal guests. Get your own link & QR code in 30 seconds and earn passive income!',
    'Mở Trang Quản Lý Riêng (affiliate.html)': 'Open Partner Page',
    'Xem Dashboard Quản Lý': 'View Dashboard',
    'Hoa hồng 10% · 1 tầng': '10% commission · single tier',
    'Nhận 10% hoa hồng trên doanh thu của mỗi khách bạn giới thiệu trực tiếp (F1) qua link riêng — chỉ 1 tầng, minh bạch.': 'Earn 10% of the revenue from every guest you refer directly through your link — single tier, fully transparent.',
    'Theo dõi clicks': 'Track clicks',
    'Theo dõi số lượt click, đơn hàng và hoa hồng chi tiết trên dashboard.': 'See clicks, bookings and commission in detail on your dashboard.',
    'Thu nhập thụ động': 'Passive income',
    'Chỉ cần chia sẻ link, hệ thống tự động theo dõi và tính hoa hồng cho bạn.': 'Just share your link — we track and calculate your commission automatically.',
    'Đăng ký Affiliate': 'Join as Partner',
    'Đăng nhập': 'Sign In',
    'Tiếp tục với Google': 'Continue with Google',
    'hoặc dùng Gmail': 'or use Gmail',
    'Họ và tên': 'Full name',
    'Số điện thoại': 'Phone number',
    'Mã giới thiệu': 'Referral code',
    '(link của bạn: .../?ref=mã_này)': '(your link: .../?ref=this_code)',
    '(bắt buộc @gmail.com)': '(@gmail.com required)',
    'Mật khẩu': 'Password',
    'Gmail (hoặc Số điện thoại)': 'Gmail (or phone number)',
    'Đăng nhập Dashboard Affiliate': 'Sign In to Partner Dashboard',
    'Dashboard của tôi': 'My Dashboard',
    'Hoa hồng 10% · 1 tầng |': '10% commission · single tier |',
    'Chưa đăng nhập': 'Not signed in',
    'Mở Toàn Màn Hình': 'Open Full Screen',
    'Sao chép Link': 'Copy Link',
    '📊 Tổng quan': '📊 Overview',
    '🧰 Công cụ bán': '🧰 Sales Tools',
    '👥 Mạng lưới': '👥 Network',
    '🤝 Đối tác': '🤝 Partner',
    '💰 Thanh toán': '💰 Payout',
    'TỔNG CLICKS': 'TOTAL CLICKS',
    'tháng này: 0': 'this month: 0',
    'ĐƠN THÀNH CÔNG': 'COMPLETED',
    'đang chờ: 0': 'pending: 0',
    'CHỜ XÁC NHẬN (15 NGÀY)': 'PENDING (15 DAYS)',
    'đang trong thời gian bảo đảm': 'in the guarantee period',
    'ĐÃ NHẬN': 'RECEIVED',
    'chưa có giao dịch': 'no transactions yet',
    'Hiệu quả hoạt động': 'Performance',
    '7 ngày': '7 days',
    '30 ngày': '30 days',
    '60 ngày': '60 days',
    '90 ngày': '90 days',
    'clicks 7 ngày qua': 'clicks in the last 7 days',
    'Hôm nay': 'Today',
    '2 ngày trước': '2 days ago',
    '4 ngày trước': '4 days ago',
    '6 ngày trước': '6 days ago',
    '7 ngày trước': '7 days ago',
    'vd: tencuaban (để trống sẽ tự tạo)': 'e.g. yourname (leave blank to auto-create)',
    'you@gmail.com hoặc 0814488686': 'you@gmail.com or phone number',
    'Nguyễn Văn A': 'John Smith',
    'Đối Tác Affiliate (10%)': 'Affiliate Partners (10%)',

    // ---------- Form Nhận tư vấn ----------
    'Nhận tư vấn & ưu đãi riêng': 'Get advice & a private offer',
    'Tư vấn liệu trình phù hợp trong 15 phút / Reply within 15 minutes': 'We reply within 15 minutes',
    'Giữ chỗ phòng VIP, nhóm & cặp đôi / VIP, group & couple rooms': 'VIP, group & couple rooms available',
    'Họ và tên / Full name *': 'Full name *',
    'Số điện thoại / Phone *': 'Phone *',
    'Đến từ quốc gia / Country': 'Country',
    '🇻🇳 Việt Nam': '🇻🇳 Vietnam',
    '🇰🇷 Hàn Quốc / Korea': '🇰🇷 Korea',
    '🇨🇳 Trung Quốc / China': '🇨🇳 China',
    '🇯🇵 Nhật Bản / Japan': '🇯🇵 Japan',
    '🇺🇸 Mỹ / USA': '🇺🇸 USA',
    '🇦🇺 Úc / Australia': '🇦🇺 Australia',
    '🇫🇷 Pháp / France': '🇫🇷 France',
    '🇩🇪 Đức / Germany': '🇩🇪 Germany',
    '🇹🇼 Đài Loan / Taiwan': '🇹🇼 Taiwan',
    '🇹🇭 Thái Lan / Thailand': '🇹🇭 Thailand',
    '🇮🇳 Ấn Độ / India': '🇮🇳 India',
    'Nơi sống / Where you stay': 'Where you stay',
    'Nhu cầu khi đến IVYLUXE SPA & NAIL / What would you like?': 'What would you like?',
    'Massage body toàn thân': 'Full body massage',
    'Foot massage (chân)': 'Foot massage',
    'Gội đầu dưỡng sinh': 'Herbal head spa',
    'Chăm sóc da mặt': 'Facial care',
    'Làm Nails': 'Nails',
    'Nối mi & chân mày': 'Lashes & brows',
    'Đi nhóm / cặp đôi': 'Group / couple',
    'GỬI THÔNG TIN / SEND': 'SEND',
    'Đăng Ký Tư Vấn / Consultation': 'Consultation',
    'Chính Sách Bảo Mật / Privacy': 'Privacy Policy',
    'Nguyễn Thị Lan': 'Your name',
    'Việt Nam': 'Vietnam',
    'Hoàn Kiếm, Hà Nội / Khách sạn…': 'Hoan Kiem, Hanoi / Hotel…',
    'Mong muốn khác, ngày giờ dự kiến, số người… / Other wishes, date, people…': 'Other wishes, date, number of guests…',

    // ---------- Bảng giá dạng bảng (menu board) ----------
    'DANH MỤC DỊCH VỤ & BẢNG GIÁ': 'SERVICES & PRICE LIST',
    'ƯU ĐÃI ĐẶT TRỰC TUYẾN': 'ONLINE BOOKING OFFER',
    'GIẢM 10% TẤT CẢ DỊCH VỤ KHI TRẢ TRƯỚC QUA QR': '10% OFF ALL SERVICES WITH QR PREPAYMENT',
    '(trả trước QR -10%)': '(QR prepay -10%)',
    '+ TẶNG NGÂM CHÂN THẢO DƯỢC': '+ FREE HERBAL FOOT SOAK',
    'Tất Cả': 'All',
    'Gói Hoàng Gia 👑': 'Royal Packages 👑',
    'Gội Đầu Dưỡng Sinh 🌿': 'Herbal Head Spa 🌿',
    'HOT NHẤT': 'HOTTEST',
    'IVY SPECIAL - COMBO 1 (HOT) - 90 PHÚT': 'IVY SPECIAL - COMBO 1 (HOT) - 90 MIN',
    'IVY SPECIAL - COMBO 2 - 70/75 PHÚT': 'IVY SPECIAL - COMBO 2 - 70/75 MIN',
    'IVY SPECIAL - COMBO 3 - 120 PHÚT': 'IVY SPECIAL - COMBO 3 - 120 MIN',
    'IVY SPECIAL - COMBO 4 - 150 PHÚT': 'IVY SPECIAL - COMBO 4 - 150 MIN',
    '30 phút': '30 min',
    '45 phút': '45 min',
    '60 phút': '60 min',
    '90 phút': '90 min',
    '120 phút': '120 min',
    '150 phút': '150 min',
    '180 phút': '180 min',
    '240 phút': '240 min',
    '70/75 phút': '70/75 min',
    '75 - 120 phút': '75 - 120 min',
    '30 - 75 phút': '30 - 75 min',
    'Tặng ngâm chân thảo dược': 'Free herbal foot soak',
    'Massage body chuyên sâu + Đá nóng + Tẩy tế bào chết lưng + Ngâm chân thảo dược miễn phí.': 'Deep body massage + Hot stones + Back scrub + Free herbal foot soak.',
    'ƯU ĐÃI': 'OFFER',
    'Combo Tiết Kiệm': 'Value Combo',
    'Massage lưng cổ vai gáy + Massage chân thư giãn + Đá nóng giảm nhức mỏi.': 'Back, neck & shoulder massage + Relaxing foot massage + Hot stones for aches.',
    'Trị liệu chuyên sâu': 'Deep therapy',
    "Massage toàn thân 90' + Chăm sóc da mặt thảo mộc 30' + Tặng ngâm chân thảo dược.": "Full body massage 90' + Herbal facial 30' + Free herbal foot soak.",
    'TOÀN DIỆN': 'COMPLETE',
    'Gói trọn gói VIP': 'All-inclusive VIP',
    'Massage body + Tẩy tế bào chết + Gội đầu dưỡng sinh & Vệ sinh tai + Chăm sóc da mặt.': 'Body massage + Body scrub + Herbal head spa & ear cleaning + Facial care.',
    'HOÀNG GIA': 'ROYAL',
    'Gói Trị Liệu Hoàng Gia 2 Giờ': 'Royal Therapy Package · 2 Hours',
    'Phục hồi toàn diện': 'Full recovery',
    "Massage toàn thân chuyên sâu (75') + Chăm sóc phục hồi da mặt (45'). Thư giãn sâu cơ bắp và làn da.": "Deep full body massage (75') + Restorative facial (45'). Deep relaxation for muscles and skin.",
    'HOÀNG GIA 3H': 'ROYAL 3H',
    'Gói Trị Liệu Hoàng Gia 3 Giờ': 'Royal Therapy Package · 3 Hours',
    'Thư giãn đỉnh cao': 'Ultimate relaxation',
    "Massage toàn thân (90') + Chăm sóc da mặt & Gội đầu dưỡng sinh (90') + Tặng kèm vệ sinh tai miễn phí.": "Full body massage (90') + Facial & herbal head spa (90') + Free ear cleaning.",
    'ĐẾ VƯƠNG 4H': 'EMPEROR 4H',
    'Gói Đế Vương VIP Toàn Diện 4 Giờ': 'Emperor VIP Package · 4 Hours',
    'Bao gồm trà bánh VIP': 'VIP tea & snacks included',
    "Massage body (90') + Tẩy tế bào chết (60') + Da mặt & Dưỡng tóc (90') + Vệ sinh tai + Trà thảo mộc & đồ ăn nhẹ.": "Body massage (90') + Body scrub (60') + Facial & hair care (90') + Ear cleaning + Herbal tea & snacks.",
    'BÁN CHẠY': 'BEST SELLER',
    'Nourishing Shampoo (Gội Đầu Dưỡng Sinh)': 'Nourishing Shampoo',
    'Thảo dược bồ kết': 'Soapberry herbs',
    'Gội nước thảo dược cô đặc, xông đầu tuần hoàn ấm, massage đả thông kinh lạc vùng đầu - cổ - vai gáy.': 'Concentrated herbal wash, warm water-flow steam, and a meridian massage for head, neck & shoulders.',
    'THƯ GIÃN': 'RELAX',
    'Relaxing Hair Shampoo (Gội Đầu Thư Giãn)': 'Relaxing Hair Shampoo',
    'Dầu gội hữu cơ': 'Organic shampoo',
    'Làm sạch da đầu với dầu gội hữu cơ cao cấp, kết hợp massage day ấn thái dương và gáy nhẹ nhàng.': 'Scalp cleanse with premium organic shampoo and a gentle temple & neck massage.',
    'MENU MỚI': 'NEW',
    'Ear Cleaning (Lấy Ráy Tai Chuyên Nghiệp)': 'Professional Ear Cleaning',
    'Dụng cụ tiệt trùng': 'Sterilized tools',
    'Kỹ thuật lấy ráy tai êm ái nhẹ nhàng với bộ dụng cụ tiệt trùng y tế, mang lại cảm giác thư thái thông thoáng.': 'Gentle ear cleaning with medically sterilized tools for a light, refreshed feeling.',
    'ĐÁ NÓNG': 'HOT STONE',
    'Hot Stone Therapy (Massage Đá Nóng)': 'Hot Stone Therapy',
    'Đá núi lửa bazan': 'Volcanic basalt stones',
    'Nhiệt lượng từ đá bazan giữ nhiệt kết hợp tinh dầu oải hương giúp đả thông kinh lạc, giảm đau mỏi vai gáy tức thì.': 'Heat-retaining basalt stones with lavender oil open the meridians and ease neck & shoulder tension instantly.',
    'THẢO DƯỢC': 'HERBAL',
    'Aroma Herbal Massage (Tinh Dầu Thảo Dược)': 'Aroma Herbal Massage',
    'Hương thơm tự nhiên': 'Natural aromas',
    'Các động tác miết vuốt nhẹ nhàng với tinh dầu thiên nhiên cao cấp giúp thư giãn hệ thần kinh và làm mềm da.': 'Gentle long strokes with premium natural oils to calm the nerves and soften the skin.',
    'THÁI CỔ TRUYỀN': 'TRADITIONAL THAI',
    'Traditional Thai Massage (Massage Thái Cổ Truyền)': 'Traditional Thai Massage',
    'Kéo giãn khớp': 'Joint stretching',
    'Bấm huyệt dọc các đường kinh lạc kết hợp động tác kéo giãn kiểu yoga, mở khóa các khớp bị tắc nghẽn.': 'Acupressure along the meridians with yoga-style stretches to release stiff joints.',
    'BẤM HUYỆT CHÂN': 'FOOT REFLEXOLOGY',
    'Foot Massage (Massage Chân Việt & Thái)': 'Foot Massage (Vietnamese & Thai)',
    'Ngâm chân thảo dược': 'Herbal foot soak',
    'Kỹ thuật massage chân bấm huyệt Việt Nam & Thái Lan, ngâm chân thảo mộc, tẩy tế bào chết gót chân mịn màng.': 'Vietnamese & Thai foot reflexology, herbal foot soak and a heel scrub for smooth feet.',
    'Gel Manicure & Spa (Chăm Sóc Móng Gel)': 'Gel Manicure & Spa',
    'Sơn Gel cao cấp': 'Premium gel polish',
    'Tẩy tế bào chết da tay/chân, cắt da tạo hình móng chuyên nghiệp, sơn gel bền đẹp bóng lâu với đèn LED UV.': 'Hand/foot scrub, professional cuticle care & shaping, and long-lasting glossy gel cured with LED UV.',
    'Menu Chi Tiết': 'Full Menu',
    'Foot Massage (Massage Chân Việt Nam & Thái Lan)': 'Foot Massage (Vietnamese & Thai)',

    // ---------- Hộp đặt lịch & thanh toán ----------
    'IVY LUXE SPA - Địa chỉ: SỐ 48 PHỐ HÀ TRUNG, PHƯỜNG HOÀN KIẾM, THÀNH PHỐ HÀ NỘI': 'IVY LUXE SPA - 48 Ha Trung Street, Hoan Kiem Ward, Hanoi',
    'Phương Thức Thanh Toán': 'Payment Method',
    'GIẢM NGAY 10% KHI THANH TOÁN LUÔN': '10% OFF WHEN YOU PAY NOW',
    'Mã QR Ngân Hàng (Giảm 10%)': 'Bank QR Code (10% off)',
    '🔥 Ưu tiên giữ phòng VIP': '🔥 Priority VIP room',
    'Thanh toán chuyển khoản quét mã VietQR tự động, chiết khấu trực tiếp 10% trên tổng giá trị.': 'Pay by bank transfer with VietQR and get 10% off the total.',
    'Thanh Toán Tại Quầy Spa': 'Pay at the Spa',
    'Giá niêm yết': 'Listed price',
    'Thanh toán bằng tiền mặt hoặc quẹt thẻ khi quý khách đến trải nghiệm tại Số 48 phố Hà Trung, phường Hoàn Kiếm, TP. Hà Nội.': 'Pay by cash or card when you visit us at 48 Ha Trung Street, Hoan Kiem Ward, Hanoi.',
    'Giá gốc niêm yết:': 'Listed price:',
    'Ưu đãi thanh toán luôn (10%):': 'Pay-now discount (10%):',
    'Số tiền cần thanh toán:': 'Amount to pay:',
    'Quét mã thanh toán': 'Scan to pay',
    'Ngân Hàng:': 'Bank:',
    'Số Tài Khoản:': 'Account No.:',
    'Chủ Tài Khoản:': 'Account Holder:',
    'Số Tiền (Giảm 10%):': 'Amount (10% off):',
    'Copy Tiền': 'Copy Amount',
    'Nội Dung CK:': 'Transfer Note:',
    'Sau khi quét mã QR chuyển khoản, bấm nút': 'After paying by QR, tap',
    'XÁC NHẬN ĐẶT LỊCH NGAY': 'CONFIRM BOOKING NOW',
    'bên dưới để hoàn tất giữ phòng VIP và hưởng trọn ưu đãi giảm giá 10%!': 'below to secure your VIP room and enjoy the full 10% discount!',
    'Thanh toán tại quầy khi đến:': 'Pay at the spa on arrival:',
    'Tổng tiền dịch vụ là': 'Service total is',
    '(Giá niêm yết không áp dụng giảm 10% thanh toán trước).': '(Listed price — the 10% pay-now discount does not apply).',
    'Chuyên viên Spa sẽ liên hệ với quý khách để xác nhận phòng và giờ đến.': 'Our spa team will contact you to confirm your room and arrival time.',
    'Mã đối tác giới thiệu:': 'Partner referral code:',
    '(Đã kích hoạt ưu đãi VIP 10% & Tặng ngâm chân thảo dược)': '(VIP 10% off & free herbal foot soak activated)',
    'Mã QR VietQR Sacombank HKD IVY LUXE SPA': 'VietQR Sacombank QR code - IVY LUXE SPA',

    // ---------- Ảnh bảng giá ----------
    'BẢNG GIÁ BODY MASSAGE & WELLNESS (BẢN MỚI 48 HÀ TRUNG)': 'BODY MASSAGE & WELLNESS PRICE LIST (NEW · 48 HA TRUNG)',
    'BẢNG GIÁ SPECIAL COMBOS & NAILS': 'SPECIAL COMBOS & NAILS PRICE LIST',
    'Bấm vào ảnh để mở xem toàn màn hình (High Resolution)': 'Tap an image to view it full screen (high resolution)',
    'ĐẶT LỊCH DỊCH VỤ TRÊN BẢNG GIÁ NÀY (GIẢM NGAY 10%)': 'BOOK FROM THIS PRICE LIST (10% OFF)',
    'Bảng giá Authentic Vietnamese Wellness IVY LUXE SPA 48 Hà Trung': 'Authentic Vietnamese Wellness price list - IVY LUXE SPA 48 Ha Trung',
    'Bảng giá niêm yết gốc IVY LUXE SPA 48 Hà Trung': 'Original price list - IVY LUXE SPA 48 Ha Trung',

    // ---------- Nhạc thiền ----------
    'Giai Điệu Trị Liệu @DeepHealingVibes86': 'Healing Music @DeepHealingVibes86',
    '4 Bài': '4 Tracks',
    'Mở Trình Phát Nhạc Thiền': 'Open Meditation Music Player',
    'Danh sách bài hát': 'Playlist',
    'Thu nhỏ trình phát': 'Minimize player',
    'Mở kênh YouTube': 'Open YouTube channel',
    'Bài trước': 'Previous track',
    'Phát / Dừng': 'Play / Pause',
    'Bài tiếp theo': 'Next track',
    'Tắt / Bật tiếng': 'Mute / Unmute',

    // ---------- Hộp tài khoản ----------
    'TÀI KHOẢN IVY LUXE SPA': 'IVY LUXE SPA ACCOUNT',
    'Đăng Nhập': 'Sign In',
    'Đăng Ký Mới': 'Sign Up',
    'Quên Mật Khẩu': 'Forgot Password',
    'Đăng nhập nhanh bằng Google': 'Sign in with Google',
    'HOẶC ĐĂNG NHẬP BẰNG TÀI KHOẢN': 'OR SIGN IN WITH YOUR ACCOUNT',
    'Gmail hoặc Số Điện Thoại': 'Gmail or Phone Number',
    'Mật Khẩu': 'Password',
    'Ghi nhớ': 'Remember me',
    'Quên mật khẩu?': 'Forgot password?',
    'Hệ thống phân quyền tự động theo vai trò (Khách Hàng / Đối Tác / Quản Trị Viên).': 'Access is assigned automatically by role (Guest / Partner / Admin).',
    'ĐĂNG NHẬP NGAY': 'SIGN IN',
    'Đăng ký nhanh bằng Google': 'Sign up with Google',
    'HOẶC ĐIỀN THÔNG TIN ĐĂNG KÝ': 'OR FILL IN YOUR DETAILS',
    'Họ và Tên': 'Full Name',
    'Số Điện Thoại': 'Phone Number',
    '(không bắt buộc)': '(optional)',
    'Nhập Lại Mật Khẩu': 'Confirm Password',
    'Tài khoản thành viên VIP: Tích điểm ưu đãi và quản lý lịch hẹn trực tuyến tại Số 48 phố Hà Trung, phường Hoàn Kiếm, TP. Hà Nội.': 'VIP membership: earn rewards and manage your bookings online at 48 Ha Trung Street, Hoan Kiem, Hanoi.',
    'TẠO TÀI KHOẢN NGAY': 'CREATE ACCOUNT',
    'XÁC NHẬN ĐĂNG KÝ QUA GMAIL': 'CONFIRM YOUR SIGN-UP BY GMAIL',
    'IVY LUXE SPA vừa gửi thư xác nhận tới': 'IVY LUXE SPA has sent a confirmation email to',
    'Mở Gmail và tìm thư': 'Open Gmail and find the email',
    '"Xác nhận đăng ký tài khoản IVY LUXE SPA"': '"Xác nhận đăng ký tài khoản IVY LUXE SPA" (account confirmation)',
    '(nếu không thấy, xem mục': '(if you cannot find it, check',
    'Spam / Quảng cáo': 'Spam / Promotions',
    'Bấm nút': 'Tap',
    'XÁC NHẬN ĐĂNG KÝ': 'CONFIRM SIGN-UP',
    'trong thư.': 'in the email.',
    'Quay lại đây và đăng nhập bằng Gmail + mật khẩu vừa tạo.': 'Come back here and sign in with your Gmail and new password.',
    'MỞ GMAIL NGAY': 'OPEN GMAIL',
    'Gửi lại thư': 'Resend email',
    'Đã xác nhận, đăng nhập': 'Confirmed, sign in',
    'Sửa Gmail': 'Change Gmail',
    'Nhập': 'Enter',
    'hoặc': 'or',
    'đã đăng ký. Mã OTP sẽ được gửi tới': 'you registered with. An OTP code will be sent to the',
    'của tài khoản.': 'of your account.',
    'GỬI MÃ XÁC THỰC (OTP)': 'SEND OTP CODE',
    'Nhập Mã Xác Thực OTP (6 Số)': 'Enter the 6-digit OTP code',
    'Mật Khẩu Mới': 'New Password',
    'Xác Nhận Mật Khẩu Mới': 'Confirm New Password',
    'XÁC NHẬN ĐẶT LẠI MẬT KHẨU': 'RESET PASSWORD',
    'Quay lại Đăng Nhập': 'Back to Sign In',
    'Đăng nhập với Google': 'Sign in with Google',
    'Đăng nhập bằng tài khoản Google': 'Sign in with your Google account',
    'Để tiếp tục đồng bộ và đặt lịch tại Ivy Luxe Spa (Số 48 phố Hà Trung, phường Hoàn Kiếm, thành phố Hà Nội)': 'to continue booking at Ivy Luxe Spa (48 Ha Trung Street, Hoan Kiem, Hanoi)',
    'Email hoặc Số điện thoại Gmail': 'Email or phone number',
    'Họ và Tên (Tùy chọn)': 'Full Name (optional)',
    'TIẾP TỤC ĐĂNG NHẬP': 'CONTINUE',
    'Để tiếp tục, Google sẽ xác thực bảo mật và chia sẻ thông tin tài khoản với Ivy Luxe Spa.': 'To continue, Google will securely verify you and share your account details with Ivy Luxe Spa.',
    'LỊCH HẸN VÀ GIAO DỊCH CỦA BẠN': 'YOUR BOOKINGS & TRANSACTIONS',
    'Nhập Gmail hoặc Số điện thoại': 'Enter Gmail or phone number',
    'VD: Nguyễn Thị Lan': 'e.g. Emma Smith',
    'Tối thiểu 6 ký tự': 'At least 6 characters',
    'Nhập lại mật khẩu ở trên': 'Re-enter the password above',
    'Nhập Email hoặc Số điện thoại đã đăng ký': 'Enter your registered email or phone',
    'Nhập lại mật khẩu mới': 'Re-enter the new password',
    'Nhập tài khoản Gmail của bạn': 'Enter your Gmail account',
    'Họ và tên của bạn': 'Your full name',

    // ---------- Điện thoại: menu, nút nổi ----------
    'Danh Mục Sản Phẩm & Dịch Vụ': 'Products & Services',
    'Mở danh mục dịch vụ': 'Open services menu',
    'Gọi Hotline 098 9713660': 'Call Hotline 098 9713660',
    'Thêm kênh liên hệ': 'More contact options',
    'Gọi 098 9713660': 'Call 098 9713660',

    // ---------- Hộp thông báo & báo lỗi (alert, máy chủ) ----------
    'Bạn đã đăng xuất tài khoản thành công.': 'You have signed out successfully.',
    'Vui lòng nhập Email hoặc Số điện thoại đăng nhập.': 'Please enter your email or phone number.',
    'Vui lòng nhập Mật khẩu.': 'Please enter your password.',
    'Vui lòng nhập Họ và Tên của bạn.': 'Please enter your full name.',
    'Vui lòng nhập đúng địa chỉ Gmail (VD: lan@gmail.com).': 'Please enter a valid Gmail address (e.g. emma@gmail.com).',
    'Mật khẩu cần tối thiểu 6 ký tự.': 'Password must be at least 6 characters.',
    'Mật khẩu nhập lại không khớp. Vui lòng nhập lại.': 'Passwords do not match. Please try again.',
    'Vui lòng nhập địa chỉ Email hoặc Gmail hợp lệ.': 'Please enter a valid email address.',
    'Vui lòng nhập Gmail hoặc Số điện thoại đã đăng ký!': 'Please enter your registered Gmail or phone number!',
    'Vui lòng bấm "GỬI MÃ XÁC THỰC (OTP)" trước!': 'Please tap "SEND OTP CODE" first!',
    'Vui lòng nhập đủ mã OTP 6 số trong thư Gmail.': 'Please enter the 6-digit OTP code from your email.',
    'Mật khẩu mới phải có tối thiểu 6 ký tự!': 'New password must be at least 6 characters!',
    'Mật khẩu mới và Xác nhận mật khẩu không trùng khớp!': 'New password and confirmation do not match!',
    'Đã sao chép tin nhắn mời khách kèm link giới thiệu! Đang mở Zalo...': 'Invitation message with your referral link copied! Opening Zalo...',
    'Vui lòng nhập Số Điện Thoại hoặc Mã Đối Tác của bạn để tra cứu!': 'Please enter your phone number or partner code to look up!',
    'Vui lòng đăng ký / đăng nhập Đối tác để lấy link giới thiệu riêng.': 'Please sign up / sign in as a partner to get your referral link.',
    'Chưa gửi lại được thư, vui lòng thử lại.': 'Could not resend the email, please try again.',
    'Hệ thống đang bận, vui lòng thử lại.': 'The system is busy, please try again.',
    'Số điện thoại không hợp lệ.': 'Invalid phone number.',
    'Bạn gửi quá nhiều lần, vui lòng thử lại sau ít phút.': 'Too many attempts, please try again in a few minutes.',
    'Bạn nhập sai quá nhiều lần. Vui lòng thử lại sau 15 phút hoặc dùng "Quên Mật Khẩu".': 'Too many failed attempts. Please try again in 15 minutes or use "Forgot Password".',
    'Bạn thao tác quá nhiều lần, vui lòng thử lại sau ít phút.': 'Too many attempts, please try again in a few minutes.',
    'Bạn thao tác quá nhiều lần, vui lòng thử lại sau.': 'Too many attempts, please try again later.',
    'Hệ thống đang bận, vui lòng gọi Hotline/Zalo 098 971 3660.': 'The system is busy, please call Hotline/Zalo 098 971 3660.',
    'Hệ thống đang bận, vui lòng thử lại sau ít phút hoặc gọi Hotline/Zalo 098 971 3660.': 'The system is busy, please try again shortly or call Hotline/Zalo 098 971 3660.',
    'Mã OTP không đúng. Vui lòng kiểm tra lại thư trong Gmail.': 'Incorrect OTP code. Please check the email in your inbox.',
    'Mã OTP đã hết hạn. Vui lòng bấm "Gửi lại mã mới".': 'The OTP code has expired. Please request a new code.',
    'Mật khẩu mới cần tối thiểu 6 ký tự.': 'New password must be at least 6 characters.',
    'Mật khẩu mới và Xác nhận mật khẩu không khớp.': 'New password and confirmation do not match.',
    'Mật khẩu nhập lại không khớp.': 'Passwords do not match.',
    'Sai tài khoản (Gmail / Số điện thoại / Tên đăng nhập) hoặc mật khẩu. Vui lòng kiểm tra lại.': 'Incorrect account (Gmail / phone / username) or password. Please check again.',
    'Số điện thoại chưa đúng (VD: 0912345678 hoặc +84912345678).': 'Please check the phone number (e.g. +84912345678).',
    'Số điện thoại không đúng (VD: 0912345678).': 'Invalid phone number (e.g. 0912345678).',
    'Số điện thoại này đã dùng cho một tài khoản khác.': 'This phone number is already used by another account.',
    'Tài khoản này đăng ký bằng Google. Vui lòng bấm "Đăng nhập nhanh bằng Google" hoặc dùng "Quên Mật Khẩu" để đặt mật khẩu.': 'This account was created with Google. Please use "Sign in with Google" or "Forgot Password" to set a password.',
    'Vui lòng nhập Gmail/Số điện thoại và Mật khẩu.': 'Please enter your Gmail/phone and password.',
    'Vui lòng nhập Họ tên.': 'Please enter your name.',
    'Vui lòng nhập Họ và Tên.': 'Please enter your full name.',
    'Đã gửi nhiều thư tới Gmail này. Vui lòng kiểm tra cả mục Spam hoặc thử lại sau 1 giờ.': 'Several emails were already sent to this address. Please check Spam or try again in 1 hour.',
    'Đã gửi nhiều thư xác nhận tới Gmail này. Vui lòng kiểm tra hộp thư (cả mục Spam) hoặc thử lại sau 1 giờ.': 'Several confirmation emails were already sent. Please check your inbox (and Spam) or try again in 1 hour.',
    'Địa chỉ Gmail không đúng định dạng.': 'Invalid Gmail address.',
    'Gmail này đã có tài khoản. Vui lòng đăng nhập.': 'This Gmail already has an account. Please sign in.',
    'Tài khoản chưa xác nhận Gmail. Vui lòng mở thư xác nhận trong Gmail của bạn.': 'Your Gmail is not confirmed yet. Please open the confirmation email in your inbox.',
    'Liên kết xác nhận đã hết hạn hoặc đã được dùng. Hãy thử đăng nhập; nếu tài khoản chưa xác nhận, bấm "Gửi lại thư xác nhận".': 'The confirmation link has expired or was already used. Try signing in; if your account is not confirmed, tap "Resend confirmation email".',
    'Cảm ơn bạn! IVYLUXE SPA & NAIL sẽ liên hệ trong ít phút. / Thank you! We will contact you shortly.': 'Thank you! IVYLUXE SPA & NAIL will contact you shortly.',
    'Số điện thoại chưa đúng. / Please check your phone number.': 'Please check your phone number.',
    'Vui lòng nhập Họ và tên. / Please enter your name.': 'Please enter your name.',

    // ================= TRANG CHÍNH SÁCH BẢO MẬT (/privacy) — nội dung có bản Anh riêng =================
    'Chính sách bảo mật - IVYLUXE SPA & NAIL': 'Privacy Policy - IVYLUXE SPA & NAIL',

    // ---------- Doanh số Affiliate, hồ sơ hiển thị, bảng vinh danh ----------
    'Doanh Số Từ Affiliate': 'Affiliate Sales',
    'Tổng giá trị dịch vụ khách bạn giới thiệu (F1) đã đặt trên website': 'Total value of services booked on the website by guests you referred (F1)',
    'TỔNG DOANH SỐ GIỚI THIỆU': 'TOTAL REFERRED SALES',
    'ĐÃ THANH TOÁN / XÁC NHẬN': 'PAID / CONFIRMED',
    'Dùng để tính hoa hồng 10%': 'Basis for your 10% commission',
    'DOANH SỐ THÁNG NÀY': 'SALES THIS MONTH',
    'Doanh số đặt': 'Booked sales',
    'Đã xác nhận': 'Confirmed',
    'Đơn gần nhất': 'Latest bookings',
    'Chưa có đơn nào từ khách bạn giới thiệu. Khi khách F1 đặt dịch vụ trên website, doanh số hiện ở đây ngay.': 'No bookings from your referrals yet. When your F1 guests book on the website, the sales show up here right away.',
    'Hồ Sơ Hiển Thị': 'Display Profile',
    'Chọn ảnh': 'Choose photo',
    'TÊN HIỂN THỊ': 'DISPLAY NAME',
    'Lưu hồ sơ': 'Save profile',
    'Ảnh & tên này hiển thị trên Bảng Vinh Danh. Không ai thấy doanh thu hay % hoa hồng của bạn.': 'This photo & name appear on the Leaderboard. Nobody can see your revenue or commission.',
    'Ảnh đại diện': 'Profile photo',
    'VD: Khách sạn Phố Cổ': 'e.g. Old Quarter Hotel',
    'BẢNG VINH DANH · Top 20': 'LEADERBOARD · Top 20',
    'Top đối tác xuất sắc nhất tháng theo đơn & lượt click': 'Top partners of the month by bookings & clicks',
    'đơn': 'bookings',
    'Bạn': 'You',
    '✓ Đã lưu hồ sơ hiển thị!': '✓ Display profile saved!',
    'Tên hiển thị cần ít nhất 2 ký tự.': 'Display name needs at least 2 characters.',
    'Không đọc được ảnh này.': 'Could not read this image.',
    'Đơn đã huỷ': 'Cancelled',
    'Khách đã chuyển khoản – chờ spa xác nhận': 'Transferred – awaiting spa confirmation',
    'Đã đặt lịch – chờ thanh toán QR': 'Booked – awaiting QR payment',
    'Đã đặt lịch – thanh toán tại quầy': 'Booked – pay at the spa',
    'Không tìm thấy đơn đặt dịch vụ.': 'Booking not found.',

    // ================= TRANG ĐỐI TÁC AFFILIATE (/affiliate) =================
    'Đối Tác Tiếp Thị & Quản Lý Affiliate | IVY LUXE SPA': 'Affiliate Partner Program | IVY LUXE SPA',
    'Trang Chủ Spa': 'Spa Home',
    'Đăng Ký Đối Tác Mới': 'Become a Partner',
    'Nhận 10% trên doanh thu dịch vụ của mỗi khách bạn giới thiệu trực tiếp (F1). Chỉ 1 tầng duy nhất, không tính tầng dưới.': 'Earn 10% of the service revenue from every guest you refer directly. Single tier only.',
    'Theo dõi Real-Time': 'Real-Time Tracking',
    'Bảng điều khiển trực quan cập nhật từng lượt click, đơn hẹn và số tiền hoa hồng được bảo đảm minh bạch.': 'A clear dashboard showing every click, booking and commission — fully transparent.',
    'Bảo lưu Cookie 30 Ngày': '30-Day Cookie',
    'Khách chỉ cần click 1 lần, bất kỳ khi nào khách hoàn tất đặt lịch trong vòng 30 ngày bạn vẫn nhận trọn vẹn hoa hồng.': 'Guests only need to click once — if they book within 30 days, you still earn the full commission.',
    'BẢNG DỰ TOÁN THU NHẬP': 'EARNINGS ESTIMATOR',
    'Bạn Có Thể Kiếm Được Bao Nhiêu Cùng IVY LUXE SPA?': 'How Much Can You Earn With IVY LUXE SPA?',
    'Hoa hồng cố định:': 'Fixed commission:',
    '10% · 1 tầng': '10% · single tier',
    'Số lượng khách giới thiệu mỗi tháng:': 'Guests referred per month:',
    '3 khách (Mới bắt đầu)': '3 guests (Starter)',
    '25 khách (Khách sạn/Tour)': '25 guests (Hotel/Tour)',
    '100+ khách (Top Leader)': '100+ guests (Top Leader)',
    'Giá trị đơn hàng trung bình tính theo dịch vụ tiêu chuẩn:': 'Average booking value for a standard service:',
    '900.000đ/khách': '900,000đ/guest',
    '. Khách của bạn được ưu đãi giảm 10% và tặng ngâm chân thảo dược hoàng gia.': '. Your guests get 10% off and a free royal herbal foot soak.',
    'Doanh số tạo ra:': 'Revenue generated:',
    'Hoa hồng đối tác thực nhận (10%):': 'Your commission (10%):',
    'Hoa hồng': 'Commission',
    '10% cố định · chỉ khách F1 trực tiếp': 'fixed 10% · direct referrals only',
    'CƠ SỞ VẬT CHẤT & KHÔNG GIAN THỰC TẾ': 'OUR REAL FACILITIES',
    'Không Gian Đẳng Cấp Tại Số 48 Phố Hà Trung, Hoàn Kiếm': 'A Luxury Space at 48 Ha Trung Street, Hoan Kiem',
    'Giới thiệu khách đến trải nghiệm spa chuẩn 5 sao với sự an tâm tuyệt đối về chất lượng': 'Refer guests to a 5-star spa experience with complete peace of mind',
    'Phòng VIP Gội Dưỡng Sinh Vòm Nước': 'VIP Head Spa Room with Water Canopy',
    'Tổ Hợp Ivy Luxe Spa & Nail': 'Ivy Luxe Spa & Nail',
    'Sảnh Đón & Lễ Tân 48 Hà Trung': 'Reception at 48 Ha Trung',
    'Khách Quốc Tế Trải Nghiệm Thực Tế': 'International Guests',
    'Đăng ký Đối Tác Mới': 'Become a Partner',
    'Đăng nhập Dashboard': 'Dashboard Sign In',
    'Đăng nhập nhanh với Google': 'Sign in with Google',
    'hoặc đăng ký bằng Email': 'or sign up with email',
    'Họ và tên / Đơn vị tiếp thị': 'Full name / Business name',
    'Số điện thoại liên hệ (Zalo)': 'Contact phone (Zalo / WhatsApp)',
    'Loại hình hợp tác': 'Partner type',
    'Khách Sạn / Homestay / Concierge': 'Hotel / Homestay / Concierge',
    'Hướng Dẫn Viên Du Lịch Phố Cổ': 'Old Quarter Tour Guide',
    'Đại Lý Vé / Travel Agency': 'Ticket / Travel Agency',
    'Cá nhân / Đối tác độc lập': 'Individual / Independent partner',
    'Mã giới thiệu riêng': 'Your referral code',
    'Địa chỉ Email nhận thông báo': 'Email for notifications',
    'Mật khẩu quản trị': 'Password',
    'Đăng Ký Trở Thành Đối Tác (Hoa hồng 10%)': 'Become a Partner (10% Commission)',
    'Email hoặc Số điện thoại': 'Email or phone number',
    'Đăng Nhập Dashboard Quản Lý': 'Sign In to Dashboard',
    'ĐỐI TÁC CHÍNH THỨC': 'OFFICIAL PARTNER',
    'Mức hoa hồng:': 'Commission:',
    '(1 tầng) • Email:': '(single tier) • Email:',
    '• Mã:': '• Code:',
    'Sao chép Link Ref': 'Copy Referral Link',
    'Rút Hoa Hồng': 'Withdraw',
    'Mã QR giới thiệu': 'Referral QR code',
    'Khách quét bằng camera điện thoại để mở thẳng link của bạn.': 'Guests scan with their phone camera to open your link.',
    'Tải mã QR (PNG)': 'Download QR (PNG)',
    '👥 Mạng lưới F1 (': '👥 F1 Network (',
    '🤝 Chính sách đối tác': '🤝 Partner Policy',
    '🏆 Vinh danh': '🏆 Leaderboard',
    '💰 Thanh toán & Ngân hàng': '💰 Payout & Bank',
    'TỔNG LƯỢT CLICKS': 'TOTAL CLICKS',
    'CHỜ ĐỐI SOÁT (15 NGÀY)': 'PENDING (15 DAYS)',
    'Đang trong chu kỳ bảo đảm dịch vụ': 'In the service guarantee period',
    'HOA HỒNG KHẢ DỤNG': 'AVAILABLE COMMISSION',
    'Sẵn sàng để rút về tài khoản': 'Ready to withdraw',
    'THÀNH VIÊN F1': 'F1 MEMBERS',
    'Đăng ký trực tiếp qua link của bạn': 'Signed up directly via your link',
    'Hiệu Quả Tăng Trưởng Lượt Giới Thiệu': 'Referral Performance',
    'Ghi nhận': 'Recorded',
    'Muốn Tăng Gấp Đôi Doanh Số Hoa Hồng?': 'Want to Double Your Commission?',
    'Sử dụng các công cụ tạo mã QR in bàn lễ tân, link ưu đãi chuyên biệt và mẫu tin nhắn mời khách song ngữ trong mục': 'Use QR codes for your reception desk, special offer links and bilingual invitation messages in',
    'Công cụ bán': 'Sales Tools',
    'Khám Phá Công Cụ Bán': 'Explore Sales Tools',
    'Tạo Link Tiếp Thị & Mã QR Độc Quyền': 'Create Your Marketing Link & QR Code',
    'Chọn gói dịch vụ cụ thể để tạo link sâu (deep link) giúp tăng tỷ lệ chốt đơn của khách hàng:': 'Pick a specific service to create a deep link that converts better:',
    'Chọn trang hoặc dịch vụ đích:': 'Choose a landing page or service:',
    'Trang Chủ Spa (Toàn bộ Menu & Dịch vụ)': 'Spa Home (Full Menu & Services)',
    'Massage Body Hoàng Gia Trị Liệu (90 phút)': 'Royal Body Massage Therapy (90 min)',
    'Trị Liệu Cổ Vai Gáy Chuyên Sâu (60 phút)': 'Deep Neck & Shoulder Therapy (60 min)',
    'Gội Đầu Dưỡng Sinh & Chăm Sóc Da Mặt': 'Herbal Head Spa & Facial Care',
    'Combo Cặp Đôi Uyên Ương Luxury': 'Luxury Couple Combo',
    'ĐƯỜNG LINK TIẾP THỊ CỦA BẠN:': 'YOUR MARKETING LINK:',
    'Sao Chép': 'Copy',
    'Mã Tiếp Thị:': 'Marketing Code:',
    'In mã QR đặt trên quầy lễ tân khách sạn, menu nhà hàng, bàn tour hoặc card visit để khách quét trực tiếp.': 'Print the QR code for hotel reception desks, restaurant menus, tour desks or business cards so guests can scan it.',
    'Tải Mã QR Về Máy (PNG)': 'Download QR Code (PNG)',
    'Chia Sẻ 1-Chạm & Mẫu Tin Nhắn': 'One-Tap Sharing & Message Templates',
    'Gửi trực tiếp tin nhắn giới thiệu kèm ưu đãi VIP 10% cho bạn bè, khách lưu trú hoặc khách đoàn:': 'Send an invitation with the VIP 10% offer to friends, hotel guests or tour groups:',
    'Gửi Qua Zalo': 'Send via Zalo',
    'Gửi WhatsApp (Khách Nước Ngoài)': 'Send via WhatsApp',
    'Đăng Facebook': 'Share on Facebook',
    'MẪU TIN NHẮN TIẾNG VIỆT (KHÁCH TRONG NƯỚC):': 'VIETNAMESE MESSAGE (LOCAL GUESTS):',
    'Sao chép tin nhắn Tiếng Việt': 'Copy Vietnamese message',
    'MẪU TIN NHẮN TIẾNG ANH (KHÁCH DU LỊCH QUỐC TẾ):': 'ENGLISH MESSAGE (INTERNATIONAL GUESTS):',
    'Sao chép tin nhắn Tiếng Anh': 'Copy English message',
    'GIẢM 10%': '10% OFF',
    '+ TẶNG NGÂM CHÂN THẢO DƯỢC HOÀNG GIA': '+ FREE ROYAL HERBAL FOOT SOAK',
    'Mã đối tác:': 'Partner code:',
    'Quét để đặt lịch': 'Scan to book',
    'Thẻ VIP Voucher Điện Tử Của Bạn': 'Your Digital VIP Voucher',
    'Bạn có thể chụp màn hình hoặc gửi hình ảnh thẻ VIP này cho khách hàng thân thiết để khách xuất trình khi tới spa.': 'Screenshot or send this VIP card to your guests so they can show it at the spa.',
    'Tải Thẻ VIP Voucher': 'Download VIP Voucher',
    'Bảng Vàng Vinh Danh Top Đối Tác Xuất Sắc Tháng': 'Top Partners of the Month',
    'Cập nhật tự động theo tổng doanh số đặt lịch hoàn tất trong tháng.': 'Updated automatically from completed bookings this month.',
    'Thưởng Nóng Top 1 Tháng: 5.000.000đ': 'Monthly Top 1 Bonus: 5,000,000đ',
    'Hạng': 'Rank',
    'Đối Tác': 'Partner',
    'Kênh Tiếp Thị': 'Channel',
    'Số Đơn Đặt': 'Bookings',
    'Hoa Hồng Nhận': 'Commission',
    'Khách sạn / Homestay': 'Hotel / Homestay',
    'Thành Viên Đăng Ký Trực Tiếp (F1) ·': 'Direct Sign-ups (F1) ·',
    'Người mở link / quét QR của bạn rồi tạo tài khoản trên website trong vòng 30 ngày. Chỉ hiển thị tầng F1 trực tiếp — không có tầng F2.': 'People who opened your link / scanned your QR and created an account within 30 days. Direct (F1) only — no second tier.',
    'Thành Viên': 'Member',
    'Gmail': 'Gmail',
    'Ngày Đăng Ký': 'Joined',
    'Hình Thức': 'Method',
    'Thành viên': 'Member',
    'Đã là đối tác': 'Partner',
    'Khách Đặt Lịch Qua Mã Của Bạn (F1)': 'Guests Who Booked With Your Code (F1)',
    'Giao dịch được ghi nhận tự động theo thời gian thực khi khách ghé thăm hoặc hoàn tất thanh toán dịch vụ tại IVY LUXE SPA.': 'Bookings are recorded automatically when guests visit or complete payment at IVY LUXE SPA.',
    'Làm Mới Dữ Liệu': 'Refresh',
    'Mã Đơn / Thời Gian': 'Booking / Time',
    'Khách Hàng': 'Guest',
    'Dịch Vụ Sử Dụng': 'Service',
    'Giá Trị Đơn': 'Amount',
    'Hoa Hồng (10%)': 'Commission (10%)',
    'Trạng Thái': 'Status',
    'Chờ đối soát (15 ngày)': 'Pending (15 days)',
    'Khách huỷ / không đến': 'Cancelled / no-show',
    'Đã hoàn tất': 'Completed',
    'Đã đến spa – chờ spa cập nhật giá trị': 'Visited – awaiting amount from spa',
    'Đã đặt lịch – chờ khách đến': 'Booked – awaiting visit',
    'Khách tiềm năng – spa đang tư vấn': 'Lead – spa is following up',
    'Liên hệ tư vấn': 'Consultation request',
    'Chính Sách Dành Cho Đối Tác Affiliate IVY LUXE SPA': 'IVY LUXE SPA Affiliate Partner Policy',
    '1. Hoa Hồng 10% · Chỉ 1 Tầng (F1 Trực Tiếp):': '1. 10% Commission · Single Tier (Direct Referrals):',
    'Đối tác nhận 10% trên doanh thu hóa đơn dịch vụ của khách đến trực tiếp qua link / mã QR của bạn (F1). Chương trình chỉ có 1 tầng: không có hoa hồng từ người do F1 giới thiệu tiếp (F2), và Dashboard chỉ hiển thị thành viên F1 của bạn.': 'You earn 10% of the service invoice for every guest who comes directly through your link / QR code (F1). The program has a single tier: there is no commission from people referred by your F1 (F2), and your dashboard shows only your F1 members.',
    '2. Bảo Lưu Cookie 30 Ngày (Last-Click Attribution):': '2. 30-Day Cookie (Last-Click Attribution):',
    'Khách chỉ cần click vào link hoặc quét mã QR 1 lần, trong vòng 30 ngày nếu khách quay lại đặt bất kỳ lúc nào hệ thống vẫn tự động ghi nhận trọn vẹn hoa hồng cho bạn.': 'Guests only need to click your link or scan your QR once — if they come back and book within 30 days, the commission is still credited to you.',
    '3. Đặc Quyền Ưu Đãi Dành Riêng Cho Khách Của Bạn:': '3. Exclusive Perks for Your Guests:',
    'Khách đến từ mã giới thiệu của bạn được giảm thêm 10% trên toàn bộ menu & tặng miễn phí 1 buổi Ngâm chân thảo dược hoàng cung trị giá 150.000đ.': 'Guests using your referral code get an extra 10% off the entire menu and a free royal herbal foot soak worth 150,000đ.',
    '4. Kênh Hỗ Trợ Riêng Cho Đối Tác (24/7):': '4. Dedicated Partner Support (24/7):',
    'Hotline / Zalo Điều Phối Đối Tác:': 'Partner Hotline / Zalo:',
    '. Địa chỉ spa:': '. Spa address:',
    'SỐ DƯ HOA HỒNG KHẢ DỤNG HIỆN TẠI:': 'AVAILABLE COMMISSION BALANCE:',
    'Yêu Cầu Rút Hoa Hồng Về Tài Khoản': 'Request a Withdrawal',
    'Thông Tin Tài Khoản Ngân Hàng Nhận Tiền': 'Bank Account for Payouts',
    'Hệ thống chuyển khoản định kỳ tự động vào ngày 1 và ngày 15 hàng tháng, hoặc ngay sau khi bạn gửi lệnh yêu cầu rút:': 'Payouts are made on the 1st and 15th of each month, or right after you submit a withdrawal request:',
    'Tên Ngân Hàng': 'Bank Name',
    'Số Tài Khoản': 'Account Number',
    'Họ Tên Chủ Tài Khoản (Viết hoa không dấu)': 'Account Holder Name (capital letters)',
    'Cập Nhật Tài Khoản Ngân Hàng': 'Save Bank Account',
    'Chọn tài khoản Google để tiếp tục với IVY LUXE SPA Partner Portal:': 'Choose a Google account to continue to the IVY LUXE SPA Partner Portal:',
    'Hoặc nhập Gmail khác của bạn:': 'Or enter another Gmail:',
    'Xác nhận': 'Confirm',
    'Yêu Cầu Rút Tiền Hoa Hồng': 'Commission Withdrawal',
    'Số dư hoa hồng khả dụng:': 'Available balance:',
    'Nhập số tiền muốn rút (VNĐ):': 'Amount to withdraw (VND):',
    'Kế toán IVY LUXE SPA sẽ xác nhận lệnh và chuyển khoản trực tiếp qua ngân hàng trong vòng 2 - 24 giờ làm việc.': 'IVY LUXE SPA accounting will confirm and transfer to your bank within 2–24 business hours.',
    'Hủy Bỏ': 'Cancel',
    'Xác Nhận Rút Tiền': 'Confirm Withdrawal',
    'Hệ thống IVY LUXE SPA sử dụng cookie để bảo lưu mã giới thiệu affiliate trong 30 ngày và tối ưu hóa trải nghiệm đặt lịch của bạn.': 'IVY LUXE SPA uses cookies to keep affiliate referral codes for 30 days and improve your booking experience.',
    'Từ chối': 'Decline',
    'Đồng ý': 'Accept',
    'Phòng VIP Dưỡng Sinh Ivy Luxe Spa': 'Ivy Luxe Spa VIP wellness room',
    'Tổ Hợp Spa & Nail Cao Cấp': 'Luxury Spa & Nail',
    'Sảnh Đón & Lễ Tân Thực Tế 48 Hà Trung': 'Reception at 48 Ha Trung',
    'VD: Khách sạn Phố Cổ / Nguyễn Văn A': 'e.g. Old Quarter Hotel / John Smith',
    'VD: hotelhanoi (để trống hệ thống sẽ tự sinh)': 'e.g. hotelhanoi (leave blank to auto-create)',
    'you@gmail.com hoặc 0989713660': 'you@gmail.com or phone number',
    'Mã QR link giới thiệu': 'Referral link QR code',
    'Mã QR Tiếp Thị': 'Marketing QR code',
    'Tối thiểu 200.000đ': 'Minimum 200,000đ',
    'Ngân Hàng Nhận:': 'Receiving Bank:',
    'Bạn chưa cập nhật tài khoản ngân hàng. Hãy chuyển sang tab': 'You have not added a bank account yet. Go to the',
    'Thanh toán': 'Payout',
    'để bổ sung trước khi rút tiền.': 'tab to add one before withdrawing.',
    'Chưa có thành viên F1. Gửi link giới thiệu cho bạn bè, khách lưu trú — ai mở link rồi tạo tài khoản trong 30 ngày sẽ hiện ở đây.': 'No F1 members yet. Share your link with friends and hotel guests — anyone who opens it and signs up within 30 days will appear here.',
    'Tháng này chưa có đối tác nào có đơn hoàn tất. Hãy là người đầu tiên!': 'No partner has completed bookings this month yet. Be the first!',
    'Chưa có khách nào đến qua link của bạn. Khi khách mở link giới thiệu rồi': 'No guests through your link yet. When guests open your referral link and',
    'để lại thông tin': 'leave their details',
    'đặt lịch': 'book',
    'trên website, khách sẽ hiện ở đây ngay.': 'on the website, they will appear here right away.',
    'Không kết nối được máy chủ, vui lòng kiểm tra mạng.': 'Cannot reach the server, please check your connection.',
    'Xem Dashboard Quản Lý': 'View Dashboard',
    'Vui lòng đăng nhập (Gmail, số điện thoại hoặc Google) để xem Dashboard Đối tác.': 'Please sign in (Gmail, phone or Google) to view your Partner Dashboard.',
    'Chưa tải được dữ liệu.': 'Could not load data.',
    'Đã cập nhật số liệu mới nhất.': 'Data refreshed.',
    'Bạn đang đăng nhập bằng': 'You are signed in as',
    '. Điền thêm thông tin bên dưới để kích hoạt tài khoản Đối tác.': '. Fill in the details below to activate your partner account.',
    'Đối Tác Tiếp Thị': 'Marketing Partner',
    'Đã gửi thư xác nhận tới': 'A confirmation email was sent to',
    '. Mở Gmail (xem cả mục Spam), bấm': '. Open it (check Spam too), tap',
    ', rồi quay lại đây đăng nhập để vào Dashboard Đối Tác.': ', then come back here and sign in to your Partner Dashboard.',
    '🎉 Đăng ký Đối Tác thành công! Link giới thiệu riêng của bạn đã sẵn sàng.': '🎉 You are now a partner! Your referral link is ready.',
    'Chưa đăng ký được, vui lòng thử lại.': 'Sign-up failed, please try again.',
    'Tài khoản chưa xác nhận Gmail. Vui lòng mở thư xác nhận trong Gmail.': 'Your Gmail is not confirmed yet. Please open the confirmation email.',
    'Đăng nhập chưa thành công.': 'Sign-in failed.',
    'Đã đăng xuất khỏi Dashboard Đối Tác.': 'Signed out of the Partner Dashboard.',
    'Đã sao chép đường link giới thiệu của bạn!': 'Your referral link has been copied!',
    'Đã sao chép! ✓': 'Copied! ✓',
    'Đã sao chép đường link tiếp thị! Bạn có thể gửi ngay cho khách.': 'Marketing link copied! You can send it to guests now.',
    'Đã tải mã QR về máy.': 'QR code downloaded.',
    'Bạn có thể chụp màn hình thẻ Voucher hoặc gửi mã trực tiếp cho khách.': 'You can screenshot the voucher card or send the code directly to guests.',
    'Đã sao chép tin nhắn kèm link! Đang mở Zalo...': 'Message with link copied! Opening Zalo...',
    'Đã sao chép nội dung tin nhắn soạn sẵn!': 'Message template copied!',
    'Chưa lưu được.': 'Could not save.',
    '✓ Đã lưu thông tin tài khoản ngân hàng!': '✓ Bank account saved!',
    'Chưa gửi được yêu cầu.': 'Could not send the request.',
    'Xác nhận Gmail thành công! Mời bạn đăng nhập để vào Dashboard Đối Tác.': 'Gmail confirmed! Please sign in to your Partner Dashboard.',
    'Liên kết xác nhận đã hết hạn hoặc đã được dùng. Hãy thử đăng nhập.': 'The confirmation link has expired or was already used. Please try signing in.',
    'Đăng nhập Google chưa thành công, vui lòng thử lại hoặc dùng Gmail + mật khẩu.': 'Google sign-in failed, please try again or use Gmail + password.',
    'Cá nhân / KOL': 'Individual / KOL',
    'Hướng dẫn viên du lịch': 'Tour guide',
    'Đại lý du lịch': 'Travel agency',
    'KOL / Content Creator / Reviewer': 'KOL / Content Creator / Reviewer',
    'Tài xế / Grab': 'Driver / Grab',
    'Khác': 'Other',
    'Vui lòng nhập Tên đối tác / Họ tên.': 'Please enter your partner / full name.',
    'Số điện thoại chưa đúng.': 'Invalid phone number.',
    'Vui lòng cập nhật tài khoản ngân hàng trước khi rút tiền.': 'Please add your bank account before withdrawing.',
    'Số tiền rút tối thiểu là 200.000đ.': 'The minimum withdrawal is 200,000đ.',
    'Vui lòng nhập Gmail đúng định dạng.': 'Please enter a valid Gmail address.',
    'Gmail này đã có tài khoản. Vui lòng Đăng nhập để kích hoạt đối tác.': 'This Gmail already has an account. Please sign in to activate your partner account.',
    'Bạn chưa đăng ký đối tác.': 'You are not a partner yet.',
    'Vui lòng nhập đủ Ngân hàng, Số tài khoản và Tên chủ tài khoản.': 'Please enter the bank, account number and account holder name.',
    'Hệ thống đang bận, vui lòng thử lại sau ít phút.': 'The system is busy, please try again in a few minutes.',
    'Khách sạn Phố Cổ': 'Old Quarter Hotel',

    // ---------- Mô tả ảnh (alt / title) ----------
    'Ivy Luxe Spa - Phòng gội đầu dưỡng sinh & vòm nước tuần hoàn thực tế': 'Ivy Luxe Spa - Herbal head spa room with water-flow canopy',
    'Ivy Luxe Spa - Sảnh tiếp đón và lễ tân thực tế số 48 phố Hà Trung': 'Ivy Luxe Spa - Reception lobby at 48 Ha Trung Street',
    'Ivy Luxe Spa & Nail - Không gian thực tế dịch vụ': 'Ivy Luxe Spa & Nail - Our real service space',
    'Ivy Luxe Spa - Phòng đôi VIP & bồn ngâm gỗ Pơ Mu': 'Ivy Luxe Spa - VIP couple room with Po Mu wooden tub',
    'Ivy Luxe Spa - Chậu nước hoa trị liệu': 'Ivy Luxe Spa - Flower therapy basin',
    'Ảnh 1: Chậu hoa thư giãn': 'Photo 1: Relaxing flower basin',
    'Ảnh 2: Không gian spa cao cấp': 'Photo 2: Luxury spa space',
    'Ảnh 3: Sảnh đón khách 48 Hà Trung': 'Photo 3: Reception at 48 Ha Trung',
    'Ảnh 4: Phòng VIP bồn ngâm Jacuzzi': 'Photo 4: VIP Jacuzzi room',
    'Ảnh 5: Gội đầu dưỡng sinh vòm nước ấm': 'Photo 5: Warm water-flow head spa',
    'IVY LUXE Spa Số 48 Phố Hà Trung Sảnh Chờ & Tiếp Đón Thực Tế': 'IVY LUXE Spa reception & lounge at 48 Ha Trung Street',
    'IVY LUXE Spa & Nail - Không Gian Trị Liệu & Làm Đẹp Thực Tế': 'IVY LUXE Spa & Nail - Our therapy & beauty space',
    'Ivy Luxe Spa Dưỡng Sinh Vòm Nước Tuần Hoàn & Foot Care 48 Hà Trung': 'Ivy Luxe Spa head spa & foot care at 48 Ha Trung',
    'Xem trên Google Maps': 'View on Google Maps',
    'Vị trí IVY LUXE SPA tại Số 48 phố Hà Trung, phường Hoàn Kiếm, thành phố Hà Nội': 'IVY LUXE SPA location at 48 Ha Trung Street, Hoan Kiem, Hanoi',
    'Khách quốc tế trải nghiệm thực tế Foot Massage tại Ivy Luxe Spa 48 Hà Trung': 'International guests enjoying a foot massage at Ivy Luxe Spa, 48 Ha Trung',
    'Khách quốc tế trải nghiệm thực tế Foot Massage tại Ivy Luxe Spa': 'International guests enjoying a foot massage at Ivy Luxe Spa',
    'Phòng gội đầu dưỡng sinh & vòm nước tuần hoàn thực tế tại Ivy Luxe Spa': 'Herbal head spa room with water-flow canopy at Ivy Luxe Spa',
    'Phòng gội đầu dưỡng sinh thực tế tại IVY LUXE SPA 48 Hà Trung': 'Herbal head spa room at IVY LUXE SPA, 48 Ha Trung',
    'Toàn cảnh không gian dịch vụ thực tế IVY LUXE SPA & NAIL': 'IVY LUXE SPA & NAIL service space',
    'Toàn cảnh dịch vụ thực tế IVY LUXE SPA & NAIL': 'IVY LUXE SPA & NAIL services',
    'Xem trên TikTok @ivyspahanoi': 'Watch on TikTok @ivyspahanoi',
    'Xem trên Instagram @ivyspahanoi': 'View on Instagram @ivyspahanoi',
    'Bản đồ chỉ đường Google Maps - Số 48 phố Hà Trung, phường Hoàn Kiếm, thành phố Hà Nội': 'Google Maps directions - 48 Ha Trung Street, Hoan Kiem, Hanoi',
  };

  const VI_RE = /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/i;
  const ATTRS = ['placeholder', 'title', 'alt', 'aria-label'];
  const norm = (s) => String(s).normalize('NFC').replace(/\s+/g, ' ').trim();
  const MAP = new Map(Object.entries(DICT).map(([k, v]) => [norm(k), v]));
  const ORIG = new WeakMap(); // text node → chữ gốc
  let active = false;
  let busy = false;

  // Câu có phần thay đổi (Gmail, tên…)
  const PATTERNS = [
    [/^Tháng này: (\d+) lượt truy cập$/, 'This month: $1 visits'],
    [/^Đang chờ xử lý: (\d+) (khách|đơn)$/, 'In progress: $1'],
    [/^(\d+\+?) khách$/, '$1 guests'],
    [/^(\d+) đơn$/, '$1 bookings'],
    [/^Bạn \((.+)\)$/, 'You ($1)'],
    [/^Rút được từ (.+)$/, 'Withdrawable from $1'],
    [/^(.+) · Việt Nam$/, '$1 · Vietnam'],
    [/^Đã nhận: (.+) · Đang chờ chuyển: (.+)$/, 'Received: $1 · Awaiting transfer: $2'],
    [/^Đã nhận: (.+)$/, 'Received: $1'],
    [/^Đang chờ chuyển: (.+)$/, 'Awaiting transfer: $1'],
    [/^lượt click qua link của bạn trong (\d+) ngày qua$/, 'clicks through your link in the last $1 days'],
    [/^🎉 Đã kích hoạt tài khoản Đối tác cho (\S+)\. Link giới thiệu riêng của bạn đã sẵn sàng\.$/, '🎉 Partner account activated for $1. Your referral link is ready.'],
    [/^Đăng nhập thành công! Chào mừng (.+)\.$/, 'Signed in! Welcome, $1.'],
    [/^✓ Đã gửi yêu cầu rút (.+)\. IVYLUXE SPA & NAIL sẽ chuyển khoản sau khi đối soát\.$/, '✓ Withdrawal request for $1 sent. IVYLUXE SPA & NAIL will transfer after reconciliation.'],
    [/^Số dư khả dụng chỉ còn (.+)\.$/, 'Your available balance is only $1.'],
    [/^Mã giới thiệu "(.+)" đã có người dùng, vui lòng chọn mã khác\.$/, 'Referral code "$1" is taken, please choose another.'],
    [/^Chủ TK: (.+)$/, 'Account holder: $1'],
    [/^Tài khoản ([A-Z0-9]{2})\*\*\*$/, 'Account $1***'],
    [/^([\d.]+) VNĐ \((\d+) khách\)$/, '$1 VND ($2 guests)'],
    [/^Đã gửi lại thư xác nhận tới (\S+)\. Vui lòng kiểm tra Gmail \(cả mục Spam\)\.$/, 'Confirmation email resent to $1. Please check your inbox (and Spam).'],
    [/^Đăng nhập Google \((\S+)\) thành công! Chào mừng (.+) đến với IVY LUXE SPA\.$/, 'Signed in with Google ($1)! Welcome to IVY LUXE SPA, $2.'],
    [/^Đã gửi thư xác nhận tới (\S+)\. Mở Gmail, bấm "XÁC NHẬN ĐĂNG KÝ" rồi đăng nhập để vào Dashboard Đối Tác\.$/, 'Confirmation email sent to $1. Open it, tap "CONFIRM SIGN-UP", then sign in to your Partner Dashboard.'],
  ];

  function lookup(raw) {
    if (!raw) return null;
    const key = norm(raw.replace(/<[^>]+>/g, ' '));
    if (MAP.has(key)) return MAP.get(key); // kể cả chữ Việt không dấu ("Vinh danh")
    if (!VI_RE.test(raw)) return null;
    for (const [re, rep] of PATTERNS) if (re.test(key)) return key.replace(re, rep);
    // "650 phút" … chỉ là số + phút
    const m = /^([\d\s.,\/–-]+)\s*phút$/i.exec(key);
    if (m) return m[1].trim() + ' min';
    const vnd = /^(-?[\d.]+)\s*VNĐ$/.exec(key);
    if (vnd) return vnd[1] + ' VND';
    return null;
  }

  const skip = (el) => el && el.closest && el.closest('[data-no-i18n]');

  function translateText(node) {
    if (skip(node.parentElement)) return;
    const raw = node.nodeValue;
    const en = lookup(raw);
    // Không ghi lại khi chữ không đổi — tránh vòng lặp MutationObserver
    if (en == null || norm(en) === norm(raw)) return;
    if (!ORIG.has(node)) ORIG.set(node, raw);
    const lead = raw.match(/^\s*/)[0];
    const tail = raw.match(/\s*$/)[0];
    node.nodeValue = lead + en + tail;
  }

  function translateAttrs(el) {
    if (skip(el)) return;
    for (const a of ATTRS) {
      const v = el.getAttribute(a);
      if (!v) continue;
      const en = lookup(v);
      if (en == null || en === v) continue;
      el.__ivyViAttr = el.__ivyViAttr || {};
      if (!(a in el.__ivyViAttr)) el.__ivyViAttr[a] = v;
      el.setAttribute(a, en);
    }
  }

  function walk(root) {
    if (root.nodeType === 3) { translateText(root); return; }
    if (root.nodeType !== 1 || /^(SCRIPT|STYLE|NOSCRIPT)$/.test(root.tagName)) return;
    translateAttrs(root);
    root.querySelectorAll('[placeholder],[title],[alt],[aria-label]').forEach(translateAttrs);
    const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: (n) => (n.parentElement && /^(SCRIPT|STYLE|NOSCRIPT)$/.test(n.parentElement.tagName) ? 2 : 1),
    });
    let n;
    while ((n = w.nextNode())) translateText(n);
  }

  function restore() {
    const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let n;
    while ((n = w.nextNode())) if (ORIG.has(n)) { n.nodeValue = ORIG.get(n); ORIG.delete(n); }
    document.querySelectorAll('*').forEach((el) => {
      if (!el.__ivyViAttr) return;
      Object.entries(el.__ivyViAttr).forEach(([a, v]) => el.setAttribute(a, v));
      delete el.__ivyViAttr;
    });
  }

  const observer = new MutationObserver((records) => {
    if (!active || busy) return;
    busy = true;
    try {
      for (const r of records) {
        if (r.type === 'characterData') translateText(r.target);
        else if (r.type === 'attributes') translateAttrs(r.target);
        else r.addedNodes.forEach(walk);
      }
    } finally {
      busy = false;
    }
  });

  let viTitle = null;
  window.ivyAutoTranslate = function (lang) {
    active = lang !== 'vi';
    busy = true;
    try {
      if (active) walk(document.body); else restore();
      // Tiêu đề tab trình duyệt (trang chủ có doc_title riêng trong app.js)
      if (viTitle === null) viTitle = document.title;
      const t = lookup(viTitle);
      if (t) document.title = active ? t : viTitle;
    } finally {
      busy = false;
    }
    observer.disconnect();
    if (active) observer.observe(document.body, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ATTRS });
  };
  window.ivyTranslateText = (s) => (active ? (lookup(s) || s) : s);

  // Trang con (affiliate, privacy): <html data-auto-i18n> → tự dịch theo ngôn ngữ đã chọn ở trang chủ (ivy_lang),
  // mặc định Tiếng Anh; nút [data-ivy-lang-toggle] chuyển EN ⇄ VI và lưu chung cho cả website.
  const readLang = () => { try { return localStorage.getItem('ivy_lang') || 'en'; } catch (e) { return 'en'; } };
  function applySubpage(lang) {
    document.documentElement.lang = lang === 'vi' ? 'vi' : 'en';
    window.ivyAutoTranslate(lang);
    document.querySelectorAll('[data-ivy-lang-toggle]').forEach((b) => {
      b.innerHTML = lang === 'vi' ? '🇬🇧 <span>English</span>' : '🇻🇳 <span>Tiếng Việt</span>';
      b.setAttribute('aria-label', lang === 'vi' ? 'Switch to English' : 'Chuyển sang Tiếng Việt');
    });
  }
  window.ivySetLang = function (lang) {
    try { localStorage.setItem('ivy_lang', lang); } catch (e) {}
    applySubpage(lang);
  };
  if (document.documentElement.hasAttribute('data-auto-i18n')) {
    const boot = () => {
      document.querySelectorAll('[data-ivy-lang-toggle]').forEach((b) => b.addEventListener('click', () => window.ivySetLang(readLang() === 'vi' ? 'en' : 'vi')));
      applySubpage(readLang());
    };
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
    // Trang chủ đổi ngôn ngữ ở tab khác → trang này đổi theo
    window.addEventListener('storage', (e) => { if (e.key === 'ivy_lang') applySubpage(readLang()); });
  }

  // Hộp thông báo của trình duyệt
  const nativeAlert = window.alert.bind(window);
  const nativeConfirm = window.confirm.bind(window);
  window.alert = (msg) => nativeAlert(active ? (lookup(String(msg)) || msg) : msg);
  window.confirm = (msg) => nativeConfirm(active ? (lookup(String(msg)) || msg) : msg);
})();
