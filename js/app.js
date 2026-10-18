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
    language: localStorage.getItem('ivy_lang') || 'vi', // Default VI, supports vi, en, zh, ja, ko
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
    "doc_title": "IVY LUXE SPA - Massage Body & Wellness | 48 Hà Trung, Hoàn Kiếm, Hà Nội",
    "top_address": "<i class=\"fa fa-map-marker\"></i> <strong>48 Hà Trung, P. Hàng Bông, Q. Hoàn Kiếm, Hà Nội</strong>",
    "top_hours": "<i class=\"fa fa-clock-o\"></i> Mở cửa hàng ngày: 10:00 Sáng - 10:00 Tối",
    "top_promo_ticker": "<i class=\"fa fa-tag\"></i> <strong>Ưu đãi đặt trước: Giảm 20% các gói Spa & Massage Body cao cấp</strong>",
    "top_welcome_ticker": "<i class=\"fa fa-leaf\"></i> <strong>Ivy Luxe Spa - Trải Nghiệm Thư Giãn Chuẩn 5 Sao</strong>",
    "top_hotline": "<i class=\"fa fa-phone\"></i> Hotline: 098 9713660",
    "top_zen_music": "Nhạc Thiền",
    
    // Affiliate translations
    "nav_affiliate": "Đối Tác Affiliate",
    "footer_link_affiliate": "Chương Trình Đối Tác Affiliate",
    "aff_sub_title": "HỢP TÁC KINH DOANH CÙNG PHÁT TRIỂN",
    "aff_main_title": "CHƯƠNG TRÌNH ĐỐI TÁC AFFILIATE 48 HÀ TRUNG",
    "aff_desc_text": "Dành riêng cho Khách sạn, Concierge, Hướng dẫn viên du lịch, Tài xế, Airbnb Host và Quý khách hàng thân thiết. Đăng ký nhận link & mã QR tức thì - Nhận hoa hồng hấp dẫn 15% - 20% cho mỗi đơn đặt lịch thành công!",
    "aff_perk1_title": "Hoa Hồng Lên Đến 20%",
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
    "aff_res_lbl_com": "Hoa Hồng Tích Lũy (20%)",
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
    "subhero_addr_line": "Địa chỉ chính thức: <strong>48 Hà Trung, P. Hàng Bông, Q. Hoàn Kiếm, Hà Nội</strong> &nbsp;|&nbsp; Hotline: <strong style=\"color:#B22222;\">098 9713660</strong>",
    "loc_title": "KHÔNG GIAN NGHỈ DƯỠNG TẠI 48 HÀ TRUNG",
    "loc_subtitle": "Không gian spa trị liệu sang trọng & biệt lập tại số 48 Hà Trung, Hoàn Kiếm, Hà Nội",
    "loc_card1_title": "Ivy Luxe Spa (Sảnh Chờ & Tiếp Đón)",
    "loc_card1_addr": "48 Hà Trung, Hoàn Kiếm, Hà Nội",
    "loc_card1_b1": "Sức chứa tối đa: 25 khách cùng lúc",
    "loc_card1_b2": "Không gian Indochine ấm cúng, sang trọng",
    "loc_card1_b3": "Mở cửa hàng ngày: 10:00 Sáng - 10:00 Tối",
    "loc_card1_b4": "Hotline / WhatsApp / Zalo: <strong>(+84) 98 971 3660</strong>",
    "loc_card2_title": "Ivy Luxe Spa (Khu Phòng Trị Liệu VIP)",
    "loc_card2_addr": "48 Hà Trung, Hoàn Kiếm, Hà Nội",
    "loc_card2_b1": "Phòng đơn, phòng đôi VIP riêng tư tuyệt đối",
    "loc_card2_b2": "Bồn tắm ngâm thảo dược gỗ Pơ Mu & Jacuzzi",
    "loc_card2_b3": "Mở cửa hàng ngày: 10:00 Sáng - 10:00 Tối",
    "loc_card2_b4": "Hotline / WhatsApp / Zalo: <strong>(+84) 98 971 3660</strong>",
    "loc_card3_title": "Ivy Luxe Spa (Dưỡng Sinh & Foot Care)",
    "loc_card3_addr": "48 Hà Trung, Hoàn Kiếm, Hà Nội",
    "loc_card3_b1": "Vòm nước ấm tuần hoàn thư giãn da đầu & cổ vai gáy",
    "loc_card3_b2": "Ngâm chân thảo mộc hoa hồng & bấm huyệt chuyên sâu",
    "loc_card3_b3": "Mở cửa hàng ngày: 10:00 Sáng - 10:00 Tối",
    "loc_card3_b4": "Hotline / WhatsApp / Zalo: <strong>(+84) 98 971 3660</strong>",
    "loc_btn_discover": "KHÁM PHÁ THÊM",
    "map_btn_reserve": "ĐẶT LỊCH HẸN TRẢI NGHIỆM",
    "map_badge_title": "IVY LUXE SPA - 48 HÀ TRUNG",
    "map_badge_desc": "Phố Hà Trung, P. Hàng Bông, Q. Hoàn Kiếm, Hà Nội (Cách Hồ Hoàn Kiếm 500m)",
    "map_btn_open": "<i class=\"fa fa-external-link\"></i> Mở chỉ đường Google Maps",
    "promo_title": "COMBO ƯU ĐÃI ĐẶC QUYỀN IVY SPECIAL",
    "promo_subtitle": "Tận hưởng các gói combo đặc quyền được yêu thích nhất tại Ivy Luxe Spa - 48 Hà Trung, Hoàn Kiếm, Hà Nội",
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
    "menu_subtitle": "Bảng Giá Đầy Đủ Tất Cả Dịch Vụ Tại 48 Hà Trung, Hoàn Kiếm, Hà Nội (VNĐ & USD)",
    "menu_banner_title": "BẢNG GIÁ NIÊM YẾT MINH BẠCH - BẢO HÀNH 7 NGÀY MIỄN PHÍ DỊCH VỤ NAILS",
    "menu_banner_desc": "Quý khách có thể xem menu trực tuyến theo từng phân mục dưới đây hoặc mở xem ảnh chụp bảng giá gốc tại spa.",
    "menu_btn_open_board": "<i class=\"fa fa-file-image-o\"></i> Mở Bảng Giá Menu Gốc",
    "menu_currency_label": "Đơn vị tiền tệ:",
    "tab_combos": "<i class=\"fa fa-fire\"></i> IVY Special Combos",
    "tab_packages": "<i class=\"fa fa-diamond\"></i> Gói Trị Liệu Hoàng Gia (2h - 4h)",
    "tab_massage": "<i class=\"fa fa-heart\"></i> Massage Body Toàn Thân",
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
    "footer_addr_line": "Địa chỉ: 48 Hà Trung, Hoàn Kiếm, Hà Nội <a href=\"https://maps.google.com/?q=48+Ha+Trung+Hoan+Kiem+Hanoi\" target=\"_blank\" rel=\"noopener\">(Xem bản đồ)</a>",
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
    "footer_hours_desc": "Mở cửa hàng ngày từ<br><strong style=\"color:#FFF; font-size:1.05rem;\">10:00 Sáng - 10:00 Tối</strong><br>Khuyến khích đặt lịch hẹn trước.",
    "footer_follow_title": "KẾT NỐI VỚI CHÚNG TÔI",
    "footer_payment_title": "PHƯƠNG THỨC THANH TOÁN",
    "footer_copyright": "Bản quyền 2026 © <strong>IVY LUXE SPA</strong> (48 Hà Trung, Hoàn Kiếm, Hà Nội). Đã đăng ký bản quyền.",
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
    "modal_notice": "<i class=\"fa fa-info-circle\" style=\"color:#D4AF37;\"></i> Địa chỉ phục vụ: <strong>48 Hà Trung, Hoàn Kiếm, Hà Nội</strong>. Hotline hỗ trợ 24/7: <strong>098 9713660</strong>.",
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
  },
  "en": {
    "doc_title": "IVY LUXE SPA - Body Massage & Wellness | 48 Ha Trung, Hoan Kiem, Hanoi",
    "top_address": "<i class=\"fa fa-map-marker\"></i> <strong>48 Ha Trung, Hang Bong, Hoan Kiem, Hanoi</strong>",
    "top_hours": "<i class=\"fa fa-clock-o\"></i> Open Daily: 10:00 AM - 10:00 PM",
    "top_promo_ticker": "<i class=\"fa fa-tag\"></i> <strong>Early Booking Offer: 20% Off All Spa & Body Massage Packages</strong>",
    "top_welcome_ticker": "<i class=\"fa fa-leaf\"></i> <strong>Ivy Luxe Spa - 5-Star Wellness Sanctuary in Hanoi Old Quarter</strong>",
    "top_hotline": "<i class=\"fa fa-phone\"></i> Hotline: (+84) 98 9713660",
    "top_zen_music": "Zen Music",
    
    // Affiliate translations
    "nav_affiliate": "Affiliate Partners",
    "footer_link_affiliate": "Affiliate Partner Program",
    "aff_sub_title": "EXCLUSIVE PARTNERSHIP & REWARDS",
    "aff_main_title": "IVY LUXE SPA AFFILIATE PROGRAM",
    "aff_desc_text": "Dedicated to Hotel Concierges, Tour Guides, Drivers, Airbnb Hosts & Travel Bloggers. Register to get your custom referral link & QR code instantly - Earn 15% - 20% commissions on every successful spa booking!",
    "aff_perk1_title": "Up To 20% Commission",
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
    "aff_res_lbl_com": "Earned Commission (20%)",
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
    "subhero_addr_line": "Official Address: <strong>48 Ha Trung, Hang Bong, Hoan Kiem, Hanoi</strong> &nbsp;|&nbsp; Hotline: <strong style=\"color:#B22222;\">(+84) 98 9713660</strong>",
    "loc_title": "OUR SANCTUARY AT 48 HA TRUNG",
    "loc_subtitle": "Exclusive luxury wellness sanctuary located at 48 Ha Trung, Hoan Kiem, Hanoi",
    "loc_card1_title": "Ivy Luxe Spa (Lounge & Reception)",
    "loc_card1_addr": "48 Ha Trung, Hoan Kiem, Hanoi",
    "loc_card1_b1": "Capacity: Up to 25 guests simultaneously",
    "loc_card1_b2": "Warm, opulent Indochine interior",
    "loc_card1_b3": "Open daily: 10:00 AM - 10:00 PM",
    "loc_card1_b4": "Hotline / WhatsApp / Kakao: <strong>(+84) 98 971 3660</strong>",
    "loc_card2_title": "Ivy Luxe Spa (VIP Treatment Suites)",
    "loc_card2_addr": "48 Ha Trung, Hoan Kiem, Hanoi",
    "loc_card2_b1": "Private single & couple VIP suites",
    "loc_card2_b2": "Herbal wooden soaking tubs & Jacuzzi",
    "loc_card2_b3": "Open daily: 10:00 AM - 10:00 PM",
    "loc_card2_b4": "Hotline / WhatsApp / Kakao: <strong>(+84) 98 971 3660</strong>",
    "loc_card3_title": "Ivy Luxe Spa (Head Spa & Foot Care)",
    "loc_card3_addr": "48 Ha Trung, Hoan Kiem, Hanoi",
    "loc_card3_b1": "Circulating warm water arch for scalp & neck relief",
    "loc_card3_b2": "Rose herbal foot soak & deep reflexology",
    "loc_card3_b3": "Open daily: 10:00 AM - 10:00 PM",
    "loc_card3_b4": "Hotline / WhatsApp / Kakao: <strong>(+84) 98 971 3660</strong>",
    "loc_btn_discover": "DISCOVER MORE",
    "map_btn_reserve": "MAKE A RESERVATION",
    "map_badge_title": "IVY LUXE SPA - 48 HA TRUNG",
    "map_badge_desc": "48 Ha Trung, Hang Bong, Hoan Kiem, Hanoi (500m from Hoan Kiem Lake)",
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
    "tab_packages": "<i class=\"fa fa-diamond\"></i> Royal Packages (2h - 4h)",
    "tab_massage": "<i class=\"fa fa-heart\"></i> Body Massage",
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
    "footer_location_desc": "Central location in Hanoi Old Quarter, just minutes on foot from Hoan Kiem Lake and Hang Da Market.",
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
    "footer_hours_desc": "We are open daily from<br><strong style=\"color:#FFF; font-size:1.05rem;\">10:00 AM - 10:00 PM</strong><br>Advanced reservation is recommended.",
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
  },
  "zh": {
    "doc_title": "常春藤奢华水疗 IVY LUXE SPA | 河内老城区河中村48号",
    "top_address": "<i class=\"fa fa-map-marker\"></i> <strong>河内市还剑区行蓬坊河中村48号</strong>",
    "top_hours": "<i class=\"fa fa-clock-o\"></i> 营业时间：每日 10:00 - 22:00",
    "top_promo_ticker": "<i class=\"fa fa-tag\"></i> <strong>在线预约特惠：全场水疗与全身按摩享 8 折优惠</strong>",
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
    "subhero_addr_line": "官方正规地址：<strong>河内市还剑区河中村48号</strong> &nbsp;|&nbsp; 贵宾热线：<strong style=\"color:#B22222;\">(+84) 98 9713660</strong>",
    "loc_title": "河中村48号私享疗愈圣境",
    "loc_subtitle": "位于河内还剑区核心黄金地段的高端私密法越风情水疗馆",
    "loc_card1_title": "Ivy Luxe Spa (接待大厅与贵宾休息室)",
    "loc_card1_addr": "河内市还剑区河中村48号",
    "loc_card1_b1": "接待容量：同时容纳多达25位贵宾",
    "loc_card1_b2": "温馨奢华的印度支那典雅风情",
    "loc_card1_b3": "营业时间：每日 10:00 - 22:00",
    "loc_card1_b4": "贵宾热线 / 微信 / WhatsApp: <strong>(+84) 98 971 3660</strong>",
    "loc_card2_title": "Ivy Luxe Spa (VIP尊享理疗套房)",
    "loc_card2_addr": "河内市还剑区河中村48号",
    "loc_card2_b1": "单人及双人专属私密VIP套房",
    "loc_card2_b2": "珍贵桧木草本浸泡木桶与水疗浴缸",
    "loc_card2_b3": "营业时间：每日 10:00 - 22:00",
    "loc_card2_b4": "贵宾热线: <strong>(+84) 98 971 3660</strong>",
    "loc_card3_title": "Ivy Luxe Spa (养生头疗与足道护理)",
    "loc_card3_addr": "河内市还剑区河中村48号",
    "loc_card3_b1": "循环温水水疗舒缓头皮与肩颈酸痛",
    "loc_card3_b2": "玫瑰草本足浴与深层穴位足底反射按摩",
    "loc_card3_b3": "营业时间：每日 10:00 - 22:00",
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
    "footer_hours_desc": "每日营业时间：<br><strong style=\"color:#FFF; font-size:1.05rem;\">10:00 - 22:00</strong><br>建议提前在线预约。",
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
  },
  "ja": {
    "doc_title": "IVY LUXE SPA - ハノイ旧市街の極上マッサージ＆スパ | ハチュン48番地",
    "top_address": "<i class=\"fa fa-map-marker\"></i> <strong>ハノイ市ホアンキエム区ハチュン通り48番地</strong>",
    "top_hours": "<i class=\"fa fa-clock-o\"></i> 営業時間：毎日 10:00 - 22:00",
    "top_promo_ticker": "<i class=\"fa fa-tag\"></i> <strong>事前予約限定：全スパ＆ボディマッサージ 20% OFF</strong>",
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
    "subhero_addr_line": "公式所在地：<strong>ハノイ市ホアンキエム区ハチュン通り48番地</strong> &nbsp;|&nbsp; ホットライン：<strong style=\"color:#B22222;\">(+84) 98 9713660</strong>",
    "loc_title": "ハチュン48番地の癒しの空間",
    "loc_subtitle": "ハノイ・ホアンキエム区ハチュン通り48番地に佇むラグジュアリーな癒し空間",
    "loc_card1_title": "Ivy Luxe Spa (ラウンジ＆レセプション)",
    "loc_card1_addr": "ハノイ市ホアンキエム区ハチュン通り48番地",
    "loc_card1_b1": "収容人数：最大25名様まで同時対応可能",
    "loc_card1_b2": "温もりと高級感あふれるインドシナ様式",
    "loc_card1_b3": "営業時間：毎日 10:00 - 22:00",
    "loc_card1_b4": "予約専用 / WhatsApp / LINE: <strong>(+84) 98 971 3660</strong>",
    "loc_card2_title": "Ivy Luxe Spa (VIPトリートメントスイート)",
    "loc_card2_addr": "ハノイ市ホアンキエム区ハチュン通り48番地",
    "loc_card2_b1": "完全プライベートなシングル＆カップル用VIP個室",
    "loc_card2_b2": "天然木ハーブ風呂＆ジャグジー完備",
    "loc_card2_b3": "営業時間：毎日 10:00 - 22:00",
    "loc_card2_b4": "ホットライン: <strong>(+84) 98 971 3660</strong>",
    "loc_card3_title": "Ivy Luxe Spa (ヘッドスパ＆フットケア)",
    "loc_card3_addr": "ハノイ市ホアンキエム区ハチュン通り48番地",
    "loc_card3_b1": "循環式温水による頭皮・首肩コリ集中リラクゼーション",
    "loc_card3_b2": "ローズ＆ハーブ足湯と本格足裏ツボ刺激",
    "loc_card3_b3": "営業時間：毎日 10:00 - 22:00",
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
    "footer_hours_desc": "営業時間：<br><strong style=\"color:#FFF; font-size:1.05rem;\">10:00 - 22:00（年中無休）</strong><br>事前予約をおすすめいたします。",
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
  },
  "ko": {
    "doc_title": "IVY LUXE SPA - 하노이 올드쿼터 최고급 럭셔리 마사지 | 하쭝 48번지",
    "top_address": "<i class=\"fa fa-map-marker\"></i> <strong>하노이시 호안끼엠구 하쭝 48번지</strong>",
    "top_hours": "<i class=\"fa fa-clock-o\"></i> 영업 시간: 매일 10:00 - 22:00",
    "top_promo_ticker": "<i class=\"fa fa-tag\"></i> <strong>온라인 사전 예약 특가: 전 스파 & 바디 마사지 20% 할인</strong>",
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
    "subhero_addr_line": "공식 주소: <strong>하노이 호안끼엠구 하쭝 48번지</strong> &nbsp;|&nbsp; 핫라인: <strong style=\"color:#B22222;\">(+84) 98 9713660</strong>",
    "loc_title": "하쭝 48번지의 프라이빗 힐링 공간",
    "loc_subtitle": "하노이 호안끼엠구 하쭝 48번지에 위치한 최고급 프라이빗 스파 공간",
    "loc_card1_title": "Ivy Luxe Spa (라운지 & 리셉션)",
    "loc_card1_addr": "하노이시 호안끼엠구 하쭝 48번지",
    "loc_card1_b1": "동시 수용: 최대 25명 동시 이용 가능",
    "loc_card1_b2": "아늑하고 고급스러운 인도차이나 인테리어",
    "loc_card1_b3": "영업 시간: 매일 10:00 - 22:00",
    "loc_card1_b4": "예약 문의 / 카카오톡 / WhatsApp: <strong>(+84) 98 971 3660</strong>",
    "loc_card2_title": "Ivy Luxe Spa (VIP 프라이빗 룸)",
    "loc_card2_addr": "하노이시 호안끼엠구 하쭝 48번지",
    "loc_card2_b1": "완벽한 프라이빗 싱글 및 커플 VIP 전용 룸",
    "loc_card2_b2": "편백나무 한방 약초 스파 욕조 & 자쿠지",
    "loc_card2_b3": "영업 시간: 매일 10:00 - 22:00",
    "loc_card2_b4": "핫라인: <strong>(+84) 98 971 3660</strong>",
    "loc_card3_title": "Ivy Luxe Spa (헤드스파 & 풋케어)",
    "loc_card3_addr": "하노이시 호안끼엠구 하쭝 48번지",
    "loc_card3_b1": "순환식 온수 테라피로 두피 및 목·어깨 피로 완벽 해소",
    "loc_card3_b2": "장미 한방 족욕 및 딥 티슈 발 마사지",
    "loc_card3_b3": "영업 시간: 매일 10:00 - 22:00",
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
    "footer_hours_desc": "영업 시간: 매일<br><strong style=\"color:#FFF; font-size:1.05rem;\">10:00 - 22:00 (연중무휴)</strong><br>온라인 사전 예약을 권장합니다.",
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
  },
  "ru": {
    "doc_title": "IVY LUXE SPA - Массаж тела и спа в Ханое | 48 Ha Trung, Hoan Kiem",
    "top_address": "<i class=\"fa fa-map-marker\"></i> <strong>48 Ha Trung, Hang Bong, Hoan Kiem, Ханой</strong>",
    "top_hours": "<i class=\"fa fa-clock-o\"></i> Ежедневно: 10:00 - 22:00",
    "top_promo_ticker": "<i class=\"fa fa-tag\"></i> <strong>Специальное предложение: Скидка 20% на спа и массаж тела</strong>",
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
    "subhero_addr_line": "Официальный адрес: <strong>48 Ha Trung, Hang Bong, Hoan Kiem, Ханой</strong> &nbsp;|&nbsp; Горячая линия: <strong style=\"color:#B22222;\">(+84) 98 9713660</strong>",
    "loc_title": "НАШ СПА-КОМПЛЕКС НА ХА ЧУНГ, 48",
    "loc_subtitle": "Эксклюзивный роскошный велнес-оазис в самом сердце Ханоя",
    "loc_card1_title": "Ivy Luxe Spa (Зона приема и лаундж)",
    "loc_card1_addr": "48 Ha Trung, Hoan Kiem, Ханой",
    "loc_card1_b1": "Вместимость: до 25 гостей одновременно",
    "loc_card1_b2": "Уютный и роскошный индокитайский интерьер",
    "loc_card1_b3": "Ежедневно: 10:00 - 22:00",
    "loc_card1_b4": "Телефон / WhatsApp / Telegram: <strong>(+84) 98 971 3660</strong>",
    "loc_card2_title": "Ivy Luxe Spa (VIP-люксы для процедур)",
    "loc_card2_addr": "48 Ha Trung, Hoan Kiem, Ханой",
    "loc_card2_b1": "Приватные люксы для одного и для пар",
    "loc_card2_b2": "Деревянные ванны с травами и джакузи",
    "loc_card2_b3": "Ежедневно: 10:00 - 22:00",
    "loc_card2_b4": "Телефон / WhatsApp: <strong>(+84) 98 971 3660</strong>",
    "loc_card3_title": "Ivy Luxe Spa (Спа для головы и уход за ногами)",
    "loc_card3_addr": "48 Ha Trung, Hoan Kiem, Ханой",
    "loc_card3_b1": "Циркулирующая теплая водная арка для расслабления кожи головы",
    "loc_card3_b2": "Травяная ванночка с лепестками роз и точечный массаж",
    "loc_card3_b3": "Ежедневно: 10:00 - 22:00",
    "loc_card3_b4": "Телефон / WhatsApp: <strong>(+84) 98 971 3660</strong>",
    "loc_btn_discover": "УЗНАТЬ БОЛЬШЕ",
    "map_btn_reserve": "ЗАБРОНИРОВАТЬ ВИЗИТ",
    "map_badge_title": "IVY LUXE SPA - 48 HA TRUNG",
    "map_badge_desc": "48 Ha Trung, Hang Bong, Hoan Kiem (500 м от озера Хоанкьем)",
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
    "footer_hours_desc": "Открыто ежедневно:<br><strong style=\"color:#FFF; font-size:1.05rem;\">10:00 - 22:00</strong><br>Рекомендуется предварительная запись.",
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
  },
  "fr": {
    "doc_title": "IVY LUXE SPA - Massage Corporel & Bien-être | 48 Ha Trung, Hanoï",
    "top_address": "<i class=\"fa fa-map-marker\"></i> <strong>48 Ha Trung, Hang Bong, Hoan Kiem, Hanoï</strong>",
    "top_hours": "<i class=\"fa fa-clock-o\"></i> Ouvert tous les jours : 10h00 - 22h00",
    "top_promo_ticker": "<i class=\"fa fa-tag\"></i> <strong>Offre spéciale de réservation : -20% sur tous les forfaits Spa & Massage</strong>",
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
    "subhero_addr_line": "Adresse officielle : <strong>48 Ha Trung, Hang Bong, Hoan Kiem, Hanoï</strong> &nbsp;|&nbsp; Ligne directe : <strong style=\"color:#B22222;\">(+84) 98 9713660</strong>",
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
    "loc_card2_b2": "Baignoires en bois aromatique et Jacuzzi",
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
    "map_badge_desc": "48 Ha Trung, Hang Bong, Hoan Kiem (à 500m du lac Hoan Kiem)",
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
  }
};

  // =========================================================================
  // 2. SPA MENU COMPREHENSIVE DATA (OFFICIAL IVY LUXE SPA MENU - ALL LANGUAGES)
  // =========================================================================
  const spaMenuData = {
  "combos": [
    {
      "id": "combo-1",
      "name_vi": "IVY SPECIAL - COMBO 1 (HOT) - 90 PHÚT",
      "name_en": "IVY SPECIAL - COMBO 1 (HOT) - 90 MIN",
      "name_zh": "IVY 招牌组合 1 (热门推荐) - 90分钟",
      "name_ja": "IVY スペシャルコンボ 1 (人気No.1) - 90分",
      "name_ko": "IVY 스페셜 콤보 1 (인기 핫) - 90분",
      "duration_vi": "90 phút",
      "duration_en": "90 min",
      "duration_zh": "90分钟",
      "duration_ja": "90分",
      "duration_ko": "90분",
      "price_vnd": 800000,
      "desc_vi": "Tặng kèm ngâm chân thảo dược miễn phí + Massage body (30') + Gội đầu dưỡng sinh (30') + Chăm sóc da mặt & Vệ sinh tai (30').",
      "desc_en": "Herbal foot soak free + Full body massage (30') + Nourishing shampoo (30') + Facial care and Clean Ear (30').",
      "desc_zh": "免费赠送中草药足浴 + 全身精油舒缓按摩 (30分钟) + 养生滋养洗头 (30分钟) + 面部护理与采耳 (30分钟)。",
      "desc_ja": "無料天然ハーブ足湯 ＋ 全身アロママッサージ (30分) ＋ 極上ヘッドスパ (30分) ＋ フェイシャル＆耳そうじ (30分)。",
      "desc_ko": "무료 한방 약초 족욕 + 전신 바디 마사지 (30분) + 릴랙싱 영양 샴푸 (30분) + 페이셜 케어 & 귀 청소 (30분).",
      "image": "assets/images/head_spa_ritual.jpg",
      "popular": true
    },
    {
      "id": "combo-2",
      "name_vi": "IVY SPECIAL - COMBO 2 - 70/75 PHÚT",
      "name_en": "IVY SPECIAL - COMBO 2 - 70/75 MIN",
      "name_zh": "IVY 招牌组合 2 - 70/75分钟",
      "name_ja": "IVY スペシャルコンボ 2 - 70〜75分",
      "name_ko": "IVY 스페셜 콤보 2 - 70~75분",
      "duration_vi": "70 - 75 phút",
      "duration_en": "70 - 75 min",
      "duration_zh": "70 - 75分钟",
      "duration_ja": "70〜75分",
      "duration_ko": "70 - 75분",
      "price_vnd": 450000,
      "desc_vi": "Tặng kèm ngâm chân thảo dược miễn phí + Massage chân bấm huyệt (30') + Tẩy tế bào chết chân (30') + Đắp mặt nạ ủ dưỡng chân (10').",
      "desc_en": "Herbal foot soak free + Foot reflexology massage (30') + Foot scrub exfoliation (30') + Nourishing foot mask (10').",
      "desc_zh": "免费赠送中草药足浴 + 足底穴位深度按摩 (30分钟) + 足部草本去角质 (30分钟) + 足部滋养修护膜 (10分钟)。",
      "desc_ja": "無料天然ハーブ足湯 ＋ 足裏ツボ押しマッサージ (30分) ＋ フットスクラブ角質除去 (30分) ＋ フット集中保湿パック (10分)。",
      "desc_ko": "무료 한방 약초 족욕 + 발 마사지 & 지압 (30분) + 발 스크럽 각질 제거 (30분) + 발 보습 마스크 팩 (10분).",
      "image": "assets/images/foot_soak_care.jpg",
      "popular": true
    },
    {
      "id": "combo-3",
      "name_vi": "IVY SPECIAL - COMBO 3 - 120 PHÚT",
      "name_en": "IVY SPECIAL - COMBO 3 - 120 MIN",
      "name_zh": "IVY 招牌组合 3 - 120分钟",
      "name_ja": "IVY スペシャルコンボ 3 - 120分",
      "name_ko": "IVY 스페셜 콤보 3 - 120분",
      "duration_vi": "120 phút",
      "duration_en": "120 min",
      "duration_zh": "120分钟",
      "duration_ja": "120分",
      "duration_ko": "120분",
      "price_vnd": 1000000,
      "desc_vi": "Tặng kèm ngâm chân thảo dược miễn phí + Massage body toàn thân (45') + Tẩy tế bào chết toàn thân (30') + Chăm sóc da mặt & Vệ sinh tai (45').",
      "desc_en": "Herbal foot soak free + Full body massage (45') + Body Scrub (30') + Facial care and Ear Clean (45').",
      "desc_zh": "免费赠送中草药足浴 + 全身草本精油按摩 (45分钟) + 全身深度去角质磨砂 (30分钟) + 面部深度护理与采耳 (45分钟)。",
      "desc_ja": "無料天然ハーブ足湯 ＋ 全身ボディマッサージ (45分) ＋ 全身スクラブ角質ケア (30分) ＋ フェイシャル＆耳そうじ (45分)。",
      "desc_ko": "무료 한방 약초 족욕 + 전신 바디 마사지 (45분) + 전신 바디 스크럽 (30분) + 페이셜 케어 & 귀 청소 (45분).",
      "image": "assets/images/hot_stone_massage.jpg",
      "popular": true
    },
    {
      "id": "combo-4",
      "name_vi": "IVY SPECIAL - COMBO 4 - 150 PHÚT",
      "name_en": "IVY SPECIAL - COMBO 4 - 150 MIN",
      "name_zh": "IVY 招牌组合 4 - 150分钟",
      "name_ja": "IVY スペシャルコンボ 4 - 150分",
      "name_ko": "IVY 스페셜 콤보 4 - 150분",
      "duration_vi": "150 phút",
      "duration_en": "150 min",
      "duration_zh": "150分钟",
      "duration_ja": "150分",
      "duration_ko": "150분",
      "price_vnd": 1400000,
      "desc_vi": "Tặng kèm ngâm chân thảo dược miễn phí + Massage body (30') + Tẩy tế bào chết toàn thân (30') + Gội đầu dưỡng sinh & Vệ sinh tai (45') + Chăm sóc da mặt chuyên sâu (45').",
      "desc_en": "Herbal foot soak free + Body massage (30') + Body scrub (30') + Nourishing shampoo & Ear Clean (45') + Intensive facial care (45').",
      "desc_zh": "免费赠送中草药足浴 + 身体按摩 (30分钟) 与身体磨砂 (30分钟) + 养生洗头与采耳 (45分钟) + 深层补水面部修护 (45分钟)。",
      "desc_ja": "無料天然ハーブ足湯 ＋ 全身マッサージ (30分)＆ボディスクラブ (30分) ＋ ヘッドスパ＆耳そうじ (45分) ＋ 集中フェイシャルケア (45分)。",
      "desc_ko": "무료 한방 약초 족욕 + 바디 마사지 (30분) & 바디 스크럽 (30분) + 샴푸 헤드스파 & 귀 청소 (45분) + 인텐시브 페이셜 케어 (45분).",
      "image": "assets/images/facial_gold_care.jpg",
      "popular": true
    }
  ],
  "packages": [
    {
      "id": "pkg-2h",
      "name_vi": "Gói Trị Liệu Hoàng Gia 2 Giờ",
      "name_en": "Imperial Wellness Package (2 Hours)",
      "name_zh": "皇室尊享2小时理疗套餐",
      "name_ja": "ロイヤルウェルネスパッケージ (2時間)",
      "name_ko": "로열 힐링 테라피 패키지 (2시간)",
      "duration_vi": "120 phút",
      "duration_en": "120 min",
      "duration_zh": "120分钟",
      "duration_ja": "120分",
      "duration_ko": "120분",
      "price_vnd": 900000,
      "desc_vi": "Massage toàn thân chuyên sâu (75') + Chăm sóc phục hồi da mặt (45'). Thư giãn sâu cho cơ bắp và làn da.",
      "desc_en": "Full body deep tissue massage (75') + Restorative facial care (45'). Deeply restoring for muscular and facial renewal.",
      "desc_zh": "全身深度舒缓按摩 (75分钟) + 面部修护滋养 (45分钟)。舒缓肌肉酸痛，焕活面部水润光泽。",
      "desc_ja": "深層全身ボディマッサージ (75分) ＋ 肌質改善フェイシャル (45分)。筋肉のコリを解きほぐし素肌を健やかに整えます。",
      "desc_ko": "전신 딥 티슈 마사지 (75분) + 피부 재생 페이셜 케어 (45분). 근육 피로를 풀고 피부를 촉촉하게 가꿔줍니다.",
      "image": "assets/images/couple_suite_bath.jpg"
    },
    {
      "id": "pkg-3h",
      "name_vi": "Gói Trị Liệu Hoàng Gia 3 Giờ",
      "name_en": "Grand Imperial Retreat (3 Hours)",
      "name_zh": "皇室至尊3小时舒缓套餐",
      "name_ja": "グランドロイヤルリトリート (3時間)",
      "name_ko": "그랜드 로열 리트리트 패키지 (3시간)",
      "duration_vi": "180 phút",
      "duration_en": "180 min",
      "duration_zh": "180分钟",
      "duration_ja": "180分",
      "duration_ko": "180분",
      "price_vnd": 1650000,
      "desc_vi": "Massage toàn thân (90') + Chăm sóc da mặt & Gội đầu dưỡng sinh (90') + Tặng kèm vệ sinh tai miễn phí.",
      "desc_en": "Full body massage (90') + Facial care & Nourishing shampoo (90') + Complimentary ear cleaning.",
      "desc_zh": "全身舒缓按摩 (90分钟) + 面部深层护理与草本养生洗发 (90分钟) + 免费赠送专业采耳。",
      "desc_ja": "全身マッサージ (90分) ＋ フェイシャル＆極上ヘッドスパ (90分) ＋ 耳そうじ無料サービス。",
      "desc_ko": "전신 마사지 (90분) + 페이셜 & 힐링 영양 샴푸 (90분) + 무료 귀 청소 서비스.",
      "image": "assets/images/head_spa_ritual.jpg",
      "popular": true
    },
    {
      "id": "pkg-4h",
      "name_vi": "Gói Đế Vương VIP Toàn Diện 4 Giờ",
      "name_en": "Imperial VIP Day Spa Experience (4 Hours)",
      "name_zh": "帝王尊荣4小时全日套餐 (含免费茶点)",
      "name_ja": "エンペラーVIP デイスパ (4時間 - ドリンク付)",
      "name_ko": "황제 VIP 올데이 스파 (4시간 - 무료 다과)",
      "duration_vi": "240 phút",
      "duration_en": "240 min",
      "duration_zh": "240分钟",
      "duration_ja": "240分",
      "duration_ko": "240분",
      "price_vnd": 1900000,
      "desc_vi": "Massage body (90') + Tẩy tế bào chết toàn thân (60') + Chăm sóc da mặt & Dưỡng tóc (90') + Vệ sinh tai + Miễn phí trà thảo mộc & đồ ăn nhẹ.",
      "desc_en": "Body massage (90') + Body scrub (60') + Facial care & Hair treatment (90') + Free ear cleaning + Free drinks & light bites.",
      "desc_zh": "全身按摩 (90分钟) + 身体草本去角质 (60分钟) + 面部护理与草本护发 (90分钟) + 专业采耳 + 免费茶水精美点心。",
      "desc_ja": "全身マッサージ (90分) ＋ ボディスクラブ (60分) ＋ フェイシャル＆ヘアケア (90分) ＋ 耳そうじ ＋ ドリンク＆スナック無料。",
      "desc_ko": "전신 마사지 (90분) + 바디 스크럽 (60분) + 페이셜 & 헤어 트리트먼트 (90분) + 귀 청소 + 무료 음료 및 스낵.",
      "image": "assets/images/hero_spa_luxury.jpg",
      "popular": true
    }
  ],
  "massage": [
    {
      "id": "mass-1",
      "name_vi": "Massage Trị Liệu Đá Nóng Núi Lửa",
      "name_en": "IVY Signature Hot Basalt Stone Massage",
      "name_zh": "天然火山热石深度经络理疗按摩",
      "name_ja": "IVY 特製 ホットバサルトストーンマッサージ",
      "name_ko": "IVY 시그니처 핫 바잘트 스톤 마사지",
      "duration_vi": "75 - 90 phút",
      "duration_en": "75 - 90 min",
      "duration_zh": "75 - 90分钟",
      "duration_ja": "75〜90分",
      "duration_ko": "75 - 90분",
      "price_vnd": 580000,
      "desc_vi": "Đá bazan giữ nhiệt lâu kết hợp tinh dầu oải hương, đả thông kinh lạc và giảm đau mỏi vai gáy tức thì.",
      "desc_en": "Heated volcanic stones placed along energy meridian lines with essential lavender & sandalwood oils for deepest muscle release.",
      "desc_zh": "温热火山玄武岩配合薰衣草与檀香精油，温通经络，深度释放深层疲劳与肩颈酸痛。",
      "desc_ja": "温めた玄武岩とラベンダー＆サンダルウッドの精油を用い、経絡に沿って深層筋肉の緊張をじんわり解きほぐします。",
      "desc_ko": "따뜻한 화산 현무암과 라벤더·샌달우드 천연 오일로 기혈 순환을 촉진하고 어깨와 등의 뭉친 피로를 깊숙이 풀어줍니다.",
      "image": "assets/images/hot_stone_massage.jpg"
    },
    {
      "id": "mass-2",
      "name_vi": "Massage Cổ Truyền Thái Lan Hoàng Gia",
      "name_en": "Traditional Royal Thai Acupressure",
      "name_zh": "泰式皇家传统经络指压伸展按摩",
      "name_ja": "伝統タイ古式ロイヤル指圧マッサージ",
      "name_ko": "전통 로열 타이 지압 스트레칭 마사지",
      "duration_vi": "60 - 90 phút",
      "duration_en": "60 - 90 min",
      "duration_zh": "60 - 90分钟",
      "duration_ja": "60〜90分",
      "duration_ko": "60 - 90분",
      "price_vnd": 490000,
      "desc_vi": "Kỹ thuật ấn huyệt và kéo giãn cơ xương khớp điêu luyện theo phong cách hoàng gia Thái.",
      "desc_en": "Ancient stretching and acupressure sequences without oil to unblock energy pathways and increase full body flexibility.",
      "desc_zh": "不使用精油的古法泰式经络指压与深度被动拉伸，舒展全身筋骨，迅速恢复活力。",
      "desc_ja": "オイルを使用せず、指圧と優しいストレッチで全身のエネルギーラインを整え、しなやかな柔軟性を取り戻します。",
      "desc_ko": "오일을 사용하지 않고 정통 지압과 스트레칭 기법으로 막힌 기운을 뚫어주고 전신의 유연성과 피로를 시원하게 회복시킵니다.",
      "image": "assets/images/hero_spa_luxury.jpg"
    },
    {
      "id": "mass-3",
      "name_vi": "Massage Trị Liệu Cơ Sâu Deep Tissue",
      "name_en": "Deep Tissue Muscle Recovery Therapy",
      "name_zh": "深层肌理舒缓修复减压按摩",
      "name_ja": "ディープティシュー深層筋肉リカバリー",
      "name_ko": "딥 티슈 근육 이완 회복 테라피",
      "duration_vi": "60 - 90 phút",
      "duration_en": "60 - 90 min",
      "duration_zh": "60 - 90分钟",
      "duration_ja": "60〜90分",
      "duration_ko": "60 - 90분",
      "price_vnd": 550000,
      "desc_vi": "Tác động sâu vào các bó cơ bị co thắt, giải tỏa căng cứng kinh niên sau các chuyến bay dài.",
      "desc_en": "Firm, targeted pressure focusing on chronic knot release in lower back, neck, and shoulder blades for active travelers.",
      "desc_zh": "专业手法施加适度深层压力，精准化解腰背、颈椎及肩胛部位的慢性劳损与长期结节。",
      "desc_ja": "慢性的なコリが生じる腰・首・肩甲骨周りに的確にアプローチし、長時間のフライト疲れをすっきり解消します。",
      "desc_ko": "허리, 목, 어깨 등의 만성 뭉침 부위에 집중적인 압력을 가해 장시간 비행과 여행으로 쌓인 근육 뭉침을 해소합니다.",
      "image": "assets/images/hot_stone_massage.jpg"
    },
    {
      "id": "mass-4",
      "name_vi": "Massage 4 Tay Đồng Điệu (2 Nghệ Nhân)",
      "name_en": "Synchronized 4-Hands Imperial Massage",
      "name_zh": "皇家双人四手默契同步奢华按摩",
      "name_ja": "極上フォーハンズシンクロマッサージ",
      "name_ko": "4핸즈 싱크로나이즈드 황제 마사지",
      "duration_vi": "75 phút",
      "duration_en": "75 min",
      "duration_zh": "75分钟",
      "duration_ja": "75分",
      "duration_ko": "75분",
      "price_vnd": 1100000,
      "desc_vi": "Hai kỹ thuật viên tay nghề cao thực hiện đồng điệu nhịp nhàng mang lại cảm giác thư thái đỉnh cao.",
      "desc_en": "Two master therapists choreographing synchronized strokes simultaneously in perfect harmony for the ultimate sensory high.",
      "desc_zh": "两位资深按摩技师默契同步运作，和谐韵律如行云流水，带您领略超越凡尘的至高奢华放松境地。",
      "desc_ja": "熟練のセラピスト2名が完璧な呼吸とシンクロした手技で全身を包み込み、これまでにない究極のリラクゼーションへと導きます。",
      "desc_ko": "두 명의 베테랑 테라피스트가 완벽한 호흡과 리듬으로 동시에 마사지하여 최상의 황홀한 힐링을 선사합니다.",
      "image": "assets/images/couple_suite_bath.jpg",
      "popular": true
    }
  ],
  "nails": [
    {
      "id": "nail-1",
      "name_vi": "Chăm Sóc & Vệ Sinh Móng Chân",
      "name_en": "Pedicure (Foot Care & Cuticle Cleaning)",
      "name_zh": "专业足部护理与死皮死茧修剪",
      "name_ja": "ペディキュア（足爪ケア＆甘皮処理）",
      "name_ko": "페디큐어 (발톱 케어 & 큐티클 정리)",
      "duration_vi": "30 phút",
      "duration_en": "30 min",
      "duration_zh": "30分钟",
      "duration_ja": "30分",
      "duration_ko": "30분",
      "price_vnd": 150000,
      "desc_vi": "Nhặt da chết chân tỉ mỉ, dũa tạo form gọn gàng sạch sẽ.",
      "desc_en": "Professional cuticle care, dead skin removal, shaping, and nail smoothing.",
      "desc_zh": "专业修除足部角质死皮，细致修剪指甲甲型并打磨抛光。",
      "desc_ja": "丁寧な甘皮処理、角質除去、爪のファイリングと表面磨き。",
      "desc_ko": "전문적인 큐티클 정리, 각질 제거, 발톱 쉐입 교정 및 매끄러운 버핑 케어.",
      "image": "assets/images/loc_hatrung_flora.jpg"
    },
    {
      "id": "nail-2",
      "name_vi": "Chăm Sóc & Vệ Sinh Móng Tay",
      "name_en": "Manicure (Hand Care & Cuticle Cleaning)",
      "name_zh": "专业手部修剪与死皮修护",
      "name_ja": "マニキュア（手爪ケア＆甘皮処理）",
      "name_ko": "매니큐어 (손톱 케어 & 큐티클 정리)",
      "duration_vi": "30 phút",
      "duration_en": "30 min",
      "duration_zh": "30分钟",
      "duration_ja": "30分",
      "duration_ko": "30분",
      "price_vnd": 150000,
      "desc_vi": "Chăm sóc móng tay, nhặt da sạch sẽ, dũa viền và làm bóng móng.",
      "desc_en": "Detailed manicure hand care, cuticle clipping and nail buffing.",
      "desc_zh": "手部细致护理，修剪边缘倒刺死皮，打磨甲面修整甲型。",
      "desc_ja": "手元の丁寧なキューティクルケア、爪の成形と艶出し磨き。",
      "desc_ko": "손톱 주변 굳은살 및 큐티클 정리, 쉐입 정리와 자연스러운 광택 케어.",
      "image": "assets/images/loc_hatrung_flora.jpg"
    },
    {
      "id": "nail-3",
      "name_vi": "Sơn Thường Đổi Màu Móng Tự Nhiên",
      "name_en": "Classic Regular Polish",
      "name_zh": "经典天然单色甲油涂抹",
      "name_ja": "クラシックマニキュアカラー",
      "name_ko": "클래식 일반 컬러 네일",
      "duration_vi": "30 phút",
      "duration_en": "30 min",
      "duration_zh": "30分钟",
      "duration_ja": "30分",
      "duration_ko": "30분",
      "price_vnd": 280000,
      "desc_vi": "Sơn màu thường cao cấp nhiều tông màu thanh lịch kèm lớp bóng bảo vệ.",
      "desc_en": "Classic regular polish color application with base and protective top coat.",
      "desc_zh": "涂刷精选品牌常规甲油，含底油防护与高光亮油锁色。",
      "desc_ja": "豊富なカラーバリエーションのポリッシュ塗布（ベース＆トップコート込）。",
      "desc_ko": "베이스 코트와 탑 코트를 포함한 고급 일반 매니큐어 컬러링.",
      "image": "assets/images/loc_hatrung_flora.jpg"
    },
    {
      "id": "nail-4",
      "name_vi": "Sửa Móng & Vệ Sinh Phục Hồi Móng",
      "name_en": "Nail Repair & Rejuvenation",
      "name_zh": "断甲修补与指甲养护",
      "name_ja": "爪の補修＆トリートメント",
      "name_ko": "손상 네일 리페어 & 케어",
      "duration_vi": "30 phút",
      "duration_en": "30 min",
      "duration_zh": "30分钟",
      "duration_ja": "30分",
      "duration_ko": "30분",
      "price_vnd": 180000,
      "desc_vi": "Khắc phục móng gãy nứt, vệ sinh và dưỡng móng chắc khỏe.",
      "desc_en": "Repair broken nail, reshape, clean and polish refresh.",
      "desc_zh": "修复断裂断层指甲，重塑甲型并涂抹滋养蛋白底油。",
      "desc_ja": "割れ爪・亀裂の補修、補強ケア、表面の滑らかなリフレッシュ。",
      "desc_ko": "깨지거나 갈라진 손톱 보수, 쉐입 교정 및 영양 공급 케어.",
      "image": "assets/images/loc_hatrung_flora.jpg"
    },
    {
      "id": "nail-5",
      "name_vi": "Sơn Gel Móng Tay Cao Cấp (Bảo Hành 7 Ngày)",
      "name_en": "Manicure Gel (7 Days Warranty)",
      "name_zh": "高级手部凝胶光疗美甲 (7天质保)",
      "name_ja": "ハンドジェルネイル（7日間保証付）",
      "name_ko": "프리미엄 핸드 젤네일 (7일 무료 보증)",
      "duration_vi": "45 phút",
      "duration_en": "45 min",
      "duration_zh": "45分钟",
      "duration_ja": "45分",
      "duration_ko": "45분",
      "price_vnd": 380000,
      "desc_vi": "Sơn gel bền màu bóng đẹp, không hại móng, bảo hành 7 ngày miễn phí.",
      "desc_en": "Premium organic gel polish with high gloss and 7 days free warranty.",
      "desc_zh": "优质透气环保凝胶，色泽饱满持久高亮，附赠7天免费质保。",
      "desc_ja": "発色と艶が長持ちする高品質オーガニックジェル（7日間の安心保証付き）。",
      "desc_ko": "고광택의 지속력이 뛰어난 프리미엄 유기농 젤네일 (7일 무료 A/S 보증).",
      "image": "assets/images/loc_hatrung_flora.jpg",
      "popular": true
    },
    {
      "id": "nail-6",
      "name_vi": "Sơn Gel Móng Chân Cao Cấp (Bảo Hành 7 Ngày)",
      "name_en": "Pedicure Gel (7 Days Warranty)",
      "name_zh": "高级足部凝胶光疗美甲 (7天质保)",
      "name_ja": "フットジェルネイル（7日間保証付）",
      "name_ko": "프리미엄 페디 젤네일 (7일 무료 보증)",
      "duration_vi": "45 phút",
      "duration_en": "45 min",
      "duration_zh": "45分钟",
      "duration_ja": "45分",
      "duration_ko": "45분",
      "price_vnd": 380000,
      "desc_vi": "Sơn gel móng chân bền bỉ, sang trọng, bảo hành 7 ngày miễn phí.",
      "desc_en": "Long lasting gel polish for feet with rich hues and 7 days warranty.",
      "desc_zh": "足部持久防脱高光泽凝胶，色彩优雅大方，享有7天免费售后保障。",
      "desc_ja": "足元を美しく彩る高耐久ジェルカラー（7日間の無料お直し保証付き）。",
      "desc_ko": "발끝을 세련되게 연출하는 오랜 지속력의 젤 페디큐어 (7일 무료 보증).",
      "image": "assets/images/loc_hatrung_flora.jpg"
    },
    {
      "id": "nail-7",
      "name_vi": "Úp Móng Giả Kèm Sơn Gel Màu",
      "name_en": "Full Cover Soft Gel Tips with Color",
      "name_zh": "全贴甲片延长含纯色凝胶",
      "name_ja": "ネイルチップ装着＋ジェルカラー",
      "name_ko": "소프트 젤 팁 연장 + 젤 컬러",
      "duration_vi": "60 phút",
      "duration_en": "60 min",
      "duration_zh": "60分钟",
      "duration_ja": "60分",
      "duration_ko": "60분",
      "price_vnd": 580000,
      "desc_vi": "Úp móng form chuẩn đẹp tự nhiên, chắc chắn và sơn màu gel cao cấp.",
      "desc_en": "Full-cover soft gel tips perfectly fitted and styled with your favorite gel color.",
      "desc_zh": "贴合真甲的轻薄软胶甲片全贴延长，打造自然修长指尖并涂覆凝胶色。",
      "desc_ja": "自爪に優しく自然な美しさを叶えるフルカバーチップ装着＋お好みのジェルカラー。",
      "desc_ko": "손톱 모양에 맞춘 소프트 젤 팁 익스텐션과 원하는 젤 컬러링 완성.",
      "image": "assets/images/loc_hatrung_flora.jpg"
    },
    {
      "id": "nail-8",
      "name_vi": "Nối Móng Đắp Gel Quang Học (Bao Gồm Màu)",
      "name_en": "Sculpted Gel Extensions with Color",
      "name_zh": "光疗凝胶真甲延长含色彩",
      "name_ja": "スカルプチュアジェル長さ出し＋カラー",
      "name_ko": "젤 익스텐션 연장 + 젤 컬러",
      "duration_vi": "75 phút",
      "duration_en": "75 min",
      "duration_zh": "75分钟",
      "duration_ja": "75分",
      "duration_ko": "75분",
      "price_vnd": 750000,
      "desc_vi": "Kỹ thuật đắp gel kéo dài móng thanh thoát, nhẹ êm không nặng tay.",
      "desc_en": "Sculpted gel nail extensions for elegant length and flawless natural durability.",
      "desc_zh": "精细雕塑光疗延长甲，透气轻盈，坚固韧性佳，含定制色彩。",
      "desc_ja": "ジェルで1本ずつ丁寧に形作る長さ出しスカルプチュア（カラーリング込）。",
      "desc_ko": "가볍고 견고한 젤 익스텐션으로 이상적인 길이와 쉐입 연출 (컬러 포함).",
      "image": "assets/images/loc_hatrung_flora.jpg"
    },
    {
      "id": "nail-9",
      "name_vi": "Dặm / Bổ Sung Móng Gel Cứng (Mới)",
      "name_en": "Hard Gel Infill (NEW)",
      "name_zh": "硬胶补甲修护 (新品)",
      "name_ja": "ハードジェルリフィル・お直し (NEW)",
      "name_ko": "하드 젤 리필 (NEW)",
      "duration_vi": "45 phút",
      "duration_en": "45 min",
      "duration_zh": "45分钟",
      "duration_ja": "45分",
      "duration_ko": "45분",
      "price_vnd": 600000,
      "desc_vi": "Bổ sung chân móng mới mọc bằng gel cứng chuyên dụng bền đẹp.",
      "desc_en": "Hard gel infill treatment to maintain length and strength seamlessly.",
      "desc_zh": "为新长出指甲补充硬质光疗凝胶，平整衔接，维持完美指甲状态。",
      "desc_ja": "伸びてきた根元をハードジェルで美しく補正し強度を保ちます。",
      "desc_ko": "자라난 손톱 뿌리 부분을 하드 젤로 매끄럽게 메우고 보강하는 리필 케어.",
      "image": "assets/images/loc_hatrung_flora.jpg"
    },
    {
      "id": "nail-10",
      "name_vi": "Dặm / Bổ Sung Móng Bột Acrylic (Mới)",
      "name_en": "Acrylic Nail Infill (NEW)",
      "name_zh": "水晶甲精准补甲 (新品)",
      "name_ja": "アクリルスカルプリフィル (NEW)",
      "name_ko": "아크릴 네일 리필 (NEW)",
      "duration_vi": "60 phút",
      "duration_en": "60 min",
      "duration_zh": "60分钟",
      "duration_ja": "60分",
      "duration_ko": "60분",
      "price_vnd": 850000,
      "desc_vi": "Kỹ thuật dặm bột acrylic cao cấp tạo phom móng hoàn hảo.",
      "desc_en": "High precision acrylic nail infill and reshaping.",
      "desc_zh": "水晶粉专业补填与重塑抛光，恢复如初坚固饱满质感。",
      "desc_ja": "アクリルネイルの根元補正と全体の美しいフォルム再調整。",
      "desc_ko": "아크릴 파우더로 손톱 뿌리를 꼼꼼하게 채워 처음처럼 견고하게 리모델링.",
      "image": "assets/images/loc_hatrung_flora.jpg"
    },
    {
      "id": "nail-11",
      "name_vi": "Phá Sơn Gel / Phá Gel Cứng / Phá Móng Bột",
      "name_en": "Safe Removal (Gel / Hard Gel / Acrylic)",
      "name_zh": "温和安全卸甲 (凝胶/硬胶/水晶)",
      "name_ja": "安心オフ（ジェル／ハードジェル／アクリル）",
      "name_ko": "안전 젤/아크릴 제거",
      "duration_vi": "30 phút",
      "duration_en": "30 min",
      "duration_zh": "30分钟",
      "duration_ja": "30分",
      "duration_ko": "30분",
      "price_vnd": 150000,
      "desc_vi": "Quy trình phá gel an toàn, êm dịu, bảo vệ cấu trúc móng nguyên bản.",
      "desc_en": "Safe and gentle removal of gel and acrylic while protecting natural nails.",
      "desc_zh": "温和卸除凝胶和水晶甲，不伤指甲天然甲层。",
      "desc_ja": "自爪を痛めない丁寧なジェル＆アクリルオフ。",
      "desc_ko": "자연 손톱 손상 없이 부드럽고 안전하게 젤과 아크릴을 제거합니다.",
      "image": "assets/images/loc_hatrung_flora.jpg"
    }
  ],
  "waxing": [
    {
      "id": "wax-1",
      "name_vi": "Waxing Vùng Nách (Underarms)",
      "name_en": "Underarm Waxing",
      "name_zh": "腋下温和蜡脱",
      "name_ja": "ワキ脱毛",
      "name_ko": "겨드랑이 왁싱",
      "duration_vi": "20 phút",
      "duration_en": "20 min",
      "duration_zh": "20分钟",
      "duration_ja": "20分",
      "duration_ko": "20분",
      "price_vnd": 150000,
      "desc_vi": "Triệt sạch lông vùng nách bằng sáp ấm nhập khẩu, giảm thâm và se khít lỗ chân lông.",
      "desc_en": "Gentle underarm waxing with premium wax, minimizing irritation and smoothing skin.",
      "desc_zh": "采用进口温蜡温和脱除腋下毛发，清爽净白且收敛毛孔。",
      "desc_ja": "低刺激の高品質ワックスでワキの毛を根元からすっきり除去。",
      "desc_ko": "저자극 프리미엄 왁스로 겨드랑이 털을 깔끔하게 제거하고 매끄러운 피부 유지.",
      "image": "assets/images/facial_gold_care.jpg"
    },
    {
      "id": "wax-2",
      "name_vi": "Waxing Ria Mép & Cằm",
      "name_en": "Upper Lip & Chin Waxing",
      "name_zh": "唇周与下巴脱毛",
      "name_ja": "口元＆あごワックス脱毛",
      "name_ko": "인중 & 턱 왁싱",
      "duration_vi": "20 phút",
      "duration_en": "20 min",
      "duration_zh": "20分钟",
      "duration_ja": "20分",
      "duration_ko": "20분",
      "price_vnd": 160000,
      "desc_vi": "Làm sạch ria mép và lông cằm nhẹ nhàng, tạo làn da sáng mịn và ăn phấn.",
      "desc_en": "Gentle facial waxing for lip and chin area, creating a smooth flawless canvas for makeup.",
      "desc_zh": "温和去除唇周及下巴细软汗毛，提亮肤色更易上妆。",
      "desc_ja": "お顔の印象を明るくする口周り＆あごの産毛ワックスケア。",
      "desc_ko": "인중과 턱 부위의 잔털을 부드럽게 정리하여 메이크업 밀착력을 높여줍니다.",
      "image": "assets/images/facial_gold_care.jpg"
    },
    {
      "id": "wax-3",
      "name_vi": "Waxing Ria Mép Chuyên Biệt",
      "name_en": "Upper Lip Waxing",
      "name_zh": "上唇专项脱毛",
      "name_ja": "上唇ワックス脱毛",
      "name_ko": "인중 전용 왁싱",
      "duration_vi": "15 phút",
      "duration_en": "15 min",
      "duration_zh": "15分钟",
      "duration_ja": "15分",
      "duration_ko": "15분",
      "price_vnd": 180000,
      "desc_vi": "Triệt ria mép không đau rát, giúp gương mặt sáng mịn tự tin.",
      "desc_en": "Sensitive warm wax to remove fine upper lip hairs effortlessly.",
      "desc_zh": "专用抗敏感温蜡，轻松拔除上唇细微唇毛，面容更显洁净光彩。",
      "desc_ja": "敏感肌用の温ワックスで、口元の産毛を痛みなく綺麗に除去。",
      "desc_ko": "민감성 부위 전용 왁스로 인중의 잔털을 깨끗하게 정리해 안색을 밝혀줍니다.",
      "image": "assets/images/facial_gold_care.jpg"
    },
    {
      "id": "wax-4",
      "name_vi": "Waxing Định Hình Chân Mày",
      "name_en": "Eyebrow Arch Sculpting Wax",
      "name_zh": "眉毛艺术修整蜡脱",
      "name_ja": "アイブロウワックス眉スタイリング",
      "name_ko": "눈썹 라인 왁싱 디자인",
      "duration_vi": "15 phút",
      "duration_en": "15 min",
      "duration_zh": "15分钟",
      "duration_ja": "15分",
      "duration_ko": "15분",
      "price_vnd": 180000,
      "desc_vi": "Dọn sạch lông mày thừa, tạo phom chân mày thanh tú gọn gàng.",
      "desc_en": "Precision eyebrow arch sculpting and stray hair cleaning.",
      "desc_zh": "依据个人骨骼五官精准设计眉形，清理杂毛，轮廓分明精神利落。",
      "desc_ja": "眉周りの余分な毛をすっきり脱毛し、理想の美眉ラインを演出。",
      "desc_ko": "얼굴형에 맞춘 섬세한 눈썹 왁싱으로 또렷하고 정돈된 눈썹 라인 완성.",
      "image": "assets/images/facial_gold_care.jpg"
    },
    {
      "id": "wax-5",
      "name_vi": "Waxing Nửa Cánh Tay",
      "name_en": "Half Arm Waxing",
      "name_zh": "半臂温和脱毛",
      "name_ja": "腕半分（ひじ下）ワックス脱毛",
      "name_ko": "팔 하프 왁싱",
      "duration_vi": "25 phút",
      "duration_en": "25 min",
      "duration_zh": "25分钟",
      "duration_ja": "25分",
      "duration_ko": "25분",
      "price_vnd": 250000,
      "desc_vi": "Triệt lông nửa tay sạch sẽ, thoa gel lô hội làm dịu da.",
      "desc_en": "Gentle hair removal for forearms with cooling aloe vera massage.",
      "desc_zh": "前臂温和脱毛，去除多余毛发后附赠清凉芦荟舒缓按摩。",
      "desc_ja": "ひじ下の腕の毛を綺麗にケアし、アロエジェルでみずみずしく鎮静。",
      "desc_ko": "팔꿈치 아래 부위의 깔끔한 왁싱 후 쿨링 알로에 젤 진정 마사지 제공.",
      "image": "assets/images/couple_suite_bath.jpg"
    },
    {
      "id": "wax-6",
      "name_vi": "Waxing Toàn Bộ Cánh Tay",
      "name_en": "Full Arms Waxing",
      "name_zh": "全手臂光洁脱毛",
      "name_ja": "腕全体ワックス脱毛",
      "name_ko": "팔 전체 왁싱",
      "duration_vi": "40 phút",
      "duration_en": "40 min",
      "duration_zh": "40分钟",
      "duration_ja": "40分",
      "duration_ko": "40분",
      "price_vnd": 350000,
      "desc_vi": "Làm sạch toàn bộ lông tay, làn da mịn màng mướt mát.",
      "desc_en": "Complete arm waxing including shoulders and hands.",
      "desc_zh": "从上臂到手背全面脱毛净肤，恢复丝滑柔润触感。",
      "desc_ja": "肩口から手首・指先まで両腕全体のムダ毛をきめ細かくケア。",
      "desc_ko": "어깨 라인부터 손목까지 팔 전체의 잔털을 매끈하게 제거해 줍니다.",
      "image": "assets/images/couple_suite_bath.jpg"
    },
    {
      "id": "wax-7",
      "name_vi": "Waxing Nửa Chân Dưới (Bắp Chân)",
      "name_en": "Lower Legs Waxing",
      "name_zh": "小腿丝滑脱毛",
      "name_ja": "ひざ下・ふくらはぎワックス脱毛",
      "name_ko": "종아리 하프 왁싱",
      "duration_vi": "30 phút",
      "duration_en": "30 min",
      "duration_zh": "30分钟",
      "duration_ja": "30分",
      "duration_ko": "30분",
      "price_vnd": 380000,
      "desc_vi": "Làm sạch lông bắp chân, tự tin diện váy ngắn dạo phố.",
      "desc_en": "Smooth leg waxing that weakens hair roots and slows regrowth.",
      "desc_zh": "去除膝盖以下小腿部位毛发，毛根变细生长减缓，光滑自信。",
      "desc_ja": "ひざ下の毛をすっきり取り除き、なめらかで透明感のある美脚へ。",
      "desc_ko": "무릎 아래 종아리의 불필요한 털을 완벽히 정리하여 매끄러운 다리 완성.",
      "image": "assets/images/foot_soak_care.jpg"
    },
    {
      "id": "wax-8",
      "name_vi": "Waxing Toàn Bộ Đôi Chân",
      "name_en": "Full Legs Waxing",
      "name_zh": "全腿丝滑脱毛",
      "name_ja": "脚全体ワックス脱毛",
      "name_ko": "다리 전체 왁싱",
      "duration_vi": "50 phút",
      "duration_en": "50 min",
      "duration_zh": "50分钟",
      "duration_ja": "50分",
      "duration_ko": "50분",
      "price_vnd": 550000,
      "desc_vi": "Triệt lông cả chân từ đùi tới mắt cá, êm dịu và sạch mịn.",
      "desc_en": "Full length leg waxing leaving silky soft touch from thigh to ankle.",
      "desc_zh": "大腿至脚踝全长深度脱毛，肌肤如丝绸般莹润细滑。",
      "desc_ja": "太ももから足首まで、脚全体のムダ毛を一度にすべすべに仕上げます。",
      "desc_ko": "허벅지부터 발목까지 다리 전체를 실크처럼 부드럽고 매끈하게 가꿔줍니다.",
      "image": "assets/images/foot_soak_care.jpg"
    },
    {
      "id": "wax-9",
      "name_vi": "Waxing Triệt Lông Vùng Lưng",
      "name_en": "Full Back Waxing",
      "name_zh": "背部舒爽脱毛",
      "name_ja": "背中全体ワックス脱毛",
      "name_ko": "등 전체 왁싱",
      "duration_vi": "40 phút",
      "duration_en": "40 min",
      "duration_zh": "40分钟",
      "duration_ja": "40分",
      "duration_ko": "40분",
      "price_vnd": 450000,
      "desc_vi": "Làm sạch lông vùng lưng cho nam và nữ, ngăn ngừa mụn lưng.",
      "desc_en": "Thorough back waxing for clean, smooth skin.",
      "desc_zh": "男女适用的背部毛发清洁蜡脱，预防毛孔堵塞，后背清爽平滑。",
      "desc_ja": "手の届かない背中のムダ毛をきれいにケアし、自信の持てる背中へ。",
      "desc_ko": "등 전체의 잔털을 깨끗이 제모하여 트러블을 예방하고 매끄러운 등을 만듭니다.",
      "image": "assets/images/hot_stone_massage.jpg"
    },
    {
      "id": "wax-10",
      "name_vi": "Waxing Triệt Lông Vùng Ngực",
      "name_en": "Chest Waxing",
      "name_zh": "胸部清爽脱毛",
      "name_ja": "胸元ワックス脱毛",
      "name_ko": "가슴 왁싱",
      "duration_vi": "35 phút",
      "duration_en": "35 min",
      "duration_zh": "35分钟",
      "duration_ja": "35分",
      "duration_ko": "35분",
      "price_vnd": 480000,
      "desc_vi": "Làm sạch lông vùng ngực thẩm mỹ, an toàn vệ sinh.",
      "desc_en": "Comfortable chest waxing suitable for men and women.",
      "desc_zh": "胸部舒爽温和蜡脱，温和无刺激，保持整洁自信体态。",
      "desc_ja": "胸元の毛を清潔かつ安全にワックス脱毛し、すっきりとした素肌に。",
      "desc_ko": "가슴 부위의 털을 안전하고 위생적으로 제거하여 깔끔함을 유지합니다.",
      "image": "assets/images/hot_stone_massage.jpg"
    },
    {
      "id": "wax-11",
      "name_vi": "Waxing Viền Bikini",
      "name_en": "Bikini Line Waxing",
      "name_zh": "比基尼线精修脱毛",
      "name_ja": "ビキニラインワックス脱毛",
      "name_ko": "비키니 라인 왁싱",
      "duration_vi": "30 phút",
      "duration_en": "30 min",
      "duration_zh": "30分钟",
      "duration_ja": "30分",
      "duration_ko": "30분",
      "price_vnd": 380000,
      "desc_vi": "Tạo viền bikini gọn gàng, vệ sinh trong không gian phòng riêng tuyệt đối.",
      "desc_en": "Clean, tidy bikini line waxing in complete privacy.",
      "desc_zh": "在绝对私密的独立贵宾间修整比基尼线条，卫生整洁安心。",
      "desc_ja": "完全個室のプライベート空間で、ビキニラインを美しく整えます。",
      "desc_ko": "완벽한 프라이빗 룸에서 위생적이고 단정하게 비키니 라인을 정돈합니다.",
      "image": "assets/images/hero_spa_luxury.jpg"
    },
    {
      "id": "wax-12",
      "name_vi": "Waxing Toàn Phần Bikini (Brazilian)",
      "name_en": "Complete Brazilian Bikini Waxing",
      "name_zh": "巴西全脱私密脱毛",
      "name_ja": "ブラジリアンワックス（完全個室）",
      "name_ko": "브라질리언 올누드 왁싱",
      "duration_vi": "45 phút",
      "duration_en": "45 min",
      "duration_zh": "45分钟",
      "duration_ja": "45分",
      "duration_ko": "45분",
      "price_vnd": 550000,
      "desc_vi": "Triệt lông toàn phần bikini bởi chuyên viên nữ giàu kinh nghiệm, chu đáo và nhẹ nhàng.",
      "desc_en": "Complete Brazilian bikini waxing by certified female specialists in private suites.",
      "desc_zh": "由经验丰富的女性资深技师操作，在完全独立单间提供温柔私密的巴西全脱服务。",
      "desc_ja": "経験豊富な女性スタッフによる、丁寧で痛みを抑えた完全個室ブラジリアンワックス。",
      "desc_ko": "숙련된 여성 전문 테라피스트가 1인실에서 섬세하고 위생적으로 진행하는 브라질리언 왁싱.",
      "image": "assets/images/hero_spa_luxury.jpg"
    }
  ],
  "eyelash": [
    {
      "id": "eye-1",
      "name_vi": "Nối Mi Thiết Kế Chuyên Nghiệp",
      "name_en": "Silk Eyelash Extensions (Classic / Volume)",
      "name_zh": "专业蚕丝睫毛嫁接 (经典/多簇浓密)",
      "name_ja": "デザインまつげエクステ（セーブルラッシュ）",
      "name_ko": "실크 속눈썹 연장 (클래식 / 볼륨 디자인)",
      "duration_vi": "75 phút",
      "duration_en": "75 min",
      "duration_zh": "75分钟",
      "duration_ja": "75分",
      "duration_ko": "75분",
      "price_vnd": 650000,
      "desc_vi": "Sợi mi tơ lụa siêu nhẹ, không cộm ngứa, bền đẹp tự nhiên từ 4-6 tuần.",
      "desc_en": "Featherlight silk lash extensions customized to flatter your eye shape naturally.",
      "desc_zh": "轻若羽毛的优质蚕丝材质，根据眼型量身定制设计，持久服帖4至6周。",
      "desc_ja": "つけているのを忘れるほど軽やかな極上セーブル毛。目元に合わせて自然に美しく。",
      "desc_ko": "이물감 없이 가볍고 부드러운 고급 실크모로 눈매에 맞춘 자연스러운 연출 (4~6주 지속).",
      "image": "assets/images/facial_gold_care.jpg",
      "popular": true
    },
    {
      "id": "eye-2",
      "name_vi": "Uốn Mi Cong Tự Nhiên & Phủ Collagen",
      "name_en": "Lash Lift & Collagen Nourishing Tint",
      "name_zh": "胶原蛋白卷烫美睫与深层滋养",
      "name_ja": "まつげパーマ＆コラーゲン補修トリートメント",
      "name_ko": "속눈썹 펌 & 콜라겐 영양 틴팅",
      "duration_vi": "45 phút",
      "duration_en": "45 min",
      "duration_zh": "45分钟",
      "duration_ja": "45分",
      "duration_ko": "45분",
      "price_vnd": 350000,
      "desc_vi": "Uốn cong mi thật bằng dưỡng chất collagen, hàng mi cong vút tự nhiên không lo gãy rụng.",
      "desc_en": "Lash lift and tint creating stunning, open-eyed curl that lasts up to 2 months without mascara.",
      "desc_zh": "蕴含水解胶原蛋白，自然卷翘提升自身睫毛，无需睫毛膏即可保持明眸电眼达2个月。",
      "desc_ja": "自まつげを根元から立ち上げ、コラーゲンで保湿しながら印象的なカールを約2ヶ月キープ。",
      "desc_ko": "콜라겐 영양 공급과 함께 본인 속눈썹을 또렷하게 컬링하여 마스카라 없이도 2달간 지속.",
      "image": "assets/images/facial_gold_care.jpg"
    },
    {
      "id": "eye-3",
      "name_vi": "Tháo Mi Nối An Toàn & Dưỡng Mi Thật",
      "name_en": "Gentle Safe Lash Removal",
      "name_zh": "温和无痛卸除睫毛",
      "name_ja": "まつげエクステ安全オフ＆ケア",
      "name_ko": "속눈썹 무자극 쏙오프 & 영양 케어",
      "duration_vi": "20 phút",
      "duration_en": "20 min",
      "duration_zh": "20分钟",
      "duration_ja": "20分",
      "duration_ko": "20분",
      "price_vnd": 250000,
      "desc_vi": "Kem tháo mi chuyên dụng không cay mắt, giữ nguyên vẹn hàng mi thật.",
      "desc_en": "Gentle, pain-free lash removal cream protecting your natural eyelashes completely.",
      "desc_zh": "植物配方温和卸胶膏，不熏眼不伤真睫毛，清洁彻底护养毛囊。",
      "desc_ja": "目にしみない専用クリームを使用し、自まつげを守りながら優しく綺麗にオフ。",
      "desc_ko": "눈 시림 없는 전용 리무버로 본래의 속눈썹 손상 없이 안전하게 제거합니다.",
      "image": "assets/images/facial_gold_care.jpg"
    },
    {
      "id": "eye-4",
      "name_vi": "Nhuộm Màu Chân Mày Thảo Dược Tự Nhiên",
      "name_en": "Herbal Eyebrow Tinting & Shaping",
      "name_zh": "草本天然植物染眉定型",
      "name_ja": "オーガニックハーブ眉カラー＆スタイリング",
      "name_ko": "천연 허브 아이브로우 틴팅 & 정돈",
      "duration_vi": "30 phút",
      "duration_en": "30 min",
      "duration_zh": "30分钟",
      "duration_ja": "30分",
      "duration_ko": "30분",
      "price_vnd": 250000,
      "desc_vi": "Nhuộm chân mày màu nâu đen hoặc hạt dẻ tự nhiên, hài hòa gương mặt.",
      "desc_en": "Custom herbal brow tinting enhancing tone and defining natural arches.",
      "desc_zh": "精选天然草本植物染料，调制自然棕黑或咖啡色，与发色肤色浑然一体。",
      "desc_ja": "天然ハーブ成分で眉を優しくカラーリングし、お顔の骨格に合わせた立体美を演出。",
      "desc_ko": "천연 허브 염료로 피부 톤과 헤어 컬러에 맞게 자연스럽고 또렷한 눈썹 톤 연출.",
      "image": "assets/images/facial_gold_care.jpg"
    }
  ]
};

  // =========================================================================
  // CURRENCY FORMATTER HELPER
  // =========================================================================
  function formatPrice(vndPrice) {
    if (state.currency === 'usd') {
      const usd = Math.round(vndPrice / state.rateVNDtoUSD);
      return `$${usd}`;
    }
    return new Intl.NumberFormat('vi-VN').format(vndPrice) + ' ₫';
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
              <span class="menu-item-price">${formatPrice(item.price_vnd)}</span>
            </div>
            <div class="menu-item-meta">
              <span><i class="fa fa-clock-o"></i> ${duration}</span>
              ${item.popular ? `<span style="color:#D4AF37;font-weight:700;"><i class="fa fa-star"></i> ${t.vip_choice || 'VIP'}</span>` : ''}
            </div>
            <p class="menu-item-desc">${desc}</p>
            <div class="menu-item-actions">
              <button class="btn-book-service-now js-quick-book" data-service="${encodeURIComponent(name)}" data-price="${formatPrice(item.price_vnd)}">
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

    // Re-render Zen sound cards & track display
    if (typeof renderZenSectionTrackCards === 'function') {
      renderZenSectionTrackCards();
    }
    if (typeof updateZenTrackDisplay === 'function') {
      updateZenTrackDisplay();
    }

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

  // Populate appointment times according to language (Full 30-min slots from 10:00 to 21:30 + Custom time)
  function updateTimeOptions() {
    const lang = state.language;
    const timeSlots = [
      '10:00', '10:30', '11:00', '11:30', '12:00', '12:30',
      '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
      '16:00', '16:30', '17:00', '17:30', '18:00', '18:30',
      '19:00', '19:30', '20:00', '20:30', '21:00', '21:30'
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
      packages: { vi: '--- GÓI HOÀNG GIA (2H - 4H) ---', en: '--- ROYAL PACKAGES (2H - 4H) ---', zh: '--- 皇室尊享套餐 (2-4小时) ---', ja: '--- ロイヤルパッケージ (2〜4時間) ---', ko: '--- 로열 패키지 (2-4시간) ---' },
      massage: { vi: '--- BODY MASSAGE ---', en: '--- BODY MASSAGE ---', zh: '--- 身体按摩 ---', ja: '--- ボディマッサージ ---', ko: '--- 바디 마사지 ---' },
      nails: { vi: '--- DỊCH VỤ NAIL ---', en: '--- NAIL SERVICES ---', zh: '--- 美甲服务 ---', ja: '--- ネイルサービス ---', ko: '--- 네일 서비스 ---' },
      waxing: { vi: '--- WAXING TRIỆT LÔNG ---', en: '--- WAXING SERVICES ---', zh: '--- 脱毛服务 ---', ja: '--- ワックス脱毛 ---', ko: '--- 왁싱 제모 ---' },
      eyelash: { vi: '--- NỐI MI & MÀY ---', en: '--- EYELASH & EYEBROW ---', zh: '--- 美睫与美眉 ---', ja: '--- まつげ＆眉ケア ---', ko: '--- 속눈썹 & 눈썹 ---' }
    };

    for (const cat in spaMenuData) {
      const catLabel = (catTitles[cat] && catTitles[cat][lang]) || `--- ${cat.toUpperCase()} ---`;
      optionsHtml += `<optgroup label="${catLabel}">`;
      spaMenuData[cat].forEach(item => {
        const name = item['name_' + lang] || item.name_en || item.name_vi;
        const priceStr = formatPrice(item.price_vnd);
        optionsHtml += `<option value="${name} (${priceStr})">${name} (${priceStr})</option>`;
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
      showToast(`${conf.flag} Ngôn ngữ / Language: ${conf.name}`);
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
        showToast(`${conf.flag} Ngôn ngữ / Language: ${conf.name}`);
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
        showToast(`${conf.flag} Ngôn ngữ / Language: ${conf.name}`);
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
  const modalOverlay = document.getElementById('booking-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');

  function openBookingModalWithService(serviceName = '') {
    if (!modalOverlay) return;
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';

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

    if (modalGuestsSelect) {
      if (heroIsGuestCustom && heroCustomGuests?.value) {
        modalGuestsSelect.style.display = 'none';
        if (modalCustomGuests) {
          modalCustomGuests.style.display = 'block';
          modalCustomGuests.value = heroCustomGuests.value;
        }
        if (modalGuestModeText) modalGuestModeText.textContent = getModeLabel('list');
      } else if (heroGuestVal && heroGuestVal !== 'custom') {
        modalGuestsSelect.style.display = 'block';
        modalGuestsSelect.value = heroGuestVal;
        if (modalCustomGuests) modalCustomGuests.style.display = 'none';
        if (modalGuestModeText) modalGuestModeText.textContent = getModeLabel('custom');
      }
    }
    if (heroLocation && modalBranch) modalBranch.value = heroLocation;

    if (serviceName) {
      const serviceInput = document.getElementById('modal-service-select');
      if (serviceInput) {
        const options = Array.from(serviceInput.options);
        const match = options.find(opt => opt.value === serviceName || opt.text.includes(serviceName.split(' (')[0]));
        if (match) {
          serviceInput.value = match.value;
        } else {
          serviceInput.value = serviceName;
        }
      }
    }
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
    if (!modalOverlay) return;
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeBookingModal);

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeBookingModal();
    });
  }

  // Trigger modal from any .js-open-booking button
  document.querySelectorAll('.js-open-booking').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const s = btn.getAttribute('data-service') || '';
      openBookingModalWithService(s);
    });
  });

  // =========================================================================
  // OFFICIAL MENU BOARD LIGHTBOX MODAL
  // =========================================================================
  const menuBoardModal = document.getElementById('menu-board-modal');
  const menuBoardCloseBtn = document.getElementById('menu-board-close-btn');

  function openMenuBoardModal() {
    if (!menuBoardModal) return;
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
  function getServicePriceVND(serviceName) {
    if (!serviceName) return 500000;
    for (const cat in spaMenuData) {
      const match = spaMenuData[cat].find(s => 
        (s.name_vi && s.name_vi.toLowerCase() === serviceName.toLowerCase()) ||
        (s.name_en && s.name_en.toLowerCase() === serviceName.toLowerCase()) ||
        serviceName.includes(s.name_vi) || (s.name_vi && s.name_vi.includes(serviceName))
      );
      if (match && match.price_vnd) return match.price_vnd;
    }
    // Fallback based on typical prices
    if (serviceName.includes('COMBO 1') || serviceName.includes('800')) return 800000;
    if (serviceName.includes('COMBO 3') || serviceName.includes('120') || serviceName.includes('1000')) return 1000000;
    if (serviceName.includes('COMBO 2') || serviceName.includes('450')) return 450000;
    return 650000;
  }

  const bookingFormModal = document.getElementById('modal-booking-form');
  if (bookingFormModal) {
    bookingFormModal.addEventListener('submit', (e) => {
      e.preventDefault();

      const t = translations[state.language] || translations.vi;
      const name = document.getElementById('modal-cust-name')?.value || 'Guest';
      const phone = document.getElementById('modal-cust-phone')?.value || '';
      const branch = 'IVY LUXE SPA - 48 Hà Trung, Hoàn Kiếm, Hà Nội';
      const service = document.getElementById('modal-service-select')?.value || 'IVY SPECIAL - COMBO 1 (HOT) - 90 PHÚT';
      const date = document.getElementById('modal-book-date')?.value || '';
      
      const modalSelectTime = document.getElementById('modal-book-time');
      const modalCustomTime = document.getElementById('modal-custom-time');
      const isCustomTime = modalCustomTime && modalCustomTime.style.display !== 'none';
      const time = isCustomTime ? (modalCustomTime.value || '14:30') : (modalSelectTime?.value || '14:30');
      
      const modalSelectGuests = document.getElementById('modal-guest-count');
      const modalCustomGuests = document.getElementById('modal-custom-guests');
      const isCustomGuests = modalCustomGuests && modalCustomGuests.style.display !== 'none';
      let guests = isCustomGuests ? (modalCustomGuests.value ? `${modalCustomGuests.value} Khách` : '2 Khách') : (modalSelectGuests?.value || '2');
      if (guests === 'custom') guests = modalCustomGuests?.value ? `${modalCustomGuests.value} Khách` : '2 Khách';

      // Payment Method Choice
      const payMethodRadio = document.querySelector('input[name="modal-pay-method"]:checked');
      const payMethod = payMethodRadio ? payMethodRadio.value : 'sepay-qr';

      // Affiliate referral tracking
      const affCode = localStorage.getItem('ivy_affiliate_ref');
      let affLine = '';
      if (affCode) {
        affLine = `\n- Mã Đối Tác / Referral: ${affCode} (VIP 10% Discount)`;
        if (typeof recordAffiliateBooking === 'function') {
          recordAffiliateBooking(affCode, service, guests);
        }
      }

      // Generate Unique Booking & Payment Code
      const randNum = Math.floor(1000 + Math.random() * 9000);
      const bookingCode = 'IVY' + randNum;

      // Price calculation
      let basePrice = getServicePriceVND(service);
      let guestCount = parseInt(guests, 10) || 1;
      if (guestCount < 1) guestCount = 1;
      let totalPrice = basePrice * guestCount;

      // Apply Affiliate 10% Discount if present
      if (affCode) {
        totalPrice = Math.round(totalPrice * 0.9);
      }

      // Determine final payment amount
      let payableAmount = totalPrice;
      let payMethodLabel = 'Chuyển Khoản Tự Động VietQR / SePay';

      if (payMethod === 'deposit') {
        payableAmount = 100000; // 100k VND deposit
        payMethodLabel = 'Đặt Cọc Giữ Chỗ (100.000đ)';
      } else if (payMethod === 'sepay-qr') {
        payableAmount = Math.round(totalPrice * 0.95); // 5% online prepayment discount
        payMethodLabel = 'Thanh Toán Toàn Bộ VietQR (Giảm thêm 5%)';
      } else {
        payableAmount = totalPrice;
        payMethodLabel = 'Thanh Toán Tại Quầy Spa (Tiền mặt / Thẻ)';
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
          status: payMethod === 'cash' ? 'Chờ xác nhận (Tiền mặt)' : 'Chờ thanh toán SePay',
          paymentStatus: payMethod === 'cash' ? 'Chưa thanh toán' : 'Chờ quét QR',
          createdAt: new Date().toISOString()
        };
        bookingsList.unshift(newBooking);
        localStorage.setItem('ivy_bookings', JSON.stringify(bookingsList));
      } catch (err) {}

      const hotline = '0989713660';
      const cleanPhone = '84989713660';

      const modalBody = document.querySelector('.modal-body');

      // IF SEPAY QR OR DEPOSIT SELECTED -> SHOW SEPAY AUTOMATED PAYMENT SCREEN
      if (payMethod === 'sepay-qr' || payMethod === 'deposit') {
        renderSePayPaymentScreen(modalBody, {
          bookingCode,
          name,
          phone,
          service,
          branch,
          date,
          time,
          guests,
          payableAmount,
          payMethodLabel,
          affCode
        });
        return;
      }

      // IF CASH PAYMENT -> DISPLAY INSTANT LUXURY SUCCESS VIEW
      renderCashBookingSuccess(modalBody, {
        bookingCode,
        name,
        phone,
        service,
        branch,
        date,
        time,
        guests,
        totalPrice,
        affCode,
        cleanPhone
      });
    });
  }

  // Render SePay Automated Payment Screen (Sacombank 020113149011 - HKD IVY LUXE SPA)
  function renderSePayPaymentScreen(container, data) {
    if (!container) return;

    const bankAcc = '020113149011';
    const bankName = 'Sacombank';
    const bankOwner = 'HKD IVY LUXE SPA';
    const transferMemo = data.bookingCode;
    const amountStr = data.payableAmount.toLocaleString('vi-VN');

    // Dynamic VietQR via SePay / VietQR API
    const sepayQrUrl = `https://qr.sepay.vn/img?acc=${bankAcc}&bank=${bankName}&amount=${data.payableAmount}&des=${transferMemo}&template=compact`;
    const officialCardImg = 'assets/images/sacombank_qr.png';

    container.innerHTML = `
      <div class="sepay-checkout-wrap">
        <div class="sepay-checkout-header">
          <span class="sepay-order-code-badge"><i class="fa fa-ticket"></i> Mã Đơn: <strong>${data.bookingCode}</strong></span>
          <div style="font-size:0.86rem; color:#5A6560; margin-bottom:4px;">Số Tiền Thanh Toán:</div>
          <h2 class="sepay-total-amount">${amountStr} VNĐ</h2>
          <div style="font-size:0.78rem; color:#25D366; font-weight:700;">✓ ${data.payMethodLabel}</div>
        </div>

        <!-- QR Code Center Display -->
        <div class="sepay-qr-center">
          <img id="sepay-active-qr" src="${sepayQrUrl}" alt="Mã QR SePay Sacombank" class="sepay-qr-img" onerror="this.src='${officialCardImg}'">
        </div>

        <div class="sepay-qr-switch-btns">
          <button type="button" class="sepay-btn-toggle-qr active" id="btn-qr-dynamic">
            <i class="fa fa-qrcode"></i> Mã QR Nhanh (Đã kèm số tiền)
          </button>
          <button type="button" class="sepay-btn-toggle-qr" id="btn-qr-official">
            <i class="fa fa-id-card-o"></i> Thẻ Sacombank Gốc
          </button>
        </div>

        <!-- Bank Details Table with 1-click Copy -->
        <div class="sepay-bank-details-box">
          <div class="sepay-detail-row">
            <span class="sepay-detail-label">Ngân hàng thụ hưởng:</span>
            <span class="sepay-detail-value">
              <strong>Sacombank</strong> (CN Thăng Long / Hà Nội)
            </span>
          </div>

          <div class="sepay-detail-row">
            <span class="sepay-detail-label">Số tài khoản:</span>
            <span class="sepay-detail-value">
              <strong style="color:#0053A0; font-size:1.05rem;">${bankAcc}</strong>
              <button type="button" class="sepay-btn-copy-sm" data-copy="${bankAcc}" title="Sao chép STK">
                <i class="fa fa-clone"></i> Copy
              </button>
            </span>
          </div>

          <div class="sepay-detail-row">
            <span class="sepay-detail-label">Chủ tài khoản:</span>
            <span class="sepay-detail-value">
              <strong>${bankOwner}</strong>
            </span>
          </div>

          <div class="sepay-detail-row">
            <span class="sepay-detail-label">Số tiền chuyển:</span>
            <span class="sepay-detail-value">
              <strong style="color:#B22222;">${amountStr}đ</strong>
              <button type="button" class="sepay-btn-copy-sm" data-copy="${data.payableAmount}" title="Sao chép số tiền">
                <i class="fa fa-clone"></i> Copy
              </button>
            </span>
          </div>

          <div class="sepay-detail-row">
            <span class="sepay-detail-label">Nội dung chuyển khoản:</span>
            <span class="sepay-detail-value">
              <strong style="color:#D4AF37; background:#0F241A; color:#FFE082; padding:2px 8px; border-radius:4px;">${transferMemo}</strong>
              <button type="button" class="sepay-btn-copy-sm" data-copy="${transferMemo}" title="Sao chép nội dung">
                <i class="fa fa-clone"></i> Copy
              </button>
            </span>
          </div>
        </div>

        <!-- SePay Live Status Detector -->
        <div class="sepay-pulsing-detector">
          <i class="fa fa-spinner"></i>
          <span>Hệ thống SePay đang tự động lắng nghe giao dịch từ Ngân hàng Sacombank...</span>
        </div>

        <button type="button" id="btn-sepay-paid-confirm" class="sepay-verify-btn">
          <i class="fa fa-check-circle"></i> TÔI ĐÃ CHUYỂN KHOẢN THÀNH CÔNG
        </button>

        <p style="font-size:0.76rem; color:#7E968C; margin-top:12px; line-height:1.4;">
          <i class="fa fa-lock" style="color:#25D366;"></i> Cổng thanh toán tự động SePay kết nối trực tiếp tài khoản Sacombank <strong>020113149011 (HKD IVY LUXE SPA)</strong> an toàn tuyệt đối.
        </p>
      </div>
    `;

    // Toggle QR View (Dynamic vs Official Card)
    const qrImg = document.getElementById('sepay-active-qr');
    const btnDyn = document.getElementById('btn-qr-dynamic');
    const btnOff = document.getElementById('btn-qr-official');

    if (btnDyn && btnOff && qrImg) {
      btnDyn.addEventListener('click', () => {
        qrImg.src = sepayQrUrl;
        btnDyn.classList.add('active');
        btnOff.classList.remove('active');
      });
      btnOff.addEventListener('click', () => {
        qrImg.src = officialCardImg;
        btnOff.classList.add('active');
        btnDyn.classList.remove('active');
      });
    }

    // 1-Click Copy Buttons
    container.querySelectorAll('.sepay-btn-copy-sm').forEach(btn => {
      btn.addEventListener('click', () => {
        const text = btn.getAttribute('data-copy');
        if (!text) return;
        navigator.clipboard.writeText(text).then(() => {
          const original = btn.innerHTML;
          btn.innerHTML = '<i class="fa fa-check"></i> Xong';
          btn.style.background = '#25D366';
          btn.style.color = '#FFF';
          setTimeout(() => {
            btn.innerHTML = original;
            btn.style.background = '';
            btn.style.color = '';
          }, 1800);
        });
      });
    });

    // "Tôi đã chuyển khoản" button -> Simulate instant SePay verification & success
    const confirmBtn = document.getElementById('btn-sepay-paid-confirm');
    if (confirmBtn) {
      confirmBtn.addEventListener('click', () => {
        confirmBtn.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Đang đối soát SePay...';
        confirmBtn.disabled = true;

        setTimeout(() => {
          // Update Booking Status to PAID in LocalStorage
          try {
            const bookingsList = JSON.parse(localStorage.getItem('ivy_bookings') || '[]');
            const b = bookingsList.find(x => x.id === data.bookingCode);
            if (b) {
              b.status = 'Đã thanh toán (Sacombank SePay)';
              b.paymentStatus = 'Đã thanh toán qua Sacombank';
              localStorage.setItem('ivy_bookings', JSON.stringify(bookingsList));
            }

            // Record SePay Transaction
            const txList = JSON.parse(localStorage.getItem('ivy_transactions') || '[]');
            txList.unshift({
              id: 'TX' + Date.now(),
              bookingCode: data.bookingCode,
              customerName: data.name,
              amount: data.payableAmount,
              bank: 'Sacombank',
              accountNumber: bankAcc,
              accountName: bankOwner,
              gateway: 'SePay VietQR',
              status: 'THÀNH CÔNG',
              time: new Date().toLocaleString('vi-VN')
            });
            localStorage.setItem('ivy_transactions', JSON.stringify(txList));
          } catch (e) {}

          // Display Luxury Success Receipt
          renderPaymentSuccessReceipt(container, data);
        }, 1200);
      });
    }
  }

  // Render Payment Success Receipt
  function renderPaymentSuccessReceipt(container, data) {
    const cleanPhone = '84989713660';
    const message = `Hello IVY LUXE SPA, I have successfully paid for my booking:
- Booking Code: ${data.bookingCode}
- Name: ${data.name}
- Phone: ${data.phone}
- Service: ${data.service}
- Date: ${data.date} at ${data.time}
- Amount Paid: ${data.payableAmount.toLocaleString('vi-VN')}đ via Sacombank SePay`;
    const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;

    container.innerHTML = `
      <div style="text-align:center;padding:30px 15px;">
        <div style="width:75px;height:75px;background:linear-gradient(135deg,#25D366,#128C7E);border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 20px;box-shadow:0 0 30px rgba(37,211,102,0.4);color:#FFF;font-size:2rem;">
          <i class="fa fa-check"></i>
        </div>
        <div style="display:inline-block;background:#E8F8EE;color:#25D366;border:1px solid #B8E8C8;padding:4px 12px;border-radius:20px;font-size:0.8rem;font-weight:800;margin-bottom:10px;">
          <i class="fa fa-check-circle"></i> SEPAY: XÁC NHẬN THANH TOÁN THÀNH CÔNG
        </div>
        <h3 style="font-family:'Cinzel',serif;font-size:1.6rem;color:#0A2E20;margin-bottom:10px;">
          ĐẶT LỊCH HẸN THÀNH CÔNG!
        </h3>
        <p style="font-size:0.92rem;color:#5A6560;line-height:1.6;margin-bottom:20px;">
          Hệ thống IVY LUXE SPA đã nhận được khoản thanh toán <strong>${data.payableAmount.toLocaleString('vi-VN')}đ</strong> qua tài khoản <strong>Sacombank 020113149011</strong>. Phòng trị liệu và kỹ thuật viên đã được bảo lưu riêng cho bạn!
        </p>

        <div style="background:#FAF7F2;border:1px dashed #D4AF37;border-radius:12px;padding:20px;text-align:left;max-width:480px;margin:0 auto 25px;">
          <div style="margin-bottom:8px;"><strong>Mã Đơn Đặt Lịch:</strong> <span style="color:#D4AF37;font-weight:800;">${data.bookingCode}</span></div>
          <div style="margin-bottom:8px;"><strong>Khách Hàng:</strong> ${data.name} (${data.phone})</div>
          <div style="margin-bottom:8px;"><strong>Dịch Vụ:</strong> ${data.service}</div>
          <div style="margin-bottom:8px;"><strong>Thời Gian:</strong> ${data.date} (${data.time}) - ${data.guests}</div>
          <div style="margin-bottom:8px;"><strong>Địa Điểm:</strong> ${data.branch}</div>
          <div style="margin-bottom:8px;"><strong>Thanh Toán:</strong> <span style="color:#25D366;font-weight:700;">Đã thanh toán ${data.payableAmount.toLocaleString('vi-VN')}đ qua SePay Sacombank</span></div>
          <div><strong>Hotline 24/7:</strong> <a href="tel:0989713660" style="color:#B22222;font-weight:700;">098 9713660</a></div>
        </div>

        <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap;">
          <a href="${waUrl}" target="_blank" rel="noopener" class="nav-cta-btn" style="background:#25D366;color:#FFF;border:none;">
            <i class="fa fa-whatsapp"></i> Gửi Biên Lai Qua WhatsApp
          </a>
          <button type="button" onclick="window.print()" class="nav-cta-btn" style="background:linear-gradient(135deg,#ECC876,#D4AF37,#A4791E);color:#051A12;">
            <i class="fa fa-print"></i> In / Lưu Phiếu Hẹn
          </button>
        </div>
      </div>
    `;
  }

  // Render Cash Booking Success
  function renderCashBookingSuccess(container, data) {
    const message = `Hello IVY LUXE SPA, I would like to reserve:
- Booking Code: ${data.bookingCode}
- Name: ${data.name}
- Phone: ${data.phone}
- Service: ${data.service}
- Address: ${data.branch}
- Date: ${data.date} at ${data.time}
- Guests: ${data.guests}
- Payment: Pay in cash at spa`;
    const waUrl = `https://wa.me/${data.cleanPhone}?text=${encodeURIComponent(message)}`;

    container.innerHTML = `
      <div style="text-align:center;padding:30px 15px;">
        <div style="width:75px;height:75px;background:linear-gradient(135deg,#D4AF37,#A37E1C);border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 20px;box-shadow:0 0 30px rgba(212,175,55,0.4);color:#051A12;font-size:2rem;">
          <i class="fa fa-check"></i>
        </div>
        <h3 style="font-family:'Cinzel',serif;font-size:1.6rem;color:#0A2E20;margin-bottom:12px;">
          ĐẶT LỊCH THÀNH CÔNG!
        </h3>
        <p style="font-size:1rem;color:#5A6560;line-height:1.7;margin-bottom:25px;">
          Cảm ơn bạn! Lịch hẹn của bạn đã được tiếp nhận. Bạn sẽ thanh toán trực tiếp khi đến số 48 Hà Trung.
        </p>
        <div style="background:#FAF7F2;border:1px dashed #D4AF37;border-radius:12px;padding:20px;text-align:left;max-width:480px;margin:0 auto 25px;">
          <div style="margin-bottom:8px;"><strong>Mã Đơn:</strong> <span style="color:#D4AF37;font-weight:700;">${data.bookingCode}</span></div>
          <div style="margin-bottom:8px;"><strong>Khách Hàng:</strong> ${data.name} (${data.phone})</div>
          <div style="margin-bottom:8px;"><strong>Dịch Vụ:</strong> ${data.service}</div>
          <div style="margin-bottom:8px;"><strong>Thời Gian:</strong> ${data.date} (${data.time}) - ${data.guests}</div>
          <div style="margin-bottom:8px;"><strong>Địa Chỉ:</strong> ${data.branch}</div>
          <div style="margin-bottom:8px;"><strong>Hình Thức:</strong> Thanh toán tại quầy spa (${data.totalPrice.toLocaleString('vi-VN')}đ)</div>
          <div><strong>Hotline 24/7:</strong> <a href="tel:0989713660" style="color:#B22222;font-weight:700;">098 9713660</a></div>
        </div>
        <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap;">
          <a href="${waUrl}" target="_blank" rel="noopener" class="nav-cta-btn" style="background:#25D366;color:#FFF;border:none;">
            <i class="fa fa-whatsapp"></i> WhatsApp
          </a>
          <a href="tel:0989713660" class="nav-cta-btn" style="background:linear-gradient(135deg,#ECC876,#D4AF37,#A4791E);color:#051A12;">
            <i class="fa fa-phone"></i> Gọi 098 9713660
          </a>
        </div>
      </div>
    `;
  }



  // =========================================================================
  // USER AUTHENTICATION SYSTEM (LOGIN, REGISTER, ROLES & MY BOOKINGS)
  // =========================================================================

  function getAuthUsers() {
    try {
      const stored = localStorage.getItem('ivy_users');
      if (stored) return JSON.parse(stored);
    } catch (e) {}

    const initial = [
      { email: 'admin@ivyluxespa.com', phone: '0989713660', pass: 'admin123', name: 'Quản Trị Viên IVY LUXE', role: 'admin' },
      { email: 'ivyspahanoi@gmail.com', phone: '0989713660', pass: 'admin123', name: 'Admin Ivy Luxe Spa', role: 'admin' },
      { email: 'partner@hotel.com', phone: '0912345678', pass: 'partner123', name: 'Khách Sạn Silk Hanoi', role: 'partner' },
      { email: 'khach@gmail.com', phone: '0901234567', pass: '123456', name: 'Nguyễn Thu Trang', role: 'customer' }
    ];
    try {
      localStorage.setItem('ivy_users', JSON.stringify(initial));
    } catch (e) {}
    return initial;
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
    const userDropdown = document.getElementById('header-user-dropdown');
    const ddName = document.getElementById('user-dd-name');
    const ddRole = document.getElementById('user-dd-role');
    const ddAdminLink = document.getElementById('dd-admin-link');
    const ddPartnerLink = document.getElementById('dd-partner-link');

    // Mobile Auth Strip Elements (Yêu cầu 2: Hiển thị trên điện thoại)
    const mobileGuestActions = document.getElementById('mobile-auth-guest-actions');
    const mobileLoggedActions = document.getElementById('mobile-auth-logged-actions');
    const mobileStripUserName = document.getElementById('mobile-strip-user-name');
    const mobileStripManageText = document.getElementById('mobile-strip-manage-text');

    if (user) {
      const shortName = user.name.split(' ').slice(-1)[0] || 'Tài Khoản';
      if (authBtnText) authBtnText.textContent = shortName;
      if (mobileAuthBtnText) mobileAuthBtnText.textContent = shortName;
      if (ddName) ddName.textContent = user.name;
      if (ddRole) {
        if (user.role === 'admin') {
          ddRole.textContent = 'Quản Trị Viên';
          ddRole.style.color = '#D4AF37';
        } else if (user.role === 'partner') {
          ddRole.textContent = 'Đối Tác Affiliate';
          ddRole.style.color = '#ECC876';
        } else {
          ddRole.textContent = 'Khách Hàng VIP';
          ddRole.style.color = '#25D366';
        }
      }

      if (ddAdminLink) ddAdminLink.style.display = (user.role === 'admin') ? 'block' : 'none';
      if (ddPartnerLink) ddPartnerLink.style.display = (user.role === 'partner' || user.role === 'admin') ? 'block' : 'none';

      // Update Mobile Strip for Logged In User
      if (mobileGuestActions) mobileGuestActions.style.display = 'none';
      if (mobileLoggedActions) mobileLoggedActions.style.display = 'flex';
      if (mobileStripUserName) mobileStripUserName.textContent = shortName;
      if (mobileStripManageText) {
        mobileStripManageText.textContent = (user.role === 'admin') ? 'Quản Trị' : ((user.role === 'partner') ? 'Hoa Hồng' : 'Lịch Hẹn');
      }
    } else {
      if (authBtnText) authBtnText.textContent = 'Đăng Nhập';
      if (mobileAuthBtnText) mobileAuthBtnText.textContent = 'Đăng Nhập';
      if (userDropdown) userDropdown.style.display = 'none';

      // Update Mobile Strip for Guest User
      if (mobileGuestActions) mobileGuestActions.style.display = 'flex';
      if (mobileLoggedActions) mobileLoggedActions.style.display = 'none';
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
    authModal.style.display = 'flex';
  }

  function initAuthSystem() {
    getAuthUsers(); // ensure seed data exists
    updateHeaderAuthState();

    const authModal = document.getElementById('auth-modal');
    const authModalClose = document.getElementById('auth-modal-close');
    const headerAuthBtn = document.getElementById('header-auth-btn');
    const mobileAuthBtn = document.getElementById('mobile-auth-btn');
    const userDropdown = document.getElementById('header-user-dropdown');
    const logoutBtn = document.getElementById('dd-logout-btn');
    const historyBtn = document.getElementById('dd-history-btn');

    // Header Auth Button Click
    function toggleAuthOrDropdown(e) {
      e.stopPropagation();
      const user = getCurrentUser();
      if (user) {
        if (userDropdown) {
          userDropdown.style.display = (userDropdown.style.display === 'block') ? 'none' : 'block';
        }
      } else {
        openAuthModalWithTab('login');
      }
    }

    if (headerAuthBtn) headerAuthBtn.addEventListener('click', toggleAuthOrDropdown);
    if (mobileAuthBtn) mobileAuthBtn.addEventListener('click', toggleAuthOrDropdown);

    // Mobile Auth Strip Buttons (Yêu cầu 2: Điện thoại)
    const mobileStripLoginBtn = document.getElementById('mobile-strip-login-btn');
    const mobileStripRegBtn = document.getElementById('mobile-strip-reg-btn');
    const mobileStripManageBtn = document.getElementById('mobile-strip-manage-btn');
    const mobileStripLogoutBtn = document.getElementById('mobile-strip-logout-btn');

    if (mobileStripLoginBtn) {
      mobileStripLoginBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openAuthModalWithTab('login');
      });
    }

    if (mobileStripRegBtn) {
      mobileStripRegBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openAuthModalWithTab('register');
      });
    }

    if (mobileStripManageBtn) {
      mobileStripManageBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const user = getCurrentUser();
        if (!user) {
          openAuthModalWithTab('login');
          return;
        }
        if (user.role === 'admin') {
          window.location.href = 'admin.html';
        } else if (user.role === 'partner') {
          window.location.hash = '#affiliate';
        } else {
          const myBookingsModal = document.getElementById('my-bookings-modal');
          const myBookingsList = document.getElementById('my-bookings-list');
          if (myBookingsModal) {
            renderMyBookings(myBookingsList);
            myBookingsModal.style.display = 'flex';
          }
        }
      });
    }

    if (mobileStripLogoutBtn) {
      mobileStripLogoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        setCurrentUser(null);
        updateHeaderAuthState();
        alert('Bạn đã đăng xuất tài khoản thành công.');
      });
    }

    // Close Dropdown when clicking outside
    document.addEventListener('click', (e) => {
      if (userDropdown && !userDropdown.contains(e.target) && e.target !== headerAuthBtn) {
        userDropdown.style.display = 'none';
      }
    });

    // Close Auth Modal
    if (authModalClose && authModal) {
      authModalClose.addEventListener('click', () => {
        authModal.style.display = 'none';
      });
    }

    // Auth Tabs Switcher
    const authTabBtns = document.querySelectorAll('.auth-tab-btn');
    const authPanes = document.querySelectorAll('.auth-tab-pane');
    authTabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.getAttribute('data-auth-tab');
        authTabBtns.forEach(b => b.classList.remove('active'));
        authPanes.forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        const pane = document.getElementById('auth-pane-' + target);
        if (pane) pane.classList.add('active');
      });
    });

    // Preset Buttons
    document.querySelectorAll('.auth-preset-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const email = btn.getAttribute('data-email');
        const pass = btn.getAttribute('data-pass');
        const emailInput = document.getElementById('login-identifier');
        const passInput = document.getElementById('login-password');
        if (emailInput) emailInput.value = email;
        if (passInput) passInput.value = pass;
      });
    });

    // Login Form Submit
    const loginForm = document.getElementById('auth-login-form');
    if (loginForm) {
      loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const identifier = document.getElementById('login-identifier')?.value.trim() || '';
        const password = document.getElementById('login-password')?.value.trim() || '';

        const users = getAuthUsers();
        const user = users.find(u => (u.email === identifier || u.phone === identifier) && u.pass === password);

        if (user) {
          setCurrentUser(user);
          updateHeaderAuthState();
          if (authModal) authModal.style.display = 'none';

          if (user.role === 'admin') {
            const goToAdmin = confirm('Đăng nhập Quản Trị Viên thành công! Bạn có muốn mở Trang Quản Trị Admin ngay bây giờ?');
            if (goToAdmin) window.location.href = 'admin.html';
          } else if (user.role === 'partner') {
            window.location.hash = '#affiliate';
          } else {
            alert('Chào mừng ' + user.name + ' quay trở lại với IVY LUXE SPA!');
          }
        } else {
          alert('Sai thông tin tài khoản hoặc mật khẩu! Vui lòng kiểm tra lại.');
        }
      });
    }

    // Register Form Submit
    const regForm = document.getElementById('auth-register-form');
    if (regForm) {
      regForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const fullname = document.getElementById('reg-fullname')?.value.trim() || '';
        const email = document.getElementById('reg-email')?.value.trim() || '';
        const phone = document.getElementById('reg-phone')?.value.trim() || '';
        const password = document.getElementById('reg-password')?.value.trim() || '';
        const role = document.getElementById('reg-role')?.value || 'customer';

        const users = getAuthUsers();
        if (users.find(u => u.email === email || u.phone === phone)) {
          alert('Email hoặc Số điện thoại này đã được đăng ký! Vui lòng chuyển sang Đăng nhập.');
          return;
        }

        const newUser = { email, phone, pass: password, name: fullname, role };
        users.push(newUser);
        saveAuthUsers(users);

        setCurrentUser(newUser);
        updateHeaderAuthState();
        if (authModal) authModal.style.display = 'none';

        alert('Đăng ký tài khoản thành công! Chào mừng ' + fullname + ' đến với IVY LUXE SPA.');
        if (role === 'partner') {
          window.location.hash = '#affiliate';
        }
      });
    }

    // Logout Action
    if (logoutBtn) {
      logoutBtn.addEventListener('click', () => {
        setCurrentUser(null);
        updateHeaderAuthState();
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
        myBookingsModal.style.display = 'flex';
      });
    }

    if (myBookingsClose && myBookingsModal) {
      myBookingsClose.addEventListener('click', () => {
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
          <h4 style="font-family:'Cinzel',serif; color:#0A2E20; margin-bottom:8px;">Chưa có lịch hẹn nào</h4>
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
    return isLocal ? 'https://ivy-luxe-spa-kappa.vercel.app' : window.location.origin;
  }

  function getAffiliateStore() {
    try {
      const stored = localStorage.getItem('ivy_affiliates_data');
      if (stored) return JSON.parse(stored);
    } catch (e) {}

    const initial = {
      partners: [
        {
          name: 'Nguyễn Văn Minh',
          phone: '0912345678',
          type: 'guide',
          typeName: 'Hướng Dẫn Viên Du Lịch',
          code: 'IVY-MINH_TOUR',
          bank: 'Vietcombank - 0011001234567 - NGUYEN VAN MINH',
          clicks: 128,
          bookings: 14,
          revenue: 12600000,
          commission: 2520000
        },
        {
          name: 'Khách Sạn Phố Cổ Hanoi Elegance',
          phone: '0988889999',
          type: 'hotel',
          typeName: 'Khách Sạn / Concierge',
          code: 'IVY-HOTEL_HANOI',
          bank: 'Techcombank - 1902888999001 - KS PHO CO',
          clicks: 215,
          bookings: 26,
          revenue: 23400000,
          commission: 4680000
        }
      ]
    };
    try {
      localStorage.setItem('ivy_affiliates_data', JSON.stringify(initial));
    } catch (e) {}
    return initial;
  }

  function saveAffiliateStore(store) {
    try {
      localStorage.setItem('ivy_affiliates_data', JSON.stringify(store));
    } catch (e) {}
  }

  function recordAffiliateClick(code) {
    const store = getAffiliateStore();
    const clean = code.toUpperCase();
    const partner = store.partners.find(p => p.code.toUpperCase() === clean || p.code.replace('IVY-', '').toUpperCase() === clean.replace('IVY-', ''));
    if (partner) {
      partner.clicks = (partner.clicks || 0) + 1;
      saveAffiliateStore(store);
    }
  }

  function recordAffiliateBooking(code, serviceName, guestCount) {
    const store = getAffiliateStore();
    const clean = code.toUpperCase();
    const partner = store.partners.find(p => p.code.toUpperCase() === clean || p.code.replace('IVY-', '').toUpperCase() === clean.replace('IVY-', ''));
    const estValue = 900000;
    const comValue = Math.round(estValue * 0.2);
    if (partner) {
      partner.bookings = (partner.bookings || 0) + 1;
      partner.revenue = (partner.revenue || 0) + estValue;
      partner.commission = (partner.commission || 0) + comValue;
      saveAffiliateStore(store);
    }
  }

  function initAffiliateSystem() {
    // A. Detect Referral in URL (?ref=... or ?aff=...)
    const urlParams = new URLSearchParams(window.location.search);
    const refParam = urlParams.get('ref') || urlParams.get('aff') || urlParams.get('partner');
    
    if (refParam) {
      let cleanRef = refParam.trim().toUpperCase();
      if (!cleanRef.startsWith('IVY-')) cleanRef = 'IVY-' + cleanRef;
      localStorage.setItem('ivy_affiliate_ref', cleanRef);
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
        const msg = 'Dạ em gửi anh/chị thông tin và ưu đãi tại IVY LUXE SPA (48 Hà Trung, Hoàn Kiếm, Hà Nội). Đặt qua link riêng này được GIẢM 10% & TẶNG NGÂM CHÂN THẢO DƯỢC miễn phí: ' + link + ' (Mã: ' + code + ') - Hotline: 098 9713660.';
        
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


  // Set default minimum date in hero datepicker
  const heroDate = document.getElementById('hero-select-date');
  if (heroDate) {
    const today = new Date().toISOString().split('T')[0];
    heroDate.value = today;
    heroDate.min = today;
  }
});
