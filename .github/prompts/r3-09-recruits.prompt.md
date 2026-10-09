---
description: "Request 4 – recruits.html with open/closed posts."
agent: agent
---
# Recruitment page

Follow AGENTS.md. Specs: docs/overview/page-specs.md (the area you touch), docs/overview/design-system.md, docs/content/content-model.md, docs/images/image-slots.md.
This is an UPDATE of an existing, working site: read the current implementation of what you will touch first, then modify it IN PLACE. Keep conventions (data-* binding, CSS tokens, components). Do not rewrite working parts that are not part of this step.
Scope: ONLY this step. Do not run `git commit`. The content patch and image migration are already applied (step r3-00): use the NEW keys and slot names; do NOT read obsolete keys (listed in revision3/patches/r3.vi.json -> remove). Do not edit text values in content/*.json; if a key is truly missing, add it to vi.json, en.json AND ja.json together and tell me.

Create recruits.html (+ assets/js/recruits.js) per docs/overview/page-specs.md > Recruitment, using content/recruits.json and keys under recruits.*.
- Banner (recruits_banner), lead, intro block (text, stats 79/187, image recruits_intro).
- Filter tabs All / Open / Closed; list sorted by date descending; each post shows date (YYYY.MM.DD), status badge (Open = green, Closed = grey, ui.status.*), title, summary, location, type, deadline (labels.no_deadline when empty). Auto-close by deadline when site.config.json -> recruits.autoCloseByDeadline is true.
- Detail view recruits.html?id=<id>: full body (split on blank lines), meta, Apply button (apply_link, else mailto: to contact.email with subject recruits.apply_subject + title); closed posts show labels.closed_note and no apply button; unknown id -> friendly message; Back link.
- Items with hidden:true are skipped; empty state recruits.empty. Re-render on language change.
- Add recruits.html to sitemap.xml. TEST by temporarily setting hidden:false on the two template items in recruits.json, verify, then set them back to hidden:true.

Finish: update the checkbox of this step in docs/work/current-work.md. Reply with (1) files changed, (2) how I verify, (3) assumptions, (4) open issues — then STOP and wait for me.

## Definition of done
- Open and Closed posts show with correct badges and filters; detail page works; templates hidden again.
