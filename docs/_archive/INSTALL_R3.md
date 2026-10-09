# Cài đặt Revision 3 (đọc rồi làm theo)

1. **Lưu bản hiện tại:** `git add . && git commit -m "Truoc Revision 3"`.
2. **Giải nén gói này vào thư mục gốc dự án** (chọn *Replace/Ghi đè* khi được hỏi). Các file sau sẽ được **thay mới có chủ đích**: `AGENTS.md`, `README.md`, `CLAUDE.md`, `.github/copilot-instructions.md`, `tools/apply-patch.mjs`. Nội dung `content/*.json` **không bị ghi đè** (chỉ thêm `content/recruits.json`).
3. Mở **Copilot Chat → chế độ Agent → chat mới** → gõ `/r3-00-prepare`. Bước này tự chạy 3 công cụ (sắp xếp docs, chuyển ảnh theo trang, gộp nội dung mới) và sửa các tham chiếu bị sót.
   *Không có lệnh `/`?* Chạy tay trong Terminal: `node tools/reorganize-docs.mjs` → `node tools/migrate-images.mjs` → `node tools/apply-patch.mjs revision3`, rồi dán nội dung bước r3-00 từ `docs/prompts/revision-3-prompts.md`.
4. Kiểm tra, `git commit`, rồi chạy tiếp `/r3-01-theme` … `/r3-11-qa-cleanup` (mỗi bước một chat mới). Tiến độ: `docs/work/current-work.md`.
5. Việc cần bạn quyết định (ISO 27001, SUBARU, người phụ trách thông tin cá nhân…): `docs/work/decisions-and-open-questions.md`.

File này sẽ được tự chuyển vào `docs/_archive/` ở bước 3.
