---
description: "Request 3 – footer contact address, remove the skip link, add the Recruitment tab."
agent: agent
---
# Header & footer

Follow AGENTS.md. Specs: docs/overview/page-specs.md (the area you touch), docs/overview/design-system.md, docs/content/content-model.md, docs/images/image-slots.md.
This is an UPDATE of an existing, working site: read the current implementation of what you will touch first, then modify it IN PLACE. Keep conventions (data-* binding, CSS tokens, components). Do not rewrite working parts that are not part of this step.
Scope: ONLY this step. Do not run `git commit`. The content patch and image migration are already applied (step r3-00): use the NEW keys and slot names; do NOT read obsolete keys (listed in revision3/patches/r3.vi.json -> remove). Do not edit text values in content/*.json; if a key is truly missing, add it to vi.json, en.json AND ja.json together and tell me.

1. FOOTER (assets/js/layout.js + CSS): add the contact-address block described in docs/overview/page-specs.md > Global > Footer. Take head-office and branch addresses from site.config.json -> contact.address[lang] (fall back to about.offices[].address if empty), plus email (mailto:) and phone (tel:); every item is hidden when empty; headings from ui.footer.*; keep logo (on dark), department lockup, quick links, social icons, Brycen Japan link and copyright.
2. REMOVE the "skip to main content" link everywhere: markup, CSS, JS, and every use of ui.skip. (The key itself is deleted later by the cleanup step.)
3. HEADER: add the "Recruitment" tab (ui.nav.recruits -> recruits.html) after News. With 9 tabs make sure tabs never wrap: switch to the hamburger panel below ~1280px and keep the language switcher visible. Keep the tabs immediately left of the language switcher; Services keeps its dropdown. Use company_logo_on_dark in the header.
4. Add the sitemap/quick-link entries for recruits.html (and subaru.html in sitemap.xml only), nothing else.

Finish: update the checkbox of this step in docs/work/current-work.md. Reply with (1) files changed, (2) how I verify, (3) assumptions, (4) open issues — then STOP and wait for me.

## Definition of done
- Footer shows the addresses from site.config.json (try filling then clearing them); no skip link anywhere; 9 tabs fit or collapse cleanly.
