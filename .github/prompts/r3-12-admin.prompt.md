---
description: "Rebuild the admin tool around News and Recruitment: easy add / edit / hide / delete with simple inputs."
agent: agent
---
# Admin tool: News + Recruitment

Follow AGENTS.md. Specs: docs/overview/page-specs.md (News, Recruitment), docs/content/content-model.md (news.json and recruits.json schemas), docs/overview/design-system.md (black + green theme).
This is an UPDATE of an existing admin tool (admin/index.html, built in an earlier step): read it first, keep what works, and rebuild its main screens around News and Recruitment. Scope: ONLY this step. Do not run `git commit`. Do not change the real content of content/news.json or content/recruits.json except for the temporary test items below, which you must remove again.

GOAL
admin/index.html (single file, plain HTML/CSS/JS, no external libraries, no network calls) is a LOCAL tool for non-technical staff to ADD, EDIT, HIDE and DELETE News posts and Recruitment posts with simple inputs. It runs from Live Server at http://127.0.0.1:5500/admin/ and must never be deployed (keep admin/ and content/_backup_admin/ in .deployignore and robots.txt Disallow). Show a clear warning banner at the top (Vietnamese): "Trang quản trị – chỉ dùng trên máy của bạn, không đưa lên mạng."
All admin labels are in Vietnamese (use the exact labels below); every field has a one-line hint underneath. Big buttons, large click targets, responsive, black + green theme from tokens (admin may inline the token values since it is a single file).

1. CONNECT TO THE PROJECT
- Step box "Bước 1: Chọn thư mục dự án" with a big button "Chọn thư mục". Use the File System Access API (showDirectoryPicker, Chrome/Edge). Store the directory handle in IndexedDB so next visits only need "Cho phép lại" (re-grant permission). Verify the folder is the project (content/news.json and content/images.json exist) and show a friendly error otherwise.
- Load content/news.json, content/recruits.json, content/images.json, content/site.config.json (recruits.autoCloseByDeadline) and content/vi.json (news.categories labels).
- Browsers without the API (Firefox/Safari): show "Trình duyệt này không ghi trực tiếp được. Hãy dùng Chrome hoặc Edge." plus a fallback: "Mở file" to load news.json / recruits.json, edit, then "Tải về" the edited file with a note saying which folder to overwrite it in.

2. MAIN SCREEN
- Two main tabs: "Tin tức" and "Tuyển dụng" (default Tin tức). The old Content / Images / Settings tools stay available, untouched, inside a collapsed "Nâng cao ▾" menu.
- Each tab shows: a green button "+ Thêm tin mới" / "+ Thêm tin tuyển dụng"; a search box; for recruitment a filter "Tất cả | Đang mở | Đã đóng | Nháp"; for news a filter by category; then the list sorted by date, newest first.
- List row/card: date (YYYY.MM.DD), title (Vietnamese, fallback to English/Japanese), status chip, small thumbnail, language completeness dots (VI/EN/JA ✔ or ⚠), and buttons: "Sửa", "Ẩn"/"Hiện", "Nhân bản", "Xóa", "Xem trên website" (opens ../news.html?id=… or ../recruits.html?id=… in a new tab).
- Status chips — news: "Đang hiển thị", "Nháp (đang ẩn)". Recruitment: "Đang mở", "Đã đóng", "Tự đóng (quá hạn)" (when deadline is past and autoCloseByDeadline is true), "Nháp (đang ẩn)".
- Items whose id starts with "_" (templates) are shown in a collapsed section "Mẫu (không hiện trên website)" and can be duplicated but never deleted or edited in place.
- Recruitment extras: one-click "Đóng tin" / "Mở lại" button on each row that toggles status (with a toast "Đã đóng tin …").

3. NEWS FORM ("Thêm tin mới" / "Sửa tin") — a side panel or modal
Fields (label — hint): "Ngày đăng" date picker, default today · "Loại tin" dropdown from news.categories (Thông báo, Sự kiện, Giải thưởng, Dự án, Tuyển dụng, Truyền thông) · "Tiêu đề" and "Tóm tắt (1–2 câu)" in three side-by-side language tabs "Tiếng Việt | English | 日本語", each tab marked ✔ when filled and ⚠ when empty · "Ảnh" = either choose an existing slot from a dropdown with live preview, or "Tải ảnh mới" (see 5) · "Link bài gốc" (optional URL) · "Link bài Facebook" (optional URL) · switch "Hiển thị trên website" (off = draft, hidden:true).
Buttons: "Lưu" (keeps current visibility), "Lưu nháp", "Đăng" (sets hidden:false), "Hủy".
Id: auto-generated, never typed by the user: yyyy-mm-<ascii-kebab-slug-of-Vietnamese-title> (strip diacritics, lowercase, max 60 chars), unique (append -2, -3…), never changed after creation.

4. RECRUITMENT FORM ("Thêm tin tuyển dụng" / "Sửa tin")
Fields: big two-button toggle "Trạng thái: [Đang mở] [Đã đóng]" · "Ngày đăng" date picker (default today) · "Hạn nộp hồ sơ" date picker (optional; hint: "Quá hạn, website tự hiện Đã đóng") · "Vị trí tuyển dụng" (title, 3 language tabs) · "Mô tả ngắn" (summary, 3 tabs) · "Địa điểm" (3 tabs, default copied from the previous post) · "Hình thức" dropdown presets: Toàn thời gian / Bán thời gian / Thực tập / Hợp đồng — each fills the matching vi/en/ja strings (Full-time, Part-time, Internship, Contract; 正社員, パート, インターン, 契約社員) · "Chi tiết công việc" large textarea per language (hint: "Cách nhau một dòng trống = một đoạn; có thể ghi: Mô tả công việc, Yêu cầu, Quyền lợi") · "Ảnh" (existing slot dropdown, default recruits_default, or upload) · "Link / email ứng tuyển" (optional; website falls back to contact.email) · switch "Hiển thị trên website".
Buttons: "Lưu", "Lưu nháp", "Đăng", "Hủy". Same auto id rule (prefix with yyyy-mm).

5. IMAGES
- "Tải ảnh mới": accept jpg/png/webp up to 8 MB; resize client-side to max 1600 px wide and re-encode JPEG quality 0.85 with canvas; show preview and the final size in KB.
- News image is saved to assets/images/news/news_<yyyy>_<mm>_<slug>.jpg; recruitment image to assets/images/recruits/recruits_<yyyy>_<mm>_<slug>.jpg. The slot id equals the file name without extension. Add the slot to content/images.json (src, alt in vi/en/ja = the item title per language with Vietnamese fallback, placeholder:false). Never overwrite an existing file without a confirm dialog.

6. SAVING, SAFETY, UNDO
- Validate inline with friendly messages: date required and valid; Vietnamese title required; URLs valid when present; "Đăng"/"Hiển thị" requires the three languages — if some are missing offer "Đăng với nội dung tiếng Việt cho ngôn ngữ còn thiếu" (the site falls back to Vietnamese) or "Lưu nháp".
- Before every write re-read the target file; if it changed since loading (lastModified) ask "File đã bị thay đổi bên ngoài – tải lại?" instead of overwriting.
- Before every write create a backup content/_backup_admin/<file>-<timestamp>.json (keep the newest 20 per file). Button "Hoàn tác lần lưu gần nhất" restores the latest backup of the current tab's file (with confirm).
- Write pretty-printed JSON (indent 2, UTF-8, Vietnamese/Japanese unescaped, trailing newline); keep "_readme", unknown keys and "_" template items exactly as they are; re-validate the JSON after writing; show a toast "Đã lưu ✔" or a clear error.
- DELETE: confirm dialog "Xóa “<title>”? Không thể khôi phục từ giao diện (có thể hoàn tác lần lưu gần nhất)." with three buttons "Xóa", "Chỉ ẩn thay vì xóa", "Hủy". If the item's image was uploaded through admin and no other item uses that slot, ask whether to also retire the image: move it to assets/images/_unused/<…> and remove the slot from images.json (never hard-delete files).
- Escape all user text when rendering (no innerHTML with raw content); no eval; no external requests; no secrets.
- After a successful save show a small hint: "Đã sửa file content/news.json. Hãy commit/đăng tải lại website để người xem thấy thay đổi." (adjust wording per file).

7. DOCS AND TOOLS
- A Vietnamese draft guide exists at docs/content/admin-guide.md: update it so it matches the final screens and labels exactly.
- Add a row for this step to the table in docs/work/current-work.md, a short "Admin" section to docs/overview/page-specs.md, and a pointer to the guide in docs/content/editing-guide.md.
- Make sure .deployignore and robots.txt exclude admin/ and content/_backup_admin/, and that tools/validate-content.mjs ignores content/_backup_admin/.

8. TEST (then clean up)
Using `node tools/serve.mjs` (start it in the background and stop it when done) and a headless browser if available, otherwise by careful code review plus a Node script that exercises the pure functions (slug, id uniqueness, validation, JSON serialisation, status/auto-close logic): (a) add a news post and a recruitment post in all three languages, (b) edit them, (c) hide/show, (d) close/reopen the job, (e) duplicate, (f) delete (including the image retire path), (g) undo the last save. Verify content/news.json and content/recruits.json stay valid, `node tools/validate-content.mjs` shows no ✖, and news.html / recruits.html show the items correctly. Then REMOVE every test item, test image and test backup so the content files are exactly as before. Report what you could not test.

Finish: update docs/work/current-work.md. Reply with (1) files changed, (2) how I verify, (3) assumptions, (4) open issues — then STOP and wait for me.

## Definition of done
- Opening http://127.0.0.1:5500/admin/ shows two tabs (Tin tức, Tuyển dụng); a non-technical person can add, edit, hide, close/reopen, duplicate and delete posts using only the labelled inputs.
- Every save creates a backup, can be undone, and leaves news.json / recruits.json valid; admin is excluded from deployment.
