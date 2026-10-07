# Revision 2 pack – cách cài

Gói này **chỉ chứa file mới**, không ghi đè `content/*.json` hay mã nguồn của bạn.

1. **Lưu mốc hiện tại:** trong VS Code Terminal chạy `git add . && git commit -m "Truoc Revision 2"`.
2. Giải nén gói vào **thư mục gốc dự án** (chọn *merge/hợp nhất* nếu hệ điều hành hỏi). Các thư mục được thêm: `revision2/`, `docs/`, `.github/prompts/`, `tools/apply-patch.mjs`, `assets/images/placeholders/`, `assets/images/backgrounds/vision_usa_map.jpg`.
3. Mở Copilot Chat → chế độ **Agent** → chạy lần lượt (mỗi bước một chat mới):
   `/r2-00-apply-patch` → `/r2-01-header-brand-services` → `/r2-02-annotation-page` → `/r2-03-collection-page` → `/r2-04-quality-control` → `/r2-05-team-page` → `/r2-06-vision-page` → `/r2-07-back-to-top` → `/r2-08-qa-cleanup`.
   (Nếu không thấy lệnh `/`, dùng nội dung trong `docs/10_REVISION_2_PROMPTS.md`.)
4. Xong `r2-08` mới quay lại bước đóng gói `/13-deploy`.

Đọc `docs/09_REVISION_2_SPEC.md` trước (có phần "Những điều tôi đã diễn giải – hãy xác nhận").
Muốn gộp nội dung thủ công không dùng Agent: `node tools/apply-patch.mjs` (thêm `--dry-run` để xem trước).
