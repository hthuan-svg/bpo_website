# Project rules: BPO division website – BRYCEN VIETNAM

You are a senior web developer / IT admin (20+ years). The people who will edit content are **non-technical**, so optimise for: easy to edit, easy to understand, hard to break.

## Read first
`docs/01_PROJECT_SPEC.md`, `docs/02_DESIGN_SYSTEM.md`, `docs/03_CONTENT_MODEL.md`, `docs/04_IMAGE_SLOTS.md`.

## Hard rules
1. **Plain static site**: HTML + CSS + JavaScript (ES modules). **No** framework, **no** build step, **no** runtime npm dependency. It must run with VS Code Live Server or `node tools/serve.mjs`.
2. **No hard-coded visible text** in HTML/JS. All text comes from `content/{vi,en,ja}.json`. Whenever you add or change a key, update **all three languages** with the **same key structure**.
3. **No hard-coded image paths.** Every image is a *slot* in `content/images.json` (`data-img="slot_name"`). Never rename an existing slot listed in `docs/04_IMAGE_SLOTS.md`.
4. Contact info, social links, Facebook and map come from `content/site.config.json`. An empty string `""` means **hide** that element entirely (no empty boxes, no dead links).
5. News is read only from `content/news.json`; skip items with `"hidden": true`; sort by `date` descending.
6. Header and footer are injected by `assets/js/layout.js` – never copy them into individual pages.
7. Mobile-first responsive. No dark theme. Respect `prefers-reduced-motion`.
8. Accessibility: semantic HTML, alt text from `images.json` in the current language, WCAG AA contrast, keyboard navigation, `<html lang>` follows the current language.
9. Typography must render Vietnamese diacritics, English and Japanese well; always include system-font fallbacks.
10. No trackers/analytics unless `site.config.json` has `analytics.googleAnalyticsId`.
11. Never put internal material into the site (internal Japanese slide notes, revenue/budget numbers).
12. Every file starts with a short comment saying what it does. Prefer readable code over clever code.
13. Keep placeholder markers `[CẦN BỔ SUNG]`, `[TO ADD]`, `【要追記】` exactly as they are in content files: they are intentional data markers, not typos.

## Data-binding attributes (summary – full spec in docs/03)
`data-i18n`, `data-i18n-html`, `data-i18n-attr`, `data-img`, `data-bg`, `data-list` + `<template>`, `data-field`, `data-img-field`, `data-config`, `data-show-if`.

## Standard layout
```
index.html about.html services.html services-annotation.html services-collection.html
team.html achievements.html vision.html news.html contact.html
assets/css/{tokens,base,components,pages}.css
assets/js/{app,i18n,layout,render,news,social,reveal}.js
assets/images/...             (already provided, see docs/04)
content/{vi,en,ja,news,images,site.config}.json
admin/index.html              (LOCAL editing tool – never deploy)
tools/{serve,validate-content,make-release}.mjs
```

## Working agreement for agent mode
- Do exactly the step requested; do not jump ahead. Do not run `git commit` – the user commits.
- Terminal use: allowed `node tools/*.mjs`, `curl` against the local server, read-only inspection. Do not install global packages or add npm dependencies without asking.
- Do not delete or overwrite files in `assets/images/` or `content/` except where the step says so.
- After each step reply with: files created/changed, how to verify, assumptions, open issues – then stop.
- If a requirement is ambiguous, ask at most ONE question, otherwise proceed with a reasonable assumption and state it.
