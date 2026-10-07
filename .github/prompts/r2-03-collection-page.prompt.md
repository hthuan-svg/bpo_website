---
description: "Request 4: keep the page empty but give me image drop-in places."
agent: agent
---
# Blank Data Collection page with image slots

Follow AGENTS.md (including the "Revision 2 rules" section) and docs/09_REVISION_2_SPEC.md.
This is a REVISION of an existing, working site. First read the current implementation of everything you will touch, then modify it IN PLACE. Keep existing conventions (data-* binding, CSS tokens, components, file layout). Do not rewrite working parts that are not part of this step.
Scope: do ONLY this step. Do not run `git commit` (I commit myself). The content patch is already applied: use the new keys; do NOT use obsolete keys (listed in revision2/patches/r2.vi.json -> remove). Do not edit text values in content/*.json unless this step says so; if you must add a key, add it to vi.json, en.json AND ja.json together.
Reference images (view them if you can; otherwise rely on the structured data in content/*.json): docs/reference/slide17_org_chart.png, docs/reference/slide18_operating_flow.png, docs/reference/slide25_usa_map_full.png.

Make services-collection.html an intentionally EMPTY "coming soon" page that is ready for me to add images later.
- Keep breadcrumb + services switch. Use services.collection.title, .lead, .status (as a chip), .message. Obsolete keys: services.collection.items, .todo — remove their usage entirely (also remove any yellow "[CẦN BỔ SUNG]" callout logic for this page).
- Gallery: render services.collection.gallery (3 items; each has `image` = slot name and an optional `caption`). Each is a rounded 3:2 frame. Captions are shown only when non-empty.
- PLACEHOLDER SUPPORT (shared, put it in render.js/CSS so other pages can reuse it): when a slot in images.json has `"placeholder": true`, the rendered <img> gets class `is-placeholder`, a dashed brand-green frame, and a small overlay label with ui.image_placeholder; it is not clickable for the lightbox. When I later replace the file and set placeholder to false, it renders as a normal image.
- Add a gentle contact CTA at the bottom (reuse the existing CTA component).
- Also update services.html and Home so the Data Collection card shows the "Coming soon" badge and uses home.pillars text; do not mention any collection details that are not in the content files.

When finished, reply with: (1) files created/changed, (2) how I verify it (URL/command), (3) assumptions you made, (4) open issues. Then STOP and wait for me.

## Definition of done
- The page looks deliberate, not broken; 3 dashed placeholders visible.
- Replacing assets/images/placeholders/collection_image_01.jpg (same file name) changes the image; setting placeholder:false removes the dashed frame.
