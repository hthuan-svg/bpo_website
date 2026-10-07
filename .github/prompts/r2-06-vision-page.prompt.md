---
description: "Request 7: roadmap with the USA highlighted and room for an EU image."
agent: agent
---
# Vision page: Southeast Asia, United States, EU

Follow AGENTS.md (including the "Revision 2 rules" section) and docs/09_REVISION_2_SPEC.md.
This is a REVISION of an existing, working site. First read the current implementation of everything you will touch, then modify it IN PLACE. Keep existing conventions (data-* binding, CSS tokens, components, file layout). Do not rewrite working parts that are not part of this step.
Scope: do ONLY this step. Do not run `git commit` (I commit myself). The content patch is already applied: use the new keys; do NOT use obsolete keys (listed in revision2/patches/r2.vi.json -> remove). Do not edit text values in content/*.json unless this step says so; if you must add a key, add it to vi.json, en.json AND ja.json together.
Reference images (view them if you can; otherwise rely on the structured data in content/*.json): docs/reference/slide17_org_chart.png, docs/reference/slide18_operating_flow.png, docs/reference/slide25_usa_map_full.png.

Rebuild vision.html. Keep vision.page_title and the short vision.direction.text as an intro. REMOVE the recruitment section (it moved to Team; vision.recruit and vision.direction.customers are obsolete). Build the roadmap from vision.roadmap (title, lead, stages[]).
- Present stages as a vertical timeline with phase chips (Now -> Next -> Further ahead).
- Stage "sea" (Southeast Asia, phase Now): title, text, three country chips from `countries` (Vietnam, Myanmar, Cambodia) each with a small "current" dot, and the image slot vision_southeast_asia.
- Stage "usa" (phase Next) is FEATURED: larger card, brand-tinted background, a "Next" badge, wide image vision_usa_map (it is the map from the PowerPoint, with customer logos) that opens in the lightbox with zoom, and the text.
- Stage "eu" (phase Further ahead): title, text and the image slot vision_eu.
- vision_southeast_asia and vision_eu are placeholders (`placeholder: true`): use the shared placeholder styling from the Data Collection step so I can later drop real images in by replacing the files.
- Responsive: two columns (text + image) on desktop, stacked on mobile.
Also make sure no Home/Achievements link points to the removed recruitment section.

When finished, reply with: (1) files created/changed, (2) how I verify it (URL/command), (3) assumptions you made, (4) open issues. Then STOP and wait for me.

## Definition of done
- USA stage is visually dominant; SEA lists VN, Myanmar, Cambodia; EU shows a dashed placeholder.
- Replacing assets/images/placeholders/vision_eu.jpg updates the EU stage.
