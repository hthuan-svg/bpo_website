// apply-patch.mjs – gộp "bản vá" (revision2, revision3, ...) vào content/*.json (an toàn, có sao lưu).
// Cách dùng:
//   node tools/apply-patch.mjs revision3              -> thêm/cập nhật nội dung mới (giữ nguyên các khóa khác)
//   node tools/apply-patch.mjs revision3 --dry-run    -> chỉ báo cáo, không ghi file
//   node tools/apply-patch.mjs revision3 --cleanup    -> XÓA các khóa cũ không còn dùng (chạy SAU KHI code đã chuyển sang khóa mới)
// (không ghi tên thư mục bản vá thì mặc định dùng thư mục revision mới nhất)
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const rawArgs = process.argv.slice(2);
const args = new Set(rawArgs);
const dry = args.has('--dry-run'), cleanup = args.has('--cleanup');
const P = (...p) => path.join(root, ...p);
const named = rawArgs.find(x => !x.startsWith('--'));
const latest = fs.readdirSync(root).filter(d => /^revision\d+$/.test(d) && fs.existsSync(P(d, 'patches'))).sort((x, y) => parseInt(x.slice(8)) - parseInt(y.slice(8))).pop();
const REV = named || latest;
if (!REV || !fs.existsSync(P(REV, 'patches'))) { console.error('Không tìm thấy thư mục bản vá. Ví dụ: node tools/apply-patch.mjs revision3'); process.exit(1); }
const TAG = REV.replace('revision', 'r');
console.log(`Bản vá: ${REV}`);
const readJson = f => JSON.parse(fs.readFileSync(f, 'utf8'));
const isObj = v => v && typeof v === 'object' && !Array.isArray(v);
const log = { added: 0, replaced: [], removed: 0, same: 0 };

function merge(target, patch, trail = '') {
  for (const [k, v] of Object.entries(patch)) {
    const here = trail ? `${trail}.${k}` : k;
    if (isObj(v) && isObj(target[k])) merge(target[k], v, here);
    else if (!(k in target)) { target[k] = v; log.added++; }
    else if (JSON.stringify(target[k]) === JSON.stringify(v)) log.same++;
    else { log.replaced.push(here); target[k] = v; }
  }
}
function removeKey(obj, dotted) {
  const parts = dotted.split('.'); let o = obj;
  for (const p of parts.slice(0, -1)) { if (!isObj(o?.[p])) return false; o = o[p]; }
  const last = parts.at(-1); if (!(last in o)) return false; delete o[last]; return true;
}
function write(file, data) {
  if (dry) return;
  fs.writeFileSync(file, JSON.stringify(data, null, 2) + '\n', 'utf8');
}

// sao lưu
const stamp = new Date().toISOString().replace(/[:.]/g, '-');
const backupDir = P('content', '_backup_' + REV.replace('revision', 'r'), stamp);
if (!dry) {
  fs.mkdirSync(backupDir, { recursive: true });
  for (const f of fs.readdirSync(P('content'))) if (f.endsWith('.json') && fs.statSync(P('content', f)).isFile()) fs.copyFileSync(P('content', f), path.join(backupDir, f));
  console.log(`✔ Đã sao lưu content/*.json vào ${path.relative(root, backupDir)}`);
}

for (const lang of ['vi', 'en', 'ja']) {
  const patch = readJson(P(REV, 'patches', `${TAG}.${lang}.json`));
  const file = P('content', `${lang}.json`); const data = readJson(file);
  if (cleanup) { let n = 0; for (const k of patch.remove || []) if (removeKey(data, k)) n++; log.removed += n; console.log(`  ${lang}.json: đã xóa ${n} khóa cũ`); }
  else merge(data, patch.set, lang);
  write(file, data);
}
if (!cleanup) {
  for (const [name, file, key] of [['images', 'images.json', `${TAG}.images.json`], ['site.config', 'site.config.json', `${TAG}.site.config.json`]]) {
    const data = readJson(P('content', file)); merge(data, readJson(P(REV, 'patches', key)).set, name); write(P('content', file), data);
  }
  // thêm quy tắc vào AGENTS.md / copilot-instructions.md (chỉ 1 lần)
  const addFile = P(REV, 'AGENTS.addendum.md');
  if (fs.existsSync(addFile)) {
  const add = fs.readFileSync(addFile, 'utf8');
  for (const f of ['AGENTS.md', path.join('.github', 'copilot-instructions.md')]) {
    const file = P(f); if (!fs.existsSync(file)) continue;
    const cur = fs.readFileSync(file, 'utf8');
    if (cur.includes('## Revision 2 rules')) { console.log(`  ${f}: đã có quy tắc Revision 2`); continue; }
    if (!dry) fs.appendFileSync(file, add); console.log(`✔ Đã thêm quy tắc Revision 2 vào ${f}`);
  }
  }
}
console.log(dry ? '\n(DRY-RUN – chưa ghi gì)' : '');
if (cleanup) console.log(`Đã xóa tổng cộng ${log.removed} khóa cũ.`);
else {
  console.log(`Khóa mới thêm: ${log.added} | giống sẵn: ${log.same} | bị ghi đè: ${log.replaced.length}`);
  if (log.replaced.length) { console.log('⚠ Các khóa đã tồn tại và được thay bằng nội dung mới (bản cũ nằm trong thư mục sao lưu):'); [...new Set(log.replaced)].forEach(k => console.log('   - ' + k)); }
  console.log('\nBước tiếp theo: xem docs/work/current-work.md để chạy các prompt tiếp theo.');
}
