---
description: "Build team.html, achievements.html, vision.html."
agent: agent
---
# Step 07 – Team, Achievements, Vision pages

Follow AGENTS.md and the files in docs/ (01_PROJECT_SPEC, 02_DESIGN_SYSTEM, 03_CONTENT_MODEL, 04_IMAGE_SLOTS).
Scope: do ONLY this step. Do not start later steps. Do not run `git commit` (I commit myself). Do not change existing text values in content/*.json unless this step says so; when you add keys, add them to vi.json, en.json AND ja.json together.

Build three pages from team.*, achievements.*, vision.*:
- team.html: large headcount number (structure.stat_value) + text + detail; "Operating flow" (team.flow) as a swim-lane diagram in HTML/CSS: three lanes (flow.lanes) by three phases (flow.phases[].steps) rendered as connected steps; on mobile collapse to a vertical list grouped by phase. "Career growth" (team.growth) with its three images (field `images`).
- achievements.html: awards (large "5", the four award_top1_* badges, source) and projects (large "235", text, customer logo wall).
- vision.html: direction (text + customer logos; a simple minimal inline-SVG illustration of the USA is optional — if it gets complex, use a simpler illustration and say so), recruit (text + the two numbers 79 and 187 + contact button).
Use only the data already in content/*.json.

When finished, reply with: (1) files created/changed, (2) how I verify it (Live Server URL or command), (3) assumptions you made, (4) open issues. Then STOP and wait for me.

## Definition of done
- All three pages complete; the flow diagram is readable on a phone.
