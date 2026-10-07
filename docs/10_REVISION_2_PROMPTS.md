# 10 – Revision 2 prompts (English, for VS Code Agent)

> **Tiếng Việt:** Bộ prompt cho đợt chỉnh sửa lần 2 (sau bước 12, trước bước đóng gói 13). Chạy **theo thứ tự** `r2-00` → `r2-08`, mỗi bước một chat mới ở chế độ **Agent**. Gõ `/r2-00-apply-patch`… hoặc sao chép khối prompt bên dưới. Kiểm tra *Definition of done* rồi `git commit` trước khi sang bước sau. Xong `r2-08` mới quay lại bước 13 (`/13-deploy`).

| Command | Step | Covers request |
|---|---|---|
| `/r2-00-apply-patch` | Merge the content patch | – |
| `/r2-01-header-brand-services` | Header tabs, BPO lockup, Services hierarchy | 1, 2, 3 |
| `/r2-02-annotation-page` | Rebuild AI Training Data Creation page | 4, 8 |
| `/r2-03-collection-page` | Empty Data Collection page + image slots | 4 |
| `/r2-04-quality-control` | Quality control diagram | 5 |
| `/r2-05-team-page` | Team: org chart, flow, trained people, recruitment | 6, 7 |
| `/r2-06-vision-page` | Vision: SEA, USA, EU | 7 |
| `/r2-07-back-to-top` | Floating back-to-top button | 9 |
| `/r2-08-qa-cleanup` | QA, cleanup, docs | – |
| `/r2-fix` | Fix a defect (asks for inputs) | – |

---

## Apply the content patch  (`/r2-00-apply-patch`)

```text
Follow AGENTS.md. Scope: do ONLY this step. Do not run `git commit`. This step must not change any HTML/CSS/JS.

Goal: apply the Revision 2 content patch and make sure tooling ignores the new support folders.
1. Run `node tools/apply-patch.mjs --dry-run` and show me the output summary.
2. Run `node tools/apply-patch.mjs` (NOT --cleanup). Confirm a backup folder was created in content/_backup_r2/.
3. For every key reported as "replaced", compare the backup value with the new value and tell me whether it looked hand-edited by me (e.g. contact data, corrected numbers) so I can re-apply my edits.
4. Confirm content/vi.json, en.json, ja.json still have identical key trees and that every slot in content/images.json exists on disk (images.json now has `placeholder: true` on 5 slots; that is intentional).
5. Make tools/validate-content.mjs, tools/make-release.mjs and .deployignore ignore: content/_backup_r2/, revision2/, docs/reference/. The validator must not treat files in content/_backup_r2/ as site content.
6. Run `node tools/validate-content.mjs` and report the result (warnings about new unused keys are expected until later steps).
Do not change any HTML/CSS/JS in this step.

When finished, reply with: (1) files created/changed, (2) how I verify it (URL/command), (3) assumptions you made, (4) open issues. Then STOP and wait for me.
```

**Definition of done**
- Backup folder exists; key trees match; validator runs.
- You know which replaced keys you had edited by hand.

---

## Header tabs, BPO brand lockup, Services as parent  (`/r2-01-header-brand-services`)

```text
Follow AGENTS.md (including the "Revision 2 rules" section) and docs/09_REVISION_2_SPEC.md.
This is a REVISION of an existing, working site. First read the current implementation of everything you will touch, then modify it IN PLACE. Keep existing conventions (data-* binding, CSS tokens, components, file layout). Do not rewrite working parts that are not part of this step.
Scope: do ONLY this step. Do not run `git commit` (I commit myself). The content patch is already applied: use the new keys; do NOT use obsolete keys (listed in revision2/patches/r2.vi.json -> remove). Do not edit text values in content/*.json unless this step says so; if you must add a key, add it to vi.json, en.json AND ja.json together.
Reference images (view them if you can; otherwise rely on the structured data in content/*.json): docs/reference/slide17_org_chart.png, docs/reference/slide18_operating_flow.png, docs/reference/slide25_usa_map_full.png.

Implement requests 1, 2 and 3 from docs/09_REVISION_2_SPEC.md.

1. HEADER TABS (assets/js/layout.js + CSS). Layout: [logo + compact brand] ........ [main-menu TABS][language switcher]. The main menu becomes clearly clickable tabs placed immediately to the LEFT of the language switcher. Style: pill/underline tabs with hover state and a clear active indicator (aria-current="page"); Services keeps its dropdown with two children. Items: Home, About, Services, Team, Achievements & Projects, Vision, News, Contact (ui.nav.*). Must not wrap onto two lines: below ~1100px switch to the existing hamburger panel; the language switcher always stays visible. Add aria-label from ui.tabs_label to the nav.
2. BRAND LOCKUP. Header: logo image + thin divider + a bold "BPO" badge (ui.brand.dept_short) + small uppercase "BUSINESS PROCESS OUTSOURCING" (ui.brand.dept_full, hidden below ~700px, but "BPO" always visible). Home hero: remove the small eyebrow "BRYCEN VIETNAM · BPO" (home.hero.eyebrow is obsolete) and replace it with a large lockup stacked above the headline: huge "BPO" (clamp ~4.5rem–9rem, very bold, brand colour accent), under it "BUSINESS PROCESS OUTSOURCING" in large letter-spaced uppercase, then "BRYCEN VIETNAM" with the company_logo_mark. Use ui.brand.* only (no hard-coded text). Keep the existing hero title, subtitle, buttons and stats. Also make footer say ui.brand.dept_full under the company name.
3. SERVICES HIERARCHY. "AI Training Data Creation" and "AI Training Data Collection" are children of Services, never top-level. (a) Add a reusable breadcrumb component (aria-label ui.breadcrumb) "Home > Services > <current>" on services.html, services-annotation.html, services-collection.html. (b) Add a segmented switch (two tabs) at the top of those three pages to jump between the two services. (c) On the Home page, change the section above the two cards to use home.pillars_eyebrow + home.pillars_title ("Our services"); the cards come from home.pillars; when `coming_soon` is true show a "Coming soon" badge (ui.coming_soon) and keep the link working.

When finished, reply with: (1) files created/changed, (2) how I verify it (URL/command), (3) assumptions you made, (4) open issues. Then STOP and wait for me.
```

**Definition of done**
- Tabs sit left of VI/EN/日本語; active tab obvious; no wrapping at 1100-1400px.
- BPO is unmistakable in header and hero in all 3 languages.
- Breadcrumb + switch visible on the 3 service pages; Home shows the Services section.

---

## Rebuild AI Training Data Creation page  (`/r2-02-annotation-page`)

```text
Follow AGENTS.md (including the "Revision 2 rules" section) and docs/09_REVISION_2_SPEC.md.
This is a REVISION of an existing, working site. First read the current implementation of everything you will touch, then modify it IN PLACE. Keep existing conventions (data-* binding, CSS tokens, components, file layout). Do not rewrite working parts that are not part of this step.
Scope: do ONLY this step. Do not run `git commit` (I commit myself). The content patch is already applied: use the new keys; do NOT use obsolete keys (listed in revision2/patches/r2.vi.json -> remove). Do not edit text values in content/*.json unless this step says so; if you must add a key, add it to vi.json, en.json AND ja.json together.
Reference images (view them if you can; otherwise rely on the structured data in content/*.json): docs/reference/slide17_org_chart.png, docs/reference/slide18_operating_flow.png, docs/reference/slide25_usa_map_full.png.

Rebuild services-annotation.html (keep the breadcrumb/switch from the previous step) using ONLY the new keys under services.annotation.* (title, lead, tabs, highlights, modalities, workflow, usecases, security, cta). Obsolete: items, group_3d, group_2d.

Communication style (request 8): take structural inspiration from https://www.cvat.ai/ — group by data modality first (Images / 3D point clouds), short verb-led feature lines, a numbered workflow, a quality-assurance section, a use-case grid and a security strip. Do NOT copy any text, imagery, icons or branding from that site; all copy already exists in content/*.json.

Page structure, top to bottom:
1. Hero: title, lead, and the 3 highlights as compact stat chips. Below it a sticky in-page tab bar (services.annotation.tabs.*) linking to #modalities, #workflow, #quality, #usecases (scroll-spy highlights the current tab; offsets for the sticky header).
2. #modalities: two large bands in this order: 3D (LiDAR) then 2D (Image), from services.annotation.modalities. Each band has a header (big label e.g. "3D (LiDAR)", tag chip, title, text) and alternates its background (white / --brand-50). Inside each band, render each entry of `types` as a full-width vertical row:
   - Default layout (site.config.json -> layout.annotationRows = "image-left"): IMAGE ON THE LEFT (~55%), TEXT ON THE RIGHT (~45%), every row. If the value is "zigzag", mirror every even row (image right). Read this value at runtime so I can switch it without code changes. On mobile: image first, text below.
   - Left: the slot images in `images` (1 image = one large rounded frame; 2 images = main image plus a second one stacked/overlapped or side by side). Show `captions[i]` as small chips when present. Every image opens the existing lightbox.
   - Right: row number (01, 02…), a kicker chip with the band label, the type `name` in large uppercase (SEGMENT / BOUNDING BOX / KEYPOINT / SATELLITE), the `title` as subtitle, the `summary`, then `points` as a check list.
   Required content: 3D (LiDAR) has exactly 2 rows: SEGMENT and BOUNDING BOX. 2D (Image) has exactly 4 rows: SEGMENT, BOUNDING BOX, KEYPOINT, SATELLITE. The example row "3D (LiDAR) – BOUNDING BOX" must read: images left, explanation right.
3. #workflow: services.annotation.workflow as 4 numbered connected steps (horizontal on desktop, vertical on mobile).
4. #quality: output an empty `<section id="quality">` with a heading from services.annotation.quality.title and nothing else yet (built in the next step).
5. #usecases: services.annotation.usecases as a 4-card grid. Then the security strip (services.annotation.security) and the CTA band (services.annotation.cta).
Keep the Top-1 / 235 projects facts out of this page (they exist in highlights).

When finished, reply with: (1) files created/changed, (2) how I verify it (URL/command), (3) assumptions you made, (4) open issues. Then STOP and wait for me.
```

**Definition of done**
- 3D shows 2 rows, 2D shows 4 rows, image left/text right; switching layout.annotationRows to zigzag mirrors even rows.
- Sticky tabs scroll-spy works; lightbox still works; looks good in 3 languages.

---

## Blank Data Collection page with image slots  (`/r2-03-collection-page`)

```text
Follow AGENTS.md (including the "Revision 2 rules" section) and docs/09_REVISION_2_SPEC.md.
This is a REVISION of an existing, working site. First read the current implementation of everything you will touch, then modify it IN PLACE. Keep existing conventions (data-* binding, CSS tokens, components, file layout). Do not rewrite working parts that are not part of this step.
Scope: do ONLY this step. Do not run `git commit` (I commit myself). The content patch is already applied: use the new keys; do NOT use obsolete keys (listed in revision2/patches/r2.vi.json -> remove). Do not edit text values in content/*.json unless this step says so; if you must add a key, add it to vi.json, en.json AND ja.json together.
Reference images (view them if you can; otherwise rely on the structured data in content/*.json): docs/reference/slide17_org_chart.png, docs/reference/slide18_operating_flow.png, docs/reference/slide25_usa_map_full.png.

Make services-collection.html an intentionally EMPTY "coming soon" page that is ready for me to add images later.
- Keep breadcrumb + services switch. Use services.collection.title, .lead, .status (as a chip), .message. Obsolete keys: services.collection.items, .todo — remove their usage entirely (also remove any yellow "[CẦN BỔ SUNG]" callout logic for this page).
- Gallery: render services.collection.gallery (3 items; each has `image` = slot name and an optional `caption`). Each is a rounded 3:2 frame. Captions are shown only when non-empty.
- PLACEHOLDER SUPPORT (shared, put it in render.js/CSS so other pages can reuse it): when a slot in images.json has `"placeholder": true`, the rendered <img> gets class `is-placeholder`, a dashed brand-green frame, and a small overlay label with ui.image_placeholder; it is not clickable for the lightbox. When I later replace the file and set placeholder to false, it renders as a normal image.
- Add a gentle contact CTA at the bottom (reuse the existing CTA component).
- Also update services.html and Home so the Data Collection card shows the "Coming soon" badge and uses home.pillars text; do not mention any collection details that are not in the content files.

When finished, reply with: (1) files created/changed, (2) how I verify it (URL/command), (3) assumptions you made, (4) open issues. Then STOP and wait for me.
```

**Definition of done**
- The page looks deliberate, not broken; 3 dashed placeholders visible.
- Replacing assets/images/placeholders/collection_image_01.jpg (same file name) changes the image; setting placeholder:false removes the dashed frame.

---

## Quality control diagram  (`/r2-04-quality-control`)

```text
Follow AGENTS.md (including the "Revision 2 rules" section) and docs/09_REVISION_2_SPEC.md.
This is a REVISION of an existing, working site. First read the current implementation of everything you will touch, then modify it IN PLACE. Keep existing conventions (data-* binding, CSS tokens, components, file layout). Do not rewrite working parts that are not part of this step.
Scope: do ONLY this step. Do not run `git commit` (I commit myself). The content patch is already applied: use the new keys; do NOT use obsolete keys (listed in revision2/patches/r2.vi.json -> remove). Do not edit text values in content/*.json unless this step says so; if you must add a key, add it to vi.json, en.json AND ja.json together.
Reference images (view them if you can; otherwise rely on the structured data in content/*.json): docs/reference/slide17_org_chart.png, docs/reference/slide18_operating_flow.png, docs/reference/slide25_usa_map_full.png.

Build the Quality Control section inside services-annotation.html (#quality) from services.annotation.quality.* (title, lead, layers, delivery_label, pass_label, fail_label, loop_label, principles_title, principles; the old `text` and `image` keys also exist).

Diagram (the star of this section):
- Five stage cards in order: VNA (Annotator) "Annotate" -> VNC (Checker) "Review round 1" -> VNSC (Super Checker) "Review round 2" -> SubPL (Sub Project Leader) "Overall approval 1" -> PL (Project Leader) "Final overall approval" -> terminal node "Delivery to customer" (delivery_label). Each card: big code badge, role, action (bold), short desc. Forward arrows carry the pass_label.
- RETURN LOOP: under the row, draw a return rail with arrows from each reviewing stage (VNC, VNSC, SubPL, PL) back to VNA, labelled fail_label, plus a circular "rotation" icon with loop_label. The meaning: any layer can send the data back for rework and it cycles through the layers until it passes the final approval and only then goes to the customer.
- Desktop: horizontal flow with SVG/CSS connectors; Mobile: vertical stepper with the return rail on the left side. Optional (disabled under prefers-reduced-motion): a small marker that travels along the path when the section scrolls into view.
- Accessibility: use an <ol> for the stages, give the loop a visually-hidden text equivalent, ensure contrast AA.
Below the diagram: the 4 `principles` as a card row, then the existing `service_quality_control` image as a small "Reference process chart" that opens in the lightbox.
Role codes VNA/VNC/VNSC/SubPL/PL are internal terms: show them exactly as written, and add a title/tooltip with the role name.

When finished, reply with: (1) files created/changed, (2) how I verify it (URL/command), (3) assumptions you made, (4) open issues. Then STOP and wait for me.
```

**Definition of done**
- Diagram reads correctly in vi/en/ja; loop is clearly visible; works on mobile.

---

## Team page: organization, flow, trained people, recruitment  (`/r2-05-team-page`)

```text
Follow AGENTS.md (including the "Revision 2 rules" section) and docs/09_REVISION_2_SPEC.md.
This is a REVISION of an existing, working site. First read the current implementation of everything you will touch, then modify it IN PLACE. Keep existing conventions (data-* binding, CSS tokens, components, file layout). Do not rewrite working parts that are not part of this step.
Scope: do ONLY this step. Do not run `git commit` (I commit myself). The content patch is already applied: use the new keys; do NOT use obsolete keys (listed in revision2/patches/r2.vi.json -> remove). Do not edit text values in content/*.json unless this step says so; if you must add a key, add it to vi.json, en.json AND ja.json together.
Reference images (view them if you can; otherwise rely on the structured data in content/*.json): docs/reference/slide17_org_chart.png, docs/reference/slide18_operating_flow.png, docs/reference/slide25_usa_map_full.png.

Rebuild team.html with these sections, using only team.tabs, team.org, team.process, team.people, team.recruit (obsolete: team.structure, team.flow, team.growth). Add a sticky in-page tab bar (team.tabs.*) with scroll-spy.

A) #org "Organization structure" (PowerPoint slide 17, reference docs/reference/slide17_org_chart.png). Show the headcount (team.org.headcount) as a large number. Draw the org chart as 7 full-width horizontal BANDS, one per team.org.levels[] (in order), each with a coloured label block on the left (tone: red, orange, yellow, green, blue, slate, purple — use soft tints that fit the minimal theme but keep the same hue order as the PowerPoint). Place the nodes of each level inside its band, evenly distributed; node = rounded box with `role` and a small `code` badge when present. Draw connectors with an SVG overlay computed in JS on load/resize/langchange following team.org.links_note: Manager -> Sub TeamLead and PMO; PMO -> 3 Project Leaders; Sub Project Leader below the PL row; Sub PL -> 2 Super Checkers; each Super Checker -> 2 Checkers; each Checker -> 2 Annotators. Mobile (<800px): no connectors; show each band as a card with its label and node chips grouped with counts (e.g. "Annotator x 8").
B) #process "Operating flow" (slide 18, reference docs/reference/slide18_operating_flow.png). Recreate it as a SWIM-LANE chart: 3 column lanes (team.process.lanes: Customer / BPO (JP) / BPO (VN)) with coloured headers, 3 horizontal phase bands (team.process.phases) in soft lavender / beige / mint, and the boxes from team.process.nodes positioned by `lane` and `phase` (keep array order inside a phase, top to bottom). Draw arrows for team.process.edges with orthogonal routing; the edge m9 -> m4 is the feedback loop to production: dashed and labelled. Mobile: vertical list grouped by phase with lane chips, edges omitted.
C) #people "People trained in Vietnam and in Japan": team.people.title/lead, the 3 steps as a connected timeline, and the 3 images (team.people.images) with the Japan photo emphasised. Replace the old "career growth" wording entirely.
D) #recruit: team.recruit (moved from Vision): text, the two big numbers (79, 187), and a contact button.
Remove the old Team sections. Make sure nothing else links to removed anchors.

When finished, reply with: (1) files created/changed, (2) how I verify it (URL/command), (3) assumptions you made, (4) open issues. Then STOP and wait for me.
```

**Definition of done**
- Both diagrams look like the PowerPoint ones (bands, lanes, arrows) and stay readable at 375px.
- Recruitment appears on Team and no longer on Vision (Vision is changed in the next step).

---

## Vision page: Southeast Asia, United States, EU  (`/r2-06-vision-page`)

```text
Follow AGENTS.md (including the "Revision 2 rules" section) and docs/09_REVISION_2_SPEC.md.
This is a REVISION of an existing, working site. First read the current implementation of everything you will touch, then modify it IN PLACE. Keep existing conventions (data-* binding, CSS tokens, components, file layout). Do not rewrite working parts that are not part of this step.
Scope: do ONLY this step. Do not run `git commit` (I commit myself). The content patch is already applied: use the new keys; do NOT use obsolete keys (listed in revision2/patches/r2.vi.json -> remove). Do not edit text values in content/*.json unless this step says so; if you must add a key, add it to vi.json, en.json AND ja.json together.
Reference images (view them if you can; otherwise rely on the structured data in content/*.json): docs/reference/slide17_org_chart.png, docs/reference/slide18_operating_flow.png, docs/reference/slide25_usa_map_full.png.

Rebuild vision.html. Keep vision.page_title and the short vision.direction.text as an intro. REMOVE the recruitment section (it moved to Team; vision.recruit and vision.direction.customers are obsolete). Build the roadmap from vision.roadmap (title, lead, stages[]).
- Present stages as a vertical timeline with phase chips (Now -> Next -> Further ahead).
- Stage "sea" (Southeast Asia, phase Now): title, text, three country chips from `countries` (Vietnam, Myanmar, Cambodia) each with a small "current" dot, and the image slot vision_southeast_asia.
- Stage "usa" (phase Next) is FEATURED: larger card, brand-tinted background, a "Next" badge, wide image vision_usa_map (it is the map from the PowerPoint, with customer logos) that opens in the lightbox with zoom, and the text.
- Stage "eu" (phase Further ahead): title, text and the image slot vision_eu.
- vision_southeast_asia and vision_eu are placeholders (`placeholder: true`): use the shared placeholder styling from the Data Collection step so I can later drop real images in by replacing the files.
- Responsive: two columns (text + image) on desktop, stacked on mobile.
Also make sure no Home/Achievements link points to the removed recruitment section.

When finished, reply with: (1) files created/changed, (2) how I verify it (URL/command), (3) assumptions you made, (4) open issues. Then STOP and wait for me.
```

**Definition of done**
- USA stage is visually dominant; SEA lists VN, Myanmar, Cambodia; EU shows a dashed placeholder.
- Replacing assets/images/placeholders/vision_eu.jpg updates the EU stage.

---

## Floating back-to-top button  (`/r2-07-back-to-top`)

```text
Follow AGENTS.md (including the "Revision 2 rules" section) and docs/09_REVISION_2_SPEC.md.
This is a REVISION of an existing, working site. First read the current implementation of everything you will touch, then modify it IN PLACE. Keep existing conventions (data-* binding, CSS tokens, components, file layout). Do not rewrite working parts that are not part of this step.
Scope: do ONLY this step. Do not run `git commit` (I commit myself). The content patch is already applied: use the new keys; do NOT use obsolete keys (listed in revision2/patches/r2.vi.json -> remove). Do not edit text values in content/*.json unless this step says so; if you must add a key, add it to vi.json, en.json AND ja.json together.
Reference images (view them if you can; otherwise rely on the structured data in content/*.json): docs/reference/slide17_org_chart.png, docs/reference/slide18_operating_flow.png, docs/reference/slide25_usa_map_full.png.

Add a global floating "back to top" button.
- Create assets/js/backtotop.js and CSS; load it from layout.js so it exists on all 10 pages (do not edit each page).
- Behaviour: fixed at bottom-right (respect env(safe-area-inset-*)), 48px round button with an up-arrow SVG. It is hidden near the top and fades/slides in after scrolling `site.config.json -> backToTop.showAfterPx` (default 400). It stays on screen while scrolling down. Click/Enter/Space scrolls smoothly to the top (instant if prefers-reduced-motion), then moves focus to the page's skip link or <main>.
- Nice-to-have: a thin circular scroll-progress ring around the arrow.
- Respect `backToTop.enabled`. Label and tooltip from ui.back_to_top (updates on 'langchange'). Use passive scroll listeners with requestAnimationFrame throttling. z-index above content but below the lightbox. Do not overlap the Facebook widget or the mobile menu; hide when printing.

When finished, reply with: (1) files created/changed, (2) how I verify it (URL/command), (3) assumptions you made, (4) open issues. Then STOP and wait for me.
```

**Definition of done**
- Appears after scrolling, disappears at top, works with keyboard, label changes with language.

---

## QA, obsolete-key cleanup, docs  (`/r2-08-qa-cleanup`)

```text
Follow AGENTS.md (including the "Revision 2 rules" section) and docs/09_REVISION_2_SPEC.md.
This is a REVISION of an existing, working site. First read the current implementation of everything you will touch, then modify it IN PLACE. Keep existing conventions (data-* binding, CSS tokens, components, file layout). Do not rewrite working parts that are not part of this step.
Scope: do ONLY this step. Do not run `git commit` (I commit myself). The content patch is already applied: use the new keys; do NOT use obsolete keys (listed in revision2/patches/r2.vi.json -> remove). Do not edit text values in content/*.json unless this step says so; if you must add a key, add it to vi.json, en.json AND ja.json together.
Reference images (view them if you can; otherwise rely on the structured data in content/*.json): docs/reference/slide17_org_chart.png, docs/reference/slide18_operating_flow.png, docs/reference/slide25_usa_map_full.png.

Final QA for Revision 2.
1. Before deleting anything: search all HTML/JS for usages of the obsolete keys in revision2/patches/r2.vi.json -> remove (e.g. home.hero.eyebrow, services.annotation.items, services.collection.items, team.structure, team.flow, team.growth, vision.recruit). If any usage remains, fix the code first and report it.
2. Run `node tools/apply-patch.mjs --cleanup`, then `node tools/validate-content.mjs`.
3. Extend tools/validate-content.mjs: (a) ⚠ for every slot with `placeholder: true` still in use ("replace this image before publishing"); (b) ✖ if a type in services.annotation.modalities references a missing slot; (c) ✖ if site.config.json layout.annotationRows is not "image-left" or "zigzag".
4. Test with `node tools/serve.mjs` (curl/static checks, headless browser if available) and report: header tabs, hero lockup in 3 languages, breadcrumb/switch, annotation rows (image-left and zigzag), collection placeholders, QC diagram, team diagrams, vision stages, back-to-top on all 10 pages, no console errors, no obsolete keys, no horizontal scroll at 375px.
5. Update docs/03_CONTENT_MODEL.md with the new key tree, and make sure docs/04b_IMAGE_SLOTS_R2.md matches images.json. Make sure .deployignore excludes revision2/, content/_backup_r2/ and docs/.
List remaining defects with fixes; fix the small ones.

When finished, reply with: (1) files created/changed, (2) how I verify it (URL/command), (3) assumptions you made, (4) open issues. Then STOP and wait for me.
```

**Definition of done**
- Validator shows no ✖; ⚠ only for placeholders and any [CẦN BỔ SUNG] left.
- All Revision 2 requests pass the checklist in docs/09_REVISION_2_SPEC.md.

---

## Rescue prompt

### Revision 2 – fix a defect (`/r2-fix`)
```text
Follow AGENTS.md (including Revision 2 rules).
Page: ${input:page:Page file, e.g. team.html}
Problem: ${input:problem:What is wrong? Be specific}
Screenshot or console error (optional): ${input:detail:Paste error or describe the screenshot}

Find the root cause and apply the smallest fix. Keep content keys and image slots unchanged. Explain the cause and how I verify.
```
