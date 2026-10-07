# 06 – Hướng dẫn cập nhật web (dành cho người không chuyên)

Bạn **không cần biết lập trình**. Mọi thứ bạn thấy trên web đều nằm trong vài file trong thư mục `content/` và `assets/images/`.

> **Quy tắc vàng:** trước khi sửa, hãy chép cả thư mục dự án ra chỗ khác (hoặc dùng `git commit`) để có bản dự phòng. Sửa xong luôn mở web kiểm tra cả 3 ngôn ngữ.

## Cách mở web để xem thử
VS Code → chuột phải `index.html` → **Open with Live Server**.

---

## 1. Sửa một đoạn chữ
1. Mở `content/vi.json` (tiếng Việt).
2. Nhấn `Ctrl+F`, gõ vài từ của đoạn chữ cần sửa để tìm.
3. Chỉ sửa phần **nằm giữa hai dấu nháy kép** sau dấu `:`.
   ```
   "title": "Dữ liệu chất lượng cao cho AI đáng tin cậy",
             ^^^^^^^^^^^^^ chỉ sửa chỗ này, giữ nguyên dấu " , và :
   ```
4. Làm tương tự trong `en.json` (tiếng Anh) và `ja.json` (tiếng Nhật) – **cùng vị trí, cùng tên khóa**.
5. Lưu (`Ctrl+S`), tải lại trang.

**Đừng:** xoá dấu `,` cuối dòng, xoá dấu `"`, hay dùng nháy cong `“ ”`. Muốn xuống dòng trong một đoạn, hỏi trợ lý AI hoặc tách thành 2 đoạn.

## 2. Đổi ảnh
- **Cách nhanh:** đổi tên ảnh mới thành **đúng tên ảnh cũ** (kể cả đuôi) rồi chép đè vào thư mục chứa ảnh cũ. Danh sách tên ở `docs/04_IMAGE_SLOTS.md`. Ví dụ đổi ảnh nền trang chủ: chép đè `assets/images/backgrounds/background_main.jpg`.
- Tải lại trang bằng `Ctrl+F5`.
- Mẹo: ảnh nên nhẹ (< 300 KB) – nén tại https://squoosh.app.
- Đổi logo công ty: `assets/images/branding/company_logo.png`. Đổi biểu tượng tab trình duyệt: `browser_logo.png`, `browser_logo_32.png`, `browser_logo_180.png`, `favicon.ico`.

## 3. Đăng tin mới (cập nhật nhanh)
1. Mở `content/news.json`.
2. Sao chép nguyên khối có `"id": "_template"` (từ `{` đến `}` tương ứng), dán ngay phía dưới một khối khác, nhớ có **dấu phẩy** giữa các khối.
3. Sửa: `id` (chữ thường, không dấu, không khoảng trắng, không trùng), `date`, `category`, `image` (tên slot ảnh), `title` và `summary` cho **cả 3 ngôn ngữ**.
4. Đổi `"hidden": true` thành `"hidden": false`.
5. Lưu, tải lại. Tin mới nhất tự lên đầu.
- Có bài viết gốc/bài Facebook? Điền vào `link` / `facebook_post`.
- Muốn ẩn tạm một tin: đặt `"hidden": true`.
- **Cách dễ hơn:** dùng công cụ `admin/index.html` (nếu đã làm Prompt 10) – điền form, bấm Lưu.

Danh mục hợp lệ: `announcement` (thông báo), `event` (sự kiện), `award` (giải thưởng), `project` (dự án), `recruit` (tuyển dụng), `media` (truyền thông).

## 4. Điền thông tin liên hệ & mạng xã hội
Mở `content/site.config.json`:
```
"social": { "facebook": "https://www.facebook.com/<trang-cua-ban>", "youtube": "", ... }
"facebookPagePlugin": { "enabled": true, "pageUrl": "https://www.facebook.com/<trang-cua-ban>", "height": 600 }
"contact": { "email": "bpo@...", "phone": "...", "address": { "vi": "...", "en": "...", "ja": "..." } }
```
Để trống `""` = web tự ẩn mục đó. Muốn khung Facebook hiện ở trang Tin tức, Trang Facebook phải **công khai**.

## 5. Thêm một mục mới (ví dụ thêm dự án, thêm loại annotation)
Mỗi danh sách (`[...]`) trong JSON là một dãy các khối `{...}`. Sao chép một khối có sẵn, dán sau nó (nhớ dấu phẩy), sửa nội dung ở **cả 3 ngôn ngữ**. Trang tự hiển thị thêm.
Nếu cần dạng khối hoàn toàn mới, dùng lệnh `/add-content-block` trong khung chat của VS Code Agent (xem `docs/05_PROMPTS.md`).

## 6. Kiểm tra trước khi đăng
Chạy `validate.bat` (bấm đúp) hoặc `node tools/validate-content.mjs`. Nó báo:
- ✖ lỗi phải sửa (thiếu ngôn ngữ, file ảnh không tồn tại, JSON sai cú pháp)
- ⚠ nhắc nhở (còn chữ `[CẦN BỔ SUNG]`)

## 7. Câu hỏi thường gặp
| Hiện tượng | Nguyên nhân thường gặp | Cách xử lý |
|---|---|---|
| Trang trắng / báo "Hãy mở bằng Live Server" | Mở file bằng cách bấm đúp | Dùng Live Server |
| Hiện chữ như `home.hero.title` | Thiếu khóa trong file ngôn ngữ | Chạy `validate.bat` để biết khóa nào |
| Sửa xong không đổi | Trình duyệt giữ bản cũ | `Ctrl+F5` |
| Toàn bộ chữ biến mất | File JSON sai cú pháp (thiếu/thừa `,` `"`) | VS Code gạch đỏ chỗ lỗi; hoặc quay lại bản `git`/bản sao lưu |
| Ảnh vẫn là ảnh cũ | Sai tên/đuôi file khi ghi đè | Tên phải trùng khít (`.jpg` ≠ `.jpeg` ≠ `.png`) |
| Chia sẻ Facebook ra tiếng Việt dù đang xem tiếng Nhật | Facebook không chạy JavaScript nên đọc thẻ tĩnh | Bình thường, xem Prompt 14 nếu cần chia theo ngôn ngữ |
| Quay lại bản trước | — | `git log` rồi `git checkout <mã> -- content/` hoặc nhờ AI hướng dẫn |

## 8. Thêm/sửa bản dịch tiếng Nhật
Bản dịch ban đầu do AI tạo. Hãy nhờ đồng nghiệp bên Brycen JP đọc lại, sửa trực tiếp trong `content/ja.json`.
