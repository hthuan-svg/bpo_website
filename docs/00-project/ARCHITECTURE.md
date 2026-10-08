# Architecture

## Current pages

| Page | Role |
|---|---|
| `index.html` | Home |
| `about.html` | Company / history / offices |
| `services.html` | Services parent |
| `services-annotation.html` | AI training data creation / annotation |
| `services-collection.html` | AI training data collection |
| `team.html` | Organization / operation / people |
| `achievements.html` | Achievements / projects |
| `vision.html` | Direction / roadmap |
| `news.html` | News |
| `contact.html` | Contact |
| `careers.html` | Recruitment |
| `subaru.html` | Strategic partner: Subaru |

## Shared layers

```text
HTML pages
  ↓
shared CSS
  ↓
shared JS/layout/i18n/render
  ↓
content JSON
  ↓
image/config slots
```

Reuse existing project mechanisms instead of introducing duplicate systems.

## Shared JavaScript

Existing files may include:
- `app.js`
- `i18n.js`
- `layout.js`
- `render.js`
- `news.js`
- `social.js`
- `reveal.js`
- `backtotop.js`

Before creating a new helper, inspect whether an existing module already solves the problem.

## Shared CSS

Existing project may use:
- `tokens.css`
- `base.css`
- `components.css`
- `pages.css`

Extend these before creating page-specific CSS.

## Admin

`admin/` is a local editing tool.
It must not be deployed as public application functionality.

## Tools

Use existing:
- local server
- content validator
- release helper
- validation scripts

Do not install global packages just to complete a normal change.
