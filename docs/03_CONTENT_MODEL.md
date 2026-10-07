# 03 – Mô hình nội dung & cách gắn dữ liệu vào trang

## Các file trong `content/`
| File | Chứa | Ai sửa |
|---|---|---|
| `vi.json`, `en.json`, `ja.json` | Toàn bộ chữ của web, **cùng cấu trúc khóa** | Người phụ trách nội dung |
| `news.json` | Danh sách tin tức (mỗi tin có đủ 3 ngôn ngữ) | Người đăng tin |
| `images.json` | Bảng *slot ảnh → đường dẫn + mô tả (alt) 3 ngôn ngữ* | Người quản lý ảnh |
| `site.config.json` | Email, điện thoại, địa chỉ, link Facebook/MXH, bản đồ, biểu mẫu | Quản trị |

Nguyên tắc: **khóa giống nhau ở cả 3 file ngôn ngữ**. Thiếu khóa ở 1 ngôn ngữ → tự lùi về tiếng Việt và ghi cảnh báo console (và `validate-content.mjs` báo lỗi).

## Cây khóa chính (`vi.json`)
```
meta.{title,description}
ui.nav.{home,about,services,services_annotation,services_collection,team,achievements,vision,news,contact}
ui.{skip,read_more,back,all,view_all_news,follow_us,footer_*,parent_site,news_empty,language,menu,copyright}
home.{hero,stats[],stats_note,pillars[],commitments[],customers_title,news_title,cta}
about.{intro,history{lead,timeline[]},offices{items[]}}
services.{lead,overview_note,annotation{items[],quality},collection{items[],todo}}
team.{structure,flow{lanes,phases[]},growth}
achievements.{awards,projects}
vision.{direction,recruit}
news.{page_title,lead,categories{},facebook_title}
contact.{lead,labels,note}
```

## Cách gắn dữ liệu vào HTML (data-attributes)
| Thuộc tính | Ý nghĩa | Ví dụ |
|---|---|---|
| `data-i18n="đường.dẫn"` | Gán `textContent` theo ngôn ngữ hiện tại | `<h1 data-i18n="home.hero.title"></h1>` |
| `data-i18n-html="..."` | Như trên nhưng cho phép `<b>`, `<br>` (đã lọc an toàn) | dùng hạn chế |
| `data-i18n-attr="thuộc_tính:đường.dẫn"` | Gán vào thuộc tính | `data-i18n-attr="aria-label:ui.menu"` |
| `data-img="slot"` | Gán `src` + `alt` (alt theo ngôn ngữ) từ `images.json` | `<img data-img="company_logo">` |
| `data-bg="slot"` | Đặt `background-image` | `<section data-bg="background_main">` |
| `data-list="đường.dẫn"` + `<template>` | Lặp qua mảng, nhân bản template | xem dưới |
| `data-field="tên"` | Trong template: gán chữ từ trường của mục | `<h3 data-field="title">` |
| `data-img-field="tên"` | Trong template: trường chứa **tên slot** ảnh | `<img data-img-field="image">` |
| `data-config="đường.dẫn"` | Giá trị từ `site.config.json` (vd link) | `<a data-config="social.facebook">` |
| `data-show-if="đường.dẫn"` | Ẩn phần tử nếu giá trị rỗng | ẩn icon Facebook khi chưa có link |

### Ví dụ danh sách
```html
<ul data-list="home.stats">
  <template>
    <li><strong data-field="value"></strong><span data-field="label"></span></li>
  </template>
</ul>
```

## Tin tức (`news.json`)
```json
{
  "id": "2026-10-khai-truong",      // chữ thường, không dấu, không khoảng trắng; duy nhất
  "date": "2026-10-15",             // YYYY-MM-DD
  "category": "event",              // announcement | event | award | project | recruit | media
  "hidden": false,                  // true = chưa hiện
  "image": "team_event_booth",      // tên slot trong images.json
  "link": "",                       // link bài gốc (để trống = mở trang chi tiết nội bộ)
  "facebook_post": "",              // link bài Facebook tương ứng (tuỳ chọn)
  "title":   { "vi": "", "en": "", "ja": "" },
  "summary": { "vi": "", "en": "", "ja": "" }
}
```
> Lưu ý: JSON **không cho phép chú thích `//`** – đoạn trên chỉ để giải thích; file thật không có chú thích.

## Cảnh báo lỗi JSON thường gặp
Thiếu/thừa dấu phẩy, quên đóng ngoặc, dùng nháy cong `“ ”` thay nháy thẳng `"`. VS Code gạch đỏ các lỗi này; chạy `node tools/validate-content.mjs` để kiểm tra.
