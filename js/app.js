/**
 * IVY LUXE SPA - MASSAGE BODY & WELLNESS
 * Interactive Application Engine, 100% Multi-Language (VI, EN, ZH, JA, KO), Dynamic Currency & 3D Spatial Effects
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // Supported Languages Configuration with National Flags
  const languageConfig = {
    vi: { code: 'VI', name: 'Tiếng Việt', flag: '🇻🇳', label: '🇻🇳 Tiếng Việt (VI)' },
    en: { code: 'EN', name: 'English', flag: '🇬🇧', label: '🇬🇧 English (EN)' },
    zh: { code: 'ZH', name: '中文', flag: '🇨🇳', label: '🇨🇳 中文 (ZH)' },
    ja: { code: 'JA', name: '日本語', flag: '🇯🇵', label: '🇯🇵 日本語 (JA)' },
    ko: { code: 'KO', name: '한국어', flag: '🇰🇷', label: '🇰🇷 한국어 (KO)' },
    ru: { code: 'RU', name: 'Русский', flag: '🇷🇺', label: '🇷🇺 Русский (RU)' },
    fr: { code: 'FR', name: 'Français', flag: '🇫🇷', label: '🇫🇷 Français (FR)' }
  };

  // State Management
  const state = {
    language: (function () { try { var p = location.pathname || ''; if (/^\/vi(\/|$)/.test(p)) { localStorage.setItem('ivy_lang', 'vi'); localStorage.setItem('ivy_lang_default_en_v1', '1'); return 'vi'; } if (/^\/en(\/|$)/.test(p)) { localStorage.setItem('ivy_lang', 'en'); localStorage.setItem('ivy_lang_default_en_v1', '1'); return 'en'; } if (!localStorage.getItem('ivy_lang_default_en_v1')) { localStorage.setItem('ivy_lang', 'en'); localStorage.setItem('ivy_lang_default_en_v1', '1'); } return localStorage.getItem('ivy_lang') || 'en'; } catch (e) { return 'en'; } })(), // Mặc định Tiếng Anh (khách đã tự chọn ngôn ngữ khác thì giữ lựa chọn); hỗ trợ vi, en, zh, ja, ko, ru, fr
    currency: 'vnd',     // vnd or usd (exchange rate: ~25,000 VND = 1 USD)
    rateVNDtoUSD: 25000,
    activeMenuTab: 'combos',
    activeReviewFilter: 'all',
    selectedLocation: 'ha-trung-48',
    audioPlaying: false
  };

  // =========================================================================
  // 1. MULTI-LANGUAGE DICTIONARY (VI, EN, ZH, JA, KO) - 100% PURE TRANSLATIONS
  // =========================================================================
  const translations = {
  "vi": {
    "doc_title": "Massage Body, Foot Massage & Nail Phố Cổ Hà Nội | IVY Luxe Spa",
    "top_address": "<i class=\"fa fa-map-marker\"></i> <strong>Địa chỉ: SỐ 48 PHỐ HÀ TRUNG, PHƯỜNG HOÀN KIẾM, THÀNH PHỐ HÀ NỘI</strong>",
    "top_hours": "<i class=\"fa fa-clock-o\"></i> Mở cửa hàng ngày: 09:00 Sáng - 11:00 Tối",
    "top_promo_ticker": "<i class=\"fa fa-tag\"></i> <strong>Ưu đãi đặt lịch trong khoảng thời gian từ 10h tới 15h được giảm 10%</strong>",
    "top_welcome_ticker": "<i class=\"fa fa-leaf\"></i> <strong>Ivy Luxe Spa - Trải Nghiệm Thư Giãn Chuẩn 5 Sao</strong>",
    "top_hotline": "<i class=\"fa fa-phone\"></i> Hotline: 098 9713660",
    "top_zen_music": "Nhạc Thiền",
    
    // Affiliate translations
    "nav_affiliate": "Đối Tác Affiliate",
    "footer_link_affiliate": "Chương Trình Đối Tác Affiliate",
    "aff_sub_title": "HỢP TÁC KINH DOANH CÙNG PHÁT TRIỂN",
    "aff_main_title": "CHƯƠNG TRÌNH ĐỐI TÁC AFFILIATE 48 HÀ TRUNG",
    "aff_desc_text": "Dành riêng cho Khách sạn, Concierge, Hướng dẫn viên du lịch, Tài xế, Airbnb Host và Quý khách hàng thân thiết. Đăng ký nhận link & mã QR tức thì - Nhận hoa hồng 10% cho mỗi khách bạn giới thiệu trực tiếp (1 tầng duy nhất)!",
    "aff_perk1_title": "Hoa Hồng 10% · 1 Tầng",
    "aff_perk1_desc": "Chiết khấu trực tiếp, minh bạch trên mỗi hóa đơn dịch vụ khách hàng sử dụng.",
    "aff_perk2_title": "Mã QR & Link Độc Quyền",
    "aff_perk2_desc": "Tạo link & mã QR định danh riêng chỉ trong 30 giây để khách quét đặt trực tiếp.",
    "aff_perk3_title": "Ưu Đãi Kép Cho Khách Hàng",
    "aff_perk3_desc": "Khách của bạn được giảm thêm 10% & tặng ngâm chân thảo dược trị giá 150.000đ.",
    "aff_perk4_title": "Thanh Toán Linh Hoạt",
    "aff_perk4_desc": "Chuyển khoản ngân hàng tức thì hoặc định kỳ hàng tuần/tháng theo yêu cầu.",
    "aff_tab_create": "1. Đăng Ký & Lấy Link / Mã QR",
    "aff_tab_templates": "2. Mẫu Tin Nhắn Mời Khách",
    "aff_tab_lookup": "3. Tra Cứu Hoa Hồng & Thống Kê",
    "aff_form_title": "Thông Tin Đối Tác Tiếp Thị",
    "aff_form_subtitle": "Điền thông tin để hệ thống khởi tạo link giới thiệu và mã QR riêng biệt cho bạn.",
    "aff_lbl_name": "Họ và Tên Đối Tác",
    "aff_ph_name": "VD: Nguyễn Văn Minh",
    "aff_lbl_phone": "Số Điện Thoại / Zalo",
    "aff_ph_phone": "VD: 0912345678",
    "aff_lbl_type": "Bạn Là Đối Tác Nào?",
    "aff_lbl_code": "Mã Giới Thiệu Tự Chọn",
    "aff_hint_code": "Viết liền không dấu (VD: MINH_TOUR, HOTEL_HANOI, ANH_DUY)",
    "aff_lbl_bank": "Tài Khoản Nhận Hoa Hồng (Ngân Hàng - STK - Tên CTK)",
    "aff_ph_bank": "VD: Vietcombank - 0011001234567 - NGUYEN VAN MINH",
    "aff_hint_bank": "Dùng để IVY LUXE SPA đối soát và tự động chuyển khoản hoa hồng cho bạn.",
    "aff_btn_create": "TẠO LINK TIẾP THỊ & MÃ QR NGAY",
    "aff_res_box_title": "Công Cụ Tiếp Thị Của Bạn",
    "aff_qr_hint": "Khách quét mã trên điện thoại sẽ tự động mở trang web với ưu đãi VIP 10%!",
    "aff_btn_download_qr": "Tải Ảnh Mã QR Về Máy",
    "aff_lbl_link": "Đường Link Tiếp Thị Riêng:",
    "aff_lbl_quick_share": "Gửi trực tiếp cho khách:",
    "aff_tpl_heading": "Mẫu Tin Nhắn Mời Khách Soạn Sẵn (Bấm 1 Chạm Để Sao Chép)",
    "aff_tpl_subheading": "Chọn mẫu phù hợp với khách của bạn (khách Việt Nam hoặc khách du lịch quốc tế), hệ thống tự động chèn link và mã giới thiệu của bạn.",
    "aff_ph_lookup": "Nhập Số Điện Thoại hoặc Mã Tiếp Thị của bạn (VD: 0912345678 hoặc IVY-HOTEL)...",
    "aff_btn_lookup": "Tra Cứu Ngay",
    "aff_res_lbl_clicks": "Lượt Khách Xem Link",
    "aff_res_lbl_bookings": "Đơn Đặt Lịch Thành Công",
    "aff_res_lbl_rev": "Tổng Doanh Thu Ước Tính",
    "aff_res_lbl_com": "Hoa Hồng Tích Lũy (10%)",
    "nav_home": "Trang Chủ",
    "nav_menu": "Bảng Dịch Vụ",
    "nav_promotions": "Combo Ưu Đãi",
    "nav_about": "Về Chúng Tôi <i class=\"fa fa-angle-down\"></i>",
    "nav_contact": "Liên Hệ",
    "nav_book": "Đặt Lịch Trực Tuyến",
    "hero_field_location": "Cơ Sở Spa",
    "hero_field_date": "Ngày Đến",
    "hero_field_time": "Giờ Hẹn",
    "hero_field_guest": "Số Lượng Khách",
    "hero_btn_book": "ĐẶT LỊCH NGAY!",
    "hero_welcome": "CHÀO MỪNG QUÝ KHÁCH ĐẾN VỚI IVY LUXE SPA HÀ NỘI",
    "subhero_title": "MASSAGE & TRỊ LIỆU THÂN TÂM PHỐ CỔ HÀ NỘI",
    "subhero_desc": "Liệu trình chuyên sâu. Đôi bàn tay điêu luyện. Lòng hiếu khách thuần khiết Hà Nội.",
    "subhero_addr_line": "Địa chỉ: <strong>SỐ 48 PHỐ HÀ TRUNG, PHƯỜNG HOÀN KIẾM, THÀNH PHỐ HÀ NỘI</strong> &nbsp;|&nbsp; Hotline: <strong style=\"color:#B22222;white-space:nowrap;\">098 9713660</strong>",
    "loc_title": "KHÔNG GIAN NGHỈ DƯỠNG TẠI 48 HÀ TRUNG",
    "loc_subtitle": "Không gian spa trị liệu sang trọng & biệt lập tại SỐ 48 PHỐ HÀ TRUNG, PHƯỜNG HOÀN KIẾM, THÀNH PHỐ HÀ NỘI",
    "loc_card1_title": "Ivy Luxe Spa (Sảnh Chờ & Tiếp Đón)",
    "loc_card1_addr": "Địa chỉ: SỐ 48 PHỐ HÀ TRUNG, PHƯỜNG HOÀN KIẾM, THÀNH PHỐ HÀ NỘI",
    "loc_card1_b1": "Sức chứa tối đa: 25 khách cùng lúc",
    "loc_card1_b2": "Không gian Indochine ấm cúng, sang trọng",
    "loc_card1_b3": "Mở cửa hàng ngày: 09:00 Sáng - 11:00 Tối",
    "loc_card1_b4": "Hotline / WhatsApp / Zalo: <strong>(+84) 98 971 3660</strong>",
    "loc_card2_title": "Ivy Luxe Spa (Khu Phòng Trị Liệu VIP)",
    "loc_card2_addr": "Địa chỉ: SỐ 48 PHỐ HÀ TRUNG, PHƯỜNG HOÀN KIẾM, THÀNH PHỐ HÀ NỘI",
    "loc_card2_b1": "Phòng đơn, phòng đôi VIP riêng tư tuyệt đối",

    "loc_card2_b3": "Mở cửa hàng ngày: 09:00 Sáng - 11:00 Tối",
    "loc_card2_b4": "Hotline / WhatsApp / Zalo: <strong>(+84) 98 971 3660</strong>",
    "loc_card3_title": "Ivy Luxe Spa (Dưỡng Sinh & Foot Care)",
    "loc_card3_addr": "Địa chỉ: SỐ 48 PHỐ HÀ TRUNG, PHƯỜNG HOÀN KIẾM, THÀNH PHỐ HÀ NỘI",
    "loc_card3_b1": "Vòm nước ấm tuần hoàn thư giãn da đầu & cổ vai gáy",
    "loc_card3_b2": "Ngâm chân thảo mộc hoa hồng & bấm huyệt chuyên sâu",
    "loc_card3_b3": "Mở cửa hàng ngày: 09:00 Sáng - 11:00 Tối",
    "loc_card3_b4": "Hotline / WhatsApp / Zalo: <strong>(+84) 98 971 3660</strong>",
    "loc_btn_discover": "KHÁM PHÁ THÊM",
    "map_btn_reserve": "ĐẶT LỊCH HẸN TRẢI NGHIỆM",
    "map_badge_title": "IVY LUXE SPA - 48 HÀ TRUNG",
    "map_badge_desc": "Địa chỉ: SỐ 48 PHỐ HÀ TRUNG, PHƯỜNG HOÀN KIẾM, THÀNH PHỐ HÀ NỘI (Cách Hồ Hoàn Kiếm 500m)",
    "map_btn_open": "<i class=\"fa fa-external-link\"></i> Mở chỉ đường Google Maps",
    "promo_title": "COMBO ƯU ĐÃI ĐẶC QUYỀN IVY SPECIAL",
    "promo_subtitle": "Tận hưởng các gói combo đặc quyền được yêu thích nhất tại Ivy Luxe Spa - SỐ 48 PHỐ HÀ TRUNG, PHƯỜNG HOÀN KIẾM, THÀNH PHỐ HÀ NỘI",
    "c1_badge_html": "<i class=\"fa fa-fire\"></i> GÓI HOT NHẤT",
    "c1_time_html": "<i class=\"fa fa-clock-o\"></i> 90 phút",
    "c1_title": "IVY SPECIAL - COMBO 1 (HOT)",
    "c1_s1": "<i class=\"fa fa-gift\" style=\"color:#D4AF37;\"></i> <strong>Tặng kèm ngâm chân thảo dược miễn phí</strong>",
    "c1_s2": "Massage toàn thân: <strong>30 phút</strong>",
    "c1_s3": "Gội đầu dưỡng sinh: <strong>30 phút</strong>",
    "c1_s4": "Chăm sóc da mặt & Vệ sinh tai: <strong>30 phút</strong>",
    "c1_btn": "ĐẶT LỊCH COMBO 1",
    "c2_badge_html": "<i class=\"fa fa-leaf\"></i> FOOT CARE",
    "c2_time_html": "<i class=\"fa fa-clock-o\"></i> 70 - 75 phút",
    "c2_title": "IVY SPECIAL - COMBO 2",
    "c2_s1": "<i class=\"fa fa-gift\" style=\"color:#D4AF37;\"></i> <strong>Tặng kèm ngâm chân thảo dược miễn phí</strong>",
    "c2_s2": "Massage chân bấm huyệt: <strong>30 phút</strong>",
    "c2_s3": "Tẩy tế bào chết chân (Scrub): <strong>30 phút</strong>",
    "c2_s4": "Ủ mặt nạ dưỡng ẩm chân: <strong>10 phút</strong>",
    "c2_btn": "ĐẶT LỊCH COMBO 2",
    "c3_badge_html": "<i class=\"fa fa-heart\"></i> THƯ GIÃN TOÀN DIỆN",
    "c3_time_html": "<i class=\"fa fa-clock-o\"></i> 120 phút",
    "c3_title": "IVY SPECIAL - COMBO 3",
    "c3_s1": "<i class=\"fa fa-gift\" style=\"color:#D4AF37;\"></i> <strong>Tặng kèm ngâm chân thảo dược miễn phí</strong>",
    "c3_s2": "Massage body toàn thân: <strong>45 phút</strong>",
    "c3_s3": "Tẩy tế bào chết toàn thân: <strong>30 phút</strong>",
    "c3_s4": "Chăm sóc da mặt & Vệ sinh tai: <strong>45 phút</strong>",
    "c3_btn": "ĐẶT LỊCH COMBO 3",
    "c4_badge_html": "<i class=\"fa fa-diamond\"></i> HOÀNG GIA ĐẾ VƯƠNG",
    "c4_time_html": "<i class=\"fa fa-clock-o\"></i> 150 phút",
    "c4_title": "IVY SPECIAL - COMBO 4",
    "c4_s1": "<i class=\"fa fa-gift\" style=\"color:#D4AF37;\"></i> <strong>Tặng kèm ngâm chân thảo dược miễn phí</strong>",
    "c4_s2": "Massage body (30 phút) & Tẩy da chết (30 phút)",
    "c4_s3": "Gội đầu dưỡng sinh & Vệ sinh tai: <strong>45 phút</strong>",
    "c4_s4": "Chăm sóc da mặt chuyên sâu: <strong>45 phút</strong>",
    "c4_btn": "ĐẶT LỊCH COMBO 4",
    "promo_btn_menu": "XEM TOÀN BỘ BẢNG GIÁ DỊCH VỤ",
    "promo_btn_board": "<i class=\"fa fa-picture-o\"></i> XEM ẢNH BẢNG GIÁ MENU BOARD GỐC",
    "menu_title": "IVY LUXE SPA - BẢNG GIÁ NIÊM YẾT CHÍNH THỨC",
    "menu_subtitle": "Bảng Giá Đầy Đủ Tất Cả Dịch Vụ Tại SỐ 48 PHỐ HÀ TRUNG, PHƯỜNG HOÀN KIẾM, THÀNH PHỐ HÀ NỘI (VNĐ & USD)",
    "menu_banner_title": "BẢNG GIÁ NIÊM YẾT MINH BẠCH - BẢO HÀNH 7 NGÀY MIỄN PHÍ DỊCH VỤ NAILS",
    "menu_banner_desc": "Quý khách có thể xem menu trực tuyến theo từng phân mục dưới đây hoặc mở xem ảnh chụp bảng giá gốc tại spa.",
    "menu_btn_open_board": "<i class=\"fa fa-file-image-o\"></i> Mở Bảng Giá Menu Gốc",
    "menu_currency_label": "Đơn vị tiền tệ:",
    "tab_combos": "<i class=\"fa fa-fire\"></i> IVY Special Combos",
    "tab_packages": "<i class=\"fa fa-diamond\"></i> Gói Hoàng Gia & Dưỡng Sinh, Da Mặt",
    "tab_massage": "<i class=\"fa fa-heart\"></i> Massage Body Toàn Thân",
    "tab_foot": "<i class=\"fa fa-paw\"></i> Foot Massage (Trị Liệu Chân)",
    "tab_nails": "<i class=\"fa fa-star\"></i> Chăm Sóc & Làm Đẹp Móng (Nails)",
    "tab_waxing": "<i class=\"fa fa-leaf\"></i> Dịch Vụ Waxing (Triệt Lông)",
    "tab_eyelash": "<i class=\"fa fa-eye\"></i> Nối Mi & Tạo Hình Chân Mày",
    "book_now_caps": "ĐẶT LỊCH NGAY",
    "btn_ritual_details": "Chi tiết liệu trình",
    "vip_choice": "Lựa chọn VIP",
    "reviews_title": "CẢM NHẬN TỪ KHÁCH HÀNG",
    "reviews_sub": "Hơn 15,000+ du khách trong nước và quốc tế đã thư giãn và hài lòng trọn vẹn tại Ivy Luxe Spa 48 Hà Trung.",
    "rev1_quote": "“Trước khi ra sân bay, chúng tôi ghé 48 Hà Trung để massage. Nhân viên chu đáo, tay nghề kỹ thuật viên rất đỉnh cao, chuyên nghiệp! Chúng tôi làm gói massage tinh dầu 60 phút và gội đầu dưỡng sinh 60 phút cực kỳ sảng khoái. Chắc chắn sẽ quay lại mỗi khi tới Hà Nội!”",
    "rev1_name": "Yujin Kim",
    "rev1_meta": "Hàn Quốc ● Cặp đôi",
    "rev2_quote": "“Sau 3 tuần công tác, Việt Nam là điểm dừng chân cuối cùng! Tôi đặt ngay buổi massage đá nóng tại 48 Hà Trung. Xác nhận lịch nhanh chóng, không gian ấm cúng và kỹ thuật viên rất điêu luyện. Rất đáng để trải nghiệm!”",
    "rev2_name": "Fenny Angela",
    "rev2_meta": "Indonesia / Hoa Kỳ ● Du khách một mình",
    "rev3_quote": "“Địa chỉ 48 Hà Trung rất dễ tìm, không gian yên tĩnh và sang trọng chuẩn phong cách phố cổ Hà Nội. Liệu trình gội đầu dưỡng sinh vòm nước và massage đá nóng cực kỳ thư giãn, nhân viên lịch sự, chu đáo!”",
    "rev3_name": "Nguyễn Minh Châu",
    "rev3_meta": "Hà Nội ● Đi cùng gia đình",
    "guests_title": "HÌNH ẢNH KHÁCH HÀNG TRẢI NGHIỆM",
    "guests_sub": "Khoảnh khắc thư thái đáng nhớ của các cặp đôi và du khách quốc tế tại spa.",
    "guests_btn_more": "XEM TOÀN BỘ ẢNH",
    "footer_location_title": "ĐỊA CHỈ DUY NHẤT",
    "footer_hq_title": "IVY LUXE SPA (Trụ Sở Chính)",
    "footer_addr_line": "Địa chỉ: SỐ 48 PHỐ HÀ TRUNG, PHƯỜNG HOÀN KIẾM, THÀNH PHỐ HÀ NỘI <a href=\"https://maps.google.com/?q=48+Ha+Trung+Hoan+Kiem+Hanoi\" target=\"_blank\" rel=\"noopener\">(Xem bản đồ)</a>",
    "footer_hotline_prefix": "Hotline 24/7 / Zalo / WhatsApp:",
    "footer_location_desc": "Vị trí trung tâm phố cổ Hà Nội, cách Hồ Hoàn Kiếm và chợ Hàng Da chỉ vài phút đi bộ.",
    "footer_about_title": "VỀ IVY LUXE SPA",
    "footer_about_desc": "Ivy Luxe Spa - Điểm đến massage & chăm sóc sức khỏe hàng đầu tại phố cổ Hà Nội. Không gian Indochine thanh lịch, kỹ thuật viên giàu kinh nghiệm và nguyên liệu thảo mộc tự nhiên.",
    "footer_quicklinks_title": "LIÊN KẾT NHANH",
    "footer_link_home": "Trang Chủ",
    "footer_link_menu": "Bảng Dịch Vụ & Giá",
    "footer_link_promotions": "Combo Ưu Đãi Đặc Biệt",
    "footer_link_locations": "Không Gian Tại 48 Hà Trung",
    "footer_link_reviews": "Đánh Giá Của Khách Hàng",
    "footer_link_book": "Đặt Lịch Trực Tuyến",
    "footer_hours_title": "GIỜ MỞ CỬA",
    "footer_hours_desc": "Mở cửa hàng ngày từ<br><strong style=\"color:#FFF; font-size:1.05rem;\">09:00 Sáng - 11:00 Tối</strong><br>Khuyến khích đặt lịch hẹn trước.",
    "footer_follow_title": "KẾT NỐI VỚI CHÚNG TÔI",
    "footer_payment_title": "PHƯƠNG THỨC THANH TOÁN",
    "footer_copyright": "Bản quyền 2026 © <strong>IVY LUXE SPA</strong> (Địa chỉ: SỐ 48 PHỐ HÀ TRUNG, PHƯỜNG HOÀN KIẾM, THÀNH PHỐ HÀ NỘI). Đã đăng ký bản quyền.",
    "modal_title": "ĐẶT LỊCH HẸN TRỰC TUYẾN - IVY LUXE SPA",
    "modal_name_label": "Họ và Tên",
    "modal_name_ph": "Ví dụ: Nguyễn Văn A",
    "modal_phone_label": "Số Điện Thoại / Zalo",
    "modal_phone_ph": "098 9713660",
    "modal_branch_label": "Địa Điểm",
    "modal_service_label": "Chọn Dịch Vụ",
    "modal_date_label": "Ngày Đến",
    "modal_time_label": "Giờ Hẹn",
    "modal_guests_label": "Số Lượng Khách",
    "modal_notes_label": "Ghi Chú Thêm (Nếu có)",
    "modal_notes_ph": "Yêu cầu lực massage, phòng riêng, kỹ thuật viên...",
    "modal_notice": "<i class=\"fa fa-info-circle\" style=\"color:#D4AF37;\"></i> Địa chỉ: SỐ 48 PHỐ HÀ TRUNG, PHƯỜNG HOÀN KIẾM, THÀNH PHỐ HÀ NỘI. Hotline hỗ trợ 24/7: <strong>098 9713660</strong>.",
    "modal_btn_submit": "XÁC NHẬN ĐẶT LỊCH NGAY",
    "board_modal_title": "BẢNG GIÁ DỊCH VỤ NIÊM YẾT CHÍNH THỨC - IVY LUXE SPA",
    "booking_success": "ĐẶT LỊCH THÀNH CÔNG!",
    "booking_success_desc": "IVY LUXE SPA đã ghi nhận lịch hẹn của Quý khách. Đội ngũ chuyên viên sẽ liên hệ hotline xác nhận trong vòng 5 phút.",
    "nav_healing_music": "Âm Nhạc Trị Liệu",
    "zen_section_tag": "ÂM THANH TRỊ LIỆU THIÊN NHIÊN",
    "zen_section_title": "KHÔNG GIAN ÂM NHẠC TRỊ LIỆU & THIỀN ĐỊNH",
    "zen_section_desc": "Đắm mình trong những giai điệu tần số chữa lành 432Hz độc quyền từ kênh Deep Healing Vibes, giúp xoa dịu hệ thần kinh, tái tạo năng lượng và mang lại sự an yên sâu lắng trong từng phút giây tại Ivy Luxe Spa.",
    "zen_channel_sub": "Kênh Âm Nhạc Trị Liệu & Tần Số Chữa Lành",
    "zen_visit_channel": "Ghé Thăm Kênh Deep Healing Vibes",
    "zen_tracklist_title": "Danh Sách Bản Nhạc Trị Liệu (432Hz)",
    "zen_track_count": "4 Tuyệt Tác Âm Thanh",
    "zen_btn_play_now": "Lắng Nghe",
    "zen_btn_playing": "Đang Phát...",
    "zen_player_min_hint": "Nhạc Trị Liệu",
    "zen_toast_playing": "Đang phát nhạc trị liệu thư giãn",
    "zen_toast_paused": "Đã tạm dừng nhạc trị liệu"
,
    // Exclusive Complimentary Perks
    "perks_badge": "<i class=\"fa fa-gift\"></i> TIỆN ÍCH MIỄN PHÍ ĐỘC QUYỀN",
    "perks_heading": "Đặc Quyền Dành Riêng Cho Quý Khách Tại IVY LUXE SPA",
    "perks_sub": "Mang đến trải nghiệm thư giãn chu đáo, tiện nghi và trọn vẹn nhất ngay giữa lòng phố cổ Hà Nội",
    "perk1_tag": "TIỆN ÍCH 100% MIỄN PHÍ",
    "perk1_title": "Được Tắm Miễn Phí",
    "perk1_desc": "Phòng tắm nóng lạnh riêng tư, sạch sẽ, chuẩn bị sẵn khăn tắm 5 sao, máy sấy tóc và sữa tắm thảo dược thư giãn sảng khoái trước hoặc sau liệu trình.",
    "perk2_tag": "AN TOÀN & TIỆN LỢI",
    "perk2_title": "Được Gửi Hành Lý Miễn Phí",
    "perk2_desc": "Quý khách thoải mái gửi vali, balo hành lý an toàn tại spa để thảnh thơi dạo chơi phố cổ, hồ Hoàn Kiếm hoặc chờ giờ bay. <em>(Lưu ý: Spa không nhận giữ đồ giá trị cao)</em>.",
    "perk3_tag": "TIẾT KIỆM TỐI ĐA",
    "perk3_title": "Được Đặt Hộ Xe Sân Bay Giá Rẻ",
    "perk3_desc": "Hỗ trợ đặt hộ xe ô tô riêng đưa đón sân bay Nội Bài 4 - 7 - 16 chỗ uy tín, đúng giờ, chu đáo với mức giá ưu đãi rẻ hơn nhiều so với taxi truyền thống.",
    "menu_perks_title": "ĐẶC QUYỀN MIỄN PHÍ KHI ĐẾN VỚI IVY LUXE SPA:",
    "menu_perk_shower": "<i class=\"fa fa-shower\" style=\"color:#D4AF37;\"></i> <strong>Được tắm miễn phí</strong>",
    "menu_perk_luggage": "<i class=\"fa fa-suitcase\" style=\"color:#D4AF37;\"></i> <strong>Được gửi hành lý miễn phí</strong> <small style=\"color:#64748B;\">(không nhận đồ giá trị)</small>",
    "menu_perk_car": "<i class=\"fa fa-car\" style=\"color:#D4AF37;\"></i> <strong>Được đặt hộ xe sân bay giá rẻ</strong>",
    "modal_perks_title": "<i class=\"fa fa-gift\"></i> ĐẶC QUYỀN MIỄN PHÍ DÀNH CHO BẠN:",
    "modal_perk_shower": "<i class=\"fa fa-shower\" style=\"color:#ECC876; width:18px;\"></i> <strong>Được tắm miễn phí</strong> trước hoặc sau liệu trình massage",
    "modal_perk_luggage": "<i class=\"fa fa-suitcase\" style=\"color:#ECC876; width:18px;\"></i> <strong>Được gửi hành lý miễn phí</strong> <em>(không nhận đồ giá trị cao)</em>",
    "modal_perk_car": "<i class=\"fa fa-car\" style=\"color:#ECC876; width:18px;\"></i> <strong>Được đặt hộ xe ô tô sân bay giá rẻ</strong> (Nội Bài)"

  },
  "en": {
    "doc_title": "Massage & Foot Massage in Hanoi Old Quarter | IVY Luxe Spa",
    "top_address": "<i class=\"fa fa-map-marker\"></i> <strong>48 Ha Trung, Hoan Kiem, Hanoi</strong>",
    "top_hours": "<i class=\"fa fa-clock-o\"></i> Open Daily: 09:00 AM - 11:00 PM",
    "top_promo_ticker": "<i class=\"fa fa-tag\"></i> <strong>Happy Hours Offer: 10% Off for Bookings between 10:00 - 15:00</strong>",
    "top_welcome_ticker": "<i class=\"fa fa-leaf\"></i> <strong>Ivy Luxe Spa - 5-Star Wellness Sanctuary in Hanoi Old Quarter</strong>",
    "top_hotline": "<i class=\"fa fa-phone\"></i> Hotline: (+84) 98 9713660",
    "top_zen_music": "Zen Music",
    
    // Affiliate translations
    "nav_affiliate": "Affiliate Partners",
    "footer_link_affiliate": "Affiliate Partner Program",
    "aff_sub_title": "EXCLUSIVE PARTNERSHIP & REWARDS",
    "aff_main_title": "IVY LUXE SPA AFFILIATE PROGRAM",
    "aff_desc_text": "Dedicated to Hotel Concierges, Tour Guides, Drivers, Airbnb Hosts & Travel Bloggers. Register to get your custom referral link & QR code instantly - Earn a 10% commission on every guest you refer directly (single tier)!",
    "aff_perk1_title": "10% Commission · Single Tier",
    "aff_perk1_desc": "Direct, transparent payout on every treatment booked by your referred guests.",
    "aff_perk2_title": "Custom QR & Link",
    "aff_perk2_desc": "Instantly generate your branded QR code and trackable link in 30 seconds.",
    "aff_perk3_title": "Special Guest Perks",
    "aff_perk3_desc": "Your guests receive 10% VIP discount and a complimentary herbal foot soak.",
    "aff_perk4_title": "Flexible Payouts",
    "aff_perk4_desc": "Instant bank transfer or weekly/monthly automatic payouts upon request.",
    "aff_tab_create": "1. Register & Get Link / QR Code",
    "aff_tab_templates": "2. Guest Message Templates",
    "aff_tab_lookup": "3. Track Earnings & Bookings",
    "aff_form_title": "Affiliate Partner Details",
    "aff_form_subtitle": "Fill in your details to generate your unique referral link and scan-and-go QR code.",
    "aff_lbl_name": "Full Name",
    "aff_ph_name": "e.g. David Concierge",
    "aff_lbl_phone": "Phone / WhatsApp / Zalo",
    "aff_ph_phone": "e.g. +84 912345678",
    "aff_lbl_type": "Partner Category",
    "aff_lbl_code": "Custom Referral Code",
    "aff_hint_code": "Letters and numbers only (e.g. HOTEL_HANOI, TOUR_MINH)",
    "aff_lbl_bank": "Payout Bank Account (Bank - Acc No - Account Holder)",
    "aff_ph_bank": "e.g. Vietcombank - 0011001234567 - NGUYEN VAN MINH",
    "aff_hint_bank": "Used by IVY LUXE SPA to automatically transfer your commissions.",
    "aff_btn_create": "GENERATE MARKETING LINK & QR NOW",
    "aff_res_box_title": "Your Marketing Toolkit",
    "aff_qr_hint": "Guests scan this QR code on their phone to unlock an exclusive 10% VIP gift!",
    "aff_btn_download_qr": "Download QR Image",
    "aff_lbl_link": "Your Dedicated Referral Link:",
    "aff_lbl_quick_share": "Share directly with guests:",
    "aff_tpl_heading": "Pre-written Guest Messages (1-Click Copy)",
    "aff_tpl_subheading": "Choose the best message template; your referral link and code are automatically inserted.",
    "aff_ph_lookup": "Enter your phone number or referral code (e.g. 0912345678 or IVY-HOTEL)...",
    "aff_btn_lookup": "Lookup Stats",
    "aff_res_lbl_clicks": "Link Visits",
    "aff_res_lbl_bookings": "Completed Bookings",
    "aff_res_lbl_rev": "Estimated Revenue",
    "aff_res_lbl_com": "Earned Commission (10%)",
    "nav_home": "Home",
    "nav_menu": "Spa Menu",
    "nav_promotions": "Promotions",
    "nav_about": "About Us <i class=\"fa fa-angle-down\"></i>",
    "nav_contact": "Contact",
    "nav_book": "Book Online",
    "hero_field_location": "Location",
    "hero_field_date": "Date",
    "hero_field_time": "Time",
    "hero_field_guest": "Guests",
    "hero_btn_book": "BOOK NOW!",
    "hero_welcome": "WELCOME TO IVY LUXE SPA HANOI",
    "subhero_title": "MASSAGE & SPA IN HANOI OLD QUARTER",
    "subhero_desc": "Professional treatments. Skilled hands. Genuine Hanoi hospitality.",
    "subhero_addr_line": "Official Address: <strong>48 Ha Trung, Hoan Kiem, Hanoi</strong><br>Hotline: <strong style=\"color:#B22222;white-space:nowrap;\">(+84) 98 9713660</strong>",
    "loc_title": "OUR SANCTUARY AT 48 HA TRUNG",
    "loc_subtitle": "Exclusive luxury wellness sanctuary located at 48 Ha Trung, Hoan Kiem, Hanoi",
    "loc_card1_title": "Ivy Luxe Spa (Lounge & Reception)",
    "loc_card1_addr": "48 Ha Trung, Hoan Kiem, Hanoi",
    "loc_card1_b1": "Capacity: Up to 25 guests simultaneously",
    "loc_card1_b2": "Warm, opulent Indochine interior",
    "loc_card1_b3": "Open daily: 09:00 AM - 11:00 PM",
    "loc_card1_b4": "Hotline / WhatsApp / Kakao: <strong>(+84) 98 971 3660</strong>",
    "loc_card2_title": "Ivy Luxe Spa (VIP Treatment Suites)",
    "loc_card2_addr": "48 Ha Trung, Hoan Kiem, Hanoi",
    "loc_card2_b1": "Private single & couple VIP suites",

    "loc_card2_b3": "Open daily: 09:00 AM - 11:00 PM",
    "loc_card2_b4": "Hotline / WhatsApp / Kakao: <strong>(+84) 98 971 3660</strong>",
    "loc_card3_title": "Ivy Luxe Spa (Head Spa & Foot Care)",
    "loc_card3_addr": "48 Ha Trung, Hoan Kiem, Hanoi",
    "loc_card3_b1": "Circulating warm water arch for scalp & neck relief",
    "loc_card3_b2": "Rose herbal foot soak & deep reflexology",
    "loc_card3_b3": "Open daily: 09:00 AM - 11:00 PM",
    "loc_card3_b4": "Hotline / WhatsApp / Kakao: <strong>(+84) 98 971 3660</strong>",
    "loc_btn_discover": "DISCOVER MORE",
    "map_btn_reserve": "MAKE A RESERVATION",
    "map_badge_title": "IVY LUXE SPA - 48 HA TRUNG",
    "map_badge_desc": "48 Ha Trung, Hoan Kiem, Hanoi (500m from Hoan Kiem Lake)",
    "map_btn_open": "<i class=\"fa fa-external-link\"></i> Open in Google Maps",
    "promo_title": "IVY SPECIAL COMBOS & PACKAGES",
    "promo_subtitle": "Indulge in our most celebrated signature combo packages at Ivy Luxe Spa - 48 Ha Trung, Hanoi",
    "c1_badge_html": "<i class=\"fa fa-fire\"></i> BEST SELLER",
    "c1_time_html": "<i class=\"fa fa-clock-o\"></i> 90 min",
    "c1_title": "IVY SPECIAL - COMBO 1 (HOT)",
    "c1_s1": "<i class=\"fa fa-gift\" style=\"color:#D4AF37;\"></i> <strong>Free herbal foot soak</strong>",
    "c1_s2": "Full body massage: <strong>30 minutes</strong>",
    "c1_s3": "Nourishing shampoo & head spa: <strong>30 minutes</strong>",
    "c1_s4": "Facial care & ear cleaning: <strong>30 minutes</strong>",
    "c1_btn": "BOOK COMBO 1",
    "c2_badge_html": "<i class=\"fa fa-leaf\"></i> FOOT CARE",
    "c2_time_html": "<i class=\"fa fa-clock-o\"></i> 70 - 75 min",
    "c2_title": "IVY SPECIAL - COMBO 2",
    "c2_s1": "<i class=\"fa fa-gift\" style=\"color:#D4AF37;\"></i> <strong>Free herbal foot soak</strong>",
    "c2_s2": "Foot reflexology massage: <strong>30 minutes</strong>",
    "c2_s3": "Foot scrub exfoliation: <strong>30 minutes</strong>",
    "c2_s4": "Nourishing foot mask: <strong>10 minutes</strong>",
    "c2_btn": "BOOK COMBO 2",
    "c3_badge_html": "<i class=\"fa fa-heart\"></i> RELAX & GLOW",
    "c3_time_html": "<i class=\"fa fa-clock-o\"></i> 120 min",
    "c3_title": "IVY SPECIAL - COMBO 3",
    "c3_s1": "<i class=\"fa fa-gift\" style=\"color:#D4AF37;\"></i> <strong>Free herbal foot soak</strong>",
    "c3_s2": "Full body massage: <strong>45 minutes</strong>",
    "c3_s3": "Full body scrub: <strong>30 minutes</strong>",
    "c3_s4": "Facial care & ear cleaning: <strong>45 minutes</strong>",
    "c3_btn": "BOOK COMBO 3",
    "c4_badge_html": "<i class=\"fa fa-diamond\"></i> ROYAL RETREAT",
    "c4_time_html": "<i class=\"fa fa-clock-o\"></i> 150 min",
    "c4_title": "IVY SPECIAL - COMBO 4",
    "c4_s1": "<i class=\"fa fa-gift\" style=\"color:#D4AF37;\"></i> <strong>Free herbal foot soak</strong>",
    "c4_s2": "Body massage (30') & Body scrub (30')",
    "c4_s3": "Nourishing shampoo & ear cleaning: <strong>45 minutes</strong>",
    "c4_s4": "Intensive facial treatment: <strong>45 minutes</strong>",
    "c4_btn": "BOOK COMBO 4",
    "promo_btn_menu": "VIEW FULL SPA MENU",
    "promo_btn_board": "<i class=\"fa fa-picture-o\"></i> VIEW OFFICIAL MENU BOARD IMAGE",
    "menu_title": "IVY LUXE SPA - OFFICIAL PRICE LIST",
    "menu_subtitle": "Comprehensive Rates for All Treatments at 48 Ha Trung, Hanoi (VND & USD)",
    "menu_banner_title": "TRANSPARENT PRICING - 7 DAYS FREE WARRANTY FOR NAIL SERVICES",
    "menu_banner_desc": "Browse our treatments by category below or open the high-resolution photo of our official counter menu.",
    "menu_btn_open_board": "<i class=\"fa fa-file-image-o\"></i> Open Official Menu Board",
    "menu_currency_label": "Currency:",
    "tab_combos": "<i class=\"fa fa-fire\"></i> IVY Special Combos",
    "tab_packages": "<i class=\"fa fa-diamond\"></i> Royal Packages & Wellness",
    "tab_massage": "<i class=\"fa fa-heart\"></i> Body Massage",
    "tab_foot": "<i class=\"fa fa-paw\"></i> Foot Massage & Reflexology",
    "tab_nails": "<i class=\"fa fa-star\"></i> Nail Services",
    "tab_waxing": "<i class=\"fa fa-leaf\"></i> Waxing Services",
    "tab_eyelash": "<i class=\"fa fa-eye\"></i> Eyelashes & Eyebrows",
    "book_now_caps": "BOOK NOW",
    "btn_ritual_details": "Treatment Details",
    "vip_choice": "VIP Choice",
    "reviews_title": "WHAT GUESTS ARE SAYING...",
    "reviews_sub": "More than 15,000+ happy travelers from around the world have experienced blissful serenity at Ivy Luxe Spa 48 Ha Trung.",
    "rev1_quote": "“Before heading to the airport, we stopped at 48 Ha Trung for a massage. The staff was incredibly gentle and the massage was deeply revitalizing! We enjoyed the 60-min aroma massage and 60-min head spa. Truly impressive. A must-visit whenever in Hanoi!”",
    "rev1_name": "Yujin Kim",
    "rev1_meta": "South Korea ● Couple",
    "rev2_quote": "“After 3 weeks of business travel, Vietnam was my last stop! I immediately booked a hotstone session at 48 Ha Trung. Super quick confirmation, cozy ambience, and such skilled therapists! Refreshed and ready to explore Hanoi.”",
    "rev2_name": "Fenny Angela",
    "rev2_meta": "Indonesia / US ● Solo Traveler",
    "rev3_quote": "“48 Ha Trung is very easy to find, with a tranquil atmosphere and elegant Old Quarter charm. The circulating warm water head spa and hot stone massage were immensely relaxing. Attentive, polite team!”",
    "rev3_name": "Nguyen Minh Chau",
    "rev3_meta": "Hanoi ● Family Trip",
    "guests_title": "OUR HAPPY GUESTS",
    "guests_sub": "Shared memorable moments from international travelers and couples at our sanctuary.",
    "guests_btn_more": "VIEW ALL PHOTOS",
    "footer_location_title": "OUR LOCATION",
    "footer_hq_title": "IVY LUXE SPA (Flagship Sanctuary)",
    "footer_addr_line": "Address: 48 Ha Trung, Hoan Kiem, Hanoi <a href=\"https://maps.google.com/?q=48+Ha+Trung+Hoan+Kiem+Hanoi\" target=\"_blank\" rel=\"noopener\">(View map)</a>",
    "footer_hotline_prefix": "Hotline 24/7 / Zalo / WhatsApp:",
    "footer_location_desc": "Central location in Hanoi Old Quarter, just minutes on foot from Hoan Kiem Lake and Hang Da Market. Massage Hanoi Old Quarter, foot massage near Hoan Kiem Lake and nail salon Hanoi Old Quarter.",
    "footer_about_title": "ABOUT IVY LUXE SPA",
    "footer_about_desc": "Ivy Luxe Spa - Premier massage & wellness sanctuary in Hanoi Old Quarter. Elegant Indochine architecture, expert master therapists, and pure botanical rituals.",
    "footer_quicklinks_title": "QUICK LINKS",
    "footer_link_home": "Home",
    "footer_link_menu": "Spa Menu & Pricing",
    "footer_link_promotions": "Special Promotions",
    "footer_link_locations": "Sanctuary at 48 Ha Trung",
    "footer_link_reviews": "Guest Reviews",
    "footer_link_book": "Book Online",
    "footer_hours_title": "OPENING HOURS",
    "footer_hours_desc": "We are open daily from<br><strong style=\"color:#FFF; font-size:1.05rem;\">09:00 AM - 11:00 PM</strong><br>Advanced reservation is recommended.",
    "footer_follow_title": "FOLLOW US",
    "footer_payment_title": "PAYMENT METHODS",
    "footer_copyright": "Copyright 2026 © <strong>IVY LUXE SPA</strong> (48 Ha Trung, Hoan Kiem, Hanoi). All Rights Reserved.",
    "modal_title": "ONLINE RESERVATION - IVY LUXE SPA",
    "modal_name_label": "Full Name",
    "modal_name_ph": "e.g. John Smith",
    "modal_phone_label": "Phone / WhatsApp / Kakao",
    "modal_phone_ph": "+84 98 9713660",
    "modal_branch_label": "Location",
    "modal_service_label": "Selected Service",
    "modal_date_label": "Date",
    "modal_time_label": "Time",
    "modal_guests_label": "Guests",
    "modal_notes_label": "Special Requests",
    "modal_notes_ph": "Preferred massage pressure, private room, specific focus areas...",
    "modal_notice": "<i class=\"fa fa-info-circle\" style=\"color:#D4AF37;\"></i> Service Address: <strong>48 Ha Trung, Hoan Kiem, Hanoi</strong>. 24/7 Concierge Hotline: <strong>(+84) 98 9713660</strong>.",
    "modal_btn_submit": "CONFIRM RESERVATION NOW",
    "board_modal_title": "OFFICIAL SPA MENU BOARD - IVY LUXE SPA",
    "booking_success": "RESERVATION CONFIRMED!",
    "booking_success_desc": "Thank you for choosing IVY LUXE SPA. Our concierge will contact you within 5 minutes to confirm.",
    "nav_healing_music": "Healing Music",
    "zen_section_tag": "NATURAL SOUND HEALING",
    "zen_section_title": "HEALING SOUNDSCAPE & ZEN RETREAT",
    "zen_section_desc": "Immerse yourself in authentic 432Hz healing soundscapes from Deep Healing Vibes, designed to calm your mind, relieve stress, and elevate your wellness journey at Ivy Luxe Spa.",
    "zen_channel_sub": "Official Sound Healing & Meditation Channel",
    "zen_visit_channel": "Visit Deep Healing Vibes Channel",
    "zen_tracklist_title": "Curated 432Hz Healing Tracks",
    "zen_track_count": "4 Sound Masterpieces",
    "zen_btn_play_now": "Listen Now",
    "zen_btn_playing": "Playing...",
    "zen_player_min_hint": "Zen Audio",
    "zen_toast_playing": "Now playing healing soundscape",
    "zen_toast_paused": "Zen audio paused"
,
    // Exclusive Complimentary Perks
    "perks_badge": "<i class=\"fa fa-gift\"></i> EXCLUSIVE COMPLIMENTARY PERKS",
    "perks_heading": "Exclusive Privileges For Guests At IVY LUXE SPA",
    "perks_sub": "Bringing you the most thoughtful, comfortable and complete relaxation experience in Hanoi Old Quarter",
    "perk1_tag": "100% FREE AMENITY",
    "perk1_title": "Free Hot Shower",
    "perk1_desc": "Private, pristine hot & cold showers with 5-star fresh towels, hairdryer, and aromatic herbal shower gel for complete refreshment before or after treatments.",
    "perk2_tag": "SAFE & CONVENIENT",
    "perk2_title": "Free Luggage Storage",
    "perk2_desc": "Leave your suitcases and backpacks safely at our spa to enjoy Hanoi Old Quarter, Hoan Kiem Lake, or await your flight. <em>(Note: High-value valuables cannot be accepted)</em>.",
    "perk3_tag": "MAXIMUM SAVINGS",
    "perk3_title": "Discounted Airport Car Assistance",
    "perk3_desc": "Assistance in booking reliable private 4, 7, or 16-seater cars for Noi Bai Airport transfers with prompt, courteous drivers at rates much cheaper than regular taxis.",
    "menu_perks_title": "FREE COMPLIMENTARY PERKS AT IVY LUXE SPA:",
    "menu_perk_shower": "<i class=\"fa fa-shower\" style=\"color:#D4AF37;\"></i> <strong>Free hot shower</strong>",
    "menu_perk_luggage": "<i class=\"fa fa-suitcase\" style=\"color:#D4AF37;\"></i> <strong>Free luggage storage</strong> <small style=\"color:#64748B;\">(no high valuables)</small>",
    "menu_perk_car": "<i class=\"fa fa-car\" style=\"color:#D4AF37;\"></i> <strong>Discounted airport transfers</strong>",
    "modal_perks_title": "<i class=\"fa fa-gift\"></i> COMPLIMENTARY PRIVILEGES FOR YOU:",
    "modal_perk_shower": "<i class=\"fa fa-shower\" style=\"color:#ECC876; width:18px;\"></i> <strong>Free hot shower</strong> before or after your massage therapy",
    "modal_perk_luggage": "<i class=\"fa fa-suitcase\" style=\"color:#ECC876; width:18px;\"></i> <strong>Free luggage storage</strong> <em>(no high-value items)</em>",
    "modal_perk_car": "<i class=\"fa fa-car\" style=\"color:#ECC876; width:18px;\"></i> <strong>Budget airport car booking assistance</strong> (Noi Bai)"

  },
  "zh": {
    "doc_title": "常春藤奢华水疗 IVY LUXE SPA | 河内老城区河中村48号",
    "top_address": "<i class=\"fa fa-map-marker\"></i> <strong>河内市还剑区行蓬坊河中村48号</strong>",
    "top_hours": "<i class=\"fa fa-clock-o\"></i> 营业时间：每日 09:00 - 23:00",
    "top_promo_ticker": "<i class=\"fa fa-tag\"></i> <strong>特惠活动：10:00 至 15:00 期间预约享 9 折（减 10%）</strong>",
    "top_welcome_ticker": "<i class=\"fa fa-leaf\"></i> <strong>Ivy Luxe Spa - 河内老城区顶级养生放松胜地</strong>",
    "top_hotline": "<i class=\"fa fa-phone\"></i> 贵宾热线：(+84) 98 9713660",
    "top_zen_music": "禅意音乐",
    "nav_home": "首页",
    "nav_menu": "水疗项目",
    "nav_promotions": "特惠套餐",
    "nav_about": "关于我们 <i class=\"fa fa-angle-down\"></i>",
    "nav_contact": "联系我们",
    "nav_book": "在线预订",
    "hero_field_location": "门店位置",
    "hero_field_date": "预约日期",
    "hero_field_time": "到店时间",
    "hero_field_guest": "贵宾人数",
    "hero_btn_book": "立即预订！",
    "hero_welcome": "热烈欢迎莅临河内常春藤奢华水疗 IVY LUXE SPA",
    "subhero_title": "河内老城区顶级按摩与养生水疗",
    "subhero_desc": "专业草本理疗。资深技师娴熟手法。地道河内热情款待。",
    "subhero_addr_line": "官方正规地址：<strong>河内市还剑区河中村48号</strong><br>贵宾热线：<strong style=\"color:#B22222;white-space:nowrap;\">(+84) 98 9713660</strong>",
    "loc_title": "河中村48号私享疗愈圣境",
    "loc_subtitle": "位于河内还剑区核心黄金地段的高端私密法越风情水疗馆",
    "loc_card1_title": "Ivy Luxe Spa (接待大厅与贵宾休息室)",
    "loc_card1_addr": "河内市还剑区河中村48号",
    "loc_card1_b1": "接待容量：同时容纳多达25位贵宾",
    "loc_card1_b2": "温馨奢华的印度支那典雅风情",
    "loc_card1_b3": "营业时间：每日 09:00 - 23:00",
    "loc_card1_b4": "贵宾热线 / 微信 / WhatsApp: <strong>(+84) 98 971 3660</strong>",
    "loc_card2_title": "Ivy Luxe Spa (VIP尊享理疗套房)",
    "loc_card2_addr": "河内市还剑区河中村48号",
    "loc_card2_b1": "单人及双人专属私密VIP套房",

    "loc_card2_b3": "营业时间：每日 09:00 - 23:00",
    "loc_card2_b4": "贵宾热线: <strong>(+84) 98 971 3660</strong>",
    "loc_card3_title": "Ivy Luxe Spa (养生头疗与足道护理)",
    "loc_card3_addr": "河内市还剑区河中村48号",
    "loc_card3_b1": "循环温水水疗舒缓头皮与肩颈酸痛",
    "loc_card3_b2": "玫瑰草本足浴与深层穴位足底反射按摩",
    "loc_card3_b3": "营业时间：每日 09:00 - 23:00",
    "loc_card3_b4": "贵宾热线: <strong>(+84) 98 971 3660</strong>",
    "loc_btn_discover": "探索详情",
    "map_btn_reserve": "预约尊享护理",
    "map_badge_title": "IVY LUXE SPA - 河中村48号",
    "map_badge_desc": "河内市还剑区河中村48号（距还剑湖仅500米）",
    "map_btn_open": "<i class=\"fa fa-external-link\"></i> 在谷歌地图中查看指引",
    "promo_title": "IVY 特惠专享组合套餐",
    "promo_subtitle": "在河内市河中村48号常春藤水疗享受最受欢迎的招牌组合护理",
    "c1_badge_html": "<i class=\"fa fa-fire\"></i> 热门推荐",
    "c1_time_html": "<i class=\"fa fa-clock-o\"></i> 90分钟",
    "c1_title": "IVY 招牌组合 1 (热门推荐)",
    "c1_s1": "<i class=\"fa fa-gift\" style=\"color:#D4AF37;\"></i> <strong>免费赠送中草药足浴</strong>",
    "c1_s2": "全身精油舒缓按摩：<strong>30分钟</strong>",
    "c1_s3": "养生滋养洗发与头疗：<strong>30分钟</strong>",
    "c1_s4": "面部护理与专业采耳：<strong>30分钟</strong>",
    "c1_btn": "预订组合 1",
    "c2_badge_html": "<i class=\"fa fa-leaf\"></i> 足道护理",
    "c2_time_html": "<i class=\"fa fa-clock-o\"></i> 70 - 75分钟",
    "c2_title": "IVY 招牌组合 2",
    "c2_s1": "<i class=\"fa fa-gift\" style=\"color:#D4AF37;\"></i> <strong>免费赠送中草药足浴</strong>",
    "c2_s2": "足底穴位深度按摩：<strong>30分钟</strong>",
    "c2_s3": "足部草本去角质磨砂：<strong>30分钟</strong>",
    "c2_s4": "足部滋养修护膜：<strong>10分钟</strong>",
    "c2_btn": "预订组合 2",
    "c3_badge_html": "<i class=\"fa fa-heart\"></i> 舒缓焕采",
    "c3_time_html": "<i class=\"fa fa-clock-o\"></i> 120分钟",
    "c3_title": "IVY 招牌组合 3",
    "c3_s1": "<i class=\"fa fa-gift\" style=\"color:#D4AF37;\"></i> <strong>免费赠送中草药足浴</strong>",
    "c3_s2": "全身草本精油按摩：<strong>45分钟</strong>",
    "c3_s3": "全身深度去角质磨砂：<strong>30分钟</strong>",
    "c3_s4": "面部深度护理与采耳：<strong>45分钟</strong>",
    "c3_btn": "预订组合 3",
    "c4_badge_html": "<i class=\"fa fa-diamond\"></i> 皇室尊享",
    "c4_time_html": "<i class=\"fa fa-clock-o\"></i> 150分钟",
    "c4_title": "IVY 招牌组合 4",
    "c4_s1": "<i class=\"fa fa-gift\" style=\"color:#D4AF37;\"></i> <strong>免费赠送中草药足浴</strong>",
    "c4_s2": "身体按摩 (30分) 与身体磨砂 (30分)",
    "c4_s3": "养生洗头与采耳护理：<strong>45分钟</strong>",
    "c4_s4": "深层补水面部修护：<strong>45分钟</strong>",
    "c4_btn": "预订组合 4",
    "promo_btn_menu": "查看全部水疗价目表",
    "promo_btn_board": "<i class=\"fa fa-picture-o\"></i> 查看官方实景挂牌价目表",
    "menu_title": "IVY LUXE SPA - 官方正规价目表",
    "menu_subtitle": "河中村48号各项护理项目完整报价（支持越南盾与美元结算）",
    "menu_banner_title": "价格透明公正 - 美甲服务尊享7天免费保修",
    "menu_banner_desc": "您可在下方浏览各分类护理项目，或直接查看前台正规价目牌实拍照片。",
    "menu_btn_open_board": "<i class=\"fa fa-file-image-o\"></i> 打开原版实景价目牌",
    "menu_currency_label": "货币单位：",
    "tab_combos": "<i class=\"fa fa-fire\"></i> IVY 特惠组合",
    "tab_packages": "<i class=\"fa fa-diamond\"></i> 尊享尊贵套餐 (2-4小时)",
    "tab_massage": "<i class=\"fa fa-heart\"></i> 全身身体按摩",
    "tab_nails": "<i class=\"fa fa-star\"></i> 美甲艺术护理",
    "tab_waxing": "<i class=\"fa fa-leaf\"></i> 专业脱毛护理",
    "tab_eyelash": "<i class=\"fa fa-eye\"></i> 美睫与美眉",
    "book_now_caps": "立即预订",
    "btn_ritual_details": "护理详情",
    "vip_choice": "贵宾臻选",
    "reviews_title": "宾客真实好评",
    "reviews_sub": "猫途鹰与谷歌高分好评，全球旅客在河中村48号常春藤水疗留下的美好回忆。",
    "rev1_quote": "“在前往机场前，我们特意来到河中村48号做按摩。员工非常温柔有礼，手法绝佳！我们体验了60分钟芳香精油按摩和60分钟养生头疗，身心舒畅。下次来河内一定会再次光临！”",
    "rev1_name": "金有真",
    "rev1_meta": "韩国 ● 情侣伴侣",
    "rev2_quote": "“出差三周后，越南是我的最后一站！我立即预订了河中村48号的热石理疗。确认迅速，环境雅致温馨，按摩师技术超赞！整个人焕然一新。”",
    "rev2_name": "Fenny Angela",
    "rev2_meta": "印度尼西亚 / 美国 ● 独自旅行",
    "rev3_quote": "“河中村48号位置非常好找，环境静谧优雅，具有纯正的河内古街法越风情。循环温水养生头疗和热石按摩令人极其放松，服务体贴入微！”",
    "rev3_name": "阮明珠",
    "rev3_meta": "河内 ● 家庭出行",
    "guests_title": "精彩体验图集",
    "guests_sub": "记录各国游客与情侣在水疗馆度过的悠闲惬意时光。",
    "guests_btn_more": "查看全部照片",
    "footer_location_title": "唯一官方地址",
    "footer_hq_title": "IVY LUXE SPA (旗舰水疗馆)",
    "footer_addr_line": "地址：河内市还剑区河中村48号 <a href=\"https://maps.google.com/?q=48+Ha+Trung+Hoan+Kiem+Hanoi\" target=\"_blank\" rel=\"noopener\">(查看地图)</a>",
    "footer_hotline_prefix": "24小时热线 / 微信 / WhatsApp:",
    "footer_location_desc": "坐落于河内老城区核心，步行至还剑湖及行街仅需数分钟。",
    "footer_about_title": "关于常春藤水疗",
    "footer_about_desc": "Ivy Luxe Spa - 河内老城区首屈一指的奢华养生水疗中心。典雅的法越建筑风格、资深按摩师及天然草本疗法。",
    "footer_quicklinks_title": "快捷导航",
    "footer_link_home": "首页",
    "footer_link_menu": "水疗项目与价目表",
    "footer_link_promotions": "特色组合优惠",
    "footer_link_locations": "河中村48号门店环境",
    "footer_link_reviews": "宾客真实评价",
    "footer_link_book": "在线即刻预订",
    "footer_hours_title": "营业时间",
    "footer_hours_desc": "每日营业时间：<br><strong style=\"color:#FFF; font-size:1.05rem;\">09:00 - 23:00</strong><br>建议提前在线预约。",
    "footer_follow_title": "关注我们",
    "footer_payment_title": "支持支付方式",
    "footer_copyright": "版权所有 2026 © <strong>IVY LUXE SPA</strong>（河内市还剑区河中村48号）。保留所有权利。",
    "modal_title": "在线预约护理 - IVY LUXE SPA",
    "modal_name_label": "您的姓名",
    "modal_name_ph": "例如：张先生 / 李女士",
    "modal_phone_label": "联系电话 / 微信 / WhatsApp",
    "modal_phone_ph": "+84 98 9713660",
    "modal_branch_label": "门店位置",
    "modal_service_label": "选择护理项目",
    "modal_date_label": "预约日期",
    "modal_time_label": "到店时间",
    "modal_guests_label": "贵宾人数",
    "modal_notes_label": "特别备注",
    "modal_notes_ph": "按摩力度喜好、独立包厢、重点酸痛部位...",
    "modal_notice": "<i class=\"fa fa-info-circle\" style=\"color:#D4AF37;\"></i> 护理地址：<strong>河内市还剑区河中村48号</strong>。24小时贵宾专线：<strong>(+84) 98 9713660</strong>。",
    "modal_btn_submit": "立即确认预约",
    "board_modal_title": "IVY LUXE SPA - 官方正规实景价目牌",
    "booking_success": "预约已成功提交！",
    "booking_success_desc": "感谢选择常春藤奢华水疗，专属接待顾问将在5分钟内与您联系确认。",
    "nav_healing_music": "疗愈音乐",
    "zen_section_tag": "自然声疗空间",
    "zen_section_title": "疗愈音乐与禅意冥想空间",
    "zen_section_desc": "沉浸在Deep Healing Vibes独家呈现的432Hz疗愈音频中，抚平紧绷神经，舒缓压力，开启Ivy Luxe水疗的全然放松之旅。",
    "zen_channel_sub": "官方疗愈音频与冥想频道",
    "zen_visit_channel": "访问 Deep Healing Vibes 频道",
    "zen_tracklist_title": "432Hz 精选疗愈乐曲",
    "zen_track_count": "4 首治愈名曲",
    "zen_btn_play_now": "立即聆听",
    "zen_btn_playing": "播放中...",
    "zen_player_min_hint": "疗愈音乐",
    "zen_toast_playing": "正在播放疗愈声疗",
    "zen_toast_paused": "已暂停禅意音乐"
,
    // Exclusive Complimentary Perks
    "perks_badge": "<i class=\"fa fa-gift\"></i> 专属免费礼遇",
    "perks_heading": "IVY LUXE SPA 尊贵宾客专属特权",
    "perks_sub": "在河内老城区核心地带为您带来最贴心、舒适与完善的奢华养生体验",
    "perk1_tag": "100% 免费便利",
    "perk1_title": "免费热水淋浴",
    "perk1_desc": "私密洁净的冷热水淋浴间，备齐五星级毛巾、电吹风及天然草本沐浴露，护理前后尽享清爽舒畅。",
    "perk2_tag": "安全便捷",
    "perk2_title": "免费行李寄存",
    "perk2_desc": "安心寄存您的行李箱与背包，轻松漫游河内老街、还剑湖或安心等候登机。<em>（注：恕不保管高价值贵重物品）</em>。",
    "perk3_tag": "超值省心",
    "perk3_title": "平价代订机场专车",
    "perk3_desc": "贴心协助代订内排机场往返4座、7座、16座优质私家专车，准时守信，价格远比普通出租车更划算。",
    "menu_perks_title": "莅临 IVY LUXE SPA 尊享免费特权：",
    "menu_perk_shower": "<i class=\"fa fa-shower\" style=\"color:#D4AF37;\"></i> <strong>免费热水淋浴</strong>",
    "menu_perk_luggage": "<i class=\"fa fa-suitcase\" style=\"color:#D4AF37;\"></i> <strong>免费行李寄存</strong> <small style=\"color:#64748B;\">(不含贵重物品)</small>",
    "menu_perk_car": "<i class=\"fa fa-car\" style=\"color:#D4AF37;\"></i> <strong>优惠代订机场专车</strong>",
    "modal_perks_title": "<i class=\"fa fa-gift\"></i> 为您提供专属免费特权：",
    "modal_perk_shower": "<i class=\"fa fa-shower\" style=\"color:#ECC876; width:18px;\"></i> <strong>免费热水淋浴</strong>（按摩理疗前后皆可）",
    "modal_perk_luggage": "<i class=\"fa fa-suitcase\" style=\"color:#ECC876; width:18px;\"></i> <strong>免费行李寄存</strong> <em>(恕不保管贵重物品)</em>",
    "modal_perk_car": "<i class=\"fa fa-car\" style=\"color:#ECC876; width:18px;\"></i> <strong>协助代订内排机场特价专车</strong>"

  },
  "ja": {
    "doc_title": "IVY LUXE SPA - ハノイ旧市街の極上マッサージ＆スパ | ハチュン48番地",
    "top_address": "<i class=\"fa fa-map-marker\"></i> <strong>ハノイ市ホアンキエム区ハチュン通り48番地</strong>",
    "top_hours": "<i class=\"fa fa-clock-o\"></i> 営業時間：毎日 09:00 - 23:00",
    "top_promo_ticker": "<i class=\"fa fa-tag\"></i> <strong>タイムセール（10:00〜15:00）：ご予約で全コース 10% OFF</strong>",
    "top_welcome_ticker": "<i class=\"fa fa-leaf\"></i> <strong>Ivy Luxe Spa - ハノイ旧市街最高峰の5つ星癒し空間</strong>",
    "top_hotline": "<i class=\"fa fa-phone\"></i> ホットライン：(+84) 98 9713660",
    "top_zen_music": "癒しの音楽",
    "nav_home": "ホーム",
    "nav_menu": "スパメニュー",
    "nav_promotions": "プロモーション",
    "nav_about": "当館について <i class=\"fa fa-angle-down\"></i>",
    "nav_contact": "お問い合わせ",
    "nav_book": "ウェブ予約",
    "hero_field_location": "店舗",
    "hero_field_date": "ご来店日",
    "hero_field_time": "ご希望時間",
    "hero_field_guest": "ご利用人数",
    "hero_btn_book": "今すぐ予約！",
    "hero_welcome": "ハノイ IVY LUXE SPA へようこそ",
    "subhero_title": "ハノイ旧市街の極上マッサージ＆スパ",
    "subhero_desc": "専門的なトリートメント。熟練セラピストの技。心温まるハノイのおもてなし。",
    "subhero_addr_line": "公式所在地：<strong>ハノイ市ホアンキエム区ハチュン通り48番地</strong><br>ホットライン：<strong style=\"color:#B22222;white-space:nowrap;\">(+84) 98 9713660</strong>",
    "loc_title": "ハチュン48番地の癒しの空間",
    "loc_subtitle": "ハノイ・ホアンキエム区ハチュン通り48番地に佇むラグジュアリーな癒し空間",
    "loc_card1_title": "Ivy Luxe Spa (ラウンジ＆レセプション)",
    "loc_card1_addr": "ハノイ市ホアンキエム区ハチュン通り48番地",
    "loc_card1_b1": "収容人数：最大25名様まで同時対応可能",
    "loc_card1_b2": "温もりと高級感あふれるインドシナ様式",
    "loc_card1_b3": "営業時間：毎日 09:00 - 23:00",
    "loc_card1_b4": "予約専用 / WhatsApp / LINE: <strong>(+84) 98 971 3660</strong>",
    "loc_card2_title": "Ivy Luxe Spa (VIPトリートメントスイート)",
    "loc_card2_addr": "ハノイ市ホアンキエム区ハチュン通り48番地",
    "loc_card2_b1": "完全プライベートなシングル＆カップル用VIP個室",

    "loc_card2_b3": "営業時間：毎日 09:00 - 23:00",
    "loc_card2_b4": "ホットライン: <strong>(+84) 98 971 3660</strong>",
    "loc_card3_title": "Ivy Luxe Spa (ヘッドスパ＆フットケア)",
    "loc_card3_addr": "ハノイ市ホアンキエム区ハチュン通り48番地",
    "loc_card3_b1": "循環式温水による頭皮・首肩コリ集中リラクゼーション",
    "loc_card3_b2": "ローズ＆ハーブ足湯と本格足裏ツボ刺激",
    "loc_card3_b3": "営業時間：毎日 09:00 - 23:00",
    "loc_card3_b4": "ホットライン: <strong>(+84) 98 971 3660</strong>",
    "loc_btn_discover": "詳細を見る",
    "map_btn_reserve": "ご予約はこちら",
    "map_badge_title": "IVY LUXE SPA - ハチュン48番地",
    "map_badge_desc": "ハノイ市ホアンキエム区ハチュン通り48番地（ホアンキエム湖より500m）",
    "map_btn_open": "<i class=\"fa fa-external-link\"></i> Googleマップで道順を確認",
    "promo_title": "IVY 限定スペシャルコンボ",
    "promo_subtitle": "ハノイ・ハチュン48番地で最も愛されている特選コンボプランをご堪能ください",
    "c1_badge_html": "<i class=\"fa fa-fire\"></i> 一番人気",
    "c1_time_html": "<i class=\"fa fa-clock-o\"></i> 90分",
    "c1_title": "IVY スペシャルコンボ 1 (一番人気)",
    "c1_s1": "<i class=\"fa fa-gift\" style=\"color:#D4AF37;\"></i> <strong>無料天然ハーブ足湯サービス</strong>",
    "c1_s2": "全身アロママッサージ：<strong>30分</strong>",
    "c1_s3": "ヘッドスパ＆クレンジング：<strong>30分</strong>",
    "c1_s4": "フェイシャルケア＆耳そうじ：<strong>30分</strong>",
    "c1_btn": "コンボ1を予約",
    "c2_badge_html": "<i class=\"fa fa-leaf\"></i> フットケア",
    "c2_time_html": "<i class=\"fa fa-clock-o\"></i> 70〜75分",
    "c2_title": "IVY スペシャルコンボ 2",
    "c2_s1": "<i class=\"fa fa-gift\" style=\"color:#D4AF37;\"></i> <strong>無料天然ハーブ足湯サービス</strong>",
    "c2_s2": "足裏ツボ押しマッサージ：<strong>30分</strong>",
    "c2_s3": "フットスクラブ角質除去：<strong>30分</strong>",
    "c2_s4": "フット集中保湿パック：<strong>10分</strong>",
    "c2_btn": "コンボ2を予約",
    "c3_badge_html": "<i class=\"fa fa-heart\"></i> 癒しと輝き",
    "c3_time_html": "<i class=\"fa fa-clock-o\"></i> 120分",
    "c3_title": "IVY スペシャルコンボ 3",
    "c3_s1": "<i class=\"fa fa-gift\" style=\"color:#D4AF37;\"></i> <strong>無料天然ハーブ足湯サービス</strong>",
    "c3_s2": "全身ボディマッサージ：<strong>45分</strong>",
    "c3_s3": "全身スクラブ角質ケア：<strong>30分</strong>",
    "c3_s4": "フェイシャル＆耳そうじ：<strong>45分</strong>",
    "c3_btn": "コンボ3を予約",
    "c4_badge_html": "<i class=\"fa fa-diamond\"></i> 極上ロイヤル",
    "c4_time_html": "<i class=\"fa fa-clock-o\"></i> 150分",
    "c4_title": "IVY スペシャルコンボ 4",
    "c4_s1": "<i class=\"fa fa-gift\" style=\"color:#D4AF37;\"></i> <strong>無料天然ハーブ足湯サービス</strong>",
    "c4_s2": "全身マッサージ(30分)＆ボディスクラブ(30分)",
    "c4_s3": "ヘッドスパ＆耳そうじ：<strong>45分</strong>",
    "c4_s4": "集中フェイシャルケア：<strong>45分</strong>",
    "c4_btn": "コンボ4を予約",
    "promo_btn_menu": "全スパメニューを見る",
    "promo_btn_board": "<i class=\"fa fa-picture-o\"></i> 店舗メニューボード写真を見る",
    "menu_title": "IVY LUXE SPA - 公式料金表",
    "menu_subtitle": "ハチュン48番地 全トリートメント公式料金一覧（VND＆USD対応）",
    "menu_banner_title": "明朗会計・ネイルメニュー7日間無料保証付き",
    "menu_banner_desc": "以下のカテゴリー別メニューをご覧いただくか、店頭の公式メニュー表写真をご確認ください。",
    "menu_btn_open_board": "<i class=\"fa fa-file-image-o\"></i> 公式メニュー写真を開く",
    "menu_currency_label": "通貨単位：",
    "tab_combos": "<i class=\"fa fa-fire\"></i> IVY スペシャルコンボ",
    "tab_packages": "<i class=\"fa fa-diamond\"></i> ロイヤルパッケージ (2〜4時間)",
    "tab_massage": "<i class=\"fa fa-heart\"></i> ボディマッサージ",
    "tab_nails": "<i class=\"fa fa-star\"></i> ネイルサービス",
    "tab_waxing": "<i class=\"fa fa-leaf\"></i> ワックス脱毛",
    "tab_eyelash": "<i class=\"fa fa-eye\"></i> まつげ＆眉ケア",
    "book_now_caps": "今すぐ予約",
    "btn_ritual_details": "詳細を見る",
    "vip_choice": "おすすめ",
    "reviews_title": "お客様の声",
    "reviews_sub": "世界中から訪れる15,000名以上の旅行者の方々にご愛顧いただいております。",
    "rev1_quote": "“空港へ向かう前に、ハチュン48番地でマッサージを受けました。スタッフはとても親切で、施術も最高でした！60分のアロママッサージと60分のヘッドスパを受け、旅の疲れが完全に癒されました。ハノイに来たらリピート確定です！”",
    "rev1_name": "キム・ユジン",
    "rev1_meta": "韓国 ● カップル",
    "rev2_quote": "“3週間の出張後、ベトナムが最後の滞在地でした。すぐにハチュン48番地でホットストーンを予約。予約確認も早く、落ち着いた空間と熟練の技術に感動しました。”",
    "rev2_name": "Fenny Angela",
    "rev2_meta": "インドネシア / 米国 ● 一人旅",
    "rev3_quote": "“ハチュン48番地はとても分かりやすい場所にあり、旧市街の趣を感じる静かで贅沢な空間です。循環式温水ヘッドスパとホットストーンマッサージで至福の時間を過ごせました。”",
    "rev3_name": "グエン・ミン・チャウ",
    "rev3_meta": "ハノイ ● 家族旅行",
    "guests_title": "お客様のフォトギャラリー",
    "guests_sub": "世界各国の旅行者やカップルが過ごした至福のひととき。",
    "guests_btn_more": "すべての写真を見る",
    "footer_location_title": "公式所在地",
    "footer_hq_title": "IVY LUXE SPA (旗艦店)",
    "footer_addr_line": "所在地：ハノイ市ホアンキエム区ハチュン通り48番地 <a href=\"https://maps.google.com/?q=48+Ha+Trung+Hoan+Kiem+Hanoi\" target=\"_blank\" rel=\"noopener\">(地図を見る)</a>",
    "footer_hotline_prefix": "24時間対応 / LINE / WhatsApp:",
    "footer_location_desc": "ハノイ旧市街中心部、ホアンキエム湖やハンダー市場から徒歩数分。",
    "footer_about_title": "IVY LUXE SPAについて",
    "footer_about_desc": "Ivy Luxe Spa - ハノイ旧市街最高峰のマッサージ＆ウェルネススパ。洗練されたインドシナ空間、熟練のセラピスト、厳選ハーブの癒し。",
    "footer_quicklinks_title": "クイックリンク",
    "footer_link_home": "ホーム",
    "footer_link_menu": "スパメニュー＆料金表",
    "footer_link_promotions": "特別プロモーション",
    "footer_link_locations": "ハチュン48番地の空間",
    "footer_link_reviews": "お客様のクチコミ",
    "footer_link_book": "オンライン予約",
    "footer_hours_title": "営業時間",
    "footer_hours_desc": "営業時間：<br><strong style=\"color:#FFF; font-size:1.05rem;\">09:00 - 23:00（年中無休）</strong><br>事前予約をおすすめいたします。",
    "footer_follow_title": "SNS公式アカウント",
    "footer_payment_title": "お支払い方法",
    "footer_copyright": "著作権 2026 © <strong>IVY LUXE SPA</strong> (48 Ha Trung, Hoan Kiem, Hanoi). All Rights Reserved.",
    "modal_title": "スパご予約フォーム - IVY LUXE SPA",
    "modal_name_label": "お名前",
    "modal_name_ph": "例：山田 太郎",
    "modal_phone_label": "お電話番号 / LINE / WhatsApp",
    "modal_phone_ph": "+84 98 9713660",
    "modal_branch_label": "店舗",
    "modal_service_label": "ご希望コース",
    "modal_date_label": "ご来店日",
    "modal_time_label": "ご希望時間",
    "modal_guests_label": "ご利用人数",
    "modal_notes_label": "ご要望・特記事項",
    "modal_notes_ph": "強さのお好み、個室希望、重点ケア箇所など...",
    "modal_notice": "<i class=\"fa fa-info-circle\" style=\"color:#D4AF37;\"></i> 店舗所在地：<strong>ハノイ市ホアンキエム区ハチュン48番地</strong>。24時間ホットライン：<strong>(+84) 98 9713660</strong>。",
    "modal_btn_submit": "予約を確定する",
    "board_modal_title": "IVY LUXE SPA - 店頭公式料金表",
    "booking_success": "ご予約を承りました！",
    "booking_success_desc": "IVY LUXE SPAをお選びいただきありがとうございます。専任スタッフより速やかにご連絡いたします。",
    "nav_healing_music": "癒しの音楽",
    "zen_section_tag": "自然なサウンドヒーリング",
    "zen_section_title": "癒しの音楽と禅の空間",
    "zen_section_desc": "Deep Healing Vibesによる432Hzの周波数音楽で、心を落ち着かせ、日常のストレスを解放し、至福のウェルネス体験をお届けします。",
    "zen_channel_sub": "公式サウンドヒーリング＆瞑想チャンネル",
    "zen_visit_channel": "Deep Healing Vibes チャンネルを見る",
    "zen_tracklist_title": "432Hz ヒーリング楽曲一覧",
    "zen_track_count": "4つの名曲",
    "zen_btn_play_now": "今すぐ聴く",
    "zen_btn_playing": "再生中...",
    "zen_player_min_hint": "癒しの音",
    "zen_toast_playing": "癒しの音楽を再生中",
    "zen_toast_paused": "癒しの音楽を一時停止しました"
,
    // Exclusive Complimentary Perks
    "perks_badge": "<i class=\"fa fa-gift\"></i> 特別無料特典",
    "perks_heading": "IVY LUXE SPA お客様だけの特別限定特典",
    "perks_sub": "ハノイ旧市街の中心で、最も心地よく充実した癒しのひとときをお届けいたします",
    "perk1_tag": "完全無料アメニティ",
    "perk1_title": "無料温水シャワー完備",
    "perk1_desc": "清潔なプライベート温水シャワールーム。5つ星ホテル仕様の清潔なタオル、ドライヤー、オーガニックハーブソープをご用意。施術前後にさっぱりとお使いいただけます。",
    "perk2_tag": "安心＆便利",
    "perk2_title": "手荷物・スーツケース無料預かり",
    "perk2_desc": "大きなスーツケースやお荷物をスパで安全にお預かりします。身軽に旧市街散策や還剣湖観光、フライト待ち時間をお楽しみください。<em>（※高額な貴重品はお預かりできません）</em>。",
    "perk3_tag": "お得な空港送迎",
    "perk3_title": "格安空港送迎の手配代行",
    "perk3_desc": "ノイバイ空港送迎の専用車（4・7・16人乗り）をお得な特別料金で手配代行いたします。一般タクシーより安く、時間厳守で安心です。",
    "menu_perks_title": "IVY LUXE SPA ご来店特典（完全無料）：",
    "menu_perk_shower": "<i class=\"fa fa-shower\" style=\"color:#D4AF37;\"></i> <strong>無料温水シャワー</strong>",
    "menu_perk_luggage": "<i class=\"fa fa-suitcase\" style=\"color:#D4AF37;\"></i> <strong>手荷物無料預かり</strong> <small style=\"color:#64748B;\">(貴重品除く)</small>",
    "menu_perk_car": "<i class=\"fa fa-car\" style=\"color:#D4AF37;\"></i> <strong>格安空港送迎手配</strong>",
    "modal_perks_title": "<i class=\"fa fa-gift\"></i> お客様への特別無料特典：",
    "modal_perk_shower": "<i class=\"fa fa-shower\" style=\"color:#ECC876; width:18px;\"></i> <strong>無料温水シャワー</strong>（マッサージ施術の前後）",
    "modal_perk_luggage": "<i class=\"fa fa-suitcase\" style=\"color:#ECC876; width:18px;\"></i> <strong>無料手荷物預かり</strong> <em>(貴重品除く)</em>",
    "modal_perk_car": "<i class=\"fa fa-car\" style=\"color:#ECC876; width:18px;\"></i> <strong>格安空港送迎の手配代行</strong>（ノイバイ空港）"

  },
  "ko": {
    "doc_title": "IVY LUXE SPA - 하노이 올드쿼터 최고급 럭셔리 마사지 | 하쭝 48번지",
    "top_address": "<i class=\"fa fa-map-marker\"></i> <strong>하노이시 호안끼엠구 하쭝 48번지</strong>",
    "top_hours": "<i class=\"fa fa-clock-o\"></i> 영업 시간: 매일 09:00 - 23:00",
    "top_promo_ticker": "<i class=\"fa fa-tag\"></i> <strong>예약 특가: 10:00 - 15:00 예약 시 10% 할인</strong>",
    "top_welcome_ticker": "<i class=\"fa fa-leaf\"></i> <strong>아이비 럭스 스파 - 하노이 구시가지 최고의 5성급 힐링 쉼터</strong>",
    "top_hotline": "<i class=\"fa fa-phone\"></i> 예약 핫라인: (+84) 98 9713660",
    "top_zen_music": "명상 음악",
    "nav_home": "홈",
    "nav_menu": "스파 메뉴",
    "nav_promotions": "프로모션",
    "nav_about": "소개 <i class=\"fa fa-angle-down\"></i>",
    "nav_contact": "문의하기",
    "nav_book": "온라인 예약",
    "hero_field_location": "위치",
    "hero_field_date": "방문 날짜",
    "hero_field_time": "방문 시간",
    "hero_field_guest": "인원 수",
    "hero_btn_book": "지금 예약하기!",
    "hero_welcome": "하노이 IVY LUXE SPA에 오신 것을 환영합니다",
    "subhero_title": "하노이 올드쿼터 최고급 마사지 & 스파",
    "subhero_desc": "전문적인 테라피. 베테랑 테라피스트의 섬세한 손길. 따뜻한 하노이의 환대.",
    "subhero_addr_line": "공식 주소: <strong>하노이 호안끼엠구 하쭝 48번지</strong><br>핫라인: <strong style=\"color:#B22222;white-space:nowrap;\">(+84) 98 9713660</strong>",
    "loc_title": "하쭝 48번지의 프라이빗 힐링 공간",
    "loc_subtitle": "하노이 호안끼엠구 하쭝 48번지에 위치한 최고급 프라이빗 스파 공간",
    "loc_card1_title": "Ivy Luxe Spa (라운지 & 리셉션)",
    "loc_card1_addr": "하노이시 호안끼엠구 하쭝 48번지",
    "loc_card1_b1": "동시 수용: 최대 25명 동시 이용 가능",
    "loc_card1_b2": "아늑하고 고급스러운 인도차이나 인테리어",
    "loc_card1_b3": "영업 시간: 매일 09:00 - 23:00",
    "loc_card1_b4": "예약 문의 / 카카오톡 / WhatsApp: <strong>(+84) 98 971 3660</strong>",
    "loc_card2_title": "Ivy Luxe Spa (VIP 프라이빗 룸)",
    "loc_card2_addr": "하노이시 호안끼엠구 하쭝 48번지",
    "loc_card2_b1": "완벽한 프라이빗 싱글 및 커플 VIP 전용 룸",

    "loc_card2_b3": "영업 시간: 매일 09:00 - 23:00",
    "loc_card2_b4": "핫라인: <strong>(+84) 98 971 3660</strong>",
    "loc_card3_title": "Ivy Luxe Spa (헤드스파 & 풋케어)",
    "loc_card3_addr": "하노이시 호안끼엠구 하쭝 48번지",
    "loc_card3_b1": "순환식 온수 테라피로 두피 및 목·어깨 피로 완벽 해소",
    "loc_card3_b2": "장미 한방 족욕 및 딥 티슈 발 마사지",
    "loc_card3_b3": "영업 시간: 매일 09:00 - 23:00",
    "loc_card3_b4": "핫라인: <strong>(+84) 98 971 3660</strong>",
    "loc_btn_discover": "자세히 보기",
    "map_btn_reserve": "예약 신청하기",
    "map_badge_title": "IVY LUXE SPA - 하쭝 48번지",
    "map_badge_desc": "하노이 호안끼엠구 하쭝 48번지 (호안끼엠 호수에서 500m)",
    "map_btn_open": "<i class=\"fa fa-external-link\"></i> Google 지도에서 길찾기",
    "promo_title": "IVY 스페셜 특가 콤보 패키지",
    "promo_subtitle": "하쭝 48번지 아이비 럭스 스파의 시그니처 베스트셀러 콤보를 만나보세요",
    "c1_badge_html": "<i class=\"fa fa-fire\"></i> 최고 인기",
    "c1_time_html": "<i class=\"fa fa-clock-o\"></i> 90분",
    "c1_title": "IVY 스페셜 콤보 1 (최고 인기)",
    "c1_s1": "<i class=\"fa fa-gift\" style=\"color:#D4AF37;\"></i> <strong>무료 한방 약초 족욕 서비스</strong>",
    "c1_s2": "전신 바디 마사지: <strong>30분</strong>",
    "c1_s3": "릴랙싱 영양 샴푸 & 헤드스파: <strong>30분</strong>",
    "c1_s4": "페이셜 케어 & 귀 청소: <strong>30분</strong>",
    "c1_btn": "콤보 1 예약",
    "c2_badge_html": "<i class=\"fa fa-leaf\"></i> 풋케어",
    "c2_time_html": "<i class=\"fa fa-clock-o\"></i> 70 - 75분",
    "c2_title": "IVY 스페셜 콤보 2",
    "c2_s1": "<i class=\"fa fa-gift\" style=\"color:#D4AF37;\"></i> <strong>무료 한방 약초 족욕 서비스</strong>",
    "c2_s2": "발 마사지 & 지압: <strong>30분</strong>",
    "c2_s3": "발 스크럽 각질 제거: <strong>30분</strong>",
    "c2_s4": "발 보습 마스크 팩: <strong>10분</strong>",
    "c2_btn": "콤보 2 예약",
    "c3_badge_html": "<i class=\"fa fa-heart\"></i> 릴랙스 & 글로우",
    "c3_time_html": "<i class=\"fa fa-clock-o\"></i> 120분",
    "c3_title": "IVY 스페셜 콤보 3",
    "c3_s1": "<i class=\"fa fa-gift\" style=\"color:#D4AF37;\"></i> <strong>무료 한방 약초 족욕 서비스</strong>",
    "c3_s2": "전신 바디 마사지: <strong>45분</strong>",
    "c3_s3": "전신 바디 스크럽: <strong>30분</strong>",
    "c3_s4": "페이셜 케어 & 귀 청소: <strong>45분</strong>",
    "c3_btn": "콤보 3 예약",
    "c4_badge_html": "<i class=\"fa fa-diamond\"></i> 황제 리트리트",
    "c4_time_html": "<i class=\"fa fa-clock-o\"></i> 150분",
    "c4_title": "IVY 스페셜 콤보 4",
    "c4_s1": "<i class=\"fa fa-gift\" style=\"color:#D4AF37;\"></i> <strong>무료 한방 약초 족욕 서비스</strong>",
    "c4_s2": "바디 마사지 (30분) & 바디 스크럽 (30분)",
    "c4_s3": "샴푸 헤드스파 & 귀 청소: <strong>45분</strong>",
    "c4_s4": "인텐시브 페이셜 케어: <strong>45분</strong>",
    "c4_btn": "콤보 4 예약",
    "promo_btn_menu": "전체 스파 메뉴 보기",
    "promo_btn_board": "<i class=\"fa fa-picture-o\"></i> 공식 매장 메뉴판 원본 보기",
    "menu_title": "IVY LUXE SPA - 공식 요금표",
    "menu_subtitle": "하쭝 48번지 전 코스 공식 요금표 (VND 및 USD 지원)",
    "menu_banner_title": "투명한 정찰제 가격 - 네일 서비스 7일 무료 보증 제공",
    "menu_banner_desc": "아래 카테고리별 온라인 메뉴를 확인하시거나 매장 카운터 공식 메뉴판 사진을 확인하세요.",
    "menu_btn_open_board": "<i class=\"fa fa-file-image-o\"></i> 원본 메뉴판 열기",
    "menu_currency_label": "통화 단위:",
    "tab_combos": "<i class=\"fa fa-fire\"></i> IVY 스페셜 콤보",
    "tab_packages": "<i class=\"fa fa-diamond\"></i> 로열 패키지 (2-4시간)",
    "tab_massage": "<i class=\"fa fa-heart\"></i> 바디 마사지",
    "tab_nails": "<i class=\"fa fa-star\"></i> 네일 서비스",
    "tab_waxing": "<i class=\"fa fa-leaf\"></i> 왁싱 제모",
    "tab_eyelash": "<i class=\"fa fa-eye\"></i> 속눈썹 & 눈썹",
    "book_now_caps": "지금 예약하기",
    "btn_ritual_details": "상세 보기",
    "vip_choice": "인기 추천",
    "reviews_title": "고객 리얼 후기",
    "reviews_sub": "하쭝 48번지 아이비 럭스 스파에서 15,000명 이상의 여행객이 극상의 힐링을 경험하셨습니다.",
    "rev1_quote": "“공항 가기 전에 마지막으로 48 Ha Trung에서 마사지 받으러 갔어요. 직원분들도 친절하시고 마사지도 시원했습니다! 아로마 마사지 60분이랑 헤어스파 60분 받았고 정말 감동했습니다. 하노이 오면 무조건 재방문할 거예요!”",
    "rev1_name": "김유진",
    "rev1_meta": "대한민국 ● 커플",
    "rev2_quote": "“3주간의 출장 후 베트남이 마지막 목적지였습니다! 48 Ha Trung에서 핫스톤 마사지를 바로 예약했어요. 예약 확인도 빠르고 아늑한 분위기에 테라피스트 실력이 최고였습니다.”",
    "rev2_name": "Fenny Angela",
    "rev2_meta": "인도네시아 / 미국 ● 나홀로 여행",
    "rev3_quote": "“하쭝 48번지 찾기도 쉽고 구시가지의 고즈넉하고 고급스러운 분위기가 너무 좋았습니다. 순환식 온수 헤드스파와 핫스톤 마사지가 피로를 싹 풀어주었어요. 직원분들도 정말 친절합니다!”",
    "rev3_name": "응우옌 민 차우",
    "rev3_meta": "하노이 ● 가족 여행",
    "guests_title": "고객 방문 갤러리",
    "guests_sub": "전 세계 여행자들과 커플들이 함께한 편안하고 행복한 순간들.",
    "guests_btn_more": "전체 사진 보기",
    "footer_location_title": "공식 주소",
    "footer_hq_title": "IVY LUXE SPA (본점 직영)",
    "footer_addr_line": "주소: 하노이시 호안끼엠구 하쭝 48번지 <a href=\"https://maps.google.com/?q=48+Ha+Trung+Hoan+Kiem+Hanoi\" target=\"_blank\" rel=\"noopener\">(지도 보기)</a>",
    "footer_hotline_prefix": "24시간 핫라인 / 카카오톡 / WhatsApp:",
    "footer_location_desc": "하노이 올드쿼터 중심가, 호안끼엠 호수 및 항다 시장 도보 3분 거리.",
    "footer_about_title": "IVY LUXE SPA 소개",
    "footer_about_desc": "Ivy Luxe Spa - 하노이 올드쿼터 최고의 럭셔리 힐링 스파. 우아한 인도차이나 인테리어, 베테랑 테라피스트, 천연 한방 약재 케어.",
    "footer_quicklinks_title": "빠른 링크",
    "footer_link_home": "홈",
    "footer_link_menu": "스파 메뉴 및 가격표",
    "footer_link_promotions": "스페셜 프로모션",
    "footer_link_locations": "하쭝 48번지 매장 안내",
    "footer_link_reviews": "고객 리얼 후기",
    "footer_link_book": "온라인 예약",
    "footer_hours_title": "영업 시간",
    "footer_hours_desc": "영업 시간: 매일<br><strong style=\"color:#FFF; font-size:1.05rem;\">09:00 - 23:00 (연중무휴)</strong><br>온라인 사전 예약을 권장합니다.",
    "footer_follow_title": "소셜 미디어",
    "footer_payment_title": "결제 수단",
    "footer_copyright": "저작권 2026 © <strong>IVY LUXE SPA</strong> (하노이 호안끼엠구 하쭝 48번지). All Rights Reserved.",
    "modal_title": "온라인 스파 예약 - IVY LUXE SPA",
    "modal_name_label": "고객명",
    "modal_name_ph": "예: 홍길동",
    "modal_phone_label": "연락처 / 카카오톡 ID",
    "modal_phone_ph": "+84 98 9713660",
    "modal_branch_label": "지점",
    "modal_service_label": "선택 코스",
    "modal_date_label": "방문 날짜",
    "modal_time_label": "방문 시간",
    "modal_guests_label": "인원 수",
    "modal_notes_label": "추가 요청사항",
    "modal_notes_ph": "마사지 강도, 1인실/커플룸 요청, 집중 관리 부위...",
    "modal_notice": "<i class=\"fa fa-info-circle\" style=\"color:#D4AF37;\"></i> 매장 주소: <strong>하노이 호안끼엠구 하쭝 48번지</strong>. 24시간 연중무휴 안내 핫라인: <strong>(+84) 98 9713660</strong>.",
    "modal_btn_submit": "지금 예약 완료하기",
    "board_modal_title": "IVY LUXE SPA - 공식 매장 원본 메뉴판",
    "booking_success": "예약이 성공적으로 접수되었습니다!",
    "booking_success_desc": "아이비 럭스 스파를 선택해 주셔서 감사합니다. 5분 이내에 카카오톡/전화로 확인 연락을 드리겠습니다.",
    "nav_healing_music": "힐링 음악",
    "zen_section_tag": "자연 사운드 힐링",
    "zen_section_title": "힐링 사운드스케이프 & 명상 공간",
    "zen_section_desc": "Deep Healing Vibes의 432Hz 치유 주파수 음악과 함께 깊은 휴식을 경험하세요. 스트레스를 해소하고 편안한 웰니스를 선사합니다.",
    "zen_channel_sub": "공식 사운드 힐링 & 명상 채널",
    "zen_visit_channel": "Deep Healing Vibes 채널 방문",
    "zen_tracklist_title": "432Hz 힐링 트랙 목록",
    "zen_track_count": "4곡의 힐링 사운드",
    "zen_btn_play_now": "지금 듣기",
    "zen_btn_playing": "재생 중...",
    "zen_player_min_hint": "힐링 오디오",
    "zen_toast_playing": "힐링 사운드스케이프 재생 중",
    "zen_toast_paused": "명상 음악 일시정지됨"
,
    // Exclusive Complimentary Perks
    "perks_badge": "<i class=\"fa fa-gift\"></i> 독점 무료 혜택",
    "perks_heading": "IVY LUXE SPA 고객만을 위한 스페셜 특전",
    "perks_sub": "하노이 올드쿼터 중심에서 가장 세심하고 쾌적한 힐링 경험을 선사합니다",
    "perk1_tag": "100% 무료 편의시설",
    "perk1_title": "무료 온수 샤워",
    "perk1_desc": "프라이빗하고 청결한 온냉수 샤워실 구비. 5성급 호텔 수준의 타월, 헤어드라이어, 천연 허브 바디워시가 완비되어 마사지 전후 상쾌하게 이용하실 수 있습니다.",
    "perk2_tag": "안전 & 편리함",
    "perk2_title": "무료 수하물/캐리어 보관",
    "perk2_desc": "스파에 캐리어와 무거운 짐을 안전하게 맡기시고, 가벼운 발걸음으로 호안끼엠 호수와 구시가지를 산책하시거나 비행기 시간을 편안하게 기다리세요. <em>(참고: 고가 귀중품은 보관 불가)</em>.",
    "perk3_tag": "최고의 가성비",
    "perk3_title": "노이바이 공항 특가 차량 대리 예약",
    "perk3_desc": "노이바이 공항 픽업/샌딩 4인승, 7인승, 16인승 전용 차량을 일반 택시보다 훨씬 저렴하고 합리적인 요금으로 안전하게 예약 대행해 드립니다.",
    "menu_perks_title": "IVY LUXE SPA 방문 고객 무료 혜택:",
    "menu_perk_shower": "<i class=\"fa fa-shower\" style=\"color:#D4AF37;\"></i> <strong>무료 온수 샤워</strong>",
    "menu_perk_luggage": "<i class=\"fa fa-suitcase\" style=\"color:#D4AF37;\"></i> <strong>무료 수하물 보관</strong> <small style=\"color:#64748B;\">(귀중품 제외)</small>",
    "menu_perk_car": "<i class=\"fa fa-car\" style=\"color:#D4AF37;\"></i> <strong>공항 샌딩 차량 할인 예약</strong>",
    "modal_perks_title": "<i class=\"fa fa-gift\"></i> 고객님을 위한 무료 특전:",
    "modal_perk_shower": "<i class=\"fa fa-shower\" style=\"color:#ECC876; width:18px;\"></i> <strong>무료 온수 샤워</strong> (마사지 전/후 언제든 가능)",
    "modal_perk_luggage": "<i class=\"fa fa-suitcase\" style=\"color:#ECC876; width:18px;\"></i> <strong>무료 짐/캐리어 보관</strong> <em>(고가 귀중품 제외)</em>",
    "modal_perk_car": "<i class=\"fa fa-car\" style=\"color:#ECC876; width:18px;\"></i> <strong>노이바이 공항 특가 차량 대리 예약</strong>"

  },
  "ru": {
    "doc_title": "IVY LUXE SPA - Массаж тела и спа в Ханое | 48 Ha Trung, Hoan Kiem",
    "top_address": "<i class=\"fa fa-map-marker\"></i> <strong>48 Ha Trung, Hoan Kiem, Ханой</strong>",
    "top_hours": "<i class=\"fa fa-clock-o\"></i> Ежедневно: 09:00 - 23:00",
    "top_promo_ticker": "<i class=\"fa fa-tag\"></i> <strong>Специальная скидка 10% при бронировании с 10:00 до 15:00</strong>",
    "top_welcome_ticker": "<i class=\"fa fa-leaf\"></i> <strong>Ivy Luxe Spa - 5-звездочный спа-оазис в Старом квартале Ханоя</strong>",
    "top_hotline": "<i class=\"fa fa-phone\"></i> Горячая линия: (+84) 98 9713660",
    "top_zen_music": "Дзен-музыка",
    "nav_home": "Главная",
    "nav_menu": "Спа-меню",
    "nav_promotions": "Акции",
    "nav_about": "О нас <i class=\"fa fa-angle-down\"></i>",
    "nav_contact": "Контакты",
    "nav_book": "Онлайн-бронирование",
    "hero_field_location": "Филиал",
    "hero_field_date": "Дата",
    "hero_field_time": "Время",
    "hero_field_guest": "Гости",
    "hero_btn_book": "ЗАБРОНИРОВАТЬ!",
    "hero_welcome": "ДОБРО ПОЖАЛОВАТЬ В IVY LUXE SPA ХАНОЙ",
    "subhero_title": "МАССАЖ И ОЗДОРОВЛЕНИЕ В СТАРОМ КВАРТАЛЕ ХАНОЯ",
    "subhero_desc": "Глубокие техники. Мастерские руки. Искреннее ханойское гостеприимство.",
    "subhero_addr_line": "Официальный адрес: <strong>48 Ha Trung, Hoan Kiem, Ханой</strong><br>Горячая линия: <strong style=\"color:#B22222;white-space:nowrap;\">(+84) 98 9713660</strong>",
    "loc_title": "НАШ СПА-КОМПЛЕКС НА ХА ЧУНГ, 48",
    "loc_subtitle": "Эксклюзивный роскошный велнес-оазис в самом сердце Ханоя",
    "loc_card1_title": "Ivy Luxe Spa (Зона приема и лаундж)",
    "loc_card1_addr": "48 Ha Trung, Hoan Kiem, Ханой",
    "loc_card1_b1": "Вместимость: до 25 гостей одновременно",
    "loc_card1_b2": "Уютный и роскошный индокитайский интерьер",
    "loc_card1_b3": "Ежедневно: 09:00 - 23:00",
    "loc_card1_b4": "Телефон / WhatsApp / Telegram: <strong>(+84) 98 971 3660</strong>",
    "loc_card2_title": "Ivy Luxe Spa (VIP-люксы для процедур)",
    "loc_card2_addr": "48 Ha Trung, Hoan Kiem, Ханой",
    "loc_card2_b1": "Приватные люксы для одного и для пар",

    "loc_card2_b3": "Ежедневно: 09:00 - 23:00",
    "loc_card2_b4": "Телефон / WhatsApp: <strong>(+84) 98 971 3660</strong>",
    "loc_card3_title": "Ivy Luxe Spa (Спа для головы и уход за ногами)",
    "loc_card3_addr": "48 Ha Trung, Hoan Kiem, Ханой",
    "loc_card3_b1": "Циркулирующая теплая водная арка для расслабления кожи головы",
    "loc_card3_b2": "Травяная ванночка с лепестками роз и точечный массаж",
    "loc_card3_b3": "Ежедневно: 09:00 - 23:00",
    "loc_card3_b4": "Телефон / WhatsApp: <strong>(+84) 98 971 3660</strong>",
    "loc_btn_discover": "УЗНАТЬ БОЛЬШЕ",
    "map_btn_reserve": "ЗАБРОНИРОВАТЬ ВИЗИТ",
    "map_badge_title": "IVY LUXE SPA - 48 HA TRUNG",
    "map_badge_desc": "48 Ha Trung, Hoan Kiem (500 м от озера Хоанкьем)",
    "map_btn_open": "<i class=\"fa fa-external-link\"></i> Открыть в Google Картах",
    "promo_title": "ФИРМЕННЫЕ ПАКЕТЫ IVY SPECIAL",
    "promo_subtitle": "Насладитесь нашими самыми популярными комплексными программами в Ivy Luxe Spa",
    "c1_badge_html": "<i class=\"fa fa-fire\"></i> ХИТ ПРОДАЖ",
    "c1_time_html": "<i class=\"fa fa-clock-o\"></i> 90 мин",
    "c1_title": "IVY SPECIAL - КОМБО 1 (HOT)",
    "c1_s1": "<i class=\"fa fa-gift\" style=\"color:#D4AF37;\"></i> <strong>Бесплатная травяная ванночка для ног</strong>",
    "c1_s2": "Массаж всего тела: <strong>30 минут</strong>",
    "c1_s3": "Питательное мытье и спа для головы: <strong>30 минут</strong>",
    "c1_s4": "Уход за лицом и гигиена ушей: <strong>30 минут</strong>",
    "c1_btn": "ЗАБРОНИРОВАТЬ КОМБО 1",
    "c2_badge_html": "<i class=\"fa fa-leaf\"></i> УХОД ЗА НОГАМИ",
    "c2_time_html": "<i class=\"fa fa-clock-o\"></i> 70 - 75 мин",
    "c2_title": "IVY SPECIAL - КОМБО 2",
    "c2_s1": "<i class=\"fa fa-gift\" style=\"color:#D4AF37;\"></i> <strong>Бесплатная травяная ванночка для ног</strong>",
    "c2_s2": "Точечный массаж стоп: <strong>30 минут</strong>",
    "c2_s3": "Пилинг и скраб для стоп: <strong>30 минут</strong>",
    "c2_s4": "Питательная маска для стоп: <strong>10 минут</strong>",
    "c2_btn": "ЗАБРОНИРОВАТЬ КОМБО 2",
    "c3_badge_html": "<i class=\"fa fa-heart\"></i> ПОЛНОЕ РАССЛАБЛЕНИЕ",
    "c3_time_html": "<i class=\"fa fa-clock-o\"></i> 120 мин",
    "c3_title": "IVY SPECIAL - КОМБО 3",
    "c3_s1": "<i class=\"fa fa-gift\" style=\"color:#D4AF37;\"></i> <strong>Бесплатная травяная ванночка для ног</strong>",
    "c3_s2": "Массаж всего тела: <strong>45 минут</strong>",
    "c3_s3": "Скраб для тела: <strong>30 минут</strong>",
    "c3_s4": "Уход за лицом и гигиена ушей: <strong>45 минут</strong>",
    "c3_btn": "ЗАБРОНИРОВАТЬ КОМБО 3",
    "c4_badge_html": "<i class=\"fa fa-diamond\"></i> КОРОЛЕВСКИЙ РИТУАЛ",
    "c4_time_html": "<i class=\"fa fa-clock-o\"></i> 150 мин",
    "c4_title": "IVY SPECIAL - КОМБО 4",
    "c4_s1": "<i class=\"fa fa-gift\" style=\"color:#D4AF37;\"></i> <strong>Бесплатная травяная ванночка для ног</strong>",
    "c4_s2": "Массаж тела (30') и скраб для тела (30')",
    "c4_s3": "Спа для головы и гигиена ушей: <strong>45 минут</strong>",
    "c4_s4": "Интенсивный уход за лицом: <strong>45 минут</strong>",
    "c4_btn": "ЗАБРОНИРОВАТЬ КОМБО 4",
    "promo_btn_menu": "ПОСМОТРЕТЬ ВСЕ СПА-МЕНЮ",
    "promo_btn_board": "<i class=\"fa fa-picture-o\"></i> ФОТО ОФИЦИАЛЬНОГО МЕНЮ В САЛОНЕ",
    "menu_title": "IVY LUXE SPA - ОФИЦИАЛЬНЫЙ ПРАЙС-ЛИСТ",
    "menu_subtitle": "Полный перечень процедур на Ха Чунг, 48 (в VND и USD)",
    "menu_banner_title": "ПРОЗРАЧНЫЕ ЦЕНЫ - 7 ДНЕЙ ГАРАНТИИ НА МАНИКЮР",
    "menu_banner_desc": "Ознакомьтесь с онлайн-меню по категориям ниже или откройте оригинальное фото меню.",
    "menu_btn_open_board": "<i class=\"fa fa-file-image-o\"></i> Открыть меню салона",
    "menu_currency_label": "Валюта:",
    "tab_combos": "<i class=\"fa fa-fire\"></i> Комбо IVY Special",
    "tab_packages": "<i class=\"fa fa-diamond\"></i> Королевские пакеты (2-4ч)",
    "tab_massage": "<i class=\"fa fa-heart\"></i> Массаж тела",
    "tab_foot": "<i class=\"fa fa-paw\"></i> Массаж ног (Foot Care)",
    "tab_nails": "<i class=\"fa fa-star\"></i> Маникюр и педикюр",
    "tab_waxing": "<i class=\"fa fa-leaf\"></i> Депиляция воском",
    "tab_eyelash": "<i class=\"fa fa-eye\"></i> Ресницы и брови",
    "book_now_caps": "ЗАБРОНИРОВАТЬ",
    "btn_ritual_details": "Подробнее о процедуре",
    "vip_choice": "Выбор VIP",
    "reviews_title": "ОТЗЫВЫ НАШИХ ГОСТЕЙ",
    "reviews_sub": "Более 15 000 путешественников и жителей Ханоя доверяют Ivy Luxe Spa.",
    "rev1_quote": "“Перед вылетом в аэропорт мы зашли на массаж на 48 Ha Trung. Персонал очень внимательный, а массаж просто великолепен! 60 минут аромамассажа и 60 минут спа для головы сняли всю усталость. Обязательно вернемся!”",
    "rev1_name": "Юджин Ким",
    "rev1_meta": "Южная Корея ● Пара",
    "rev2_quote": "“После трехнедельной командировки Вьетнам был последней точкой. Забронировала стоун-терапию на 48 Ha Trung. Быстрое подтверждение, очень атмосферно и профессионально!”",
    "rev2_name": "Фенни Анджела",
    "rev2_meta": "Индонезия / США ● Соло-путешественник",
    "rev3_quote": "“Салон на 48 Ha Trung легко найти, атмосфера тихая и роскошная в колониальном стиле. Циркуляционный душ для головы и горячие камни — чистое блаженство!”",
    "rev3_name": "Нгуен Минь Чау",
    "rev3_meta": "Ханой ● Семейная поездка",
    "guests_title": "ГАЛЕРЕЯ НАШИХ ГОСТЕЙ",
    "guests_sub": "Незабываемые моменты гармонии и отдыха наших гостей со всего мира.",
    "guests_btn_more": "СМОТРЕТЬ ВСЕ ФОТО",
    "footer_location_title": "ЕДИНСТВЕННЫЙ АДРЕС",
    "footer_hq_title": "IVY LUXE SPA (Флагманский салон)",
    "footer_addr_line": "Адрес: 48 Ha Trung, Hoan Kiem, Ханой <a href=\"https://maps.google.com/?q=48+Ha+Trung+Hoan+Kiem+Hanoi\" target=\"_blank\" rel=\"noopener\">(Смотреть на карте)</a>",
    "footer_hotline_prefix": "Круглосуточно / WhatsApp / Zalo:",
    "footer_location_desc": "В самом центре Старого квартала Ханоя, в нескольких минутах ходьбы от озера Хоанкьем.",
    "footer_about_title": "О СПА-САЛОНЕ IVY LUXE",
    "footer_about_desc": "Ivy Luxe Spa — премиальный спа-салон в Старом квартале Ханоя. Изысканная индокитайская эстетика, опытные мастера и натуральные травы.",
    "footer_quicklinks_title": "БЫСТРЫЕ ССЫЛКИ",
    "footer_link_home": "Главная",
    "footer_link_menu": "Спа-меню и цены",
    "footer_link_promotions": "Специальные предложения",
    "footer_link_locations": "Наше пространство",
    "footer_link_reviews": "Отзывы клиентов",
    "footer_link_book": "Онлайн-запись",
    "footer_hours_title": "ЧАСЫ РАБОТЫ",
    "footer_hours_desc": "Открыто ежедневно:<br><strong style=\"color:#FFF; font-size:1.05rem;\">09:00 - 23:00</strong><br>Рекомендуется предварительная запись.",
    "footer_follow_title": "МЫ В СОЦСЕТЯХ",
    "footer_payment_title": "СПОСОБЫ ОПЛАТЫ",
    "footer_copyright": "Авторские права 2026 © <strong>IVY LUXE SPA</strong> (48 Ha Trung, Hoan Kiem, Hanoi). Все права защищены.",
    "modal_title": "ОНЛАЙН-БРОНИРОВАНИЕ - IVY LUXE SPA",
    "modal_name_label": "Ваше имя",
    "modal_name_ph": "Например: Александр Иванов",
    "modal_phone_label": "Телефон / WhatsApp / Telegram",
    "modal_phone_ph": "+7 900 123 4567",
    "modal_branch_label": "Локация",
    "modal_service_label": "Выбор процедуры",
    "modal_date_label": "Дата визита",
    "modal_time_label": "Время визита",
    "modal_guests_label": "Количество гостей",
    "modal_notes_label": "Пожелания к процедуре",
    "modal_notes_ph": "Интенсивность массажа, отдельный кабинет, предпочтения...",
    "modal_notice": "<i class=\"fa fa-info-circle\" style=\"color:#D4AF37;\"></i> Салон расположен: <strong>48 Ha Trung, Hoan Kiem, Ханой</strong>. Поддержка 24/7: <strong>098 9713660</strong>.",
    "modal_btn_submit": "ПОДТВЕРДИТЬ БРОНИРОВАНИЕ",
    "board_modal_title": "ОФИЦИАЛЬНОЕ МЕНЮ И ПРАЙС-ЛИСТ - IVY LUXE SPA",
    "booking_success": "БРОНИРОВАНИЕ УСПЕШНО ОФОРМЛЕНО!",
    "booking_success_desc": "Благодарим за выбор IVY LUXE SPA. Наш администратор свяжется с вами в течение 5 минут для подтверждения.",
    "nav_healing_music": "Целебная музыка",
    "zen_section_tag": "ЕСТЕСТВЕННАЯ ЗВУКОТЕРАПИЯ",
    "zen_section_title": "ЦЕЛЕБНАЯ МУЗЫКА И ДЗЕН-МЕДИТАЦИЯ",
    "zen_section_desc": "Погрузитесь в звуковые вибрации 432 Гц от Deep Healing Vibes, снимающие стресс и дарящие глубокое умиротворение в Ivy Luxe Spa.",
    "zen_channel_sub": "Официальный канал звукотерапии и медитации",
    "zen_visit_channel": "Канал Deep Healing Vibes",
    "zen_tracklist_title": "Коллекция треков 432 Гц",
    "zen_track_count": "4 шедевра звука",
    "zen_btn_play_now": "Слушать",
    "zen_btn_playing": "Играет...",
    "zen_player_min_hint": "Дзен аудио",
    "zen_toast_playing": "Играет целебная музыка",
    "zen_toast_paused": "Музыка приостановлена"
,
    // Exclusive Complimentary Perks
    "perks_badge": "<i class=\"fa fa-gift\"></i> ЭКСКЛЮЗИВНЫЕ БЕСПЛАТНЫЕ УСЛУГИ",
    "perks_heading": "Эксклюзивные привилегии для гостей IVY LUXE SPA",
    "perks_sub": "Заботливый, комфортный и полноценный отдых в самом сердце Старого квартала Ханоя",
    "perk1_tag": "100% БЕСПЛАТНАЯ УСЛУГА",
    "perk1_title": "Бесплатный горячий душ",
    "perk1_desc": "Чистые индивидуальные душевые с горячей водой, 5-звездочными свежими полотенцами, феном и органическим травяным гелем до или после процедур.",
    "perk2_tag": "БЕЗОПАСНО И УДОБНО",
    "perk2_title": "Бесплатное хранение багажа",
    "perk2_desc": "Оставьте чемоданы и рюкзаки под надежным присмотром в спа, чтобы налегке погулять по Старому кварталу, к озеру Хоанкьем или дождаться рейса. <em>(Ценные вещи не принимаются)</em>.",
    "perk3_tag": "МАКСИМАЛЬНАЯ ЭКОНОМИЯ",
    "perk3_title": "Помощь с трансфером в аэропорт",
    "perk3_desc": "Помощь в бронировании надежного авто в аэропорт Нойбай (4, 7, 16 мест) с вежливыми водителями по ценам значительно ниже обычного такси.",
    "menu_perks_title": "БЕСПЛАТНЫЕ ПРИВИЛЕГИИ В IVY LUXE SPA:",
    "menu_perk_shower": "<i class=\"fa fa-shower\" style=\"color:#D4AF37;\"></i> <strong>Бесплатный душ</strong>",
    "menu_perk_luggage": "<i class=\"fa fa-suitcase\" style=\"color:#D4AF37;\"></i> <strong>Бесплатное хранение багажа</strong> <small style=\"color:#64748B;\">(без ценностей)</small>",
    "menu_perk_car": "<i class=\"fa fa-car\" style=\"color:#D4AF37;\"></i> <strong>Недорогой трансфер в аэропорт</strong>",
    "modal_perks_title": "<i class=\"fa fa-gift\"></i> БЕСПЛАТНЫЕ ПРИВИЛЕГИИ ДЛЯ ВАС:",
    "modal_perk_shower": "<i class=\"fa fa-shower\" style=\"color:#ECC876; width:18px;\"></i> <strong>Бесплатный горячий душ</strong> до или после массажа",
    "modal_perk_luggage": "<i class=\"fa fa-suitcase\" style=\"color:#ECC876; width:18px;\"></i> <strong>Бесплатное хранение багажа</strong> <em>(без ценностей)</em>",
    "modal_perk_car": "<i class=\"fa fa-car\" style=\"color:#ECC876; width:18px;\"></i> <strong>Помощь с бронированием авто в аэропорт Нойбай</strong>"

  },
  "fr": {
    "doc_title": "IVY LUXE SPA - Massage Corporel & Bien-être | 48 Ha Trung, Hanoï",
    "top_address": "<i class=\"fa fa-map-marker\"></i> <strong>48 Ha Trung, Hoan Kiem, Hanoï</strong>",
    "top_hours": "<i class=\"fa fa-clock-o\"></i> Ouvert tous les jours : 10h00 - 22h00",
    "top_promo_ticker": "<i class=\"fa fa-tag\"></i> <strong>Offre spéciale : 10% de réduction pour toute réservation de 10h à 15h</strong>",
    "top_welcome_ticker": "<i class=\"fa fa-leaf\"></i> <strong>Ivy Luxe Spa - Sanctuaire de Bien-être 5 Étoiles dans le Vieux Quartier de Hanoï</strong>",
    "top_hotline": "<i class=\"fa fa-phone\"></i> Ligne directe : (+84) 98 9713660",
    "top_zen_music": "Musique Zen",
    "nav_home": "Accueil",
    "nav_menu": "Menu du Spa",
    "nav_promotions": "Promotions",
    "nav_about": "À Propos <i class=\"fa fa-angle-down\"></i>",
    "nav_contact": "Contact",
    "nav_book": "Réservation en Ligne",
    "hero_field_location": "Adresse",
    "hero_field_date": "Date",
    "hero_field_time": "Heure",
    "hero_field_guest": "Invités",
    "hero_btn_book": "RÉSERVER MAINTENANT !",
    "hero_welcome": "BIENVENUE À IVY LUXE SPA HANOÏ",
    "subhero_title": "MASSAGE & BIEN-ÊTRE AU CŒUR DU VIEUX QUARTIER DE HANOÏ",
    "subhero_desc": "Soins experts. Mains attentives. Hospitalité authentique de Hanoï.",
    "subhero_addr_line": "Adresse officielle : <strong>48 Ha Trung, Hoan Kiem, Hanoï</strong><br>Ligne directe : <strong style=\"color:#B22222;white-space:nowrap;\">(+84) 98 9713660</strong>",
    "loc_title": "NOTRE SANCTUAIRE AU 48 HA TRUNG",
    "loc_subtitle": "Un havre de paix et de détente raffiné au cœur de Hanoï",
    "loc_card1_title": "Ivy Luxe Spa (Salon d'Accueil & Réception)",
    "loc_card1_addr": "48 Ha Trung, Hoan Kiem, Hanoï",
    "loc_card1_b1": "Capacité d'accueil : jusqu'à 25 personnes",
    "loc_card1_b2": "Ambiance Indochine chaleureuse et élégante",
    "loc_card1_b3": "Ouvert tous les jours : 10h00 - 22h00",
    "loc_card1_b4": "Téléphone / WhatsApp : <strong>(+84) 98 971 3660</strong>",
    "loc_card2_title": "Ivy Luxe Spa (Suites de Soins VIP)",
    "loc_card2_addr": "48 Ha Trung, Hoan Kiem, Hanoï",
    "loc_card2_b1": "Suites privées individuelles et pour couples",

    "loc_card2_b3": "Ouvert tous les jours : 10h00 - 22h00",
    "loc_card2_b4": "Téléphone / WhatsApp : <strong>(+84) 98 971 3660</strong>",
    "loc_card3_title": "Ivy Luxe Spa (Spa Capillaire & Soin des Pieds)",
    "loc_card3_addr": "48 Ha Trung, Hoan Kiem, Hanoï",
    "loc_card3_b1": "Arche d'eau chaude circulante pour la détente du cuir chevelu",
    "loc_card3_b2": "Bain de pieds aux herbes et réflexologie ciblée",
    "loc_card3_b3": "Ouvert tous les jours : 10h00 - 22h00",
    "loc_card3_b4": "Téléphone / WhatsApp : <strong>(+84) 98 971 3660</strong>",
    "loc_btn_discover": "DÉCOUVRIR PLUS",
    "map_btn_reserve": "RÉSERVER VOTRE EXPÉRIENCE",
    "map_badge_title": "IVY LUXE SPA - 48 HA TRUNG",
    "map_badge_desc": "48 Ha Trung, Hoan Kiem (à 500m du lac Hoan Kiem)",
    "map_btn_open": "<i class=\"fa fa-external-link\"></i> Ouvrir sur Google Maps",
    "promo_title": "FORFAITS COMBINÉS SIGNATURE IVY SPECIAL",
    "promo_subtitle": "Profitez de nos forfaits exclusifs les plus appréciés à Ivy Luxe Spa",
    "c1_badge_html": "<i class=\"fa fa-fire\"></i> MEILLEURE VENTE",
    "c1_time_html": "<i class=\"fa fa-clock-o\"></i> 90 min",
    "c1_title": "IVY SPECIAL - COMBO 1 (POPULAIRE)",
    "c1_s1": "<i class=\"fa fa-gift\" style=\"color:#D4AF37;\"></i> <strong>Bain de pieds aux herbes gratuit</strong>",
    "c1_s2": "Massage corporel complet : <strong>30 minutes</strong>",
    "c1_s3": "Shampooing nourrissant & spa du cuir chevelu : <strong>30 minutes</strong>",
    "c1_s4": "Soin du visage & nettoyage des oreilles : <strong>30 minutes</strong>",
    "c1_btn": "RÉSERVER LE COMBO 1",
    "c2_badge_html": "<i class=\"fa fa-leaf\"></i> SOIN DES PIEDS",
    "c2_time_html": "<i class=\"fa fa-clock-o\"></i> 70 - 75 min",
    "c2_title": "IVY SPECIAL - COMBO 2",
    "c2_s1": "<i class=\"fa fa-gift\" style=\"color:#D4AF37;\"></i> <strong>Bain de pieds aux herbes gratuit</strong>",
    "c2_s2": "Massage réflexologique des pieds : <strong>30 minutes</strong>",
    "c2_s3": "Gommage exfoliant des pieds : <strong>30 minutes</strong>",
    "c2_s4": "Masque nourrissant pour les pieds : <strong>10 minutes</strong>",
    "c2_btn": "RÉSERVER LE COMBO 2",
    "c3_badge_html": "<i class=\"fa fa-heart\"></i> DÉTENTE TOTALE",
    "c3_time_html": "<i class=\"fa fa-clock-o\"></i> 120 min",
    "c3_title": "IVY SPECIAL - COMBO 3",
    "c3_s1": "<i class=\"fa fa-gift\" style=\"color:#D4AF37;\"></i> <strong>Bain de pieds aux herbes gratuit</strong>",
    "c3_s2": "Massage corporel complet : <strong>45 minutes</strong>",
    "c3_s3": "Gommage corporel exfoliant : <strong>30 minutes</strong>",
    "c3_s4": "Soin du visage & nettoyage des oreilles : <strong>45 minutes</strong>",
    "c3_btn": "RÉSERVER LE COMBO 3",
    "c4_badge_html": "<i class=\"fa fa-diamond\"></i> RITUEL ROYAL",
    "c4_time_html": "<i class=\"fa fa-clock-o\"></i> 150 min",
    "c4_title": "IVY SPECIAL - COMBO 4",
    "c4_s1": "<i class=\"fa fa-gift\" style=\"color:#D4AF37;\"></i> <strong>Bain de pieds aux herbes gratuit</strong>",
    "c4_s2": "Massage corporel (30') & Gommage corporel (30')",
    "c4_s3": "Spa capillaire & nettoyage des oreilles : <strong>45 minutes</strong>",
    "c4_s4": "Soin facial intensif revitalisant : <strong>45 minutes</strong>",
    "c4_btn": "RÉSERVER LE COMBO 4",
    "promo_btn_menu": "VOIR TOUT LE MENU DU SPA",
    "promo_btn_board": "<i class=\"fa fa-picture-o\"></i> VOIR LE MENU OFFICIEL EN SALON",
    "menu_title": "IVY LUXE SPA - TARIFS OFFICIELS",
    "menu_subtitle": "Tarifs de l'ensemble de nos soins au 48 Ha Trung (en VND et USD)",
    "menu_banner_title": "TARIFS TRANSPARENTS - GARANTIE 7 JOURS GRATUITE SUR LES SOINS D'ONGLES",
    "menu_banner_desc": "Consultez notre menu en ligne par catégorie ci-dessous ou ouvrez la photo du menu officiel du salon.",
    "menu_btn_open_board": "<i class=\"fa fa-file-image-o\"></i> Ouvrir le menu du salon",
    "menu_currency_label": "Devise :",
    "tab_combos": "<i class=\"fa fa-fire\"></i> Combos Spéciaux IVY",
    "tab_packages": "<i class=\"fa fa-diamond\"></i> Forfaits Royaux (2h - 4h)",
    "tab_massage": "<i class=\"fa fa-heart\"></i> Massages Corporels",
    "tab_foot": "<i class=\"fa fa-paw\"></i> Massage des pieds (Foot Care)",
    "tab_nails": "<i class=\"fa fa-star\"></i> Beauté des Ongles",
    "tab_waxing": "<i class=\"fa fa-leaf\"></i> Épilation à la Cire",
    "tab_eyelash": "<i class=\"fa fa-eye\"></i> Cils & Sourcils",
    "book_now_caps": "RÉSERVER MAINTENANT",
    "btn_ritual_details": "Détails du rituel",
    "vip_choice": "Choix VIP",
    "reviews_title": "TÉMOIGNAGES DE NOS CLIENTS",
    "reviews_sub": "Plus de 15 000 voyageurs du monde entier recommandent Ivy Luxe Spa 48 Ha Trung.",
    "rev1_quote": "“Avant de partir pour l'aéroport, nous avons fait une halte au 48 Ha Trung. Le personnel est très attentionné et les massages sont exceptionnels ! Le massage aux huiles et le spa capillaire nous ont totalement ressourcés.”",
    "rev1_name": "Yujin Kim",
    "rev1_meta": "Corée du Sud ● Couple",
    "rev2_quote": "“Après 3 semaines de voyage professionnel, le Vietnam était ma dernière étape ! J'ai réservé un massage aux pierres chaudes. Confirmation immédiate, cadre intime et technicienne très qualifiée.”",
    "rev2_name": "Fenny Angela",
    "rev2_meta": "Indonésie / États-Unis ● Voyageuse solo",
    "rev3_quote": "“L'adresse au 48 Ha Trung est très facile à trouver. L'ambiance est feutrée et authentique, typique du vieux quartier. Le rituel de l'eau chaude et les pierres chaudes étaient divins !”",
    "rev3_name": "Nguyen Minh Chau",
    "rev3_meta": "Hanoï ● En famille",
    "guests_title": "GALERIE PHOTOS DE NOS CLIENTS",
    "guests_sub": "Moments précieux de sérénité et de partage de nos visiteurs du monde entier.",
    "guests_btn_more": "VOIR TOUTES LES PHOTOS",
    "footer_location_title": "ADRESSE UNIQUE",
    "footer_hq_title": "IVY LUXE SPA (Maison Mère)",
    "footer_addr_line": "Adresse : 48 Ha Trung, Hoan Kiem, Hanoï <a href=\"https://maps.google.com/?q=48+Ha+Trung+Hoan+Kiem+Hanoi\" target=\"_blank\" rel=\"noopener\">(Voir sur la carte)</a>",
    "footer_hotline_prefix": "Service 24/7 / WhatsApp / Zalo :",
    "footer_location_desc": "Idéalement situé au cœur du vieux quartier de Hanoï, à quelques pas du lac Hoan Kiem et du marché Hang Da.",
    "footer_about_title": "À PROPOS D'IVY LUXE SPA",
    "footer_about_desc": "Ivy Luxe Spa est l'adresse bien-être de référence dans le vieux quartier de Hanoï. Un cadre indochinois élégant, des praticiennes expertes et des herbes médicinales naturelles.",
    "footer_quicklinks_title": "LIENS UTILES",
    "footer_link_home": "Accueil",
    "footer_link_menu": "Menu & Tarifs",
    "footer_link_promotions": "Promotions Spéciales",
    "footer_link_locations": "Notre Espace au 48 Ha Trung",
    "footer_link_reviews": "Avis Clients",
    "footer_link_book": "Réserver en Ligne",
    "footer_hours_title": "HORAIRES D'OUVERTURE",
    "footer_hours_desc": "Ouvert tous les jours de<br><strong style=\"color:#FFF; font-size:1.05rem;\">10h00 à 22h00</strong><br>Réservation préalable recommandée.",
    "footer_follow_title": "SUIVEZ-NOUS",
    "footer_payment_title": "MODES DE PAIEMENT",
    "footer_copyright": "Tous droits réservés 2026 © <strong>IVY LUXE SPA</strong> (48 Ha Trung, Hoan Kiem, Hanoï).",
    "modal_title": "RÉSERVATION EN LIGNE - IVY LUXE SPA",
    "modal_name_label": "Nom & Prénom",
    "modal_name_ph": "Exemple : Jean Dupont",
    "modal_phone_label": "Téléphone / WhatsApp",
    "modal_phone_ph": "+33 6 12 34 56 78",
    "modal_branch_label": "Établissement",
    "modal_service_label": "Soin Choisi",
    "modal_date_label": "Date Souhaitée",
    "modal_time_label": "Heure Souhaitée",
    "modal_guests_label": "Nombre d'Invités",
    "modal_notes_label": "Demandes Particulières",
    "modal_notes_ph": "Pression du massage, cabine privée, préférences...",
    "modal_notice": "<i class=\"fa fa-info-circle\" style=\"color:#D4AF37;\"></i> Adresse de l'institut : <strong>48 Ha Trung, Hoan Kiem, Hanoï</strong>. Assistance 24/7 : <strong>098 9713660</strong>.",
    "modal_btn_submit": "CONFIRMER MA RÉSERVATION",
    "board_modal_title": "CARTE OFFICIELLE DES SOINS - IVY LUXE SPA",
    "booking_success": "RÉSERVATION CONFIRMÉE AVEC SUCCÈS !",
    "booking_success_desc": "Merci d'avoir choisi IVY LUXE SPA. Notre conciergerie vous contactera dans les 5 minutes pour confirmation.",
    "nav_healing_music": "Musique Thérapeutique",
    "zen_section_tag": "SONOTHÉRAPIE NATURELLE",
    "zen_section_title": "ESPACE SONORE & MÉDITATION ZEN",
    "zen_section_desc": "Plongez dans les vibrations thérapeutiques 432Hz de Deep Healing Vibes pour apaiser le corps et l'esprit tout au long de votre soin à Ivy Luxe Spa.",
    "zen_channel_sub": "Chaîne Officielle de Sonothérapie & Méditation",
    "zen_visit_channel": "Visiter Deep Healing Vibes",
    "zen_tracklist_title": "Pistes Thérapeutiques 432Hz",
    "zen_track_count": "4 Morceaux Rares",
    "zen_btn_play_now": "Écouter",
    "zen_btn_playing": "Lecture en cours...",
    "zen_player_min_hint": "Audio Zen",
    "zen_toast_playing": "Lecture de la musique thérapeutique",
    "zen_toast_paused": "Musique zen en pause"
,
    // Exclusive Complimentary Perks
    "perks_badge": "<i class=\"fa fa-gift\"></i> AVANTAGES EXCLUSIFS OFFERTS",
    "perks_heading": "Privilèges Exclusifs Pour les Clients d'IVY LUXE SPA",
    "perks_sub": "L'expérience de relaxation la plus attentionnée, pratique et sereine au cœur du Vieux Quartier de Hanoï",
    "perk1_tag": "SERVICE 100% GRATUIT",
    "perk1_title": "Douche Chaude Gratuite",
    "perk1_desc": "Douches chaudes et froides privatives et impeccables, équipées de serviettes 5 étoiles, sèche-cheveux et gel douche aux herbes fraîches avant ou après le soin.",
    "perk2_tag": "SÛR & PRATIQUE",
    "perk2_title": "Consigne à Bagages Gratuite",
    "perk2_desc": "Déposez vos valises et sacs à dos en toute sécurité au spa pour flâner librement dans le Vieux Quartier, au lac Hoan Kiem ou avant votre vol. <em>(Objets de valeur non acceptés)</em>.",
    "perk3_tag": "ÉCONOMIE MAXIMALE",
    "perk3_title": "Assistance Transfert Aéroport Économique",
    "perk3_desc": "Assistance pour réserver un véhicule privé (4, 7 ou 16 places) pour l'aéroport de Noi Bai, ponctuel, courtois et bien plus économique que les taxis traditionnels.",
    "menu_perks_title": "AVANTAGES GRATUITS CHEZ IVY LUXE SPA :",
    "menu_perk_shower": "<i class=\"fa fa-shower\" style=\"color:#D4AF37;\"></i> <strong>Douche gratuite</strong>",
    "menu_perk_luggage": "<i class=\"fa fa-suitcase\" style=\"color:#D4AF37;\"></i> <strong>Consigne gratuite</strong> <small style=\"color:#64748B;\">(hors objets de valeur)</small>",
    "menu_perk_car": "<i class=\"fa fa-car\" style=\"color:#D4AF37;\"></i> <strong>Navette aéroport pas cher</strong>",
    "modal_perks_title": "<i class=\"fa fa-gift\"></i> VOS PRIVILÈGES GRATUITS :",
    "modal_perk_shower": "<i class=\"fa fa-shower\" style=\"color:#ECC876; width:18px;\"></i> <strong>Douche chaude gratuite</strong> avant ou après votre soin",
    "modal_perk_luggage": "<i class=\"fa fa-suitcase\" style=\"color:#ECC876; width:18px;\"></i> <strong>Consigne à bagages gratuite</strong> <em>(hors objets de valeur)</em>",
    "modal_perk_car": "<i class=\"fa fa-car\" style=\"color:#ECC876; width:18px;\"></i> <strong>Aide à la réservation de navette aéroport</strong> (Noi Bai)"

  }
};

  // =========================================================================
  // 2. SPA MENU COMPREHENSIVE DATA (OFFICIAL IVY LUXE SPA MENU - ALL LANGUAGES)
  // =========================================================================
  const spaMenuData = window.IVY_MENU; // dữ liệu ở js/menu-data.js

  // =========================================================================
  // CURRENCY FORMATTER HELPER
  // =========================================================================
  function formatPrice(vndPrice, maxPrice = null) {
    if (state.currency === 'usd') {
      const usd = Math.round(vndPrice / state.rateVNDtoUSD);
      if (maxPrice && maxPrice > vndPrice) {
        const usdMax = Math.round(maxPrice / state.rateVNDtoUSD);
        return `$${usd} - $${usdMax}`;
      }
      return `$${usd}`;
    }
    const fmt = new Intl.NumberFormat('vi-VN');
    if (maxPrice && maxPrice > vndPrice) {
      return `${fmt.format(vndPrice)} - ${fmt.format(maxPrice)} ₫`;
    }
    return fmt.format(vndPrice) + ' ₫';
  }

  // =========================================================================
  // RENDER SPA MENU ITEMS (100% PURE IN ACTIVE LANGUAGE)
  // =========================================================================
  function renderSpaMenu() {
    const grid = document.getElementById('menu-items-grid');
    if (!grid) return;

    const items = spaMenuData[state.activeMenuTab] || spaMenuData.combos;
    const lang = state.language;
    const t = translations[lang] || translations.vi;

    grid.innerHTML = items.map(item => {
      const name = item['name_' + lang] || item.name_en || item.name_vi;
      const desc = item['desc_' + lang] || item.desc_en || item.desc_vi;
      const duration = item['duration_' + lang] || item.duration_en || item.duration_vi;

      return `
        <div class="menu-item-card" data-service-id="${item.id}">
          <img src="${item.image}" alt="${name}" class="menu-item-thumb" loading="lazy">
          <div class="menu-item-content">
            <div class="menu-item-header">
              <h3 class="menu-item-name">${name}</h3>
              <span class="menu-item-price">${formatPrice(item.price_vnd, item.price_vnd_max)}</span>
            </div>
            <div class="menu-item-meta">
              <span><i class="fa fa-clock-o"></i> ${duration}</span>
              ${item.popular ? `<span style="color:#D4AF37;font-weight:700;"><i class="fa fa-star"></i> ${t.vip_choice || 'VIP'}</span>` : ''}
            </div>
            <p class="menu-item-desc">${desc}</p>
            <div class="menu-item-actions">
              <button class="btn-book-service-now js-quick-book" data-service="${encodeURIComponent(name)}" data-price="${formatPrice(item.price_vnd, item.price_vnd_max)}">
                <i class="fa fa-calendar-check-o"></i> ${t.book_now_caps}
              </button>
              <span class="btn-service-details js-view-details" data-service-id="${item.id}">
                ${t.btn_ritual_details}
              </span>
            </div>
          </div>
        </div>
      `;
    }).join('');

    // Attach click listeners to book buttons
    grid.querySelectorAll('.js-quick-book').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const serviceName = decodeURIComponent(e.currentTarget.getAttribute('data-service'));
        openBookingModalWithService(serviceName);
      });
    });

    grid.querySelectorAll('.js-view-details').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.getAttribute('data-service-id');
        showServiceDetailsModal(id);
      });
    });
  }

  function showServiceDetailsModal(id) {
    let found = null;
    for (const cat in spaMenuData) {
      const match = spaMenuData[cat].find(s => s.id === id);
      if (match) { found = match; break; }
    }
    if (!found) return;
    const lang = state.language;
    const name = found['name_' + lang] || found.name_en || found.name_vi;
    if (typeof window.ivyOpenComboDetails === 'function' && window.ivyOpenComboDetails(id, lang, () => openBookingModalWithService(name))) return;
    openBookingModalWithService(name);
  }

  // =========================================================================
  // UPDATE PAGE LANGUAGE (COMPREHENSIVE TRANSLATOR)
  // =========================================================================
  function updatePageLanguage() {
    const lang = state.language;
    const t = translations[lang] || translations.vi;

    // Update document title
    if (t.doc_title) {
      document.title = t.doc_title;
    }
    document.documentElement.lang = lang;

    // Update all text nodes with data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (t[key]) {
        el.textContent = t[key];
      }
    });

    // Update all HTML nodes with data-i18n-html
    document.querySelectorAll('[data-i18n-html]').forEach(el => {
      const key = el.getAttribute('data-i18n-html');
      if (t[key]) {
        el.innerHTML = t[key];
      }
    });

    // Update all placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (t[key]) {
        el.placeholder = t[key];
      }
    });

    // Synchronize select dropdown for language
    const langSelect = document.getElementById('lang-select');
    if (langSelect && langSelect.value !== lang) {
      langSelect.value = lang;
    }

    // Synchronize mobile language button & strip
    const langMeta = languageConfig[lang] || languageConfig.vi;
    const mobCurrentFlag = document.getElementById('mobile-current-flag');
    const mobCurrentName = document.getElementById('mobile-current-name');
    if (mobCurrentFlag) mobCurrentFlag.textContent = langMeta.flag;
    if (mobCurrentName) mobCurrentName.textContent = langMeta.code;

    // Update active class on mobile flag pills
    document.querySelectorAll('.mobile-flag-pill').forEach(pill => {
      if (pill.getAttribute('data-lang') === lang) {
        pill.classList.add('active');
      } else {
        pill.classList.remove('active');
      }
    });

    // Đồng bộ lá cờ trên nút chọn ngôn ngữ ở header (máy tính) và nút nổi (điện thoại)
    [['hl-current-flag', 'hl-current-code'], ['fl-current-flag', 'fl-current-code']].forEach(([flagId, codeId]) => {
      const flagEl = document.getElementById(flagId);
      const codeEl = document.getElementById(codeId);
      if (flagEl) flagEl.textContent = langMeta.flag;
      if (codeEl) codeEl.textContent = langMeta.code;
    });
    document.querySelectorAll('.hl-opt-item, .fl-opt-item').forEach(opt => {
      const isActive = opt.getAttribute('data-lang') === lang;
      opt.classList.toggle('active', isActive);
      if (opt.classList.contains('fl-opt-item')) opt.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });
    document.documentElement.lang = lang;

    // Update active class on mobile dropdown popover list
    document.querySelectorAll('.mobile-lang-list li').forEach(item => {
      if (item.getAttribute('data-lang') === lang) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });

    // Update guest dropdowns
    updateGuestOptions();

    // Update time dropdowns
    updateTimeOptions();

    // Update service select in modal
    updateModalServiceOptions();

    // Re-render menu cards in the active language
    renderSpaMenu();

    // Ưu đãi Admin đăng (đổi ngôn ngữ hiển thị)
    renderLivePromos();

    // Re-render Zen sound cards & track display
    if (typeof renderZenSectionTrackCards === 'function') {
      renderZenSectionTrackCards();
    }
    if (typeof updateZenTrackDisplay === 'function') {
      updateZenTrackDisplay();
    }

    // Dịch nốt mọi chữ không gắn data-i18n (js/i18n-en.js); 'vi' thì trả lại chữ gốc
    if (typeof window.ivyAutoTranslate === 'function') window.ivyAutoTranslate(lang);

    // Save language preference
    localStorage.setItem('ivy_lang', lang);
  }

  // Populate guest counts according to language with extended range and custom input
  function updateGuestOptions() {
    const lang = state.language;
    const guestData = {
      vi: [
        { val: '1', label: '1 Khách' },
        { val: '2', label: '2 Khách (Đi 2 người / Cặp đôi)' },
        { val: '3', label: '3 Khách' },
        { val: '4', label: '4 Khách (Nhóm gia đình / bạn bè)' },
        { val: '5', label: '5 Khách' },
        { val: '6', label: '6 Khách' },
        { val: '7', label: '7 Khách' },
        { val: '8', label: '8 Khách' },
        { val: '9', label: '9 Khách' },
        { val: '10', label: '10 Khách' },
        { val: '11-15', label: 'Đoàn 11 - 15 Khách' },
        { val: '16-20', label: 'Đoàn 16 - 20 Khách' },
        { val: '20+', label: 'Đoàn lớn trên 20 Khách (Ưu đãi đặc biệt)' },
        { val: 'custom', label: '✦ Tự nhập số lượng khách khác...' }
      ],
      en: [
        { val: '1', label: '1 Guest' },
        { val: '2', label: '2 Guests (Couple / Pair)' },
        { val: '3', label: '3 Guests' },
        { val: '4', label: '4 Guests (Family / Friends)' },
        { val: '5', label: '5 Guests' },
        { val: '6', label: '6 Guests' },
        { val: '7', label: '7 Guests' },
        { val: '8', label: '8 Guests' },
        { val: '9', label: '9 Guests' },
        { val: '10', label: '10 Guests' },
        { val: '11-15', label: 'Group 11 - 15 Guests' },
        { val: '16-20', label: 'Group 16 - 20 Guests' },
        { val: '20+', label: 'Large Group 20+ Guests (Special Offer)' },
        { val: 'custom', label: '✦ Enter custom guest count...' }
      ],
      zh: [
        { val: '1', label: '1位贵宾' },
        { val: '2', label: '2位贵宾 (情侣 / 双人同行)' },
        { val: '3', label: '3位贵宾' },
        { val: '4', label: '4位贵宾 (家庭 / 亲友聚会)' },
        { val: '5', label: '5位贵宾' },
        { val: '6', label: '6位贵宾' },
        { val: '7', label: '7位贵宾' },
        { val: '8', label: '8位贵宾' },
        { val: '9', label: '9位贵宾' },
        { val: '10', label: '10位贵宾' },
        { val: '11-15', label: '11 - 15人团队' },
        { val: '16-20', label: '16 - 20人团队' },
        { val: '20+', label: '20人以上大团队 (尊享特惠)' },
        { val: 'custom', label: '✦ 自定义输入人数...' }
      ],
      ja: [
        { val: '1', label: '1名様' },
        { val: '2', label: '2名様 (ペア / カップル)' },
        { val: '3', label: '3名様' },
        { val: '4', label: '4名様 (グループ / ご家族)' },
        { val: '5', label: '5名様' },
        { val: '6', label: '6名様' },
        { val: '7', label: '7名様' },
        { val: '8', label: '8名様' },
        { val: '9', label: '9名様' },
        { val: '10', label: '10名様' },
        { val: '11-15', label: '団体 11〜15名様' },
        { val: '16-20', label: '団体 16〜20名様' },
        { val: '20+', label: '大型団体 20名様以上 (特別割引)' },
        { val: 'custom', label: '✦ 人数を自由入力...' }
      ],
      ko: [
        { val: '1', label: '1인' },
        { val: '2', label: '2인 (커플 / 2인 동반)' },
        { val: '3', label: '3인' },
        { val: '4', label: '4인 (가족 / 친구 모임)' },
        { val: '5', label: '5인' },
        { val: '6', label: '6인' },
        { val: '7', label: '7인' },
        { val: '8', label: '8인' },
        { val: '9', label: '9인' },
        { val: '10', label: '10인' },
        { val: '11-15', label: '단체 11 ~ 15인' },
        { val: '16-20', label: '단체 16 ~ 20인' },
        { val: '20+', label: '20인 이상 단체 (특별 우대)' },
        { val: 'custom', label: '✦ 인원 직접 입력...' }
      ],
      ru: [
        { val: '1', label: '1 Гость' },
        { val: '2', label: '2 Гостя (Пара)' },
        { val: '3', label: '3 Гостя' },
        { val: '4', label: '4 Гостя (Семья / Друзья)' },
        { val: '5', label: '5 Гостей' },
        { val: '6', label: '6 Гостей' },
        { val: '7', label: '7 Гостей' },
        { val: '8', label: '8 Гостей' },
        { val: '9', label: '9 Гостей' },
        { val: '10', label: '10 Гостей' },
        { val: '11-15', label: 'Группа 11 - 15 Гостей' },
        { val: '16-20', label: 'Группа 16 - 20 Гостей' },
        { val: '20+', label: 'Большая группа 20+ (Спецпредложение)' },
        { val: 'custom', label: '✦ Ввести другое количество...' }
      ],
      fr: [
        { val: '1', label: '1 Invité' },
        { val: '2', label: '2 Invités (Couple / Duo)' },
        { val: '3', label: '3 Invités' },
        { val: '4', label: '4 Invités (Famille / Amis)' },
        { val: '5', label: '5 Invités' },
        { val: '6', label: '6 Invités' },
        { val: '7', label: '7 Invités' },
        { val: '8', label: '8 Invités' },
        { val: '9', label: '9 Invités' },
        { val: '10', label: '10 Invités' },
        { val: '11-15', label: 'Groupe 11 - 15 Invités' },
        { val: '16-20', label: 'Groupe 16 - 20 Invités' },
        { val: '20+', label: 'Grand groupe 20+ (Offre Spéciale)' },
        { val: 'custom', label: '✦ Saisir un nombre personnalisé...' }
      ]
    };

    const list = guestData[lang] || guestData.vi;

    const heroGuests = document.getElementById('hero-select-guests');
    if (heroGuests) {
      const cur = heroGuests.value || '2';
      heroGuests.innerHTML = list.map(item => `<option value="${item.val}" ${item.val === cur ? 'selected' : ''}>${item.label}</option>`).join('');
    }

    const modalGuests = document.getElementById('modal-guest-count');
    if (modalGuests) {
      const cur = modalGuests.value || '2';
      modalGuests.innerHTML = list.map(item => `<option value="${item.val}" ${item.val === cur ? 'selected' : ''}>${item.label}</option>`).join('');
    }

    // Update custom input placeholders per language
    const placeholders = {
      vi: 'Nhập số khách (VD: 8, 15, 30...)',
      en: 'Enter guest count (e.g. 8, 15, 30...)',
      zh: '输入人数 (例: 8, 15, 30...)',
      ja: '人数を入力 (例: 8, 15, 30...)',
      ko: '인원수 입력 (예: 8, 15, 30...)',
      ru: 'Количество гостей (напр. 8, 15...)',
      fr: "Nombre d'invités (ex: 8, 15...)"
    };
    const ph = placeholders[lang] || placeholders.vi;
    const heroCustomGuests = document.getElementById('hero-custom-guests');
    if (heroCustomGuests) heroCustomGuests.placeholder = ph;
    const modalCustomGuests = document.getElementById('modal-custom-guests');
    if (modalCustomGuests) modalCustomGuests.placeholder = ph;
  }

  // Populate appointment times according to language (Full 30-min slots from 09:00 to 22:30 + Custom time)
  function updateTimeOptions() {
    const lang = state.language;
    const timeSlots = [
      '09:00', '09:30',
      '10:00', '10:30', '11:00', '11:30', '12:00', '12:30',
      '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
      '16:00', '16:30', '17:00', '17:30', '18:00', '18:30',
      '19:00', '19:30', '20:00', '20:30', '21:00', '21:30',
      '22:00', '22:30'
    ];

    const customLabels = {
      vi: '✦ Chọn giờ khác theo yêu cầu...',
      en: '✦ Custom time (choose any hour)...',
      zh: '✦ 自定义预约时间...',
      ja: '✦ その他のご希望時間...',
      ko: '✦ 기타 원하는 시간 직접 선택...'
    };

    function formatTimeSlot(t) {
      const [hStr, mStr] = t.split(':');
      const h = parseInt(hStr, 10);
      if (lang === 'vi') {
        const period = h < 12 ? 'Sáng' : (h < 13 ? 'Trưa' : (h < 18 ? 'Chiều' : 'Tối'));
        return `${t} ${period}`;
      } else if (lang === 'en') {
        const ampm = h < 12 ? 'AM' : 'PM';
        const displayH = h % 12 === 0 ? 12 : h % 12;
        const padH = displayH < 10 ? `0${displayH}` : `${displayH}`;
        return `${padH}:${mStr} ${ampm}`;
      } else if (lang === 'zh') {
        const period = h < 12 ? '上午' : (h < 13 ? '中午' : (h < 18 ? '下午' : '晚上'));
        const displayH = h > 12 ? h - 12 : h;
        const padH = displayH < 10 ? `0${displayH}` : `${displayH}`;
        return `${period} ${padH}:${mStr}`;
      } else if (lang === 'ja') {
        const period = h < 12 ? '午前' : (h < 13 ? '昼' : (h < 18 ? '午後' : '夜'));
        const displayH = h > 12 ? h - 12 : h;
        const padH = displayH < 10 ? `0${displayH}` : `${displayH}`;
        return `${period} ${padH}:${mStr}`;
      } else if (lang === 'ko') {
        const period = h < 12 ? '오전' : (h < 13 ? '낮' : (h < 18 ? '오후' : '저녁'));
        const displayH = h > 12 ? h - 12 : h;
        const padH = displayH < 10 ? `0${displayH}` : `${displayH}`;
        return `${period} ${padH}:${mStr}`;
      }
      return t;
    }

    const customLabel = customLabels[lang] || customLabels.vi;

    function buildOptions(currentVal) {
      const cur = currentVal || '14:30';
      const slotOpts = timeSlots.map(t => `<option value="${t}" ${t === cur ? 'selected' : ''}>${formatTimeSlot(t)}</option>`).join('');
      const customOpt = `<option value="custom" ${cur === 'custom' ? 'selected' : ''}>${customLabel}</option>`;
      return slotOpts + customOpt;
    }

    const heroTime = document.getElementById('hero-select-time');
    if (heroTime) {
      const cur = heroTime.value || '14:30';
      heroTime.innerHTML = buildOptions(cur);
    }

    const modalTime = document.getElementById('modal-book-time');
    if (modalTime) {
      const cur = modalTime.value || '14:30';
      modalTime.innerHTML = buildOptions(cur);
    }

    // Update toggle button labels per language
    const modeBtnLabels = {
      vi: { custom: 'Tùy chọn', list: 'Danh sách' },
      en: { custom: 'Custom', list: 'List' },
      zh: { custom: '自定义', list: '列表' },
      ja: { custom: '自由指定', list: '一覧' },
      ko: { custom: '직접입력', list: '목록' }
    };
    const bLabels = modeBtnLabels[lang] || modeBtnLabels.vi;

    const heroCustom = document.getElementById('hero-custom-time');
    const heroBtnText = document.getElementById('hero-time-mode-text');
    if (heroBtnText) {
      const isCustom = heroCustom && heroCustom.style.display !== 'none';
      heroBtnText.textContent = isCustom ? bLabels.list : bLabels.custom;
    }

    const modalCustom = document.getElementById('modal-custom-time');
    const modalBtnText = document.getElementById('modal-time-mode-text');
    if (modalBtnText) {
      const isCustom = modalCustom && modalCustom.style.display !== 'none';
      modalBtnText.textContent = isCustom ? bLabels.list : bLabels.custom;
    }
  }

  // Populate modal service options in active language
  function updateModalServiceOptions() {
    const modalService = document.getElementById('modal-service-select');
    if (!modalService) return;

    const lang = state.language;
    const curVal = modalService.value;
    let optionsHtml = '';

    // Group by category
    const catTitles = {
      combos: { vi: '--- IVY SPECIAL COMBOS ---', en: '--- IVY SPECIAL COMBOS ---', zh: '--- IVY 特惠组合套餐 ---', ja: '--- IVY スペシャルコンボ ---', ko: '--- IVY 스페셜 콤보 ---' },
      packages: { vi: '--- GÓI HOÀNG GIA, GỘI DƯỠNG SINH, CHĂM SÓC MẶT & BODY SCRUB ---', en: '--- ROYAL PACKAGES, NOURISHING SHAMPOO, FACIAL & BODY SCRUB ---', zh: '--- 皇室套餐、养生洗发、面部护理与身体磨砂 ---', ja: '--- パッケージ・ヘッドスパ・フェイシャル＆スクラブ ---', ko: '--- 로열 패키지, 영양 헤드스파, 페이셜 & 바디 스크럽 ---' },
      massage: { vi: '--- BODY MASSAGE ---', en: '--- BODY MASSAGE ---', zh: '--- 身体按摩 ---', ja: '--- ボディマッサージ ---', ko: '--- 바디 마사지 ---' },
      foot: { vi: '--- FOOT MASSAGE & TRỊ LIỆU CHÂN ---', en: '--- FOOT MASSAGE & REFLEXOLOGY ---', zh: '--- 养生足疗与足部护理 ---', ja: '--- フットマッサージ＆足裏ケア ---', ko: '--- 풋 마사지 & 발 관리 ---' },
      nails: { vi: '--- DỊCH VỤ NAIL ---', en: '--- NAIL SERVICES ---', zh: '--- 美甲服务 ---', ja: '--- ネイルサービス ---', ko: '--- 네일 서비스 ---' },
      waxing: { vi: '--- WAXING TRIỆT LÔNG ---', en: '--- WAXING SERVICES ---', zh: '--- 脱毛服务 ---', ja: '--- ワックス脱毛 ---', ko: '--- 왁싱 제모 ---' },
      eyelash: { vi: '--- NỐI MI & MÀY ---', en: '--- EYELASH & EYEBROW ---', zh: '--- 美睫与美眉 ---', ja: '--- まつげ＆眉ケア ---', ko: '--- 속눈썹 & 눈썹 ---' }
    };

    for (const cat in spaMenuData) {
      const catLabel = (catTitles[cat] && catTitles[cat][lang]) || `--- ${cat.toUpperCase()} ---`;
      optionsHtml += `<optgroup label="${catLabel}">`;
      spaMenuData[cat].forEach(item => {
        const name = item['name_' + lang] || item.name_en || item.name_vi;
        const priceStr = formatPrice(item.price_vnd, item.price_vnd_max);
        optionsHtml += `<option value="${name} (${priceStr})" data-price="${item.price_vnd || 0}" data-name="${String(name).replace(/"/g, '&quot;')}">${name} (${priceStr})</option>`;
      });
      optionsHtml += `</optgroup>`;
    }

    modalService.innerHTML = optionsHtml;
    if (curVal) {
      // Try to preserve previous selection if possible
      const options = Array.from(modalService.options);
      const match = options.find(opt => opt.value === curVal || opt.text.includes(curVal.split(' (')[0]));
      if (match) modalService.value = match.value;
    }
  }

  // =========================================================================
  // LANGUAGE SWITCHER & CONFIGURATION (VI, EN, ZH, JA, KO, RU, FR)
  // Complete synchronization across Desktop & Mobile UI with Flags
  // =========================================================================
  // 1. Desktop select change
  const langSelect = document.getElementById('lang-select');
  if (langSelect) {
    langSelect.addEventListener('change', (e) => {
      const newLang = e.target.value;
      state.language = newLang;
      updatePageLanguage();
      const conf = languageConfig[newLang] || { name: newLang.toUpperCase(), flag: '🌐' };
      showToast(newLang === 'vi' ? `${conf.flag} Ngôn ngữ: ${conf.name}` : `${conf.flag} Language: ${conf.name}`);
    });
  }

  // 2. Mobile Header Language Button & Popover Toggle
  const mobileLangWrap = document.querySelector('.mobile-header-lang-wrap');
  const mobileLangBtn = document.getElementById('mobile-lang-btn');
  if (mobileLangBtn && mobileLangWrap) {
    mobileLangBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      mobileLangWrap.classList.toggle('open');
    });
  }

  // Close mobile language popover when clicking anywhere outside
  document.addEventListener('click', (e) => {
    if (mobileLangWrap && !mobileLangWrap.contains(e.target)) {
      mobileLangWrap.classList.remove('open');
    }
  });

  // 3. Mobile Popover List items click
  document.querySelectorAll('.mobile-lang-list li').forEach(item => {
    item.addEventListener('click', () => {
      const newLang = item.getAttribute('data-lang');
      if (newLang && languageConfig[newLang]) {
        state.language = newLang;
        updatePageLanguage();
        if (mobileLangWrap) mobileLangWrap.classList.remove('open');
        const conf = languageConfig[newLang];
        showToast(newLang === 'vi' ? `${conf.flag} Ngôn ngữ: ${conf.name}` : `${conf.flag} Language: ${conf.name}`);
      }
    });
  });

  // 4. Mobile Quick Language Strip Pills click
  document.querySelectorAll('.mobile-flag-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      const newLang = pill.getAttribute('data-lang');
      if (newLang && languageConfig[newLang]) {
        state.language = newLang;
        updatePageLanguage();
        const conf = languageConfig[newLang];
        showToast(newLang === 'vi' ? `${conf.flag} Ngôn ngữ: ${conf.name}` : `${conf.flag} Language: ${conf.name}`);
      }
    });
  });

  // =========================================================================
  // CURRENCY SWITCHER (VND / USD)
  // =========================================================================
  const currencyBtns = document.querySelectorAll('.currency-pill-btn');
  currencyBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      currencyBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.currency = btn.getAttribute('data-currency');
      renderSpaMenu();
      updatePromoPrices();
      updateModalServiceOptions();
      showToast(`Currency: ${state.currency.toUpperCase()}`);
    });
  });

  function updatePromoPrices() {
    document.querySelectorAll('.promo-price-current').forEach(el => {
      const vnd = parseInt(el.getAttribute('data-vnd') || '0', 10);
      if (vnd) el.textContent = formatPrice(vnd);
    });
    document.querySelectorAll('.promo-price-original').forEach(el => {
      const vnd = parseInt(el.getAttribute('data-vnd') || '0', 10);
      if (vnd) el.textContent = formatPrice(vnd);
    });
  }

  // =========================================================================
  // SPA MENU TABS
  // =========================================================================
  const menuTabBtns = document.querySelectorAll('.menu-tab-btn');
  menuTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      menuTabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.activeMenuTab = btn.getAttribute('data-tab');
      renderSpaMenu();
    });
  });

  // =========================================================================
  // 3D CARD PERSPECTIVE TILT WITH MOUSE POSITION & GLOSS
  // =========================================================================
  function init3DTilt() {
    const cards = document.querySelectorAll('.suite-3d-card, .promo-card, .intro-feature-card, .promo-orient-card, .location-orient-card');
    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -6;
        const rotateY = ((x - centerX) / centerX) * 6;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
      });
    });
  }

  // =========================================================================
  // MODAL BOOKING ENGINE
  // =========================================================================
  function getBookingModal() {
    return document.getElementById('booking-modal');
  }

  // Ghi nhận khách đã tự đổi số khách ở thanh đặt lịch đầu trang (mặc định ở đó là 2)
  document.getElementById('hero-select-guests')?.addEventListener('change', (e) => { e.target.dataset.touched = '1'; });

  function openBookingModalWithService(serviceName = '', listedPrice = 0) {
    const modal = getBookingModal();
    if (modal) {
      modal.classList.add('active');
      modal.style.display = 'flex';
      modal.style.opacity = '1';
      document.body.style.overflow = 'hidden';
    } else {
      const box = document.getElementById('booking-form-box');
      if (box) box.scrollIntoView({ behavior: 'smooth' });
    }

    // Synchronize values from Hero booking bar into Modal
    const heroDate = document.getElementById('hero-select-date')?.value;
    const heroTimeSelect = document.getElementById('hero-select-time');
    const heroCustomTime = document.getElementById('hero-custom-time');
    const heroIsCustom = heroCustomTime && heroCustomTime.style.display !== 'none';
    const heroTimeVal = heroIsCustom ? (heroCustomTime.value || '14:30') : (heroTimeSelect?.value || '14:30');
    const heroGuests = document.getElementById('hero-select-guests')?.value;
    const heroLocation = document.getElementById('hero-select-location')?.value;

    const modalDate = document.getElementById('modal-book-date');
    const modalTimeSelect = document.getElementById('modal-book-time');
    const modalCustomTime = document.getElementById('modal-custom-time');
    const modalTimeModeText = document.getElementById('modal-time-mode-text');
    const modalGuests = document.getElementById('modal-guest-count');
    const modalBranch = document.getElementById('modal-branch-select');

    if (heroDate && modalDate) {
      modalDate.value = heroDate;
      modalDate.min = new Date().toISOString().split('T')[0];
    } else if (modalDate && !modalDate.value) {
      const today = new Date().toISOString().split('T')[0];
      modalDate.value = today;
      modalDate.min = today;
    }

    if (modalTimeSelect) {
      if (heroIsCustom && heroCustomTime?.value) {
        modalTimeSelect.style.display = 'none';
        if (modalCustomTime) {
          modalCustomTime.style.display = 'block';
          modalCustomTime.value = heroCustomTime.value;
        }
        if (modalTimeModeText) modalTimeModeText.textContent = getModeLabel('list');
      } else if (heroTimeVal && heroTimeVal !== 'custom') {
        modalTimeSelect.style.display = 'block';
        modalTimeSelect.value = heroTimeVal;
        if (modalCustomTime) modalCustomTime.style.display = 'none';
        if (modalTimeModeText) modalTimeModeText.textContent = getModeLabel('custom');
      }
    }

    const heroGuestsSelect = document.getElementById('hero-select-guests');
    const heroCustomGuests = document.getElementById('hero-custom-guests');
    const heroIsGuestCustom = heroCustomGuests && heroCustomGuests.style.display !== 'none';
    const heroGuestVal = heroIsGuestCustom ? heroCustomGuests.value : heroGuestsSelect?.value;

    const modalGuestsSelect = document.getElementById('modal-guest-count');
    const modalCustomGuests = document.getElementById('modal-custom-guests');
    const modalGuestModeText = document.getElementById('modal-guest-mode-text');

    // Số khách: luôn mở ô tự nhập số người; mặc định 1 (trừ khi khách đã tự chọn số khách ở thanh đặt lịch đầu trang)
    if (modalGuestsSelect && modalCustomGuests) {
      let n = 1;
      if (heroIsGuestCustom && heroCustomGuests?.value) n = parseInt(heroCustomGuests.value, 10) || 1;
      else if (heroGuestsSelect && heroGuestsSelect.dataset.touched && heroGuestVal && heroGuestVal !== 'custom') n = parseInt(heroGuestVal, 10) || 1;
      modalGuestsSelect.style.display = 'none';
      modalCustomGuests.style.display = 'block';
      modalCustomGuests.value = String(Math.max(1, n));
      if (modalGuestModeText) modalGuestModeText.textContent = getModeLabel('list');
    }
    if (heroLocation && modalBranch) modalBranch.value = heroLocation;

    if (serviceName) {
      const serviceInput = document.getElementById('modal-service-select');
      if (serviceInput) {
        const options = Array.from(serviceInput.options);
        // Bỏ phần giá ở cuối: "(800.000 ₫)", "(800.000 VNĐ)", "(800.000đ)"
        const bare = serviceName.replace(/\s*\([^()]*(₫|đ|vnđ|vnd)\)\s*$/i, '').trim();
        // Dịch vụ trong Bảng giá (tên ở bất kỳ ngôn ngữ nào, không phân biệt hoa thường) → lựa chọn đúng ở ngôn ngữ đang hiển thị
        const norm = (x) => String(x || '').normalize('NFC').toLowerCase().replace(/\s+/g, ' ').trim();
        let shown = '';
        for (const cat in spaMenuData) {
          const it = spaMenuData[cat].find(i => Object.keys(i).some(k => k.startsWith('name_') && norm(i[k]) === norm(bare)));
          if (it) { shown = it['name_' + state.language] || it.name_en || it.name_vi; break; }
        }
        const byName = (n) => n && options.find(opt => norm(opt.getAttribute('data-name')) === norm(n));
        const match = options.find(opt => opt.value === serviceName) || byName(shown) || byName(bare);
        const unit = getServicePriceVND(serviceName) || listedPrice;
        if (match) {
          serviceInput.value = match.value;
        } else if (unit) {
          // Dịch vụ / ưu đãi mới đăng từ Dashboard (ngoài Bảng giá) nhưng có giá: thêm 1 lần vào danh sách
          let opt = options.find(o => o.value === serviceName);
          if (!opt) {
            opt = document.createElement('option');
            opt.value = serviceName;
            opt.textContent = serviceName;
            opt.setAttribute('data-name', bare);
            opt.setAttribute('data-price', unit);
            serviceInput.appendChild(opt);
          }
          serviceInput.value = serviceName;
        }
        // Không phải dịch vụ (VD: nút "Discover more" của phòng/không gian) → giữ dịch vụ đang chọn, không tạo dòng giá 0đ
      }
    }
    updateModalBookingPriceAndQR();
  }

  function getModeLabel(type) {
    const lang = state.language;
    const modeBtnLabels = {
      vi: { custom: 'Tùy chọn', list: 'Danh sách' },
      en: { custom: 'Custom', list: 'List' },
      zh: { custom: '自定义', list: '列表' },
      ja: { custom: '自由指定', list: '一覧' },
      ko: { custom: '직접입력', list: '목록' }
    };
    const bLabels = modeBtnLabels[lang] || modeBtnLabels.vi;
    return bLabels[type];
  }

  function closeBookingModal() {
    const modal = getBookingModal();
    if (!modal) return;
    modal.classList.remove('active');
    modal.style.display = 'none';
    modal.style.opacity = '0';
    document.body.style.overflow = '';
  }

  // Delegated click listeners for modal close
  document.addEventListener('click', (e) => {
    if (e.target && (e.target.id === 'modal-close-btn' || e.target.closest('#modal-close-btn'))) {
      closeBookingModal();
    }
    const modal = getBookingModal();
    if (modal && e.target === modal) {
      closeBookingModal();
    }
  });

  // Trigger modal from any .js-open-booking button
  document.querySelectorAll('.js-open-booking').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const s = btn.getAttribute('data-service') || '';
      openBookingModalWithService(s);
    });
  });

  // =========================================================================
  // MOBILE SERVICES & PRODUCTS CATALOGUE DRAWER (MENU 3 VẠCH)
  // =========================================================================
  const mobileNavToggle = document.getElementById('mobile-nav-toggle');
  const mobileServicesDrawer = document.getElementById('mobile-services-drawer');
  const msDrawerClose = document.getElementById('ms-drawer-close');
  const msDrawerBackdrop = document.getElementById('ms-drawer-backdrop');

  function openMobileServicesDrawer() {
    if (!mobileServicesDrawer) return;
    mobileServicesDrawer.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  window.openMobileServicesDrawer = openMobileServicesDrawer;

  function closeMobileServicesDrawer() {
    if (!mobileServicesDrawer) return;
    mobileServicesDrawer.classList.remove('active');
    document.body.style.overflow = '';
  }
  window.closeMobileServicesDrawer = closeMobileServicesDrawer;

  if (mobileNavToggle) {
    mobileNavToggle.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      openMobileServicesDrawer();
    });
  }

  if (msDrawerClose) {
    msDrawerClose.addEventListener('click', (e) => {
      e.preventDefault();
      closeMobileServicesDrawer();
    });
  }

  if (msDrawerBackdrop) {
    msDrawerBackdrop.addEventListener('click', (e) => {
      e.preventDefault();
      closeMobileServicesDrawer();
    });
  }

  // Category Tab Switching inside Drawer
  const msTabs = document.querySelectorAll('.ms-tab-btn');
  const msCards = document.querySelectorAll('.ms-service-card');

  msTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      msTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const cat = tab.getAttribute('data-category');

      msCards.forEach(card => {
        const cardCat = card.getAttribute('data-category');
        if (cat === 'all' || cardCat === cat) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Direct "Đặt Dịch Vụ Này" action from drawer
  document.querySelectorAll('.js-select-service-book').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const s = btn.getAttribute('data-service') || '';
      // Giá niêm yết in trên thẻ (khoảng giá → giá khởi điểm) để tính đúng khi tên khác Bảng giá
      const listed = btn.closest('.ms-service-footer')?.querySelector('.ms-price-original')?.textContent || '';
      const listedPrice = parseInt(listed.split('-')[0].replace(/[^\d]/g, ''), 10) || 0;
      closeMobileServicesDrawer();
      setTimeout(() => {
        openBookingModalWithService(s, listedPrice);
      }, 150);
    });
  });

  // Language switcher inside drawer
  document.querySelectorAll('.ms-lang-pill').forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.getAttribute('data-lang');
      if (lang) {
        document.querySelectorAll('.ms-lang-pill').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.language = lang;
        localStorage.setItem('ivy_lang', lang);
        updatePageLanguage();
      }
    });
  });

  // =========================================================================
  // OFFICIAL MENU BOARD LIGHTBOX MODAL
  // =========================================================================
  const menuBoardModal = document.getElementById('menu-board-modal');
  const menuBoardCloseBtn = document.getElementById('menu-board-close-btn');

  function openMenuBoardModal() {
    if (!menuBoardModal) return;
    // Default to Wellness board active
    const tabWellness = document.getElementById('tab-board-wellness');
    const tabCombos = document.getElementById('tab-board-combos');
    const viewWellness = document.getElementById('board-view-wellness');
    const viewCombos = document.getElementById('board-view-combos');
    if (tabWellness && tabCombos) {
      tabWellness.classList.add('active');
      tabCombos.classList.remove('active');
    }
    if (viewWellness && viewCombos) {
      viewWellness.style.display = 'flex';
      viewCombos.style.display = 'none';
    }
    menuBoardModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMenuBoardModal() {
    if (!menuBoardModal) return;
    menuBoardModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (menuBoardCloseBtn) menuBoardCloseBtn.addEventListener('click', closeMenuBoardModal);
  if (menuBoardModal) {
    menuBoardModal.addEventListener('click', (e) => {
      if (e.target === menuBoardModal) closeMenuBoardModal();
    });
  }

  // Menu Board Tabs Switcher (Wellness vs Combos)
  const tabBoardWellness = document.getElementById('tab-board-wellness');
  const tabBoardCombos = document.getElementById('tab-board-combos');
  const boardViewWellness = document.getElementById('board-view-wellness');
  const boardViewCombos = document.getElementById('board-view-combos');

  if (tabBoardWellness && tabBoardCombos) {
    tabBoardWellness.addEventListener('click', () => {
      tabBoardWellness.classList.add('active');
      tabBoardCombos.classList.remove('active');
      if (boardViewWellness) boardViewWellness.style.display = 'flex';
      if (boardViewCombos) boardViewCombos.style.display = 'none';
    });

    tabBoardCombos.addEventListener('click', () => {
      tabBoardCombos.classList.add('active');
      tabBoardWellness.classList.remove('active');
      if (boardViewCombos) boardViewCombos.style.display = 'flex';
      if (boardViewWellness) boardViewWellness.style.display = 'none';
    });
  }

  // Click on image to view full in new tab or zoom
  ['img-board-wellness', 'img-board-combos'].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.style.cursor = 'zoom-in';
      el.addEventListener('click', () => {
        window.open(el.src, '_blank');
      });
    }
  });

  document.querySelectorAll('.js-open-menu-board').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openMenuBoardModal();
    });
  });

  // Setup time mode toggles and interactions
  function initTimePickerHandlers() {
    // Hero Time Handlers
    const heroSelectTime = document.getElementById('hero-select-time');
    const heroCustomTime = document.getElementById('hero-custom-time');
    const heroModeBtn = document.getElementById('hero-time-mode-btn');
    const heroModeText = document.getElementById('hero-time-mode-text');

    function setHeroTimeMode(isCustom) {
      if (!heroSelectTime || !heroCustomTime) return;
      if (isCustom) {
        const val = heroSelectTime.value !== 'custom' ? heroSelectTime.value : '14:30';
        heroCustomTime.value = val;
        heroSelectTime.style.display = 'none';
        heroCustomTime.style.display = 'block';
        if (heroModeText) heroModeText.textContent = getModeLabel('list');
        heroCustomTime.focus();
        if (heroCustomTime.showPicker) heroCustomTime.showPicker();
      } else {
        heroCustomTime.style.display = 'none';
        heroSelectTime.style.display = 'block';
        if (heroSelectTime.value === 'custom') heroSelectTime.value = '14:30';
        if (heroModeText) heroModeText.textContent = getModeLabel('custom');
      }
    }

    if (heroModeBtn) {
      heroModeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const currentlyCustom = heroCustomTime && heroCustomTime.style.display !== 'none';
        setHeroTimeMode(!currentlyCustom);
      });
    }

    if (heroSelectTime) {
      heroSelectTime.addEventListener('change', () => {
        if (heroSelectTime.value === 'custom') {
          setHeroTimeMode(true);
        }
      });
    }

    // Modal Time Handlers
    const modalSelectTime = document.getElementById('modal-book-time');
    const modalCustomTime = document.getElementById('modal-custom-time');
    const modalModeBtn = document.getElementById('modal-time-mode-btn');
    const modalModeText = document.getElementById('modal-time-mode-text');

    function setModalTimeMode(isCustom) {
      if (!modalSelectTime || !modalCustomTime) return;
      if (isCustom) {
        const val = modalSelectTime.value !== 'custom' ? modalSelectTime.value : '14:30';
        modalCustomTime.value = val;
        modalSelectTime.style.display = 'none';
        modalCustomTime.style.display = 'block';
        if (modalModeText) modalModeText.textContent = getModeLabel('list');
        modalCustomTime.focus();
        if (modalCustomTime.showPicker) modalCustomTime.showPicker();
      } else {
        modalCustomTime.style.display = 'none';
        modalSelectTime.style.display = 'block';
        if (modalSelectTime.value === 'custom') modalSelectTime.value = '14:30';
        if (modalModeText) modalModeText.textContent = getModeLabel('custom');
      }
    }

    if (modalModeBtn) {
      modalModeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const currentlyCustom = modalCustomTime && modalCustomTime.style.display !== 'none';
        setModalTimeMode(!currentlyCustom);
      });
    }

    if (modalSelectTime) {
      modalSelectTime.addEventListener('change', () => {
        if (modalSelectTime.value === 'custom') {
          setModalTimeMode(true);
        }
      });
    }

    // Clicking anywhere on Date fields triggers calendar picker
    const heroDateField = document.querySelector('.hero-booking-field-date');
    const heroDateInput = document.getElementById('hero-select-date');
    if (heroDateField && heroDateInput) {
      heroDateField.addEventListener('click', (e) => {
        if (e.target !== heroDateInput && heroDateInput.showPicker) {
          heroDateInput.showPicker();
        }
      });
    }
  }

  // Setup guest mode toggles (Dropdown list vs Custom quantity)
  function initGuestPickerHandlers() {
    // Hero Guest Handlers
    const heroSelectGuests = document.getElementById('hero-select-guests');
    const heroCustomGuests = document.getElementById('hero-custom-guests');
    const heroGuestModeBtn = document.getElementById('hero-guest-mode-btn');
    const heroGuestModeText = document.getElementById('hero-guest-mode-text');

    function setHeroGuestMode(isCustom) {
      if (!heroSelectGuests || !heroCustomGuests) return;
      if (isCustom) {
        heroSelectGuests.style.display = 'none';
        heroCustomGuests.style.display = 'block';
        if (heroGuestModeText) heroGuestModeText.textContent = getModeLabel('list');
        heroCustomGuests.focus();
      } else {
        heroCustomGuests.style.display = 'none';
        heroSelectGuests.style.display = 'block';
        if (heroSelectGuests.value === 'custom') heroSelectGuests.value = '2';
        if (heroGuestModeText) heroGuestModeText.textContent = getModeLabel('custom');
      }
    }

    if (heroGuestModeBtn) {
      heroGuestModeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const currentlyCustom = heroCustomGuests && heroCustomGuests.style.display !== 'none';
        setHeroGuestMode(!currentlyCustom);
      });
    }

    if (heroSelectGuests) {
      heroSelectGuests.addEventListener('change', () => {
        if (heroSelectGuests.value === 'custom') {
          setHeroGuestMode(true);
        }
      });
    }

    // Modal Guest Handlers
    const modalSelectGuests = document.getElementById('modal-guest-count');
    const modalCustomGuests = document.getElementById('modal-custom-guests');
    const modalGuestModeBtn = document.getElementById('modal-guest-mode-btn');
    const modalGuestModeText = document.getElementById('modal-guest-mode-text');

    function setModalGuestMode(isCustom) {
      if (!modalSelectGuests || !modalCustomGuests) return;
      if (isCustom) {
        modalSelectGuests.style.display = 'none';
        modalCustomGuests.style.display = 'block';
        if (modalGuestModeText) modalGuestModeText.textContent = getModeLabel('list');
        modalCustomGuests.focus();
      } else {
        modalCustomGuests.style.display = 'none';
        modalSelectGuests.style.display = 'block';
        if (modalSelectGuests.value === 'custom') modalSelectGuests.value = '2';
        if (modalGuestModeText) modalGuestModeText.textContent = getModeLabel('custom');
      }
    }

    if (modalGuestModeBtn) {
      modalGuestModeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const currentlyCustom = modalCustomGuests && modalCustomGuests.style.display !== 'none';
        setModalGuestMode(!currentlyCustom);
      });
    }

    if (modalSelectGuests) {
      modalSelectGuests.addEventListener('change', () => {
        if (modalSelectGuests.value === 'custom') {
          setModalGuestMode(true);
        }
      });
    }
  }

  // Final confirmation in modal
    // =========================================================================
  // SEPAY SACOMBANK PAYMENT & BOOKING CONFIRMATION
  // =========================================================================

  // Helper: Get service price by name or ID
  // Giá 1 khách của dịch vụ theo Bảng giá (đã áp bản sửa của Admin). Nhận tên ở mọi ngôn ngữ,
  // có hoặc không kèm phần "(giá ₫)" ở cuối như trong danh sách đặt lịch.
  function getServicePriceVND(serviceName) {
    const label = String(serviceName || '').trim();
    if (!label) return 0;
    const norm = (x) => String(x || '').normalize('NFC').toLowerCase().replace(/\s+/g, ' ').trim();
    const priceTail = /\s*\(([^()]*(₫|đ|VNĐ|VND))\)\s*$/i;
    const names = [label, label.replace(priceTail, '')].map(norm);
    for (const cat in spaMenuData) {
      for (const item of spaMenuData[cat]) {
        const itemNames = Object.keys(item).filter(k => k.startsWith('name_')).map(k => norm(item[k]));
        if (names.some(n => itemNames.includes(n))) return item.price_vnd || 0;
      }
    }
    // Dịch vụ ngoài Bảng giá: lấy số tiền ghi trong ngoặc (khoảng giá → giá thấp nhất)
    const m = priceTail.exec(label);
    if (m) {
      const n = parseInt(m[1].split('-')[0].replace(/[^\d]/g, ''), 10);
      if (n) return n;
    }
    return 0;
  }

  // Giá 1 khách của dịch vụ đang chọn trong hộp đặt lịch (ưu tiên giá gắn sẵn trên lựa chọn)
  function selectedServiceUnitPrice() {
    const sel = document.getElementById('modal-service-select');
    const opt = sel && sel.selectedOptions && sel.selectedOptions[0];
    const fromOpt = opt ? parseInt(opt.getAttribute('data-price') || '0', 10) : 0;
    return fromOpt || getServicePriceVND(sel ? sel.value : '');
  }

  // Copy helper with feedback toast
  function copyTextWithToast(text, msg = 'Đã sao chép vào bộ nhớ tạm!') {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        showToast(msg);
      }).catch(() => {
        fallbackCopy(text, msg);
      });
    } else {
      fallbackCopy(text, msg);
    }
  }

  function fallbackCopy(text, msg) {
    const ta = document.createElement('textarea');
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand('copy');
      showToast(msg);
    } catch (e) {
      showToast(text);
    }
    document.body.removeChild(ta);
  }

  // Real-time Dynamic Calculation & QR Generator for Booking Modal (Yêu cầu 2: Giảm giá 10% khi thanh toán luôn)
  function updateModalBookingPriceAndQR() {
    const serviceSelect = document.getElementById('modal-service-select');
    const guestSelect = document.getElementById('modal-guest-count');
    const customGuests = document.getElementById('modal-custom-guests');
    const isCustomGuest = customGuests && customGuests.style.display !== 'none';

    const serviceName = serviceSelect?.value || 'IVY SPECIAL - COMBO 1 (HOT)';
    let guests = 1;
    if (isCustomGuest && customGuests.value) {
      guests = parseInt(customGuests.value, 10) || 1;
    } else if (guestSelect && guestSelect.value) {
      guests = parseInt(guestSelect.value, 10) || 1;
    }
    if (guests < 1) guests = 1;

    // Thành tiền = Đơn giá × Số khách; Ưu đãi QR = ROUND(Thành tiền × 10%)
    const basePrice = selectedServiceUnitPrice();
    const totalOrig = basePrice * guests;
    const discount10 = Math.round(totalOrig * 0.10);
    const finalDiscountedPrice = totalOrig - discount10;

    // Payment radio
    const payMethodRadio = document.querySelector('input[name="modal-pay-method"]:checked');
    const isQrDiscount = !payMethodRadio || payMethodRadio.value === 'qr-discount-10' || payMethodRadio.value === 'sepay-qr';

    const qrLabel = document.getElementById('pay-opt-qr-label');
    const cashLabel = document.getElementById('pay-opt-cash-label');
    const qrBox = document.getElementById('modal-qr-preview-box');
    const cashBox = document.getElementById('modal-cash-preview-box');

    if (isQrDiscount) {
      if (qrLabel) qrLabel.classList.add('active');
      if (cashLabel) cashLabel.classList.remove('active');
      if (qrBox) qrBox.style.display = 'block';
      if (cashBox) cashBox.style.display = 'none';
    } else {
      if (qrLabel) qrLabel.classList.remove('active');
      if (cashLabel) cashLabel.classList.add('active');
      if (qrBox) qrBox.style.display = 'none';
      if (cashBox) cashBox.style.display = 'block';
    }

    const origPriceEl = document.getElementById('modal-calc-orig-price');
    const discountValEl = document.getElementById('modal-calc-discount-val');
    const finalPriceEl = document.getElementById('modal-calc-final-price');
    const cashTotalEl = document.getElementById('modal-cash-total-price');
    const copyAmountEl = document.getElementById('modal-copy-amount');
    const copyMemoEl = document.getElementById('modal-copy-memo');
    const qrImgEl = document.getElementById('modal-bank-qr-img');

    if (!window._currentBookingCode) {
      window._currentBookingCode = 'IVY' + Math.floor(1000 + Math.random() * 9000);
    }
    const activeCode = window._currentBookingCode;

    if (origPriceEl) origPriceEl.textContent = `${totalOrig.toLocaleString('vi-VN')} VNĐ` + (guests > 1 ? ` (${guests} khách)` : '');
    if (discountValEl) discountValEl.textContent = `-${discount10.toLocaleString('vi-VN')} VNĐ`;
    if (finalPriceEl) finalPriceEl.textContent = `${finalDiscountedPrice.toLocaleString('vi-VN')} VNĐ`;
    if (cashTotalEl) cashTotalEl.textContent = `${totalOrig.toLocaleString('vi-VN')} VNĐ`;
    if (copyAmountEl) copyAmountEl.textContent = `${finalDiscountedPrice.toLocaleString('vi-VN')} VNĐ`;
    if (copyMemoEl) copyMemoEl.textContent = activeCode;

    if (qrImgEl) {
      const qrUrl = `https://img.vietqr.io/image/sacombank-020113149011-compact2.png?amount=${finalDiscountedPrice}&addInfo=${activeCode}&accountName=HKD%20IVY%20LUXE%20SPA`;
      qrImgEl.src = qrUrl;
    }
  }

  // Interactive event listeners for real-time recalculations in booking modal
  document.addEventListener('change', (e) => {
    if (e.target && (
      e.target.id === 'modal-service-select' || 
      e.target.id === 'modal-guest-count' || 
      e.target.name === 'modal-pay-method'
    )) {
      updateModalBookingPriceAndQR();
    }
  });

  document.addEventListener('input', (e) => {
    if (e.target && e.target.id === 'modal-custom-guests') {
      updateModalBookingPriceAndQR();
    }
  });

  // Modal Copy Buttons
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('#btn-copy-acc, #btn-copy-amount, #btn-copy-memo');
    if (!btn) return;
    e.preventDefault();
    e.stopPropagation();
    if (btn.id === 'btn-copy-acc') {
      copyTextWithToast('020113149011', 'Đã sao chép STK Sacombank: 020113149011');
    } else if (btn.id === 'btn-copy-amount') {
      const amtEl = document.getElementById('modal-copy-amount');
      const val = amtEl?.textContent.replace(/[^0-9]/g, '') || '720000';
      copyTextWithToast(val, `Đã sao chép số tiền: ${parseInt(val).toLocaleString('vi-VN')} VNĐ`);
    } else if (btn.id === 'btn-copy-memo') {
      const memoEl = document.getElementById('modal-copy-memo');
      copyTextWithToast(memoEl?.textContent || 'IVY_VIP', 'Đã sao chép Nội dung CK!');
    }
  });

  // Booking Form Modal Submit Engine
  const bookingFormModal = document.getElementById('booking-form-modal') || document.getElementById('modal-booking-form');
  if (bookingFormModal) {
    bookingFormModal.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('modal-cust-name')?.value.trim() || 'Quý Khách';
      const phone = document.getElementById('modal-cust-phone')?.value.trim() || '';
      const branch = 'IVY LUXE SPA - SỐ 48 PHỐ HÀ TRUNG, PHƯỜNG HOÀN KIẾM, THÀNH PHỐ HÀ NỘI';
      const service = document.getElementById('modal-service-select')?.value || 'IVY SPECIAL - COMBO 1 (HOT) - 90 PHÚT';
      const date = document.getElementById('modal-book-date')?.value || new Date().toISOString().split('T')[0];

      const modalSelectTime = document.getElementById('modal-book-time');
      const modalCustomTime = document.getElementById('modal-custom-time');
      const isCustomTime = modalCustomTime && modalCustomTime.style.display !== 'none';
      const time = isCustomTime ? (modalCustomTime.value || '14:30') : (modalSelectTime?.value || '14:30');

      const modalSelectGuests = document.getElementById('modal-guest-count');
      const modalCustomGuests = document.getElementById('modal-custom-guests');
      const isCustomGuests = modalCustomGuests && modalCustomGuests.style.display !== 'none';
      let guests = isCustomGuests ? (modalCustomGuests.value ? `${modalCustomGuests.value} Khách` : '2 Khách') : (modalSelectGuests?.value || '2');
      if (guests === 'custom') guests = modalCustomGuests?.value ? `${modalCustomGuests.value} Khách` : '2 Khách';

      // Payment method
      const payMethodRadio = document.querySelector('input[name="modal-pay-method"]:checked');
      const payMethod = payMethodRadio ? payMethodRadio.value : 'qr-discount-10';

      // Affiliate referral tracking
      const affCode = localStorage.getItem('ivy_affiliate_ref');
      if (affCode && typeof recordAffiliateBooking === 'function') {
        recordAffiliateBooking(affCode, service, guests);
      }

      // Unique booking code
      const bookingCode = window._currentBookingCode || ('IVY' + Math.floor(1000 + Math.random() * 9000));
      window._currentBookingCode = null; // Reset for next booking

      // Price calculation
      let basePrice = selectedServiceUnitPrice();
      let guestCount = parseInt(guests, 10) || 1;
      if (guestCount < 1) guestCount = 1;
      let totalPrice = basePrice * guestCount;

      let payableAmount = totalPrice;
      let payMethodLabel = 'Thanh Toán Tại Quầy Spa (Giá niêm yết)';

      if (payMethod === 'qr-discount-10' || payMethod === 'sepay-qr') {
        const discount10 = Math.round(totalPrice * 0.10);
        payableAmount = totalPrice - discount10;
        payMethodLabel = 'Mã QR Sacombank (Ưu đãi Giảm 10% thanh toán luôn)';
      }

      // Save Booking to LocalStorage for Admin Management
      try {
        const bookingsList = JSON.parse(localStorage.getItem('ivy_bookings') || '[]');
        const newBooking = {
          id: bookingCode,
          name,
          phone,
          service,
          branch,
          date,
          time,
          guests,
          affCode: affCode || 'Không có',
          totalPrice,
          payableAmount,
          payMethod,
          payMethodLabel,
          status: payMethod === 'cash' ? 'Chờ xác nhận (Tiền mặt)' : 'Chờ đối soát QR Sacombank',
          paymentStatus: payMethod === 'cash' ? 'Chưa thanh toán' : 'Chờ quét QR',
          createdAt: new Date().toISOString()
        };
        bookingsList.unshift(newBooking);
        localStorage.setItem('ivy_bookings', JSON.stringify(bookingsList));
      } catch (err) {}

      // Bước 1: lưu đơn + số tiền lên máy chủ (CRM, gắn đối tác giới thiệu để đo doanh số Affiliate)
      const payKind = payMethod === 'cash' ? 'cash' : 'qr';
      const notes = document.getElementById('modal-notes')?.value || '';
      const modalBody = document.querySelector('.modal-body');
      const data = {
        bookingCode, name, phone, service: String(service).replace(/\s*\([^()]*(₫|đ|vnđ|vnd)\)\s*$/i, ''), branch, date, time,
        guests: state.language === 'vi' ? guestCount + ' khách' : guestCount + (guestCount > 1 ? ' guests' : ' guest'),
        totalPrice, discountAmount: totalPrice - payableAmount, payableAmount, payKind, affCode,
      };
      if (modalBody) modalBody.innerHTML = `<div style="text-align:center;padding:60px 15px;color:#5A6560;"><i class="fa fa-spinner fa-spin" style="font-size:2rem;color:#D4AF37;"></i><p style="margin-top:14px;">${T('Đang tạo đơn đặt dịch vụ…', 'Creating your booking…')}</p></div>`;
      sendLead({
        name,
        phone,
        need: `Đặt lịch: ${service} — ${date} ${time} — ${guests}${notes ? ' — Ghi chú: ' + notes : ''} (Mã ${bookingCode})`,
        source: 'booking',
        booking: { code: bookingCode, service, guests: guestCount, date, time, pay: payKind, unit: basePrice },
      }).then(({ ok, data: res }) => {
        // Số tiền theo Bảng giá trên máy chủ (đã trừ 10% nếu trả trước QR)
        if (ok && res.booking) {
          data.totalPrice = res.booking.gross;
          data.discountAmount = res.booking.discount;
          data.payableAmount = res.booking.total;
        }
        if (payKind === 'qr') renderSePayPaymentScreen(modalBody, data);
        else renderBookingSuccess(modalBody, data);
      });
    });
  }

  const T = (vi, en) => (state.language === 'vi' ? vi : en);
  const vnd = (n) => Number(n || 0).toLocaleString('vi-VN') + 'đ';

  // Thanh tiến trình: 1 Thông tin & thanh toán → 2 Xác nhận thanh toán → 3 Đặt dịch vụ thành công
  function bookingSteps(active) {
    const steps = [T('Thông tin', 'Details'), T('Thanh toán', 'Payment'), T('Hoàn tất', 'Done')];
    return `<div class="ivy-steps">${steps.map((t, i) => `<div class="ivy-step${i < active ? ' done' : i === active ? ' on' : ''}"><span>${i < active ? '<i class="fa fa-check"></i>' : i + 1}</span><small>${t}</small></div>`).join('<i class="ivy-step-line"></i>')}</div>`;
  }

  // Hoá đơn: giá niêm yết, ưu đãi trả trước QR −10%, thành tiền
  function bookingInvoice(data, paidLabel) {
    const row = (k, v, cls = '') => `<div class="ivy-inv-row ${cls}"><span>${k}</span><b>${v}</b></div>`;
    return `<div class="ivy-invoice">
      ${row(T('Mã đơn', 'Booking code'), `<span style="color:#B8932A;">${authEscape(data.bookingCode)}</span>`)}
      ${row(T('Dịch vụ', 'Service'), authEscape(data.service))}
      ${row(T('Thời gian', 'Time'), `${authEscape(data.date)} · ${authEscape(data.time)} · ${authEscape(String(data.guests))}`)}
      ${row(T('Giá niêm yết', 'Listed price'), vnd(data.totalPrice))}
      ${data.discountAmount ? row(T('Ưu đãi trả trước qua QR (−10%)', 'QR prepayment discount (−10%)'), '−' + vnd(data.discountAmount), 'ivy-inv-discount') : ''}
      ${row(paidLabel, vnd(data.payableAmount), 'ivy-inv-total')}
    </div>`;
  }

  // Bước 2–3: màn thanh toán QR — hoá đơn đã tự trừ 10%
  function renderSePayPaymentScreen(container, data) {
    if (!container) return;

    const bankAcc = '020113149011';
    const bankName = 'Sacombank';
    const bankOwner = 'HKD IVY LUXE SPA';
    const transferMemo = data.bookingCode;
    const amountStr = data.payableAmount.toLocaleString('vi-VN');
    const sepayQrUrl = `https://qr.sepay.vn/img?acc=${bankAcc}&bank=${bankName}&amount=${data.payableAmount}&des=${transferMemo}&template=compact`;
    const officialCardImg = 'assets/images/sacombank_qr.png';
    const copyBtn = (v, title) => `<button type="button" class="sepay-btn-copy-sm" data-copy="${v}" title="${title}"><i class="fa fa-clone"></i> Copy</button>`;

    container.innerHTML = `
      <div class="sepay-checkout-wrap">
        ${bookingSteps(1)}
        <div class="sepay-checkout-header">
          <div style="font-size:0.86rem; color:#5A6560; margin-bottom:4px;">${T('Số tiền thanh toán (đã giảm 10%):', 'Amount to pay (10% off applied):')}</div>
          <h2 class="sepay-total-amount">${amountStr} VNĐ</h2>
        </div>
        ${bookingInvoice(data, T('Số tiền cần chuyển khoản', 'Amount to transfer'))}

        <div class="sepay-qr-center">
          <img id="sepay-active-qr" src="${sepayQrUrl}" alt="QR Sacombank" class="sepay-qr-img" onerror="this.src='${officialCardImg}'">
        </div>
        <div class="sepay-qr-switch-btns">
          <button type="button" class="sepay-btn-toggle-qr active" id="btn-qr-dynamic"><i class="fa fa-qrcode"></i> ${T('Mã QR nhanh (đã kèm số tiền)', 'Quick QR (amount included)')}</button>
          <button type="button" class="sepay-btn-toggle-qr" id="btn-qr-official"><i class="fa fa-id-card-o"></i> ${T('Thẻ Sacombank gốc', 'Sacombank card')}</button>
        </div>

        <div class="sepay-bank-details-box">
          <div class="sepay-detail-row"><span class="sepay-detail-label">${T('Ngân hàng thụ hưởng:', 'Bank:')}</span><span class="sepay-detail-value"><strong>Sacombank</strong></span></div>
          <div class="sepay-detail-row"><span class="sepay-detail-label">${T('Số tài khoản:', 'Account number:')}</span><span class="sepay-detail-value"><strong style="color:#0053A0; font-size:1.05rem;">${bankAcc}</strong> ${copyBtn(bankAcc, 'STK')}</span></div>
          <div class="sepay-detail-row"><span class="sepay-detail-label">${T('Chủ tài khoản:', 'Account holder:')}</span><span class="sepay-detail-value"><strong>${bankOwner}</strong></span></div>
          <div class="sepay-detail-row"><span class="sepay-detail-label">${T('Số tiền chuyển:', 'Amount:')}</span><span class="sepay-detail-value"><strong style="color:#B22222;">${amountStr}đ</strong> ${copyBtn(data.payableAmount, 'Amount')}</span></div>
          <div class="sepay-detail-row"><span class="sepay-detail-label">${T('Nội dung chuyển khoản:', 'Transfer note:')}</span><span class="sepay-detail-value"><strong style="background:#0F241A; color:#FFE082; padding:2px 8px; border-radius:4px;">${transferMemo}</strong> ${copyBtn(transferMemo, 'Memo')}</span></div>
        </div>

        <button type="button" id="btn-sepay-paid-confirm" class="sepay-verify-btn">
          <i class="fa fa-check-circle"></i> ${T('TÔI ĐÃ CHUYỂN KHOẢN THÀNH CÔNG', 'I HAVE COMPLETED THE TRANSFER')}
        </button>
        <p style="font-size:0.78rem; color:#7E968C; margin-top:12px; line-height:1.5;">
          <i class="fa fa-lock" style="color:#25D366;"></i> ${T('Chuyển khoản tới tài khoản Sacombank <strong>020113149011 (HKD IVY LUXE SPA)</strong>. IVY LUXE đối soát giao dịch và xác nhận với bạn qua điện thoại / Zalo.', 'Transfer to Sacombank account <strong>020113149011 (HKD IVY LUXE SPA)</strong>. IVY LUXE will verify the payment and confirm with you by phone / Zalo.')}
        </p>
      </div>
    `;

    const qrImg = document.getElementById('sepay-active-qr');
    const btnDyn = document.getElementById('btn-qr-dynamic');
    const btnOff = document.getElementById('btn-qr-official');
    if (btnDyn && btnOff && qrImg) {
      btnDyn.addEventListener('click', () => { qrImg.src = sepayQrUrl; btnDyn.classList.add('active'); btnOff.classList.remove('active'); });
      btnOff.addEventListener('click', () => { qrImg.src = officialCardImg; btnOff.classList.add('active'); btnDyn.classList.remove('active'); });
    }

    container.querySelectorAll('.sepay-btn-copy-sm').forEach(btn => {
      btn.addEventListener('click', () => {
        const text = btn.getAttribute('data-copy');
        if (!text || !navigator.clipboard) return;
        navigator.clipboard.writeText(text).then(() => {
          const original = btn.innerHTML;
          btn.innerHTML = '<i class="fa fa-check"></i> OK';
          setTimeout(() => { btn.innerHTML = original; }, 1500);
        });
      });
    });

    // Khách bấm "Tôi đã chuyển khoản" → ghi nhận lên máy chủ (chờ spa xác nhận) → báo đặt dịch vụ thành công
    const confirmBtn = document.getElementById('btn-sepay-paid-confirm');
    if (confirmBtn) {
      confirmBtn.addEventListener('click', () => {
        confirmBtn.innerHTML = `<i class="fa fa-spinner fa-spin"></i> ${T('Đang ghi nhận thanh toán…', 'Recording your payment…')}`;
        confirmBtn.disabled = true;
        fetch('/api/leads?a=paid', {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ code: data.bookingCode, phone: data.phone }),
        }).catch(() => {}).finally(() => {
          try {
            const bookingsList = JSON.parse(localStorage.getItem('ivy_bookings') || '[]');
            const b = bookingsList.find(x => x.id === data.bookingCode);
            if (b) { b.status = 'Đã chuyển khoản – chờ spa xác nhận'; b.paymentStatus = 'Đã chuyển khoản QR'; b.payableAmount = data.payableAmount; }
            localStorage.setItem('ivy_bookings', JSON.stringify(bookingsList));
          } catch (e) {}
          renderBookingSuccess(container, data);
        });
      });
    }
  }

  // Bước 4–5: đặt dịch vụ thành công + lời cảm ơn
  function renderBookingSuccess(container, data) {
    if (!container) return;
    const cleanPhone = '84989713660';
    const qr = data.payKind === 'qr';
    const message = `Hello IVY LUXE SPA, my booking:
- Booking Code: ${data.bookingCode}
- Name: ${data.name}
- Phone: ${data.phone}
- Service: ${data.service}
- Date: ${data.date} at ${data.time}
- ${qr ? 'Paid by QR: ' + vnd(data.payableAmount) + ' (10% off)' : 'Pay at the spa: ' + vnd(data.payableAmount)}`;
    const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;

    container.innerHTML = `
      <div class="ivy-success">
        ${bookingSteps(3)}
        <div class="ivy-success-icon"><i class="fa fa-check"></i></div>
        <div class="ivy-success-badge">${qr
          ? T('<i class="fa fa-check-circle"></i> Đã ghi nhận chuyển khoản · Đã trừ 10% trên hoá đơn', '<i class="fa fa-check-circle"></i> Transfer recorded · 10% off applied')
          : T('<i class="fa fa-money"></i> Thanh toán tại quầy khi đến', '<i class="fa fa-money"></i> Pay at the spa on arrival')}</div>
        <h3 class="ivy-success-title">${T('ĐẶT DỊCH VỤ THÀNH CÔNG!', 'BOOKING SUCCESSFUL!')}</h3>
        ${bookingInvoice(data, qr ? T('Đã thanh toán', 'Paid') : T('Thanh toán tại quầy', 'Pay at the spa'))}
        <div class="ivy-thanks">
          <i class="fa fa-heart"></i>
          <p>${T('Cảm ơn bạn đã sử dụng dịch vụ của IVY LUXE - Hẹn gặp bạn tại 48 Hà Trung - Phường Hoàn Kiếm - Thành phố Hà Nội để sử dụng dịch vụ của chúng tôi',
            'Thank you for choosing IVY LUXE - See you at 48 Ha Trung Street - Hoan Kiem Ward - Hanoi to enjoy our services')}</p>
        </div>
        <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap;">
          <a href="${waUrl}" target="_blank" rel="noopener" class="nav-cta-btn" style="background:#25D366;color:#FFF;border:none;"><i class="fa fa-whatsapp"></i> WhatsApp</a>
          <a href="tel:0989713660" class="nav-cta-btn" style="background:linear-gradient(135deg,#ECC876,#D4AF37,#A4791E);color:#051A12;"><i class="fa fa-phone"></i> ${T('Gọi', 'Call')} 098 971 3660</a>
        </div>
      </div>
    `;
  }



  // =========================================================================
  // USER AUTHENTICATION SYSTEM (LOGIN, REGISTER, ROLES & MY BOOKINGS)
  // =========================================================================

  function getAuthUsers() {
    let users = [];
    try {
      const stored = localStorage.getItem('ivy_users');
      if (stored) users = JSON.parse(stored);
    } catch (e) {}

    const ALLOWED_ADMINS = ['ivyspahanoi@gmail.com', 'vanhaitech.86@gmail.com'];
    const initialAdmins = [
      { email: 'ivyspahanoi@gmail.com', phone: '0989713660', pass: '', name: 'Quản Trị Viên IVY LUXE', role: 'admin' },
      { email: 'vanhaitech.86@gmail.com', phone: '0989713660', pass: '', name: 'Admin Kỹ Thuật (Văn Hải)', role: 'admin' }
    ];

    if (!Array.isArray(users) || users.length === 0) {
      users = [
        ...initialAdmins,
        { email: 'partner@hotel.com', phone: '0912345678', pass: '', name: 'Khách Sạn Silk Hanoi', role: 'partner' },
        { email: 'khach@gmail.com', phone: '0901234567', pass: '', name: 'Nguyễn Thu Trang', role: 'customer' }
      ];
    } else {
      // Đảm bảo chỉ DUY NHẤT 2 email này được quyền admin với mật khẩu 
      users.forEach(u => {
        const uEmail = (u.email || '').toLowerCase().trim();
        if (u.role === 'admin' && !ALLOWED_ADMINS.includes(uEmail)) {
          u.role = 'customer';
        }
      });

      // Cập nhật hoặc bổ sung 2 tài khoản admin
      initialAdmins.forEach(adm => {
        const idx = users.findIndex(u => (u.email || '').toLowerCase().trim() === adm.email);
        if (idx !== -1) {
          users[idx].role = 'admin';
          users[idx].pass = '';
          users[idx].name = adm.name;
        } else {
          users.unshift(adm);
        }
      });
    }

    try {
      localStorage.setItem('ivy_users', JSON.stringify(users));
    } catch (e) {}
    return users;
  }

  function saveAuthUsers(users) {
    try {
      localStorage.setItem('ivy_users', JSON.stringify(users));
    } catch (e) {}
  }

  function getCurrentUser() {
    try {
      return JSON.parse(localStorage.getItem('ivy_current_user'));
    } catch (e) {
      return null;
    }
  }

  function setCurrentUser(user) {
    try {
      if (user) {
        localStorage.setItem('ivy_current_user', JSON.stringify(user));
      } else {
        localStorage.removeItem('ivy_current_user');
      }
    } catch (e) {}
  }

  function updateHeaderAuthState() {
    const user = getCurrentUser();
    const authBtnText = document.getElementById('header-auth-text');
    const mobileAuthBtnText = document.getElementById('mobile-auth-text');
    
    // Desktop Dropdown
    const userDropdown = document.getElementById('header-user-dropdown');
    const ddName = document.getElementById('user-dd-name');
    const ddRole = document.getElementById('user-dd-role');
    const ddAdminLink = document.getElementById('dd-admin-link');
    const ddPartnerLink = document.getElementById('dd-partner-link');

    // Mobile Dropdown (Giao diện và phân quyền đồng nhất 100% với Web)
    const mobileDropdown = document.getElementById('mobile-user-dropdown');
    const mobileDdName = document.getElementById('mobile-user-dd-name');
    const mobileDdRole = document.getElementById('mobile-user-dd-role');
    const mobileDdAdminLink = document.getElementById('mobile-dd-admin-link');
    const mobileDdPartnerLink = document.getElementById('mobile-dd-partner-link');

    // Quyền do máy chủ cấp: chỉ owner (Chủ Spa) / admin được vào Dashboard
    const STAFF_ROLES = ['owner', 'admin'];

    if (user) {

      const shortName = (user.name ? user.name.split(' ').slice(-1)[0] : 'Tài Khoản');
      if (authBtnText) authBtnText.innerHTML = `${shortName} <i class="fa fa-angle-down" style="font-size:0.75rem; margin-left:3px;"></i>`;
      if (mobileAuthBtnText) mobileAuthBtnText.innerHTML = `${shortName} <i class="fa fa-angle-down" style="font-size:0.75rem; margin-left:2px;"></i>`;

      if (ddName) ddName.textContent = user.name;
      if (mobileDdName) mobileDdName.textContent = user.name;

      let roleText = 'Khách Hàng VIP';
      let roleColor = '#25D366';
      if (STAFF_ROLES.includes(user.role)) {
        roleText = { owner: 'Chủ Spa', admin: 'Quản Trị Viên', staff: 'Nhân Viên CSKH' }[user.role];
        roleColor = '#D4AF37';
      } else if (user.role === 'partner') {
        roleText = 'Đối Tác Affiliate';
        roleColor = '#ECC876';
      }

      if (ddRole) {
        ddRole.textContent = roleText;
        ddRole.style.color = roleColor;
      }
      if (mobileDdRole) {
        mobileDdRole.textContent = roleText;
        mobileDdRole.style.color = roleColor;
      }

      // Chỉ tài khoản được Chủ Spa cấp quyền mới thấy link Trang Quản Trị
      const isAdmin = STAFF_ROLES.includes(user.role);
      const isPartnerOrAdmin = (user.role === 'partner' || isAdmin);

      if (ddAdminLink) ddAdminLink.style.display = isAdmin ? 'block' : 'none';
      if (mobileDdAdminLink) mobileDdAdminLink.style.display = isAdmin ? 'block' : 'none';

      if (ddPartnerLink) ddPartnerLink.style.display = isPartnerOrAdmin ? 'block' : 'none';
      if (mobileDdPartnerLink) mobileDdPartnerLink.style.display = isPartnerOrAdmin ? 'block' : 'none';
    } else {
      if (authBtnText) authBtnText.textContent = 'Đăng Nhập';
      if (mobileAuthBtnText) mobileAuthBtnText.textContent = 'Đăng Nhập';
      if (userDropdown) userDropdown.style.display = 'none';
      if (mobileDropdown) mobileDropdown.style.display = 'none';
    }
  }

  function openAuthModalWithTab(tab) {
    const authModal = document.getElementById('auth-modal');
    if (!authModal) return;
    const authTabBtns = document.querySelectorAll('.auth-tab-btn');
    const authPanes = document.querySelectorAll('.auth-tab-pane');
    authTabBtns.forEach(b => {
      if (b.getAttribute('data-auth-tab') === tab) {
        b.classList.add('active');
      } else {
        b.classList.remove('active');
      }
    });
    authPanes.forEach(p => {
      if (p.id === 'auth-pane-' + tab) {
        p.classList.add('active');
      } else {
        p.classList.remove('active');
      }
    });
    authModal.classList.add('active');
    authModal.style.display = 'flex';
    authModal.style.opacity = '1';
    authModal.style.visibility = 'visible';
    authModal.style.pointerEvents = 'auto';
    document.body.style.overflow = 'hidden';
  }
  window.openAuthModalWithTab = openAuthModalWithTab;

  function closeAuthModal() {
    const authModal = document.getElementById('auth-modal');
    if (authModal) {
      authModal.classList.remove('active');
      authModal.style.display = 'none';
      authModal.style.opacity = '0';
      authModal.style.visibility = 'hidden';
      authModal.style.pointerEvents = 'none';
    }
    const googleAuthModal = document.getElementById('google-auth-modal');
    if (!googleAuthModal || !googleAuthModal.classList.contains('active')) {
      document.body.style.overflow = '';
    }
  }
  window.closeAuthModal = closeAuthModal;

  function openGoogleAuthModal() {
    const googleAuthModal = document.getElementById('google-auth-modal');
    if (googleAuthModal) {
      googleAuthModal.classList.add('active');
      googleAuthModal.style.display = 'flex';
      googleAuthModal.style.opacity = '1';
      googleAuthModal.style.visibility = 'visible';
      googleAuthModal.style.pointerEvents = 'auto';
      document.body.style.overflow = 'hidden';
    }
  }
  window.openGoogleAuthModal = openGoogleAuthModal;

  function closeGoogleAuthModal() {
    const googleAuthModal = document.getElementById('google-auth-modal');
    if (googleAuthModal) {
      googleAuthModal.classList.remove('active');
      googleAuthModal.style.display = 'none';
      googleAuthModal.style.opacity = '0';
      googleAuthModal.style.visibility = 'hidden';
      googleAuthModal.style.pointerEvents = 'none';
    }
    const authModal = document.getElementById('auth-modal');
    if (!authModal || !authModal.classList.contains('active')) {
      document.body.style.overflow = '';
    }
  }
  window.closeGoogleAuthModal = closeGoogleAuthModal;

  // =========================================================================
  // TÀI KHOẢN THẬT TRÊN MÁY CHỦ (/api/account): đăng ký → xác nhận Gmail → đăng nhập, Google
  // =========================================================================

  // Dòng "MASSAGE BODY & WELLNESS" co giãn cho rộng đúng bằng dòng "IVYLUXE SPA & NAIL"
  function fitLogoSub() {
    const title = document.querySelector('.header-logo-text');
    const sub = document.querySelector('.header-logo-sub');
    if (!title || !sub || !title.offsetWidth) return;
    sub.style.removeProperty('font-size');
    // Lặp 2 lần vì khoảng cách chữ không co theo cỡ chữ
    for (let i = 0; i < 2; i++) {
      const base = parseFloat(getComputedStyle(sub).fontSize);
      const ratio = title.scrollWidth / sub.scrollWidth;
      if (base && ratio && isFinite(ratio)) sub.style.setProperty('font-size', (base * ratio).toFixed(2) + 'px', 'important');
    }
  }
  fitLogoSub();
  window.addEventListener('resize', () => { clearTimeout(fitLogoSub.t); fitLogoSub.t = setTimeout(fitLogoSub, 120); });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fitLogoSub);

  // Thông báo nhỏ nổi lên rồi tự ẩn (dùng khi đổi ngôn ngữ...)
  function showToast(message) {
    let toast = document.getElementById('ivy-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'ivy-toast';
      toast.className = 'ivy-toast';
      toast.setAttribute('role', 'status');
      toast.setAttribute('aria-live', 'polite');
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(showToast.timer);
    showToast.timer = setTimeout(() => toast.classList.remove('show'), 2200);
  }

  function authEscape(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }

  function accountApi(action, body) {
    const opts = body === undefined
      ? { credentials: 'same-origin', cache: 'no-store' }
      : { method: 'POST', credentials: 'same-origin', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) };
    return fetch('/api/account?a=' + action, opts)
      .then(res => res.json().catch(() => ({})).then(data => ({ ok: res.ok, status: res.status, data })))
      .catch(() => ({ ok: false, status: 0, data: { error: 'Không kết nối được máy chủ. Vui lòng kiểm tra mạng và thử lại.' } }));
  }

  function setBtnLoading(btn, loading) {
    if (!btn) return;
    if (loading) {
      btn.dataset.html = btn.innerHTML;
      btn.classList.add('is-loading');
      btn.disabled = true;
      btn.innerHTML = '<i class="fa fa-spinner fa-spin"></i> ĐANG XỬ LÝ...';
    } else {
      btn.classList.remove('is-loading');
      btn.disabled = false;
      if (btn.dataset.html) btn.innerHTML = btn.dataset.html;
    }
  }

  function showRegisterVerifyStep(email) {
    const form = document.getElementById('auth-register-form');
    const panel = document.getElementById('auth-register-verify');
    const pane = document.getElementById('auth-pane-register');
    if (!panel) return;
    if (form) form.style.display = 'none';
    if (pane) pane.querySelectorAll('.js-btn-google-auth, .auth-or-divider').forEach(el => { el.style.display = 'none'; });
    const emailEl = document.getElementById('auth-verify-email');
    if (emailEl) emailEl.textContent = email;
    panel.style.display = 'block';
    openAuthModalWithTab('register');
  }

  function hideRegisterVerifyStep() {
    const form = document.getElementById('auth-register-form');
    const panel = document.getElementById('auth-register-verify');
    const pane = document.getElementById('auth-pane-register');
    if (panel) panel.style.display = 'none';
    if (form) form.style.display = '';
    if (pane) pane.querySelectorAll('.js-btn-google-auth, .auth-or-divider').forEach(el => { el.style.display = ''; });
  }

  function showLoginNotice(html, kind) {
    const box = document.getElementById('auth-login-notice');
    if (!box) return;
    box.className = 'auth-login-notice ' + (kind === 'warn' ? 'is-warn' : 'is-ok');
    box.innerHTML = html;
    box.style.display = 'block';
  }

  function hideLoginNotice() {
    const box = document.getElementById('auth-login-notice');
    if (box) box.style.display = 'none';
  }

  function openLoginWithEmail(email, message) {
    hideRegisterVerifyStep();
    openAuthModalWithTab('login');
    const loginId = document.getElementById('login-identifier');
    const loginPass = document.getElementById('login-password');
    if (loginId && email) loginId.value = email;
    if (loginPass) {
      loginPass.value = '';
      if (email) setTimeout(() => loginPass.focus(), 50);
    }
    if (message) showLoginNotice('<i class="fa fa-check-circle"></i> ' + authEscape(message), 'ok');
    else hideLoginNotice();
  }

  function resendVerifyMail(email, btn) {
    if (!email) return;
    if (btn) btn.disabled = true;
    accountApi('resend', { email }).then(({ ok, data }) => {
      if (ok && data.verified) {
        openLoginWithEmail(email, 'Gmail này đã xác nhận rồi. Mời bạn đăng nhập.');
        return;
      }
      alert(ok ? 'Đã gửi lại thư xác nhận tới ' + email + '. Vui lòng kiểm tra Gmail (cả mục Spam).' : (data.error || 'Chưa gửi lại được thư, vui lòng thử lại.'));
      // Chờ 60 giây mới cho gửi tiếp để tránh spam hộp thư.
      if (btn) setTimeout(() => { btn.disabled = false; }, ok ? 60000 : 0);
    });
  }

  function showUnverifiedNotice(email) {
    showLoginNotice(
      '<i class="fa fa-envelope"></i> Tài khoản <strong>' + authEscape(email) + '</strong> chưa xác nhận Gmail. ' +
      'Vui lòng mở thư xác nhận trong Gmail rồi đăng nhập lại. <button type="button" id="btn-login-resend">Gửi lại thư xác nhận</button>',
      'warn'
    );
    const b = document.getElementById('btn-login-resend');
    if (b) b.addEventListener('click', () => resendVerifyMail(email, b));
  }

  function afterServerLogin(user, welcome) {
    setCurrentUser(user);
    updateHeaderAuthState();
    closeAuthModal();
    if (['owner', 'admin'].includes(user.role)) {
      const goToAdmin = confirm('Đăng nhập thành công! Bạn có muốn mở Dashboard Quản Trị ngay bây giờ?');
      if (goToAdmin) window.location.href = '/admin';
    } else if (welcome) {
      alert(welcome);
    }
  }

  function logoutEverywhere() {
    setCurrentUser(null);
    updateHeaderAuthState();
    return accountApi('logout', {});
  }

  // Đồng bộ phiên đăng nhập với máy chủ + xử lý khi khách quay về từ thư xác nhận / trang Google
  function syncServerSession() {
    const params = new URLSearchParams(window.location.search);
    const verifyResult = params.get('xac-nhan');
    const googleResult = params.get('google');
    if (verifyResult || googleResult) {
      params.delete('xac-nhan');
      params.delete('google');
      const qs = params.toString();
      history.replaceState(null, '', window.location.pathname + (qs ? '?' + qs : '') + window.location.hash);
    }

    if (verifyResult) {
      let pending = '';
      try { pending = localStorage.getItem('ivy_pending_email') || ''; } catch (e) {}
      if (verifyResult === 'ok') {
        try { localStorage.removeItem('ivy_pending_email'); } catch (e) {}
        openLoginWithEmail(pending, 'Xác nhận Gmail thành công! Mời bạn đăng nhập bằng Gmail và mật khẩu vừa đăng ký.');
      } else {
        openLoginWithEmail(pending);
        showLoginNotice('<i class="fa fa-exclamation-circle"></i> Liên kết xác nhận đã hết hạn hoặc đã được dùng. Hãy thử đăng nhập; nếu tài khoản chưa xác nhận, bấm "Gửi lại thư xác nhận".', 'warn');
      }
    }

    const googleMessages = {
      'huy': 'Bạn đã huỷ đăng nhập Google.',
      'loi': 'Đăng nhập Google chưa thành công, vui lòng thử lại.',
      'chua-cai': 'Đăng nhập Google đang được cài đặt, vui lòng dùng Gmail + mật khẩu.',
      'sai-tai-khoan': 'Gmail này đã gắn với một tài khoản Google khác. Vui lòng đăng nhập bằng mật khẩu.'
    };

    accountApi('me').then(({ ok, data }) => {
      if (!ok) return; // máy chủ chưa sẵn sàng: giữ nguyên trạng thái cũ
      if (data.user) {
        setCurrentUser(data.user);
        updateHeaderAuthState();
        if (googleResult === 'ok') afterServerLogin(data.user, 'Đăng nhập Google (' + data.user.email + ') thành công!\nChào mừng ' + data.user.name + ' đến với IVY LUXE SPA.');
      } else {
        // Phiên trên máy chủ đã hết/đăng xuất → xoá thông tin đăng nhập cũ lưu trong trình duyệt
        if (getCurrentUser()) {
          setCurrentUser(null);
          updateHeaderAuthState();
        }
        if (googleResult && googleMessages[googleResult]) {
          openAuthModalWithTab('login');
          showLoginNotice('<i class="fa fa-exclamation-circle"></i> ' + googleMessages[googleResult], 'warn');
        }
      }
    });
  }

  function initAuthSystem() {
    getAuthUsers(); // ensure seed data exists
    updateHeaderAuthState();
    syncServerSession();

    const authModal = document.getElementById('auth-modal');
    const authModalClose = document.getElementById('auth-modal-close');
    const headerAuthBtn = document.getElementById('header-auth-btn');
    const mobileAuthBtn = document.getElementById('mobile-auth-btn');
    const userDropdown = document.getElementById('header-user-dropdown');
    const logoutBtn = document.getElementById('dd-logout-btn');
    const historyBtn = document.getElementById('dd-history-btn');

    // Helper for snappy mobile touch interaction
    function bindFastClick(el, handler) {
      if (!el) return;
      let touched = false;
      el.addEventListener('touchend', (e) => {
        touched = true;
        e.preventDefault();
        handler(e);
        setTimeout(() => { touched = false; }, 350);
      }, { passive: false });
      el.addEventListener('click', (e) => {
        if (touched) return;
        e.preventDefault();
        handler(e);
      });
    }

    // Global Header & Mobile Auth Button Toggle
    function toggleAuthOrDropdown(e) {
      if (e && e.stopPropagation) e.stopPropagation();
      const user = getCurrentUser();
      const uDropdown = document.getElementById('header-user-dropdown');
      const mDropdown = document.getElementById('mobile-user-dropdown');

      if (user) {
        const isMobile = (window.innerWidth <= 991) || (e && e.currentTarget && (e.currentTarget.id === 'mobile-auth-btn' || e.currentTarget.closest('#mobile-auth-btn')));
        if (isMobile && mDropdown) {
          if (uDropdown) uDropdown.style.display = 'none';
          mDropdown.style.display = (mDropdown.style.display === 'block') ? 'none' : 'block';
        } else if (uDropdown) {
          if (mDropdown) mDropdown.style.display = 'none';
          uDropdown.style.display = (uDropdown.style.display === 'block') ? 'none' : 'block';
        }
      } else {
        openAuthModalWithTab('login');
      }
    }
    window.toggleAuthOrDropdown = toggleAuthOrDropdown;

    bindFastClick(headerAuthBtn, toggleAuthOrDropdown);
    bindFastClick(mobileAuthBtn, toggleAuthOrDropdown);

    // Mobile Dropdown action buttons (Giao diện đồng nhất với Web)
    const mobileDdLogoutBtn = document.getElementById('mobile-dd-logout-btn');
    const mobileDdHistoryBtn = document.getElementById('mobile-dd-history-btn');

    if (mobileDdLogoutBtn) {
      bindFastClick(mobileDdLogoutBtn, () => {
        logoutEverywhere();
        const mDropdown = document.getElementById('mobile-user-dropdown');
        if (mDropdown) mDropdown.style.display = 'none';
        alert('Bạn đã đăng xuất tài khoản thành công.');
      });
    }

    if (mobileDdHistoryBtn) {
      bindFastClick(mobileDdHistoryBtn, () => {
        const mDropdown = document.getElementById('mobile-user-dropdown');
        if (mDropdown) mDropdown.style.display = 'none';
        const myBookingsModal = document.getElementById('my-bookings-modal');
        const myBookingsList = document.getElementById('my-bookings-list');
        if (myBookingsModal) {
          renderMyBookings(myBookingsList);
          myBookingsModal.classList.add('active');
          myBookingsModal.style.display = 'flex';
        }
      });
    }

    // Close Dropdowns when clicking outside
    document.addEventListener('click', (e) => {
      const uDropdown = document.getElementById('header-user-dropdown');
      const mDropdown = document.getElementById('mobile-user-dropdown');
      const hAuthBtn = document.getElementById('header-auth-btn');
      const mAuthBtn = document.getElementById('mobile-auth-btn');

      if (uDropdown && !uDropdown.contains(e.target) && (!hAuthBtn || !hAuthBtn.contains(e.target))) {
        uDropdown.style.display = 'none';
      }
      if (mDropdown && !mDropdown.contains(e.target) && (!mAuthBtn || !mAuthBtn.contains(e.target))) {
        mDropdown.style.display = 'none';
      }
    });

    // Close Auth Modal via Close Button and Backdrop Click
    bindFastClick(authModalClose, closeAuthModal);

    if (authModal) {
      authModal.addEventListener('click', (e) => {
        if (e.target === authModal) {
          closeAuthModal();
        }
      });
    }

    // Auth Tabs Switcher
    const authTabBtns = document.querySelectorAll('.auth-tab-btn');
    const authPanes = document.querySelectorAll('.auth-tab-pane');
    authTabBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const target = btn.getAttribute('data-auth-tab');
        openAuthModalWithTab(target);
      });
    });

    // Preset Demo Buttons
    document.querySelectorAll('.auth-preset-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const email = btn.getAttribute('data-email');
        const pass = btn.getAttribute('data-pass');
        const emailInput = document.getElementById('login-identifier');
        const passInput = document.getElementById('login-password');
        if (emailInput) emailInput.value = email;
        if (passInput) passInput.value = pass;
      });
    });

    // Login Form Submit (Chuẩn hóa tự động cho bàn phím điện thoại)
    const loginForm = document.getElementById('auth-login-form');
    if (loginForm) {
      loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const rawId = document.getElementById('login-identifier')?.value || '';
        const rawPass = document.getElementById('login-password')?.value || '';

        const cleanId = rawId.trim();
        const cleanIdLower = cleanId.toLowerCase();
        const cleanPhone = cleanId.replace(/[\s\.\-\(\)]/g, '').replace(/^\+84/, '0');
        const cleanPass = rawPass.trim();

        if (!cleanId) {
          alert('Vui lòng nhập Email hoặc Số điện thoại đăng nhập.');
          return;
        }
        if (!cleanPass) {
          alert('Vui lòng nhập Mật khẩu.');
          return;
        }

        const submitBtn = loginForm.querySelector('button[type="submit"]');
        const remember = document.getElementById('login-remember')?.checked !== false;
        setBtnLoading(submitBtn, true);
        accountApi('login', { identifier: cleanIdLower.includes('@') ? cleanIdLower : cleanPhone, password: rawPass, remember })
          .then(({ ok, data }) => {
            if (ok && data.user) {
              hideLoginNotice();
              afterServerLogin(data.user, 'Chào mừng ' + (data.user.name || 'Quý khách') + ' quay trở lại với IVY LUXE SPA!');
            } else if (data.error === 'unverified') {
              showUnverifiedNotice(data.email || cleanIdLower);
            } else {
              alert(data.error || 'Sai thông tin tài khoản hoặc mật khẩu! Vui lòng kiểm tra lại.');
            }
          })
          .finally(() => setBtnLoading(submitBtn, false));
      });
    }

    // Register Form Submit (Chuẩn hóa tự động cho điện thoại)
    const regForm = document.getElementById('auth-register-form');
    if (regForm) {
      regForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const fullname = document.getElementById('reg-fullname')?.value.trim() || '';
        const rawEmail = document.getElementById('reg-email')?.value.trim() || '';
        const rawPhone = document.getElementById('reg-phone')?.value.trim() || '';
        const password = document.getElementById('reg-password')?.value || '';
        const confirmPass = document.getElementById('reg-password-confirm')?.value || '';

        if (!fullname) {
          alert('Vui lòng nhập Họ và Tên của bạn.');
          return;
        }

        const cleanEmail = rawEmail.toLowerCase();
        const cleanPhone = rawPhone.replace(/[\s\.\-\(\)]/g, '').replace(/^\+84/, '0');

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(cleanEmail)) {
          alert('Vui lòng nhập đúng địa chỉ Gmail (VD: lan@gmail.com).');
          return;
        }

        if (password.length < 6) {
          alert('Mật khẩu cần tối thiểu 6 ký tự.');
          return;
        }

        if (password !== confirmPass) {
          alert('Mật khẩu nhập lại không khớp. Vui lòng nhập lại.');
          document.getElementById('reg-password-confirm')?.focus();
          return;
        }

        const submitBtn = regForm.querySelector('button[type="submit"]');
        setBtnLoading(submitBtn, true);
        const website = document.getElementById('reg-website')?.value || '';
        accountApi('register', { name: fullname, email: cleanEmail, phone: cleanPhone, password, confirm: confirmPass, website })
          .then(({ ok, data }) => {
            if (ok) {
              try { localStorage.setItem('ivy_pending_email', cleanEmail); } catch (err) {}
              regForm.reset();
              showRegisterVerifyStep(cleanEmail);
            } else if (data.error === 'exists') {
              alert(data.google
                ? 'Gmail này đã có tài khoản (đăng ký bằng Google). Vui lòng bấm "Đăng nhập nhanh bằng Google".'
                : 'Gmail này đã có tài khoản! Đang chuyển sang màn hình Đăng Nhập...');
              openAuthModalWithTab('login');
              const loginId = document.getElementById('login-identifier');
              if (loginId) loginId.value = cleanEmail;
            } else {
              alert(data.error || 'Chưa đăng ký được, vui lòng thử lại.');
            }
          })
          .finally(() => setBtnLoading(submitBtn, false));
      });
    }

    // Bước 2: màn hình "Xác nhận đăng ký qua Gmail"
    const btnVerifyResend = document.getElementById('btn-verify-resend');
    const btnVerifyToLogin = document.getElementById('btn-verify-to-login');
    const btnVerifyEdit = document.getElementById('btn-verify-edit');
    if (btnVerifyResend) {
      btnVerifyResend.addEventListener('click', () => {
        const email = document.getElementById('auth-verify-email')?.textContent || '';
        resendVerifyMail(email, btnVerifyResend);
      });
    }
    if (btnVerifyToLogin) {
      btnVerifyToLogin.addEventListener('click', () => {
        const email = document.getElementById('auth-verify-email')?.textContent || '';
        openLoginWithEmail(email);
      });
    }
    if (btnVerifyEdit) {
      btnVerifyEdit.addEventListener('click', () => {
        const email = document.getElementById('auth-verify-email')?.textContent || '';
        hideRegisterVerifyStep();
        const regEmail = document.getElementById('reg-email');
        if (regEmail) { regEmail.value = email; regEmail.focus(); }
      });
    }

    // Switch between Login, Register, Forgot Password
    const linkToForgot = document.getElementById('auth-link-to-forgot');
    const linkBackLogin = document.getElementById('auth-link-back-login');
    if (linkToForgot) {
      linkToForgot.addEventListener('click', (e) => {
        e.preventDefault();
        openAuthModalWithTab('forgot');
      });
    }
    if (linkBackLogin) {
      linkBackLogin.addEventListener('click', (e) => {
        e.preventDefault();
        openAuthModalWithTab('login');
      });
    }

    // Google Sign-In Modal & Handlers
    const googleAuthModal = document.getElementById('google-auth-modal');
    const googleAuthModalClose = document.getElementById('google-auth-modal-close');
    const googleButtons = document.querySelectorAll('.js-btn-google-auth');

    // Đăng nhập Google thật: chuyển sang trang chọn tài khoản của Google, xong quay về /?google=ok
    googleButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const remember = document.getElementById('login-remember')?.checked !== false;
        window.location.href = '/api/auth/google' + (remember ? '' : '?remember=0');
      });
    });

    bindFastClick(googleAuthModalClose, closeGoogleAuthModal);

    if (googleAuthModal) {
      googleAuthModal.addEventListener('click', (e) => {
        if (e.target === googleAuthModal) {
          closeGoogleAuthModal();
        }
      });
    }

    // Handle selecting pre-set or custom Google account with strict role enforcement
    function handleGoogleLoginSuccess(name, email) {
      const cleanEmail = (email || '').toLowerCase().trim();
      const ALLOWED_ADMINS = ['ivyspahanoi@gmail.com', 'vanhaitech.86@gmail.com'];
      const isAdminEmail = ALLOWED_ADMINS.includes(cleanEmail);
      const resolvedRole = isAdminEmail ? 'admin' : 'customer';
      let resolvedName = name || 'Khách Hàng Google';
      if (cleanEmail === 'ivyspahanoi@gmail.com') resolvedName = 'Quản Trị Viên IVY LUXE';
      if (cleanEmail === 'vanhaitech.86@gmail.com') resolvedName = 'Admin Kỹ Thuật (Văn Hải)';

      const users = getAuthUsers();
      let user = users.find(u => u.email && u.email.toLowerCase() === cleanEmail);
      if (!user) {
        user = {
          name: resolvedName,
          email: cleanEmail,
          phone: '',
          pass: isAdminEmail ? '' : ('google_' + Math.random().toString(36).substring(2, 8)),
          role: resolvedRole,
          authProvider: 'google'
        };
        users.push(user);
        saveAuthUsers(users);
      } else {
        user.authProvider = 'google';
        user.role = resolvedRole; // Ensure correct role according to authorization rules
        if (isAdminEmail) user.pass = '';
        if (!user.name || isAdminEmail) user.name = resolvedName;
        saveAuthUsers(users);
      }

      setCurrentUser(user);
      updateHeaderAuthState();

      closeGoogleAuthModal();
      closeAuthModal();

      alert(`Đăng nhập Google (${cleanEmail}) thành công!\nChào mừng ${user.name} đến với IVY LUXE SPA.`);

      if (user.role === 'admin') {
        const goToAdmin = confirm('Đăng nhập Quản Trị Viên thành công! Bạn có muốn mở Trang Quản Trị Admin ngay bây giờ?');
        if (goToAdmin) window.location.href = 'admin.html';
      } else if (user.role === 'partner') {
        window.location.hash = '#affiliate';
      }
    }

    // Google Sign-In Input Submission Handler (Đăng nhập riêng tư, không lộ thông tin)
    const btnCustomGoogleSubmit = document.getElementById('btn-custom-google-submit');
    const customGoogleEmail = document.getElementById('custom-google-email');
    const customGoogleName = document.getElementById('custom-google-name');
    const googleForm = document.getElementById('google-auth-direct-form');

    function triggerGoogleLogin() {
      const emailInput = customGoogleEmail?.value.trim() || '';
      let nameInput = customGoogleName?.value.trim() || '';

      if (!emailInput || !emailInput.includes('@')) {
        alert('Vui lòng nhập địa chỉ Email hoặc Gmail hợp lệ.');
        customGoogleEmail?.focus();
        return;
      }

      if (!nameInput) {
        nameInput = emailInput.split('@')[0];
      }

      handleGoogleLoginSuccess(nameInput, emailInput);
    }

    if (btnCustomGoogleSubmit) {
      btnCustomGoogleSubmit.addEventListener('click', (e) => {
        e.preventDefault();
        triggerGoogleLogin();
      });
    }

    if (googleForm) {
      googleForm.addEventListener('submit', (e) => {
        e.preventDefault();
        triggerGoogleLogin();
      });
    }

    [customGoogleEmail, customGoogleName].forEach(input => {
      if (input) {
        input.addEventListener('keydown', (e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            triggerGoogleLogin();
          }
        });
      }
    });

    // Quên mật khẩu: gửi mã OTP 6 số tới Gmail của tài khoản, nhập mã + mật khẩu mới
    let activeResetIdentifier = null;

    const btnSendOtp = document.getElementById('btn-forgot-send-otp');
    const forgotStepOtp = document.getElementById('forgot-step-otp');
    const forgotOtpNotice = document.getElementById('forgot-otp-notice');
    const forgotForm = document.getElementById('auth-forgot-form');

    if (btnSendOtp) {
      btnSendOtp.addEventListener('click', () => {
        const rawId = document.getElementById('forgot-identifier')?.value.trim() || '';
        if (!rawId) {
          alert('Vui lòng nhập Gmail hoặc Số điện thoại đã đăng ký!');
          document.getElementById('forgot-identifier')?.focus();
          return;
        }

        setBtnLoading(btnSendOtp, true);
        accountApi('forgot', { identifier: rawId })
          .then(({ ok, data }) => {
            if (!ok) {
              alert(data.error || 'Chưa gửi được mã, vui lòng thử lại.');
              return;
            }
            activeResetIdentifier = rawId;
            if (forgotOtpNotice) {
              forgotOtpNotice.innerHTML = `
                <div>
                  <i class="fa fa-envelope" style="color:#25D366; font-size:1.1rem;"></i>
                  <strong>Đã gửi mã xác thực!</strong>
                </div>
                <div style="margin-top:6px;">
                  Nếu <strong>${authEscape(rawId)}</strong> đã đăng ký tài khoản, mã OTP 6 số vừa được gửi tới <strong>Gmail</strong> của tài khoản.
                </div>
                <div style="margin-top:4px; font-size:0.78rem;">
                  (Mã có hiệu lực 15 phút. Không thấy thư? Xem mục Spam / Quảng cáo.)
                </div>
              `;
            }
            if (forgotStepOtp) forgotStepOtp.style.display = 'block';
            const otpInput = document.getElementById('forgot-otp-input');
            if (otpInput) {
              otpInput.value = '';
              otpInput.focus();
            }
            btnSendOtp.innerHTML = '<i class="fa fa-refresh"></i> GỬI LẠI MÃ MỚI';
          })
          .finally(() => setBtnLoading(btnSendOtp, false));
      });
    }

    if (forgotForm) {
      forgotForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const otpEntered = document.getElementById('forgot-otp-input')?.value.trim() || '';
        const newPass = document.getElementById('forgot-new-pass')?.value || '';
        const confirmPass = document.getElementById('forgot-confirm-pass')?.value || '';

        if (!activeResetIdentifier) {
          alert('Vui lòng bấm "GỬI MÃ XÁC THỰC (OTP)" trước!');
          return;
        }
        if (!/^\d{6}$/.test(otpEntered)) {
          alert('Vui lòng nhập đủ mã OTP 6 số trong thư Gmail.');
          return;
        }
        if (newPass.length < 6) {
          alert('Mật khẩu mới phải có tối thiểu 6 ký tự!');
          return;
        }
        if (newPass !== confirmPass) {
          alert('Mật khẩu mới và Xác nhận mật khẩu không trùng khớp!');
          return;
        }

        const submitBtn = document.getElementById('btn-forgot-submit');
        setBtnLoading(submitBtn, true);
        accountApi('reset', { identifier: activeResetIdentifier, otp: otpEntered, password: newPass, confirm: confirmPass })
          .then(({ ok, data }) => {
            if (!ok) {
              alert(data.error || 'Chưa đặt lại được mật khẩu, vui lòng thử lại.');
              return;
            }
            activeResetIdentifier = null;
            if (forgotStepOtp) forgotStepOtp.style.display = 'none';
            if (btnSendOtp) btnSendOtp.innerHTML = '<i class="fa fa-paper-plane"></i> GỬI MÃ XÁC THỰC (OTP)';
            ['forgot-otp-input', 'forgot-new-pass', 'forgot-confirm-pass'].forEach(id => {
              const el = document.getElementById(id);
              if (el) el.value = '';
            });
            openLoginWithEmail(data.email, 'Đặt lại mật khẩu thành công! Vui lòng đăng nhập bằng mật khẩu mới.');
          })
          .finally(() => setBtnLoading(submitBtn, false));
      });
    }

    // Logout Action
    if (logoutBtn) {
      logoutBtn.addEventListener('click', () => {
        logoutEverywhere();
        alert('Bạn đã đăng xuất tài khoản thành công.');
      });
    }

    // My Bookings History Modal
    const myBookingsModal = document.getElementById('my-bookings-modal');
    const myBookingsClose = document.getElementById('my-bookings-close');
    const myBookingsList = document.getElementById('my-bookings-list');

    if (historyBtn && myBookingsModal) {
      historyBtn.addEventListener('click', () => {
        if (userDropdown) userDropdown.style.display = 'none';
        renderMyBookings(myBookingsList);
        myBookingsModal.classList.add('active');
        myBookingsModal.style.display = 'flex';
      });
    }

    if (myBookingsClose && myBookingsModal) {
      myBookingsClose.addEventListener('click', () => {
        myBookingsModal.classList.remove('active');
        myBookingsModal.style.display = 'none';
      });
    }
  }

  function renderMyBookings(container) {
    if (!container) return;
    const user = getCurrentUser();
    let allBookings = [];
    try {
      allBookings = JSON.parse(localStorage.getItem('ivy_bookings') || '[]');
    } catch (e) {}

    let userBookings = allBookings;
    if (user && user.role === 'customer') {
      userBookings = allBookings.filter(b => b.phone === user.phone || b.name === user.name);
    }

    if (!userBookings.length) {
      container.innerHTML = `
        <div style="text-align:center; padding: 40px 20px; color:#5A6560;">
          <i class="fa fa-calendar-o" style="font-size:3rem; color:#D4AF37; margin-bottom:12px; display:block;"></i>
          <h4 style="font-family:'Be Vietnam Pro',serif; color:#0A2E20; margin-bottom:8px;">Chưa có lịch hẹn nào</h4>
          <p style="font-size:0.9rem;">Bạn chưa có lịch hẹn dịch vụ nào tại IVY LUXE SPA. Hãy chọn gói dịch vụ yêu thích và đặt lịch ngay!</p>
          <a href="#booking-form-box" class="nav-cta-btn js-open-booking" style="margin-top:15px; display:inline-block;">ĐẶT LỊCH NGAY</a>
        </div>
      `;
      return;
    }

    container.innerHTML = userBookings.map(b => {
      const isPaid = (b.status && b.status.includes('thanh toán')) || (b.paymentStatus && b.paymentStatus.includes('thanh toán'));
      return `
        <div class="my-booking-card">
          <div>
            <div class="mb-service"><strong>${b.service}</strong></div>
            <div class="mb-meta">
              <span><i class="fa fa-ticket"></i> Mã: <strong>${b.id}</strong></span> • 
              <span><i class="fa fa-calendar"></i> ${b.date} (${b.time})</span> • 
              <span><i class="fa fa-users"></i> ${b.guests}</span>
            </div>
            <div class="mb-meta" style="margin-top:4px;">
              <span>Hình thức: ${b.payMethodLabel || 'Tại quầy'}</span> • 
              <span>Số tiền: <strong style="color:#B22222;">${(b.payableAmount || b.totalPrice || 0).toLocaleString('vi-VN')}đ</strong></span>
            </div>
          </div>
          <div>
            <span class="mb-status-badge ${isPaid ? 'status-paid' : 'status-pending'}">
              ${isPaid ? '✓ Đã Thanh Toán SePay' : 'Chờ Thanh Toán'}
            </span>
          </div>
        </div>
      `;
    }).join('');
  }


  function initHeroBackgroundSlider() {
    const slides = document.querySelectorAll('.hero-slides-container .hero-slide');
    const dots = document.querySelectorAll('#hero-slider-dots .hero-dot');
    const heroBox = document.getElementById('booking-form-box');
    if (!slides.length || !dots.length) return;

    let currentSlide = 0;
    let slideTimer = null;
    const intervalDuration = 4500; // 4.5 seconds per slide for a relaxing luxury pace

    function goToSlide(index) {
      if (index < 0) index = slides.length - 1;
      if (index >= slides.length) index = 0;
      currentSlide = index;

      slides.forEach((slide, i) => {
        if (i === currentSlide) {
          slide.classList.add('active');
        } else {
          slide.classList.remove('active');
        }
      });

      dots.forEach((dot, i) => {
        if (i === currentSlide) {
          dot.classList.add('active');
        } else {
          dot.classList.remove('active');
        }
      });
    }

    function nextSlide() {
      goToSlide((currentSlide + 1) % slides.length);
    }

    function startTimer() {
      stopTimer();
      slideTimer = setInterval(nextSlide, intervalDuration);
    }

    function stopTimer() {
      if (slideTimer) {
        clearInterval(slideTimer);
        slideTimer = null;
      }
    }

    // Interactive dot clicks
    dots.forEach((dot, i) => {
      dot.addEventListener('click', (e) => {
        e.preventDefault();
        goToSlide(i);
        startTimer(); // restart timer on click
      });
    });

    // Pause slideshow when interacting with the booking box to keep it stable
    if (heroBox) {
      heroBox.addEventListener('mouseenter', stopTimer);
      heroBox.addEventListener('mouseleave', startTimer);
      heroBox.addEventListener('focusin', stopTimer);
      heroBox.addEventListener('focusout', startTimer);
    }

    startTimer();
  }

  // =========================================================================
  // INITIALIZE
  // =========================================================================
  updatePageLanguage();
  init3DTilt();
  updatePromoPrices();
  initTimePickerHandlers();
  initGuestPickerHandlers();
  initHeroBackgroundSlider();
  initAffiliateSystem();
  initAuthSystem();

  // =========================================================================
  // AFFILIATE SYSTEM ENGINE (TRACKING, LINK GENERATION, QR, TEMPLATES & STATS)
  // =========================================================================

  function getAffiliateBaseUrl() {
    const isLocal = window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost';
    return isLocal ? 'https://ivyluxe.com.vn' : window.location.origin;
  }

  // Dữ liệu Affiliate thật nằm trên máy chủ (/api/aff). Xoá dữ liệu mẫu cũ còn lưu trong trình duyệt khách.
  try {
    localStorage.removeItem('ivy_affiliates_data');
    localStorage.removeItem('ivy_transactions');
  } catch (e) {}

  function getAffiliateStore() {
    return { partners: [] };
  }

  function saveAffiliateStore() {}

  // Lượt click link giới thiệu được đếm trên máy chủ (mỗi khách / mã / ngày tính 1 lần)
  function recordAffiliateClick(code) {
    fetch('/api/aff?a=click', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code })
    }).catch(() => {});
  }

  // Đơn đặt lịch được gắn với đối tác ngay trong CRM (xem sendLead) — không cần ghi ở trình duyệt
  function recordAffiliateBooking() {}

  function initAffiliateSystem() {
    // A. Detect Referral in URL (?ref=... or ?aff=...)
    const urlParams = new URLSearchParams(window.location.search);
    const refParam = urlParams.get('ref') || urlParams.get('aff') || urlParams.get('partner');
    
    if (refParam) {
      let cleanRef = refParam.trim().toUpperCase();
      if (!cleanRef.startsWith('IVY-')) cleanRef = 'IVY-' + cleanRef;
      localStorage.setItem('ivy_affiliate_ref', cleanRef);
      // Cookie 30 ngày: máy chủ đọc khi khách tạo tài khoản → thành viên F1 của đối tác
      document.cookie = 'ivy_ref=' + encodeURIComponent(cleanRef.replace(/^IVY-/, '')) + '; Max-Age=' + (30 * 86400) + '; Path=/; SameSite=Lax' + (location.protocol === 'https:' ? '; Secure' : '');
      recordAffiliateClick(cleanRef);
    }

    // B. Show Top VIP Referral Banner & Modal Badge
    const activeRef = localStorage.getItem('ivy_affiliate_ref');
    const affBanner = document.getElementById('aff-ref-banner');
    const affBannerCode = document.getElementById('aff-banner-code');
    const affBannerClose = document.getElementById('aff-ref-banner-close');
    const modalAffBadge = document.getElementById('modal-aff-badge');
    const modalAffCodeText = document.getElementById('modal-aff-code-text');

    if (activeRef) {
      if (affBanner) {
        if (affBannerCode) affBannerCode.textContent = activeRef;
        affBanner.style.display = 'block';
      }
      if (modalAffBadge && modalAffCodeText) {
        modalAffCodeText.textContent = activeRef;
        modalAffBadge.style.display = 'flex';
      }
    }

    if (affBannerClose && affBanner) {
      affBannerClose.addEventListener('click', () => {
        affBanner.style.display = 'none';
      });
    }

    // C. Tabs Switcher
    const tabBtns = document.querySelectorAll('.aff-tab-btn');
    const tabPanes = document.querySelectorAll('.aff-tab-pane');
    tabBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const tabTarget = btn.getAttribute('data-tab');
        tabBtns.forEach(b => b.classList.remove('active'));
        tabPanes.forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        const pane = document.getElementById('aff-tab-' + tabTarget);
        if (pane) pane.classList.add('active');
      });
    });

    // D. Elements for Output
    const displayCode = document.getElementById('aff-display-code');
    const qrImage = document.getElementById('aff-qr-image');
    const outputUrl = document.getElementById('aff-output-url');

    function updateAffiliateDisplay(code, name = '') {
      let cleanCode = code.trim().toUpperCase().replace(/[^A-Z0-9_-]/g, '');
      if (!cleanCode) cleanCode = 'IVY_VIP';
      const fullCode = cleanCode.startsWith('IVY-') ? cleanCode : 'IVY-' + cleanCode;
      const baseUrl = getAffiliateBaseUrl();
      const fullLink = baseUrl + '/?ref=' + encodeURIComponent(fullCode);
      const qrApiUrl = 'https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=' + encodeURIComponent(fullLink);

      if (displayCode) displayCode.textContent = fullCode;
      if (outputUrl) outputUrl.value = fullLink;
      if (qrImage) qrImage.src = qrApiUrl;

      // Update Template text previews in Tab 2
      updateTemplatePreviews(fullLink, fullCode);
    }

    function updateTemplatePreviews(link, code) {
      ['tpl-text-1', 'tpl-text-2', 'tpl-text-3'].forEach(id => {
        const el = document.getElementById(id);
        if (!el) return;
        let original = el.getAttribute('data-raw-tpl');
        if (!original) {
          original = el.innerText;
          el.setAttribute('data-raw-tpl', original);
        }
        el.innerText = original.replace(/\{AFF_LINK\}/g, link).replace(/\{AFF_CODE\}/g, code);
      });
    }

    // Initialize with default or last partner
    const store = getAffiliateStore();
    const defaultPartner = store.partners[0];
    if (defaultPartner) {
      updateAffiliateDisplay(defaultPartner.code, defaultPartner.name);
    } else {
      updateAffiliateDisplay('IVY-VIP');
    }

    // E. Form Submit: Register & Generate New Referral Link
    const form = document.getElementById('aff-register-form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('aff-partner-name')?.value.trim() || 'Đối Tác';
        const phone = document.getElementById('aff-partner-phone')?.value.trim() || '';
        const typeSelect = document.getElementById('aff-partner-type');
        const type = typeSelect?.value || 'hotel';
        const typeName = typeSelect?.options[typeSelect.selectedIndex]?.text || 'Đối Tác';
        const rawCode = document.getElementById('aff-partner-code')?.value.trim().toUpperCase() || 'VIP';
        const bank = document.getElementById('aff-partner-bank')?.value.trim() || 'Chưa cập nhật STK';

        let fullCode = rawCode.startsWith('IVY-') ? rawCode : 'IVY-' + rawCode;
        fullCode = fullCode.replace(/[^A-Z0-9_-]/g, '');

        // Save to store
        const currentStore = getAffiliateStore();
        let existing = currentStore.partners.find(p => p.code === fullCode || p.phone === phone);
        if (existing) {
          existing.name = name;
          existing.phone = phone;
          existing.type = type;
          existing.typeName = typeName;
          existing.bank = bank;
          existing.code = fullCode;
        } else {
          currentStore.partners.unshift({
            name,
            phone,
            type,
            typeName,
            code: fullCode,
            bank,
            clicks: 1,
            bookings: 0,
            revenue: 0,
            commission: 0
          });
        }
        saveAffiliateStore(currentStore);

        // Update displays
        updateAffiliateDisplay(fullCode, name);

        // Visual feedback & toast
        const submitBtn = document.getElementById('aff-submit-btn');
        if (submitBtn) {
          const originalText = submitBtn.innerHTML;
          submitBtn.innerHTML = '<i class="fa fa-check"></i> ĐÃ KHỞI TẠO THÀNH CÔNG!';
          submitBtn.style.background = 'linear-gradient(135deg, #25D366, #128C7E)';
          submitBtn.style.color = '#FFF';
          setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.style.background = '';
            submitBtn.style.color = '';
          }, 2500);
        }

        // Smooth scroll to output card on mobile
        const resultCard = document.getElementById('aff-result-card');
        if (resultCard && window.innerWidth < 992) {
          resultCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      });
    }

    // F. Copy Link Button Handler
    const copyBtn = document.getElementById('aff-btn-copy');
    const copyBtnText = document.getElementById('aff-btn-copy-text');
    if (copyBtn && outputUrl) {
      copyBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const link = outputUrl.value;
        if (!link) return;
        navigator.clipboard.writeText(link).then(() => {
          if (copyBtnText) copyBtnText.textContent = 'Đã sao chép! ✓';
          copyBtn.style.background = '#25D366';
          copyBtn.style.color = '#FFF';
          setTimeout(() => {
            if (copyBtnText) copyBtnText.textContent = 'Sao Chép';
            copyBtn.style.background = '';
            copyBtn.style.color = '';
          }, 2000);
        }).catch(() => {
          outputUrl.select();
          document.execCommand('copy');
          if (copyBtnText) copyBtnText.textContent = 'Đã sao chép! ✓';
        });
      });
    }

    // G. Download QR Code Handler
    const downloadQrBtn = document.getElementById('aff-btn-download-qr');
    if (downloadQrBtn) {
      downloadQrBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const qrImg = document.getElementById('aff-qr-image');
        const code = displayCode ? displayCode.textContent : 'IVY-VIP';
        if (!qrImg || !qrImg.src) return;

        fetch(qrImg.src)
          .then(res => res.blob())
          .then(blob => {
            const blobUrl = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = blobUrl;
            a.download = 'IVY-LUXE-SPA-QR-' + code + '.png';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(blobUrl);
          })
          .catch(() => {
            window.open(qrImg.src, '_blank');
          });
      });
    }

    // H. Direct Zalo & WhatsApp Share Handlers
    const zaloBtn = document.getElementById('aff-share-zalo');
    if (zaloBtn) {
      zaloBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const link = outputUrl?.value || getAffiliateBaseUrl();
        const code = displayCode ? displayCode.textContent : 'IVY-VIP';
        const msg = 'Dạ em gửi anh/chị thông tin và ưu đãi tại IVY LUXE SPA (Địa chỉ: SỐ 48 PHỐ HÀ TRUNG, PHƯỜNG HOÀN KIẾM, THÀNH PHỐ HÀ NỘI). Đặt qua link riêng này được GIẢM 10% & TẶNG NGÂM CHÂN THẢO DƯỢC miễn phí: ' + link + ' (Mã: ' + code + ') - Hotline: 098 9713660.';
        
        navigator.clipboard.writeText(msg).then(() => {
          alert('Đã sao chép tin nhắn mời khách kèm link giới thiệu! Đang mở Zalo...');
          window.open('https://chat.zalo.me/', '_blank');
        }).catch(() => {
          window.open('https://chat.zalo.me/', '_blank');
        });
      });
    }

    const waBtn = document.getElementById('aff-share-whatsapp');
    if (waBtn) {
      waBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const link = outputUrl?.value || getAffiliateBaseUrl();
        const code = displayCode ? displayCode.textContent : 'IVY-VIP';
        const msg = 'Hello! Welcome to Hanoi! For high-end massage & body wellness, check out IVY LUXE SPA at 48 Ha Trung, Hoan Kiem. Book with my link to get 10% VIP DISCOUNT + FREE herbal foot soak: ' + link + ' (Code: ' + code + ') - WhatsApp: +84989713660';
        window.open('https://wa.me/?text=' + encodeURIComponent(msg), '_blank');
      });
    }

    // I. Template 1-Click Copy Buttons
    document.querySelectorAll('.aff-tpl-copy-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = btn.getAttribute('data-tpl-target');
        const targetEl = document.getElementById(targetId);
        if (targetEl) {
          const text = targetEl.innerText;
          navigator.clipboard.writeText(text).then(() => {
            const originalHtml = btn.innerHTML;
            btn.innerHTML = '<i class="fa fa-check"></i> <span>Đã sao chép!</span>';
            btn.style.background = '#25D366';
            btn.style.color = '#FFF';
            setTimeout(() => {
              btn.innerHTML = originalHtml;
              btn.style.background = '';
              btn.style.color = '';
            }, 2000);
          });
        }
      });
    });

    // J. Tab 3: Partner Stats & Commission Lookup
    const lookupBtn = document.getElementById('aff-lookup-btn');
    const lookupInput = document.getElementById('aff-lookup-query');
    const lookupResult = document.getElementById('aff-lookup-result');

    function performLookup() {
      const q = lookupInput?.value.trim().toUpperCase() || '';
      if (!q) {
        alert('Vui lòng nhập Số Điện Thoại hoặc Mã Đối Tác của bạn để tra cứu!');
        lookupInput?.focus();
        return;
      }

      const currentStore = getAffiliateStore();
      let match = currentStore.partners.find(p => 
        p.code.toUpperCase() === q || 
        p.code.replace('IVY-', '').toUpperCase() === q.replace('IVY-', '') ||
        p.phone === q ||
        p.name.toUpperCase().includes(q)
      );

      // If not found in custom list, generate a matching partner record
      if (!match) {
        match = {
          name: q.startsWith('0') ? 'Đối Tác ' + q : q,
          phone: q.startsWith('0') ? q : '098 9713660',
          type: 'hotel',
          typeName: 'Đối Tác Tiếp Thị',
          code: q.startsWith('IVY-') ? q : 'IVY-' + q,
          bank: 'Tài khoản ngân hàng của đối tác',
          clicks: 42,
          bookings: 5,
          revenue: 4500000,
          commission: 900000
        };
      }

      // Populate Result
      const resName = document.getElementById('aff-res-name');
      const resMeta = document.getElementById('aff-res-meta');
      const resClicks = document.getElementById('aff-res-clicks');
      const resBookings = document.getElementById('aff-res-bookings');
      const resRevenue = document.getElementById('aff-res-revenue');
      const resCommission = document.getElementById('aff-res-commission');
      const resBank = document.getElementById('aff-res-bank');

      if (resName) resName.textContent = match.name;
      if (resMeta) resMeta.innerHTML = 'Mã: <strong>' + match.code + '</strong> • Loại: ' + (match.typeName || 'Đối Tác');
      if (resClicks) resClicks.textContent = match.clicks.toLocaleString('vi-VN');
      if (resBookings) resBookings.textContent = match.bookings.toLocaleString('vi-VN');
      if (resRevenue) resRevenue.textContent = match.revenue.toLocaleString('vi-VN') + 'đ';
      if (resCommission) resCommission.textContent = match.commission.toLocaleString('vi-VN') + 'đ';
      if (resBank) resBank.textContent = match.bank || 'Vietcombank - Liên hệ quản lý';

      if (lookupResult) {
        lookupResult.style.display = 'block';
        lookupResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }

    if (lookupBtn) lookupBtn.addEventListener('click', (e) => {
      e.preventDefault();
      performLookup();
    });
    if (lookupInput) {
      lookupInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          performLookup();
        }
      });
    }
  }

  // =========================================================================
  // HOMEPAGE AFFILIATE (MỤC #AFFILIATE) — DỮ LIỆU THẬT TỪ MÁY CHỦ (/api/aff)
  // =========================================================================
  let homeAffData = null;

  function affPost(action, body) {
    return fetch('/api/aff?a=' + action, {
      method: 'POST', credentials: 'same-origin', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body)
    }).then(res => res.json().catch(() => ({})).then(data => ({ ok: res.ok, status: res.status, data })))
      .catch(() => ({ ok: false, data: { error: 'Không kết nối được máy chủ.' } }));
  }

  function loadHomeAff() {
    // auto=1: tài khoản đã đăng nhập tự được kích hoạt Đối tác khi mở Dashboard
    return fetch('/api/aff?a=me&auto=1', { credentials: 'same-origin', cache: 'no-store' })
      .then(res => (res.ok ? res.json() : null))
      .then(data => { homeAffData = data; return data; })
      .catch(() => null);
  }

  window.toggleHomeAffiliateView = function() {
    const regView = document.getElementById('home-aff-view-register');
    const dashView = document.getElementById('home-aff-view-dashboard');
    const toggleText = document.getElementById('home-aff-toggle-text');
    if (!regView || !dashView) return;

    if (dashView.style.display === 'none') {
      regView.style.display = 'none';
      dashView.style.display = 'block';
      if (toggleText) toggleText.textContent = 'Đăng Ký & Đăng Nhập';
      loadHomeAff().then(renderHomeDashData);
    } else {
      regView.style.display = 'block';
      dashView.style.display = 'none';
      if (toggleText) toggleText.textContent = 'Xem Dashboard Quản Lý';
    }
  };

  function renderHomeDashData() {
    const d = homeAffData && homeAffData.partner ? homeAffData : null;
    const s = d ? d.summary : {};
    const money = n => (n || 0).toLocaleString('vi-VN') + 'đ';
    const set = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = v; };
    set('home-dash-email-display', d ? d.partner.email + ' · Mã: IVY-' + d.partner.code : (homeAffData ? 'Tài khoản chưa đăng ký đối tác' : 'Chưa đăng nhập'));
    set('home-stat-clicks', d ? d.clicks.total : 0);
    set('home-stat-orders', d ? s.ordersSuccess : 0);
    set('home-stat-pending', money(d ? s.pendingAmount : 0));
    set('home-stat-received', money(d ? s.availableAmount : 0));
    const activePill = document.querySelector('#home-aff-view-dashboard .aff-time-pill.active');
    window.filterHomePerf(activePill ? parseInt(activePill.textContent, 10) || 7 : 7, activePill);
  }

  window.switchHomeAuthTab = function(type) {
    const btnReg = document.getElementById('home-btn-tab-reg');
    const btnLogin = document.getElementById('home-btn-tab-login');
    const formReg = document.getElementById('home-aff-reg-form');
    const formLogin = document.getElementById('home-aff-login-form');
    const isReg = type === 'register';
    if (btnReg) btnReg.classList.toggle('active', isReg);
    if (btnLogin) btnLogin.classList.toggle('active', !isReg);
    if (formReg) formReg.style.display = isReg ? 'block' : 'none';
    if (formLogin) formLogin.style.display = isReg ? 'none' : 'block';
  };

  // Đăng nhập Google thật → về trang Affiliate
  window.handleHomeAffiliateGoogle = function() {
    window.location.href = '/api/auth/google?next=/affiliate';
  };

  window.handleHomeAffiliateRegister = function(e) {
    e.preventDefault();
    const val = id => (document.getElementById(id)?.value || '').trim();
    const btn = e.target.querySelector('button[type="submit"]');
    if (btn) btn.disabled = true;
    affPost('register', {
      name: val('home-aff-name'), phone: val('home-aff-phone'), code: val('home-aff-refcode'),
      email: val('home-aff-email'), password: document.getElementById('home-aff-pass')?.value || '',
      website: val('home-aff-website')
    }).then(({ ok, data }) => {
      if (ok && data.needVerify) {
        alert('Đã gửi thư xác nhận tới ' + data.email + '.\nMở Gmail, bấm "XÁC NHẬN ĐĂNG KÝ" rồi đăng nhập để vào Dashboard Đối Tác.');
        e.target.reset();
      } else if (ok) {
        window.location.href = '/affiliate';
      } else if (data.error === 'exists') {
        alert(data.message || 'Gmail này đã có tài khoản. Vui lòng Đăng nhập.');
        window.switchHomeAuthTab('login');
      } else {
        alert(data.error || 'Chưa đăng ký được, vui lòng thử lại.');
      }
    }).finally(() => { if (btn) btn.disabled = false; });
  };

  window.handleHomeAffiliateLogin = function(e) {
    e.preventDefault();
    const btn = e.target.querySelector('button[type="submit"]');
    if (btn) btn.disabled = true;
    accountApi('login', {
      identifier: (document.getElementById('home-aff-login-account')?.value || '').trim(),
      password: document.getElementById('home-aff-login-pass')?.value || '',
      remember: true
    }).then(({ ok, data }) => {
      if (!ok) {
        alert(data.error === 'unverified' ? 'Tài khoản chưa xác nhận Gmail. Vui lòng mở thư xác nhận trong Gmail.' : (data.error || 'Đăng nhập chưa thành công.'));
        return;
      }
      setCurrentUser(data.user);
      updateHeaderAuthState();
      window.location.href = '/affiliate';
    }).finally(() => { if (btn) btn.disabled = false; });
  };

  window.copyHomeAffLink = function() {
    if (!homeAffData || !homeAffData.partner) {
      alert('Vui lòng đăng ký / đăng nhập Đối tác để lấy link giới thiệu riêng.');
      return;
    }
    const link = window.location.origin + '/?ref=' + encodeURIComponent(homeAffData.partner.code);
    navigator.clipboard.writeText(link).then(() => {
      const copyText = document.getElementById('home-dash-copy-text');
      if (copyText) {
        copyText.textContent = 'Đã sao chép! ✓';
        setTimeout(() => { copyText.textContent = 'Sao chép Link'; }, 2000);
      }
    }).catch(() => {
      prompt('Sao chép link tiếp thị:', link);
    });
  };

  window.switchHomeDashTab = function(tab, btn) {
    if (tab === 'overview') {
      document.querySelectorAll('#home-aff-view-dashboard .aff-nav-pill').forEach(b => b.classList.remove('active'));
      if (btn) btn.classList.add('active');
    } else {
      window.location.href = '/affiliate?view=dashboard&tab=' + tab;
    }
  };

  window.filterHomePerf = function(days, btn) {
    document.querySelectorAll('#home-aff-view-dashboard .aff-time-pill').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');
    const series = homeAffData && homeAffData.partner ? homeAffData.clicks.days : [];
    const total = series.slice(-days).reduce((sum, x) => sum + x.n, 0);
    const countEl = document.getElementById('home-perf-clicks');
    const labelEl = document.getElementById('home-perf-label');
    if (countEl) countEl.textContent = total;
    if (labelEl) labelEl.textContent = `clicks ${days} ngày qua`;
  };

  // Set default minimum date in hero datepicker
  const heroDate = document.getElementById('hero-select-date');
  if (heroDate) {
    const today = new Date().toISOString().split('T')[0];
    heroDate.value = today;
    heroDate.min = today;
  }

  // =========================================================================
  // UNIVERSAL LANGUAGE SWITCHER CONTROLLER (TOP BAR, HEADER & FLOATING TOGGLE)
  // =========================================================================
  window.changeSiteLanguage = function(newLang) {
    if (!newLang || !languageConfig[newLang]) return;
    state.language = newLang;
    localStorage.setItem('ivy_lang', newLang);
    updatePageLanguage();
    const conf = languageConfig[newLang];
    showToast(newLang === 'vi' ? `${conf.flag} Ngôn ngữ: ${conf.name}` : `${conf.flag} Language: ${conf.name}`);
    // Close popovers
    const picker = document.getElementById('header-lang-picker');
    if (picker) picker.classList.remove('open');
  };

  // Top bar quick pills click
  document.querySelectorAll('.top-lang-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      const l = pill.getAttribute('data-lang');
      window.changeSiteLanguage(l);
    });
  });

  // Header picker toggle button
  const headerLangBtn = document.getElementById('header-lang-btn');
  const headerLangPicker = document.getElementById('header-lang-picker');
  if (headerLangBtn && headerLangPicker) {
    headerLangBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      headerLangPicker.classList.toggle('open');
    });
  }

  // Header popover option click
  document.querySelectorAll('.hl-opt-item').forEach(opt => {
    opt.addEventListener('click', (e) => {
      e.stopPropagation();
      const l = opt.getAttribute('data-lang');
      window.changeSiteLanguage(l);
    });
  });

  // Close header popover when clicking anywhere outside
  document.addEventListener('click', (e) => {
    if (headerLangPicker && !headerLangPicker.contains(e.target)) {
      headerLangPicker.classList.remove('open');
    }
  });

  // Nút ngôn ngữ nổi (lá cờ + tam giác): bấm để xổ danh sách 7 ngôn ngữ
  const floatingLangWrap = document.getElementById('floating-lang-wrap');
  const floatingLangToggle = document.getElementById('floating-lang-toggle');
  const setFloatingLangOpen = (open) => {
    if (!floatingLangWrap) return;
    floatingLangWrap.classList.toggle('open', open);
    if (floatingLangToggle) floatingLangToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  };
  if (floatingLangToggle) {
    floatingLangToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      setFloatingLangOpen(!floatingLangWrap.classList.contains('open'));
    });
  }
  document.querySelectorAll('.fl-opt-item').forEach(opt => {
    opt.addEventListener('click', (e) => {
      e.stopPropagation();
      window.changeSiteLanguage(opt.getAttribute('data-lang'));
      setFloatingLangOpen(false);
    });
  });
  document.addEventListener('click', (e) => {
    if (floatingLangWrap && !floatingLangWrap.contains(e.target)) setFloatingLangOpen(false);
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      setFloatingLangOpen(false);
      if (headerLangPicker) headerLangPicker.classList.remove('open');
    }
  });

  // Điện thoại: gom các nút liên hệ nổi vào 1 nút để không che nội dung
  const floatingDock = document.getElementById('orient-floating-dock');
  const dockMoreBtn = document.getElementById('dock-btn-more');
  if (floatingDock && dockMoreBtn) {
    dockMoreBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const open = !floatingDock.classList.contains('dock-open');
      floatingDock.classList.toggle('dock-open', open);
      dockMoreBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    document.addEventListener('click', (e) => {
      if (!floatingDock.contains(e.target)) {
        floatingDock.classList.remove('dock-open');
        dockMoreBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }


  // =========================================================================
  // LEADS → CRM: form "Nhận tư vấn & ưu đãi riêng"
  // =========================================================================
  function sendLead(payload) {
    try {
      const ref = localStorage.getItem('ivy_affiliate_ref');
      if (ref && !payload.ref) payload.ref = ref;
    } catch (e) {}
    return fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    }).then(res => res.json().catch(() => ({})).then(data => ({ ok: res.ok, data })))
      .catch(() => ({ ok: false, data: { error: 'Không kết nối được máy chủ. Vui lòng gọi Hotline/Zalo 098 971 3660.' } }));
  }

  const leadForm = document.getElementById('lead-capture-form');
  if (leadForm) {
    leadForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const msg = document.getElementById('lead-form-msg');
      const val = id => (document.getElementById(id)?.value || '').trim();
      const name = val('lead-name');
      const phone = val('lead-phone');
      const chosen = [...leadForm.querySelectorAll('input[name="lead-need"]:checked')].map(c => c.value);
      const extra = val('lead-need');
      const setMsg = (text, ok) => { if (msg) { msg.textContent = text; msg.className = 'lead-form-msg ' + (ok ? 'is-ok' : 'is-err'); } };
      if (name.length < 2) { setMsg('Vui lòng nhập Họ và tên. / Please enter your name.', false); document.getElementById('lead-name')?.focus(); return; }
      if (!/^\+?\d{8,15}$/.test(phone.replace(/[\s.\-()]/g, ''))) { setMsg('Số điện thoại chưa đúng. / Please check your phone number.', false); document.getElementById('lead-phone')?.focus(); return; }
      const btn = leadForm.querySelector('.lead-submit-btn');
      if (btn) btn.disabled = true;
      sendLead({
        name, phone,
        country: val('lead-country'),
        residence: val('lead-residence'),
        need: [chosen.join(', '), extra].filter(Boolean).join(' — '),
        website: val('lead-website'),
        source: 'form'
      }).then(({ ok, data }) => {
        if (ok) {
          leadForm.reset();
          setMsg('Cảm ơn bạn! IVYLUXE SPA & NAIL sẽ liên hệ trong ít phút. / Thank you! We will contact you shortly.', true);
        } else {
          setMsg(data.error || 'Chưa gửi được, vui lòng thử lại.', false);
        }
      }).finally(() => { if (btn) btn.disabled = false; });
    });
  }

  // =========================================================================
  // BẢN SỬA BẢNG GIÁ GỐC (giá, tên, ảnh, ẩn) + SẢN PHẨM ADMIN ĐĂNG TỪ DASHBOARD
  // =========================================================================
  function applyMenuOverrides(overrides) {
    Object.keys(spaMenuData).forEach(cat => {
      spaMenuData[cat] = spaMenuData[cat].filter(item => {
        const o = overrides[item.id];
        if (!o) return true;
        if (o.hidden) return false;
        if (o.name_vi) item.name_vi = o.name_vi;
        if (o.name_en) {
          // Tên tiếng Anh mới → các ngôn ngữ khác dùng tên này thay cho bản dịch cũ
          item.name_en = o.name_en;
          ['zh', 'ja', 'ko', 'ru', 'fr'].forEach(l => { delete item['name_' + l]; });
        }
        if (o.price_vnd) item.price_vnd = o.price_vnd;
        if (o.price_vnd_max === 0) delete item.price_vnd_max;
        else if (o.price_vnd_max) item.price_vnd_max = o.price_vnd_max;
        if (o.image) item.image = o.image;
        return true;
      });
    });
  }

  fetch('/api/products', { cache: 'no-store' })
    .then(res => (res.ok ? res.json() : { products: [] }))
    .then(({ products, overrides }) => {
      const hasOverrides = overrides && typeof overrides === 'object' && Object.keys(overrides).length > 0;
      if (hasOverrides) applyMenuOverrides(overrides);
      if (!Array.isArray(products)) products = [];
      if (!products.length && !hasOverrides) return;
      products.forEach(p => {
        if (!spaMenuData[p.cat]) return;
        const list = spaMenuData[p.cat].filter(x => x.id !== p.id);
        const item = {
          id: p.id,
          name_vi: p.name_vi,
          name_en: p.name_en || p.name_vi,
          desc_vi: p.desc_vi || '',
          desc_en: p.desc_en || p.desc_vi || '',
          duration_vi: p.duration_vi || '',
          duration_en: p.duration_en || p.duration_vi || '',
          price_vnd: p.price_vnd,
          image: p.image || 'assets/images/hero_spa_luxury.jpg',
          popular: p.popular
        };
        if (p.price_vnd_max) item.price_vnd_max = p.price_vnd_max;
        spaMenuData[p.cat] = [item, ...list];
      });
      renderSpaMenu();
      updateModalServiceOptions();
    })
    .catch(() => {});


  // =========================================================================
  // ƯU ĐÃI / PROMOTION ADMIN ĐĂNG TỪ DASHBOARD (ẢNH + MÔ TẢ)
  // =========================================================================
  var livePromos; // khai báo var: hàm có thể được gọi (đổi ngôn ngữ) trước khi tải xong
  function renderLivePromos() {
    const list = livePromos || [];
    const section = document.getElementById('uu-dai');
    const grid = document.getElementById('live-promos-grid');
    if (!section || !grid) return;
    section.hidden = !list.length;
    if (!list.length) return;
    const vi = state.language === 'vi';
    const pick = (p, k) => (vi ? p[k + '_vi'] : (p[k + '_en'] || p[k + '_vi'])) || '';
    const esc = authEscape;
    const titleEl = document.getElementById('live-promos-title');
    const subEl = document.getElementById('live-promos-sub');
    if (titleEl) titleEl.textContent = vi ? 'ƯU ĐÃI & KHUYẾN MÃI MỚI' : 'LATEST OFFERS & PROMOTIONS';
    if (subEl) subEl.textContent = vi ? 'Chương trình đang áp dụng tại IVYLUXE SPA & NAIL – Số 48 phố Hà Trung, Hoàn Kiếm, Hà Nội' : 'Current offers at IVYLUXE SPA & NAIL – 48 Ha Trung, Hoan Kiem, Hanoi';
    grid.innerHTML = list.map(p => {
      const until = p.validUntil ? p.validUntil.split('-').reverse().join('/') : '';
      return `
        <article class="live-promo-card">
          <div class="live-promo-img">
            <img src="${esc(p.image)}" alt="${esc(pick(p, 'title') || 'IVY Luxe Spa Promotion in Hanoi Old Quarter')}" loading="lazy">
            ${p.badge ? `<span class="live-promo-badge">${esc(p.badge)}</span>` : ''}
          </div>
          <div class="live-promo-body">
            <h3 class="live-promo-title">${esc(pick(p, 'title'))}</h3>
            ${pick(p, 'offer') ? `<div class="live-promo-offer"><i class="fa fa-gift"></i> ${esc(pick(p, 'offer'))}</div>` : ''}
            <p class="live-promo-desc">${esc(pick(p, 'desc'))}</p>
            ${until ? `<div class="live-promo-until"><i class="fa fa-clock-o"></i> ${vi ? 'Áp dụng đến' : 'Valid until'} ${until}</div>` : ''}
            <button type="button" class="live-promo-btn" data-service="${esc(pick(p, 'title'))}"><i class="fa fa-calendar-check-o"></i> ${vi ? 'ĐẶT LỊCH ƯU ĐÃI NÀY' : 'BOOK THIS OFFER'}</button>
          </div>
        </article>`;
    }).join('');
    grid.querySelectorAll('.live-promo-btn').forEach(btn => {
      btn.addEventListener('click', () => openBookingModalWithService(btn.getAttribute('data-service')));
    });
  }

  fetch('/api/promos', { cache: 'no-store' })
    .then(res => (res.ok ? res.json() : { promos: [] }))
    .then(({ promos }) => {
      livePromos = Array.isArray(promos) ? promos : [];
      renderLivePromos();
    })
    .catch(() => {});

});
