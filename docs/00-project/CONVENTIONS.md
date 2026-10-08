# Project Conventions

## Code

Prefer:
- semantic HTML
- small functions
- explicit names
- readable selectors
- minimal duplication

Avoid clever abstractions that make content editing harder.

## Content

Visible business text belongs in the existing content system when that system supports the page.

Never invent:
- customer names
- dates
- financial figures
- employee counts
- percentages
- awards
- technical specifications
- contact emails
- product names

## Images

Every planned image should have a logical slot.

Use placeholder slots when final assets are unavailable.

## Naming

Prefer descriptive names such as:
- `subaru_boxer_bg`
- `subaru_sawd_bg`
- `subaru_eyesight_bg`
- `subaru_sgp_bg`
- `home_commitment_bg`

Do not rename existing slots without checking references.

## UI

Use existing:
- buttons
- cards
- badges
- section headers
- containers
- spacing
- typography
- theme variables

## Responsive

Check at least:
- desktop
- tablet
- mobile

For horizontal image sections, provide a usable mobile fallback rather than forcing desktop dimensions.

## Motion

Respect:
`prefers-reduced-motion: reduce`.

Carousels/running strips must stop or reduce motion when requested.
