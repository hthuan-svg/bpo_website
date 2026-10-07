---
description: "Quick-update news from news.json on Home and News pages."
agent: agent
---
# Step 09 – News system

Follow AGENTS.md and the files in docs/ (01_PROJECT_SPEC, 02_DESIGN_SYSTEM, 03_CONTENT_MODEL, 04_IMAGE_SLOTS).
Scope: do ONLY this step. Do not start later steps. Do not run `git commit` (I commit myself). Do not change existing text values in content/*.json unless this step says so; when you add keys, add them to vi.json, en.json AND ja.json together.

Build the news system on content/news.json (schema in docs/03):
- assets/js/news.js: load news.json; skip items with hidden:true; sort by date descending; format dates as YYYY.MM.DD; category label from news.categories in the current language; title/summary in the current language (fallback to vi).
- Home: render the 3 latest items as cards into #home-news plus a "View all news" button.
- news.html: card grid; category filter tabs ("All" + categories that exist in the data), in the style of the News section of https://www.brycen.co.jp/; "Show more" after 9 items; ui.news_empty when empty; Facebook Page Plugin (from step 08) in a side column when enabled.
- news.html?id=<id>: detail view (image, date, category, title, summary, "Read original ↗" if link, "Open Facebook post" if facebook_post, Facebook share button, Back button). Unknown id -> friendly message.
- Language switch must re-render list and detail immediately.
Add nothing else to news.json; the two existing real items and the hidden "_template" stay.

When finished, reply with: (1) files created/changed, (2) how I verify it (Live Server URL or command), (3) assumptions you made, (4) open issues. Then STOP and wait for me.

## Definition of done
- Adding a block to news.json shows it on Home and News; setting hidden:true removes it.
