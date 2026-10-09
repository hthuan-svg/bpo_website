---
description: "Create a new image slot (placeholder file + images.json entry)."
agent: agent
---
# Add an image slot

Follow AGENTS.md and docs/images/image-guide.md.
Create a new image slot named ${input:slot:Slot name, e.g. home_partner_banner (page_section_item)} for page ${input:page:Page folder, e.g. home} with size ${input:size:Width x height, e.g. 1200x675}.
1. Create a placeholder JPG in assets/images/<page>/<slot>.jpg that prints the slot name, path and size inside a dashed green frame on charcoal (same style as the existing placeholders; use Python/PIL or Node).
2. Add the slot to content/images.json with placeholder:true and alt text in vi/en/ja.
3. Add a row to docs/images/image-slots.md. Do not wire it into a page unless I say where. Do not run git commit.
