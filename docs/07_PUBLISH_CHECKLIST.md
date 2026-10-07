# 07 – Checklist trước khi công khai

## A. Xin phép nội dung (quan trọng)
File PowerPoint gốc được đóng dấu **Confidential**. Trước khi đưa lên mạng công khai, hãy xác nhận bằng văn bản với quản lý/phòng truyền thông:
- [ ] Được phép công khai **số liệu nhân sự** (550 người, 37 chính thức + 523 part-time, 79/187 sinh viên) – và số đã **chính xác** (37 + 523 = 560 ≠ 550)?
- [ ] Được phép dùng **logo & tên khách hàng** (Sony, Subaru, Denso, Honda, AFEELA/Sony Honda Mobility, Nikon)? Nhiều hợp đồng NDA cấm nêu tên khách hàng.
- [ ] Ảnh **dữ liệu/màn hình công cụ** (3D, 2D, vệ tinh) có thuộc dự án của khách hàng không? Có thể phải thay bằng ảnh mẫu.
- [ ] Ảnh **người thật** (đội ngũ, chuyến đi Nhật): đã có đồng ý của những người trong ảnh.
- [ ] Địa chỉ văn phòng được phép công bố.
- [ ] **Huy hiệu Top 1** và câu "5 năm liên tiếp": đúng với số liệu và có quyền dùng huy hiệu của Fuji Chimera Research Institute.
- [ ] Icon clip-art trong timeline: đã kiểm tra bản quyền hoặc thay bằng icon được cấp phép.
- [ ] Bản dịch tiếng Nhật, tiếng Anh đã được người bản ngữ/nghiệp vụ rà soát.
- [ ] Phần Notes nội bộ của PowerPoint **không** có trong web (kit đã loại bỏ).

## B. Kỹ thuật
- [ ] `validate.bat` không còn ✖; không còn `[CẦN BỔ SUNG]`.
- [ ] Thay `company_logo.png` bằng bản độ phân giải cao (SVG/PNG ≥ 800 px).
- [ ] Điền `site.config.json` (email, điện thoại, địa chỉ, Facebook…).
- [ ] Mở thử 10 trang × 3 ngôn ngữ trên điện thoại và máy tính.
- [ ] Lighthouse đạt mục tiêu (docs/01).
- [ ] `admin/`, `tools/`, `docs/`, `AGENTS.md`, `assets/styleguide.html` **không** nằm trong bản công khai.
- [ ] HTTPS bật; tên miền đúng; `sitemap.xml` có địa chỉ thật.
- [ ] Có người chịu trách nhiệm cập nhật tin tức hàng tháng và quy trình duyệt tin.

## C. Cách đưa web lên mạng (tóm tắt – chi tiết ở Prompt 13)
| Phương án | Chi phí | Phù hợp khi |
|---|---|---|
| GitHub Pages / Cloudflare Pages / Netlify | Miễn phí (gói cơ bản) | Muốn nhanh, đơn giản; nội dung được phép công khai |
| Máy chủ nội bộ (Nginx/IIS) | Theo hạ tầng sẵn có | Công ty yêu cầu dữ liệu ở máy chủ riêng / chỉ truy cập mạng nội bộ |
| Tên miền phụ của công ty | Theo IT công ty | Cần đồng bộ thương hiệu; phối hợp bộ phận IT/Brycen JP |

> Nếu chưa được duyệt nội dung: chọn máy chủ nội bộ hoặc kho GitHub **riêng tư (private)** trước.
