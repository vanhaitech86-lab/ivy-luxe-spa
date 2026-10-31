// Nội dung "Chi tiết liệu trình" cho các dịch vụ trên bảng giá, lấy từ file IVY_LUXE_SPA_Noi_dung_dich_vu_Website.docx.
// Có bản tiếng Việt (vi) và tiếng Anh (en); các ngôn ngữ khác hiển thị bản tiếng Anh.
// Dịch vụ không có trong file Word sẽ mở thẳng form đặt lịch như trước.
(function (root) {
  const fmt = (n, lang) => (lang === 'vi' ? n.toLocaleString('vi-VN') + ' VNĐ' : n.toLocaleString('en-US') + ' VND');
  const dur = (m, lang) => (lang === 'vi' ? m + ' phút' : m + ' minutes');

  // ---------- Dịch vụ lẻ: mỗi mục có vi/en ----------
  // price: [[phút, giá], ...]; steps: danh sách [tiêu đề, mô tả]; care: đoạn "Nội dung chăm sóc"
  const SERVICES = {};

  // ===== 4 gói IVY SPECIAL COMBO =====
  SERVICES['combo-1'] = {
    vi: {
      title: 'IVY SPECIAL COMBO 1 · Chăm sóc toàn diện',
      sub: 'Thư giãn cơ thể, nâng niu mái tóc và làm mới làn da trong 90 phút',
      intro: [
        'Giữa những ngày khám phá Hà Nội, một khoảng nghỉ được chăm sóc chu đáo có thể khiến cả hành trình dễ chịu hơn. IVY SPECIAL COMBO 1 kết hợp massage cơ thể, gội đầu dưỡng sinh và chăm sóc da mặt trong 90 phút, phù hợp khi bạn muốn thư giãn nhưng vẫn dành thời gian cho những kế hoạch tiếp theo.',
        'Bạn được lựa chọn phương pháp massage yêu thích để thả lỏng cơ thể, sau đó tận hưởng cảm giác sạch thoáng của mái tóc và sự mềm mại của làn da. Các bước chăm sóc nối tiếp nhẹ nhàng, mang đến một trải nghiệm gọn trong một lần ghé spa.'
      ],
      stepsTitle: 'Liệu trình bao gồm:',
      steps: [
        ['Massage cơ thể – 30 phút', 'Lựa chọn massage tinh dầu (Aroma), massage Thái, massage chuyên sâu (Deep Tissue) hoặc massage đá nóng.'],
        ['Gội đầu dưỡng sinh – 30 phút', 'Làm sạch tóc và da đầu, kết hợp massage thư giãn.'],
        ['Chăm sóc da mặt và vệ sinh tai – 30 phút', 'Làm sạch, tẩy tế bào chết, massage, đắp mặt nạ và dưỡng ẩm cho da; kết hợp vệ sinh tai.'],
        ['Tặng kèm', 'Ngâm chân thảo dược miễn phí.']
      ],
      meta: ['Thời lượng: 90 phút, chưa bao gồm thời gian ngâm chân tặng kèm.'],
      price: 'Giá trọn gói: 800.000 VNĐ',
      closing: 'Chọn Combo 1 nếu bạn muốn kết hợp massage, gội đầu và chăm sóc da mặt trong cùng một buổi. Đặt lịch trước để lựa chọn khung giờ phù hợp với hành trình của bạn.'
    },
    en: {
      title: 'IVY SPECIAL COMBO 1 · Complete Care',
      sub: 'Relax your body, pamper your hair and refresh your skin in 90 minutes',
      intro: [
        'Between days of exploring Hanoi, a well-cared-for pause can make the whole journey more enjoyable. IVY SPECIAL COMBO 1 combines a body massage, a nourishing hair wash and a facial in 90 minutes, ideal when you want to unwind but still keep time for your next plans.',
        'Choose your favourite massage style to release tension, then enjoy fresh, clean hair and soft, refreshed skin. The steps flow gently one into the next, giving you a complete experience in a single visit.'
      ],
      stepsTitle: 'The treatment includes:',
      steps: [
        ['Body massage – 30 minutes', 'Choose aromatherapy (Aroma), Thai, Deep Tissue or hot stone massage.'],
        ['Nourishing hair wash – 30 minutes', 'Cleanses hair and scalp, with a relaxing massage.'],
        ['Facial and ear cleaning – 30 minutes', 'Cleansing, exfoliation, massage, mask and moisturising for the skin, together with ear cleaning.'],
        ['Complimentary', 'Free herbal foot soak.']
      ],
      meta: ['Duration: 90 minutes, not including the complimentary foot soak.'],
      price: 'Package price: 800,000 VND',
      closing: 'Choose Combo 1 if you want a massage, hair wash and facial in one session. Book ahead to secure a time that suits your itinerary.'
    }
  };
  SERVICES['combo-2'] = {
    vi: {
      title: 'IVY SPECIAL COMBO 2 · Chăm sóc đôi chân',
      sub: 'Nâng niu đôi chân, tiếp nối hành trình nhẹ nhàng',
      intro: [
        'Những con phố nhỏ, các điểm tham quan và những giờ dạo bộ có thể khiến đôi chân cần một khoảng nghỉ. IVY SPECIAL COMBO 2 tại IVY LUXE SPA dành riêng cho nhu cầu ấy: thư giãn bàn chân và bắp chân, làm mịn vùng da khô ráp và bổ sung độ ẩm.',
        'Trải nghiệm mở đầu với ngâm chân thảo dược trong nước ấm. Tiếp nối là massage chân bấm huyệt với lực phù hợp, tẩy tế bào chết và ủ mặt nạ dưỡng ẩm. Bạn vừa được nghỉ ngơi, vừa chăm chút đôi chân để thoải mái tiếp tục khám phá Hà Nội.'
      ],
      stepsTitle: 'Liệu trình bao gồm:',
      steps: [
        ['Ngâm chân thảo dược', 'Tặng kèm miễn phí.'],
        ['Massage chân bấm huyệt – 30 phút', 'Chăm sóc bàn chân và bắp chân với lực massage phù hợp.'],
        ['Tẩy tế bào chết chân – 30 phút', 'Nhẹ nhàng làm sạch lớp tế bào chết, chú trọng những vùng da khô ráp.'],
        ['Ủ mặt nạ dưỡng ẩm chân – 10 phút', 'Bổ sung độ ẩm, giúp da chân mềm mại hơn.']
      ],
      meta: ['Thời lượng: 70 phút, chưa bao gồm thời gian ngâm chân tặng kèm.'],
      price: 'Giá trọn gói: 450.000 VNĐ',
      closing: 'Phù hợp sau một ngày đi bộ nhiều hoặc khi bạn muốn kết hợp massage chân với chăm sóc da chân. Vui lòng đặt lịch để được xác nhận khung giờ.'
    },
    en: {
      title: 'IVY SPECIAL COMBO 2 · Foot Care',
      sub: 'Pamper your feet and carry on your journey with ease',
      intro: [
        'Narrow streets, sights and hours of walking can leave your feet in need of a rest. IVY SPECIAL COMBO 2 at IVY LUXE SPA is made for exactly that: it relaxes the feet and calves, smooths rough skin and restores moisture.',
        'The experience begins with a herbal foot soak in warm water, followed by an acupressure foot massage with suitable pressure, an exfoliation and a moisturising mask. You get to rest and care for your feet so you can keep exploring Hanoi comfortably.'
      ],
      stepsTitle: 'The treatment includes:',
      steps: [
        ['Herbal foot soak', 'Complimentary.'],
        ['Acupressure foot massage – 30 minutes', 'Cares for the feet and calves with suitable massage pressure.'],
        ['Foot exfoliation – 30 minutes', 'Gently removes dead skin, focusing on dry, rough areas.'],
        ['Moisturising foot mask – 10 minutes', 'Restores moisture and leaves the skin of your feet softer.']
      ],
      meta: ['Duration: 70 minutes, not including the complimentary foot soak.'],
      price: 'Package price: 450,000 VND',
      closing: 'Perfect after a long day on foot, or when you want to combine a foot massage with foot skin care. Please book to confirm your time slot.'
    }
  };
  SERVICES['combo-3'] = {
    vi: {
      title: 'IVY SPECIAL COMBO 3 · Massage, tẩy tế bào chết và chăm sóc da mặt',
      sub: 'Thả lỏng cơ thể, chăm chút làn da',
      intro: [
        'Khi cơ thể cần nghỉ ngơi và làn da cũng cần được chăm chút, IVY SPECIAL COMBO 3 mang đến một lựa chọn kết hợp trong hai giờ. Liệu trình gồm massage toàn thân, tẩy tế bào chết cơ thể và chăm sóc da mặt, phù hợp sau những ngày di chuyển hoặc hoạt động ngoài trời.',
        'Massage giúp bạn thả lỏng những vùng căng mỏi; bước tẩy tế bào chết làm sạch bề mặt da; phần chăm sóc da mặt kết hợp vệ sinh tai hoàn thiện trải nghiệm. Đây là khoảng thời gian để bạn nằm xuống, nghỉ ngơi và để từng bước chăm sóc diễn ra nhẹ nhàng.'
      ],
      stepsTitle: 'Liệu trình bao gồm:',
      steps: [
        ['Massage toàn thân – 45 phút', 'Thư giãn các vùng cơ với lực massage được điều chỉnh theo cảm nhận của bạn.'],
        ['Tẩy tế bào chết cơ thể – 30 phút', 'Làm sạch lớp tế bào chết, giúp bề mặt da mềm và mịn hơn.'],
        ['Chăm sóc da mặt và vệ sinh tai – 45 phút', 'Làm sạch, tẩy tế bào chết phù hợp, massage, đắp mặt nạ và dưỡng ẩm; kết hợp vệ sinh tai.'],
        ['Tặng kèm', 'Ngâm chân thảo dược miễn phí.']
      ],
      meta: ['Thời lượng: 120 phút, chưa bao gồm thời gian ngâm chân tặng kèm.'],
      price: 'Giá trọn gói: 1.000.000 VNĐ',
      closing: 'Chọn Combo 3 khi bạn muốn dành nhiều thời gian hơn cho cơ thể và làn da. Liên hệ IVY LUXE SPA để được tư vấn khung giờ thuận tiện.'
    },
    en: {
      title: 'IVY SPECIAL COMBO 3 · Massage, Body Scrub and Facial',
      sub: 'Release your body, care for your skin',
      intro: [
        'When your body needs rest and your skin needs attention, IVY SPECIAL COMBO 3 offers a combined two-hour choice. The treatment includes a full body massage, a body exfoliation and a facial, ideal after days of travelling or outdoor activities.',
        'The massage releases tense areas; the exfoliation cleanses the skin surface; the facial, together with ear cleaning, completes the experience. It is time to lie back, rest and let each step of care unfold gently.'
      ],
      stepsTitle: 'The treatment includes:',
      steps: [
        ['Full body massage – 45 minutes', 'Relaxes the muscles with pressure adjusted to your preference.'],
        ['Body exfoliation – 30 minutes', 'Removes dead skin cells, leaving the skin softer and smoother.'],
        ['Facial and ear cleaning – 45 minutes', 'Cleansing, suitable exfoliation, massage, mask and moisturising, together with ear cleaning.'],
        ['Complimentary', 'Free herbal foot soak.']
      ],
      meta: ['Duration: 120 minutes, not including the complimentary foot soak.'],
      price: 'Package price: 1,000,000 VND',
      closing: 'Choose Combo 3 when you want to spend more time on your body and skin. Contact IVY LUXE SPA for advice on a convenient time slot.'
    }
  };
  SERVICES['combo-4'] = {
    vi: {
      title: 'IVY SPECIAL COMBO 4 · Chăm sóc từ cơ thể đến mái tóc và làn da',
      sub: '150 phút dành riêng cho sự thư thái của bạn',
      intro: [
        'Dành 150 phút rời xa nhịp phố để tận hưởng một buổi chăm sóc từ cơ thể đến mái tóc và làn da. IVY SPECIAL COMBO 4 kết hợp massage, tẩy tế bào chết cơ thể, gội đầu dưỡng sinh và chăm sóc da mặt chuyên sâu, giúp bạn thu gọn nhiều nhu cầu chăm sóc trong một lần ghé spa.',
        'Bạn có thể lựa chọn gói này cho một buổi chiều nghỉ ngơi trong chuyến đi Hà Nội hoặc đơn giản là khi muốn dành thời gian cho bản thân. Các phần chăm sóc được kết hợp để cơ thể thư giãn, mái tóc sạch thoáng và làn da được nâng niu.'
      ],
      stepsTitle: 'Liệu trình bao gồm:',
      steps: [
        ['Massage toàn thân – 30 phút', 'Giúp thả lỏng cơ thể và xoa dịu cảm giác căng mỏi.'],
        ['Tẩy tế bào chết cơ thể – 30 phút', 'Nhẹ nhàng làm sạch bề mặt da, giúp da mịn màng hơn.'],
        ['Gội đầu dưỡng sinh và vệ sinh tai – 45 phút', 'Làm sạch tóc, da đầu, kết hợp massage thư giãn và vệ sinh tai.'],
        ['Chăm sóc da mặt chuyên sâu – 45 phút', 'Làm sạch, tẩy tế bào chết phù hợp, massage, đắp mặt nạ và bổ sung dưỡng chất theo nhu cầu làn da.'],
        ['Tặng kèm', 'Ngâm chân thảo dược miễn phí.']
      ],
      meta: ['Thời lượng: 150 phút, chưa bao gồm thời gian ngâm chân tặng kèm.'],
      price: 'Giá trọn gói: 1.400.000 VNĐ',
      closing: 'Đặt lịch Combo 4 để dành một khoảng nghỉ dài cho bản thân. Nếu có lịch di chuyển tiếp theo, vui lòng trao đổi giờ cần hoàn tất khi đặt hẹn.'
    },
    en: {
      title: 'IVY SPECIAL COMBO 4 · Care from Body to Hair and Skin',
      sub: '150 minutes devoted to your relaxation',
      intro: [
        'Step away from the rhythm of the street for 150 minutes and enjoy care from head to toe. IVY SPECIAL COMBO 4 combines a massage, body exfoliation, nourishing hair wash and an intensive facial, bringing many care needs together in a single visit.',
        'Choose this package for a restful afternoon during your Hanoi trip, or simply when you want time for yourself. The treatments work together so your body relaxes, your hair feels fresh and your skin is pampered.'
      ],
      stepsTitle: 'The treatment includes:',
      steps: [
        ['Full body massage – 30 minutes', 'Releases the body and eases tension.'],
        ['Body exfoliation – 30 minutes', 'Gently cleanses the skin surface, leaving it smoother.'],
        ['Nourishing hair wash and ear cleaning – 45 minutes', 'Cleanses hair and scalp, with a relaxing massage and ear cleaning.'],
        ['Intensive facial – 45 minutes', 'Cleansing, suitable exfoliation, massage, mask and nourishing care to suit your skin.'],
        ['Complimentary', 'Free herbal foot soak.']
      ],
      meta: ['Duration: 150 minutes, not including the complimentary foot soak.'],
      price: 'Package price: 1,400,000 VND',
      closing: 'Book Combo 4 for a long break for yourself. If you have plans afterwards, please tell us the time you need to finish when booking.'
    }
  };

  // ===== Dịch vụ có bảng thời lượng - giá (massage, chân) =====
  // Hàm tạo mục: s(vi{title, subTitleEn, intro, care}, en{...}, bảng, ghi chú)
  const timed = (viTitle, enTitle, viIntro, enIntro, viCare, enCare, rows, opts) => {
    opts = opts || {};
    const mk = (lang, title, intro, care) => ({
      title: title,
      intro: [intro],
      care: care,
      table: {
        head: lang === 'vi' ? [opts.totalLabelVi || 'Thời lượng', 'Giá'] : [opts.totalLabelEn || 'Duration', 'Price'],
        rows: rows.map((r) => [dur(r[0], lang), fmt(r[1], lang)])
      },
      notes: lang === 'vi' ? (opts.notesVi || []) : (opts.notesEn || [])
    });
    return { vi: mk('vi', viTitle, viIntro, viCare), en: mk('en', enTitle, enIntro, enCare) };
  };
  const NOTE_BOOK_VI = 'Đặt lịch trước để được xác nhận khung giờ phù hợp với hành trình của bạn.';
  const NOTE_BOOK_EN = 'Book ahead to confirm a time slot that suits your itinerary.';

  SERVICES['mass-ivy-special'] = timed(
    'Massage đặc trưng Ivy · Ivy Special Body Massage', 'Ivy Special Body Massage',
    'Nếu bạn yêu thích massage nhẹ nhàng nhưng vẫn muốn cảm nhận hơi ấm dễ chịu trên lưng, Ivy Special là lựa chọn đáng cân nhắc. Liệu trình đặc trưng của IVY LUXE SPA kết hợp các động tác xoa, vuốt và day ấn êm ái với đá ấm trên lưng, phù hợp khi bạn cần nghỉ ngơi sau chuyến đi hoặc một ngày bận rộn.',
    'If you enjoy a gentle massage but still want a pleasant warmth on your back, Ivy Special is worth considering. IVY LUXE SPA\'s signature treatment combines soft stroking, gliding and kneading with warm stones on the back, ideal when you need a rest after a trip or a busy day.',
    'Massage lưng, vai, tay và chân với lực nhẹ; chú trọng những vùng cần thư giãn theo yêu cầu; kết hợp đá ấm trên lưng; kết thúc bằng các động tác thả lỏng. Hãy trao đổi cảm nhận để kỹ thuật viên điều chỉnh lực phù hợp.',
    'Massage of the back, shoulders, arms and legs with light pressure; extra attention to areas you want to relax; warm stones on the back; finished with relaxing strokes. Tell your therapist how it feels so the pressure can be adjusted.',
    [[60, 470000], [75, 580000], [90, 680000], [120, 900000]],
    { notesVi: ['Đây là dịch vụ massage cơ thể riêng, khác với các gói IVY SPECIAL COMBO.'], notesEn: ['This is a standalone body massage, separate from the IVY SPECIAL COMBO packages.'] }
  );
  SERVICES['mass-vietnam'] = timed(
    'Massage Việt Nam · Vietnamese Body Massage', 'Vietnamese Body Massage',
    'Massage Việt Nam phù hợp với khách muốn cảm nhận lực xoa bóp vừa phải, rõ hơn những động tác vuốt nhẹ. Các thao tác day, ấn và xoa bóp được kết hợp tại những vùng cơ thể thường căng mỏi sau thời gian ngồi lâu, mang hành lý hoặc di chuyển nhiều.',
    'Vietnamese massage suits guests who want a moderate pressure that is firmer than light stroking. Kneading, pressing and rubbing are combined on areas that often feel tense after sitting for long, carrying luggage or travelling a lot.',
    'Massage lưng, vai, tay và chân với lực vừa; kết hợp day ấn tại vùng cần chú trọng; hoàn thiện bằng các động tác thả lỏng. Kỹ thuật viên điều chỉnh mức lực theo sự thoải mái của bạn trong suốt liệu trình.',
    'Massage of the back, shoulders, arms and legs with medium pressure; pressing on areas that need attention; finished with relaxing strokes. Your therapist adjusts the pressure to your comfort throughout.',
    [[60, 550000], [75, 650000], [90, 800000], [120, 980000]]
  );
  SERVICES['mass-aroma'] = timed(
    'Massage tinh dầu · Aroma Massage', 'Aroma Massage',
    'Hương thơm dễ chịu và những động tác massage mềm mại tạo nên khoảng nghỉ nhẹ nhàng giữa lịch trình bận rộn. Aroma Massage phù hợp khi bạn muốn tận hưởng cảm giác êm ái, thư giãn toàn thân và dành thời gian nghỉ ngơi sau một ngày khám phá Phố Cổ Hà Nội.',
    'Pleasant fragrance and soft massage movements create a gentle pause in a busy schedule. Aroma Massage is ideal when you want a soothing, full-body relaxation after a day exploring the Hanoi Old Quarter.',
    'Thoa dầu massage; xoa vuốt và day cơ tại lưng, vai, tay và chân với lực nhẹ; điều chỉnh theo yêu cầu; kết thúc bằng các động tác thư giãn. Vui lòng trao đổi trước nếu bạn nhạy cảm với hương thơm.',
    'Massage oil is applied; stroking and kneading of the back, shoulders, arms and legs with light pressure, adjusted on request; finished with relaxing movements. Please tell us beforehand if you are sensitive to fragrance.',
    [[60, 480000], [75, 600000], [90, 700000], [120, 850000]]
  );
  SERVICES['mass-thai-brochure'] = timed(
    'Massage Thái · Thai Massage', 'Thai Massage',
    'Nếu bạn yêu thích lực massage mạnh và cảm giác cơ thể được kéo giãn, massage Thái là một lựa chọn phù hợp. Liệu trình kết hợp day ấn với những động tác kéo giãn có hỗ trợ, được điều chỉnh theo khả năng vận động và cảm nhận của bạn. Có thể lựa chọn thực hiện với dầu hoặc không dầu.',
    'If you like firm massage pressure and the feeling of being stretched, Thai massage is a good choice. The treatment combines pressing with assisted stretching, adjusted to your mobility and comfort. It can be done with or without oil.',
    'Day ấn vùng chân, lưng và vai với lực mạnh được điều chỉnh theo yêu cầu; kết hợp kéo giãn và vận động khớp có hỗ trợ trong phạm vi thoải mái; kết thúc bằng các động tác thả lỏng. Hãy thông báo vùng cần tránh trước khi bắt đầu.',
    'Firm pressing of the legs, back and shoulders, adjusted on request; assisted stretching and joint movement within a comfortable range; finished with relaxing movements. Please tell us any areas to avoid before starting.',
    [[60, 600000], [75, 750000], [90, 850000], [120, 1050000]]
  );
  SERVICES['mass-1'] = timed(
    'Massage đá nóng · Hot Stone Massage', 'Hot Stone Massage',
    'Hơi ấm từ đá cùng nhịp massage chậm rãi giúp bạn dần thả lỏng và tận hưởng sự yên tĩnh. Hot Stone Massage phù hợp với khách yêu thích cảm giác ấm áp, muốn nằm nghỉ sau một hành trình dài hoặc dành thêm thời gian chăm sóc cơ thể.',
    'The warmth of the stones and a slow massage rhythm help you gradually unwind and enjoy the calm. Hot Stone Massage suits guests who love a warm sensation, want to rest after a long journey or spend extra time caring for their body.',
    'Massage cơ thể bằng dầu, kết hợp đá ấm tại các vùng được chăm sóc; điều chỉnh nhiệt độ và lực theo cảm nhận; hoàn thiện bằng các động tác nhẹ nhàng. Hãy báo ngay nếu bạn muốn giảm độ ấm hoặc thay đổi lực massage.',
    'Oil body massage with warm stones on the areas being cared for; temperature and pressure adjusted to your comfort; finished with gentle movements. Tell us right away if you want less warmth or a different pressure.',
    [[75, 620000], [90, 700000], [120, 950000]]
  );
  SERVICES['mass-shiatsu-brochure'] = timed(
    'Massage Shiatsu · Shiatsu Massage', 'Shiatsu Massage',
    'Shiatsu dành cho khách yêu thích các động tác day ấn có nhịp, tập trung vào cảm giác tác động tại từng vùng cơ thể. Kỹ thuật sử dụng ngón tay và lòng bàn tay giúp tạo nên trải nghiệm khác với massage thiên về xoa vuốt, để bạn có thêm lựa chọn phù hợp sở thích.',
    'Shiatsu is for guests who enjoy rhythmic pressing, focusing on the sensation in each area of the body. Using the fingers and palms, it offers an experience different from stroking-based massage, giving you another option to suit your taste.',
    'Day ấn tại lưng, vai, tay và chân; điều chỉnh lực theo cảm nhận; kết hợp các động tác thả lỏng nhẹ nhàng. Bạn có thể trao đổi vùng cần chú trọng trước và trong khi thực hiện.',
    'Pressing of the back, shoulders, arms and legs; pressure adjusted to your comfort; combined with gentle relaxing movements. You can tell us which areas to focus on before and during the treatment.',
    [[60, 470000], [75, 580000], [90, 680000], [120, 900000]]
  );
  SERVICES['mass-back-brochure'] = timed(
    'Massage lưng, đầu và vai · Back, Head & Shoulder Massage', 'Back, Head & Shoulder Massage',
    'Sau nhiều giờ ngồi trên máy bay, làm việc với máy tính hoặc mang hành lý, vùng lưng và vai thường là nơi bạn muốn được chăm sóc trước tiên. Liệu trình tập trung vào lưng, vai, cổ gáy và đầu, phù hợp khi bạn muốn thư giãn đúng vùng đang khó chịu hoặc chỉ có một khoảng nghỉ ngắn.',
    'After hours on a plane, at a computer or carrying luggage, the back and shoulders are often where you want care first. The treatment focuses on the back, shoulders, neck and head, ideal when you want to relax exactly where it feels uncomfortable or only have a short break.',
    'Xoa bóp vùng lưng và vai, day ấn cổ gáy với lực phù hợp, massage đầu nhẹ nhàng. Lựa chọn thời lượng theo lịch trình và trao đổi với kỹ thuật viên về vùng bạn muốn ưu tiên.',
    'Massage of the back and shoulders, pressing of the neck with suitable pressure, and gentle head massage. Choose the duration to suit your schedule and tell your therapist which areas to prioritise.',
    [[30, 250000], [45, 350000], [60, 470000], [75, 550000], [90, 650000]]
  );
  SERVICES['mass-4'] = timed(
    'Massage bốn tay · Four-Hand Massage', 'Four-Hand Massage',
    'Hai kỹ thuật viên cùng phối hợp trong một liệu trình, mang đến cảm giác chăm sóc liền mạch trên cơ thể. Massage bốn tay phù hợp khi bạn muốn thử một trải nghiệm khác biệt, chú trọng sự đồng đều của nhịp massage và cảm giác được nâng niu trong từng động tác.',
    'Two therapists work together in one treatment, giving a seamless feeling of care across the body. Four-hand massage suits you if you want to try something different, with an even massage rhythm and the sense of being pampered in every movement.',
    'Trao đổi mức lực mong muốn; hai kỹ thuật viên thực hiện massage phối hợp tại các vùng cơ thể; điều chỉnh nhịp và lực để duy trì sự thoải mái trong suốt buổi chăm sóc.',
    'Tell us your preferred pressure; two therapists massage in coordination across the body; rhythm and pressure are adjusted to keep you comfortable throughout.',
    [[60, 1000000], [90, 1450000], [120, 1900000]]
  );
  SERVICES['foot-vn-brochure'] = timed(
    'Massage chân Việt Nam · Vietnamese Foot Massage', 'Vietnamese Foot Massage',
    'Sau những giờ đi bộ qua các con phố Hà Nội, hãy để đôi chân được nghỉ ngơi với massage chân Việt Nam. Liệu trình sử dụng lực vừa phải tại bàn chân, cổ chân và bắp chân, phù hợp khi bạn muốn xoa dịu cảm giác mỏi mà vẫn giữ trải nghiệm dễ chịu.',
    'After hours of walking through the streets of Hanoi, let your feet rest with a Vietnamese foot massage. The treatment uses moderate pressure on the feet, ankles and calves, ideal when you want to ease tired legs while keeping the experience comfortable.',
    'Xoa bóp bàn chân và gót chân, day ấn lòng bàn chân với lực vừa, massage cổ chân và bắp chân; kết thúc bằng các động tác vuốt nhẹ. Bạn có thể chọn từ 30 đến 75 phút theo thời gian sẵn có.',
    'Massage of the feet and heels, medium-pressure pressing of the soles, massage of the ankles and calves; finished with gentle strokes. Choose from 30 to 75 minutes depending on your time.',
    [[30, 200000], [45, 300000], [60, 380000], [75, 450000]]
  );
  SERVICES['foot-thai-brochure'] = timed(
    'Massage chân Thái · Thai Foot Massage', 'Thai Foot Massage',
    'Massage chân Thái dành cho khách thích lực day ấn mạnh hơn và muốn tập trung chăm sóc đôi chân sau thời gian di chuyển nhiều. Các thao tác được kết hợp tại bàn chân và bắp chân, với mức lực điều chỉnh theo sự thoải mái của bạn.',
    'Thai foot massage is for guests who like firmer pressing and want to focus on their feet after a lot of travel. The movements are combined on the feet and calves, with pressure adjusted to your comfort.',
    'Massage bàn chân, lòng bàn chân và cổ chân với lực mạnh; kết hợp day ấn và massage bắp chân; kết thúc bằng các động tác thả lỏng. Hãy thông báo nếu bạn muốn giảm lực tại một vùng cụ thể.',
    'Firm massage of the feet, soles and ankles; pressing combined with calf massage; finished with relaxing movements. Tell us if you want less pressure on a specific area.',
    [[30, 250000], [45, 350000], [60, 490000], [75, 550000]]
  );
  SERVICES['foot-spa-brochure'] = timed(
    'Chăm sóc chân kết hợp tẩy tế bào chết · Foot Spa', 'Foot Spa',
    'Khi đôi chân vừa mỏi vừa có vùng da khô ráp, Foot Spa giúp kết hợp thư giãn và làm mịn da trong một buổi. Liệu trình gồm chà gót, tẩy tế bào chết bằng hạt cà phê tự nhiên và massage chân, phù hợp sau những ngày đi bộ nhiều hoặc trước khi bạn muốn diện một đôi sandal.',
    'When your feet are both tired and rough in places, Foot Spa combines relaxation and skin smoothing in one session. The treatment includes heel scrubbing, exfoliation with natural coffee grounds and a foot massage, ideal after days of walking or before wearing a pair of sandals.',
    'Chà gót và chú trọng vùng da thô ráp; tẩy tế bào chết vùng chân bằng hạt cà phê tự nhiên; làm sạch sản phẩm; massage bàn chân và bắp chân. Tổng thời gian đã bao gồm các bước tẩy tế bào chết và massage.',
    'Heel scrubbing with attention to rough skin; foot exfoliation with natural coffee grounds; product rinsed off; massage of the feet and calves. The total time includes both the exfoliation and the massage.',
    [[60, 420000], [75, 520000]],
    { totalLabelVi: 'Tổng thời lượng', totalLabelEn: 'Total duration', notesVi: ['Thời lượng trên bao gồm cả tẩy tế bào chết và massage.'], notesEn: ['The duration above includes both exfoliation and massage.'] }
  );
  SERVICES['foot-ivy-coconut-brochure'] = {
    vi: {
      title: 'Chăm sóc chân chuyên biệt Ivy · Ivy Foot Spa',
      intro: ['Dành thêm sự chăm chút cho đôi chân với Ivy Foot Spa, liệu trình kết hợp chà gót, tẩy tế bào chết cà phê, massage và mặt nạ dừa. Đây là lựa chọn dành cho khách muốn chăm sóc kỹ bề mặt da bên cạnh cảm giác thư giãn, đặc biệt khi gót chân khô ráp và da chân thiếu ẩm.'],
      stepsTitle: 'Nội dung chăm sóc:',
      steps: [['', 'Chà gót chân và chú trọng vùng da khô ráp.'], ['', 'Tẩy tế bào chết bằng hạt cà phê tự nhiên, sau đó làm sạch sản phẩm.'], ['', 'Massage bàn chân và bắp chân.'], ['', 'Đắp mặt nạ dừa, giúp bổ sung độ ẩm và làm mềm da.']],
      price: 'Giá: 700.000 VNĐ',
      meta: ['Thời lượng: Vui lòng liên hệ spa để được xác nhận khi đặt lịch.']
    },
    en: {
      title: 'Ivy Foot Spa',
      intro: ['Give your feet extra care with Ivy Foot Spa, a treatment combining heel scrubbing, coffee exfoliation, massage and a coconut mask. It is for guests who want careful skin care along with relaxation, especially when heels are rough and the skin of the feet lacks moisture.'],
      stepsTitle: 'The treatment includes:',
      steps: [['', 'Heel scrubbing, with attention to dry, rough areas.'], ['', 'Exfoliation with natural coffee grounds, then the product is rinsed off.'], ['', 'Massage of the feet and calves.'], ['', 'A coconut mask to add moisture and soften the skin.']],
      price: 'Price: 700,000 VND',
      meta: ['Duration: please contact the spa to confirm when booking.']
    }
  };

  // ===== Chăm sóc da mặt & cơ thể: các bước + thời lượng + giá =====
  const single = (viTitle, enTitle, viIntro, enIntro, viStepsTitle, enStepsTitle, viSteps, enSteps, minutes, price, viNote, enNote) => ({
    vi: { title: viTitle, intro: [viIntro], care: viSteps, careLabel: viStepsTitle, meta: [minutes ? 'Thời lượng: ' + minutes + ' phút' : ''], price: 'Giá: ' + fmt(price, 'vi'), notes: viNote ? [viNote] : [] },
    en: { title: enTitle, intro: [enIntro], care: enSteps, careLabel: enStepsTitle, meta: [minutes ? 'Duration: ' + minutes + ' minutes' : ''], price: 'Price: ' + fmt(price, 'en'), notes: enNote ? [enNote] : [] }
  });
  SERVICES['facial-basic-care'] = single(
    'Chăm sóc da mặt cơ bản · Basic Facial Care', 'Basic Facial Care',
    'Làn da cũng cần một khoảng nghỉ sau những ngày di chuyển, tiếp xúc bụi đường hoặc thay đổi sinh hoạt. Chăm sóc da mặt cơ bản tập trung làm sạch, massage và dưỡng ẩm, phù hợp khi bạn muốn làn da được chăm chút mà vẫn dành phần lớn thời gian cho lịch trình du lịch.',
    'Your skin also needs a rest after days of travel, street dust or a change of routine. The basic facial focuses on cleansing, massage and moisturising, ideal when you want your skin cared for while keeping most of your time for sightseeing.',
    'Các bước chăm sóc:', 'Care steps:',
    'Tẩy trang và rửa mặt; tẩy tế bào chết phù hợp; massage mặt nhẹ nhàng; đắp mặt nạ; dưỡng ẩm hoàn thiện. Các thao tác được lựa chọn theo tình trạng da thực tế.',
    'Makeup removal and cleansing; suitable exfoliation; gentle facial massage; mask; finishing moisturiser. Steps are chosen according to the actual condition of your skin.',
    60, 450000);
  SERVICES['facial-whitening-moisture'] = single(
    'Chăm sóc da sáng khỏe và cấp ẩm · Brightening & Hydrating Facial', 'Brightening & Hydrating Facial',
    'Nếu làn da trông kém tươi tắn hoặc có cảm giác thiếu ẩm sau những chuyến đi, liệu trình dưỡng sáng và cấp ẩm mang đến một lựa chọn chăm sóc nhẹ nhàng. Làm sạch kết hợp sản phẩm dưỡng phù hợp giúp da mềm mại hơn và vẻ ngoài tươi mới trước những kế hoạch tiếp theo.',
    'If your skin looks dull or feels dry after travelling, the brightening and hydrating treatment offers gentle care. Cleansing combined with suitable skincare products helps the skin feel softer and look fresher before your next plans.',
    'Các bước chăm sóc:', 'Care steps:',
    'Tẩy trang, rửa mặt và tẩy tế bào chết phù hợp; massage; sử dụng sản phẩm dưỡng sáng và cấp ẩm; đắp mặt nạ; dưỡng ẩm hoàn thiện.',
    'Makeup removal, cleansing and suitable exfoliation; massage; brightening and hydrating products; mask; finishing moisturiser.',
    60, 550000);
  SERVICES['facial-acnes-care'] = single(
    'Chăm sóc da mụn · Acne-Prone Skin Facial', 'Acne-Prone Skin Facial',
    'Làn da dễ nổi mụn cần được chăm sóc theo tình trạng thực tế thay vì áp dụng cùng một quy trình cho mọi khách. Liệu trình tại IVY LUXE SPA chú trọng làm sạch, chăm sóc vùng bít tắc và làm dịu da, để bạn hiểu rõ những bước sẽ thực hiện trước khi bắt đầu.',
    'Acne-prone skin needs care based on its actual condition rather than the same routine for every guest. The treatment at IVY LUXE SPA focuses on cleansing, caring for congested areas and soothing the skin, so you know the steps before starting.',
    'Các bước chăm sóc:', 'Care steps:',
    'Trao đổi và kiểm tra tình trạng da; tẩy trang, làm sạch; chăm sóc vùng bít tắc phù hợp; đắp mặt nạ làm dịu; dưỡng ẩm. Kỹ thuật viên trao đổi trước về những thao tác phù hợp với làn da của bạn.',
    'Discussion and check of your skin condition; makeup removal and cleansing; suitable care of congested areas; soothing mask; moisturising. Your therapist explains beforehand which steps suit your skin.',
    90, 700000,
    'Việc lấy nhân mụn, nếu phù hợp, cần được tư vấn và thống nhất trước khi thực hiện.',
    'Extraction of blemishes, if appropriate, must be discussed and agreed before it is done.');
  SERVICES['facial-anti-aging-collagen'] = single(
    'Chăm sóc da chống lão hóa với mặt nạ collagen · Anti-Aging Collagen Facial', 'Anti-Aging Collagen Facial',
    'Dành cho làn da khô hoặc kém tươi tắn một buổi chăm sóc với massage và mặt nạ collagen. Liệu trình tập trung dưỡng ẩm, giúp bề mặt da mềm mại và mang lại vẻ ngoài được chăm chút, đồng thời cho bạn thời gian nghỉ ngơi trong không gian spa.',
    'For dry or dull skin, a treatment with massage and a collagen mask. It focuses on moisturising, leaving the skin surface soft and well cared for, while giving you time to rest in the spa.',
    'Các bước chăm sóc:', 'Care steps:',
    'Tẩy trang, rửa mặt và tẩy tế bào chết phù hợp; massage mặt; sử dụng sản phẩm dưỡng da; đắp mặt nạ collagen; dưỡng ẩm hoàn thiện.',
    'Makeup removal, cleansing and suitable exfoliation; facial massage; skincare products; collagen mask; finishing moisturiser.',
    90, 900000);
  SERVICES['body-scrub-coffee-salt'] = single(
    'Tẩy tế bào chết cơ thể bằng muối cà phê · Coffee Salt Body Scrub', 'Coffee Salt Body Scrub',
    'Làm mới cảm giác trên làn da với bước tẩy tế bào chết cơ thể bằng muối cà phê. Những thao tác massage nhẹ nhàng giúp loại bỏ lớp tế bào chết trên bề mặt, phù hợp khi da có cảm giác thô ráp hoặc bạn muốn bổ sung một bước chăm sóc cơ thể vào buổi ghé spa.',
    'Refresh the feel of your skin with a coffee salt body scrub. Gentle massage movements remove dead skin from the surface, ideal when the skin feels rough or you want to add a body-care step to your spa visit.',
    'Nội dung chăm sóc:', 'The treatment includes:',
    'Thoa sản phẩm muối cà phê lên cơ thể; massage tẩy tế bào chết với lực phù hợp, chú trọng vùng da cần làm mịn; làm sạch sản phẩm sau khi hoàn tất.',
    'Coffee salt product is applied to the body; exfoliating massage with suitable pressure, focusing on areas that need smoothing; the product is rinsed off afterwards.',
    30, 350000);
  SERVICES['body-scrub-coffee-massage'] = {
    vi: { title: 'Tẩy tế bào chết muối cà phê kết hợp massage · Coffee Salt Body Scrub & Massage', intro: ['Một giờ dành cho cả làn da và cơ thể: làm mịn bề mặt da bằng muối cà phê, sau đó tận hưởng massage thư giãn. Gói kết hợp phù hợp khi bạn muốn thêm bước chăm sóc da vào trải nghiệm massage nhưng không có nhiều thời gian.'], careLabel: 'Nội dung chăm sóc:', care: 'Tẩy tế bào chết cơ thể bằng muối cà phê, làm sạch sản phẩm và massage thư giãn. Thời gian 60 phút là tổng thời lượng của cả hai phần chăm sóc.', meta: ['Tổng thời lượng: 60 phút, bao gồm cả tẩy tế bào chết và massage.'], price: 'Giá: 620.000 VNĐ' },
    en: { title: 'Coffee Salt Body Scrub & Massage', intro: ['One hour for both skin and body: smooth the skin with a coffee salt scrub, then enjoy a relaxing massage. This combination suits you when you want to add skin care to your massage but do not have much time.'], careLabel: 'The treatment includes:', care: 'Body exfoliation with coffee salt, the product rinsed off, and a relaxing massage. The 60 minutes is the total time for both parts.', meta: ['Total duration: 60 minutes, including both exfoliation and massage.'], price: 'Price: 620,000 VND' }
  };

  // ===== Gói chăm sóc kết hợp 2h / 3h / 4h =====
  SERVICES['pkg-2h'] = {
    vi: { title: 'Gói chăm sóc 2 giờ · Body Massage & Facial Package', intro: ['Nếu muốn kết hợp một buổi massage đủ dài với chăm sóc da mặt mà không dành cả ngày tại spa, gói hai giờ là lựa chọn thuận tiện. Bạn có 75 phút để thả lỏng cơ thể và 45 phút dành cho làn da, phù hợp với một buổi nghỉ giữa lịch trình khám phá Hà Nội.'], stepsTitle: 'Gói dịch vụ bao gồm:', steps: [['Massage cơ thể — 75 phút', 'Chăm sóc các vùng cơ thể, điều chỉnh lực theo nhu cầu.'], ['Chăm sóc da mặt — 45 phút', 'Làm sạch, massage, đắp mặt nạ và dưỡng ẩm phù hợp.']], meta: ['Tổng thời lượng: 120 phút'], price: 'Giá trọn gói: 900.000 VNĐ' },
    en: { title: 'Two-Hour Package · Body Massage & Facial', intro: ['If you want a long enough massage together with a facial without spending a whole day at the spa, the two-hour package is a convenient choice. You get 75 minutes to unwind your body and 45 minutes for your skin, ideal for a break between sightseeing in Hanoi.'], stepsTitle: 'The package includes:', steps: [['Body massage — 75 minutes', 'Cares for the body, with pressure adjusted to your needs.'], ['Facial — 45 minutes', 'Cleansing, massage, mask and suitable moisturising.']], meta: ['Total duration: 120 minutes'], price: 'Package price: 900,000 VND' }
  };
  SERVICES['pkg-3h'] = {
    vi: { title: 'Gói chăm sóc 3 giờ · Body Massage, Facial & Head Spa Package', intro: ['Sau nhiều ngày di chuyển hoặc khi muốn dành riêng một buổi cho bản thân, gói ba giờ kết hợp massage cơ thể, chăm sóc da mặt và gội đầu dưỡng sinh trong một lần ghé spa. Cơ thể được nghỉ ngơi, làn da được chăm sóc và mái tóc được làm sạch, giúp bạn sẵn sàng cho những kế hoạch tiếp theo.'], stepsTitle: 'Gói dịch vụ bao gồm:', steps: [['Massage cơ thể — 90 phút', 'Chăm sóc toàn thân với lực phù hợp nhu cầu thư giãn.'], ['Chăm sóc da mặt và gội đầu dưỡng sinh — tổng cộng 90 phút', 'Làm sạch, dưỡng da và chăm sóc tóc, da đầu kết hợp massage thư giãn.'], ['Tặng kèm', 'Vệ sinh tai.']], meta: ['Thời lượng gói: 180 phút'], price: 'Giá trọn gói: 1.650.000 VNĐ' },
    en: { title: 'Three-Hour Package · Body Massage, Facial & Head Spa', intro: ['After days of travel, or when you want to set aside a session for yourself, the three-hour package combines a body massage, a facial and a nourishing hair wash in one visit. Your body rests, your skin is cared for and your hair is cleansed, leaving you ready for your next plans.'], stepsTitle: 'The package includes:', steps: [['Body massage — 90 minutes', 'Full-body care with pressure to suit your relaxation needs.'], ['Facial and nourishing hair wash — 90 minutes in total', 'Cleansing, skin care, and hair and scalp care with a relaxing massage.'], ['Complimentary', 'Ear cleaning.']], meta: ['Package duration: 180 minutes'], price: 'Package price: 1,650,000 VND' }
  };
  SERVICES['pkg-4h'] = {
    vi: { title: 'Gói chăm sóc 4 giờ · Complete Spa Experience', intro: ['Dành trọn một buổi để chậm lại với gói chăm sóc bốn giờ tại IVY LUXE SPA. Massage cơ thể kết hợp tẩy tế bào chết, chăm sóc da mặt và tóc tạo nên một trải nghiệm dành cho khách muốn nghỉ ngơi lâu hơn, được chăm chút nhiều phần trong cùng một lịch hẹn. Đồ uống và đồ ăn nhẹ được phục vụ kèm theo gói.'], stepsTitle: 'Gói dịch vụ bao gồm:', steps: [['Massage cơ thể — 90 phút', 'Thả lỏng cơ thể và chú trọng những vùng cần thư giãn.'], ['Tẩy tế bào chết cơ thể — 60 phút', 'Chăm sóc bề mặt da với các thao tác phù hợp.'], ['Chăm sóc da mặt và chăm sóc tóc — tổng cộng 90 phút', 'Làm sạch, dưỡng da và chăm sóc mái tóc.'], ['Tặng kèm', 'Vệ sinh tai.'], ['Tặng kèm', 'Phục vụ đồ uống và đồ ăn nhẹ miễn phí.']], meta: ['Thời lượng gói: 240 phút'], price: 'Giá trọn gói: 1.900.000 VNĐ' },
    en: { title: 'Four-Hour Package · Complete Spa Experience', intro: ['Take a whole session to slow down with the four-hour package at IVY LUXE SPA. Body massage combined with body exfoliation, a facial and hair care make an experience for guests who want a longer rest and many treatments in one appointment. Drinks and light snacks are served with the package.'], stepsTitle: 'The package includes:', steps: [['Body massage — 90 minutes', 'Relaxes the body with attention to areas that need it.'], ['Body exfoliation — 60 minutes', 'Cares for the skin surface with suitable movements.'], ['Facial and hair care — 90 minutes in total', 'Cleansing, skin care and hair care.'], ['Complimentary', 'Ear cleaning.'], ['Complimentary', 'Free drinks and light snacks.']], meta: ['Package duration: 240 minutes'], price: 'Package price: 1,900,000 VND' }
  };

  // ===== Nail / Mi / Wax: hiển thị bảng của cả nhóm =====
  const NAILS = {
    vi: {
      title: 'Chăm sóc và làm đẹp móng tại IVY LUXE SPA',
      intro: ['Một bộ móng gọn gàng hoặc màu sơn mới có thể hoàn thiện vẻ ngoài cho những buổi dạo phố, bữa tối hay những bức ảnh trong chuyến đi. IVY LUXE SPA cung cấp các lựa chọn từ chăm sóc móng cơ bản đến sơn gel, nối dài và trang trí. Nhân viên trao đổi mẫu, tình trạng móng và tổng chi phí trước khi thực hiện để bạn dễ dàng lựa chọn.'],
      tables: [
        { head: ['Dịch vụ', 'Nội dung', 'Giá'], rows: [
          ['Chăm sóc móng chân cơ bản — Basic Pedicure', 'Làm sạch, cắt và giũa móng, chăm sóc da quanh móng; không bao gồm sơn màu', '150.000 VNĐ'],
          ['Chăm sóc móng tay cơ bản — Basic Manicure', 'Làm sạch, cắt và giũa móng, chăm sóc da quanh móng; không bao gồm sơn màu', '150.000 VNĐ'],
          ['Chăm sóc và sơn gel móng chân — Gel Pedicure', 'Chăm sóc móng chân, tạo dáng và sơn gel', '380.000 VNĐ'],
          ['Chăm sóc và sơn gel móng tay — Gel Manicure', 'Chăm sóc móng tay, tạo dáng và sơn gel', '380.000 VNĐ'],
          ['Sơn thường — Regular Nail Polish', 'Sơn màu thông thường theo lựa chọn', '280.000 VNĐ'],
          ['Sửa và làm sạch móng — Nail Repair / Cleaning', 'Chỉnh sửa, làm sạch móng theo tình trạng thực tế', '180.000 VNĐ'],
          ['Gắn móng giả kèm sơn gel — Nail Tips with Gel Color', 'Gắn móng giả, chỉnh dáng và sơn gel', '580.000 VNĐ'],
          ['Nối dài móng bằng gel kèm sơn màu — Gel Extension with Color', 'Tạo độ dài, định hình móng bằng gel và sơn màu', '750.000 VNĐ'],
          ['Dặm gel — Gel Refill', 'Bổ sung phần gel mọc dài, chỉnh lại dáng móng', '600.000 VNĐ'],
          ['Dặm bột — Acrylic Refill', 'Bổ sung phần bột mọc dài, chỉnh lại dáng móng', '850.000 VNĐ']
        ] },
        { title: 'Các lựa chọn trang trí trên bảng giá:', head: ['Kiểu trang trí', 'Mô tả', 'Giá niêm yết'], rows: [
          ['French Tip', 'Tạo đường viền màu ở đầu móng', '150.000 VNĐ'],
          ['Cat Eye', 'Hiệu ứng ánh sáng mắt mèo', '200.000 VNĐ'],
          ['Ombré', 'Hiệu ứng chuyển màu', '200.000 VNĐ'],
          ['Stone / Charm', 'Trang trí bằng đá hoặc charm', '180.000 VNĐ']
        ] }
      ],
      notes: [
        'Thời gian thực hiện: Được tư vấn khi đặt lịch theo dịch vụ, tình trạng móng và độ phức tạp của mẫu. Vui lòng gửi ảnh mẫu nếu bạn đã có kiểu dáng mong muốn.',
        'Vui lòng thông báo nếu cần tháo gel, móng giả hoặc lớp bột cũ. Nhân viên sẽ xác nhận chi phí tháo và tổng chi phí hoàn thiện trước khi thực hiện.',
        'Bảo hành miễn phí 7 ngày theo chính sách của spa.'
      ]
    },
    en: {
      title: 'Nail Care and Nail Art at IVY LUXE SPA',
      intro: ['A neat set of nails or a fresh colour can complete your look for a stroll, a dinner or the photos from your trip. IVY LUXE SPA offers choices from basic nail care to gel polish, extensions and decoration. Our staff discuss the design, the condition of your nails and the total cost before starting so you can choose easily.'],
      tables: [
        { head: ['Service', 'Details', 'Price'], rows: [
          ['Basic Pedicure', 'Cleaning, cutting and filing, cuticle care; colour polish not included', '150,000 VND'],
          ['Basic Manicure', 'Cleaning, cutting and filing, cuticle care; colour polish not included', '150,000 VND'],
          ['Gel Pedicure', 'Toenail care, shaping and gel polish', '380,000 VND'],
          ['Gel Manicure', 'Fingernail care, shaping and gel polish', '380,000 VND'],
          ['Regular Nail Polish', 'Regular colour polish of your choice', '280,000 VND'],
          ['Nail Repair / Cleaning', 'Repair and cleaning according to the actual condition of the nails', '180,000 VND'],
          ['Nail Tips with Gel Color', 'Applying tips, shaping and gel polish', '580,000 VND'],
          ['Gel Extension with Color', 'Building length and shape with gel and colour', '750,000 VND'],
          ['Gel Refill', 'Filling in the grown-out gel and reshaping the nails', '600,000 VND'],
          ['Acrylic Refill', 'Filling in the grown-out acrylic and reshaping the nails', '850,000 VND']
        ] },
        { title: 'Decoration options on the price list:', head: ['Style', 'Description', 'List price'], rows: [
          ['French Tip', 'A coloured line at the nail tip', '150,000 VND'],
          ['Cat Eye', 'Cat-eye light effect', '200,000 VND'],
          ['Ombré', 'Colour gradient effect', '200,000 VND'],
          ['Stone / Charm', 'Decoration with stones or charms', '180,000 VND']
        ] }
      ],
      notes: [
        'Duration: advised when booking, depending on the service, the condition of your nails and the complexity of the design. Please send a photo if you already have a design in mind.',
        'Please tell us if you need gel, tips or old acrylic removed. Our staff will confirm the removal cost and the total cost before starting.',
        'Free 7-day warranty under the spa policy.'
      ]
    }
  };
  const LASH = {
    vi: {
      title: 'Chăm sóc mi và chân mày · Lash & Brow Services',
      intro: ['Tiết kiệm thời gian chuẩn bị mỗi ngày với đôi mi được tạo kiểu và chân mày được chăm chút theo sở thích. Bạn có thể chọn nối mi để bổ sung độ dài, uốn mi để tạo độ cong cho mi thật hoặc nhuộm chân mày để hoàn thiện diện mạo. Nhân viên kiểm tra tình trạng thực tế và trao đổi kiểu dáng trước khi bắt đầu.'],
      tables: [{ head: ['Dịch vụ', 'Nội dung', 'Giá'], rows: [
        ['Nối mi — Eyelash Extensions', 'Làm sạch mi, tư vấn dáng mi, gắn sợi mi nối và kiểm tra hoàn thiện', '650.000 VNĐ'],
        ['Uốn mi — Lash Lift / Curl', 'Làm sạch, định hình và tạo độ cong cho mi thật', '350.000 VNĐ'],
        ['Tháo mi nối — Eyelash Extension Removal', 'Sử dụng sản phẩm chuyên dụng để tháo mi nối và làm sạch', '250.000 VNĐ'],
        ['Nhuộm chân mày — Eyebrow Tinting', 'Tư vấn màu, chuẩn bị vùng chân mày và nhuộm màu phù hợp', '250.000 VNĐ']
      ] }],
      notes: ['Thời gian thực hiện: Được xác nhận khi đặt lịch, tùy dịch vụ và tình trạng thực tế.']
    },
    en: {
      title: 'Lash & Brow Services',
      intro: ['Save time getting ready every day with styled lashes and brows cared for to your taste. Choose lash extensions for added length, a lash lift to curl your natural lashes, or brow tinting to finish your look. Our staff check the actual condition and discuss the style before starting.'],
      tables: [{ head: ['Service', 'Details', 'Price'], rows: [
        ['Eyelash Extensions', 'Lash cleansing, style consultation, applying extension lashes and a final check', '650,000 VND'],
        ['Lash Lift / Curl', 'Cleansing, shaping and curling the natural lashes', '350,000 VND'],
        ['Eyelash Extension Removal', 'Using a dedicated product to remove extensions and cleanse', '250,000 VND'],
        ['Eyebrow Tinting', 'Colour consultation, preparing the brow area and applying a suitable tint', '250,000 VND']
      ] }],
      notes: ['Duration: confirmed when booking, depending on the service and actual condition.']
    }
  };
  const WAX = {
    vi: {
      title: 'Wax lông theo vùng · Waxing Services',
      intro: ['Lựa chọn wax theo vùng khi bạn muốn làn da gọn gàng hơn để thoải mái diện trang phục yêu thích. Dịch vụ loại bỏ lông tạm thời bằng sáp, với phạm vi thực hiện được trao đổi rõ trước khi bắt đầu. Các bước chuẩn bị và làm dịu da giúp hoàn thiện trải nghiệm chăm sóc.'],
      care: 'Kiểm tra vùng da và thống nhất phạm vi wax; làm sạch, chuẩn bị da; wax theo vùng; làm sạch sáp còn lại; thoa sản phẩm làm dịu phù hợp.',
      careLabel: 'Các bước thực hiện:',
      tables: [{ head: ['Vùng thực hiện', 'Giá'], rows: [
        ['Cằm — Chin', '180.000 VNĐ'], ['Nửa chân, vùng cẳng chân — Lower Legs', '380.000 VNĐ'], ['Toàn bộ chân — Full Legs', '550.000 VNĐ'],
        ['Lưng — Back', '450.000 VNĐ'], ['Nách — Underarms', '180.000 VNĐ'], ['Viền bikini — Bikini Line', '380.000 VNĐ'],
        ['Bikini toàn phần — Full Bikini', '550.000 VNĐ'], ['Mép trên — Upper Lip', '180.000 VNĐ'],
        ['Tạo dáng chân mày bằng wax — Eyebrow Waxing', '180.000 VNĐ'], ['Ngực — Chest', '480.000 VNĐ']
      ] }],
      notes: ['Thời gian thực hiện: Được tư vấn theo vùng wax khi đặt lịch.', 'Vui lòng thông báo nếu da đang kích ứng hoặc đang sử dụng sản phẩm điều trị tại vùng cần wax.']
    },
    en: {
      title: 'Waxing Services',
      intro: ['Choose waxing by area when you want smoother skin to feel comfortable in your favourite outfits. The service temporarily removes hair with wax, and the area to be treated is discussed clearly before starting. Preparation and skin-soothing steps complete the care experience.'],
      care: 'Check the skin and agree on the waxing area; cleanse and prepare the skin; wax by area; remove leftover wax; apply a suitable soothing product.',
      careLabel: 'Steps:',
      tables: [{ head: ['Area', 'Price'], rows: [
        ['Chin', '180,000 VND'], ['Lower Legs', '380,000 VND'], ['Full Legs', '550,000 VND'],
        ['Back', '450,000 VND'], ['Underarms', '180,000 VND'], ['Bikini Line', '380,000 VND'],
        ['Full Bikini', '550,000 VND'], ['Upper Lip', '180,000 VND'],
        ['Eyebrow Waxing', '180,000 VND'], ['Chest', '480,000 VND']
      ] }],
      notes: ['Duration: advised by waxing area when booking.', 'Please tell us if your skin is irritated or if you are using a treatment product on the area to be waxed.']
    }
  };
  ['nail-1', 'nail-2', 'nail-3', 'nail-4', 'nail-5', 'nail-6', 'nail-7', 'nail-8', 'nail-9', 'nail-10', 'nail-11'].forEach((i) => { SERVICES[i] = NAILS; });
  ['eye-1', 'eye-2', 'eye-3', 'eye-4'].forEach((i) => { SERVICES[i] = LASH; });
  ['wax-1', 'wax-2', 'wax-3', 'wax-7', 'wax-8', 'wax-9', 'wax-10', 'wax-11', 'wax-12'].forEach((i) => { SERVICES[i] = WAX; });

  root.IVY_SERVICE_DETAILS = SERVICES;

  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const tableHtml = (t) => `
    ${t.title ? `<h4 class="combo-detail-h">${esc(t.title)}</h4>` : ''}
    <div class="combo-detail-table-wrap"><table class="combo-detail-table">
      <thead><tr>${t.head.map((h) => `<th>${esc(h)}</th>`).join('')}</tr></thead>
      <tbody>${t.rows.map((r) => `<tr>${r.map((c) => `<td>${esc(c)}</td>`).join('')}</tr>`).join('')}</tbody>
    </table></div>`;

  // Trả true nếu có nội dung chi tiết cho dịch vụ này và đã mở popup.
  root.ivyOpenComboDetails = function (id, lang, onBook) {
    const entry = SERVICES[id];
    if (!entry) return false;
    const c = lang === 'vi' ? entry.vi : entry.en;
    const bookLabel = lang === 'vi' ? 'ĐẶT LỊCH NGAY' : 'BOOK NOW';
    const closeLabel = lang === 'vi' ? 'Đóng' : 'Close';
    const closingDefault = lang === 'vi' ? NOTE_BOOK_VI : NOTE_BOOK_EN;

    const old = document.getElementById('combo-detail-modal');
    if (old) old.remove();

    const stepsHtml = c.steps
      ? `<h4 class="combo-detail-h">${esc(c.stepsTitle || '')}</h4>
         <ul class="combo-detail-steps">${c.steps.map((s) => `<li>${s[0] ? `<strong>${esc(s[0])}:</strong> ` : ''}${esc(s[1])}</li>`).join('')}</ul>`
      : '';
    const careHtml = c.care ? `<p class="combo-detail-text"><strong>${esc(c.careLabel || (lang === 'vi' ? 'Nội dung chăm sóc:' : 'The treatment includes:'))}</strong> ${esc(c.care)}</p>` : '';
    const tablesHtml = (c.table ? [c.table] : c.tables || []).map(tableHtml).join('');
    const metaLines = (c.meta || []).filter(Boolean);
    const metaHtml = metaLines.length || c.price
      ? `<p class="combo-detail-meta">${metaLines.map(esc).join('<br>')}${c.price ? `${metaLines.length ? '<br>' : ''}<strong class="combo-detail-price">${esc(c.price)}</strong>` : ''}</p>`
      : '';
    const notesHtml = (c.notes || []).map((n) => `<p class="combo-detail-note">${esc(n)}</p>`).join('');
    const closing = c.closing || ((c.table || c.tables || c.price) && !c.closing ? closingDefault : '');

    const wrap = document.createElement('div');
    wrap.id = 'combo-detail-modal';
    wrap.className = 'combo-detail-overlay';
    wrap.setAttribute('role', 'dialog');
    wrap.setAttribute('aria-modal', 'true');
    wrap.setAttribute('aria-label', c.title);
    wrap.innerHTML = `
      <div class="combo-detail-box">
        <button type="button" class="combo-detail-close" aria-label="${closeLabel}">&times;</button>
        <h3 class="combo-detail-title">${esc(c.title)}</h3>
        ${c.sub ? `<p class="combo-detail-sub">${esc(c.sub)}</p>` : ''}
        ${(c.intro || []).map((p) => `<p class="combo-detail-text">${esc(p)}</p>`).join('')}
        ${careHtml}
        ${stepsHtml}
        ${tablesHtml}
        ${metaHtml}
        ${notesHtml}
        ${closing ? `<p class="combo-detail-text">${esc(closing)}</p>` : ''}
        <div class="combo-detail-actions">
          <button type="button" class="btn-book-service-now combo-detail-book"><i class="fa fa-calendar-check-o"></i> ${bookLabel}</button>
          <button type="button" class="combo-detail-cancel">${closeLabel}</button>
        </div>
      </div>`;
    document.body.appendChild(wrap);
    document.body.classList.add('combo-detail-open');

    const close = () => {
      wrap.remove();
      document.body.classList.remove('combo-detail-open');
      document.removeEventListener('keydown', onKey);
    };
    const onKey = (e) => { if (e.key === 'Escape') close(); };
    document.addEventListener('keydown', onKey);
    wrap.addEventListener('click', (e) => { if (e.target === wrap) close(); });
    wrap.querySelector('.combo-detail-close').addEventListener('click', close);
    wrap.querySelector('.combo-detail-cancel').addEventListener('click', close);
    wrap.querySelector('.combo-detail-book').addEventListener('click', () => { close(); if (onBook) onBook(); });
    return true;
  };

  // =========================================================================
  // BỘ SƯU TẬP 10 ẢNH THỰC TẾ TUYỂN CHỌN (VIEW ALL PHOTOS / LIGHTBOX)
  // =========================================================================
  const GALLERY_PHOTOS = [
    { src: 'assets/images/gallery/gallery_01_nail_polish_wall.jpg', vi: 'Không gian kệ sơn gel cao cấp tại IVY LUXE SPA & NAIL', en: 'Premium Gel Nail Polish Wall at IVY LUXE SPA & NAIL' },
    { src: 'assets/images/gallery/gallery_02_nail_polish_closeup.jpg', vi: 'Bộ sưu tập màu sơn gel chính hãng đa dạng', en: 'Curated Gel Polish Collection – Nail Salon Hanoi Old Quarter' },
    { src: 'assets/images/gallery/gallery_03_reception_lobby_wide.jpg', vi: 'Sảnh lễ tân & không gian đón tiếp tại Số 48 phố Hà Trung', en: 'Main Reception & Welcome Lounge at 48 Ha Trung, Hanoi Old Quarter' },
    { src: 'assets/images/gallery/gallery_04_brand_card_reception.jpg', vi: 'Quầy lễ tân IVY LUXE SPA – 48 Hà Trung, Hoàn Kiếm', en: 'IVY LUXE SPA Front Desk – 48 Ha Trung, Hoan Kiem' },
    { src: 'assets/images/gallery/gallery_05_foot_massage_lounge.jpg', vi: 'Khu vực ghế Foot Massage êm ái, thư giãn đôi chân', en: 'Plush Foot Massage Lounge near Hoan Kiem Lake' },
    { src: 'assets/images/gallery/gallery_06_massage_suite_golden.jpg', vi: 'Phòng trị liệu Massage Body ánh sáng ấm áp', en: 'Warm-Lit Body Massage Suite in Hanoi Old Quarter' },
    { src: 'assets/images/gallery/gallery_07_private_massage_beds.jpg', vi: 'Không gian giường massage riêng tư có rèm ngăn kín đáo', en: 'Private Massage Beds with Curtain Partitions' },
    { src: 'assets/images/gallery/gallery_08_therapy_room_wide.jpg', vi: 'Phòng trị liệu toàn thân rộng rãi, sạch thoáng', en: 'Spacious & Tranquil Full-Body Therapy Room' },
    { src: 'assets/images/gallery/gallery_09_cozy_treatment_suite.jpg', vi: 'Phòng chăm sóc cơ thể & da mặt ấm cúng', en: 'Cozy Body & Facial Treatment Suite' },
    { src: 'assets/images/gallery/gallery_10_plush_massage_bed.jpg', vi: 'Giường trị liệu chuẩn bị khăn sạch chu đáo cho từng khách', en: 'Freshly Prepared Massage Bed for Every Guest' }
  ];

  function openGalleryLightbox(startIdx) {
    let idx = typeof startIdx === 'number' && startIdx >= 0 && startIdx < GALLERY_PHOTOS.length ? startIdx : 0;
    const lang = (document.documentElement.lang || localStorage.getItem('ivy_lang') || 'en').slice(0, 2);
    const isVi = lang === 'vi';
    const modalTitle = isVi ? 'BỘ SƯU TẬP HÌNH ẢNH THỰC TẾ IVY LUXE SPA' : 'IVY LUXE SPA PHOTO GALLERY';

    const old = document.getElementById('ivy-gallery-modal');
    if (old) old.remove();

    const wrap = document.createElement('div');
    wrap.id = 'ivy-gallery-modal';
    wrap.className = 'ivy-gallery-modal-overlay';
    wrap.setAttribute('role', 'dialog');
    wrap.setAttribute('aria-modal', 'true');
    wrap.setAttribute('data-no-translate', '1');
    wrap.innerHTML = `
      <div class="ivy-gallery-modal-box">
        <div class="ivy-gallery-modal-header">
          <h3 class="ivy-gallery-modal-title"><i class="fa fa-camera" style="margin-right:8px;"></i>${esc(modalTitle)}</h3>
          <button type="button" class="ivy-gallery-modal-close" aria-label="Close">&times;</button>
        </div>
        <div class="ivy-gallery-hero-stage">
          <button type="button" class="ivy-gallery-nav-btn ivy-gallery-nav-prev" aria-label="Previous"><i class="fa fa-chevron-left"></i></button>
          <img class="ivy-gallery-hero-img" src="" alt="Foot massage and spa treatment at IVY Luxe Spa in Hanoi Old Quarter">
          <button type="button" class="ivy-gallery-nav-btn ivy-gallery-nav-next" aria-label="Next"><i class="fa fa-chevron-right"></i></button>
        </div>
        <div class="ivy-gallery-caption-bar">
          <span class="ivy-gallery-caption-text"></span>
          <strong class="ivy-gallery-counter" style="color:#D4AF37;"></strong>
        </div>
        <div class="ivy-gallery-thumbs-grid">
          ${GALLERY_PHOTOS.map((p, i) => `
            <button type="button" class="ivy-gallery-thumb-btn" data-idx="${i}" title="${esc(isVi ? p.vi : p.en)}">
              <img src="${p.src}" alt="${esc(isVi ? p.vi : p.en)}" loading="lazy">
            </button>
          `).join('')}
        </div>
      </div>`;
    document.body.appendChild(wrap);
    document.body.classList.add('combo-detail-open');

    const heroImg = wrap.querySelector('.ivy-gallery-hero-img');
    const capText = wrap.querySelector('.ivy-gallery-caption-text');
    const counter = wrap.querySelector('.ivy-gallery-counter');
    const thumbs = wrap.querySelectorAll('.ivy-gallery-thumb-btn');

    function renderSlide(newIdx) {
      idx = (newIdx + GALLERY_PHOTOS.length) % GALLERY_PHOTOS.length;
      const item = GALLERY_PHOTOS[idx];
      heroImg.src = item.src;
      heroImg.alt = isVi ? item.vi : item.en;
      capText.textContent = isVi ? item.vi : item.en;
      counter.textContent = `${idx + 1} / ${GALLERY_PHOTOS.length}`;
      thumbs.forEach((btn, i) => btn.classList.toggle('active', i === idx));
    }

    const close = () => {
      wrap.remove();
      document.body.classList.remove('combo-detail-open');
      document.removeEventListener('keydown', onKey);
    };
    const onKey = (e) => {
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowRight') renderSlide(idx + 1);
      else if (e.key === 'ArrowLeft') renderSlide(idx - 1);
    };
    document.addEventListener('keydown', onKey);
    wrap.addEventListener('click', (e) => { if (e.target === wrap) close(); });
    wrap.querySelector('.ivy-gallery-modal-close').addEventListener('click', close);
    wrap.querySelector('.ivy-gallery-nav-prev').addEventListener('click', () => renderSlide(idx - 1));
    wrap.querySelector('.ivy-gallery-nav-next').addEventListener('click', () => renderSlide(idx + 1));
    thumbs.forEach((btn) => btn.addEventListener('click', () => renderSlide(Number(btn.getAttribute('data-idx')))));

    renderSlide(idx);
  }

  root.ivyOpenGalleryLightbox = openGalleryLightbox;

  function bindGalleryEvents() {
    document.querySelectorAll('.js-gallery-lightbox').forEach((el) => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        const i = Number(el.getAttribute('data-idx') || 0);
        openGalleryLightbox(i);
      });
    });
    const viewAllBtn = document.querySelector('[data-i18n="guests_btn_more"]');
    if (viewAllBtn) {
      viewAllBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openGalleryLightbox(0);
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bindGalleryEvents);
  } else {
    bindGalleryEvents();
  }
})(window);
