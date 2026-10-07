---
description: "Request 5: multi-layer QC and the VNA > VNC > VNSC > SubPL > PL loop."
agent: agent
---
# Quality control diagram

Follow AGENTS.md (including the "Revision 2 rules" section) and docs/09_REVISION_2_SPEC.md.
This is a REVISION of an existing, working site. First read the current implementation of everything you will touch, then modify it IN PLACE. Keep existing conventions (data-* binding, CSS tokens, components, file layout). Do not rewrite working parts that are not part of this step.
Scope: do ONLY this step. Do not run `git commit` (I commit myself). The content patch is already applied: use the new keys; do NOT use obsolete keys (listed in revision2/patches/r2.vi.json -> remove). Do not edit text values in content/*.json unless this step says so; if you must add a key, add it to vi.json, en.json AND ja.json together.
Reference images (view them if you can; otherwise rely on the structured data in content/*.json): docs/reference/slide17_org_chart.png, docs/reference/slide18_operating_flow.png, docs/reference/slide25_usa_map_full.png.

Build the Quality Control section inside services-annotation.html (#quality) from services.annotation.quality.* (title, lead, layers, delivery_label, pass_label, fail_label, loop_label, principles_title, principles; the old `text` and `image` keys also exist).

Diagram (the star of this section):
- Five stage cards in order: VNA (Annotator) "Annotate" -> VNC (Checker) "Review round 1" -> VNSC (Super Checker) "Review round 2" -> SubPL (Sub Project Leader) "Overall approval 1" -> PL (Project Leader) "Final overall approval" -> terminal node "Delivery to customer" (delivery_label). Each card: big code badge, role, action (bold), short desc. Forward arrows carry the pass_label.
- RETURN LOOP: under the row, draw a return rail with arrows from each reviewing stage (VNC, VNSC, SubPL, PL) back to VNA, labelled fail_label, plus a circular "rotation" icon with loop_label. The meaning: any layer can send the data back for rework and it cycles through the layers until it passes the final approval and only then goes to the customer.
- Desktop: horizontal flow with SVG/CSS connectors; Mobile: vertical stepper with the return rail on the left side. Optional (disabled under prefers-reduced-motion): a small marker that travels along the path when the section scrolls into view.
- Accessibility: use an <ol> for the stages, give the loop a visually-hidden text equivalent, ensure contrast AA.
Below the diagram: the 4 `principles` as a card row, then the existing `service_quality_control` image as a small "Reference process chart" that opens in the lightbox.
Role codes VNA/VNC/VNSC/SubPL/PL are internal terms: show them exactly as written, and add a title/tooltip with the role name.

When finished, reply with: (1) files created/changed, (2) how I verify it (URL/command), (3) assumptions you made, (4) open issues. Then STOP and wait for me.

## Definition of done
- Diagram reads correctly in vi/en/ja; loop is clearly visible; works on mobile.
