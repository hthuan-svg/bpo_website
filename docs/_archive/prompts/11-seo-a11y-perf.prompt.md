---
description: "SEO/OG/sitemap, performance and a11y pass on all pages."
agent: agent
---
# Step 11 – SEO, sharing, performance, accessibility

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

## Definition of done
- Lighthouse (mobile): Performance >= 85, Accessibility >= 95, SEO >= 90.
