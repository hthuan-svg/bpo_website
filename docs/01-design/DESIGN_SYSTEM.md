# Design System

## Theme

Default: Dark.

Users can switch between:
- Dark
- Light

Theme preference should persist if the existing application supports local storage.

## Color direction

Primary:
- black / near-black
- BRYCEN green

The historical project source identified:
`#7BBE35`
as a green sampled from the logo.

Do not assume this is the final official CSS color if the current implementation already defines a different approved token. Centralize the value in design tokens.

## Style

Use:
- strong typography
- generous spacing
- clean grids
- subtle borders
- controlled shadows
- restrained motion
- professional photography
- technology/corporate feel

Avoid:
- rainbow palettes
- excessive neon
- excessive glass effects
- oversized gradients
- decorative effects that compete with content

## Typography

Must support:
- Vietnamese diacritics
- English
- Japanese

Use a sensible system-font stack with Japanese-compatible fallbacks.

## Dark mode

Dark is the default.

Ensure:
- text contrast
- muted text remains readable
- cards are distinguishable
- borders are visible
- form controls remain usable
- images have overlays where necessary

## Light mode

Light theme should feel like the same brand, not a separate website.

Do not simply invert every color.

## Theme toggle

Required behavior:
- obvious
- keyboard accessible
- works on every page
- no flash of unreadable content where reasonably preventable
- persisted preference where existing app architecture permits
