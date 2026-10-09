# Cài đặt biểu mẫu liên hệ — thông tin gửi về email của bạn

Web tĩnh **không tự gửi được email**. Có 3 cách; chọn một.

## Cách 1 (khuyến nghị): dịch vụ form-endpoint miễn phí (Formspree, Web3Forms, Getform…)
1. Tạo tài khoản, tạo "form mới", điền **email nhận thông tin** (email của bạn) và xác thực email.
2. Dịch vụ cấp cho bạn một **địa chỉ endpoint** (dạng `https://formspree.io/f/xxxxxxxx`).
3. Mở `content/site.config.json`, điền:
   ```json
   "contact": {
     "email": "bpo@ten-mien-cua-ban",
     "form": { "endpoint": "https://formspree.io/f/xxxxxxxx", "recipientEmail": "email-nhan@ten-mien", "subjectPrefix": "[BPO Website]" }
   }
   ```
4. Lưu, mở trang Liên hệ, gửi thử 1 lần và kiểm tra hộp thư (cả thư rác).
Lưu ý: gói miễn phí có giới hạn số thư/tháng; dữ liệu đi qua máy chủ của dịch vụ đó — cân nhắc theo chính sách bảo mật công ty.

## Cách 2: nút `mailto:` (không cần dịch vụ ngoài)
Để `endpoint` trống. Khi bấm Gửi, web mở ứng dụng email của người dùng với nội dung điền sẵn gửi tới `recipientEmail` (hoặc `contact.email`). Đơn giản nhưng phụ thuộc người dùng có cài ứng dụng email.

## Cách 3: máy chủ của công ty
Nếu IT có máy chủ (PHP/Node/Power Automate/Azure Function): tạo một địa chỉ nhận POST rồi gửi email nội bộ; điền địa chỉ đó vào `endpoint`. Cần bật CORS cho tên miền web, lọc spam (honeypot + giới hạn tần suất) và không ghi log thông tin cá nhân lâu hơn mức cần thiết.

## Kiểm tra sau khi cài
- Gửi 1 biểu mẫu thật → email về đúng địa chỉ.
- Tắt mạng → biểu mẫu báo lỗi thân thiện, có nút mở email dự phòng.
- Xem lại mục "Về việc xử lý thông tin cá nhân" (người phụ trách, link chính sách) trước khi công khai.
