---
description: "Shared header/footer with menu and VI/EN/JA language switch."
agent: agent
---
# Step 03 – Header, footer, language switcher

Follow AGENTS.md and the files in docs/ (01_PROJECT_SPEC, 02_DESIGN_SYSTEM, 03_CONTENT_MODEL, 04_IMAGE_SLOTS).
Scope: do ONLY this step. Do not start later steps. Do not run `git commit` (I commit myself). Do not change existing text values in content/*.json unless this step says so; when you add keys, add them to vi.json, en.json AND ja.json together.

Write assets/js/layout.js that injects the shared header into #site-header and footer into #site-footer, plus the CSS (in components.css).

Header: logo (<img data-img="company_logo">, links to index.html); menu per docs/01_PROJECT_SPEC.md section 2: Home, About, Services (dropdown with 2 children), Team, Achievements & Projects, Vision, News, Contact — labels from ui.nav.*; current page link has aria-current="page" and bold style. On the right a language switcher "VI · EN · 日本語" (buttons with aria-pressed): switching changes language instantly without reloading, saves to localStorage('lang'), and updates ?lang= in the URL via history.replaceState, then fires the 'langchange' event so the page re-renders. Mobile: hamburger button opens a slide-in panel; closes with Esc or outside click. Header is sticky, translucent white with backdrop blur, and shrinks on scroll. Include a "skip to main content" link (ui.skip). Dropdown must be keyboard accessible.
Footer: logo, company + division name, quick links, social icons from site.config.json (inline SVG; hide any icon whose value is ""; open in new tab with rel="noopener noreferrer"), "Brycen Japan website" link (parentCompanySite), copyright.
No hard-coded visible text anywhere (all via content JSON).

When finished, reply with: (1) files created/changed, (2) how I verify it (Live Server URL or command), (3) assumptions you made, (4) open issues. Then STOP and wait for me.

## Definition of done
- Menu and language switch work on all 10 pages; switching language updates header/footer text immediately.
- Mobile menu works.
