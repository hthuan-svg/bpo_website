// make-release.mjs – packs deployable site files while excluding local-only and support folders.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const releaseDir = path.join(root, 'release');
const ignoreFile = path.join(root, '.deployignore');
const defaultIgnorePatterns = ['assets/images/_unused', 'content/_backup_', 'revision2', 'revision3', 'docs'];

function readPatterns() {
  if (!fs.existsSync(ignoreFile)) return [];
  return fs.readFileSync(ignoreFile, 'utf8')
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith('#'))
    .map((line) => line.replace(/\\/g, '/').replace(/^\.\//, '').replace(/\/+$/, ''));
}

const patterns = [...defaultIgnorePatterns, ...readPatterns()];

function matchesPattern(normalizedPath, pattern) {
  if (!pattern) return false;
  const cleanPattern = pattern.replace(/\\/g, '/').replace(/^\.\//, '').replace(/\/+$/, '');
  if (!cleanPattern) return false;
  if (!cleanPattern.includes('*')) {
    return normalizedPath === cleanPattern || normalizedPath.startsWith(`${cleanPattern}/`) || normalizedPath.startsWith(cleanPattern);
  }
  const regex = new RegExp(`^${cleanPattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/\\\*/g, '.*')}(?:/|$)`);
  return regex.test(normalizedPath);
}

function isIgnored(relativePath) {
  const normalized = relativePath.replace(/\\/g, '/').replace(/^\.\//, '').replace(/\/+$/, '');
  if (!normalized || normalized === 'release') return true;
  return patterns.some((pattern) => matchesPattern(normalized, pattern));
}

function walk(sourceDir, targetDir) {
  for (const entry of fs.readdirSync(sourceDir, { withFileTypes: true })) {
    const sourcePath = path.join(sourceDir, entry.name);
    const relativePath = path.relative(root, sourcePath).replace(/\\/g, '/');
    if (isIgnored(relativePath)) continue;

    const destinationPath = path.join(targetDir, entry.name);
    if (entry.isDirectory()) {
      fs.mkdirSync(destinationPath, { recursive: true });
      walk(sourcePath, destinationPath);
      continue;
    }

    fs.mkdirSync(path.dirname(destinationPath), { recursive: true });
    fs.copyFileSync(sourcePath, destinationPath);
  }
}

function main() {
  fs.rmSync(releaseDir, { recursive: true, force: true });
  fs.mkdirSync(releaseDir, { recursive: true });
  walk(root, releaseDir);
  console.log(`✔ Release package created in ${path.relative(root, releaseDir)}`);
  console.log(`Ignored patterns: ${patterns.join(', ') || '(none)'}`);
}

main();
