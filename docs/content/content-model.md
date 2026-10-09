# Content model

## Files in `content/`
| File | Holds | Edited by |
|---|---|---|
| `vi.json`, `en.json`, `ja.json` | All site text — **identical key trees** | Content owner |
| `news.json` | News posts | News publisher |
| `recruits.json` | Recruitment posts (status open/closed) | HR / recruiter |
| `images.json` | Slot → file path + alt text (vi/en/ja) + `placeholder` flag | Image owner |
| `site.config.json` | Email, phone, addresses, social, Facebook, map, contact form, back-to-top, marquee speed, annotation layout, recruits options | Admin |
`content/_backup_*/` hold automatic backups made by tools (never read by the site, never deployed).

## Top-level key map (vi/en/ja)
```
meta · ui{nav,footer,status,brand,back_to_top,coming_soon,image_placeholder,partner_main,view_detail,on_this_page,gallery,…}
certifications{title,lead,items[{code,name,image}]}
home{hero,stats[{value,label,image}],stats_note,pillars_*,pillars[],showcase{items[{image,caption}]},commitments[],certifications_title,partners{main{name,logo,link,text}},news_title,cta}
subaru{hero,intro{history,global},tech{items[{id,image,name,text,highlight?,partnership*}]},cta}
about{intro,history{lead,timeline[{year,icon,text}]},offices{items[{type,image,name,address,map_query}]},global{image,lead,countries[]}}
services{page_title,lead,overview_note,status{open},annotation{lead,tabs,order[],highlights[],usecases,modalities[{id,label,tag,title,text,types[{id,name,images[],captions?,title,summary,points[]}]}],strips{typeId:[slots]},workflow,quality{lead,principles[],flow_image,principles_image,flow_caption,layers[]*},security{title,text,image},cta},collection{status,lead,message,gallery[]},data_engineering{status,lead,message,gallery[]}}
team{tabs,org{lead,headcount,image},process{lead,actors,steps[{actor,text}],image},people{lead,steps[],images[],country_image,country_caption}}
achievements{awards{headline,headline_text,image,text,source},projects{text,stat_value,stat_label,images[],satisfaction{image,title,text}}}
vision{direction{text,image},growth{lead,stages[{id,phase,level,title,text,image|regions[]}]}}
news{page_title,lead,categories,facebook_title}
recruits{page_title,banner,default_image,lead,intro,filters,labels,empty,apply_subject,back}
contact{page_title,lead,banner,response_note,labels,form{fields,type_options,…},company_panel,privacy{items[]}}
```
`*` = kept but not rendered (`quality.layers`).

## Data-binding attributes (rendered by `assets/js/render.js`)
`data-i18n="path"` · `data-i18n-html` (sanitised: b i em strong br a) · `data-i18n-attr="attr:path"` · `data-img="slot"` · `data-bg="slot"` · `data-list="path"` + `<template>` + `data-field` / `data-img-field` · `data-config="path"` (from `site.config.json`) · `data-show-if="path"` (hide when empty).

## Slot naming
`<page>_<section>_<item>[_<nn>]`, folder = the page prefix (`home about services team achievements vision news contact subaru recruits`, anything shared = `common`). Examples: `home_stat_staff`, `services_3d_bbox_strip_02`, `subaru_tech_eyesight`, `news_2026_09_us_dataset`.

## news.json / recruits.json item
News: `{id,date,category,hidden,image,link,facebook_post,title{vi,en,ja},summary{…}}`. Image slot convention for news: `news_<yyyy>_<mm>_<slug>`.
Recruits: `{id,date,deadline,status:"open|closed",hidden,image,apply_link,title{…},summary{…},location{…},type{…},body{…}}` — paragraphs in `body` are separated by a blank line (`\n\n`).
Real JSON has no comments. Ids: lowercase ASCII, no spaces, unique.

## Tools that change content
`apply-patch.mjs revisionN` merges new keys (backup first; `--cleanup` removes obsolete keys listed in the patch). `migrate-images.mjs` moves/renames slots. Both are idempotent and print what they changed.
