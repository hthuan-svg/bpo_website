---
description: "Reorganise docs, migrate images per page, merge the Revision 3 content, fix references."
agent: agent
---
# Prepare: docs, images, content patch

Follow AGENTS.md. Specs: docs/overview/page-specs.md (the area you touch), docs/overview/design-system.md, docs/content/content-model.md, docs/images/image-slots.md.
This is an UPDATE of an existing, working site: read the current implementation of what you will touch first, then modify it IN PLACE. Keep conventions (data-* binding, CSS tokens, components). Do not rewrite working parts that are not part of this step.
Scope: ONLY this step. Do not run `git commit`. The content patch and image migration are already applied (step r3-00): use the NEW keys and slot names; do NOT read obsolete keys (listed in revision3/patches/r3.vi.json -> remove). Do not edit text values in content/*.json; if a key is truly missing, add it to vi.json, en.json AND ja.json together and tell me.

Goal: bring the project to the Revision 3 baseline WITHOUT changing page design yet. Work through these in order, running each command and showing me its summary.
1. `node tools/reorganize-docs.mjs --dry-run`, then `node tools/reorganize-docs.mjs` (moves old docs and old prompts into docs/_archive/). Confirm docs/README.md, AGENTS.md, README.md are the new ones.
2. `node tools/migrate-images.mjs --dry-run`, then `node tools/migrate-images.mjs` (moves every image into assets/images/<page>/, renames slots, rewrites references in HTML/JS/CSS/JSON, retires unused images into assets/images/_unused/). Read its "leftover references" list. Leftovers inside content/*.json for retired slots (office_pham_van_dong, customer_*, award_top1_01..03) are EXPECTED: they sit in old keys that the next command replaces and the final cleanup deletes — do NOT edit them. FIX only leftovers in code (HTML/JS/CSS), typical cases: a slot name built by string concatenation such as `timeline_${year}`, hard-coded favicon paths, CSS url(...).
3. `node tools/apply-patch.mjs revision3 --dry-run`, then `node tools/apply-patch.mjs revision3` (adds the new keys and slots; a backup goes to content/_backup_r3/). Do NOT run --cleanup. List the "replaced" keys and tell me which ones look hand-edited by me (compare with the backup), so I can re-apply my edits.
4. Make tools/validate-content.mjs, tools/make-release.mjs and .deployignore ignore: assets/images/_unused/, content/_backup_*/, revision2/, revision3/, docs/, and add `content/recruits.json` to the validator (ids unique, status open|closed, dates YYYY-MM-DD, 3 languages unless hidden). Extend the validator to check that every slot file lives in assets/images/<prefix of slot name>/ (common for shared).
5. Run `node tools/validate-content.mjs` and `node tools/serve.mjs` + curl every .html page to confirm each page still loads and the images of the NEW slots resolve. Missing images that belong to retired slots on pages rebuilt in later steps (Home customers, About third office, Achievements logos/badges) are expected until those steps. Report any other problem.
Do not change page layouts or styles in this step.

Finish: update the checkbox of this step in docs/work/current-work.md. Reply with (1) files changed, (2) how I verify, (3) assumptions, (4) open issues — then STOP and wait for me.

## Definition of done
- docs/ has the new structure; old docs are in docs/_archive/.
- assets/images/ has one folder per page + common/ + _unused/; every page loads; no problems other than the expected retired-slot leftovers.
