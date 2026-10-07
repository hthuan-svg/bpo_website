# 02 – Hệ thống thiết kế (Theme)

**Tinh thần:** dễ chịu, hiện đại, "AI tối giản" – nhiều khoảng trắng, chữ lớn rõ, màu nhẹ, chuyển động tinh tế, không rườm rà.

## Quan sát từ brycen.co.jp (ngôn ngữ thiết kế cần kế thừa)
- Nền trắng, bố cục thoáng, phần mở đầu lớn với **câu khẩu hiệu lớn** + hình minh hoạ/ảnh nền.
- Mỗi mục có **tiêu đề song ngữ nhỏ** (vd "Latest News" + tiêu đề), nhãn nhỏ đi kèm.
- Tin tức: **thẻ có nhãn danh mục + ngày dạng `2026.09.25`**, lọc theo tab danh mục, nút "Read More ↗".
- Mũi tên liên kết **↗** thay cho nút nặng; menu nhóm Company / Services / News / Recruit / Contact.
- Ảnh nền hero, khối dịch vụ dạng thẻ lớn; footer có SNS, địa chỉ, link chính sách.

> Lưu ý: các mã màu/cỡ chữ bên dưới là **đề xuất** dựa trên logo và quan sát bố cục; tôi không đọc được CSS gốc. Prompt 2 có bước đối chiếu bằng mắt.

## Design tokens (đặt trong `assets/css/tokens.css`)
```css
:root{
  /* Màu thương hiệu – lấy từ logo (#7BBE35) */
  --brand-500:#7BBE35;   /* xanh lá chính */
  --brand-600:#5E9A24;   /* hover / chữ link trên nền sáng (đạt tương phản) */
  --brand-100:#EAF5DC;   /* nền nhấn nhẹ */
  --brand-50:#F5FAEE;    /* nền khu vực xen kẽ */
  --accent-500:#1FA7A0;  /* xanh ngọc – điểm nhấn công nghệ (dùng ít) */

  --ink-900:#0E1A12;     /* chữ chính (xanh đen) */
  --ink-700:#2B3A30;
  --ink-500:#5A6B5F;     /* chữ phụ */
  --line:#E3EBDD;        /* đường viền */
  --bg:#FFFFFF;  --bg-soft:#F7FAF4;

  --radius-s:8px; --radius-m:16px; --radius-l:28px;
  --shadow-s:0 1px 2px rgba(14,26,18,.06),0 4px 12px rgba(14,26,18,.05);
  --shadow-m:0 8px 30px rgba(14,26,18,.10);

  --space-1:4px; --space-2:8px; --space-3:16px; --space-4:24px; --space-5:40px; --space-6:72px; --space-7:120px;
  --container:1200px;
  --ease:cubic-bezier(.2,.7,.2,1);
}
```
Dự phòng tương phản: chữ trắng trên `--brand-500` **không đạt** AA → nút xanh dùng chữ `--ink-900`, hoặc nền `--brand-600` với chữ trắng.

## Chữ
| Vai trò | Font (có dự phòng) |
|---|---|
| Tiêu đề & thân | `"Inter","Be Vietnam Pro","Noto Sans JP",system-ui,"Segoe UI","Hiragino Sans","Yu Gothic",sans-serif` |
- Tải qua Google Fonts với `display=swap`; **hoặc** tải font về `assets/fonts/` (khuyến nghị nếu mạng nội bộ/không ổn định).
- Cỡ chữ co giãn: `clamp()`. Tiêu đề hero ≈ `clamp(2.2rem, 5vw, 4.2rem)`, thân 16–18 px, `line-height` 1.7 (tiếng Nhật/Việt cần thoáng hơn).
- Tiếng Nhật: `word-break: keep-all; line-break: strict;`. Không in nghiêng chữ Nhật.

## Thành phần giao diện
| Thành phần | Mô tả |
|---|---|
| Header | Cao 72px, trắng mờ (`backdrop-filter`), logo trái, menu giữa, nút ngôn ngữ phải; co lại khi cuộn |
| Nút ngôn ngữ | 3 nút nhỏ `VI · EN · 日本語`, nút đang chọn nền `--brand-100`; có `aria-pressed` |
| Hero | `background_main` + lớp phủ trắng/xanh nhạt dần (gradient), tiêu đề lớn, 2 nút (chính/phụ), thanh số liệu bên dưới |
| Section | Nhãn nhỏ viết hoa (eyebrow) + tiêu đề + đoạn dẫn; cách nhau `--space-7` |
| Card | Bo `--radius-m`, viền `--line`, bóng nhẹ; hover nâng 4px + mũi tên ↗ trượt |
| Stat | Số rất lớn (đếm tăng khi cuộn vào màn hình) + nhãn nhỏ |
| Timeline | Dọc trên mobile, ngang trên desktop; mỗi mốc có icon `timeline_YYYY` |
| Logo khách hàng | Hàng logo xám nhạt (`filter:grayscale(1)`), hover trả màu |
| Tin tức | Thẻ: ảnh, nhãn danh mục, ngày `YYYY.MM.DD`, tiêu đề, "Xem thêm ↗" |
| Footer | Nền `--bg-soft`, 3–4 cột |
| Chuyển động | Hiện dần khi cuộn (IntersectionObserver), 300–500 ms; tắt khi `prefers-reduced-motion` |

## Điểm "AI tối giản"
- Hoạ tiết nền: lưới chấm rất nhạt hoặc đường sóng `background_soft`; **không** hiệu ứng neon/tối.
- Dùng đường kẻ mảnh, bo góc lớn, khoảng trắng rộng; tối đa 1 màu nhấn phụ (`--accent-500`).
- Ảnh kỹ thuật (3D/2D/vệ tinh) đặt trong khung bo góc có nhãn nhỏ kiểu "công cụ annotation".

## Responsive
Điểm gãy: `640px`, `960px`, `1280px`. Mobile-first. Chạm tối thiểu 44×44 px.
