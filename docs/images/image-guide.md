# Hướng dẫn thay ảnh

## Cấu trúc thư mục ảnh (mỗi trang một thư mục)
```
assets/images/
  home/ about/ services/ team/ achievements/ vision/ news/ recruits/ contact/ subaru/   ← ảnh của từng trang
  common/        ← dùng chung: logo (2 bản: nền sáng / nền tối), favicon, ảnh chia sẻ, chứng nhận ISO, nền sóng
  _unused/       ← ảnh đã bỏ khỏi web (không dùng, không đưa lên mạng)
```
Tên file = tên slot = `<trang>_<mục>_<mã>`. Tra tên và nơi dùng ở **`image-slots.md`**.

## Thay một ảnh (cách nhanh)
1. Tìm slot trong `image-slots.md` (ví dụ `team_org_image`).
2. Chuẩn bị ảnh mới, đổi tên **đúng tên file cũ** (cả đuôi `.jpg`/`.png`), chép đè vào `assets/images/team/`.
3. Nếu là ảnh giữ chỗ: mở `content/images.json` → slot đó → `"placeholder": false`; sửa `alt` 3 ngôn ngữ nếu cần.
4. `Ctrl+F5` để làm mới.

## Kích thước & dung lượng khuyến nghị
| Loại | Gợi ý | Dung lượng |
|---|---|---|
| Banner trang (`*_banner`, `subaru_hero`) | 1920×600 – 1920×800 | < 300 KB |
| Ảnh chính / ảnh dải chạy ngang (`*_strip_*`) | 1200×675 (16:9) | < 200 KB |
| Ảnh minh họa hàng ảnh–chữ (Subaru, Dịch vụ) | 1200×800 | < 200 KB |
| Chứng nhận ISO | 600×800 (dọc) | < 150 KB |
| Logo | PNG nền trong suốt, rộng ≥ 800 px | < 100 KB |
Nén miễn phí: https://squoosh.app. Ảnh nền trắng đặt trên nền tối sẽ được đặt trong khung sáng.

## Logo nền tối / nền sáng
`company_logo_on_dark` (chữ trắng) dùng trên nền đen; `company_logo` (chữ đen) dùng trên nền trắng. Khi đổi logo hãy thay **cả hai**.

## Công cụ
`node tools/migrate-images.mjs --dry-run` – xem trước việc di chuyển/đổi tên ảnh. Dùng lệnh `/add-image-slot` để thêm vị trí ảnh mới.
