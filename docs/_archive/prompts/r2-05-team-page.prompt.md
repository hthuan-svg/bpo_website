---
description: "Requests 6 and 7 (part): split Team into 4 sections like the PowerPoint."
agent: agent
---
# Team page: organization, flow, trained people, recruitment

Follow AGENTS.md (including the "Revision 2 rules" section) and docs/09_REVISION_2_SPEC.md.
This is a REVISION of an existing, working site. First read the current implementation of everything you will touch, then modify it IN PLACE. Keep existing conventions (data-* binding, CSS tokens, components, file layout). Do not rewrite working parts that are not part of this step.
Scope: do ONLY this step. Do not run `git commit` (I commit myself). The content patch is already applied: use the new keys; do NOT use obsolete keys (listed in revision2/patches/r2.vi.json -> remove). Do not edit text values in content/*.json unless this step says so; if you must add a key, add it to vi.json, en.json AND ja.json together.
Reference images (view them if you can; otherwise rely on the structured data in content/*.json): docs/reference/slide17_org_chart.png, docs/reference/slide18_operating_flow.png, docs/reference/slide25_usa_map_full.png.

Rebuild team.html with these sections, using only team.tabs, team.org, team.process, team.people, team.recruit (obsolete: team.structure, team.flow, team.growth). Add a sticky in-page tab bar (team.tabs.*) with scroll-spy.

A) #org "Organization structure" (PowerPoint slide 17, reference docs/reference/slide17_org_chart.png). Show the headcount (team.org.headcount) as a large number. Draw the org chart as 7 full-width horizontal BANDS, one per team.org.levels[] (in order), each with a coloured label block on the left (tone: red, orange, yellow, green, blue, slate, purple — use soft tints that fit the minimal theme but keep the same hue order as the PowerPoint). Place the nodes of each level inside its band, evenly distributed; node = rounded box with `role` and a small `code` badge when present. Draw connectors with an SVG overlay computed in JS on load/resize/langchange following team.org.links_note: Manager -> Sub TeamLead and PMO; PMO -> 3 Project Leaders; Sub Project Leader below the PL row; Sub PL -> 2 Super Checkers; each Super Checker -> 2 Checkers; each Checker -> 2 Annotators. Mobile (<800px): no connectors; show each band as a card with its label and node chips grouped with counts (e.g. "Annotator x 8").
B) #process "Operating flow" (slide 18, reference docs/reference/slide18_operating_flow.png). Recreate it as a SWIM-LANE chart: 3 column lanes (team.process.lanes: Customer / BPO (JP) / BPO (VN)) with coloured headers, 3 horizontal phase bands (team.process.phases) in soft lavender / beige / mint, and the boxes from team.process.nodes positioned by `lane` and `phase` (keep array order inside a phase, top to bottom). Draw arrows for team.process.edges with orthogonal routing; the edge m9 -> m4 is the feedback loop to production: dashed and labelled. Mobile: vertical list grouped by phase with lane chips, edges omitted.
C) #people "People trained in Vietnam and in Japan": team.people.title/lead, the 3 steps as a connected timeline, and the 3 images (team.people.images) with the Japan photo emphasised. Replace the old "career growth" wording entirely.
D) #recruit: team.recruit (moved from Vision): text, the two big numbers (79, 187), and a contact button.
Remove the old Team sections. Make sure nothing else links to removed anchors.

When finished, reply with: (1) files created/changed, (2) how I verify it (URL/command), (3) assumptions you made, (4) open issues. Then STOP and wait for me.

## Definition of done
- Both diagrams look like the PowerPoint ones (bands, lanes, arrows) and stay readable at 375px.
- Recruitment appears on Team and no longer on Vision (Vision is changed in the next step).
