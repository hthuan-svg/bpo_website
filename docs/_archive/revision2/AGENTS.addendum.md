
## Revision 2 rules (added after step 12)
- **Services is the parent** of "AI Training Data Creation" (`services-annotation.html`) and "AI Training Data Collection" (`services-collection.html`). Both pages show a breadcrumb `Services > <page>` and an in-page switch between the two. Never present them as top-level menu items.
- **Header**: logo + brand lockup on the left; the main menu is rendered as clickable **tabs** placed immediately to the LEFT of the language switcher (right side of the header). Active tab has a clear indicator.
- **Brand lockup**: the department must be unmistakable: a large "BPO" mark, the full name "BUSINESS PROCESS OUTSOURCING", and "BRYCEN VIETNAM". All strings come from `ui.brand.*` – never hard-code them.
- **Placeholders**: image slots with `"placeholder": true` in `images.json` are intentional empty spots (Data Collection gallery, EU, Southeast Asia). Keep them, render them with a subtle dashed frame, and never delete them. When the owner replaces the file, they set `placeholder` to `false`.
- **Annotation rows** follow `site.config.json -> layout.annotationRows` (`image-left` default, or `zigzag`). On mobile: image above text.
- **Back-to-top button** is global (`assets/js/backtotop.js`), controlled by `site.config.json -> backToTop`.
- **Obsolete keys** (listed in `revision2/patches/r2.*.json -> remove`) must NOT be used by new code. They are deleted later with `node tools/apply-patch.mjs --cleanup`.
- Role codes in the quality chain: VNA = Annotator, VNC = Checker, VNSC = Super Checker, SubPL = Sub Project Leader, PL = Project Leader. Keep these codes exactly as written (they are internal terms, not typos).
