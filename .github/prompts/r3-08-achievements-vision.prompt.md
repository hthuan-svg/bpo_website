---
description: "Requests 9 and 10."
agent: agent
---
# Achievements & Projects, Vision

Follow AGENTS.md. Specs: docs/overview/page-specs.md (the area you touch), docs/overview/design-system.md, docs/content/content-model.md, docs/images/image-slots.md.
This is an UPDATE of an existing, working site: read the current implementation of what you will touch first, then modify it IN PLACE. Keep conventions (data-* binding, CSS tokens, components). Do not rewrite working parts that are not part of this step.
Scope: ONLY this step. Do not run `git commit`. The content patch and image migration are already applied (step r3-00): use the NEW keys and slot names; do NOT read obsolete keys (listed in revision3/patches/r3.vi.json -> remove). Do not edit text values in content/*.json; if a key is truly missing, add it to vi.json, en.json AND ja.json together and tell me.

A) achievements.html (docs/overview/page-specs.md > Achievements):
 - Achievements: replace the row of four badges by ONE image slot (awards.image); show a huge "#1" (awards.headline) and awards.headline_text ("No.1 in Japan"); keep the 5-years text and source below unchanged.
 - Projects: remove the customer logo wall and its code; keep "235" + projects.text; add 3 illustrative image slots (projects.images) and the "Customer satisfaction" block (projects.satisfaction: image + title + text). The word SUBARU in the text links to subaru.html (if not already done).
B) vision.html (docs/overview/page-specs.md > Vision):
 - Direction: add the image slot vision.direction.image next to the text.
 - Replace the roadmap by a GROWTH TIMELINE from vision.growth: a rising stepped/curved line left→right, nodes growing with `level`: Now (Japan + Southeast Asia as two sub-cards with images; SEA shows country chips) → Next step United States (featured, largest, clean map vision_roadmap_usa, lightbox) → Further ahead Europe (EU) (placeholder image). Vertical on mobile. Delete the old roadmap code/CSS (vision.roadmap is obsolete).

Finish: update the checkbox of this step in docs/work/current-work.md. Reply with (1) files changed, (2) how I verify, (3) assumptions, (4) open issues — then STOP and wait for me.

## Definition of done
- Achievements has one award image + #1 headline and no logos; Vision shows a clear rising timeline Now → USA → EU.
