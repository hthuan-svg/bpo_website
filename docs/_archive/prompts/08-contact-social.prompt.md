---
description: "Build contact.html and assets/js/social.js."
agent: agent
---
# Step 08 – Contact + social + Facebook

Follow AGENTS.md and the files in docs/ (01_PROJECT_SPEC, 02_DESIGN_SYSTEM, 03_CONTENT_MODEL, 04_IMAGE_SLOTS).
Scope: do ONLY this step. Do not start later steps. Do not run `git commit` (I commit myself). Do not change existing text values in content/*.json unless this step says so; when you add keys, add them to vi.json, en.json AND ja.json together.

Build contact.html and assets/js/social.js:
- contact.html: lead; info cards from site.config.json (address per language, email, phone). Hide any empty item. Email is a mailto: link, phone a tel: link. Embedded map iframe from contact.mapEmbedUrl (hidden if empty, loading="lazy"). A "Send a request via form" button opening contact.formUrl (hidden if empty). Social icons block. If ALL contact values are empty, show contact.note in a warning callout.
- social.js: (a) helper that builds a Facebook share link https://www.facebook.com/sharer/sharer.php?u=<encoded url>; (b) a function that renders the Facebook Page Plugin iframe (https://www.facebook.com/plugins/page.php?href=<pageUrl>&tabs=timeline&width=500&height=<height>&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=false) ONLY when facebookPagePlugin.enabled is true and pageUrl is non-empty; if blocked/failed, show a plain "Open our Facebook page" link instead.
- Make sure site.config.json documents keys youtube, linkedin, instagram, zalo in its "_readme".
All external links: target="_blank" rel="noopener noreferrer".

When finished, reply with: (1) files created/changed, (2) how I verify it (Live Server URL or command), (3) assumptions you made, (4) open issues. Then STOP and wait for me.

## Definition of done
- Putting a Facebook URL in site.config.json makes icons appear; clearing it hides them cleanly.
