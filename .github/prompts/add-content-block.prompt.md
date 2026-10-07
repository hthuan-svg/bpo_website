---
description: "Add a new block to a page across all 3 languages."
agent: agent
---
# Add a content block

Add to page ${input:page:Page file, e.g. services.html} a new block titled "${input:title:Block title (Vietnamese)}" containing: ${input:details:What the block contains}.
I provide the Vietnamese text; you translate to English and Japanese and clearly list which strings need human review. Add the matching keys to ALL THREE content/*.json files with identical structure. Use image slot ${input:slot:Existing slot name, or "new"}; if a new slot is needed, add it to images.json and tell me which file to place where. Update docs/03_CONTENT_MODEL.md and docs/04_IMAGE_SLOTS.md if anything changes. Follow AGENTS.md.
