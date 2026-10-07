# BRYCEN VIETNAM – BPO Website Kit

Bộ tài liệu + nội dung + hình ảnh để dựng **trang web giới thiệu bộ phận BPO** (Business Process Outsourcing) của Công ty TNHH BRYCEN VIETNAM bằng **VS Code Agent mode** (GitHub Copilot Chat). **Prompt và file quy tắc viết bằng tiếng Anh** để AI hiểu chính xác; nội dung web và tài liệu hướng dẫn người dùng bằng tiếng Việt.

Nội dung gốc trích từ file PowerPoint *"_BPO_Tài_liệu_thuyết_trình_DHKT_2025.pptx"*.

## Trong bộ kit có gì

| Thư mục / file | Tác dụng |
|---|---|
| `AGENTS.md` + `.github/copilot-instructions.md` | Quy tắc dự án **bằng tiếng Anh** cho VS Code Agent (tự động được đọc). `CLAUDE.md` chỉ trỏ tới `AGENTS.md` (nếu dùng Claude Code) |
| `.github/prompts/*.prompt.md` | **Mỗi bước là một lệnh `/…` trong chat Agent** (vd `/01-scaffold-i18n-engine`) |
| `docs/00_QUICKSTART.md` | 10 phút để bắt đầu trong VS Code |
| `docs/01_PROJECT_SPEC.md` | Yêu cầu, sơ đồ trang (các tab), quyết định kỹ thuật |
| `docs/02_DESIGN_SYSTEM.md` | Theme: màu, font, thành phần giao diện (tham chiếu brycen.co.jp) |
| `docs/03_CONTENT_MODEL.md` | Cấu trúc file nội dung và cách gắn dữ liệu vào trang |
| `docs/04_IMAGE_SLOTS.md` | **Bảng 44 vị trí ảnh (47 file)** (background_main, company_logo, browser_logo…) |
| `docs/05_PROMPTS.md` | **Bộ prompt tiếng Anh (bước 0 → 14 + 3 prompt cứu hộ)** – bản đọc/sao chép của các lệnh trên |
| `docs/06_EDITOR_GUIDE.md` | Hướng dẫn cho **người không chuyên** cập nhật nội dung, ảnh, tin tức |
| `docs/07_PUBLISH_CHECKLIST.md` | Kiểm tra trước khi công khai + các cách đưa web lên mạng |
| `content/` | `vi.json`, `en.json`, `ja.json` (nội dung 3 ngôn ngữ), `news.json`, `images.json`, `site.config.json` |
| `assets/images/` | 47 file ảnh/logo đã tách từ PowerPoint, tối ưu và **đặt tên theo vị trí** (3,4 MB) |

## Bắt đầu nhanh

1. Giải nén, mở thư mục này bằng VS Code (`File > Open Folder`).
2. Đọc `docs/00_QUICKSTART.md`.
3. Mở Copilot Chat → chuyển sang chế độ **Agent** → gõ `/00-audit-kit`, rồi lần lượt `/01-…` đến `/13-…`. Mỗi bước có mục *Definition of done* để kiểm tra trước khi sang bước tiếp.

## Việc cần bạn xác nhận (phát hiện khi đọc PowerPoint)

1. **Số nhân sự không khớp:** slide 17 ghi "550 nhân sự (37 chính thức + 523 part-time)" nhưng 37 + 523 = 560. Kit đang dùng **550**. Hãy sửa lại cho đúng ở `content/*.json` (tìm `550`).
2. **Slide "Thông tin liên hệ" (slide 28) trống.** Hãy điền email, điện thoại, địa chỉ vào `content/site.config.json`.
3. **Mảng "Thu thập dữ liệu học cho AI" gần như chưa có trong PowerPoint** (chỉ nhắc LiDAR và camera hành trình). Tôi đã dựng trang với phần đó và đánh dấu `[CẦN BỔ SUNG]` – bạn cần cung cấp quy trình, thiết bị, phạm vi thu thập.
4. **Mô tả ngắn của 6 loại annotation** (3D Segment, 3D Cuboid, 2D Segment, 2D Bounding Box, Keypoint, Vệ tinh) do tôi viết bổ sung theo định nghĩa phổ biến – PowerPoint chỉ có tên và ảnh. Hãy kiểm tra cho khớp thực tế công việc.
5. **Bản dịch tiếng Nhật và tiếng Anh do AI dịch.** Nên nhờ đồng nghiệp bên Brycen JP rà soát bản tiếng Nhật trước khi công khai.
6. **4 huy hiệu Top 1 (`award_top1_01…04`)**: chưa biết năm tương ứng, hãy xác nhận thứ tự và ghi chú năm.
7. **Logo ngang `company_logo.png` chỉ 313×99 px** (độ phân giải thấp, sẽ mờ trên màn hình lớn). Hãy xin file logo gốc (SVG/PNG lớn) từ bộ phận Marketing/Brycen JP rồi ghi đè.
8. **Bảo mật:** PowerPoint đóng dấu *Confidential*, và phần **Notes của slide 4, 5, 7 chứa số liệu doanh thu/nhân sự nội bộ (tiếng Nhật)**. Kit **không** đưa phần Notes đó vào web. Trước khi công khai, xin phép quản lý về: logo khách hàng, số liệu nhân sự, ảnh người thật, giải thưởng. Xem `docs/07_PUBLISH_CHECKLIST.md`.
9. **Màu thương hiệu:** tôi lấy xanh lá `#7BBE35` từ chính logo. Tôi chưa đọc được mã màu CSS thực của brycen.co.jp – Prompt 2 có bước đối chiếu.
