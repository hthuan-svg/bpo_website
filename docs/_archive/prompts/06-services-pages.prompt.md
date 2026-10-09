---
description: "Build services.html, services-annotation.html, services-collection.html."
agent: agent
---
# Step 06 – Services pages

Follow AGENTS.md and the files in docs/ (01_PROJECT_SPEC, 02_DESIGN_SYSTEM, 03_CONTENT_MODEL, 04_IMAGE_SLOTS).
Scope: do ONLY this step. Do not start later steps. Do not run `git commit` (I commit myself). Do not change existing text values in content/*.json unless this step says so; when you add keys, add them to vi.json, en.json AND ja.json together.

Build three pages:
- services.html: services.lead + services.overview_note; two large cards linking to the two sub-pages (images background_services_3d and background_services_2d); a minimal inline-SVG diagram "LiDAR scanner -> 3D data" and "Dashcam -> 2D data".
- services-annotation.html: title + lead; two groups (services.annotation.group_3d and group_2d); render services.annotation.items filtered by field `group` ("3d"/"2d"); each item has title, text and 1-2 images (field `images` is an array of slot names) in rounded frames with a simple keyboard-accessible lightbox (Esc closes); a "Quality control" block with image service_quality_control; contact CTA.
- services-collection.html: services.collection.lead + the two items with images; render services.collection.todo inside a soft-yellow callout ONLY when the string starts with "[" or "【" (so it disappears once real content replaces the placeholder). Contact CTA.

When finished, reply with: (1) files created/changed, (2) how I verify it (Live Server URL or command), (3) assumptions you made, (4) open issues. Then STOP and wait for me.

## Definition of done
- Lightbox works; the collection page shows the yellow [CẦN BỔ SUNG] callout.
