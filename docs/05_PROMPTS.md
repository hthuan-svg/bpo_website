# 05 – Agent prompts (English)

> **Tiếng Việt:** Các prompt dưới đây viết bằng tiếng Anh để AI hiểu chính xác. Dùng cho **VS Code Agent mode** (GitHub Copilot Chat). Có 2 cách chạy: (A) gõ `/00-audit-kit`, `/01-scaffold-i18n-engine`… trong khung chat (mỗi prompt đã được lưu thành *prompt file* trong `.github/prompts/`); hoặc (B) sao chép khối prompt bên dưới và dán vào chat. Chạy **từng bước một, theo thứ tự**; mở **chat mới** cho mỗi bước; kiểm tra mục *Definition of done* rồi mới `git commit` và sang bước sau.

## How to run (VS Code Agent)
1. Open Copilot Chat, switch the mode dropdown to **Agent**. Pick a strong model.
2. Type `/` and choose the step (e.g. `/01-scaffold-i18n-engine`), press Enter. Or paste the prompt text.
3. The agent reads `AGENTS.md` / `.github/copilot-instructions.md` automatically (workspace instructions). If your setup does not, start with: *"Read AGENTS.md and docs/ first."*
4. Approve its terminal commands when asked (they are limited to `node tools/...` and static checks).
5. Verify with Live Server (or `node tools/serve.mjs`, then open http://localhost:5500). Commit: `git add . && git commit -m "Step NN"`.
6. If something is wrong, use `/fix-bug`. Never move on until the step is OK.

| Command | Step |
|---|---|
| `/00-audit-kit` | Audit the kit |
| `/01-scaffold-i18n-engine` | Scaffold + i18n/data-binding engine |
| `/02-design-system` | Design system (theme) |
| `/03-layout-header-footer` | Header, footer, language switcher |
| `/04-home-page` | Home page |
| `/05-about-page` | About page |
| `/06-services-pages` | Services pages |
| `/07-team-achievements-vision` | Team, Achievements, Vision pages |
| `/08-contact-social` | Contact + social + Facebook |
| `/09-news-system` | News system |
| `/10-admin-tool` | Local admin tool (optional) |
| `/11-seo-a11y-perf` | SEO, sharing, performance, accessibility |
| `/12-validate-qa` | Validation script + QA |
| `/13-deploy` | Deployment package |
| `/14-prerender-optional` | Prerender for SEO (optional) |
| `/fix-bug` | Fix a bug (asks for inputs) |
| `/add-content-block` | Add a new content block in 3 languages |
| `/review-translations` | Review EN/JA translations (read-only) |

---

## Step 00 – Audit the kit  (`/00-audit-kit`)

```text

Read-only step: do not create or modify any file.
1. Read AGENTS.md, everything in docs/, content/ and the file list of assets/images/.
2. Summarize the project in at most 8 lines (goal, pages, architecture, content/image rules).
3. Verify programmatically: (a) content/vi.json, en.json, ja.json are valid JSON with identical key trees; (b) every slot in content/images.json points to an existing file; (c) every slot name referenced in content/*.json (fields image, icon, images, customers, badges) exists in images.json.
4. List risks, ambiguities or missing content you see (max 8 bullets). Known gaps to confirm: contact details are empty; the "AI Training Data Collection" content is thin and marked "[CẦN BỔ SUNG]"; headcount 550 vs 37+523; Japanese/English translations need human review.
```

**Definition of done**
- The agent reports matching key trees and no missing images.
- It names the known content gaps.

---

## Step 01 – Scaffold + i18n/data-binding engine  (`/01-scaffold-i18n-engine`)

```text
Follow AGENTS.md and the files in docs/ (01_PROJECT_SPEC, 02_DESIGN_SYSTEM, 03_CONTENT_MODEL, 04_IMAGE_SLOTS).
Scope: do ONLY this step. Do not start later steps. Do not run `git commit` (I commit myself). Do not change existing text values in content/*.json unless this step says so; when you add keys, add them to vi.json, en.json AND ja.json together.

Build the project skeleton and the rendering engine described in docs/03_CONTENT_MODEL.md.

Create:
- 10 HTML5 pages: index, about, services, services-annotation, services-collection, team, achievements, vision, news, contact. Each has: charset, viewport, <title> and meta description (filled from JSON at runtime), favicon links to assets/images/branding/ (favicon.ico, browser_logo_32.png, browser_logo_180.png), <body data-page="<page-name>">, <div id="site-header"></div>, <main id="main"></main>, <div id="site-footer"></div>, CSS links (assets/css/tokens.css, base.css, components.css, pages.css) and <script type="module" src="assets/js/app.js">.
- assets/js/i18n.js: load content/<lang>.json, site.config.json and images.json. Language resolution order: ?lang= query -> localStorage('lang') -> browser language (vi/en/ja) -> default 'vi'. Provide t(path) that falls back to Vietnamese when a key is missing and calls console.warn with the missing key. Update <html lang>, document.title and the meta description.
- assets/js/render.js: implement ALL attributes in docs/03: data-i18n, data-i18n-html (sanitize: allow only b, i, em, strong, br, a[href]), data-i18n-attr, data-img, data-bg, data-list + <template> + data-field + data-img-field, data-config, data-show-if. Rendering must be re-runnable without a page reload (used when the language changes).
- assets/js/app.js: bootstrap (i18n -> layout hook -> render), and dispatch a 'langchange' CustomEvent on the document after a language switch. Layout is built in step 03; leave a clearly marked hook.
- tools/serve.mjs: zero-dependency Node static file server (port 5500, correct MIME types incl. .json, .svg, .webp, .ico) so the site can be tested without Live Server.
- If a fetch fails, show a friendly message in Vietnamese: "Hãy mở trang bằng Live Server (không bấm đúp file .html)" instead of a blank page.

Put a throwaway test block in index.html: an h1 with data-i18n="home.hero.title", an <img data-img="company_logo">, and a list using data-list="home.stats" with a <template>. No visual styling in this step.

When finished, reply with: (1) files created/changed, (2) how I verify it (Live Server URL or command), (3) assumptions you made, (4) open issues. Then STOP and wait for me.
```

**Definition of done**
- Page loads via Live Server or `node tools/serve.mjs`; text, image and list render.
- `?lang=ja` shows Japanese; no console errors.

---

## Step 02 – Design system (theme)  (`/02-design-system`)

```text
Follow AGENTS.md and the files in docs/ (01_PROJECT_SPEC, 02_DESIGN_SYSTEM, 03_CONTENT_MODEL, 04_IMAGE_SLOTS).
Scope: do ONLY this step. Do not start later steps. Do not run `git commit` (I commit myself). Do not change existing text values in content/*.json unless this step says so; when you add keys, add them to vi.json, en.json AND ja.json together.

Create the design system from docs/02_DESIGN_SYSTEM.md.

- assets/css/tokens.css (CSS variables exactly as specified), base.css (modern reset, fluid typography with clamp(), font stack for Vietnamese/English/Japanese, Japanese rules: word-break: keep-all; line-break: strict), components.css (button, eyebrow + section title, card, stat, timeline, logo-wall, news-card, tag/chip, grid, container, hero, callout/warning box), pages.css (empty with a header comment).
- Fonts: Inter + Be Vietnam Pro + Noto Sans JP via Google Fonts with display=swap, with system fallbacks; add a comment explaining how to self-host in assets/fonts/.
- assets/js/reveal.js: reveal-on-scroll with IntersectionObserver, 300-500 ms, fully disabled under prefers-reduced-motion.
- assets/styleguide.html (internal only): shows every component with sample data.

Design direction: calm, modern, minimal "AI" aesthetic. Lots of white space, large type, thin lines, large radii, one subtle accent colour. Reference the design language of https://www.brycen.co.jp/ (white background, large headline, category label + date like 2026.09.25, arrow "↗" links). Brand colour #7BBE35 from the logo. White text on #7BBE35 fails WCAG AA: use dark text on it, or use #5E9A24 with white text. No neon, no dark theme.

When finished, reply with: (1) files created/changed, (2) how I verify it (Live Server URL or command), (3) assumptions you made, (4) open issues. Then STOP and wait for me.
```

**Definition of done**
- styleguide.html looks clean and consistent; works at phone width.
- Compare feel with brycen.co.jp and tell the agent what to adjust.

---

## Step 03 – Header, footer, language switcher  (`/03-layout-header-footer`)

```text
Follow AGENTS.md and the files in docs/ (01_PROJECT_SPEC, 02_DESIGN_SYSTEM, 03_CONTENT_MODEL, 04_IMAGE_SLOTS).
Scope: do ONLY this step. Do not start later steps. Do not run `git commit` (I commit myself). Do not change existing text values in content/*.json unless this step says so; when you add keys, add them to vi.json, en.json AND ja.json together.

Write assets/js/layout.js that injects the shared header into #site-header and footer into #site-footer, plus the CSS (in components.css).

Header: logo (<img data-img="company_logo">, links to index.html); menu per docs/01_PROJECT_SPEC.md section 2: Home, About, Services (dropdown with 2 children), Team, Achievements & Projects, Vision, News, Contact — labels from ui.nav.*; current page link has aria-current="page" and bold style. On the right a language switcher "VI · EN · 日本語" (buttons with aria-pressed): switching changes language instantly without reloading, saves to localStorage('lang'), and updates ?lang= in the URL via history.replaceState, then fires the 'langchange' event so the page re-renders. Mobile: hamburger button opens a slide-in panel; closes with Esc or outside click. Header is sticky, translucent white with backdrop blur, and shrinks on scroll. Include a "skip to main content" link (ui.skip). Dropdown must be keyboard accessible.
Footer: logo, company + division name, quick links, social icons from site.config.json (inline SVG; hide any icon whose value is ""; open in new tab with rel="noopener noreferrer"), "Brycen Japan website" link (parentCompanySite), copyright.
No hard-coded visible text anywhere (all via content JSON).

When finished, reply with: (1) files created/changed, (2) how I verify it (Live Server URL or command), (3) assumptions you made, (4) open issues. Then STOP and wait for me.
```

**Definition of done**
- Menu and language switch work on all 10 pages; switching language updates header/footer text immediately.
- Mobile menu works.

---

## Step 04 – Home page  (`/04-home-page`)

```text
Follow AGENTS.md and the files in docs/ (01_PROJECT_SPEC, 02_DESIGN_SYSTEM, 03_CONTENT_MODEL, 04_IMAGE_SLOTS).
Scope: do ONLY this step. Do not start later steps. Do not run `git commit` (I commit myself). Do not change existing text values in content/*.json unless this step says so; when you add keys, add them to vi.json, en.json AND ja.json together.

Build index.html using content keys home.* (docs/01 and docs/02):
1. Hero: data-bg="background_main" with a light gradient overlay; eyebrow, large title, subtitle, two buttons (services.html and contact.html).
2. Stats bar: home.stats with count-up animation on scroll, plus the small home.stats_note.
3. "Two core businesses": home.pillars as two large cards with images (field `image` holds a slot name) linking to the field `link`.
4. Commitments: home.commitments as 3 blocks with minimal inline SVG icons.
5. Featured customers: logo wall from the slots listed in achievements.projects.customers (greyscale, colour on hover).
6. Latest news: an empty container with id="home-news" (filled in step 09).
7. Final CTA band: home.cta.
All text/images through data-attributes. Page-specific CSS goes in pages.css. Do not invent new content.

When finished, reply with: (1) files created/changed, (2) how I verify it (Live Server URL or command), (3) assumptions you made, (4) open issues. Then STOP and wait for me.
```

**Definition of done**
- Looks good in vi/en/ja; no awkward line breaks in Japanese; responsive.

---

## Step 05 – About page  (`/05-about-page`)

```text
Follow AGENTS.md and the files in docs/ (01_PROJECT_SPEC, 02_DESIGN_SYSTEM, 03_CONTENT_MODEL, 04_IMAGE_SLOTS).
Scope: do ONLY this step. Do not start later steps. Do not run `git commit` (I commit myself). Do not change existing text values in content/*.json unless this step says so; when you add keys, add them to vi.json, en.json AND ja.json together.

Build about.html: (1) page title (about.page_title); (2) about.intro (3 paragraphs, two-column layout with a suitable image); (3) about.history: lead paragraph + TIMELINE from about.history.timeline (year, icon slot from field `icon`, text). Horizontal on desktop (smooth horizontal scroll, connecting line, the 2025 milestone emphasized), vertical on mobile. The icons are images with a white background: wrap them in a soft circle or use mix-blend-mode: multiply so no white box shows. (4) about.offices: three cards with image (field `image`), name and address, and a "View map" link opening Google Maps with the address as the search query.

When finished, reply with: (1) files created/changed, (2) how I verify it (Live Server URL or command), (3) assumptions you made, (4) open issues. Then STOP and wait for me.
```

**Definition of done**
- 7 milestones in order 2015 to 2025; clean on mobile.

---

## Step 06 – Services pages  (`/06-services-pages`)

```text
Follow AGENTS.md and the files in docs/ (01_PROJECT_SPEC, 02_DESIGN_SYSTEM, 03_CONTENT_MODEL, 04_IMAGE_SLOTS).
Scope: do ONLY this step. Do not start later steps. Do not run `git commit` (I commit myself). Do not change existing text values in content/*.json unless this step says so; when you add keys, add them to vi.json, en.json AND ja.json together.

Build three pages:
- services.html: services.lead + services.overview_note; two large cards linking to the two sub-pages (images background_services_3d and background_services_2d); a minimal inline-SVG diagram "LiDAR scanner -> 3D data" and "Dashcam -> 2D data".
- services-annotation.html: title + lead; two groups (services.annotation.group_3d and group_2d); render services.annotation.items filtered by field `group` ("3d"/"2d"); each item has title, text and 1-2 images (field `images` is an array of slot names) in rounded frames with a simple keyboard-accessible lightbox (Esc closes); a "Quality control" block with image service_quality_control; contact CTA.
- services-collection.html: services.collection.lead + the two items with images; render services.collection.todo inside a soft-yellow callout ONLY when the string starts with "[" or "【" (so it disappears once real content replaces the placeholder). Contact CTA.

When finished, reply with: (1) files created/changed, (2) how I verify it (Live Server URL or command), (3) assumptions you made, (4) open issues. Then STOP and wait for me.
```

**Definition of done**
- Lightbox works; the collection page shows the yellow [CẦN BỔ SUNG] callout.

---

## Step 07 – Team, Achievements, Vision pages  (`/07-team-achievements-vision`)

```text
Follow AGENTS.md and the files in docs/ (01_PROJECT_SPEC, 02_DESIGN_SYSTEM, 03_CONTENT_MODEL, 04_IMAGE_SLOTS).
Scope: do ONLY this step. Do not start later steps. Do not run `git commit` (I commit myself). Do not change existing text values in content/*.json unless this step says so; when you add keys, add them to vi.json, en.json AND ja.json together.

Build three pages from team.*, achievements.*, vision.*:
- team.html: large headcount number (structure.stat_value) + text + detail; "Operating flow" (team.flow) as a swim-lane diagram in HTML/CSS: three lanes (flow.lanes) by three phases (flow.phases[].steps) rendered as connected steps; on mobile collapse to a vertical list grouped by phase. "Career growth" (team.growth) with its three images (field `images`).
- achievements.html: awards (large "5", the four award_top1_* badges, source) and projects (large "235", text, customer logo wall).
- vision.html: direction (text + customer logos; a simple minimal inline-SVG illustration of the USA is optional — if it gets complex, use a simpler illustration and say so), recruit (text + the two numbers 79 and 187 + contact button).
Use only the data already in content/*.json.

When finished, reply with: (1) files created/changed, (2) how I verify it (Live Server URL or command), (3) assumptions you made, (4) open issues. Then STOP and wait for me.
```

**Definition of done**
- All three pages complete; the flow diagram is readable on a phone.

---

## Step 08 – Contact + social + Facebook  (`/08-contact-social`)

```text
Follow AGENTS.md and the files in docs/ (01_PROJECT_SPEC, 02_DESIGN_SYSTEM, 03_CONTENT_MODEL, 04_IMAGE_SLOTS).
Scope: do ONLY this step. Do not start later steps. Do not run `git commit` (I commit myself). Do not change existing text values in content/*.json unless this step says so; when you add keys, add them to vi.json, en.json AND ja.json together.

Build contact.html and assets/js/social.js:
- contact.html: lead; info cards from site.config.json (address per language, email, phone). Hide any empty item. Email is a mailto: link, phone a tel: link. Embedded map iframe from contact.mapEmbedUrl (hidden if empty, loading="lazy"). A "Send a request via form" button opening contact.formUrl (hidden if empty). Social icons block. If ALL contact values are empty, show contact.note in a warning callout.
- social.js: (a) helper that builds a Facebook share link https://www.facebook.com/sharer/sharer.php?u=<encoded url>; (b) a function that renders the Facebook Page Plugin iframe (https://www.facebook.com/plugins/page.php?href=<pageUrl>&tabs=timeline&width=500&height=<height>&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=false) ONLY when facebookPagePlugin.enabled is true and pageUrl is non-empty; if blocked/failed, show a plain "Open our Facebook page" link instead.
- Make sure site.config.json documents keys youtube, linkedin, instagram, zalo in its "_readme".
All external links: target="_blank" rel="noopener noreferrer".

When finished, reply with: (1) files created/changed, (2) how I verify it (Live Server URL or command), (3) assumptions you made, (4) open issues. Then STOP and wait for me.
```

**Definition of done**
- Putting a Facebook URL in site.config.json makes icons appear; clearing it hides them cleanly.

---

## Step 09 – News system  (`/09-news-system`)

```text
Follow AGENTS.md and the files in docs/ (01_PROJECT_SPEC, 02_DESIGN_SYSTEM, 03_CONTENT_MODEL, 04_IMAGE_SLOTS).
Scope: do ONLY this step. Do not start later steps. Do not run `git commit` (I commit myself). Do not change existing text values in content/*.json unless this step says so; when you add keys, add them to vi.json, en.json AND ja.json together.

Build the news system on content/news.json (schema in docs/03):
- assets/js/news.js: load news.json; skip items with hidden:true; sort by date descending; format dates as YYYY.MM.DD; category label from news.categories in the current language; title/summary in the current language (fallback to vi).
- Home: render the 3 latest items as cards into #home-news plus a "View all news" button.
- news.html: card grid; category filter tabs ("All" + categories that exist in the data), in the style of the News section of https://www.brycen.co.jp/; "Show more" after 9 items; ui.news_empty when empty; Facebook Page Plugin (from step 08) in a side column when enabled.
- news.html?id=<id>: detail view (image, date, category, title, summary, "Read original ↗" if link, "Open Facebook post" if facebook_post, Facebook share button, Back button). Unknown id -> friendly message.
- Language switch must re-render list and detail immediately.
Add nothing else to news.json; the two existing real items and the hidden "_template" stay.

When finished, reply with: (1) files created/changed, (2) how I verify it (Live Server URL or command), (3) assumptions you made, (4) open issues. Then STOP and wait for me.
```

**Definition of done**
- Adding a block to news.json shows it on Home and News; setting hidden:true removes it.

---

## Step 10 – Local admin tool (optional)  (`/10-admin-tool`)

```text
Follow AGENTS.md and the files in docs/ (01_PROJECT_SPEC, 02_DESIGN_SYSTEM, 03_CONTENT_MODEL, 04_IMAGE_SLOTS).
Scope: do ONLY this step. Do not start later steps. Do not run `git commit` (I commit myself). Do not change existing text values in content/*.json unless this step says so; when you add keys, add them to vi.json, en.json AND ja.json together.

Create admin/index.html (single file, plain HTML/CSS/JS): a LOCAL content editor for non-technical users. It must never be deployed: put a visible warning at the top, and exclude admin/ in .gitignore-style deploy rules (create .deployignore).
Features:
1. "Choose project folder" using the File System Access API (showDirectoryPicker; Chrome/Edge) to read/write content/*.json directly. Fallback for other browsers: load files and "Download" edited versions.
2. News tab: list; Add/Edit/Hide/Delete; form with VI/EN/JA fields side by side, date picker, category dropdown, image-slot dropdown with preview, link and Facebook-post fields; auto-generate an ASCII kebab-case id from the title; require all 3 languages (allow saving as draft with hidden:true when incomplete).
3. Content tab: browse the key tree of vi/en/ja side by side for editing; highlight keys that are empty in any language.
4. Images tab: list slots with previews, edit alt text in 3 languages, "Choose new image" to overwrite the file at the slot's path (when write access exists), with recommended sizes from docs/04.
5. Settings tab: form for site.config.json (email, phone, 3-language address, social links, Facebook plugin, map, form URL).
6. Every save: validate JSON, pretty-print (indent 2, keep Vietnamese/Japanese unescaped), confirm before overwriting.
Simple UI with Vietnamese labels and a short hint under each field.

When finished, reply with: (1) files created/changed, (2) how I verify it (Live Server URL or command), (3) assumptions you made, (4) open issues. Then STOP and wait for me.
```

**Definition of done**
- Adding a news item via the form makes it appear on news.html; news.json stays valid.

---

## Step 11 – SEO, sharing, performance, accessibility  (`/11-seo-a11y-perf`)

```text
Follow AGENTS.md and the files in docs/ (01_PROJECT_SPEC, 02_DESIGN_SYSTEM, 03_CONTENT_MODEL, 04_IMAGE_SLOTS).
Scope: do ONLY this step. Do not start later steps. Do not run `git commit` (I commit myself). Do not change existing text values in content/*.json unless this step says so; when you add keys, add them to vi.json, en.json AND ja.json together.

Review and improve all 10 pages:
- <title>, meta description, canonical, Open Graph + Twitter Card (image og_share 1200x630), theme-color, full favicon set (browser_logo*).
- hreflang for vi/en/ja (via ?lang=), matching og:locale. Note: Facebook/Zalo crawlers do not run JavaScript, so static OG tags use Vietnamese defaults; document this in docs/06_EDITOR_GUIDE.md.
- sitemap.xml (use a placeholder domain "https://example.com" and tell me where to change it), robots.txt (disallow /admin/ and /assets/styleguide.html), friendly 404.html.
- Performance: loading="lazy" + width/height on non-hero images, preload hero image and critical fonts, avoid layout shift, home page total transfer < 1.5 MB.
- Accessibility: semantic landmarks, heading order h1->h2->h3, visible focus, WCAG AA contrast, alt text from images.json in the right language, full keyboard navigation.
- JSON-LD Organization (name, logo, address if present, sameAs from non-empty social links).
Report what you changed and how I can run Lighthouse in Chrome DevTools.

When finished, reply with: (1) files created/changed, (2) how I verify it (Live Server URL or command), (3) assumptions you made, (4) open issues. Then STOP and wait for me.
```

**Definition of done**
- Lighthouse (mobile): Performance >= 85, Accessibility >= 95, SEO >= 90.

---

## Step 12 – Validation script + QA  (`/12-validate-qa`)

```text
Follow AGENTS.md and the files in docs/ (01_PROJECT_SPEC, 02_DESIGN_SYSTEM, 03_CONTENT_MODEL, 04_IMAGE_SLOTS).
Scope: do ONLY this step. Do not start later steps. Do not run `git commit` (I commit myself). Do not change existing text values in content/*.json unless this step says so; when you add keys, add them to vi.json, en.json AND ja.json together.

Write tools/validate-content.mjs (plain Node, no npm install) that checks:
1. vi/en/ja.json are valid and have identical key sets (list missing/extra keys); warn on empty strings or strings starting with "[CẦN BỔ SUNG]", "[TO ADD]" or "【要追記】".
2. Every slot in images.json: file exists and alt exists in all 3 languages; every slot name referenced anywhere (HTML data-img / data-bg, JSON fields image, images, icon, customers, badges) exists in images.json.
3. news.json: unique ids, date format YYYY-MM-DD, valid category, title+summary in 3 languages (unless hidden:true), image is a valid slot.
4. site.config.json: URLs valid when non-empty.
Output must be friendly for non-technical users (✔ / ✖ / ⚠, which file, which key, how to fix) and exit non-zero on errors. Add validate.bat (double-click on Windows).
Then audit the whole site against "Definition of Done" in docs/01_PROJECT_SPEC.md (use `node tools/serve.mjs` and curl/static checks, and a headless browser if available), list remaining defects with fixes, and fix small ones yourself.

When finished, reply with: (1) files created/changed, (2) how I verify it (Live Server URL or command), (3) assumptions you made, (4) open issues. Then STOP and wait for me.
```

**Definition of done**
- `node tools/validate-content.mjs` has no ✖ (⚠ about [CẦN BỔ SUNG] is expected until content is added).

---

## Step 13 – Deployment package  (`/13-deploy`)

```text
Follow AGENTS.md and the files in docs/ (01_PROJECT_SPEC, 02_DESIGN_SYSTEM, 03_CONTENT_MODEL, 04_IMAGE_SLOTS).
Scope: do ONLY this step. Do not start later steps. Do not run `git commit` (I commit myself). Do not change existing text values in content/*.json unless this step says so; when you add keys, add them to vi.json, en.json AND ja.json together.

Prepare deployment. Create docs/08_DEPLOY.md (Vietnamese, step by step) for three options and recommend one:
(a) GitHub Pages / Cloudflare Pages / Netlify (include _headers or netlify.toml: long cache for css/js/images, short cache (max 5 minutes) for content/*.json so news updates quickly, block /admin/);
(b) internal Nginx/IIS server (sample config, MIME types for .json/.webp/.svg, gzip/brotli, block /admin/);
(c) company sub-domain (e.g. bpo.<domain>): DNS and HTTPS steps.
Create .deployignore listing what must NOT be published: admin/, tools/, docs/, assets/styleguide.html, AGENTS.md, CLAUDE.md, .github/, validate.bat. Do NOT put these in .gitignore (they must stay in version control). Write tools/make-release.mjs that copies only the public files into dist/ following .deployignore, and add dist/ to .gitignore. Remind me to complete docs/07_PUBLISH_CHECKLIST.md before going public.

When finished, reply with: (1) files created/changed, (2) how I verify it (Live Server URL or command), (3) assumptions you made, (4) open issues. Then STOP and wait for me.
```

**Definition of done**
- `dist/` runs standalone (serve the dist folder).

---

## Step 14 – Prerender for SEO (optional)  (`/14-prerender-optional`)

```text
Follow AGENTS.md and the files in docs/ (01_PROJECT_SPEC, 02_DESIGN_SYSTEM, 03_CONTENT_MODEL, 04_IMAGE_SLOTS).
Scope: do ONLY this step. Do not start later steps. Do not run `git commit` (I commit myself). Do not change existing text values in content/*.json unless this step says so; when you add keys, add them to vi.json, en.json AND ja.json together.

Only needed if search engines must read full content without running JavaScript. Write tools/prerender.mjs (Node) that generates static HTML for every page x language into dist/vi/, dist/en/, dist/ja/ using the existing data-* attributes and JSON (do not rewrite content), with hreflang, canonical and per-language sitemap. The existing JS must "hydrate" (attach events only, not rebuild). Editors keep editing JSON as before; publishing = `node tools/prerender.mjs`.

When finished, reply with: (1) files created/changed, (2) how I verify it (Live Server URL or command), (3) assumptions you made, (4) open issues. Then STOP and wait for me.
```

**Definition of done**
- dist/<lang>/ pages contain full text when JavaScript is disabled.

---

## Rescue prompts

### Fix a bug (`/fix-bug`)
```text
Page: ${input:page:Page file, e.g. about.html}
Problem: ${input:problem:Describe what is wrong}
Console error (optional): ${input:error:Paste console error}

Find the root cause and apply the smallest fix. Do not restructure content or image slots. Follow AGENTS.md. Explain the cause and how I verify the fix.
```

### Add a content block (`/add-content-block`)
```text
Add to page ${input:page:Page file, e.g. services.html} a new block titled "${input:title:Block title (Vietnamese)}" containing: ${input:details:What the block contains}.
I provide the Vietnamese text; you translate to English and Japanese and clearly list which strings need human review. Add the matching keys to ALL THREE content/*.json files with identical structure. Use image slot ${input:slot:Existing slot name, or "new"}; if a new slot is needed, add it to images.json and tell me which file to place where. Update docs/03_CONTENT_MODEL.md and docs/04_IMAGE_SLOTS.md if anything changes. Follow AGENTS.md.
```

### Review translations (`/review-translations`)
```text
Review content/en.json and content/ja.json against content/vi.json: completeness of meaning, consistent terminology (annotation, PointCloud, LiDAR, Top 1 / No.1, BPO), and a professional corporate tone. Do NOT edit files. Output a table: key | current | suggestion | reason, grouped by language, ordered by importance.
```
