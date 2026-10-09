# Helper prompts (English)

Dùng khi cần, ở bất kỳ thời điểm nào. Mỗi cái cũng là lệnh `/…` trong chat Agent.

| Command | Dùng để |
|---|---|
| `/session-start` | Start a work session |
| `/fix-bug` | Fix a defect |
| `/add-content-block` | Add a content block |
| `/add-image-slot` | Add an image slot |
| `/review-translations` | Review translations |
| `/deploy-package` | Deployment package |

## Start a work session (`/session-start`)
```text
Start a work session on this project.
1. Read AGENTS.md, docs/README.md, docs/work/current-work.md and docs/work/decisions-and-open-questions.md.
2. Report in at most 12 lines: what is done, what is the next step, which command to run for it, and which open questions block it.
3. Do NOT change any file in this step. Then wait for my instruction.
```

## Fix a defect (`/fix-bug`)
```text
Follow AGENTS.md and docs/overview/page-specs.md.
Page: ${input:page:Page file, e.g. team.html}
Problem: ${input:problem:What is wrong? Be specific}
Console error or screenshot description (optional): ${input:detail:Paste the error or describe}

Find the root cause and apply the smallest fix. Keep content keys and image slots unchanged. Explain the cause and how I verify. Do not run git commit.
```

## Add a content block (`/add-content-block`)
```text
Follow AGENTS.md.
Add to page ${input:page:Page file, e.g. services-annotation.html} a new block titled "${input:title:Block title in Vietnamese}" containing: ${input:details:What the block contains}.
I provide the Vietnamese text; you translate to English and Japanese and list which strings need human review. Add matching keys to ALL THREE content/*.json files with the same structure, use image slot ${input:slot:Existing slot name, or "new"} (new slots: follow the naming rule <page>_<section>_<item>_<nn>, add to images.json and tell me which file to place where), and update docs/content/content-model.md and docs/overview/page-specs.md. Do not run git commit.
```

## Add an image slot (`/add-image-slot`)
```text
Follow AGENTS.md and docs/images/image-guide.md.
Create a new image slot named ${input:slot:Slot name, e.g. home_partner_banner (page_section_item)} for page ${input:page:Page folder, e.g. home} with size ${input:size:Width x height, e.g. 1200x675}.
1. Create a placeholder JPG in assets/images/<page>/<slot>.jpg that prints the slot name, path and size inside a dashed green frame on charcoal (same style as the existing placeholders; use Python/PIL or Node).
2. Add the slot to content/images.json with placeholder:true and alt text in vi/en/ja.
3. Add a row to docs/images/image-slots.md. Do not wire it into a page unless I say where. Do not run git commit.
```

## Review translations (`/review-translations`)
```text
Follow AGENTS.md.
Review content/en.json and content/ja.json against content/vi.json: completeness of meaning, consistent terminology (annotation, PointCloud, LiDAR, No.1 / Top 1, BPO, SUBARU, EyeSight), and a professional corporate tone. Do NOT edit files. Output a table: key | current | suggestion | reason, grouped by language and ordered by importance. Pay special attention to contact.privacy.* (legal tone) and subaru.*.
```

## Deployment package (`/deploy-package`)
```text
Follow AGENTS.md. Prepare deployment ONLY after docs/release/publish-checklist.md is complete.
Create docs/release/deploy.md (Vietnamese, step by step) for three options and recommend one: (a) GitHub Pages / Cloudflare Pages / Netlify (include _headers or netlify.toml: long cache for css/js/images, short cache ≤5 minutes for content/*.json so news and recruitment update quickly, block /admin/); (b) internal Nginx/IIS server (sample config, MIME types for .json/.webp/.svg, gzip/brotli, block /admin/); (c) company sub-domain (DNS + HTTPS steps).
Create/extend .deployignore listing what must NOT be published: admin/, tools/, docs/, revision*/, content/_backup_*/, assets/images/_unused/, assets/styleguide.html, AGENTS.md, CLAUDE.md, README.md, .github/, validate.bat. Do NOT put these in .gitignore. Write tools/make-release.mjs that copies only public files into dist/ following .deployignore, and add dist/ to .gitignore. Do not run git commit.
```

## Optional later: prerender for SEO
```text
Follow AGENTS.md. Only needed if search engines must read full content without running JavaScript. Write tools/prerender.mjs (Node) that generates static HTML for every page x language into dist/vi/, dist/en/, dist/ja/ using the existing data-* attributes and JSON (do not rewrite content), with hreflang, canonical and per-language sitemap. The existing JS must "hydrate" (attach events only, not rebuild). Do not run git commit.
```
