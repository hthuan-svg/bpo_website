---
description: "Create admin/index.html for non-technical content editing."
agent: agent
---
# Step 10 – Local admin tool (optional)

Follow AGENTS.md and the files in docs/ (01_PROJECT_SPEC, 02_DESIGN_SYSTEM, 03_CONTENT_MODEL, 04_IMAGE_SLOTS).
Scope: do ONLY this step. Do not start later steps. Do not run `git commit` (I commit myself). Do not change existing text values in content/*.json unless this step says so; when you add keys, add them to vi.json, en.json AND ja.json together.

Create admin/index.html (single file, plain HTML/CSS/JS): a LOCAL content editor for non-technical users. It must never be deployed: put a visible warning at the top, and exclude admin/ in .gitignore-style deploy rules (create .deployignore).
Features:
1. "Choose project folder" using the File System Access API (showDirectoryPicker; Chrome/Edge) to read/write content/*.json directly. Fallback for other browsers: load files and "Download" edited versions.
2. News tab: list; Add/Edit/Hide/Delete; form with VI/EN/JA fields side by side, date picker, category dropdown, image-slot dropdown with preview, link and Facebook-post fields; auto-generate an ASCII kebab-case id from the title; require all 3 languages (allow saving as draft with hidden:true when incomplete).
3. Content tab: browse the key tree of vi/en/ja side by side for editing; highlight keys that are empty in any language.
4. Images tab: list slots with previews, edit alt text in 3 languages, "Choose new image" to overwrite the file at the slot's path (when write access exists), with recommended sizes from docs/04.
5. Settings tab: form for site.config.json (email, phone, 3-language address, social links, Facebook plugin, map, form URL).
6. Every save: validate JSON, pretty-print (indent 2, keep Vietnamese/Japanese unescaped), confirm before overwriting.
Simple UI with Vietnamese labels and a short hint under each field.

When finished, reply with: (1) files created/changed, (2) how I verify it (Live Server URL or command), (3) assumptions you made, (4) open issues. Then STOP and wait for me.

## Definition of done
- Adding a news item via the form makes it appear on news.html; news.json stays valid.
