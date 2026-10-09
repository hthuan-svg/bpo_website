---
description: "Verify everything, remove old keys, update validator and docs."
agent: agent
---
# QA, obsolete-key cleanup, docs

Follow AGENTS.md (including the "Revision 2 rules" section) and docs/09_REVISION_2_SPEC.md.
This is a REVISION of an existing, working site. First read the current implementation of everything you will touch, then modify it IN PLACE. Keep existing conventions (data-* binding, CSS tokens, components, file layout). Do not rewrite working parts that are not part of this step.
Scope: do ONLY this step. Do not run `git commit` (I commit myself). The content patch is already applied: use the new keys; do NOT use obsolete keys (listed in revision2/patches/r2.vi.json -> remove). Do not edit text values in content/*.json unless this step says so; if you must add a key, add it to vi.json, en.json AND ja.json together.
Reference images (view them if you can; otherwise rely on the structured data in content/*.json): docs/reference/slide17_org_chart.png, docs/reference/slide18_operating_flow.png, docs/reference/slide25_usa_map_full.png.

Final QA for Revision 2.
1. Before deleting anything: search all HTML/JS for usages of the obsolete keys in revision2/patches/r2.vi.json -> remove (e.g. home.hero.eyebrow, services.annotation.items, services.collection.items, team.structure, team.flow, team.growth, vision.recruit). If any usage remains, fix the code first and report it.
2. Run `node tools/apply-patch.mjs --cleanup`, then `node tools/validate-content.mjs`.
3. Extend tools/validate-content.mjs: (a) ⚠ for every slot with `placeholder: true` still in use ("replace this image before publishing"); (b) ✖ if a type in services.annotation.modalities references a missing slot; (c) ✖ if site.config.json layout.annotationRows is not "image-left" or "zigzag".
4. Test with `node tools/serve.mjs` (curl/static checks, headless browser if available) and report: header tabs, hero lockup in 3 languages, breadcrumb/switch, annotation rows (image-left and zigzag), collection placeholders, QC diagram, team diagrams, vision stages, back-to-top on all 10 pages, no console errors, no obsolete keys, no horizontal scroll at 375px.
5. Update docs/03_CONTENT_MODEL.md with the new key tree, and make sure docs/04b_IMAGE_SLOTS_R2.md matches images.json. Make sure .deployignore excludes revision2/, content/_backup_r2/ and docs/.
List remaining defects with fixes; fix the small ones.

When finished, reply with: (1) files created/changed, (2) how I verify it (URL/command), (3) assumptions you made, (4) open issues. Then STOP and wait for me.

## Definition of done
- Validator shows no ✖; ⚠ only for placeholders and any [CẦN BỔ SUNG] left.
- All Revision 2 requests pass the checklist in docs/09_REVISION_2_SPEC.md.
