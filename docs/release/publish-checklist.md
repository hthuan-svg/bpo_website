# Checklist trước khi công khai

## A. Xin phép nội dung
- [ ] Số liệu nhân sự (550; 37 + 523 = 560?), 79/187 sinh viên đã chính xác và được phép công khai.
- [ ] **SUBARU**: được phép dùng tên & logo; phạm vi hợp tác EyeSight được phép nêu; số liệu Subaru còn đúng.
- [ ] Các **ảnh minh họa dữ liệu** (3D/2D/vệ tinh, dải ảnh sản phẩm) không thuộc dự án bị ràng buộc bảo mật của khách.
- [ ] Ảnh **người thật**: đã có đồng ý. Ảnh Nhật Bản/đối tác: có bản quyền.
- [ ] **Chứng nhận ISO**: ảnh chứng chỉ và **phiên bản tiêu chuẩn** đúng (xem Q1: ISO/IEC 27001:2013 đã hết hiệu lực chuyển đổi 31/10/2025).
- [ ] Huy hiệu Top 1 (Fuji Chimera Research Institute): đúng năm, được phép dùng.
- [ ] Bản đồ Mỹ chỉ còn tiểu bang (không logo khách khác).
- [ ] Bản dịch EN/JA đã rà soát bởi người bản ngữ/nghiệp vụ.

## B. Pháp lý & thông tin cá nhân
- [ ] Mục "Về việc xử lý thông tin cá nhân": đã điền người phụ trách, link chính sách; pháp chế/DPO đã xem (Nghị định 13/2023/NĐ-CP, quy định tập đoàn).
- [ ] Nếu bật Google Analytics/cookie: sửa mục 8 trong chính sách cho đúng thực tế.
- [ ] Biểu mẫu liên hệ đã thử gửi thật; email nhận đúng.

## C. Kỹ thuật
- [ ] `node tools/validate-content.mjs`: không còn ✖; không còn `[CẦN BỔ SUNG]`; không còn ⚠ placeholder cần thay.
- [ ] `company_logo.png` và `company_logo_on_dark.png` độ phân giải cao (rộng ≥ 800 px).
- [ ] `site.config.json` đã điền (email, điện thoại, địa chỉ, Facebook, form).
- [ ] Mở thử 12 trang × 3 ngôn ngữ trên điện thoại & máy tính; không còn chữ thô kiểu `home.hero.title`.
- [ ] Lighthouse đạt mục tiêu; HTTPS; `sitemap.xml` có tên miền thật.
- [ ] Không đưa `admin/`, `tools/`, `docs/`, `revision*/`, `content/_backup_*`, `assets/images/_unused/`, `AGENTS.md`, `.github/` lên bản công khai.
- [ ] Có người chịu trách nhiệm cập nhật tin tức & tuyển dụng định kỳ (đóng tin hết hạn).
