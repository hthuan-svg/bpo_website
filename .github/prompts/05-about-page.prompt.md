---
description: "Build about.html with intro, timeline and offices."
agent: agent
---
# Step 05 – About page

Follow AGENTS.md and the files in docs/ (01_PROJECT_SPEC, 02_DESIGN_SYSTEM, 03_CONTENT_MODEL, 04_IMAGE_SLOTS).
Scope: do ONLY this step. Do not start later steps. Do not run `git commit` (I commit myself). Do not change existing text values in content/*.json unless this step says so; when you add keys, add them to vi.json, en.json AND ja.json together.

Build about.html: (1) page title (about.page_title); (2) about.intro (3 paragraphs, two-column layout with a suitable image); (3) about.history: lead paragraph + TIMELINE from about.history.timeline (year, icon slot from field `icon`, text). Horizontal on desktop (smooth horizontal scroll, connecting line, the 2025 milestone emphasized), vertical on mobile. The icons are images with a white background: wrap them in a soft circle or use mix-blend-mode: multiply so no white box shows. (4) about.offices: three cards with image (field `image`), name and address, and a "View map" link opening Google Maps with the address as the search query.

When finished, reply with: (1) files created/changed, (2) how I verify it (Live Server URL or command), (3) assumptions you made, (4) open issues. Then STOP and wait for me.

## Definition of done
- 7 milestones in order 2015 to 2025; clean on mobile.
