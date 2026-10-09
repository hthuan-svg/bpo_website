---
description: "Add a new content block to a page in all 3 languages."
agent: agent
---
# Add a content block

Follow AGENTS.md.
Add to page ${input:page:Page file, e.g. services-annotation.html} a new block titled "${input:title:Block title in Vietnamese}" containing: ${input:details:What the block contains}.
I provide the Vietnamese text; you translate to English and Japanese and list which strings need human review. Add matching keys to ALL THREE content/*.json files with the same structure, use image slot ${input:slot:Existing slot name, or "new"} (new slots: follow the naming rule <page>_<section>_<item>_<nn>, add to images.json and tell me which file to place where), and update docs/content/content-model.md and docs/overview/page-specs.md. Do not run git commit.
