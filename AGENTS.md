# Project rules — BPO division website, BRYCEN VIETNAM

You are a senior web developer / IT admin. The people who edit this site are **non-technical**: optimise for easy to edit, easy to understand, hard to break.
This file is the single source of truth for rules. Current page behaviour is specified in `docs/overview/page-specs.md`.

## Start of every session (read in this order)
1. `docs/README.md` (index) → 2. `docs/work/current-work.md` (what is done / next) → 3. `docs/overview/page-specs.md` and `docs/overview/design-system.md` for the page/area you touch → 4. `docs/content/content-model.md` and `docs/images/image-slots.md` when you touch text or images.
If asked to "start a session", run `/session-start`.

## Stack and layout
Plain static site: HTML + CSS + JavaScript (ES modules). **No** framework, **no** build step, **no** runtime npm dependency. Runs with VS Code Live Server or `node tools/serve.mjs` (http://localhost:5500).
```
*.html   index about services services-annotation services-collection services-data-engineering
         team achievements vision news recruits contact subaru (13 pages; subaru + recruits are not-in-footer extras, see page-specs)
assets/css/{tokens,base,components,pages}.css     assets/js/*.js     (header/footer injected by layout.js)
assets/images/<page>/<slot>.<ext>                 one folder per page: home about services team achievements vision news contact subaru recruits + common
assets/images/_unused/                            retired images (never referenced, never deployed)
content/{vi,en,ja}.json  news.json  recruits.json  images.json  site.config.json
tools/*.mjs   admin/ (local editor, never deploy)   docs/   revision3/ (patch data used by tools)   .github/prompts/
```

## Hard rules
1. **No hard-coded visible text** in HTML/JS. All text comes from `content/{vi,en,ja}.json`. When you add or change a key, change **all three languages** with the **same key structure**.
2. **No hard-coded image paths.** Every image is a *slot* in `content/images.json`, used via `data-img="slot"` / `data-bg="slot"` or a slot name stored in content. Slot id = file name (without extension) = `<page>_<section>_<item>[_<nn>]`, stored in `assets/images/<page>/`. Never rename or move a slot without updating `images.json` (use `tools/migrate-images.mjs` conventions). Shared images live in `common/` (logos, ISO certificates, soft background).
3. A slot with `"placeholder": true` is an intentional empty spot: keep it, render it with the dashed frame + `ui.image_placeholder` label, never delete it. The owner replaces the file and sets it to `false`.
4. Contact info, address, social links, Facebook, map, form endpoint come from `content/site.config.json`. An empty string means **hide** that element entirely (no empty boxes, no dead links).
5. News from `content/news.json`; recruitment posts from `content/recruits.json`. Skip `"hidden": true`. Sort by `date` descending.
6. Header and footer are injected by `assets/js/layout.js`; never copy them into pages. **There is no "skip to main content" link** (removed on purpose).
7. **Theme: black + green**, with white and grey for balance (see `docs/overview/design-system.md`). Use only CSS tokens from `tokens.css`; no hard-coded colours. Dark sections use `company_logo_on_dark`; light sections use `company_logo`.
8. Mobile-first and responsive; respect `prefers-reduced-motion` (marquees become static scroll rows, animations off).
9. Accessibility: semantic HTML, alt text from `images.json` in the current language, WCAG AA contrast (verified tokens only), keyboard operable (dropdown, lightbox, tabs, side-nav, marquee pause), `<html lang>` follows language.
10. Fonts must render Vietnamese diacritics, English and Japanese; keep system fallbacks.
11. No trackers/analytics unless `site.config.json → analytics.googleAnalyticsId` is set. The contact privacy text states that cookies/web beacons are not used for personal data; if analytics is added, that text must be reviewed.
12. Never put internal material on the site (internal slide notes, revenue/budget numbers). Do not add other customers' names or logos: **SUBARU is the only named partner** on the site.
13. Intentional data markers must stay exactly as written: `[CẦN BỔ SUNG]`, `[TO ADD]`, `【要追記】`, and the role codes VNA / VNC / VNSC / SubPL / PL (VNA = Annotator, VNC = Checker, VNSC = Super Checker, SubPL = Sub Project Leader, PL = Project Leader).
14. Every file starts with a short comment saying what it does. Prefer readable code over clever code.
15. Obsolete content keys are listed in `revision3/patches/r3.vi.json → remove`. New code must not read them; they are deleted by `node tools/apply-patch.mjs revision3 --cleanup` at the end of the revision.

## Tools (run in terminal; safe)
`node tools/serve.mjs` · `node tools/validate-content.mjs` · `node tools/apply-patch.mjs <revisionN> [--dry-run|--cleanup]` · `node tools/migrate-images.mjs [--dry-run]` · `node tools/reorganize-docs.mjs [--dry-run]`.

## Working agreement (agent mode)
- Do exactly the step requested; do not jump ahead. **Do not run `git commit`** — the user commits.
- Read the current implementation first, then modify **in place**; keep conventions (data-* binding, tokens, components). Do not rewrite working parts outside the step.
- Terminal: only the tools above, `curl` to localhost, read-only inspection. No global installs, no new npm dependencies without asking.
- Do not delete/overwrite files in `assets/images/` or `content/` unless the step says so.
- After each step reply with: (1) files changed, (2) how to verify, (3) assumptions, (4) open issues; then STOP. Update `docs/work/current-work.md` checkboxes for the step you finished.
- If a requirement is ambiguous ask at most ONE question; otherwise proceed with a reasonable assumption and state it.
