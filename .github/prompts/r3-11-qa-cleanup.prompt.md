---
description: "Verify all pages, delete obsolete keys, update validator and docs."
agent: agent
---
# QA, cleanup, docs sync

Follow AGENTS.md. Specs: docs/overview/page-specs.md (the area you touch), docs/overview/design-system.md, docs/content/content-model.md, docs/images/image-slots.md.
This is an UPDATE of an existing, working site: read the current implementation of what you will touch first, then modify it IN PLACE. Keep conventions (data-* binding, CSS tokens, components). Do not rewrite working parts that are not part of this step.
Scope: ONLY this step. Do not run `git commit`. The content patch and image migration are already applied (step r3-00): use the NEW keys and slot names; do NOT read obsolete keys (listed in revision3/patches/r3.vi.json -> remove). Do not edit text values in content/*.json; if a key is truly missing, add it to vi.json, en.json AND ja.json together and tell me.

Final QA for Revision 3.
1. Before deleting anything, search all HTML/JS/CSS for the obsolete keys in revision3/patches/r3.vi.json -> remove (ui.skip, home.customers_title, team.process.nodes, vision.roadmap, achievements.projects.customers, services.annotation.quality.delivery_label, …). Fix any remaining use.
2. Run `node tools/apply-patch.mjs revision3 --cleanup`, then `node tools/validate-content.mjs`.
3. Extend the validator: ⚠ for each slot with placeholder:true still in use (list them grouped by page folder); ✖ if a slot's file is not in assets/images/<prefix>/; ✖ if any retired slot (see revision3/image-map.json -> retire) is still referenced; ✖ if a page contains an other-customer name or logo (Sony, Denso, Honda, Nikon, AFEELA) outside docs/archive.
4. Test with `node tools/serve.mjs` (curl + headless browser if available): every page × vi/en/ja, no console errors, no raw keys, no 404 images, no horizontal scroll at 375px, back-to-top works, footer address block, 9 header tabs behave, recruits/contact/subaru pages work, no "skip to main content" text.
5. Regenerate docs/images/image-slots.md from content/images.json (keep its format); update docs/content/content-model.md and docs/overview/page-specs.md where reality differs; tick everything in docs/work/current-work.md; move answered questions from docs/work/decisions-and-open-questions.md to the decisions table only if I told you the answer.
List remaining defects with fixes and fix the small ones.

Finish: update the checkbox of this step in docs/work/current-work.md. Reply with (1) files changed, (2) how I verify, (3) assumptions, (4) open issues — then STOP and wait for me.

## Definition of done
- Validator has no ✖; only ⚠ for placeholders / [CẦN BỔ SUNG]; all Revision 3 requests verified.
