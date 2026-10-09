// reorganize-docs.mjs – đưa tài liệu & prompt cũ vào docs/_archive/ để cấu trúc mới gọn gàng.
//   node tools/reorganize-docs.mjs --dry-run   -> chỉ liệt kê
//   node tools/reorganize-docs.mjs             -> thực hiện (di chuyển, không xóa gì)
// Giữ nguyên: docs/README.md, các thư mục docs/overview|content|images|work|prompts|release|reference, và prompt đang dùng.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dry = process.argv.includes('--dry-run');
const P = (...p) => path.join(root, ...p);
const rel = f => path.relative(root, f).split(path.sep).join('/');
const plan = [];

// 1) tài liệu cũ nằm trực tiếp trong docs/
if (fs.existsSync(P('docs'))) for (const e of fs.readdirSync(P('docs'), { withFileTypes: true }))
  if (e.isFile() && e.name !== 'README.md') plan.push([P('docs', e.name), P('docs', '_archive', e.name)]);
// 2) prompt cũ (bước 00–14, r2-*) – prompt dùng chung & r3-* được giữ lại
const keep = /^(r3-|session-start|fix-bug|add-content-block|add-image-slot|review-translations|deploy-package)/;
if (fs.existsSync(P('.github', 'prompts'))) for (const f of fs.readdirSync(P('.github', 'prompts')))
  if (f.endsWith('.prompt.md') && !keep.test(f)) plan.push([P('.github', 'prompts', f), P('docs', '_archive', 'prompts', f)]);
// 3) bản vá & hướng dẫn cài của Revision 2
if (fs.existsSync(P('revision2'))) plan.push([P('revision2'), P('docs', '_archive', 'revision2')]);
for (const n of ['README_R2.md', 'INSTALL_R3.md']) if (fs.existsSync(P(n))) plan.push([P(n), P('docs', '_archive', n)]);

if (!plan.length) { console.log('Không có gì cần sắp xếp (đã gọn).'); process.exit(0); }
for (const [a, b] of plan) {
  console.log(`${dry ? '[dry] ' : ''}${rel(a)}  ->  ${rel(b)}`);
  if (dry) continue;
  fs.mkdirSync(path.dirname(b), { recursive: true });
  if (fs.existsSync(b)) fs.rmSync(b, { recursive: true, force: true });
  fs.renameSync(a, b);
}
console.log(`\n${dry ? '(DRY-RUN – chưa di chuyển gì) ' : '✔ '}${plan.length} mục. Tài liệu cũ nằm trong docs/_archive/ (chỉ để tra cứu).`);
