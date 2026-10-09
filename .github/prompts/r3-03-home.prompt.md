---
description: "Request 5 – hero split, stat images, product strip, ISO, partners."
agent: agent
---
# Home page

Follow AGENTS.md. Specs: docs/overview/page-specs.md (the area you touch), docs/overview/design-system.md, docs/content/content-model.md, docs/images/image-slots.md.
This is an UPDATE of an existing, working site: read the current implementation of what you will touch first, then modify it IN PLACE. Keep conventions (data-* binding, CSS tokens, components). Do not rewrite working parts that are not part of this step.
Scope: ONLY this step. Do not run `git commit`. The content patch and image migration are already applied (step r3-00): use the NEW keys and slot names; do NOT read obsolete keys (listed in revision3/patches/r3.vi.json -> remove). Do not edit text values in content/*.json; if a key is truly missing, add it to vi.json, en.json AND ja.json together and tell me.

Update index.html per docs/overview/page-specs.md > Home (use keys under home.*, certifications.*, ui.*).
1. HERO: split layout. Left: dark panel with the stylised lettering pattern (inline SVG/CSS: large outlined "BPO"/"AI" glyphs + fine dot grid at low opacity), big green "BPO", "BUSINESS PROCESS OUTSOURCING", "BRYCEN VIETNAM" with company_logo_mark_on_dark, title, subtitle, two buttons. Right: image slot home_hero_image in a rounded light frame (it has a white background; do NOT put text over it). Stack on mobile. Remove any code that used the old background image behind text.
2. STATS: 4 cards from home.stats[] — image on top (stats[i].image, placeholder styling when flagged), count-up number, label; footnote home.stats_note.
3. SERVICES: keep the 2 cards from home.pillars[] ("Coming soon" badge on Collection), then add the SHOWCASE MARQUEE from home.showcase.items[] using the shared marquee component (create it now in assets/js/marquee.js + CSS if it does not exist: duplicated items for a seamless loop, pause on hover/focus, lightbox on click, speed from site.config.json -> marquee.home.secondsPerLoop, static scroll-snap row under prefers-reduced-motion).
4. COMMITMENTS + CERTIFICATIONS: keep the 3 commitments; add below them the certifications block from certifications.items[] (title home.certifications_title): two portrait cards with image (placeholder styling), code and name (ISO 9001:2015, ISO/IEC 27001:2013).
5. PARTNERS: replace the old "Featured customers" section by home.partners: ONLY the SUBARU logo (slot subaru_logo on a white pill) linking to subaru.html with caption ui.partner_main. Delete all code, CSS and content usage for other customers' logos/names on this page.
Sections alternate dark/light per the design system.

Finish: update the checkbox of this step in docs/work/current-work.md. Reply with (1) files changed, (2) how I verify, (3) assumptions, (4) open issues — then STOP and wait for me.

## Definition of done
- Hero text is readable (no text over the white image); 4 stat cards with images; marquee runs and pauses; ISO cards visible; only SUBARU as partner.
