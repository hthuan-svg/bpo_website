---
description: "docs/08_DEPLOY.md, deploy configs and tools/make-release.mjs."
agent: agent
---
# Step 13 – Deployment package

Follow AGENTS.md and the files in docs/ (01_PROJECT_SPEC, 02_DESIGN_SYSTEM, 03_CONTENT_MODEL, 04_IMAGE_SLOTS).
Scope: do ONLY this step. Do not start later steps. Do not run `git commit` (I commit myself). Do not change existing text values in content/*.json unless this step says so; when you add keys, add them to vi.json, en.json AND ja.json together.

Prepare deployment. Create docs/08_DEPLOY.md (Vietnamese, step by step) for three options and recommend one:
(a) GitHub Pages / Cloudflare Pages / Netlify (include _headers or netlify.toml: long cache for css/js/images, short cache (max 5 minutes) for content/*.json so news updates quickly, block /admin/);
(b) internal Nginx/IIS server (sample config, MIME types for .json/.webp/.svg, gzip/brotli, block /admin/);
(c) company sub-domain (e.g. bpo.<domain>): DNS and HTTPS steps.
Create .deployignore listing what must NOT be published: admin/, tools/, docs/, assets/styleguide.html, AGENTS.md, CLAUDE.md, .github/, validate.bat. Do NOT put these in .gitignore (they must stay in version control). Write tools/make-release.mjs that copies only the public files into dist/ following .deployignore, and add dist/ to .gitignore. Remind me to complete docs/07_PUBLISH_CHECKLIST.md before going public.

When finished, reply with: (1) files created/changed, (2) how I verify it (Live Server URL or command), (3) assumptions you made, (4) open issues. Then STOP and wait for me.

## Definition of done
- `dist/` runs standalone (serve the dist folder).
