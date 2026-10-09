---
description: "Request 9: up-arrow button that follows the scroll."
agent: agent
---
# Floating back-to-top button

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

## Definition of done
- Appears after scrolling, disappears at top, works with keyboard, label changes with language.
