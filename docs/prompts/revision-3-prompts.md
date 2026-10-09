# Revision 3 prompts (English, for VS Code Agent)

> **Tiếng Việt:** Đợt cập nhật 3 gồm 12 bước, chạy **theo thứ tự** `r3-00` → `r3-11`, mỗi bước một **chat mới** ở chế độ **Agent**. Gõ `/r3-00-prepare`… hoặc sao chép khối prompt bên dưới. Xong mỗi bước: kiểm tra *Definition of done* → `git commit` → bước tiếp. Tiến độ ghi ở `docs/work/current-work.md`.

| Command | Step | Request |
|---|---|---|
| `/r3-00-prepare` | Prepare: docs, images, content patch | 2 |
| `/r3-01-theme` | Theme: black + green | 1 |
| `/r3-02-header-footer` | Header & footer | 3 |
| `/r3-03-home` | Home page | 5 |
| `/r3-04-subaru` | SUBARU page | 6 |
| `/r3-05-about` | About page | 7 |
| `/r3-06-services` | Services › AI Training Data Creation | 12 |
| `/r3-07-team` | Team page | 8 |
| `/r3-08-achievements-vision` | Achievements & Projects, Vision | 9, 10 |
| `/r3-09-recruits` | Recruitment page | 4 |
| `/r3-10-contact` | Contact page | 11 |
| `/r3-11-qa-cleanup` | QA, cleanup, docs sync | – |

---

## Prepare: docs, images, content patch  (`/r3-00-prepare`)

```text
Follow AGENTS.md. Specs: docs/overview/page-specs.md (the area you touch), docs/overview/design-system.md, docs/content/content-model.md, docs/images/image-slots.md.
This is an UPDATE of an existing, working site: read the current implementation of what you will touch first, then modify it IN PLACE. Keep conventions (data-* binding, CSS tokens, components). Do not rewrite working parts that are not part of this step.
Scope: ONLY this step. Do not run `git commit`. The content patch and image migration are already applied (step r3-00): use the NEW keys and slot names; do NOT read obsolete keys (listed in revision3/patches/r3.vi.json -> remove). Do not edit text values in content/*.json; if a key is truly missing, add it to vi.json, en.json AND ja.json together and tell me.

Goal: bring the project to the Revision 3 baseline WITHOUT changing page design yet. Work through these in order, running each command and showing me its summary.
1. `node tools/reorganize-docs.mjs --dry-run`, then `node tools/reorganize-docs.mjs` (moves old docs and old prompts into docs/_archive/). Confirm docs/README.md, AGENTS.md, README.md are the new ones.
2. `node tools/migrate-images.mjs --dry-run`, then `node tools/migrate-images.mjs` (moves every image into assets/images/<page>/, renames slots, rewrites references in HTML/JS/CSS/JSON, retires unused images into assets/images/_unused/). Read its "leftover references" list. Leftovers inside content/*.json for retired slots (office_pham_van_dong, customer_*, award_top1_01..03) are EXPECTED: they sit in old keys that the next command replaces and the final cleanup deletes — do NOT edit them. FIX only leftovers in code (HTML/JS/CSS), typical cases: a slot name built by string concatenation such as `timeline_${year}`, hard-coded favicon paths, CSS url(...).
3. `node tools/apply-patch.mjs revision3 --dry-run`, then `node tools/apply-patch.mjs revision3` (adds the new keys and slots; a backup goes to content/_backup_r3/). Do NOT run --cleanup. List the "replaced" keys and tell me which ones look hand-edited by me (compare with the backup), so I can re-apply my edits.
4. Make tools/validate-content.mjs, tools/make-release.mjs and .deployignore ignore: assets/images/_unused/, content/_backup_*/, revision2/, revision3/, docs/, and add `content/recruits.json` to the validator (ids unique, status open|closed, dates YYYY-MM-DD, 3 languages unless hidden). Extend the validator to check that every slot file lives in assets/images/<prefix of slot name>/ (common for shared).
5. Run `node tools/validate-content.mjs` and `node tools/serve.mjs` + curl every .html page to confirm each page still loads and the images of the NEW slots resolve. Missing images that belong to retired slots on pages rebuilt in later steps (Home customers, About third office, Achievements logos/badges) are expected until those steps. Report any other problem.
Do not change page layouts or styles in this step.

Finish: update the checkbox of this step in docs/work/current-work.md. Reply with (1) files changed, (2) how I verify, (3) assumptions, (4) open issues — then STOP and wait for me.
```

**Definition of done**
- docs/ has the new structure; old docs are in docs/_archive/.
- assets/images/ has one folder per page + common/ + _unused/; every page loads; no problems other than the expected retired-slot leftovers.

---

## Theme: black + green  (`/r3-01-theme`)

```text
Follow AGENTS.md. Specs: docs/overview/page-specs.md (the area you touch), docs/overview/design-system.md, docs/content/content-model.md, docs/images/image-slots.md.
This is an UPDATE of an existing, working site: read the current implementation of what you will touch first, then modify it IN PLACE. Keep conventions (data-* binding, CSS tokens, components). Do not rewrite working parts that are not part of this step.
Scope: ONLY this step. Do not run `git commit`. The content patch and image migration are already applied (step r3-00): use the NEW keys and slot names; do NOT read obsolete keys (listed in revision3/patches/r3.vi.json -> remove). Do not edit text values in content/*.json; if a key is truly missing, add it to vi.json, en.json AND ja.json together and tell me.

Convert the ENTIRE site to the black + green theme defined in docs/overview/design-system.md.
- Replace assets/css/tokens.css with the new tokens exactly as specified (verified contrast). Remove all old light-theme/mint tokens and every hard-coded colour in base.css, components.css, pages.css, inline <style> and JS; everything must use tokens.
- Apply the section rhythm: header, hero and footer black; content sections alternate dark / light (never more than two of the same kind in a row). Cards, tabs, buttons, chips, forms, timeline, tables, lightbox, placeholder frames, back-to-top and focus rings all follow the design system (primary button = green background + black text; text links on light use --green-700).
- Logos: use slot company_logo_on_dark on dark surfaces and company_logo on light surfaces (header, footer, any card). Images with a white background (timeline icons, award badge, certificates, SUBARU logo) must sit on a light rounded mat when placed on dark.
- Update assets/styleguide.html to show every component in both dark and light contexts.
- Keep all layouts/content as they are; this step is colour, surfaces, shadows and contrast only.
Verify contrast with a quick script or manual check for body text, muted text, links, buttons and badges on both surface types (AA).

Finish: update the checkbox of this step in docs/work/current-work.md. Reply with (1) files changed, (2) how I verify, (3) assumptions, (4) open issues — then STOP and wait for me.
```

**Definition of done**
- Every page is black/green with white & grey balance; no leftover light-theme colours; logos readable on dark.

---

## Header & footer  (`/r3-02-header-footer`)

```text
Follow AGENTS.md. Specs: docs/overview/page-specs.md (the area you touch), docs/overview/design-system.md, docs/content/content-model.md, docs/images/image-slots.md.
This is an UPDATE of an existing, working site: read the current implementation of what you will touch first, then modify it IN PLACE. Keep conventions (data-* binding, CSS tokens, components). Do not rewrite working parts that are not part of this step.
Scope: ONLY this step. Do not run `git commit`. The content patch and image migration are already applied (step r3-00): use the NEW keys and slot names; do NOT read obsolete keys (listed in revision3/patches/r3.vi.json -> remove). Do not edit text values in content/*.json; if a key is truly missing, add it to vi.json, en.json AND ja.json together and tell me.

1. FOOTER (assets/js/layout.js + CSS): add the contact-address block described in docs/overview/page-specs.md > Global > Footer. Take head-office and branch addresses from site.config.json -> contact.address[lang] (fall back to about.offices[].address if empty), plus email (mailto:) and phone (tel:); every item is hidden when empty; headings from ui.footer.*; keep logo (on dark), department lockup, quick links, social icons, Brycen Japan link and copyright.
2. REMOVE the "skip to main content" link everywhere: markup, CSS, JS, and every use of ui.skip. (The key itself is deleted later by the cleanup step.)
3. HEADER: add the "Recruitment" tab (ui.nav.recruits -> recruits.html) after News. With 9 tabs make sure tabs never wrap: switch to the hamburger panel below ~1280px and keep the language switcher visible. Keep the tabs immediately left of the language switcher; Services keeps its dropdown. Use company_logo_on_dark in the header.
4. Add the sitemap/quick-link entries for recruits.html (and subaru.html in sitemap.xml only), nothing else.

Finish: update the checkbox of this step in docs/work/current-work.md. Reply with (1) files changed, (2) how I verify, (3) assumptions, (4) open issues — then STOP and wait for me.
```

**Definition of done**
- Footer shows the addresses from site.config.json (try filling then clearing them); no skip link anywhere; 9 tabs fit or collapse cleanly.

---

## Home page  (`/r3-03-home`)

```text
Follow AGENTS.md. Specs: docs/overview/page-specs.md (the area you touch), docs/overview/design-system.md, docs/content/content-model.md, docs/images/image-slots.md.
This is an UPDATE of an existing, working site: read the current implementation of what you will touch first, then modify it IN PLACE. Keep conventions (data-* binding, CSS tokens, components). Do not rewrite working parts that are not part of this step.
Scope: ONLY this step. Do not run `git commit`. The content patch and image migration are already applied (step r3-00): use the NEW keys and slot names; do NOT read obsolete keys (listed in revision3/patches/r3.vi.json -> remove). Do not edit text values in content/*.json; if a key is truly missing, add it to vi.json, en.json AND ja.json together and tell me.

Update index.html per docs/overview/page-specs.md > Home (use keys under home.*, certifications.*, ui.*).
1. HERO: split layout. Left: dark panel with the stylised lettering pattern (inline SVG/CSS: large outlined "BPO"/"AI" glyphs + fine dot grid at low opacity), big green "BPO", "BUSINESS PROCESS OUTSOURCING", "BRYCEN VIETNAM" with company_logo_mark_on_dark, title, subtitle, two buttons. Right: image slot home_hero_image in a rounded light frame (it has a white background; do NOT put text over it). Stack on mobile. Remove any code that used the old background image behind text.
2. STATS: 4 cards from home.stats[] — image on top (stats[i].image, placeholder styling when flagged), count-up number, label; footnote home.stats_note.
3. SERVICES: keep the 2 cards from home.pillars[] ("Coming soon" badge on Collection), then add the SHOWCASE MARQUEE from home.showcase.items[] using the shared marquee component (create it now in assets/js/marquee.js + CSS if it does not exist: duplicated items for a seamless loop, pause on hover/focus, lightbox on click, speed from site.config.json -> marquee.home.secondsPerLoop, static scroll-snap row under prefers-reduced-motion).
4. COMMITMENTS + CERTIFICATIONS: keep the 3 commitments; add below them the certifications block from certifications.items[] (title home.certifications_title): two portrait cards with image (placeholder styling), code and name (ISO 9001:2015, ISO/IEC 27001:2013).
5. PARTNERS: replace the old "Featured customers" section by home.partners: ONLY the SUBARU logo (slot subaru_logo on a white pill) linking to subaru.html with caption ui.partner_main. Delete all code, CSS and content usage for other customers' logos/names on this page.
Sections alternate dark/light per the design system.

Finish: update the checkbox of this step in docs/work/current-work.md. Reply with (1) files changed, (2) how I verify, (3) assumptions, (4) open issues — then STOP and wait for me.
```

**Definition of done**
- Hero text is readable (no text over the white image); 4 stat cards with images; marquee runs and pauses; ISO cards visible; only SUBARU as partner.

---

## SUBARU page  (`/r3-04-subaru`)

```text
Follow AGENTS.md. Specs: docs/overview/page-specs.md (the area you touch), docs/overview/design-system.md, docs/content/content-model.md, docs/images/image-slots.md.
This is an UPDATE of an existing, working site: read the current implementation of what you will touch first, then modify it IN PLACE. Keep conventions (data-* binding, CSS tokens, components). Do not rewrite working parts that are not part of this step.
Scope: ONLY this step. Do not run `git commit`. The content patch and image migration are already applied (step r3-00): use the NEW keys and slot names; do NOT read obsolete keys (listed in revision3/patches/r3.vi.json -> remove). Do not edit text values in content/*.json; if a key is truly missing, add it to vi.json, en.json AND ja.json together and tell me.

Create subaru.html per docs/overview/page-specs.md > Subaru, using keys under subaru.* and ui.*; follow the same page skeleton, header/footer and data-binding as the other pages.
- Breadcrumb Home > Partners > SUBARU. Hero with subaru_hero (dark overlay), eyebrow, title "SUBARU", subtitle, subaru_logo.
- "Subaru introduction" with two blocks (History, Global position), each: image slot left, text right; show subaru.intro.global.source as small text.
- "Core values & technology": 4 large rows (image left, text right) for Boxer engine, S-AWD, EyeSight, SGP using subaru.tech.items[] (image slot per item). The EyeSight row is highlighted: green badge (partnership_badge), the partnership sentence and the extra image (partnership_image).
- CTA to contact.html. Do not add SUBARU to the main menu. Make the SUBARU logo on Home link here and make the word SUBARU in achievements.projects.text a link to subaru.html (do this by rendering the first "SUBARU" occurrence in that text as a link, without hard-coding text).
- Add subaru.html to sitemap.xml. Placeholder-flagged images keep the dashed frame.

Finish: update the checkbox of this step in docs/work/current-work.md. Reply with (1) files changed, (2) how I verify, (3) assumptions, (4) open issues — then STOP and wait for me.
```

**Definition of done**
- subaru.html works in 3 languages; every block has an image slot; EyeSight is visibly highlighted; logo on Home opens the page.

---

## About page  (`/r3-05-about`)

```text
Follow AGENTS.md. Specs: docs/overview/page-specs.md (the area you touch), docs/overview/design-system.md, docs/content/content-model.md, docs/images/image-slots.md.
This is an UPDATE of an existing, working site: read the current implementation of what you will touch first, then modify it IN PLACE. Keep conventions (data-* binding, CSS tokens, components). Do not rewrite working parts that are not part of this step.
Scope: ONLY this step. Do not run `git commit`. The content patch and image migration are already applied (step r3-00): use the NEW keys and slot names; do NOT read obsolete keys (listed in revision3/patches/r3.vi.json -> remove). Do not edit text values in content/*.json; if a key is truly missing, add it to vi.json, en.json AND ja.json together and tell me.

Update about.html per docs/overview/page-specs.md > About.
1. TIMELINE (about.history): lay it out in three horizontal rows — years row on top, evenly spaced across the width; icons row (slot in `icon`, inside light circles); text row at the same place as before. Connecting line; horizontal scroll on narrow desktop; vertical list on mobile. The 2025 text no longer mentions new offices (content already updated).
2. OFFICES (about.offices.items[], now 2): Head office and Branch cards with image, name, full address; "View map" opens https://www.google.com/maps/search/?api=1&query=<encodeURIComponent(map_query)> in a new tab (noopener). Remove all remaining code that referenced the Phạm Văn Đồng office.
3. NEW SECTION "Multinational collaboration" (about.global): banner image about_global_banner, lead, three country cards (Vietnam, Cambodia, Myanmar) each with its own image slot (placeholder styling).

Finish: update the checkbox of this step in docs/work/current-work.md. Reply with (1) files changed, (2) how I verify, (3) assumptions, (4) open issues — then STOP and wait for me.
```

**Definition of done**
- Years are in one row above the icons; 2 offices with working map links; 3 country cards with image slots.

---

## Services › AI Training Data Creation  (`/r3-06-services`)

```text
Follow AGENTS.md. Specs: docs/overview/page-specs.md (the area you touch), docs/overview/design-system.md, docs/content/content-model.md, docs/images/image-slots.md.
This is an UPDATE of an existing, working site: read the current implementation of what you will touch first, then modify it IN PLACE. Keep conventions (data-* binding, CSS tokens, components). Do not rewrite working parts that are not part of this step.
Scope: ONLY this step. Do not run `git commit`. The content patch and image migration are already applied (step r3-00): use the NEW keys and slot names; do NOT read obsolete keys (listed in revision3/patches/r3.vi.json -> remove). Do not edit text values in content/*.json; if a key is truly missing, add it to vi.json, en.json AND ja.json together and tell me.

Update services-annotation.html per docs/overview/page-specs.md > Services › AI Training Data Creation (keys services.annotation.*, certifications.*).
1. LEFT VERTICAL SIDE-NAV: sticky, follows the screen while scrolling, scroll-spy highlight, title ui.on_this_page, entries in the order of services.annotation.order (usecases, modalities, workflow, quality, security) with labels services.annotation.tabs.*. On mobile turn it into a sticky horizontal chip bar. Remove the old horizontal in-page tab bar.
2. REORDER sections to: Use cases → Data types → How we work → Quality control → Information security → CTA. "What is labeled data used for?" must come BEFORE the work areas.
3. DATA TYPES: keep the 3D (LiDAR) and 2D (Image) bands and the rows (image left, text right; honour layout.annotationRows). Under EACH row add a marquee strip of the 4 slots in services.annotation.strips[type.id] (label ui.gallery) using the shared marquee component (speed marquee.services.secondsPerLoop); placeholders keep the dashed frame.
4. QUALITY CONTROL: DELETE the drawn layer diagram and its code/CSS (VNA→PL). New content: quality.lead; a full-width image slot quality.flow_image (placeholder for the owner's explanatory picture, caption only if flow_caption is not empty); the 4 principles cards; then quality.principles_image displayed LARGE and CENTRED (max-width ≈ 960px, lightbox). Do not render quality.layers.
5. INFORMATION SECURITY: security.title/text, image security.image, and the certifications block (ISO 9001:2015, ISO/IEC 27001:2013) reusing the same component as Home.
6. Keep breadcrumb and the 2-tab Creation|Collection switch.

Finish: update the checkbox of this step in docs/work/current-work.md. Reply with (1) files changed, (2) how I verify, (3) assumptions, (4) open issues — then STOP and wait for me.
```

**Definition of done**
- Side-nav is vertical, sticky and highlights the current section; use cases come first; each row has a moving image strip; no old QC diagram; ISO cards under security.

---

## Team page  (`/r3-07-team`)

```text
Follow AGENTS.md. Specs: docs/overview/page-specs.md (the area you touch), docs/overview/design-system.md, docs/content/content-model.md, docs/images/image-slots.md.
This is an UPDATE of an existing, working site: read the current implementation of what you will touch first, then modify it IN PLACE. Keep conventions (data-* binding, CSS tokens, components). Do not rewrite working parts that are not part of this step.
Scope: ONLY this step. Do not run `git commit`. The content patch and image migration are already applied (step r3-00): use the NEW keys and slot names; do NOT read obsolete keys (listed in revision3/patches/r3.vi.json -> remove). Do not edit text values in content/*.json; if a key is truly missing, add it to vi.json, en.json AND ja.json together and tell me.

Update team.html per docs/overview/page-specs.md > Team (keys team.*).
1. In-page tabs: Organization · Operating flow · Trained people (recruit tab removed).
2. #org: headcount number + org.lead + ONE large image slot team_org_image (placeholder). REMOVE the org-chart drawing and its JS/CSS.
3. #process: only BPO BRYCEN VN <-> Customer. Render process.steps[] as a numbered list with an actor chip (process.actors[actor]) next to the image slot process.image. REMOVE the swim-lane drawing, its SVG/JS/CSS, and every mention of BPO (JP).
4. #people: lead, the 3 steps as a timeline, the 3 photos (people.images) and a large Japan-country image slot people.country_image with caption.
5. REMOVE the recruitment section from this page and any link to team.html#recruit (recruitment now lives on recruits.html).

Finish: update the checkbox of this step in docs/work/current-work.md. Reply with (1) files changed, (2) how I verify, (3) assumptions, (4) open issues — then STOP and wait for me.
```

**Definition of done**
- No drawings left; 8-step list beside an image slot; Japan image slot present; no recruitment on Team.

---

## Achievements & Projects, Vision  (`/r3-08-achievements-vision`)

```text
Follow AGENTS.md. Specs: docs/overview/page-specs.md (the area you touch), docs/overview/design-system.md, docs/content/content-model.md, docs/images/image-slots.md.
This is an UPDATE of an existing, working site: read the current implementation of what you will touch first, then modify it IN PLACE. Keep conventions (data-* binding, CSS tokens, components). Do not rewrite working parts that are not part of this step.
Scope: ONLY this step. Do not run `git commit`. The content patch and image migration are already applied (step r3-00): use the NEW keys and slot names; do NOT read obsolete keys (listed in revision3/patches/r3.vi.json -> remove). Do not edit text values in content/*.json; if a key is truly missing, add it to vi.json, en.json AND ja.json together and tell me.

A) achievements.html (docs/overview/page-specs.md > Achievements):
 - Achievements: replace the row of four badges by ONE image slot (awards.image); show a huge "#1" (awards.headline) and awards.headline_text ("No.1 in Japan"); keep the 5-years text and source below unchanged.
 - Projects: remove the customer logo wall and its code; keep "235" + projects.text; add 3 illustrative image slots (projects.images) and the "Customer satisfaction" block (projects.satisfaction: image + title + text). The word SUBARU in the text links to subaru.html (if not already done).
B) vision.html (docs/overview/page-specs.md > Vision):
 - Direction: add the image slot vision.direction.image next to the text.
 - Replace the roadmap by a GROWTH TIMELINE from vision.growth: a rising stepped/curved line left→right, nodes growing with `level`: Now (Japan + Southeast Asia as two sub-cards with images; SEA shows country chips) → Next step United States (featured, largest, clean map vision_roadmap_usa, lightbox) → Further ahead Europe (EU) (placeholder image). Vertical on mobile. Delete the old roadmap code/CSS (vision.roadmap is obsolete).

Finish: update the checkbox of this step in docs/work/current-work.md. Reply with (1) files changed, (2) how I verify, (3) assumptions, (4) open issues — then STOP and wait for me.
```

**Definition of done**
- Achievements has one award image + #1 headline and no logos; Vision shows a clear rising timeline Now → USA → EU.

---

## Recruitment page  (`/r3-09-recruits`)

```text
Follow AGENTS.md. Specs: docs/overview/page-specs.md (the area you touch), docs/overview/design-system.md, docs/content/content-model.md, docs/images/image-slots.md.
This is an UPDATE of an existing, working site: read the current implementation of what you will touch first, then modify it IN PLACE. Keep conventions (data-* binding, CSS tokens, components). Do not rewrite working parts that are not part of this step.
Scope: ONLY this step. Do not run `git commit`. The content patch and image migration are already applied (step r3-00): use the NEW keys and slot names; do NOT read obsolete keys (listed in revision3/patches/r3.vi.json -> remove). Do not edit text values in content/*.json; if a key is truly missing, add it to vi.json, en.json AND ja.json together and tell me.

Create recruits.html (+ assets/js/recruits.js) per docs/overview/page-specs.md > Recruitment, using content/recruits.json and keys under recruits.*.
- Banner (recruits_banner), lead, intro block (text, stats 79/187, image recruits_intro).
- Filter tabs All / Open / Closed; list sorted by date descending; each post shows date (YYYY.MM.DD), status badge (Open = green, Closed = grey, ui.status.*), title, summary, location, type, deadline (labels.no_deadline when empty). Auto-close by deadline when site.config.json -> recruits.autoCloseByDeadline is true.
- Detail view recruits.html?id=<id>: full body (split on blank lines), meta, Apply button (apply_link, else mailto: to contact.email with subject recruits.apply_subject + title); closed posts show labels.closed_note and no apply button; unknown id -> friendly message; Back link.
- Items with hidden:true are skipped; empty state recruits.empty. Re-render on language change.
- Add recruits.html to sitemap.xml. TEST by temporarily setting hidden:false on the two template items in recruits.json, verify, then set them back to hidden:true.

Finish: update the checkbox of this step in docs/work/current-work.md. Reply with (1) files changed, (2) how I verify, (3) assumptions, (4) open issues — then STOP and wait for me.
```

**Definition of done**
- Open and Closed posts show with correct badges and filters; detail page works; templates hidden again.

---

## Contact page  (`/r3-10-contact`)

```text
Follow AGENTS.md. Specs: docs/overview/page-specs.md (the area you touch), docs/overview/design-system.md, docs/content/content-model.md, docs/images/image-slots.md.
This is an UPDATE of an existing, working site: read the current implementation of what you will touch first, then modify it IN PLACE. Keep conventions (data-* binding, CSS tokens, components). Do not rewrite working parts that are not part of this step.
Scope: ONLY this step. Do not run `git commit`. The content patch and image migration are already applied (step r3-00): use the NEW keys and slot names; do NOT read obsolete keys (listed in revision3/patches/r3.vi.json -> remove). Do not edit text values in content/*.json; if a key is truly missing, add it to vi.json, en.json AND ja.json together and tell me.

Rebuild contact.html and assets/js/contact.js per docs/overview/page-specs.md > Contact (keys contact.*, site.config.json -> contact.*). Layout reference: https://dataengineering.brycen.co.jp/contact/ (do not copy its text or images).
- Banner (contact_banner), breadcrumb, lead + response_note.
- TWO COLUMNS. LEFT: the form and, below it, the privacy section. RIGHT: ONE vertical column "Company information" (contact.company_panel): logo, name, head-office and branch addresses, email, phone as a "call us" box, map link, social icons — everything from site.config.json, empty = hidden. On mobile the right column goes under the form.
- FORM fields: name*, company, department, position, email*, phone, inquiry type* (dropdown contact.form.type_options), message*, consent checkbox* placed right under the privacy section. Validation messages from contact.form.validation. Flow: validate → REVIEW screen (contact.form.review_title with Edit / Send) → send.
- SENDING: POST to site.config.json -> contact.form.endpoint (FormData; Accept: application/json; include subject = subjectPrefix + inquiry type). If endpoint is empty, fall back to a mailto: link to contact.form.recipientEmail or contact.email (button contact.form.fallback_mailto). Honeypot field, disable button while sending, success/error messages from content, nothing stored in the browser.
- PRIVACY SECTION: render contact.privacy.items[] (10 items) as a definition list; the item with dynamic:"contact" appends address/email/phone from config; the item with link:"policy" shows policy_link_label linking to site.config.json -> contact.privacyPolicyUrl (hidden if empty). Keep the "[CẦN BỔ SUNG]" marker text as is.
- Do not add trackers. Write docs/release/contact-form-setup.md changes only if the behaviour differs from it.

Finish: update the checkbox of this step in docs/work/current-work.md. Reply with (1) files changed, (2) how I verify, (3) assumptions, (4) open issues — then STOP and wait for me.
```

**Definition of done**
- Form validates, shows the review screen, and sends (or opens the mailto fallback); company column is vertical on the right; privacy list shows 10 items.

---

## QA, cleanup, docs sync  (`/r3-11-qa-cleanup`)

```text
Follow AGENTS.md. Specs: docs/overview/page-specs.md (the area you touch), docs/overview/design-system.md, docs/content/content-model.md, docs/images/image-slots.md.
This is an UPDATE of an existing, working site: read the current implementation of what you will touch first, then modify it IN PLACE. Keep conventions (data-* binding, CSS tokens, components). Do not rewrite working parts that are not part of this step.
Scope: ONLY this step. Do not run `git commit`. The content patch and image migration are already applied (step r3-00): use the NEW keys and slot names; do NOT read obsolete keys (listed in revision3/patches/r3.vi.json -> remove). Do not edit text values in content/*.json; if a key is truly missing, add it to vi.json, en.json AND ja.json together and tell me.

Final QA for Revision 3.
1. Before deleting anything, search all HTML/JS/CSS for the obsolete keys in revision3/patches/r3.vi.json -> remove (ui.skip, home.customers_title, team.process.nodes, vision.roadmap, achievements.projects.customers, services.annotation.quality.delivery_label, …). Fix any remaining use.
2. Run `node tools/apply-patch.mjs revision3 --cleanup`, then `node tools/validate-content.mjs`.
3. Extend the validator: ⚠ for each slot with placeholder:true still in use (list them grouped by page folder); ✖ if a slot's file is not in assets/images/<prefix>/; ✖ if any retired slot (see revision3/image-map.json -> retire) is still referenced; ✖ if a page contains an other-customer name or logo (Sony, Denso, Honda, Nikon, AFEELA) outside docs/archive.
4. Test with `node tools/serve.mjs` (curl + headless browser if available): every page × vi/en/ja, no console errors, no raw keys, no 404 images, no horizontal scroll at 375px, back-to-top works, footer address block, 9 header tabs behave, recruits/contact/subaru pages work, no "skip to main content" text.
5. Regenerate docs/images/image-slots.md from content/images.json (keep its format); update docs/content/content-model.md and docs/overview/page-specs.md where reality differs; tick everything in docs/work/current-work.md; move answered questions from docs/work/decisions-and-open-questions.md to the decisions table only if I told you the answer.
List remaining defects with fixes and fix the small ones.

Finish: update the checkbox of this step in docs/work/current-work.md. Reply with (1) files changed, (2) how I verify, (3) assumptions, (4) open issues — then STOP and wait for me.
```

**Definition of done**
- Validator has no ✖; only ⚠ for placeholders / [CẦN BỔ SUNG]; all Revision 3 requests verified.

---
