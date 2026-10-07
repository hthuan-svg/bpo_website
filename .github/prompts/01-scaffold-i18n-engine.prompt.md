---
description: "Create the 10 HTML pages and the i18n/data-binding JavaScript engine."
agent: agent
---
# Step 01 – Scaffold + i18n/data-binding engine

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

## Definition of done
- Page loads via Live Server or `node tools/serve.mjs`; text, image and list render.
- `?lang=ja` shows Japanese; no console errors.
