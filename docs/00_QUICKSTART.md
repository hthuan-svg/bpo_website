# 00 – Bắt đầu nhanh (VS Code)

## Cài đặt (làm 1 lần)
1. **VS Code** – https://code.visualstudio.com
2. Extension trong VS Code:
   - **Live Server** (Ritwick Dey) – xem trước web, tự tải lại khi lưu.
   - **GitHub Copilot Chat** (đã gồm **Agent mode**) – trợ lý AI chạy các prompt. Cần đăng nhập tài khoản GitHub có Copilot.
   - *(Tuỳ chọn)* **Prettier**, **Code Spell Checker**.
3. **Git** – https://git-scm.com (để lưu lịch sử, quay lại khi sửa nhầm).
4. **Node.js LTS** – https://nodejs.org (chỉ dùng cho script kiểm tra `tools/validate-content.mjs`).

## Mở dự án
1. Giải nén bộ kit → `File > Open Folder` → chọn thư mục `brycen-bpo-website-kit`.
2. Mở Terminal (`Ctrl+``) và chạy:
   ```
   git init
   git add .
   git commit -m "Khoi tao bo kit"
   ```
3. Mở `docs/05_PROMPTS.md`, bắt đầu từ **Prompt 0**.

## Cách chạy mỗi bước (Agent mode)
1. Mở khung **Copilot Chat**, ở ô chọn chế độ chuyển sang **Agent**.
2. Mở **chat mới** cho mỗi bước. Gõ `/` rồi chọn lệnh, ví dụ `/00-audit-kit`, nhấn Enter. (Các lệnh này là các *prompt file* trong `.github/prompts/`; muốn đọc nội dung thì mở `docs/05_PROMPTS.md`.)
3. Agent tự đọc `AGENTS.md`/`.github/copilot-instructions.md`. Nó có thể xin phép chạy lệnh terminal – chỉ nên chấp nhận lệnh `node tools/...` hoặc `curl` tới máy cục bộ.
4. Xong, kiểm tra mục *Definition of done*: chuột phải `index.html` → **Open with Live Server** (hoặc chạy `node tools/serve.mjs` rồi mở http://localhost:5500).
5. Hài lòng thì lưu mốc: `git add . && git commit -m "Xong buoc NN"`. Chưa ổn thì dùng `/fix-bug` – **đừng** sang bước sau.
6. Bước `/00-audit-kit` chỉ đọc, không sửa file – chạy đầu tiên để chắc bộ kit đầy đủ.

## Lưu ý quan trọng
- Phải mở web qua **Live Server** (địa chỉ `http://127.0.0.1:5500`), **không** bấm đúp mở file `.html` – vì trình duyệt chặn đọc file `.json` khi mở trực tiếp.
- Đừng đổi tên file/thư mục trong `content/` và `assets/images/` nếu không cần.
