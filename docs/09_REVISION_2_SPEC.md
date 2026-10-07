# 09 – Revision 2: đặc tả chỉnh sửa (sau bước 12)

## Tóm tắt (tiếng Việt)

| # | Yêu cầu của bạn | Cách thực hiện | Prompt |
|---|---|---|---|
| 1 | Thanh tab ở đầu trang, nằm bên trái nút chọn ngôn ngữ | Menu đổi thành dạng **tab** bấm được, đặt ngay trái `VI · EN · 日本語`, tab đang xem có vạch nhấn | `r2-01` |
| 2 | Chữ BRYCEN VIETNAM · BPO phải to, rõ bộ phận BPO (BUSINESS PROCESS OUTSOURCING) | **Khối thương hiệu** gồm chữ "BPO" rất lớn + "BUSINESS PROCESS OUTSOURCING" + "BRYCEN VIETNAM", ở cả header và hero | `r2-01` |
| 3 | "Tạo dữ liệu…" và "Thu thập dữ liệu…" thuộc **Dịch vụ** | Luôn là mục con của Dịch vụ: breadcrumb `Trang chủ › Dịch vụ › …`, công tắc 2 tab, Trang chủ có mục "Dịch vụ của chúng tôi" | `r2-01` |
| 4 | Để trống "Thu thập dữ liệu"; tập trung "Tạo dữ liệu"; 3D (LiDAR): SEGMENT + BOUNDING BOX; 2D (Image): SEGMENT, BOUNDING BOX, KEYPOINT, SATELLITE; hàng dọc, ảnh trái – chữ phải | Trang "Tạo dữ liệu" dựng lại theo 2 khối 3D / 2D, mỗi hạng mục 1 hàng. Trang "Thu thập" là trang **"Đang cập nhật"** + **3 ô ảnh giữ chỗ** | `r2-02`, `r2-03` |
| 5 | Kiểm soát chất lượng nhiều lớp: VNA → VNC → VNSC → SubPL → PL, xoay vòng | Sơ đồ 5 lớp + **vòng trả về sửa** + 4 nguyên tắc chất lượng | `r2-04` |
| 6 | Đội ngũ: tách "Cơ cấu bộ phận" và "Quy trình vận hành" như slide 17, 18; đổi mục "Cơ hội phát triển" | Sơ đồ tổ chức 7 cấp (slide 17) + sơ đồ bơi (swim-lane) 3 làn × 3 giai đoạn (slide 18) + mục "Nhân lực được đào tạo trong nước và tại Nhật Bản" | `r2-05` |
| 7 | Chuyển "Nguồn nhân lực & tuyển dụng" sang Đội ngũ; Tầm nhìn: Đông Nam Á, Mỹ nổi bật, EU | Tuyển dụng chuyển sang trang Đội ngũ. Tầm nhìn có lộ trình **Đông Nam Á (VN, Myanmar, Cambodia) → Mỹ (nổi bật, dùng bản đồ PowerPoint) → EU (ô ảnh giữ chỗ)** | `r2-05`, `r2-06` |
| 8 | Tham khảo cvat.ai | Học **cách tổ chức & giọng văn**: chia theo loại dữ liệu, câu ngắn bắt đầu bằng động từ, quy trình đánh số, mục chất lượng, ứng dụng, bảo mật. Không sao chép chữ/ảnh | `r2-02` |
| 9 | Nút mũi tên lên theo khi cuộn | Nút tròn góc phải dưới, hiện sau khi cuộn ~400 px, có vòng tiến độ cuộn | `r2-07` |

### Những điều tôi đã **diễn giải** – hãy xác nhận
1. **"So le nhau"**: tôi dùng **ảnh bên trái – chữ bên phải cho mọi hàng** (đúng mô tả chi tiết của bạn), và xen kẽ nền trắng / xanh nhạt giữa khối 3D và 2D. Nếu bạn muốn ảnh trái–phải đổi bên lần lượt (zigzag), chỉ cần đổi `"annotationRows": "zigzag"` trong `content/site.config.json`.
2. **Mã vai trò** (suy ra từ slide 17): VNA = Annotator, VNC = Checker, VNSC = Super Checker, SubPL = Sub Project Leader, PL = Project Leader.
3. **"Đo đạc"** (slide 18) tôi dịch là *đo đạc thử / trial measurement*. Bạn kiểm tra xem thuật ngữ này đã đúng với công việc thực tế chưa.
4. **Bản đồ nước Mỹ** lấy từ slide 25, **có logo khách hàng** (Subaru, Denso, Honda, AFEELA, Sony). Cần được phép công khai trước khi đăng.
5. Con số **550 = 37 + 523** vẫn chưa khớp (tổng là 560). Hãy sửa cho đúng trong `content/*.json` (`team.org.headcount`, `home.stats`, `home.hero.subtitle`).
6. "Hiện tại: Việt Nam, Myanmar, Cambodia" là thông tin do bạn cung cấp, không có trong PowerPoint.
7. Mô tả các mục annotation, 4 bước quy trình, 4 ứng dụng, 4 nguyên tắc chất lượng do tôi viết **dựa trên PowerPoint và định nghĩa phổ biến**; bản EN/JA do AI dịch – cần người rà soát.

---

## Specification (English – read by the agent)

### Scope and approach
Revision of the existing static site after step 12. A deterministic content patch (`revision2/patches/*`, applied by `tools/apply-patch.mjs`) adds the new keys to `content/{vi,en,ja}.json`, `images.json` and `site.config.json`. Code is then updated step by step with the prompts in `docs/10_REVISION_2_PROMPTS.md`. Obsolete keys remain until `--cleanup` (step r2-08) so nothing breaks in between.

### New / changed content keys
```
ui.brand.{dept_short,dept_full,company,dept_native,company_long}   ui.back_to_top  ui.coming_soon  ui.image_placeholder  ui.tabs_label  ui.breadcrumb
home.pillars_title  home.pillars_eyebrow  home.pillars[].coming_soon
services.annotation.{lead,tabs,highlights[],modalities[],workflow{steps[]},quality{lead,layers[],delivery_label,pass_label,fail_label,loop_label,principles[]},usecases{items[]},security,cta}
services.annotation.modalities[]: {id,label,tag,title,text,types[]}  types[]: {id,name,images[],captions[]?,title,summary,points[]}
services.collection.{status,lead,message,gallery[]{image,caption}}
team.{tabs,org{lead,headcount,levels[],links_note},process{lanes[],phases[],nodes[],edges[],edge_note},people{lead,steps[],images[]},recruit{text,stats[]}}
vision.roadmap.{title,lead,stages[]{id,phase,featured,image,title,text,countries[]?}}
images.json: new slots vision_usa_map, vision_eu*, vision_southeast_asia*, collection_image_01..03*   (* placeholder:true)
site.config.json: layout.annotationRows ("image-left"|"zigzag"), backToTop.{enabled,showAfterPx}
```
Obsolete (removed by `--cleanup`): `home.hero.eyebrow`, `services.annotation.{items,group_3d,group_2d}`, `services.collection.{items,todo}`, `team.{structure,flow,growth}`, `vision.recruit`, `vision.direction.customers`.

### Acceptance criteria per request
1. **Header tabs**: nav items are tabs, immediately left of the language switcher; one clear active state; no wrapping ≥1100 px; hamburger below; keyboard + `aria-current`.
2. **Brand lockup**: "BPO" ≥ 4.5rem in hero (≥ 2rem badge in header), full name "BUSINESS PROCESS OUTSOURCING" always visible on ≥700 px, "BRYCEN VIETNAM" with logo mark; all text from `ui.brand.*`.
3. **Services hierarchy**: the two services are never top-level; breadcrumb and a two-tab switch on the three services pages; Home section titled with `home.pillars_title`.
4. **Annotation page**: exactly 2 rows under 3D (SEGMENT, BOUNDING BOX) and 4 rows under 2D (SEGMENT, BOUNDING BOX, KEYPOINT, SATELLITE); every row = images left / text right (default); config switch to zigzag; mobile stacks image above text; lightbox on images. **Collection page**: no technical content, "coming soon" state + 3 placeholder frames.
5. **Quality control**: 5 ordered stages (VNA, VNC, VNSC, SubPL, PL) → delivery; a visible return loop; AA contrast; accessible text alternative.
6. **Team**: org chart with 7 colour bands and connectors (desktop), band cards (mobile); swim-lane flow with 3 lanes × 3 phases and the feedback loop; "trained in Vietnam and Japan" section; recruitment moved here.
7. **Vision**: SEA (VN, Myanmar, Cambodia) → USA (featured, PowerPoint map) → EU (placeholder). Recruitment removed.
8. **Tone** follows the cvat.ai *structure* only (modality-first grouping, verb-led lines, numbered workflow, QA section, use cases, security). No copied text/images.
9. **Back-to-top**: global, appears after `showAfterPx`, smooth scroll, a11y, reduced-motion safe.

### Known gaps / TODO for the owner
- Data Collection content (process, equipment, coverage, security) is intentionally empty.
- EU and Southeast Asia images are placeholders.
- Confirm headcount numbers, role-code meanings and publication rights for logos on the USA map.
