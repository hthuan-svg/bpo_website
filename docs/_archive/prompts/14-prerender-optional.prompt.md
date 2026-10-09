---
description: "Optional: static prerender of every page x language."
agent: agent
---
# Step 14 – Prerender for SEO (optional)

Follow AGENTS.md and the files in docs/ (01_PROJECT_SPEC, 02_DESIGN_SYSTEM, 03_CONTENT_MODEL, 04_IMAGE_SLOTS).
Scope: do ONLY this step. Do not start later steps. Do not run `git commit` (I commit myself). Do not change existing text values in content/*.json unless this step says so; when you add keys, add them to vi.json, en.json AND ja.json together.

Only needed if search engines must read full content without running JavaScript. Write tools/prerender.mjs (Node) that generates static HTML for every page x language into dist/vi/, dist/en/, dist/ja/ using the existing data-* attributes and JSON (do not rewrite content), with hreflang, canonical and per-language sitemap. The existing JS must "hydrate" (attach events only, not rebuild). Editors keep editing JSON as before; publishing = `node tools/prerender.mjs`.

When finished, reply with: (1) files created/changed, (2) how I verify it (Live Server URL or command), (3) assumptions you made, (4) open issues. Then STOP and wait for me.

## Definition of done
- dist/<lang>/ pages contain full text when JavaScript is disabled.
