# Legacy Documentation Migration Map

This file records how the old documentation set maps into v3.

| Legacy file | v3 destination |
|---|---|
| `docs/01_PROJECT_SPEC.md` | `docs/00-project/*` + `docs/02-content/*` + `docs/03-development/*` |
| `docs/02_DESIGN_SYSTEM.md` | `docs/01-design/*` |
| `docs/03_CONTENT_MODEL.md` | `docs/00-project/CONVENTIONS.md` + content docs |
| `docs/04_IMAGE_SLOTS.md` | `docs/01-design/IMAGES.md` |
| `docs/05_PROMPTS.md` | `docs/04-prompts/*` |
| `docs/06_EDITOR_GUIDE.md` | `docs/00-project/CONVENTIONS.md` + README + future editor guide |
| `docs/07_PUBLISH_CHECKLIST.md` | `docs/03-development/QA_CHECKLIST.md` |
| old root `README.md` | new root `README.md` |
| old `CLAUDE.md` | retained unchanged as `@AGENTS.md` |

## Important limitation

Only source material explicitly available during this documentation rebuild was merged.
If additional legacy files contain unique business rules not represented here, review them before deleting them.

Do not delete legacy files solely because their filenames appear in this table.
Delete them only after confirming their unique information is represented in v3.
