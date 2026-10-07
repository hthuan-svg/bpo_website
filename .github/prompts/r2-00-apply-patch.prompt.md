---
description: "Merge the Revision 2 content patch into content/*.json safely."
agent: agent
---
# Apply the content patch

Follow AGENTS.md. Scope: do ONLY this step. Do not run `git commit`. This step must not change any HTML/CSS/JS.

Goal: apply the Revision 2 content patch and make sure tooling ignores the new support folders.
1. Run `node tools/apply-patch.mjs --dry-run` and show me the output summary.
2. Run `node tools/apply-patch.mjs` (NOT --cleanup). Confirm a backup folder was created in content/_backup_r2/.
3. For every key reported as "replaced", compare the backup value with the new value and tell me whether it looked hand-edited by me (e.g. contact data, corrected numbers) so I can re-apply my edits.
4. Confirm content/vi.json, en.json, ja.json still have identical key trees and that every slot in content/images.json exists on disk (images.json now has `placeholder: true` on 5 slots; that is intentional).
5. Make tools/validate-content.mjs, tools/make-release.mjs and .deployignore ignore: content/_backup_r2/, revision2/, docs/reference/. The validator must not treat files in content/_backup_r2/ as site content.
6. Run `node tools/validate-content.mjs` and report the result (warnings about new unused keys are expected until later steps).
Do not change any HTML/CSS/JS in this step.

When finished, reply with: (1) files created/changed, (2) how I verify it (URL/command), (3) assumptions you made, (4) open issues. Then STOP and wait for me.

## Definition of done
- Backup folder exists; key trees match; validator runs.
- You know which replaced keys you had edited by hand.
