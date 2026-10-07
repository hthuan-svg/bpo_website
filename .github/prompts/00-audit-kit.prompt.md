---
description: "Read-only audit of the website kit before building."
agent: agent
---
# Step 00 – Audit the kit


Read-only step: do not create or modify any file.
1. Read AGENTS.md, everything in docs/, content/ and the file list of assets/images/.
2. Summarize the project in at most 8 lines (goal, pages, architecture, content/image rules).
3. Verify programmatically: (a) content/vi.json, en.json, ja.json are valid JSON with identical key trees; (b) every slot in content/images.json points to an existing file; (c) every slot name referenced in content/*.json (fields image, icon, images, customers, badges) exists in images.json.
4. List risks, ambiguities or missing content you see (max 8 bullets). Known gaps to confirm: contact details are empty; the "AI Training Data Collection" content is thin and marked "[CẦN BỔ SUNG]"; headcount 550 vs 37+523; Japanese/English translations need human review.

## Definition of done
- The agent reports matching key trees and no missing images.
- It names the known content gaps.
