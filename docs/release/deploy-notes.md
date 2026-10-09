# Ghi chú đóng gói & triển khai (chưa thực hiện)

Chạy `/deploy-package` sau khi hoàn tất Revision 3 và `docs/release/publish-checklist.md`. Prompt sẽ tạo `docs/release/deploy.md` (3 phương án: GitHub Pages/Cloudflare Pages/Netlify · máy chủ nội bộ Nginx/IIS · tên miền phụ công ty), `.deployignore`, `tools/make-release.mjs` (tạo thư mục `dist/`).
Yêu cầu riêng của dự án: `content/*.json` cache ngắn (≤ 5 phút) để tin tức/tuyển dụng cập nhật nhanh; chặn `/admin/`; bản phát hành loại bỏ `assets/images/_unused/`, `revision*/`, `content/_backup_*`, `docs/`, `tools/`, `.github/`, `AGENTS.md`, `CLAUDE.md`, `README.md`.
