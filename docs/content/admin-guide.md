# Hướng dẫn trang quản trị (Tin tức & Tuyển dụng)

> Trang quản trị – chỉ dùng trên máy của bạn, không đưa lên mạng.

## Mở trang

1. Chạy website bằng VS Code Live Server hoặc `node tools/serve.mjs`.
2. Mở `http://127.0.0.1:5500/admin/` bằng Chrome hoặc Edge.
3. Chọn **Chọn thư mục** và chọn thư mục dự án. Lần sau dùng **Cho phép lại**.

## Tin tức

Trong tab **Tin tức**, dùng **+ Thêm tin mới**. Nhập ngày, loại tin, tiêu đề và tóm tắt bằng Tiếng Việt, English và 日本語; chọn ảnh trong `assets/images/news/` từ các slot đã đăng ký trong `content/images.json`; nhập link bài gốc hoặc Facebook nếu có. Nếu tự chép ảnh vào thư mục, hãy thêm slot vào `content/images.json` trước. Bật **Hiển thị trên website** để đăng. Nút **Lưu tin**, **Lưu bản nháp**, **Ẩn / hiện tin** và **Xóa tin** điều khiển hiển thị. Trong danh sách, **Sửa**, **Ẩn/Hiện**, **Nhân bản**, **Xóa**, và **Xem trên website** tác động lên tin đã chọn.

## Tuyển dụng

Tab **Tuyển dụng** có tìm kiếm và lọc **Tất cả**, **Đang mở**, **Đã đóng**, **Nháp**. Chọn **+ Thêm tin tuyển dụng**, trạng thái **Đang mở** hoặc **Đã đóng**, ngày đăng, hạn nộp, ảnh và link ứng tuyển; nhập vị trí, mô tả, địa điểm, hình thức và chi tiết bằng cả ba ngôn ngữ. Chọn **Lưu**, **Lưu nháp**, hoặc **Đăng**. Mỗi tin có các nút **Sửa**, **Ẩn/Hiện**, **Nhân bản**, **Đóng tin/Mở lại**, **Xóa** và **Xem trên website**. Hạn đã qua được gắn nhãn tự đóng khi cấu hình tự đóng bật.

## Lưu và khôi phục

Mỗi lần lưu trực tiếp tạo bản sao lưu trong `content/_backup_admin/`; giữ tối đa 20 bản cho mỗi file. Khi tab Trang chủ, Tin tức hoặc Tuyển dụng đang mở cùng trình duyệt, nội dung liên quan tự tải lại sau khi lưu. Trong tab Tin tức, **Hoàn tác lần lưu gần nhất** khôi phục tin tức từ bản sao lưu. Sau khi cập nhật, commit và đăng tải lại website để công khai thay đổi. Mục **Nâng cao ▾** chứa công cụ Nội dung, Hình ảnh và Cài đặt cũ.

Firefox và Safari không hỗ trợ ghi trực tiếp: dùng **Mở file**, chỉnh sửa, tải file xuống rồi chép đè file tương ứng trong `content/`.

