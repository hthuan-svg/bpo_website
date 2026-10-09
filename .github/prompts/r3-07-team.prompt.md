---
description: "Request 8 – remove drawings, add image slots, drop recruitment."
agent: agent
---
# Team page

Follow AGENTS.md. Specs: docs/overview/page-specs.md (the area you touch), docs/overview/design-system.md, docs/content/content-model.md, docs/images/image-slots.md.
This is an UPDATE of an existing, working site: read the current implementation of what you will touch first, then modify it IN PLACE. Keep conventions (data-* binding, CSS tokens, components). Do not rewrite working parts that are not part of this step.
Scope: ONLY this step. Do not run `git commit`. The content patch and image migration are already applied (step r3-00): use the NEW keys and slot names; do NOT read obsolete keys (listed in revision3/patches/r3.vi.json -> remove). Do not edit text values in content/*.json; if a key is truly missing, add it to vi.json, en.json AND ja.json together and tell me.

Update team.html per docs/overview/page-specs.md > Team (keys team.*).
1. In-page tabs: Organization · Operating flow · Trained people (recruit tab removed).
2. #org: headcount number + org.lead + ONE large image slot team_org_image (placeholder). REMOVE the org-chart drawing and its JS/CSS.
3. #process: only BPO BRYCEN VN <-> Customer. Render process.steps[] as a numbered list with an actor chip (process.actors[actor]) next to the image slot process.image. REMOVE the swim-lane drawing, its SVG/JS/CSS, and every mention of BPO (JP).
4. #people: lead, the 3 steps as a timeline, the 3 photos (people.images) and a large Japan-country image slot people.country_image with caption.
5. REMOVE the recruitment section from this page and any link to team.html#recruit (recruitment now lives on recruits.html).

Finish: update the checkbox of this step in docs/work/current-work.md. Reply with (1) files changed, (2) how I verify, (3) assumptions, (4) open issues — then STOP and wait for me.

## Definition of done
- No drawings left; 8-step list beside an image slot; Japan image slot present; no recruitment on Team.
