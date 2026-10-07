# 04b – Vị trí ảnh bổ sung (Revision 2)

Bổ sung cho `docs/04_IMAGE_SLOTS.md`. Cách thay ảnh vẫn như cũ: **ghi đè file cùng tên (kể cả đuôi)**.

| Slot | File | Ghi chú |
|---|---|---|
| `vision_usa_map` | `assets/images/backgrounds/vision_usa_map.jpg` | Ảnh thật từ PowerPoint (slide 25) |
| `vision_eu` | `assets/images/placeholders/vision_eu.jpg` | **Ảnh giữ chỗ** – thay bằng ảnh thật |
| `vision_southeast_asia` | `assets/images/placeholders/vision_southeast_asia.jpg` | **Ảnh giữ chỗ** – thay bằng ảnh thật |
| `collection_image_01` | `assets/images/placeholders/collection_image_01.jpg` | **Ảnh giữ chỗ** – thay bằng ảnh thật |
| `collection_image_02` | `assets/images/placeholders/collection_image_02.jpg` | **Ảnh giữ chỗ** – thay bằng ảnh thật |
| `collection_image_03` | `assets/images/placeholders/collection_image_03.jpg` | **Ảnh giữ chỗ** – thay bằng ảnh thật |

## Cách thay ảnh giữ chỗ (placeholder)
1. Chuẩn bị ảnh thật, đặt đúng **tên file và đuôi `.jpg`** như bảng trên, chép đè vào thư mục `assets/images/placeholders/`.
2. Mở `content/images.json`, tìm slot đó, đổi `"placeholder": true` thành `"placeholder": false` (để bỏ khung nét đứt).
3. Sửa `alt` (mô tả ảnh) cho đủ 3 ngôn ngữ nếu cần. Làm mới trình duyệt bằng `Ctrl+F5`.

Kích thước khuyến nghị: ảnh thu thập dữ liệu **1200×800**; ảnh EU / Đông Nam Á **1600×760** (tỉ lệ ngang).
Muốn thêm ảnh thứ 4, 5 cho mục Thu thập dữ liệu: thêm 1 slot vào `images.json` và 1 khối vào `services.collection.gallery` ở **cả 3 file** ngôn ngữ.
