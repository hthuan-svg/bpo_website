# Tiến độ công việc (cập nhật sau mỗi bước)

## Đã hoàn thành
- [x] Bộ kit gốc + bước 0–12 (khung web, i18n, theme cũ, các trang, tin tức, admin, SEO, validator)
- [x] Revision 2 (`r2-00`…`r2-08`): tab menu, BPO lockup, trang Tạo dữ liệu, QC, Đội ngũ, Tầm nhìn, nút lên đầu trang
- [x] Why BRYCEN BPO follow-up: replace Operating flow with five vertically stacked principles cards and a left-side image
- [x] Why BRYCEN BPO follow-up: show the full Japan image as a faded, uncropped background in the People trained section
- [x] Why BRYCEN BPO follow-up: remove the BRYCEN GROUP caption
- [x] Why BRYCEN BPO follow-up: add a Contact us CTA at the bottom
- [x] Why BRYCEN BPO follow-up: center the People section background image
- [x] Why BRYCEN BPO follow-up: add a little vertical space to the People section
- [x] Why BRYCEN BPO follow-up: move work process, quality control, and information security under Our Principles
- [x] Why BRYCEN BPO follow-up: split work process, quality control, and information security into separate sections styled like Our Principles
- [x] Why BRYCEN BPO follow-up: rename the public page label in all languages
- [x] Why BRYCEN BPO follow-up: add 10+ years, Japan No. 1 for five consecutive years, and 235+ completed project metrics
- [x] Why BRYCEN BPO follow-up: include the 550 team members metric in the Organization highlight cards
- [x] Why BRYCEN BPO follow-up: rename Organization structure to Our Organization in all languages
- [x] Why BRYCEN BPO follow-up: rename How we work to Our work in all languages
- [x] Why BRYCEN BPO follow-up: rename Quality control and Information security headings and remove their image borders
- [x] Why BRYCEN BPO follow-up: place the quality control image left of its cards
- [x] Why BRYCEN BPO follow-up: place the Our work image to the right of its cards
- [x] Rename the Why BRYCEN BPO page route, content namespace, image folder, slots, styles, and code references from team to why_bpo
- [x] Why BRYCEN BPO follow-up: match the quality control image styling to the Our Principles image
- [x] Why BRYCEN BPO follow-up: size the quality control image to match the card column
- [x] Why BRYCEN BPO follow-up: remove the Quality principles heading above the quality control cards
- [x] Why BRYCEN BPO follow-up: move information security content directly below its section title
- [x] Why BRYCEN BPO follow-up: set information security certification names to dark text
- [x] Why BRYCEN BPO follow-up: center and narrow the People gallery to match the timeline content cards
- [x] Why BRYCEN BPO follow-up: place the People gallery slides inside a bordered card box
- [x] Why BRYCEN BPO follow-up: use dedicated Why BRYCEN BPO image slots for quality control and information security
- [x] Why BRYCEN BPO follow-up: set Our work and Our information security sections to black backgrounds
- [x] Why BRYCEN BPO follow-up: set Our Principles and Our quality control sections to gray backgrounds
- [x] Why BRYCEN BPO follow-up: remove BPO Japan and identify BRYCEN BPO as Vietnam in the Our work introduction
- [x] Why BRYCEN BPO follow-up: remove the Vietnam parenthetical from the Our work introduction in all languages
- [x] Why BRYCEN BPO follow-up: make the Our Organization section follow the background image's 16:9 shape

## Đang làm — Revision 3 (cập nhật & tinh chỉnh theo từng trang)
Chạy theo thứ tự. Mỗi bước: chat mới → kiểm tra Definition of done → `git commit`.
| ✓ | Lệnh | Nội dung | Yêu cầu |
|---|---|---|---|
| [x] | `/r3-00-prepare` | Dọn docs, chuyển ảnh theo trang, gộp nội dung mới, sửa tham chiếu | 2 |
| [x] | `/r3-01-theme` | Theme đen–xanh toàn site | 1 |
| [x] | `/r3-02-header-footer` | Footer có địa chỉ, bỏ "skip", tab Tuyển dụng | 3 |
| [x] | `/r3-03-home` | Trang chủ: hero tách đôi, ảnh chỉ số, dải ảnh sản phẩm, ISO, Đối tác SUBARU | 5 |
| [x] | `/r3-04-subaru` | Trang SUBARU | 6 |
| [x] | `/r3-05-about` | Giới thiệu: timeline, 2 văn phòng, đa quốc gia | 7 |
| [x] | `/r3-06-services` | Dịch vụ: side-nav, ứng dụng lên trước, dải ảnh, chất lượng, bảo mật + ISO | 12 |
| [x] | `/r3-07-why-bpo` | Vì sao chọn BRYCEN BPO | 8 |
| [x] | `/r3-08-achievements-vision` | Thành tựu, Tầm nhìn (growth timeline) | 9, 10 |
| [x] | `/r3-09-recruits` | Trang Tuyển dụng | 4 |
| [x] | `/r3-10-contact` | Trang Liên hệ (biểu mẫu + chính sách) | 11 |
| [ ] | `/r3-11-qa-cleanup` | Kiểm tra toàn bộ, xóa khóa cũ, đồng bộ docs | – |
| [ ] | `/r3-12-admin` | Công cụ cục bộ quản lý tin tức và tuyển dụng | Hoàn tất tải ảnh, retire ảnh, và kiểm thử luồng thao tác |

## Việc còn lại sau Revision 3
- [ ] Nhập thông tin thật: `site.config.json` (email, điện thoại, địa chỉ, Facebook, form endpoint) — xem `docs/release/contact-form-setup.md`
- [ ] Thay các ảnh giữ chỗ (`⚠ placeholder` trong validator) — xem `docs/images/image-slots.md`
- [ ] Điền `[CẦN BỔ SUNG]` (người phụ trách thông tin cá nhân, nội dung Thu thập dữ liệu…)
- [ ] Giải quyết các câu hỏi trong `decisions-and-open-questions.md`
- [ ] `docs/release/publish-checklist.md`
- [ ] Đóng gói & đưa lên mạng: `/deploy-package`
- [ ] (Tuỳ chọn) Prerender cho SEO: xem `docs/prompts/helper-prompts.md`
