# 04 – Bảng vị trí ảnh (Image Slots)

Mỗi **slot** là một vị trí ảnh trên web. **Tên slot = tên file** (không tính đuôi). Dữ liệu nằm trong `content/images.json`.

## Cách thay một ảnh (người không chuyên)
**Cách 1 – nhanh nhất:** chuẩn bị ảnh mới, đổi tên **đúng tên file cũ** (kể cả đuôi `.jpg`/`.png`), chép đè vào thư mục tương ứng. Làm mới trình duyệt (`Ctrl+F5`).

**Cách 2 – đổi định dạng/đường dẫn:** đặt ảnh mới vào `assets/images/...` với tên bất kỳ, rồi sửa `"src"` của slot trong `content/images.json`. Nhớ sửa `"alt"` cho cả 3 ngôn ngữ.

**Thêm ảnh/slot mới:** thêm 1 khối vào `images.json`, rồi dùng `data-img="ten_slot_moi"` trong HTML hoặc điền tên slot vào trường `image` trong nội dung/tin tức.

## Khuyến nghị kích thước
| Loại | Kích thước gợi ý | Định dạng | Dung lượng |
|---|---|---|---|
| `background_*` | 2000×1000 px trở lên | JPG/WebP | < 300 KB |
| Ảnh dịch vụ, văn phòng, đội ngũ | 1200×800 px | JPG | < 200 KB |
| Logo khách hàng | rộng 400 px, nền trong suốt | PNG/SVG | < 50 KB |
| `company_logo` | **SVG hoặc PNG rộng ≥ 800 px** | SVG/PNG | < 100 KB |
| `browser_logo` | 512×512 (vuông, trong suốt) | PNG | < 100 KB |
| `og_share` | **1200×630** | JPG | < 300 KB |
Nén ảnh miễn phí: https://squoosh.app

## Danh sách toàn bộ slot (44 slot, 47 file)
| Slot | File | Dùng ở đâu |
|---|---|---|
| `company_logo` | `assets/images/branding/company_logo.png` | Header, footer |
| `company_logo_mark` | `assets/images/branding/company_logo_mark.png` | Loading, ảnh chia sẻ, nền trang lỗi |
| `browser_logo` | `assets/images/branding/browser_logo.png` | Biểu tượng tab trình duyệt (favicon). Có thêm browser_logo_32.png, browser_logo_180.png, favicon.ico – thay cả nhóm |
| `og_share` | `assets/images/branding/og_share.jpg` | Ảnh hiện khi chia sẻ link lên Facebook/Zalo (1200×630) |
| `background_main` | `assets/images/backgrounds/background_main.jpg` | Hero Trang chủ |
| `background_soft` | `assets/images/backgrounds/background_soft.png` | Nền sóng mềm các khu vực xen kẽ |
| `background_services_3d` | `assets/images/backgrounds/background_services_3d.jpg` | Thẻ dịch vụ + đầu trang Dịch vụ (3D) |
| `background_services_2d` | `assets/images/backgrounds/background_services_2d.jpg` | Thẻ dịch vụ + đầu trang Dịch vụ (2D) |
| `office_nguyen_van_cu` | `assets/images/about/office_nguyen_van_cu.jpg` | Giới thiệu › Văn phòng |
| `office_pham_van_dong` | `assets/images/about/office_pham_van_dong.jpg` | Giới thiệu › Văn phòng |
| `office_ly_thuong_kiet` | `assets/images/about/office_ly_thuong_kiet.jpg` | Giới thiệu › Văn phòng |
| `timeline_2015` | `assets/images/timeline/timeline_2015.png` | Giới thiệu › Timeline 2015 |
| `timeline_2016` | `assets/images/timeline/timeline_2016.png` | Giới thiệu › Timeline 2016 |
| `timeline_2018` | `assets/images/timeline/timeline_2018.png` | Giới thiệu › Timeline 2018 |
| `timeline_2019` | `assets/images/timeline/timeline_2019.png` | Giới thiệu › Timeline 2019 |
| `timeline_2020` | `assets/images/timeline/timeline_2020.png` | Giới thiệu › Timeline 2020 |
| `timeline_2023` | `assets/images/timeline/timeline_2023.png` | Giới thiệu › Timeline 2023 |
| `timeline_2025` | `assets/images/timeline/timeline_2025.png` | Giới thiệu › Timeline 2025 |
| `service_3d_segment_1` | `assets/images/services/service_3d_segment_1.jpg` | Dịch vụ tạo dữ liệu › 3D Segment example |
| `service_3d_segment_2` | `assets/images/services/service_3d_segment_2.jpg` | Dịch vụ tạo dữ liệu › 3D Segment example (2) |
| `service_3d_cuboid_1` | `assets/images/services/service_3d_cuboid_1.jpg` | Dịch vụ tạo dữ liệu › 3D Cuboid example |
| `service_3d_cuboid_2` | `assets/images/services/service_3d_cuboid_2.jpg` | Dịch vụ tạo dữ liệu › 3D Cuboid example (2) |
| `service_2d_segment_input` | `assets/images/services/service_2d_segment_input.jpg` | Dịch vụ tạo dữ liệu › Original image before segmentation |
| `service_2d_segment_output` | `assets/images/services/service_2d_segment_output.jpg` | Dịch vụ tạo dữ liệu › 2D Segment result |
| `service_2d_bbox` | `assets/images/services/service_2d_bbox.jpg` | Dịch vụ tạo dữ liệu › 2D Bounding Box example |
| `service_keypoint` | `assets/images/services/service_keypoint.jpg` | Dịch vụ tạo dữ liệu › Keypoint example |
| `service_satellite_1` | `assets/images/services/service_satellite_1.jpg` | Dịch vụ tạo dữ liệu › Satellite image of an airport |
| `service_satellite_2` | `assets/images/services/service_satellite_2.jpg` | Dịch vụ tạo dữ liệu › Annotated satellite image |
| `service_collection_lidar` | `assets/images/services/service_collection_lidar.jpg` | Dịch vụ thu thập dữ liệu |
| `service_collection_dashcam` | `assets/images/services/service_collection_dashcam.jpg` | Dịch vụ thu thập dữ liệu |
| `service_quality_control` | `assets/images/services/service_quality_control.png` | Dịch vụ tạo dữ liệu › Kiểm soát chất lượng |
| `team_event_booth` | `assets/images/team/team_event_booth.jpg` | Đội ngũ › Cơ hội phát triển |
| `team_training_meeting` | `assets/images/team/team_training_meeting.jpg` | Đội ngũ › Cơ hội phát triển |
| `team_japan_visit` | `assets/images/team/team_japan_visit.jpg` | Đội ngũ › Cơ hội phát triển |
| `customer_sony` | `assets/images/customers/customer_sony.png` | Logo khách hàng (Trang chủ, Thành tựu, Tầm nhìn) |
| `customer_subaru` | `assets/images/customers/customer_subaru.png` | Logo khách hàng (Trang chủ, Thành tựu, Tầm nhìn) |
| `customer_denso` | `assets/images/customers/customer_denso.png` | Logo khách hàng (Trang chủ, Thành tựu, Tầm nhìn) |
| `customer_honda` | `assets/images/customers/customer_honda.png` | Logo khách hàng (Trang chủ, Thành tựu, Tầm nhìn) |
| `customer_afeela` | `assets/images/customers/customer_afeela.png` | Logo khách hàng (Trang chủ, Thành tựu, Tầm nhìn) |
| `customer_nikon` | `assets/images/customers/customer_nikon.png` | Logo khách hàng (Trang chủ, Thành tựu, Tầm nhìn) |
| `award_top1_01` | `assets/images/awards/award_top1_01.png` | Thành tựu › Huy hiệu Top 1 (năm: cần xác nhận) |
| `award_top1_02` | `assets/images/awards/award_top1_02.png` | Thành tựu › Huy hiệu Top 1 (năm: cần xác nhận) |
| `award_top1_03` | `assets/images/awards/award_top1_03.png` | Thành tựu › Huy hiệu Top 1 (năm: cần xác nhận) |
| `award_top1_04` | `assets/images/awards/award_top1_04.png` | Thành tựu › Huy hiệu Top 1 (năm: cần xác nhận) |
| `favicon` (nhóm browser_logo) | `assets/images/branding/favicon.ico`, `browser_logo_32.png`, `browser_logo_180.png` | Biểu tượng tab / iPhone |

## Nguồn gốc ảnh
Trích từ PowerPoint. Ảnh icon timeline (xe, thẻ tag, tàu điện…) là clip-art có nguồn từ mạng (Vecteezy, Noun Project, Pngtree…) – **cần kiểm tra bản quyền** hoặc thay bằng icon tự thiết kế/được cấp phép trước khi công khai. Ảnh khách hàng là logo thương hiệu: cần được phép sử dụng.
