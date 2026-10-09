---
description: "Request 11 – form modelled on dataengineering.brycen.co.jp/contact."
agent: agent
---
# Contact page

Follow AGENTS.md. Specs: docs/overview/page-specs.md (the area you touch), docs/overview/design-system.md, docs/content/content-model.md, docs/images/image-slots.md.
This is an UPDATE of an existing, working site: read the current implementation of what you will touch first, then modify it IN PLACE. Keep conventions (data-* binding, CSS tokens, components). Do not rewrite working parts that are not part of this step.
Scope: ONLY this step. Do not run `git commit`. The content patch and image migration are already applied (step r3-00): use the NEW keys and slot names; do NOT read obsolete keys (listed in revision3/patches/r3.vi.json -> remove). Do not edit text values in content/*.json; if a key is truly missing, add it to vi.json, en.json AND ja.json together and tell me.

Rebuild contact.html and assets/js/contact.js per docs/overview/page-specs.md > Contact (keys contact.*, site.config.json -> contact.*). Layout reference: https://dataengineering.brycen.co.jp/contact/ (do not copy its text or images).
- Banner (contact_banner), breadcrumb, lead + response_note.
- TWO COLUMNS. LEFT: the form and, below it, the privacy section. RIGHT: ONE vertical column "Company information" (contact.company_panel): logo, name, head-office and branch addresses, email, phone as a "call us" box, map link, social icons — everything from site.config.json, empty = hidden. On mobile the right column goes under the form.
- FORM fields: name*, company, department, position, email*, phone, inquiry type* (dropdown contact.form.type_options), message*, consent checkbox* placed right under the privacy section. Validation messages from contact.form.validation. Flow: validate → REVIEW screen (contact.form.review_title with Edit / Send) → send.
- SENDING: POST to site.config.json -> contact.form.endpoint (FormData; Accept: application/json; include subject = subjectPrefix + inquiry type). If endpoint is empty, fall back to a mailto: link to contact.form.recipientEmail or contact.email (button contact.form.fallback_mailto). Honeypot field, disable button while sending, success/error messages from content, nothing stored in the browser.
- PRIVACY SECTION: render contact.privacy.items[] (10 items) as a definition list; the item with dynamic:"contact" appends address/email/phone from config; the item with link:"policy" shows policy_link_label linking to site.config.json -> contact.privacyPolicyUrl (hidden if empty). Keep the "[CẦN BỔ SUNG]" marker text as is.
- Do not add trackers. Write docs/release/contact-form-setup.md changes only if the behaviour differs from it.

Finish: update the checkbox of this step in docs/work/current-work.md. Reply with (1) files changed, (2) how I verify, (3) assumptions, (4) open issues — then STOP and wait for me.

## Definition of done
- Form validates, shows the review screen, and sends (or opens the mailto fallback); company column is vertical on the right; privacy list shows 10 items.
