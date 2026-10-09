# Page specs (source of truth for the current design)

Content keys are in `content/{vi,en,ja}.json`; image slots in `content/images.json` (`docs/images/image-slots.md`). Global rules are in `AGENTS.md`; colours in `design-system.md`.

## Global
- **Header** (black, sticky): left = `company_logo_on_dark` + divider + bold "BPO" badge + small "BUSINESS PROCESS OUTSOURCING" (`ui.brand.*`, hidden <700px except "BPO"). Right = main-menu **tabs** immediately left of the language switcher `VI · EN · 日本語`. With 9 tabs, switch to the hamburger panel below ~1280px; the language switcher always stays visible. Services tab has a dropdown (Creation, Collection). Active tab: green indicator + `aria-current="page"`. **No skip link.**
- **Footer** (black): column 1 logo (`company_logo_on_dark`) + `ui.brand.dept_full` + company name; column 2 **contact address** (`ui.footer.address_title`): head-office and branch addresses from `site.config.json → contact.address[lang]` (and `about.offices` names if address is empty), email (`mailto:`), phone (`tel:`) — each hidden when empty; column 3 quick links (the menu pages); column 4 social icons (hidden when empty) + "Brycen Japan website" link; bottom line copyright.
- **Back-to-top** button (global, `backtotop.js`, `site.config.json → backToTop`). **Lightbox** for any `[data-lightbox]` image (Esc closes, keyboard accessible). **Placeholder** styling for slots with `placeholder:true`. **Breadcrumb** on sub-pages. **Marquee** component (below).
- **Marquee strip** (reusable): horizontal, auto-scrolling image strip; items duplicated for a seamless loop; pause on hover/focus; click opens the lightbox; speed = `site.config.json → marquee.<area>.secondsPerLoop`; under `prefers-reduced-motion` it is a static horizontally scrollable row with scroll-snap. Images keep 16:9 frames; placeholders keep the dashed frame.

## Home (`index.html`)
Order: Hero → Stats → Services (+ showcase marquee) → Commitments + Certifications → Partners → Latest news → CTA. Alternate dark/light sections.
1. **Hero (split)**: black. **Left ~55%**: dark panel (`--black-900`→`--charcoal-800` gradient) with the stylised lettering pattern; large "BPO" in green, "BUSINESS PROCESS OUTSOURCING" large letter-spaced white, "BRYCEN VIETNAM" + `company_logo_mark_on_dark`, then `home.hero.title/subtitle` and the two buttons. **Right ~45%**: image slot `home_hero_image` (the AI-hand picture has a white background, so it lives in a rounded light frame; it is NOT used as a background behind text). Stacked on mobile (text first).
2. **Stats**: 4 cards from `home.stats[]` — image (`stats[i].image`, 8:5) on top, count-up number, label; footnote `home.stats_note`.
3. **Services** ("Our services", `home.pillars_*`): 2 cards from `home.pillars[]` (Collection shows the "Coming soon" badge, still linked). Below the cards the **showcase marquee** from `home.showcase.items[]` (6 sample images, captions optional).
4. **Commitments** (`home.commitments`) then **Certifications** (top-level `certifications.items[]`, title `home.certifications_title`): 2 portrait certificate cards (image + code + name): **ISO 9001:2015** and **ISO/IEC 27001:2013** (text editable in content; see open questions about the 27001 edition).
5. **Partners**: title/lead from `home.partners`; ONLY the SUBARU logo (slot `subaru_logo`, on a white pill), linking to `subaru.html`, with caption `ui.partner_main`. No other customer logos or names anywhere on Home. Remove old "customers" code/CSS.
6. Latest news (3 newest from `news.json`); final CTA (`home.cta`).

## Subaru (`subaru.html`) — not in the menu
Breadcrumb Home › Partners › SUBARU. Sections: (1) Hero: `subaru_hero` with dark overlay, eyebrow `subaru.hero.eyebrow`, title, subtitle, logo. (2) **Subaru introduction** (`subaru.intro`): two blocks **History** and **Global position**, each image-left/text-right with its slot (`subaru_intro_history`, `subaru_intro_global`); show `global.source` in small text. (3) **Core values & technology** (`subaru.tech`): 4 large rows (image left, text right): Boxer engine, S-AWD, **EyeSight**, SGP — each with its own image slot. **EyeSight is highlighted**: green badge `partnership_badge`, the `partnership` sentence (BPO BRYCEN VIETNAM collaborated with SUBARU and took part in building the product) and the extra image `partnership_image`. (4) CTA → contact. SUBARU is the only named partner on the site.

## About (`about.html`)
1. Intro (`about.intro`).
2. **History timeline**: `about.history.lead` + timeline in **three horizontal rows**: row 1 = **years** evenly spaced across the width (above the pictures), row 2 = **icons** (`icon` slot, in light circles), row 3 = **text** (same position as before). Horizontal scroll with connecting line on desktop; vertical list on mobile. 2025 has no office-opening text.
3. **Offices** (`about.offices.items[]`, 2 cards): **Head office** `Floors 2–6, 25 Nguyễn Văn Cừ, Thuận Hóa, Huế, Vietnam` and **Branch** `28 Lý Thường Kiệt, Thuận Hóa, Huế, Vietnam`. "View map" opens `https://www.google.com/maps/search/?api=1&query=<encodeURIComponent(map_query)>` in a new tab. (Phạm Văn Đồng office removed.)
4. **Multinational collaboration** (`about.global`): dark-green heading, lead in normal section flow, and 3 country cards (Vietnam, Cambodia, Myanmar) in one row on wide screens, each with its image slot. No banner image.

## Services overview (`services.html`)
Lead + overview note, two cards (images `services_overview_3d/2d`; Collection has "Coming soon"), breadcrumb and 2-tab switch (Creation | Collection), small SVG diagrams LiDAR→3D and Dashcam→2D.

## Services › AI Training Data Creation (`services-annotation.html`)
Breadcrumb Home › Services › Creation + 2-tab switch. Hero (title, lead, 3 highlights).
**Left vertical side-nav** (desktop ≥1024px): sticky, follows the screen while scrolling, scroll-spy highlight, title `ui.on_this_page`; entries in the order of `services.annotation.order` = **Use cases → Data types → How we work → Quality control → Information security** (labels `services.annotation.tabs.*`). On mobile it becomes a sticky horizontal chip bar.
Sections in that same order:
1. `#usecases` "What is labeled data used for?" (`usecases`, 4 cards) — placed **before** the work areas.
2. `#modalities` two bands: **3D (LiDAR)** = SEGMENT, BOUNDING BOX; **2D (Image)** = SEGMENT, BOUNDING BOX, KEYPOINT, SATELLITE. Each type is a full-width row: **image(s) left, text right** (`site.config.json → layout.annotationRows`: `image-left` default or `zigzag`); lightbox on images. **Under each row a marquee strip** of 4 images from `services.annotation.strips[type.id]` (label `ui.gallery`) — placeholders for the owner to fill in.
3. `#workflow` 4 numbered steps.
4. `#quality` **Quality control**: `quality.lead`; a wide image slot `quality.flow_image` (empty placeholder where the owner will put an explanatory picture; caption `flow_caption` hidden when empty); the 4 `principles` cards; then the principles image `quality.principles_image` **large and centred** (max ≈ 960px, opens in lightbox). The old drawn layer diagram is **removed** (`quality.layers` data stays unused for future use — do not render it).
5. `#security` **Information security**: `security.title/text`, image `security.image`, and the **Certifications** block (ISO 9001:2015, ISO/IEC 27001:2013 — shared `certifications.items`).
CTA band at the end.

## Services › AI Training Data Collection (`services-collection.html`)
Intentionally empty "coming soon" page: status chip, lead, message, 3 placeholder gallery frames (`services.collection.gallery`), CTA. Do not add technical content.

## Team (`team.html`) — in-page tabs: Organization · Operating flow · Trained people
1. `#org` "Organization structure": headcount number + `org.lead` + ONE large image slot `team_org_image` (owner will add a photo of working with customers conveying trust). **No org-chart drawing.**
2. `#process` "Operating flow": **only BPO BRYCEN VN ↔ Customer** (no BPO JP). Numbered list of `process.steps[]` (8 steps) with an actor chip (`actor`: customer / bpo / both → `process.actors`) beside one image slot `process.image` (owner's working photo). **No swim-lane drawing.**
3. `#people` "People trained in Vietnam and Japan": lead, 3 steps timeline, 3 photos (`people.images`), and a large **Japan country image** slot `people.country_image` with caption.
Recruitment moved to the **Recruitment** page; remove every link to `team.html#recruit`.

## Achievements & Projects (`achievements.html`)
1. **Achievements**: huge "#1" + `awards.headline_text` ("No.1 in Japan") + ONE image slot `awards.image` + the 5-years text and source (rest unchanged). No row of four badges.
2. **Projects**: big "235" + `projects.text` + 3 illustrative image slots (`projects.images`) — **no customer logos** (SUBARU in the text links to `subaru.html`). **Customer satisfaction** block (`projects.satisfaction`: image + title + text): customers always rate highly and keep coming back.

## Vision (`vision.html`)
1. **Direction** (`vision.direction`): text + image slot `vision.direction.image`.
2. **Growth timeline** (`vision.growth`): black section with background image slot `growth_timeline_image`, white heading and three equal-size image cards arranged as pronounced rising steps, left→right; **Now** (Japan + Viet Nam) sits lowest, followed by **Next step: United States** (featured, clean map image `vision_roadmap_usa`) and **Further ahead: Europe (EU)** (image `vision_roadmap_eu`, placeholder). Step headings are dark green on light cards. Vertical timeline on mobile. Nothing else (no recruitment here).

## News (`news.html`)
Unchanged behaviour; images now use `news_*` slots (`news_default` for items without an image). Dark theme styling.

## Recruitment (`recruits.html`, menu tab "Recruitment")
Banner `recruits_banner`; lead; **intro** (`recruits.intro`: text, stats 79 / 187, image `recruits_intro`); filter tabs **All · Open · Closed** (`recruits.filters`); list from `content/recruits.json` sorted by `date` desc (posts as rows/cards: date `YYYY.MM.DD`, status badge, title, summary, location, type, deadline). Status = `status` field; if `deadline` is past and `site.config.json → recruits.autoCloseByDeadline` is true it shows **Closed**. Detail `recruits.html?id=<id>`: full `body` (split paragraphs on blank lines), meta, **Apply** button (`apply_link`, else `mailto:` to `contact.email` with subject `recruits.apply_subject` + title); for closed posts show `labels.closed_note` and no apply button. Empty state `recruits.empty`. Hidden items skipped.

## Contact (`contact.html`) — modelled on https://dataengineering.brycen.co.jp/contact/
Banner `contact_banner`, breadcrumb, lead + `response_note`. **Two columns**: **left** = form + privacy section; **right** = company information in **one vertical column**: logo, company/department name, head-office and branch addresses, email, phone ("call us" box), map link, social icons (all from `site.config.json`, empty = hidden). On mobile the company column goes below the form.
**Form** (`contact.form`): name*, company, department, position, email*, phone, inquiry type* (dropdown `type_options`), message*, consent checkbox*. Flow: validate → **review screen** (`review_title`, Edit / Send) → send. Sending: POST (JSON/FormData) to `site.config.json → contact.form.endpoint` (form-endpoint service that emails the owner; see `docs/release/contact-form-setup.md`); if the endpoint is empty, fall back to a `mailto:` link to `contact.form.recipientEmail` or `contact.email` (button `fallback_mailto`). Honeypot field, disable button while sending, success/error messages from content, no data stored in the browser. Required marks `form.required/optional`.
**Privacy section** "Handling of personal information" (`contact.privacy`): the 10 `items[]` as a definition list; item with `dynamic:"contact"` appends address/email/phone from config; item with `link:"policy"` shows `policy_link_label` linking to `site.config.json → contact.privacyPolicyUrl` (hidden if empty). The consent checkbox sits right under this section.
