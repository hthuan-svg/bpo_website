---
description: "Request 12 – side-nav, use cases first, strips, quality, security + ISO."
agent: agent
---
# Services › AI Training Data Creation

Follow AGENTS.md. Specs: docs/overview/page-specs.md (the area you touch), docs/overview/design-system.md, docs/content/content-model.md, docs/images/image-slots.md.
This is an UPDATE of an existing, working site: read the current implementation of what you will touch first, then modify it IN PLACE. Keep conventions (data-* binding, CSS tokens, components). Do not rewrite working parts that are not part of this step.
Scope: ONLY this step. Do not run `git commit`. The content patch and image migration are already applied (step r3-00): use the NEW keys and slot names; do NOT read obsolete keys (listed in revision3/patches/r3.vi.json -> remove). Do not edit text values in content/*.json; if a key is truly missing, add it to vi.json, en.json AND ja.json together and tell me.

Update services-annotation.html per docs/overview/page-specs.md > Services › AI Training Data Creation (keys services.annotation.*, certifications.*).
1. LEFT VERTICAL SIDE-NAV: sticky, follows the screen while scrolling, scroll-spy highlight, title ui.on_this_page, entries in the order of services.annotation.order (usecases, modalities, workflow, quality, security) with labels services.annotation.tabs.*. On mobile turn it into a sticky horizontal chip bar. Remove the old horizontal in-page tab bar.
2. REORDER sections to: Use cases → Data types → How we work → Quality control → Information security → CTA. "What is labeled data used for?" must come BEFORE the work areas.
3. DATA TYPES: keep the 3D (LiDAR) and 2D (Image) bands and the rows (image left, text right; honour layout.annotationRows). Under EACH row add a marquee strip of the 4 slots in services.annotation.strips[type.id] (label ui.gallery) using the shared marquee component (speed marquee.services.secondsPerLoop); placeholders keep the dashed frame.
4. QUALITY CONTROL: DELETE the drawn layer diagram and its code/CSS (VNA→PL). New content: quality.lead; a full-width image slot quality.flow_image (placeholder for the owner's explanatory picture, caption only if flow_caption is not empty); the 4 principles cards; then quality.principles_image displayed LARGE and CENTRED (max-width ≈ 960px, lightbox). Do not render quality.layers.
5. INFORMATION SECURITY: security.title/text, image security.image, and the certifications block (ISO 9001:2015, ISO/IEC 27001:2013) reusing the same component as Home.
6. Keep breadcrumb and the 2-tab Creation|Collection switch.

Finish: update the checkbox of this step in docs/work/current-work.md. Reply with (1) files changed, (2) how I verify, (3) assumptions, (4) open issues — then STOP and wait for me.

## Definition of done
- Side-nav is vertical, sticky and highlights the current section; use cases come first; each row has a moving image strip; no old QC diagram; ISO cards under security.
