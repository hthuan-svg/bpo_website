# Quyết định đã chốt & câu hỏi còn mở

## Quyết định đã chốt
| # | Quyết định | Nguồn |
|---|---|---|
| D1 | Theme **đen + xanh lá**, thêm trắng/xám cho hài hòa; chữ xanh trên nền sáng dùng `#4A7C1B` | Yêu cầu 1 |
| D2 | Ảnh chia thư mục theo trang; tên slot = tên file = `<trang>_<mục>_<mã>`; ảnh bỏ đi vào `_unused/` | Yêu cầu 2 |
| D3 | **Không còn "skip to main content"** | Yêu cầu 3 |
| D4 | **SUBARU là đối tác duy nhất được nêu tên**; logo khách khác bị gỡ; bản đồ Mỹ đã được làm sạch (không logo) | Yêu cầu 5 |
| D5 | Văn phòng: chỉ **Văn phòng chính (25 Nguyễn Văn Cừ)** và **Chi nhánh (28 Lý Thường Kiệt)**, Huế; bỏ Phạm Văn Đồng; 2025 bỏ nội dung mở văn phòng | Yêu cầu 7 |
| D6 | Đội ngũ: bỏ sơ đồ vẽ (cơ cấu + quy trình), thay bằng ô ảnh; quy trình chỉ giữa **BPO BRYCEN VN và Khách hàng** (bỏ BPO JP) | Yêu cầu 8 |
| D7 | Tuyển dụng chuyển thành **trang riêng** (`recruits.html`), có trạng thái Đang mở/Đã đóng | Yêu cầu 4, 8 |
| D8 | Trang Tạo dữ liệu: ứng dụng lên trước; side-nav dọc cố định bên trái; mỗi hạng mục có dải ảnh chạy ngang; ảnh–chữ: ảnh bên trái | Yêu cầu 12 |
| D9 | Biểu mẫu liên hệ gửi qua **dịch vụ form-endpoint** (hoặc `mailto:` dự phòng) vì web tĩnh không tự gửi email | Yêu cầu 11 |
| D10 | Văn bản "個人情報の取り扱いについて" được **viết lại theo cấu trúc 10 mục** của mẫu Brycen Data Engineering (không sao chép nguyên văn), đã điều chỉnh cho BRYCEN VIETNAM | Yêu cầu 11 |

## Câu hỏi còn mở (cần bạn trả lời / xác nhận)
| # | Câu hỏi | Vì sao quan trọng |
|---|---|---|
| Q1 | **ISO/IEC 27001:2013**: tiêu chuẩn này đã được thay bằng bản **2022**; các chứng chỉ theo bản 2013 hết hiệu lực từ **31/10/2025**. Chứng chỉ thực tế của bạn ghi bản nào? | Nêu sai phiên bản chứng nhận có thể gây hiểu nhầm. Sửa ở `certifications.items` |
| Q2 | **Hợp tác với SUBARU/EyeSight**: phạm vi được phép nêu công khai? Có điều khoản bảo mật (NDA)? Được dùng logo & tên SUBARU? | Rủi ro pháp lý/thương hiệu |
| Q3 | Số liệu Subaru (AWD 20 triệu chiếc năm 2021; EyeSight 5 triệu chiếc năm 2022) lấy từ công bố của Subaru — có muốn cập nhật số mới? | Số liệu theo năm |
| Q4 | **Người quản lý thông tin cá nhân** (họ tên, chức danh) và **URL chính sách bảo vệ thông tin cá nhân** | Điền `[CẦN BỔ SUNG]` ở `contact.privacy.items[1]`, `site.config.json → contact.privacyPolicyUrl`. Nên nhờ pháp chế rà soát (tham khảo Nghị định 13/2023/NĐ-CP về bảo vệ dữ liệu cá nhân) |
| Q5 | "Phản hồi trong 2 ngày làm việc" (lấy theo mẫu Brycen JP) có đúng với bạn? | `contact.response_note` |
| Q6 | Tài khoản dịch vụ form (Formspree/Web3Forms…) và email nhận | Xem `docs/release/contact-form-setup.md` |
| Q7 | Số nhân sự **550 = 37 + 523** (tổng là 560) | `home.stats`, `team.org.headcount`, `home.hero.subtitle` |
| Q8 | Bản dịch EN/JA đã được người bản ngữ rà soát chưa? | Đăng web doanh nghiệp |
| Q9 | Mô tả quốc gia Cambodia/Myanmar trong "Hợp tác đa quốc gia" mới là câu chung chung — cần mô tả thật | `about.global.countries[]` |
| Q10 | Nội dung "Thu thập dữ liệu học cho AI" (khi nào cập nhật?) | Trang đang "Đang cập nhật" |
| Q11 | Mã vai trò VNA/VNC/VNSC/SubPL/PL (dữ liệu còn lưu, chưa hiển thị) — giữ lại cho sau? | `services.annotation.quality.layers` |
