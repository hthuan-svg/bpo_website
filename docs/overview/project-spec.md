# Project spec (current)

**Owner:** BPO division (Business Process Outsourcing), BRYCEN VIETNAM Co., Ltd. (Huế). Parent: Brycen Japan (https://www.brycen.co.jp/).
**Goal:** introduce the division and promote its two services — (1) AI Training Data Creation (annotation: 3D LiDAR and 2D image/satellite) — the focus; (2) AI Training Data Collection — page intentionally "coming soon".
**Audience:** customers/partners (mainly Japan), job candidates, group colleagues. **Languages:** vi (default), en, ja with an instant switcher.

## Sitemap
Menu (tabs, immediately left of the language switcher): Home · About · Services (dropdown: AI Training Data Creation, AI Training Data Collection) · Team · Achievements & Projects · Vision · News · Recruitment · Contact.
Not in menu: `subaru.html` (reached by clicking the SUBARU logo on Home and from the SUBARU mention on Achievements).
Footer: logo, contact address block (from `site.config.json`), quick links, social icons.

## Architecture decisions
| Decision | Why | Trade-off |
|---|---|---|
| Static HTML/CSS/JS, no build | Cheap, host anywhere, easy hand-over | No server-side features |
| Text in JSON per language, rendered by JS (`data-*` binding) | Non-technical editing, 3 languages in sync | Non-Google crawlers read less (prerender is an optional later step) |
| Image **slots** in `images.json`, one folder per page | Replace by overwriting a same-named file; every spot has its own name | Renaming needs the migrate tool |
| Contact form via a form-endpoint service (+ `mailto:` fallback) | A static site cannot send email itself | Needs a free account at the service (`docs/release/contact-form-setup.md`) |
| Local `admin/` editor (optional) | Edit JSON through forms | Local only, never deployed |

## Definition of done (whole site)
- 12 pages run without console errors; every page works in vi/en/ja with no raw keys showing.
- Replacing a slot's file changes every place using it; placeholders show the dashed frame.
- No "skip to main content" link anywhere; no other customer's name/logo; only theme tokens (black/green/white/grey).
- `node tools/validate-content.mjs` shows no ✖ (⚠ for remaining placeholders and `[CẦN BỔ SUNG]` is expected until content is supplied).
- Lighthouse mobile: Performance ≥ 85, Accessibility ≥ 95, SEO ≥ 90.
