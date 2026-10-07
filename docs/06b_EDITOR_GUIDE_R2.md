# 06b – Hướng dẫn chỉnh sửa (bổ sung cho Revision 2)

Dành cho người không chuyên. Quy tắc chung vẫn như `docs/06_EDITOR_GUIDE.md`: sửa chữ trong `content/*.json` (cả 3 ngôn ngữ), thay ảnh bằng cách ghi đè file cùng tên.

| Tôi muốn… | Làm ở đâu |
|---|---|
| Thêm ảnh cho mục **Thu thập dữ liệu** | Chép đè `assets/images/placeholders/collection_image_01.jpg` (02, 03). Đổi `placeholder` thành `false` trong `content/images.json` |
| Thêm ảnh **EU** / **Đông Nam Á** | Chép đè `assets/images/placeholders/vision_eu.jpg` / `vision_southeast_asia.jpg`, rồi `placeholder: false` |
| Viết chú thích dưới ảnh Thu thập dữ liệu | `services.collection.gallery[...].caption` ở 3 file ngôn ngữ (để trống = không hiện) |
| Đổi cách bố trí ảnh/chữ ở trang "Tạo dữ liệu" | `content/site.config.json` → `layout.annotationRows`: `"image-left"` (ảnh luôn bên trái) hoặc `"zigzag"` (đổi bên xen kẽ) |
| Sửa mô tả từng loại annotation (SEGMENT, BOUNDING BOX…) | `services.annotation.modalities[...].types[...]` (`title`, `summary`, `points`) |
| Đổi ảnh minh họa của từng loại | Trường `images` của loại đó (tên slot), hoặc ghi đè file ảnh slot |
| Sửa tên các lớp kiểm soát chất lượng | `services.annotation.quality.layers[...]` (`action`, `desc`); mã VNA/VNC/VNSC/SubPL/PL là thuật ngữ nội bộ – giữ nguyên |
| Sửa số người / các cấp trong sơ đồ tổ chức | `team.org.headcount`, `team.org.levels[...]` |
| Sửa các bước trong quy trình vận hành | `team.process.nodes` (chữ) và `team.process.edges` (mũi tên nối). Không đổi `id` nếu chưa chắc |
| Thêm nước vào mục Đông Nam Á | `vision.roadmap.stages` → khối `sea` → `countries` (thêm 1 khối, ở cả 3 ngôn ngữ) |
| Tắt/đổi nút "lên đầu trang" | `content/site.config.json` → `backToTop.enabled` / `showAfterPx` |

**Sau mỗi thay đổi:** chạy `validate.bat` (hoặc `node tools/validate-content.mjs`). Mục `⚠ placeholder` nghĩa là còn ảnh giữ chỗ chưa thay – nhớ thay trước khi công khai.
