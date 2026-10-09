# Bắt đầu một phiên làm việc mới

## Cách nhanh nhất
1. Mở thư mục dự án trong VS Code → Copilot Chat → chế độ **Agent** → **chat mới**.
2. Gõ `/session-start` rồi Enter. Agent sẽ đọc `AGENTS.md`, `docs/work/current-work.md`, `docs/work/decisions-and-open-questions.md` và báo lại: đang ở đâu, việc tiếp theo, các điểm cần bạn quyết định.
3. Sau đó chạy prompt của bước tiếp theo (xem `current-work.md`, ví dụ `/r3-03-home`).

## Nếu không có lệnh `/` — dán prompt này
```text
Start a work session on this project.
1. Read AGENTS.md, docs/README.md, docs/work/current-work.md and docs/work/decisions-and-open-questions.md.
2. Report in at most 12 lines: what is done, what is the next step, which prompt/command to run for it, and which open questions block it.
3. Do NOT change any file in this step.
Then wait for my instruction.
```

## Quy ước cho mỗi phiên
- Một bước = một chat mới. Xong bước: kiểm tra **Definition of done** → `git commit` → bước tiếp.
- Sau mỗi bước Agent tự tích ô trong `current-work.md`; nếu quên, nhắc: "Update docs/work/current-work.md".
- Quyết định mới (đổi hướng, câu trả lời của bạn cho câu hỏi mở) → ghi vào `decisions-and-open-questions.md` để phiên sau không phải hỏi lại.
- Có lỗi: dùng `/fix-bug`. Thêm khối nội dung: `/add-content-block`. Thêm vị trí ảnh: `/add-image-slot`.
