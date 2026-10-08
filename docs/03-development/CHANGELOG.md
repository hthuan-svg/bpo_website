# Changelog

## v3 – Documentation consolidation

- Rebuilt project documentation around a single source of truth.
- Preserved useful source notes from the legacy README.
- Added explicit dark-default/light-toggle requirements.
- Added Home, Subaru, About, Team, Achievements, Vision, Careers, Contact and Services requirements.
- Added data verification warnings.
- Added phased Agent prompts.
- Added QA and implementation workflow.
- Retained Revision 2 architecture rules.
- Added explicit no-fabrication contact-form rule.

## 2026-10-08 – Global theme and shared layout

### Changed
- Enabled dark-default theme styling and a global light/dark toggle in the shared header.
- Added persistent theme storage and system-prefers fallback that still respects explicit user selection.
- Kept the existing navigation and Revision 2 brand/header structure intact while wiring the toggle into the shared layout.
- Updated shared header controls to maintain accessible contrast in both themes.

### Files
- assets/js/layout.js
- assets/css/components.css
- docs/03-development/TASKS.md
- docs/03-development/CHANGELOG.md

### Validation
- Ran the project content validation script successfully.
- Confirmed the static local server starts and serves the site locally.
- Verified the theme patch does not introduce JSON errors or shared-layout structural failures.

### Open issues
- Placeholder content warnings remain intentionally in place, as they are source-data markers rather than implementation bugs.
- Contact form email delivery remains unconfigured, so no fake success state is claimed.
