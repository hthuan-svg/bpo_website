# Hướng dẫn sửa nội dung (cho người không chuyên)

Mở web bằng **Live Server** để xem thử. Trước khi sửa lớn: `git commit` hoặc sao chép cả thư mục dự án để có bản dự phòng.

| Tôi muốn… | Sửa ở đâu |
|---|---|
| Sửa một đoạn chữ | `content/vi.json` (Ctrl+F tìm đoạn chữ) → sửa phần giữa 2 dấu `"` → làm **cùng chỗ** trong `en.json`, `ja.json` |
| Đổi một ảnh | Ghi đè file **cùng tên, cùng đuôi** trong `assets/images/<trang>/` (xem `docs/images/image-slots.md`) → `Ctrl+F5` |
| Bỏ khung nét đứt của ảnh giữ chỗ | `content/images.json` → slot đó → `"placeholder": false` |
| Địa chỉ / email / điện thoại / Facebook | `content/site.config.json` (để `""` = tự ẩn) |
| Đăng tin tức | `content/news.json`: sao chép khối `_template`, đổi `id`, `date`, nội dung 3 ngôn ngữ, `hidden:false` |
| Đăng tin **tuyển dụng** | `content/recruits.json`: sao chép `_template-open`, đổi nội dung, `hidden:false`. Đóng tin: `"status": "closed"` (hoặc đặt `deadline`, quá hạn sẽ tự hiện "Đã đóng") |
| Đổi cách xếp ảnh/chữ ở trang Tạo dữ liệu | `site.config.json` → `layout.annotationRows`: `"image-left"` hoặc `"zigzag"` |
| Đổi tốc độ dải ảnh chạy | `site.config.json` → `marquee.home.secondsPerLoop` / `marquee.services.secondsPerLoop` (số giây cho 1 vòng; lớn = chậm) |
| Bật/tắt nút lên đầu trang | `site.config.json` → `backToTop.enabled` |
| Thay đổi chứng nhận ISO | `content/*.json` → `certifications.items` (mã & tên) + thay ảnh `common_iso_9001`, `common_iso_27001` |
| Sửa chữ SUBARU | `content/*.json` → khối `subaru` |

**Lỗi hay gặp:** thiếu/thừa dấu phẩy, dùng nháy cong “ ” thay nháy thẳng " ; chỉ sửa 1 ngôn ngữ; đổi tên file ảnh. Sau khi sửa luôn chạy `validate.bat` (hoặc `node tools/validate-content.mjs`): ✖ = phải sửa, ⚠ = nhắc nhở (ví dụ còn ảnh giữ chỗ).
Chi tiết cấu trúc: `content-model.md`.
