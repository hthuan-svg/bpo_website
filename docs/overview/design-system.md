# Design system — Black + Green

**Principle:** black and green first; white and grey only for balance. Calm, modern, minimal "AI" feel; large type, lots of space, thin lines, rounded corners. Layout language reference: https://www.brycen.co.jp/ (category label + date such as 2026.09.25, "↗" links).

## Tokens (`assets/css/tokens.css`; contrast ratios verified)
```css
:root{
  /* blacks & charcoals (dark surfaces) */
  --black-950:#070A08; --black-900:#0B0F0C; --charcoal-800:#121814; --charcoal-700:#1A211C; --charcoal-600:#232C25; --line-dark:#2B342D;
  /* greens */
  --green-500:#7BBE35;  /* brand, from the logo */
  --green-400:#96D24F;  /* links/hover on dark */
  --green-300:#B5E57F;
  --green-700:#4A7C1B;  /* text/links on light (5.0:1 on white) */
  --green-900:#1C3310;  /* deep green panels */
  /* whites & greys */
  --white:#FFFFFF; --gray-100:#F1F3F2; --gray-200:#E3E7E4; --gray-300:#C5CCC7; --gray-400:#98A39B; --gray-600:#5B665E;
  /* semantic */
  --bg-dark:var(--black-900); --bg-dark-2:var(--charcoal-800); --surface-dark:var(--charcoal-700);
  --bg-light:var(--white); --bg-light-2:var(--gray-100);
  --text-on-dark:#F1F3F2; --muted-on-dark:var(--gray-400); --text-on-light:var(--black-900); --muted-on-light:var(--gray-600);
  --accent:var(--green-500); --focus:0 0 0 3px rgba(123,190,53,.55);
  --radius-s:8px; --radius-m:16px; --radius-l:28px;
  --shadow-dark:0 10px 40px rgba(0,0,0,.45); --shadow-light:0 8px 30px rgba(11,15,12,.10);
}
```
Verified contrast: white on black 19.3 · gray-400 on black 7.4 · green-500 on black 8.5 · black on green-500 8.5 (**primary button = green background + black text**) · black on white 19.3 · green-700 on white 5.0 · gray-600 on white 6.0.
**Never** use green-500/green-600 as *text* on white or light grey (fails AA) — use `--green-700`.

## Section rhythm
Header, hero and footer are **black**. Between them alternate **dark** (`--bg-dark`, `--bg-dark-2`) and **light** (`--bg-light`, `--bg-light-2`) sections, never more than two of the same kind in a row. Cards on dark: `--surface-dark` + 1px `--line-dark`. Cards on light: white + `--shadow-light`.
Logos: dark surfaces → slot `company_logo_on_dark`; light surfaces → `company_logo`. Images with a white background (timeline icons, SUBARU logo, ISO certificates, award badge) sit on a light rounded "mat" when placed on dark.

## Components (token-based)
Buttons: primary (green bg, black text), secondary (outline green on dark / outline black on light), text link with "↗". Tabs (header, in-page, filters): pill with green active indicator. Badges: status **Open** (green), **Closed** (grey), **Coming soon** (outline). Cards, stat card with image, timeline, logo pill, sticky vertical side-nav, **marquee strip**, lightbox, placeholder frame (dashed green on charcoal), breadcrumb, back-to-top (green ring on black).
Typography: Inter + Be Vietnam Pro + Noto Sans JP with system fallbacks; fluid sizes via `clamp()`; line-height 1.7; Japanese `word-break:keep-all; line-break:strict`.
Home hero pattern: subtle stylised lettering — large outlined "BPO"/"AI" glyphs plus a fine dot grid in low-opacity green/grey, drawn with inline SVG/CSS (no image file).
Motion: reveal-on-scroll 300–500 ms; marquee = linear loop that pauses on hover/focus; **all disabled under `prefers-reduced-motion`** (marquee becomes a scrollable row).
