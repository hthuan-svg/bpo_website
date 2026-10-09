---
description: "Request 7 – timeline layout, 2 offices, multinational collaboration."
agent: agent
---
# About page

Follow AGENTS.md. Specs: docs/overview/page-specs.md (the area you touch), docs/overview/design-system.md, docs/content/content-model.md, docs/images/image-slots.md.
This is an UPDATE of an existing, working site: read the current implementation of what you will touch first, then modify it IN PLACE. Keep conventions (data-* binding, CSS tokens, components). Do not rewrite working parts that are not part of this step.
Scope: ONLY this step. Do not run `git commit`. The content patch and image migration are already applied (step r3-00): use the NEW keys and slot names; do NOT read obsolete keys (listed in revision3/patches/r3.vi.json -> remove). Do not edit text values in content/*.json; if a key is truly missing, add it to vi.json, en.json AND ja.json together and tell me.

Update about.html per docs/overview/page-specs.md > About.
1. TIMELINE (about.history): lay it out in three horizontal rows — years row on top, evenly spaced across the width; icons row (slot in `icon`, inside light circles); text row at the same place as before. Connecting line; horizontal scroll on narrow desktop; vertical list on mobile. The 2025 text no longer mentions new offices (content already updated).
2. OFFICES (about.offices.items[], now 2): Head office and Branch cards with image, name, full address; "View map" opens https://www.google.com/maps/search/?api=1&query=<encodeURIComponent(map_query)> in a new tab (noopener). Remove all remaining code that referenced the Phạm Văn Đồng office.
3. NEW SECTION "Multinational collaboration" (about.global): banner image about_global_banner, lead, three country cards (Vietnam, Cambodia, Myanmar) each with its own image slot (placeholder styling).

Finish: update the checkbox of this step in docs/work/current-work.md. Reply with (1) files changed, (2) how I verify, (3) assumptions, (4) open issues — then STOP and wait for me.

## Definition of done
- Years are in one row above the icons; 2 offices with working map links; 3 country cards with image slots.
