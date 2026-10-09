---
description: "tools/validate-content.mjs, validate.bat and a full QA pass."
agent: agent
---
# Step 12 – Validation script + QA

Follow AGENTS.md and the files in docs/ (01_PROJECT_SPEC, 02_DESIGN_SYSTEM, 03_CONTENT_MODEL, 04_IMAGE_SLOTS).
Scope: do ONLY this step. Do not start later steps. Do not run `git commit` (I commit myself). Do not change existing text values in content/*.json unless this step says so; when you add keys, add them to vi.json, en.json AND ja.json together.

Write tools/validate-content.mjs (plain Node, no npm install) that checks:
1. vi/en/ja.json are valid and have identical key sets (list missing/extra keys); warn on empty strings or strings starting with "[CẦN BỔ SUNG]", "[TO ADD]" or "【要追記】".
2. Every slot in images.json: file exists and alt exists in all 3 languages; every slot name referenced anywhere (HTML data-img / data-bg, JSON fields image, images, icon, customers, badges) exists in images.json.
3. news.json: unique ids, date format YYYY-MM-DD, valid category, title+summary in 3 languages (unless hidden:true), image is a valid slot.
4. site.config.json: URLs valid when non-empty.
Output must be friendly for non-technical users (✔ / ✖ / ⚠, which file, which key, how to fix) and exit non-zero on errors. Add validate.bat (double-click on Windows).
Then audit the whole site against "Definition of Done" in docs/01_PROJECT_SPEC.md (use `node tools/serve.mjs` and curl/static checks, and a headless browser if available), list remaining defects with fixes, and fix small ones yourself.

When finished, reply with: (1) files created/changed, (2) how I verify it (Live Server URL or command), (3) assumptions you made, (4) open issues. Then STOP and wait for me.

## Definition of done
- `node tools/validate-content.mjs` has no ✖ (⚠ about [CẦN BỔ SUNG] is expected until content is added).
