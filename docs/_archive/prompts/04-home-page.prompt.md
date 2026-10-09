---
description: "Build index.html."
agent: agent
---
# Step 04 – Home page

Follow AGENTS.md and the files in docs/ (01_PROJECT_SPEC, 02_DESIGN_SYSTEM, 03_CONTENT_MODEL, 04_IMAGE_SLOTS).
Scope: do ONLY this step. Do not start later steps. Do not run `git commit` (I commit myself). Do not change existing text values in content/*.json unless this step says so; when you add keys, add them to vi.json, en.json AND ja.json together.

Build index.html using content keys home.* (docs/01 and docs/02):
1. Hero: data-bg="background_main" with a light gradient overlay; eyebrow, large title, subtitle, two buttons (services.html and contact.html).
2. Stats bar: home.stats with count-up animation on scroll, plus the small home.stats_note.
3. "Two core businesses": home.pillars as two large cards with images (field `image` holds a slot name) linking to the field `link`.
4. Commitments: home.commitments as 3 blocks with minimal inline SVG icons.
5. Featured customers: logo wall from the slots listed in achievements.projects.customers (greyscale, colour on hover).
6. Latest news: an empty container with id="home-news" (filled in step 09).
7. Final CTA band: home.cta.
All text/images through data-attributes. Page-specific CSS goes in pages.css. Do not invent new content.

When finished, reply with: (1) files created/changed, (2) how I verify it (Live Server URL or command), (3) assumptions you made, (4) open issues. Then STOP and wait for me.

## Definition of done
- Looks good in vi/en/ja; no awkward line breaks in Japanese; responsive.
