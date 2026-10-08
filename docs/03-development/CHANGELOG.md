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

## 2026-10-08 – Home page completion

### Changed
- Added the required Home hero statement in all locale files without inventing unsupported business metrics.
- Completed the four-stat card structure with image slots and a service-image running strip for the home page.
- Kept the strategic partner language aligned to the project requirement: “Đối Tác chiến lược” / “Strategic Partners” / “戦略的パートナー”.
- Linked the Subaru partner CTA to the dedicated Subaru page route while keeping the site data-driven and non-fabricated.
- Added the shared home-page strip animation styling to support the running services imagery in a responsive layout.

### Files
- index.html
- content/vi.json
- content/en.json
- content/ja.json
- content/images.json
- assets/css/pages.css
- docs/03-development/TASKS.md
- docs/03-development/CHANGELOG.md

### Validation
- Ran the project content validator successfully; warnings remain only for intentional placeholder markers and placeholder image slots.
- Confirmed the Home page is served locally through the static site server.

### Open issues
- Unresolved source data remains intentionally kept as a placeholder or ambiguous value where the project explicitly forbids guessing (for example employee counts and other unsupported metrics).
- No fake contact form success state is claimed, and delivery remains unconfigured until an approved mail endpoint is supplied.
