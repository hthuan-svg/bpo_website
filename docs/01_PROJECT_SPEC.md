# 01 – Đặc tả dự án

## 1. Thông tin
- **Bộ phận:** BPO (Business Process Outsourcing)
- **Công ty:** Công ty TNHH BRYCEN VIETNAM (thuộc Brycen Group, trụ sở Nhật Bản – https://www.brycen.co.jp/)
- **Mục tiêu:** giới thiệu bộ phận và quảng bá 2 mảng công việc:
  1. Tạo dữ liệu học cho AI (annotation 2D/3D/vệ tinh)
  2. Thu thập dữ liệu học cho AI (LiDAR, camera hành trình)
- **Đối tượng người xem:** khách hàng/đối tác (chủ yếu Nhật), ứng viên, đồng nghiệp trong tập đoàn.

## 2. Sơ đồ trang (các tab)
| Tab (menu) | File | Nguồn nội dung PowerPoint | Ghi chú |
|---|---|---|---|
| Trang chủ | `index.html` | Slide 1, 4, 5, 21–23 | Hero, số liệu, 2 mảng chính, cam kết, khách hàng, tin mới |
| Giới thiệu | `about.html` | Slide 4–8 | Giới thiệu chung, lịch sử (timeline 2015→2025), 3 văn phòng |
| Dịch vụ ▾ | `services.html` | Slide 10–12 | Tổng quan 2 mảng + dữ liệu 2D/3D |
| ├ Tạo dữ liệu học cho AI | `services-annotation.html` | Slide 11–15, 21 | 3D Segment, 3D Cuboid, 2D Segment, 2D BBox, Keypoint, Vệ tinh, kiểm soát chất lượng |
| └ Thu thập dữ liệu học cho AI | `services-collection.html` | Slide 12 (ít) | **Thiếu nội dung gốc** – xem README |
| Đội ngũ | `team.html` | Slide 16–19 | Thể chế, flow vận hành, cơ hội phát triển (cử sang Nhật) |
| Thành tựu & Dự án | `achievements.html` | Slide 20–23 | Top 1 thị trường Nhật, 235 dự án, logo khách hàng |
| Tầm nhìn | `vision.html` | Slide 24–26 | Mở rộng sang Mỹ, nguồn nhân lực & tuyển dụng |
| Tin tức | `news.html` | (mới) | Danh sách + lọc theo loại + chi tiết `news.html?id=...` + khung Facebook |
| Liên hệ | `contact.html` | Slide 27–28 (trống) | Thông tin, bản đồ, biểu mẫu/mailto, mạng xã hội |

Footer: logo, tên bộ phận, link nhanh, mạng xã hội, "Trang web Brycen Nhật Bản", bản quyền.

## 3. Yêu cầu chức năng → cách đáp ứng
| # | Yêu cầu | Giải pháp |
|---|---|---|
| 4 | Tab rõ ràng | Menu ngang cố định + dropdown "Dịch vụ"; trên mobile là menu trượt; tab đang xem được tô đậm |
| 5 | Lấy nội dung & ảnh PowerPoint | Đã trích sẵn vào `content/` và `assets/images/` |
| 6 | Theme dễ chịu, hiện đại, AI tối giản | Xem `02_DESIGN_SYSTEM.md` |
| 7 | 3 ngôn ngữ EN/JA/VI, nút chuyển nhanh | Nút `VI · EN · 日本語` trên header; nhớ lựa chọn (`localStorage`); đọc `?lang=ja`; tự nhận ngôn ngữ trình duyệt lần đầu; mặc định VI |
| 8 | Trang tin cập nhật nhanh | `news.json` (thêm 1 khối là có tin mới) + công cụ `admin/` (tuỳ chọn) |
| 9 | Liên kết Facebook & trang khác | Icon mạng xã hội từ `site.config.json`; khung Facebook Page Plugin; nút "Chia sẻ lên Facebook" mỗi tin; thẻ Open Graph để link chia sẻ có ảnh đẹp |
| 10 | Ảnh chia thành các mục dễ thay | **Slot ảnh** (`docs/04_IMAGE_SLOTS.md`): tên file = tên vị trí |
| 11 | Dễ thêm/đổi nội dung & ảnh | Toàn bộ chữ nằm trong JSON; ghi đè file ảnh cùng tên là xong; `06_EDITOR_GUIDE.md` |
| 12 | Dùng VS Code, có MD & prompt | Bộ kit này |

## 4. Quyết định kỹ thuật (và lý do)
| Chọn | Lý do | Đánh đổi |
|---|---|---|
| Web tĩnh (HTML/CSS/JS thuần) | Không cần server/CSDL, rẻ, bảo trì dễ, host ở đâu cũng được | Không có trang quản trị đăng nhập sẵn |
| Nội dung trong JSON, JS dựng trang khi tải | Người không chuyên chỉ sửa chữ, không đụng HTML; 3 ngôn ngữ cùng cấu trúc | Công cụ tìm kiếm (không phải Google) có thể đọc kém. Nếu SEO quan trọng → làm **Prompt 14** (prerender) |
| Nhiều trang HTML (không phải 1 trang cuộn) | Mỗi tab có link riêng để chia sẻ lên Facebook/email | Cần header/footer chung → chèn bằng `layout.js` |
| Không framework | Người kế nhiệm mở ra hiểu ngay | Tự viết nhiều thứ nhỏ hơn |
| Công cụ `admin/` chạy cục bộ | Sửa nội dung bằng form, ghi thẳng file JSON (Chrome/Edge) | Chỉ người có thư mục dự án mới dùng được; **không** đưa lên server |

Phương án nâng cấp sau này nếu cần đăng nhập/duyệt bài: Decap CMS hoặc WordPress headless – **không** làm ở giai đoạn đầu.

## 5. Tiêu chí hoàn thành (Definition of Done)
- 10 trang chạy được, không lỗi console, không link chết.
- Đổi ngôn ngữ ở mọi trang: toàn bộ chữ đổi, không còn chữ ngôn ngữ cũ, không hiện khóa thô (vd `home.hero.title`).
- Đổi 1 ảnh bằng cách ghi đè file → hiện đúng trên mọi trang dùng slot đó.
- Thêm 1 tin vào `news.json` → hiện ở Trang chủ và Tin tức, đúng thứ tự.
- Để trống Facebook trong `site.config.json` → icon/khung Facebook biến mất gọn gàng.
- Lighthouse (mobile): Performance ≥ 85, Accessibility ≥ 95, SEO ≥ 90.
- `node tools/validate-content.mjs` báo 0 lỗi.
