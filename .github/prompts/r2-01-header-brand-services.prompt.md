---
description: "Requests 1-3: tabs left of the language switch, big BPO lockup, Services hierarchy."
agent: agent
---
# Header tabs, BPO brand lockup, Services as parent

Follow AGENTS.md (including the "Revision 2 rules" section) and docs/09_REVISION_2_SPEC.md.
This is a REVISION of an existing, working site. First read the current implementation of everything you will touch, then modify it IN PLACE. Keep existing conventions (data-* binding, CSS tokens, components, file layout). Do not rewrite working parts that are not part of this step.
Scope: do ONLY this step. Do not run `git commit` (I commit myself). The content patch is already applied: use the new keys; do NOT use obsolete keys (listed in revision2/patches/r2.vi.json -> remove). Do not edit text values in content/*.json unless this step says so; if you must add a key, add it to vi.json, en.json AND ja.json together.
Reference images (view them if you can; otherwise rely on the structured data in content/*.json): docs/reference/slide17_org_chart.png, docs/reference/slide18_operating_flow.png, docs/reference/slide25_usa_map_full.png.

Implement requests 1, 2 and 3 from docs/09_REVISION_2_SPEC.md.

1. HEADER TABS (assets/js/layout.js + CSS). Layout: [logo + compact brand] ........ [main-menu TABS][language switcher]. The main menu becomes clearly clickable tabs placed immediately to the LEFT of the language switcher. Style: pill/underline tabs with hover state and a clear active indicator (aria-current="page"); Services keeps its dropdown with two children. Items: Home, About, Services, Team, Achievements & Projects, Vision, News, Contact (ui.nav.*). Must not wrap onto two lines: below ~1100px switch to the existing hamburger panel; the language switcher always stays visible. Add aria-label from ui.tabs_label to the nav.
2. BRAND LOCKUP. Header: logo image + thin divider + a bold "BPO" badge (ui.brand.dept_short) + small uppercase "BUSINESS PROCESS OUTSOURCING" (ui.brand.dept_full, hidden below ~700px, but "BPO" always visible). Home hero: remove the small eyebrow "BRYCEN VIETNAM · BPO" (home.hero.eyebrow is obsolete) and replace it with a large lockup stacked above the headline: huge "BPO" (clamp ~4.5rem–9rem, very bold, brand colour accent), under it "BUSINESS PROCESS OUTSOURCING" in large letter-spaced uppercase, then "BRYCEN VIETNAM" with the company_logo_mark. Use ui.brand.* only (no hard-coded text). Keep the existing hero title, subtitle, buttons and stats. Also make footer say ui.brand.dept_full under the company name.
3. SERVICES HIERARCHY. "AI Training Data Creation" and "AI Training Data Collection" are children of Services, never top-level. (a) Add a reusable breadcrumb component (aria-label ui.breadcrumb) "Home > Services > <current>" on services.html, services-annotation.html, services-collection.html. (b) Add a segmented switch (two tabs) at the top of those three pages to jump between the two services. (c) On the Home page, change the section above the two cards to use home.pillars_eyebrow + home.pillars_title ("Our services"); the cards come from home.pillars; when `coming_soon` is true show a "Coming soon" badge (ui.coming_soon) and keep the link working.

When finished, reply with: (1) files created/changed, (2) how I verify it (URL/command), (3) assumptions you made, (4) open issues. Then STOP and wait for me.

## Definition of done
- Tabs sit left of VI/EN/日本語; active tab obvious; no wrapping at 1100-1400px.
- BPO is unmistakable in header and hero in all 3 languages.
- Breadcrumb + switch visible on the 3 service pages; Home shows the Services section.
