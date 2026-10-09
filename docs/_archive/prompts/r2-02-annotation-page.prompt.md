---
description: "Requests 4 and 8: 3D/2D structure, image-left rows, CVAT-style communication."
agent: agent
---
# Rebuild AI Training Data Creation page

Follow AGENTS.md (including the "Revision 2 rules" section) and docs/09_REVISION_2_SPEC.md.
This is a REVISION of an existing, working site. First read the current implementation of everything you will touch, then modify it IN PLACE. Keep existing conventions (data-* binding, CSS tokens, components, file layout). Do not rewrite working parts that are not part of this step.
Scope: do ONLY this step. Do not run `git commit` (I commit myself). The content patch is already applied: use the new keys; do NOT use obsolete keys (listed in revision2/patches/r2.vi.json -> remove). Do not edit text values in content/*.json unless this step says so; if you must add a key, add it to vi.json, en.json AND ja.json together.
Reference images (view them if you can; otherwise rely on the structured data in content/*.json): docs/reference/slide17_org_chart.png, docs/reference/slide18_operating_flow.png, docs/reference/slide25_usa_map_full.png.

Rebuild services-annotation.html (keep the breadcrumb/switch from the previous step) using ONLY the new keys under services.annotation.* (title, lead, tabs, highlights, modalities, workflow, usecases, security, cta). Obsolete: items, group_3d, group_2d.

Communication style (request 8): take structural inspiration from https://www.cvat.ai/ — group by data modality first (Images / 3D point clouds), short verb-led feature lines, a numbered workflow, a quality-assurance section, a use-case grid and a security strip. Do NOT copy any text, imagery, icons or branding from that site; all copy already exists in content/*.json.

Page structure, top to bottom:
1. Hero: title, lead, and the 3 highlights as compact stat chips. Below it a sticky in-page tab bar (services.annotation.tabs.*) linking to #modalities, #workflow, #quality, #usecases (scroll-spy highlights the current tab; offsets for the sticky header).
2. #modalities: two large bands in this order: 3D (LiDAR) then 2D (Image), from services.annotation.modalities. Each band has a header (big label e.g. "3D (LiDAR)", tag chip, title, text) and alternates its background (white / --brand-50). Inside each band, render each entry of `types` as a full-width vertical row:
   - Default layout (site.config.json -> layout.annotationRows = "image-left"): IMAGE ON THE LEFT (~55%), TEXT ON THE RIGHT (~45%), every row. If the value is "zigzag", mirror every even row (image right). Read this value at runtime so I can switch it without code changes. On mobile: image first, text below.
   - Left: the slot images in `images` (1 image = one large rounded frame; 2 images = main image plus a second one stacked/overlapped or side by side). Show `captions[i]` as small chips when present. Every image opens the existing lightbox.
   - Right: row number (01, 02…), a kicker chip with the band label, the type `name` in large uppercase (SEGMENT / BOUNDING BOX / KEYPOINT / SATELLITE), the `title` as subtitle, the `summary`, then `points` as a check list.
   Required content: 3D (LiDAR) has exactly 2 rows: SEGMENT and BOUNDING BOX. 2D (Image) has exactly 4 rows: SEGMENT, BOUNDING BOX, KEYPOINT, SATELLITE. The example row "3D (LiDAR) – BOUNDING BOX" must read: images left, explanation right.
3. #workflow: services.annotation.workflow as 4 numbered connected steps (horizontal on desktop, vertical on mobile).
4. #quality: output an empty `<section id="quality">` with a heading from services.annotation.quality.title and nothing else yet (built in the next step).
5. #usecases: services.annotation.usecases as a 4-card grid. Then the security strip (services.annotation.security) and the CTA band (services.annotation.cta).
Keep the Top-1 / 235 projects facts out of this page (they exist in highlights).

When finished, reply with: (1) files created/changed, (2) how I verify it (URL/command), (3) assumptions you made, (4) open issues. Then STOP and wait for me.

## Definition of done
- 3D shows 2 rows, 2D shows 4 rows, image left/text right; switching layout.annotationRows to zigzag mirrors even rows.
- Sticky tabs scroll-spy works; lightbox still works; looks good in 3 languages.
