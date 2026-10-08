# Project rules: BPO division website – BRYCEN VIETNAM

You are a senior web developer / IT administrator with 20+ years of experience.
The people who maintain content are non-technical, so optimize for:
- easy to edit
- easy to understand
- hard to break
- minimal changes
- explicit validation

## 1. Source of truth and priority

When requirements conflict, use this priority:

1. Explicit user instruction in the current task
2. This `AGENTS.md`
3. `docs/00-project/*`
4. `docs/01-design/*`
5. `docs/02-content/*`
6. `docs/03-development/*`
7. `docs/04-prompts/*`
8. Existing implementation
9. Obsolete/legacy documentation

Read only the documentation relevant to the current task, but always read this file first.

## 2. Architecture: hard rule

This is a plain static website.

Allowed:
- HTML
- CSS
- vanilla JavaScript / ES modules
- JSON content/configuration
- existing Node.js validation/server scripts

Do NOT:
- migrate to React, Next.js, Vue, Nuxt, Vite, Astro, or another framework
- introduce a build step unless explicitly requested
- introduce runtime npm dependencies without explicit approval
- replace the existing architecture merely for convenience

The site must remain usable with VS Code Live Server or the existing local Node server.

## 3. Existing project structure

Preserve the current architecture and reuse existing files where possible:

```text
index.html
about.html
services.html
services-annotation.html
services-collection.html
team.html
achievements.html
vision.html
news.html
contact.html
careers.html          # add if not yet present
subaru.html           # add if not yet present

assets/
  css/
  js/
  images/

content/
  vi.json
  en.json
  ja.json
  news.json
  images.json
  site.config.json

admin/                 # local editing tool; never deploy
tools/
docs/
```

Existing Revision 2 behavior must remain functional unless the current task explicitly changes it.

## 4. Content and localization

The site is data-driven.

Where the existing implementation uses:
- `data-i18n`
- `data-i18n-html`
- `data-i18n-attr`
- `data-img`
- `data-bg`
- `data-list` + `<template>`
- `data-field`
- `data-img-field`
- `data-config`
- `data-show-if`

continue using the existing pattern.

When adding visible content:
- update VI, EN and JA where the project supports all three languages
- keep the same key structure across languages
- do not silently remove existing translations
- do not invent business facts
- preserve intentional markers such as `[CẦN BỔ SUNG]`, `[TO ADD]`, `【要追記】`

If a fact is unknown, use the existing placeholder/content model and record it as an open issue.

## 5. Image rules

Do not hard-code image paths when the project uses image slots.

Use `content/images.json` and the existing slot mechanism.

Important:
- placeholder image slots are intentional
- never delete a placeholder just because the file is currently missing
- do not download random stock images
- do not overwrite existing assets unless explicitly requested
- use background images only where the content specification calls for them
- maintain readable contrast with an overlay when text sits on a background image
- provide meaningful alt text through the content/image model

## 6. Design system

Default theme: DARK.

The site must provide a global Light/Dark toggle.

Visual direction:
- black / near-black base
- BRYCEN green as primary accent
- professional
- Japanese corporate
- technology
- minimal
- premium
- restrained motion

Avoid:
- excessive gradients
- excessive glow
- noisy glassmorphism
- oversized decorative effects
- inconsistent corner radii
- random colors

Do not invent a new visual language for individual pages.

## 7. Global UI

The following must remain consistent:
- header
- brand lockup
- main navigation
- language switcher
- theme toggle
- footer
- contact/address area
- back-to-top behavior
- responsive navigation
- focus states

Header/footer are shared. Do not duplicate shared markup into every page if the current architecture injects it through JavaScript.

Brand strings must remain data-driven.

## 8. Navigation

Current main navigation must remain coherent.

Services is the parent of:
- `services-annotation.html`
- `services-collection.html`

These are not separate top-level menu items.

Both service detail pages must preserve:
- breadcrumb `Services > <page>`
- in-page switch between the two service pages

New pages:
- Careers / Tuyển dụng
- Subaru partner page

must be integrated into navigation without breaking existing routes.

## 9. Revision 2 rules

Preserve these established rules:

- Header: logo + brand lockup on left.
- Main menu is placed immediately LEFT of the language switcher on the right side.
- Active tab has a clear indicator.
- Brand lockup:
  - large `BPO`
  - `BUSINESS PROCESS OUTSOURCING`
  - `BRYCEN VIETNAM`
- Use `ui.brand.*` for brand strings rather than hard-coded visible text.
- Placeholder image slots with `"placeholder": true` are intentional empty spots.
- Render intentional empty slots as subtle dashed frames.
- Do not delete them merely because no final image exists.
- Annotation rows follow `site.config.json -> layout.annotationRows`.
- `image-left` is the default; `zigzag` is supported.
- Mobile: image above text.
- Global back-to-top is controlled by `site.config.json -> backToTop`.
- Obsolete Revision 2 patch keys must not be used by new code.
- Role codes remain:
  - VNA = Annotator
  - VNC = Checker
  - VNSC = Super Checker
  - SubPL = Sub Project Leader
  - PL = Project Leader

## 10. Required new/updated page behavior

### Home
Must support:
- hero statement: `5 năm liên tiếp top 1 thị trường tại Nhật Bản.`
- four statistics:
  - Năm khởi điểm
  - Nhân sự
  - Dự án đã thực hiện
  - Năm liên tiếp Top 1 thị trường Nhật Bản*
- each statistic has an image slot
- horizontal/running product image section for services
- background image slot for "Cam kết của chúng tôi"
- rename "Khách hàng tiêu biểu" to "Đối Tác chiến lược"
- strategic partner focus: SUBARU
- link to dedicated Subaru page

Do not invent numeric values.

### Subaru
Dedicated page must contain:
- Giới thiệu Subaru
- Giá trị cốt lõi và Công nghệ
- technology sections:
  - Động cơ Boxer
  - S-AWD
  - EyeSight
  - SGP
- each technology has a background image slot
- state only the supplied facts
- mention that BPO BRYCEN VN cooperated and built a product related to EyeSight
- do not invent a product name, date, KPI, or technical specification

### About
- history years displayed above images, aligned horizontally
- existing body content remains in its intended position
- remove old 2025 statement:
  `Mở văn phòng mới tại Phạm Văn Đồng và Lý Thường Kiệt.`
- add multinational collaboration:
  Việt Nam / Cambodia / Myanmar
- include background image slot
- offices:
  - Main: `Tầng 2~6, 25 Nguyễn Văn Cừ, Thuận Hóa, Huế, Vietnam`
  - Branch: `28 Lý Thường Kiệt, Thuận Hóa, Huế, Vietnam`
- remove Phạm Văn Đồng
- update map links

### Team
- "Cơ Cấu bộ phận": remove old illustration; use professional client-collaboration image slot
- "Quy trình vận hành": remove old illustration; use professional working image slot
- "Nhân lực được đào tạo trong nước và tại Nhật Bản": Japan background image slot
- remove "Nguồn nhân lực & tuyển dụng"
- recruitment is on Careers

### Achievements / Projects
- "Thành tựu": one background image
- "Dự án": remove customer logos
- add project background image
- add exact supplied customer satisfaction statement:
  `Độ Hài lòng của khách hàng luôn được đánh giá cao và khách hàng luôn quay trở lại.`
- do not invent a percentage

### Vision
- "Định hướng phát triển": background image slot
- roadmap:
  - Current: Nhật Bản + Đông Nam Á
  - Next: USA
  - Later: EU

### Careers
- dedicated recruitment page
- jobs sorted by date
- status:
  - Đang mở
  - Đã đóng
- no invented jobs, salaries, benefits, requirements, or dates

### Contact
Use `https://dataengineering.brycen.co.jp/contact/` only as layout inspiration.

Required layout:
- left: contact form
- right: company/department information in one vertical column
- section `個人情報の取り扱いについて`
- consent before submission
- destination email will be provided later

Hard rule:
- never invent an email
- never create a fake `mailto:`
- never claim a form was successfully emailed unless actual delivery is configured and tested
- keep destination configurable
- if not configured, clearly record it as an open issue

### Services > Tạo dữ liệu học cho AI
For `services-annotation.html`:
- move "Dữ liệu sau khi gán nhãn dùng để làm gì?" before "Mảng công việc"
- each work category has a horizontal image strip/carousel
- images are slots for later replacement
- "Kiểm soát chất lượng": remove old layered illustration; use image slot
- "Nguyên tắc kiểm soát chất lượng": large centered image slot
- "Bảo mật thông tin": image slot

## 11. Data verification / source notes

The original project README identified these unresolved source issues. Preserve them until formally resolved:

### Employee-count discrepancy
Original source reportedly says:
- `550 nhân sự (37 chính thức + 523 part-time)`
but:
- `37 + 523 = 560`

Do NOT choose 550 or 560 without official confirmation.

### Contact information
Original contact slide was empty. Do not invent:
- email
- phone
- address
- department email

The current official office addresses supplied by the user are authoritative for the website, but contact email/phone still require confirmation if not already configured.

### AI data collection
The original source contained limited information for data collection. Do not fabricate:
- process
- devices
- scope
- technical specifications

Use placeholders where needed.

### Annotation descriptions
Descriptions for:
- 3D Segment
- 3D Cuboid
- 2D Segment
- 2D Bounding Box
- Keypoint
- Vệ tinh

were previously supplemented from common definitions. Treat them as requiring business confirmation before publication if they are not explicitly approved.

### EN/JA translations
AI-generated translations require review by appropriate BRYCEN staff before public release.

### Top 1 badges
The source had four `award_top1_01...04` assets but the year mapping was not confirmed. Do not guess the years.

### Logo
A previous source logo was low resolution (`313×99 px`). Prefer an official high-resolution/SVG asset if available.

### Confidentiality
The original PowerPoint was marked Confidential. Do not publish internal:
- revenue
- budget
- private staffing numbers
- internal Japanese slide notes
unless explicitly approved.

## 12. Security and privacy

Never expose:
- API keys
- passwords
- secrets
- internal URLs
- private files
- server credentials
- personal data

Contact form handling must:
- validate input
- avoid unsafe HTML injection
- avoid logging sensitive form data
- use an approved delivery mechanism
- never expose credentials client-side

## 13. Accessibility and responsive behavior

Required:
- semantic HTML
- keyboard navigation
- visible focus states
- accessible labels
- meaningful alt text
- sufficient contrast
- mobile-first responsive layout
- readable Vietnamese diacritics, English, Japanese
- respect `prefers-reduced-motion`

Theme changes must not reduce accessibility.

## 14. Validation

Use existing validation tooling where applicable.

At minimum after meaningful changes:
- validate content/config JSON
- inspect console errors
- inspect broken links
- inspect missing image references
- test affected pages on desktop and mobile
- test dark and light themes
- test navigation
- test form behavior if applicable

Do not claim something works unless it was actually tested.

## 15. Agent workflow

Follow:

`READ → UNDERSTAND → CHANGE MINIMALLY → VALIDATE → REPORT → STOP`

Do exactly the requested step. Do not jump to later phases.

Before changing files:
1. inspect relevant implementation
2. inspect relevant docs
3. identify shared CSS/JS/data dependencies
4. make the smallest coherent change

After changing files:
1. inspect the diff
2. run appropriate validation
3. test affected pages
4. update `docs/03-development/TASKS.md`
5. update `docs/03-development/CHANGELOG.md`
6. report and stop

Never run `git commit`. The user commits.

## 16. Required completion report

At the end of every implementation step, report exactly:

- Files created/changed
- How to verify
- Assumptions
- Open issues

If an issue is not resolved, do not hide it.
