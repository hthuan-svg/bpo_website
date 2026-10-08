# BRYCEN VIETNAM – BPO Website Agent Documentation v3

Bộ tài liệu Markdown dành cho việc phát triển và bảo trì website BPO của BRYCEN VIETNAM bằng VS Code Agent/Copilot Agent hoặc Claude Code.

Website là **static site HTML + CSS + JavaScript**, không được tự ý chuyển sang React/Next/Vue/Vite hoặc thêm build step.

## 1. Mục tiêu của bộ tài liệu v3

v3 hợp nhất:
- quy tắc dự án hiện tại
- các yêu cầu website mới
- các nguyên tắc Revision 2
- hệ thống design/content/image slot
- checklist QA
- prompt triển khai theo từng giai đoạn
- các vấn đề dữ liệu cần xác minh từ bộ tài liệu cũ

Mục tiêu là tạo **một nguồn tài liệu duy nhất**, tránh để Agent đọc nhiều file cũ có nội dung mâu thuẫn.

## 2. Đọc theo thứ tự

1. `AGENTS.md`
2. `docs/README.md`
3. `docs/00-project/PROJECT_CONTEXT.md`
4. `docs/00-project/ARCHITECTURE.md`
5. `docs/00-project/CONVENTIONS.md`
6. File nội dung tương ứng trong `docs/02-content/`
7. Prompt tương ứng trong `docs/04-prompts/`
8. `docs/03-development/QA_CHECKLIST.md`

Không chạy toàn bộ prompt cùng lúc.

## 3. Quy trình triển khai

```text
00-AUDIT
  ↓
01-GLOBAL-THEME
  ↓
02-HOME
  ↓
03-SUBARU
  ↓
04-ABOUT
  ↓
05-TEAM
  ↓
06-ACHIEVEMENTS
  ↓
07-VISION
  ↓
08-CAREERS
  ↓
09-CONTACT
  ↓
10-SERVICES-AI-DATA
  ↓
99-FINAL-QA
```

Mỗi bước:
- đọc tài liệu
- kiểm tra implementation
- thay đổi tối thiểu
- validate
- test trình duyệt
- cập nhật TASKS + CHANGELOG
- dừng

## 4. Điểm quan trọng từ bộ tài liệu cũ

Các vấn đề sau được giữ lại để tránh mất thông tin nguồn:

### Nhân sự
Nguồn cũ có mâu thuẫn:
`550 nhân sự (37 chính thức + 523 part-time)` nhưng 37 + 523 = 560.

Không tự sửa thành 550 hoặc 560.

### Liên hệ
Thông tin email/điện thoại chính thức chưa được xác nhận trong nguồn cũ. Không tạo email giả.

### Dữ liệu thu thập AI
Nguồn gốc chưa đủ để mô tả chi tiết quy trình/thiết bị/phạm vi. Không tự phát minh.

### Mô tả annotation
Các mô tả trước đây có phần được bổ sung theo định nghĩa phổ biến. Cần business review trước khi công khai nếu chưa được duyệt.

### EN/JA
Bản dịch AI cần được nhân sự BRYCEN review.

### Top 1
Năm tương ứng của các badge `award_top1_01...04` chưa được xác nhận. Không đoán.

### Logo
Ưu tiên logo chính thức chất lượng cao/SVG.

### Confidential
Không đưa doanh thu, ngân sách, notes nội bộ hoặc thông tin riêng tư từ tài liệu nội bộ lên website nếu chưa được duyệt.

## 5. Không làm

- Không migrate framework.
- Không hard-code dữ liệu kinh doanh chưa xác minh.
- Không hard-code image path nếu hệ thống slot đang được dùng.
- Không xóa placeholder image slot.
- Không thêm analytics/tracker nếu chưa được cấu hình.
- Không tạo fake contact email.
- Không claim form đã gửi email nếu chưa có delivery backend/service thực tế.
- Không commit git.

## 6. Quy tắc sửa tài liệu

Khi một yêu cầu mới được xác nhận:
1. cập nhật content/design docs liên quan
2. cập nhật prompt nếu cần
3. cập nhật TASKS
4. triển khai
5. QA
6. cập nhật CHANGELOG

## 7. Tài liệu legacy

Các file legacy đã được dùng làm nguồn tham chiếu khi xây v3:
- `docs/01_PROJECT_SPEC.md`
- `docs/02_DESIGN_SYSTEM.md`
- `docs/03_CONTENT_MODEL.md`
- `docs/04_IMAGE_SLOTS.md`
- `docs/05_PROMPTS.md`
- `docs/06_EDITOR_GUIDE.md`
- `docs/07_PUBLISH_CHECKLIST.md`

Không nên giữ các file này song song với v3 nếu nội dung đã được hợp nhất, vì Agent có thể đọc hai nguồn mâu thuẫn.

Nếu một thông tin trong legacy chưa được thể hiện trong v3, hãy bổ sung vào v3 trước khi xóa legacy.
