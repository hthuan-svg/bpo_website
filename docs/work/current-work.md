# Tiến độ công việc (cập nhật sau mỗi bước)

## Đã hoàn thành
- [x] Bộ kit gốc + bước 0–12 (khung web, i18n, theme cũ, các trang, tin tức, admin, SEO, validator)
- [x] Revision 2 (`r2-00`…`r2-08`): tab menu, BPO lockup, trang Tạo dữ liệu, QC, Đội ngũ, Tầm nhìn, nút lên đầu trang

## Đang làm — Revision 3 (cập nhật & tinh chỉnh theo từng trang)
Chạy theo thứ tự. Mỗi bước: chat mới → kiểm tra Definition of done → `git commit`.
| ✓ | Lệnh | Nội dung | Yêu cầu |
|---|---|---|---|
| [x] | `/r3-00-prepare` | Dọn docs, chuyển ảnh theo trang, gộp nội dung mới, sửa tham chiếu | 2 |
| [x] | `/r3-01-theme` | Theme đen–xanh toàn site | 1 |
| [ ] | `/r3-02-header-footer` | Footer có địa chỉ, bỏ "skip", tab Tuyển dụng | 3 |
| [ ] | `/r3-03-home` | Trang chủ: hero tách đôi, ảnh chỉ số, dải ảnh sản phẩm, ISO, Đối tác SUBARU | 5 |
| [ ] | `/r3-04-subaru` | Trang SUBARU | 6 |
| [ ] | `/r3-05-about` | Giới thiệu: timeline, 2 văn phòng, đa quốc gia | 7 |
| [ ] | `/r3-06-services` | Dịch vụ: side-nav, ứng dụng lên trước, dải ảnh, chất lượng, bảo mật + ISO | 12 |
| [ ] | `/r3-07-team` | Đội ngũ | 8 |
| [ ] | `/r3-08-achievements-vision` | Thành tựu & Dự án, Tầm nhìn (growth timeline) | 9, 10 |
| [ ] | `/r3-09-recruits` | Trang Tuyển dụng | 4 |
| [ ] | `/r3-10-contact` | Trang Liên hệ (biểu mẫu + chính sách) | 11 |
| [ ] | `/r3-11-qa-cleanup` | Kiểm tra toàn bộ, xóa khóa cũ, đồng bộ docs | – |

## Việc còn lại sau Revision 3
- [ ] Nhập thông tin thật: `site.config.json` (email, điện thoại, địa chỉ, Facebook, form endpoint) — xem `docs/release/contact-form-setup.md`
- [ ] Thay các ảnh giữ chỗ (`⚠ placeholder` trong validator) — xem `docs/images/image-slots.md`
- [ ] Điền `[CẦN BỔ SUNG]` (người phụ trách thông tin cá nhân, nội dung Thu thập dữ liệu…)
- [ ] Giải quyết các câu hỏi trong `decisions-and-open-questions.md`
- [ ] `docs/release/publish-checklist.md`
- [ ] Đóng gói & đưa lên mạng: `/deploy-package`
- [ ] (Tuỳ chọn) Prerender cho SEO: xem `docs/prompts/helper-prompts.md`
