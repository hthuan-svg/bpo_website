---
description: "Create deployment docs, ignore rules and tools/make-release.mjs."
agent: agent
---
# Deployment package

Follow AGENTS.md. Prepare deployment ONLY after docs/release/publish-checklist.md is complete.
Create docs/release/deploy.md (Vietnamese, step by step) for three options and recommend one: (a) GitHub Pages / Cloudflare Pages / Netlify (include _headers or netlify.toml: long cache for css/js/images, short cache ≤5 minutes for content/*.json so news and recruitment update quickly, block /admin/); (b) internal Nginx/IIS server (sample config, MIME types for .json/.webp/.svg, gzip/brotli, block /admin/); (c) company sub-domain (DNS + HTTPS steps).
Create/extend .deployignore listing what must NOT be published: admin/, tools/, docs/, revision*/, content/_backup_*/, assets/images/_unused/, assets/styleguide.html, AGENTS.md, CLAUDE.md, README.md, .github/, validate.bat. Do NOT put these in .gitignore. Write tools/make-release.mjs that copies only public files into dist/ following .deployignore, and add dist/ to .gitignore. Do not run git commit.
