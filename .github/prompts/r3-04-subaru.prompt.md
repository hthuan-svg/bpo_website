---
description: "Request 6 – new subaru.html linked from the SUBARU logo."
agent: agent
---
# SUBARU page

Follow AGENTS.md. Specs: docs/overview/page-specs.md (the area you touch), docs/overview/design-system.md, docs/content/content-model.md, docs/images/image-slots.md.
This is an UPDATE of an existing, working site: read the current implementation of what you will touch first, then modify it IN PLACE. Keep conventions (data-* binding, CSS tokens, components). Do not rewrite working parts that are not part of this step.
Scope: ONLY this step. Do not run `git commit`. The content patch and image migration are already applied (step r3-00): use the NEW keys and slot names; do NOT read obsolete keys (listed in revision3/patches/r3.vi.json -> remove). Do not edit text values in content/*.json; if a key is truly missing, add it to vi.json, en.json AND ja.json together and tell me.

Create subaru.html per docs/overview/page-specs.md > Subaru, using keys under subaru.* and ui.*; follow the same page skeleton, header/footer and data-binding as the other pages.
- Breadcrumb Home > Partners > SUBARU. Hero with subaru_hero (dark overlay), eyebrow, title "SUBARU", subtitle, subaru_logo.
- "Subaru introduction" with two blocks (History, Global position), each: image slot left, text right; show subaru.intro.global.source as small text.
- "Core values & technology": 4 large rows (image left, text right) for Boxer engine, S-AWD, EyeSight, SGP using subaru.tech.items[] (image slot per item). The EyeSight row is highlighted: green badge (partnership_badge), the partnership sentence and the extra image (partnership_image).
- CTA to contact.html. Do not add SUBARU to the main menu. Make the SUBARU logo on Home link here and make the word SUBARU in achievements.projects.text a link to subaru.html (do this by rendering the first "SUBARU" occurrence in that text as a link, without hard-coding text).
- Add subaru.html to sitemap.xml. Placeholder-flagged images keep the dashed frame.

Finish: update the checkbox of this step in docs/work/current-work.md. Reply with (1) files changed, (2) how I verify, (3) assumptions, (4) open issues — then STOP and wait for me.

## Definition of done
- subaru.html works in 3 languages; every block has an image slot; EyeSight is visibly highlighted; logo on Home opens the page.
