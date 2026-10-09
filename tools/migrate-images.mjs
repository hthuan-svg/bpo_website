// migrate-images.mjs – chuyển ảnh sang cấu trúc thư mục theo từng trang & đổi tên slot (Revision 3).
//   node tools/migrate-images.mjs --dry-run   -> chỉ báo cáo
//   node tools/migrate-images.mjs             -> thực hiện (có sao lưu các file văn bản bị sửa)
// Quy tắc đặt tên: <trang>_<mục>_<số>  ->  thư mục assets/images/<trang>/<tên>.<đuôi>
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dry = process.argv.includes('--dry-run');
const P = (...p) => path.join(root, ...p);
const rel = f => path.relative(root, f).split(path.sep).join('/');
const map = JSON.parse(fs.readFileSync(P('revision3', 'image-map.json'), 'utf8'));
const imgJsonFile = P('content', 'images.json');
const images = JSON.parse(fs.readFileSync(imgJsonFile, 'utf8'));
const slots = images.slots;
const stamp = new Date().toISOString().replace(/[:.]/g, '-');
const backupRoot = P('content', '_backup_r3', stamp);
const backed = new Set();
const report = { moved: [], archived: [], missingFile: [], renamedSlots: 0, textFiles: [], leftovers: [] };

const backup = f => { if (dry || backed.has(f) || !fs.existsSync(f)) return; const d = path.join(backupRoot, rel(f)); fs.mkdirSync(path.dirname(d), { recursive: true }); fs.copyFileSync(f, d); backed.add(f); };
const ensureDir = f => { if (!dry) fs.mkdirSync(path.dirname(f), { recursive: true }); };
const move = (from, to) => { ensureDir(to); if (!dry) fs.renameSync(from, to); };
function archive(fromAbs, label) {
  const to = P('assets', 'images', '_unused', rel(fromAbs).replace(/^assets\/images\//, ''));
  ensureDir(to); if (!dry) { if (fs.existsSync(to)) fs.rmSync(to); fs.renameSync(fromAbs, to); }
  report.archived.push(`${rel(fromAbs)} -> ${rel(to)} (${label})`);
}

// 1) di chuyển file theo moves
const pathMap = {}; // old rel -> new rel
const idMap = {};   // old slot -> new slot
for (const m of map.moves) {
  const entry = slots[m.from];
  if (!entry) { report.missingFile.push(`slot ${m.from}: không có trong images.json (bỏ qua)`); continue; }
  const prefix = m.to.split('_')[0];
  const folder = m.folder || (map.folders.includes(prefix) ? prefix : 'common');
  const ext = path.extname(entry.src);
  const newRel = `assets/images/${folder}/${m.to}${ext}`;
  const oldAbs = P(entry.src), newAbs = P(newRel);
  idMap[m.from] = m.to;
  if (entry.src !== newRel) {
    if (fs.existsSync(newAbs)) { if (fs.existsSync(oldAbs)) archive(oldAbs, 'file đích đã có trong gói – giữ file đích'); }
    else if (fs.existsSync(oldAbs)) { move(oldAbs, newAbs); report.moved.push(`${entry.src} -> ${newRel}`); }
    else report.missingFile.push(`${entry.src} (không thấy file trên đĩa)`);
    pathMap[entry.src] = newRel;
  }
}
for (const e of map.extra_files || []) {
  const a = P(e.from), b = P(e.to);
  if (fs.existsSync(a) && !fs.existsSync(b)) { move(a, b); report.moved.push(`${e.from} -> ${e.to}`); }
  pathMap[e.from] = e.to;
}
// 2) lưu trữ ảnh retire
for (const s of map.retire) {
  const entry = slots[s]; if (!entry) continue;
  const abs = P(entry.src); if (fs.existsSync(abs)) archive(abs, `slot ${s} đã ngừng dùng`);
  else report.missingFile.push(`${entry.src} (retire, không thấy file)`);
}

// 3) cập nhật images.json (đổi key, src; bỏ slot retire)
const newSlots = {};
for (const [k, v] of Object.entries(slots)) {
  if (map.retire.includes(k)) continue;
  const nk = idMap[k] || k; const nv = { ...v };
  if (pathMap[v.src]) nv.src = pathMap[v.src];
  newSlots[nk] = nv; if (nk !== k) report.renamedSlots++;
}
images.slots = newSlots;

// 4) cập nhật các file văn bản
const textExt = new Set(['.html', '.js', '.mjs', '.css', '.json', '.xml', '.webmanifest']);
const skipDirs = new Set(['node_modules', '.git', '_backup_r2', '_backup_r3', 'dist', 'revision2', 'revision3', 'docs']);
function* walk(d) { for (const e of fs.readdirSync(d, { withFileTypes: true })) { if (skipDirs.has(e.name)) continue; const f = path.join(d, e.name); if (e.isDirectory()) { if (rel(f).startsWith('assets/images')) continue; yield* walk(f); } else if (textExt.has(path.extname(e.name))) yield f; } }
const esc = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const ids = Object.entries(idMap).filter(([a, b]) => a !== b);
const retired = map.retire;

function rewriteText(txt, f) {
  let out = txt;
  for (const [o, n] of Object.entries(pathMap)) out = out.split(o).join(n);                 // đường dẫn file
  for (const [o, n] of ids) out = out.replace(new RegExp(`(["'\`])${esc(o)}\\1`, 'g'), `$1${n}$1`); // "slot" / 'slot'
  return out;
}
for (const f of walk(root)) {
  if (path.resolve(f) === path.resolve(imgJsonFile)) continue;
  const base = rel(f);
  if (base.startsWith('content/_backup')) continue;
  const txt = fs.readFileSync(f, 'utf8'); let out;
  if (base === 'content/news.json') {                                                       // tin tức: ánh xạ riêng
    const j = JSON.parse(txt);
    for (const it of j.items || []) if (map.news_image_map[it.image]) it.image = map.news_image_map[it.image];
    out = JSON.stringify(j, null, 2) + '\n';
    out = rewriteText(out, f);
  } else out = rewriteText(txt, f);
  if (out !== txt) { backup(f); if (!dry) fs.writeFileSync(f, out, 'utf8'); report.textFiles.push(base); }
}
backup(imgJsonFile); if (!dry) fs.writeFileSync(imgJsonFile, JSON.stringify(images, null, 2) + '\n', 'utf8');

// 5) kiểm tra tham chiếu còn sót tới slot đã retire / đã đổi tên (chỉ khi chạy thật)
if (!dry) for (const f of walk(root)) {
  const base = rel(f); if (base.startsWith('content/_backup')) continue;
  const txt = fs.readFileSync(f, 'utf8');
  for (const s of [...retired, ...ids.map(i => i[0])]) if (txt.includes('"' + s + '"') || txt.includes("'" + s + "'") || txt.includes('`' + s + '`')) report.leftovers.push(`${base}: còn nhắc tới "${s}"`);
}
// dọn thư mục rỗng cũ
if (!dry) for (const d of ['branding', 'backgrounds', 'about', 'timeline', 'services', 'team', 'customers', 'awards', 'placeholders']) {
  const dir = P('assets', 'images', d); try { if (fs.existsSync(dir) && fs.readdirSync(dir).length === 0) fs.rmdirSync(dir); } catch {}
}
const L = (t, a) => { console.log(`\n${t} (${a.length})`); a.forEach(x => console.log('  ' + x)); };
console.log(dry ? '=== DRY-RUN (chưa ghi gì) ===' : '=== ĐÃ THỰC HIỆN ===');
L('✔ File ảnh đã chuyển', report.moved); L('📦 File ảnh đưa vào _unused/', report.archived);
console.log(`\n✔ Slot đã đổi tên: ${report.renamedSlots}`); L('✔ File văn bản đã cập nhật tham chiếu', [...new Set(report.textFiles)]);
if (report.missingFile.length) L('⚠ Cần xem lại', report.missingFile);
if (report.leftovers.length) L('⚠ Tham chiếu còn sót (agent/bạn cần sửa tay)', [...new Set(report.leftovers)]);
if (!dry) console.log(`\nBản sao lưu các file văn bản: ${rel(backupRoot)}`);
