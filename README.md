# BRYCEN VIETNAM – BPO Website

Trang web giới thiệu bộ phận **BPO (Business Process Outsourcing)** của Công ty TNHH BRYCEN VIETNAM: tạo & thu thập dữ liệu học cho AI. Web tĩnh (HTML/CSS/JS), 3 ngôn ngữ **Việt · Anh · Nhật**, giao diện **đen – xanh lá**.

## Chạy thử
1. Mở thư mục này bằng **VS Code**, cài extension *Live Server* và *GitHub Copilot Chat*.
2. Chuột phải `index.html` → **Open with Live Server** (hoặc `node tools/serve.mjs` rồi mở http://localhost:5500).
   *Đừng bấm đúp mở file `.html`* – trình duyệt sẽ chặn đọc file JSON.

## Các trang
| Trang | File | Ghi chú |
|---|---|---|
| Trang chủ | `index.html` | Hero tách đôi, chỉ số + ảnh, dịch vụ + dải ảnh sản phẩm, cam kết + ISO, đối tác SUBARU |
| Giới thiệu | `about.html` | Lịch sử, 2 văn phòng (Huế), hợp tác đa quốc gia |
| Dịch vụ | `services.html` → `services-annotation.html`, `services-collection.html` | Tạo dữ liệu (chính) · Thu thập dữ liệu (đang cập nhật) |
| Đội ngũ | `team.html` | Cơ cấu, quy trình vận hành, nhân lực đào tạo tại Nhật |
| Thành tựu & Dự án | `achievements.html` | #1 Nhật Bản, 235 dự án, độ hài lòng |
| Tầm nhìn | `vision.html` | Growth timeline: Nhật Bản + Đông Nam Á → Mỹ → EU |
| Tin tức | `news.html` | Dữ liệu `content/news.json` |
| Tuyển dụng | `recruits.html` | Dữ liệu `content/recruits.json`, trạng thái Đang mở / Đã đóng |
| Liên hệ | `contact.html` | Biểu mẫu + chính sách thông tin cá nhân + thông tin công ty |
| SUBARU | `subaru.html` | Mở bằng cách bấm logo SUBARU (không nằm trong menu) |

## Cấu trúc thư mục
```
content/    vi.json en.json ja.json   news.json  recruits.json  images.json  site.config.json   ← nội dung & cấu hình (sửa ở đây)
assets/images/<trang>/                ← ảnh chia theo từng trang; tên file = tên slot (xem docs/images/)
assets/css, assets/js                 ← giao diện & chức năng
tools/                                ← công cụ dòng lệnh (kiểm tra, gộp nội dung, di chuyển ảnh…)
docs/                                 ← tài liệu (bắt đầu từ docs/README.md)
.github/prompts/                      ← các prompt chạy bằng lệnh /… trong VS Code Agent
AGENTS.md                             ← quy tắc cho trợ lý AI (tự được đọc)
```

## Làm việc với trợ lý AI (VS Code Agent)
- **Bắt đầu phiên mới:** mở chat mới ở chế độ *Agent* → gõ `/session-start` (hoặc đọc `docs/work/session-start.md`).
- Tiến độ & việc tiếp theo: `docs/work/current-work.md`. Quyết định & câu hỏi còn mở: `docs/work/decisions-and-open-questions.md`.
- Danh sách prompt: `docs/prompts/`.

## Sửa nội dung nhanh (không cần lập trình)
- Chữ: `content/vi.json`, `en.json`, `ja.json` (cùng cấu trúc). Hướng dẫn: `docs/content/editing-guide.md`.
- Ảnh: ghi đè file cùng tên trong `assets/images/<trang>/`. Hướng dẫn: `docs/images/image-guide.md`.
- Tin tức / Tuyển dụng: thêm 1 khối vào `news.json` / `recruits.json`.
- Địa chỉ, email, điện thoại, Facebook, form: `content/site.config.json`.
- Kiểm tra trước khi đăng: `validate.bat` hoặc `node tools/validate-content.mjs`.
