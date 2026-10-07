---
description: "Create CSS tokens, base styles, components and a styleguide page."
agent: agent
---
# Step 02 – Design system (theme)

Follow AGENTS.md and the files in docs/ (01_PROJECT_SPEC, 02_DESIGN_SYSTEM, 03_CONTENT_MODEL, 04_IMAGE_SLOTS).
Scope: do ONLY this step. Do not start later steps. Do not run `git commit` (I commit myself). Do not change existing text values in content/*.json unless this step says so; when you add keys, add them to vi.json, en.json AND ja.json together.

Create the design system from docs/02_DESIGN_SYSTEM.md.

- assets/css/tokens.css (CSS variables exactly as specified), base.css (modern reset, fluid typography with clamp(), font stack for Vietnamese/English/Japanese, Japanese rules: word-break: keep-all; line-break: strict), components.css (button, eyebrow + section title, card, stat, timeline, logo-wall, news-card, tag/chip, grid, container, hero, callout/warning box), pages.css (empty with a header comment).
- Fonts: Inter + Be Vietnam Pro + Noto Sans JP via Google Fonts with display=swap, with system fallbacks; add a comment explaining how to self-host in assets/fonts/.
- assets/js/reveal.js: reveal-on-scroll with IntersectionObserver, 300-500 ms, fully disabled under prefers-reduced-motion.
- assets/styleguide.html (internal only): shows every component with sample data.

Design direction: calm, modern, minimal "AI" aesthetic. Lots of white space, large type, thin lines, large radii, one subtle accent colour. Reference the design language of https://www.brycen.co.jp/ (white background, large headline, category label + date like 2026.09.25, arrow "↗" links). Brand colour #7BBE35 from the logo. White text on #7BBE35 fails WCAG AA: use dark text on it, or use #5E9A24 with white text. No neon, no dark theme.

When finished, reply with: (1) files created/changed, (2) how I verify it (Live Server URL or command), (3) assumptions you made, (4) open issues. Then STOP and wait for me.

## Definition of done
- styleguide.html looks clean and consistent; works at phone width.
- Compare feel with brycen.co.jp and tell the agent what to adjust.
