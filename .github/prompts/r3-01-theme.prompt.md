---
description: "Request 1 – convert the whole site to the black/green theme."
agent: agent
---
# Theme: black + green

Follow AGENTS.md. Specs: docs/overview/page-specs.md (the area you touch), docs/overview/design-system.md, docs/content/content-model.md, docs/images/image-slots.md.
This is an UPDATE of an existing, working site: read the current implementation of what you will touch first, then modify it IN PLACE. Keep conventions (data-* binding, CSS tokens, components). Do not rewrite working parts that are not part of this step.
Scope: ONLY this step. Do not run `git commit`. The content patch and image migration are already applied (step r3-00): use the NEW keys and slot names; do NOT read obsolete keys (listed in revision3/patches/r3.vi.json -> remove). Do not edit text values in content/*.json; if a key is truly missing, add it to vi.json, en.json AND ja.json together and tell me.

Convert the ENTIRE site to the black + green theme defined in docs/overview/design-system.md.
- Replace assets/css/tokens.css with the new tokens exactly as specified (verified contrast). Remove all old light-theme/mint tokens and every hard-coded colour in base.css, components.css, pages.css, inline <style> and JS; everything must use tokens.
- Apply the section rhythm: header, hero and footer black; content sections alternate dark / light (never more than two of the same kind in a row). Cards, tabs, buttons, chips, forms, timeline, tables, lightbox, placeholder frames, back-to-top and focus rings all follow the design system (primary button = green background + black text; text links on light use --green-700).
- Logos: use slot company_logo_on_dark on dark surfaces and company_logo on light surfaces (header, footer, any card). Images with a white background (timeline icons, award badge, certificates, SUBARU logo) must sit on a light rounded mat when placed on dark.
- Update assets/styleguide.html to show every component in both dark and light contexts.
- Keep all layouts/content as they are; this step is colour, surfaces, shadows and contrast only.
Verify contrast with a quick script or manual check for body text, muted text, links, buttons and badges on both surface types (AA).

Finish: update the checkbox of this step in docs/work/current-work.md. Reply with (1) files changed, (2) how I verify, (3) assumptions, (4) open issues — then STOP and wait for me.

## Definition of done
- Every page is black/green with white & grey balance; no leftover light-theme colours; logos readable on dark.
