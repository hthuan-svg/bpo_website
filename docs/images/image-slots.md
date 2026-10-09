# Bảng vị trí ảnh (image slots) – theo từng trang

**Quy tắc:** tên slot = tên file (không tính đuôi) = `<trang>_<mục>_<mã>`; file nằm ở `assets/images/<trang>/`. Muốn thay ảnh: **ghi đè file cùng tên** (cùng đuôi). Ảnh giữ chỗ có khung nét đứt – sau khi thay, đặt `"placeholder": false` trong `content/images.json`.
Ảnh đã bỏ khỏi web nằm ở `assets/images/_unused/` (không dùng).

## `common/`  (9 ảnh)

| Slot | File | Dùng ở đâu | Kích thước | Ghi chú |
|---|---|---|---|---|
| `background_soft` | `common/background_soft.png` | Nền sóng mềm | 944×541 |  |
| `browser_logo` | `common/browser_logo.png` | Biểu tượng tab trình duyệt (kèm browser_logo_32/180, favicon.ico) | 512×512 |  |
| `common_iso_27001` | `common/common_iso_27001.jpg` | Chứng nhận ISO/IEC 27001 (Trang chủ + Dịch vụ) | 600×800 | **Ảnh giữ chỗ** |
| `common_iso_9001` | `common/common_iso_9001.jpg` | Chứng nhận ISO 9001:2015 (Trang chủ + Dịch vụ) | 600×800 | **Ảnh giữ chỗ** |
| `company_logo` | `common/company_logo.png` | Header/footer trên nền sáng | 313×99 |  |
| `company_logo_mark` | `common/company_logo_mark.png` | Logo biểu tượng (nền sáng) | 858×912 |  |
| `company_logo_mark_on_dark` | `common/company_logo_mark_on_dark.png` | Hero Trang chủ, nền tối | 858×912 |  |
| `company_logo_on_dark` | `common/company_logo_on_dark.png` | Header, footer, mọi vùng nền tối | 313×99 |  |
| `og_share` | `common/og_share.jpg` | Ảnh khi chia sẻ link (1200×630) | 1200×630 |  |

## `home/`  (13 ảnh)

| Slot | File | Dùng ở đâu | Kích thước | Ghi chú |
|---|---|---|---|---|
| `home_hero_image` | `home/home_hero_image.jpg` | Hero – ảnh bên phải | 2000×926 |  |
| `home_service_collection` | `home/home_service_collection.jpg` | Thẻ dịch vụ: Thu thập dữ liệu | 1200×675 |  |
| `home_service_creation` | `home/home_service_creation.jpg` | Thẻ dịch vụ: Tạo dữ liệu | 1200×675 |  |
| `home_showcase_01` | `home/home_showcase_01.jpg` | Trang chủ – dải ảnh sản phẩm 01 | 1200×675 |  |
| `home_showcase_02` | `home/home_showcase_02.jpg` | Trang chủ – dải ảnh sản phẩm 02 | 1200×675 |  |
| `home_showcase_03` | `home/home_showcase_03.jpg` | Trang chủ – dải ảnh sản phẩm 03 | 1200×675 |  |
| `home_showcase_04` | `home/home_showcase_04.jpg` | Trang chủ – dải ảnh sản phẩm 04 | 1200×675 |  |
| `home_showcase_05` | `home/home_showcase_05.jpg` | Trang chủ – dải ảnh sản phẩm 05 | 1200×675 |  |
| `home_showcase_06` | `home/home_showcase_06.jpg` | Trang chủ – dải ảnh sản phẩm 06 | 1200×675 |  |
| `home_stat_founded` | `home/home_stat_founded.jpg` | Chỉ số: Năm khởi điểm | 800×500 | **Ảnh giữ chỗ** |
| `home_stat_projects` | `home/home_stat_projects.jpg` | Chỉ số: Dự án | 800×500 | **Ảnh giữ chỗ** |
| `home_stat_staff` | `home/home_stat_staff.jpg` | Chỉ số: Nhân sự | 800×500 | **Ảnh giữ chỗ** |
| `home_stat_top1` | `home/home_stat_top1.jpg` | Chỉ số: Top 1 Nhật Bản | 800×500 | **Ảnh giữ chỗ** |

## `about/`  (13 ảnh)

| Slot | File | Dùng ở đâu | Kích thước | Ghi chú |
|---|---|---|---|---|
| `about_global_banner` | `about/about_global_banner.jpg` | Hợp tác đa quốc gia – banner | 1600×760 | **Ảnh giữ chỗ** |
| `about_global_cambodia` | `about/about_global_cambodia.jpg` | Hợp tác đa quốc gia – Cambodia | 1200×800 | **Ảnh giữ chỗ** |
| `about_global_myanmar` | `about/about_global_myanmar.jpg` | Hợp tác đa quốc gia – Myanmar | 1200×800 | **Ảnh giữ chỗ** |
| `about_global_vietnam` | `about/about_global_vietnam.jpg` | Hợp tác đa quốc gia – Việt Nam | 1200×800 | **Ảnh giữ chỗ** |
| `about_office_branch` | `about/about_office_branch.jpg` | Chi nhánh (28 Lý Thường Kiệt) | 669×898 |  |
| `about_office_main` | `about/about_office_main.jpg` | Văn phòng chính (25 Nguyễn Văn Cừ) | 540×350 |  |
| `about_timeline_2015` | `about/about_timeline_2015.png` | Lịch sử – biểu tượng năm 2015 | 384×384 |  |
| `about_timeline_2016` | `about/about_timeline_2016.png` | Lịch sử – biểu tượng năm 2016 | 512×512 |  |
| `about_timeline_2018` | `about/about_timeline_2018.png` | Lịch sử – biểu tượng năm 2018 | 225×225 |  |
| `about_timeline_2019` | `about/about_timeline_2019.png` | Lịch sử – biểu tượng năm 2019 | 400×400 |  |
| `about_timeline_2020` | `about/about_timeline_2020.png` | Lịch sử – biểu tượng năm 2020 | 225×225 |  |
| `about_timeline_2023` | `about/about_timeline_2023.png` | Lịch sử – biểu tượng năm 2023 | 190×190 |  |
| `about_timeline_2025` | `about/about_timeline_2025.png` | Lịch sử – biểu tượng năm 2025 | 175×175 |  |

## `services/`  (44 ảnh)

| Slot | File | Dùng ở đâu | Kích thước | Ghi chú |
|---|---|---|---|---|
| `services_2d_bbox_01` | `services/services_2d_bbox_01.jpg` | Dịch vụ – ảnh chính 2D BBOX 01 | 702×377 |  |
| `services_2d_bbox_strip_01` | `services/services_2d_bbox_strip_01.jpg` | Dịch vụ – dải ảnh chạy ngang 2D BBOX #01 | 1200×675 | **Ảnh giữ chỗ** |
| `services_2d_bbox_strip_02` | `services/services_2d_bbox_strip_02.jpg` | Dịch vụ – dải ảnh chạy ngang 2D BBOX #02 | 1200×675 | **Ảnh giữ chỗ** |
| `services_2d_bbox_strip_03` | `services/services_2d_bbox_strip_03.jpg` | Dịch vụ – dải ảnh chạy ngang 2D BBOX #03 | 1200×675 | **Ảnh giữ chỗ** |
| `services_2d_bbox_strip_04` | `services/services_2d_bbox_strip_04.jpg` | Dịch vụ – dải ảnh chạy ngang 2D BBOX #04 | 1200×675 | **Ảnh giữ chỗ** |
| `services_2d_keypoint_01` | `services/services_2d_keypoint_01.jpg` | Dịch vụ – ảnh chính 2D KEYPOINT 01 | 680×453 |  |
| `services_2d_keypoint_strip_01` | `services/services_2d_keypoint_strip_01.jpg` | Dịch vụ – dải ảnh chạy ngang 2D KEYPOINT #01 | 1200×675 | **Ảnh giữ chỗ** |
| `services_2d_keypoint_strip_02` | `services/services_2d_keypoint_strip_02.jpg` | Dịch vụ – dải ảnh chạy ngang 2D KEYPOINT #02 | 1200×675 | **Ảnh giữ chỗ** |
| `services_2d_keypoint_strip_03` | `services/services_2d_keypoint_strip_03.jpg` | Dịch vụ – dải ảnh chạy ngang 2D KEYPOINT #03 | 1200×675 | **Ảnh giữ chỗ** |
| `services_2d_keypoint_strip_04` | `services/services_2d_keypoint_strip_04.jpg` | Dịch vụ – dải ảnh chạy ngang 2D KEYPOINT #04 | 1200×675 | **Ảnh giữ chỗ** |
| `services_2d_satellite_01` | `services/services_2d_satellite_01.jpg` | Dịch vụ – ảnh chính 2D SATELLITE 01 | 1400×1230 |  |
| `services_2d_satellite_02` | `services/services_2d_satellite_02.jpg` | Dịch vụ – ảnh chính 2D SATELLITE 02 | 1400×1227 |  |
| `services_2d_satellite_strip_01` | `services/services_2d_satellite_strip_01.jpg` | Dịch vụ – dải ảnh chạy ngang 2D SATELLITE #01 | 1200×675 | **Ảnh giữ chỗ** |
| `services_2d_satellite_strip_02` | `services/services_2d_satellite_strip_02.jpg` | Dịch vụ – dải ảnh chạy ngang 2D SATELLITE #02 | 1200×675 | **Ảnh giữ chỗ** |
| `services_2d_satellite_strip_03` | `services/services_2d_satellite_strip_03.jpg` | Dịch vụ – dải ảnh chạy ngang 2D SATELLITE #03 | 1200×675 | **Ảnh giữ chỗ** |
| `services_2d_satellite_strip_04` | `services/services_2d_satellite_strip_04.jpg` | Dịch vụ – dải ảnh chạy ngang 2D SATELLITE #04 | 1200×675 | **Ảnh giữ chỗ** |
| `services_2d_segment_01` | `services/services_2d_segment_01.jpg` | Dịch vụ – ảnh chính 2D SEGMENT 01 | 719×540 |  |
| `services_2d_segment_02` | `services/services_2d_segment_02.jpg` | Dịch vụ – ảnh chính 2D SEGMENT 02 | 719×540 |  |
| `services_2d_segment_strip_01` | `services/services_2d_segment_strip_01.jpg` | Dịch vụ – dải ảnh chạy ngang 2D SEGMENT #01 | 1200×675 | **Ảnh giữ chỗ** |
| `services_2d_segment_strip_02` | `services/services_2d_segment_strip_02.jpg` | Dịch vụ – dải ảnh chạy ngang 2D SEGMENT #02 | 1200×675 | **Ảnh giữ chỗ** |
| `services_2d_segment_strip_03` | `services/services_2d_segment_strip_03.jpg` | Dịch vụ – dải ảnh chạy ngang 2D SEGMENT #03 | 1200×675 | **Ảnh giữ chỗ** |
| `services_2d_segment_strip_04` | `services/services_2d_segment_strip_04.jpg` | Dịch vụ – dải ảnh chạy ngang 2D SEGMENT #04 | 1200×675 | **Ảnh giữ chỗ** |
| `services_3d_bbox_01` | `services/services_3d_bbox_01.jpg` | Dịch vụ – ảnh chính 3D BBOX 01 | 1220×776 |  |
| `services_3d_bbox_02` | `services/services_3d_bbox_02.jpg` | Dịch vụ – ảnh chính 3D BBOX 02 | 1217×773 |  |
| `services_3d_bbox_strip_01` | `services/services_3d_bbox_strip_01.jpg` | Dịch vụ – dải ảnh chạy ngang 3D BBOX #01 | 1200×675 | **Ảnh giữ chỗ** |
| `services_3d_bbox_strip_02` | `services/services_3d_bbox_strip_02.jpg` | Dịch vụ – dải ảnh chạy ngang 3D BBOX #02 | 1200×675 | **Ảnh giữ chỗ** |
| `services_3d_bbox_strip_03` | `services/services_3d_bbox_strip_03.jpg` | Dịch vụ – dải ảnh chạy ngang 3D BBOX #03 | 1200×675 | **Ảnh giữ chỗ** |
| `services_3d_bbox_strip_04` | `services/services_3d_bbox_strip_04.jpg` | Dịch vụ – dải ảnh chạy ngang 3D BBOX #04 | 1200×675 | **Ảnh giữ chỗ** |
| `services_3d_segment_01` | `services/services_3d_segment_01.jpg` | Dịch vụ – ảnh chính 3D SEGMENT 01 | 1213×549 |  |
| `services_3d_segment_02` | `services/services_3d_segment_02.jpg` | Dịch vụ – ảnh chính 3D SEGMENT 02 | 1143×540 |  |
| `services_3d_segment_strip_01` | `services/services_3d_segment_strip_01.jpg` | Dịch vụ – dải ảnh chạy ngang 3D SEGMENT #01 | 1200×675 | **Ảnh giữ chỗ** |
| `services_3d_segment_strip_02` | `services/services_3d_segment_strip_02.jpg` | Dịch vụ – dải ảnh chạy ngang 3D SEGMENT #02 | 1200×675 | **Ảnh giữ chỗ** |
| `services_3d_segment_strip_03` | `services/services_3d_segment_strip_03.jpg` | Dịch vụ – dải ảnh chạy ngang 3D SEGMENT #03 | 1200×675 | **Ảnh giữ chỗ** |
| `services_3d_segment_strip_04` | `services/services_3d_segment_strip_04.jpg` | Dịch vụ – dải ảnh chạy ngang 3D SEGMENT #04 | 1200×675 | **Ảnh giữ chỗ** |
| `services_collection_01` | `services/services_collection_01.jpg` | Thu thập dữ liệu – ô ảnh 1 | 1200×800 | **Ảnh giữ chỗ** |
| `services_collection_02` | `services/services_collection_02.jpg` | Thu thập dữ liệu – ô ảnh 2 | 1200×800 | **Ảnh giữ chỗ** |
| `services_collection_03` | `services/services_collection_03.jpg` | Thu thập dữ liệu – ô ảnh 3 | 1200×800 | **Ảnh giữ chỗ** |
| `services_collection_sample_dashcam` | `services/services_collection_sample_dashcam.jpg` | Ảnh mẫu dashcam (chưa dùng) | 960×565 |  |
| `services_collection_sample_lidar` | `services/services_collection_sample_lidar.jpg` | Ảnh mẫu LiDAR (chưa dùng) | 960×527 |  |
| `services_overview_2d` | `services/services_overview_2d.jpg` | Thẻ dịch vụ 2D | 960×565 |  |
| `services_overview_3d` | `services/services_overview_3d.jpg` | Thẻ dịch vụ 3D | 960×527 |  |
| `services_quality_flow` | `services/services_quality_flow.jpg` | Kiểm soát chất lượng – ảnh diễn giải (bạn thêm) | 1600×900 | **Ảnh giữ chỗ** |
| `services_quality_principles` | `services/services_quality_principles.png` | Kiểm soát chất lượng – ảnh Nguyên tắc (to, giữa trang) | 850×260 |  |
| `services_security_image` | `services/services_security_image.jpg` | Bảo mật thông tin – ảnh minh họa | 1200×800 | **Ảnh giữ chỗ** |

## `team/`  (6 ảnh)

| Slot | File | Dùng ở đâu | Kích thước | Ghi chú |
|---|---|---|---|---|
| `team_japan_country` | `team/team_japan_country.jpg` | Nhân lực đào tạo – ảnh đất nước Nhật Bản | 1600×760 | **Ảnh giữ chỗ** |
| `team_org_image` | `team/team_org_image.jpg` | Cơ cấu bộ phận – ảnh làm việc với khách hàng | 1600×900 | **Ảnh giữ chỗ** |
| `team_people_event` | `team/team_people_event.jpg` | Nhân lực đào tạo – ảnh 3 | 1200×1096 |  |
| `team_people_japan` | `team/team_people_japan.jpg` | Nhân lực đào tạo – ảnh 1 | 719×540 |  |
| `team_people_training` | `team/team_people_training.jpg` | Nhân lực đào tạo – ảnh 2 | 720×540 |  |
| `team_process_image` | `team/team_process_image.jpg` | Quy trình vận hành – ảnh làm việc | 1600×900 | **Ảnh giữ chỗ** |

## `achievements/`  (5 ảnh)

| Slot | File | Dùng ở đâu | Kích thước | Ghi chú |
|---|---|---|---|---|
| `achievements_award_image` | `achievements/achievements_award_image.png` | Thành tựu – ảnh duy nhất (#1) | 450×402 |  |
| `achievements_projects_01` | `achievements/achievements_projects_01.jpg` | Dự án – ảnh minh họa 01 | 1200×800 | **Ảnh giữ chỗ** |
| `achievements_projects_02` | `achievements/achievements_projects_02.jpg` | Dự án – ảnh minh họa 02 | 1200×800 | **Ảnh giữ chỗ** |
| `achievements_projects_03` | `achievements/achievements_projects_03.jpg` | Dự án – ảnh minh họa 03 | 1200×800 | **Ảnh giữ chỗ** |
| `achievements_satisfaction` | `achievements/achievements_satisfaction.jpg` | Độ hài lòng của khách | 1200×800 | **Ảnh giữ chỗ** |

## `vision/`  (6 ảnh)

| Slot | File | Dùng ở đâu | Kích thước | Ghi chú |
|---|---|---|---|---|
| `growth_timeline_image` | `vision/growth_timeline_image.jpg` | Growth timeline – ảnh nền | 2195×2294 |  |
| `vision_direction_image` | `vision/vision_direction_image.jpg` | Định hướng phát triển – ảnh | 1600×760 | **Ảnh giữ chỗ** |
| `vision_roadmap_eu` | `vision/vision_roadmap_eu.jpg` | Growth timeline – EU | 1600×760 | **Ảnh giữ chỗ** |
| `vision_roadmap_japan` | `vision/vision_roadmap_japan.jpg` | Growth timeline – Nhật Bản | 1600×760 | **Ảnh giữ chỗ** |
| `vision_roadmap_sea` | `vision/vision_roadmap_sea.jpg` | Growth timeline – Đông Nam Á | 1600×760 | **Ảnh giữ chỗ** |
| `vision_roadmap_usa` | `vision/vision_roadmap_usa.jpg` | Growth timeline – Hoa Kỳ (bản đồ) | 1372×1002 |  |

## `news/`  (3 ảnh)

| Slot | File | Dùng ở đâu | Kích thước | Ghi chú |
|---|---|---|---|---|
| `news_2026_01_top1` | `news/news_2026_01_top1.jpg` | Tin: Top 1 annotation | 1200×675 |  |
| `news_2026_09_us_dataset` | `news/news_2026_09_us_dataset.jpg` | Tin: dữ liệu lái xe tại Mỹ | 1200×675 |  |
| `news_default` | `news/news_default.jpg` | Tin tức – ảnh mặc định | 1200×675 | **Ảnh giữ chỗ** |

## `recruits/`  (3 ảnh)

| Slot | File | Dùng ở đâu | Kích thước | Ghi chú |
|---|---|---|---|---|
| `recruits_banner` | `recruits/recruits_banner.jpg` | Tuyển dụng – banner | 1920×600 | **Ảnh giữ chỗ** |
| `recruits_default` | `recruits/recruits_default.jpg` | Tuyển dụng – ảnh mặc định của tin | 1200×675 | **Ảnh giữ chỗ** |
| `recruits_intro` | `recruits/recruits_intro.jpg` | Tuyển dụng – ảnh giới thiệu nhân lực | 1200×800 | **Ảnh giữ chỗ** |

## `contact/`  (1 ảnh)

| Slot | File | Dùng ở đâu | Kích thước | Ghi chú |
|---|---|---|---|---|
| `contact_banner` | `contact/contact_banner.jpg` | Liên hệ – banner | 1920×600 | **Ảnh giữ chỗ** |

## `subaru/`  (9 ảnh)

| Slot | File | Dùng ở đâu | Kích thước | Ghi chú |
|---|---|---|---|---|
| `subaru_eyesight_partnership` | `subaru/subaru_eyesight_partnership.jpg` | Subaru – EyeSight: hợp tác BRYCEN VN | 1200×800 | **Ảnh giữ chỗ** |
| `subaru_hero` | `subaru/subaru_hero.jpg` | Subaru – hero | 1920×800 | **Ảnh giữ chỗ** |
| `subaru_intro_global` | `subaru/subaru_intro_global.jpg` | Subaru – Vị thế toàn cầu | 1200×800 | **Ảnh giữ chỗ** |
| `subaru_intro_history` | `subaru/subaru_intro_history.jpg` | Subaru – Lịch sử hình thành | 1200×800 | **Ảnh giữ chỗ** |
| `subaru_logo` | `subaru/subaru_logo.png` | Logo SUBARU (Trang chủ → liên kết subaru.html) | 1200×324 |  |
| `subaru_tech_boxer` | `subaru/subaru_tech_boxer.jpg` | Subaru – Động cơ Boxer | 1200×800 | **Ảnh giữ chỗ** |
| `subaru_tech_eyesight` | `subaru/subaru_tech_eyesight.jpg` | Subaru – EyeSight | 1200×800 | **Ảnh giữ chỗ** |
| `subaru_tech_sawd` | `subaru/subaru_tech_sawd.jpg` | Subaru – S-AWD | 1200×800 | **Ảnh giữ chỗ** |
| `subaru_tech_sgp` | `subaru/subaru_tech_sgp.jpg` | Subaru – SGP | 1200×800 | **Ảnh giữ chỗ** |

## Ảnh phụ không phải slot
`common/browser_logo_32.png`, `common/browser_logo_180.png`, `common/favicon.ico` – thay cả nhóm khi đổi biểu tượng trình duyệt.

## Thêm một vị trí ảnh mới
1. Đặt tên theo quy tắc, ví dụ `home_partner_banner`, lưu `assets/images/home/home_partner_banner.jpg`.
2. Thêm 1 khối vào `content/images.json` (`src`, `alt` đủ vi/en/ja).
3. Dùng slot đó trong nội dung (`"image": "home_partner_banner"`) hoặc HTML (`data-img="home_partner_banner"`). Hoặc dùng lệnh `/add-image-slot`.
