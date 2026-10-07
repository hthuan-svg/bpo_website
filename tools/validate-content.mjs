// Checks localized content, image slots, news entries, and site URLs.
import { readdir, readFile, stat } from 'node:fs/promises';
import { dirname, isAbsolute, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const locales = ['vi', 'en', 'ja'];
const ignoredContentRoots = ['content/_backup_r2', 'revision2', 'docs/reference'];
const placeholderMarkers = ['[CẦN BỔ SUNG]', '[TO ADD]', '【要追記】'];
const newsCategories = ['announcement', 'event', 'award', 'project', 'recruit', 'media'];
const slotReferenceKeys = new Set(['image', 'images', 'icon', 'customers', 'badges']);
const errors = [];
const warnings = [];
const parsedFiles = new Map();

function report(target, message) {
  errors.push(`✖ ${target}: ${message}`);
}

function warn(target, message) {
  warnings.push(`⚠ ${target}: ${message}`);
}

async function readJson(relativePath) {
  const normalized = relativePath.split('\\').join('/');
  const ignored = ignoredContentRoots.some((item) => normalized === item || normalized.startsWith(`${item}/`));
  if (ignored) return undefined;

  const target = resolve(root, relativePath);
  try {
    const text = await readFile(target, 'utf8');
    const value = JSON.parse(text);
    parsedFiles.set(relativePath, value);
    return value;
  } catch (error) {
    const reason = error instanceof SyntaxError
      ? `JSON is invalid (${error.message}). Fix commas, quotes, and brackets.`
      : `Could not read this file (${error.message}). Check that it exists and is readable.`;
    report(relativePath, reason);
    return undefined;
  }
}

function flattenKeys(value, prefix = '', keys = new Set()) {
  if (Array.isArray(value)) {
    value.forEach((item, index) => flattenKeys(item, `${prefix}[${index}]`, keys));
  } else if (value && typeof value === 'object') {
    for (const [key, item] of Object.entries(value)) {
      const path = prefix ? `${prefix}.${key}` : key;
      keys.add(path);
      flattenKeys(item, path, keys);
    }
  }
  return keys;
}

function checkLocalizedStrings(value, filePath, prefix = '') {
  if (typeof value === 'string') {
    const key = prefix || '(root)';
    if (value.trim() === '') {
      warn(`${filePath} → ${key}`, 'Text is empty. Add content if this is meant to be shown.');
    }
    const marker = placeholderMarkers.find((item) => value.startsWith(item));
    if (marker) {
      warn(`${filePath} → ${key}`, `Text starts with the placeholder marker "${marker}". Replace it before publishing.`);
    }
    return;
  }
  if (Array.isArray(value)) {
    value.forEach((item, index) => checkLocalizedStrings(item, filePath, `${prefix}[${index}]`));
    return;
  }
  if (value && typeof value === 'object') {
    for (const [key, item] of Object.entries(value)) {
      checkLocalizedStrings(item, filePath, prefix ? `${prefix}.${key}` : key);
    }
  }
}

function checkKeySets(languageFiles) {
  const validLanguages = locales.filter((locale) => languageFiles[locale] !== undefined);
  if (validLanguages.length < 2) return;

  const baseLocale = validLanguages[0];
  const baseKeys = flattenKeys(languageFiles[baseLocale]);
  for (const locale of validLanguages.slice(1)) {
    const keys = flattenKeys(languageFiles[locale]);
    const missing = [...baseKeys].filter((key) => !keys.has(key)).sort();
    const extra = [...keys].filter((key) => !baseKeys.has(key)).sort();
    if (missing.length || extra.length) {
      const details = [];
      if (missing.length) details.push(`missing keys: ${missing.join(', ')}`);
      if (extra.length) details.push(`extra keys: ${extra.join(', ')}`);
      report(`content/${locale}.json`, `Key structure differs from content/${baseLocale}.json (${details.join('; ')}). Add or remove the listed keys so all three languages match.`);
    }
  }
}

function getNestedValue(object, path) {
  return path.split('.').reduce((value, key) => value && value[key], object);
}

async function checkImageSlots(images) {
  const slots = images?.slots;
  if (!slots || typeof slots !== 'object' || Array.isArray(slots)) {
    report('content/images.json → slots', 'Expected an object of image slots. Add each slot name with a file path and alt text.');
    return {};
  }

  for (const [slotName, slot] of Object.entries(slots)) {
    const target = `content/images.json → slots.${slotName}`;
    if (!slot || typeof slot !== 'object' || Array.isArray(slot)) {
      report(target, 'Slot details must be an object containing "src" and "alt".');
      continue;
    }
    if (typeof slot.src !== 'string' || !slot.src.trim()) {
      report(`${target}.src`, 'Add a path to the image file for this slot.');
    } else {
      const imagePath = resolve(root, slot.src);
      const relativePath = relative(root, imagePath);
      if (isAbsolute(relativePath) || relativePath === '..' || relativePath.startsWith(`..${sep}`)) {
        report(`${target}.src`, 'Use an image path inside this project folder.');
      } else {
        try {
          const info = await stat(imagePath);
          if (!info.isFile()) report(`${target}.src`, `The image path "${slot.src}" is not a file. Check the path and filename.`);
        } catch {
          report(`${target}.src`, `Image file "${slot.src}" was not found. Check the path and filename.`);
        }
      }
    }
    for (const locale of locales) {
      if (typeof slot.alt?.[locale] !== 'string' || !slot.alt[locale].trim()) {
        report(`${target}.alt.${locale}`, `Add descriptive alt text in ${locale.toUpperCase()} so the image is accessible.`);
      }
    }
  }
  return slots;
}

function collectSlotReferences(value, sourcePath, found) {
  if (Array.isArray(value)) {
    value.forEach((item) => collectSlotReferences(item, sourcePath, found));
    return;
  }
  if (!value || typeof value !== 'object') return;

  for (const [key, item] of Object.entries(value)) {
    if (slotReferenceKeys.has(key)) {
      const names = Array.isArray(item) ? item : [item];
      for (const slotName of names) {
        if (typeof slotName === 'string' && slotName.trim()) {
          found.push({ slotName, sourcePath, key });
        }
      }
    }
    collectSlotReferences(item, sourcePath, found);
  }
}

async function listFiles(directory, predicate = () => true) {
  const results = [];
  let entries;
  try {
    entries = await readdir(directory, { withFileTypes: true });
  } catch (error) {
    report(relative(root, directory), `Could not inspect this folder (${error.message}).`);
    return results;
  }
  for (const entry of entries) {
    if (entry.name === '.git' || entry.name === 'node_modules') continue;
    const fullPath = resolve(directory, entry.name);
    const relativePath = relative(root, fullPath).split(sep).join('/');
    const isIgnored = ignoredContentRoots.some((item) => relativePath === item || relativePath.startsWith(`${item}/`));
    if (isIgnored) continue;
    if (entry.isDirectory()) results.push(...await listFiles(fullPath, predicate));
    else if (entry.isFile() && predicate(entry.name)) results.push(fullPath);
  }
  return results;
}

async function checkHtmlSlotReferences(slots) {
  const htmlFiles = await listFiles(root, (name) => name.toLowerCase().endsWith('.html'));
  const attributePattern = /\bdata-(?:img|bg)\s*=\s*["']([^"']+)["']/gi;
  for (const filePath of htmlFiles) {
    const sourcePath = relative(root, filePath).split(sep).join('/');
    const html = await readFile(filePath, 'utf8');
    for (const match of html.matchAll(attributePattern)) {
      const slotName = match[1].trim();
      if (slotName && !Object.hasOwn(slots, slotName)) {
        report(`${sourcePath} → data-${match[0].startsWith('data-bg') ? 'bg' : 'img'}="${slotName}"`, 'This image slot is not listed in content/images.json. Use an existing slot or add the slot there.');
      }
    }
  }
}

function checkNews(news, slots) {
  if (!Array.isArray(news?.items)) {
    report('content/news.json → items', 'Expected a list of news items. Check the JSON structure.');
    return;
  }
  const seenIds = new Set();
  news.items.forEach((item, index) => {
    const target = `content/news.json → items[${index}]`;
    if (!item || typeof item !== 'object' || Array.isArray(item)) {
      report(target, 'Each news item must be an object.');
      return;
    }
    if (typeof item.id !== 'string' || !item.id.trim()) {
      report(`${target}.id`, 'Add a unique ID for this news item.');
    } else if (seenIds.has(item.id)) {
      report(`${target}.id`, `The ID "${item.id}" is repeated. Give each news item a unique ID.`);
    } else {
      seenIds.add(item.id);
    }
    if (typeof item.date !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(item.date) || Number.isNaN(Date.parse(`${item.date}T00:00:00Z`)) || new Date(`${item.date}T00:00:00Z`).toISOString().slice(0, 10) !== item.date) {
      report(`${target}.date`, 'Use a real calendar date in YYYY-MM-DD format, for example 2026-10-15.');
    }
    if (!newsCategories.includes(item.category)) {
      report(`${target}.category`, `Choose one of these categories: ${newsCategories.join(', ')}.`);
    }
    if (typeof item.image !== 'string' || !Object.hasOwn(slots, item.image)) {
      report(`${target}.image`, `The image slot "${item.image ?? ''}" is not listed in content/images.json. Select a valid image slot.`);
    }
    if (item.hidden !== true) {
      for (const field of ['title', 'summary']) {
        for (const locale of locales) {
          if (typeof item[field]?.[locale] !== 'string' || !item[field][locale].trim()) {
            report(`${target}.${field}.${locale}`, `Add a ${field} in ${locale.toUpperCase()} for every visible news item.`);
          }
        }
      }
    }
  });
}

function isValidHttpUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

function checkSiteConfig(config) {
  if (!config || typeof config !== 'object') {
    report('content/site.config.json', 'Expected a configuration object.');
    return;
  }
  const urlPaths = [
    'parentCompanySite',
    'social.facebook',
    'social.youtube',
    'social.linkedin',
    'social.instagram',
    'social.zalo',
    'facebookPagePlugin.pageUrl',
    'contact.mapEmbedUrl',
    'contact.formUrl'
  ];
  for (const path of urlPaths) {
    const value = getNestedValue(config, path);
    if (value === undefined || value === null || value === '') continue;
    if (typeof value !== 'string' || !isValidHttpUrl(value)) {
      report(`content/site.config.json → ${path}`, 'Enter a complete web address starting with https:// or http://, or leave it empty to hide that link.');
    }
  }
}

async function main() {
  const languageFiles = {};
  for (const locale of locales) {
    languageFiles[locale] = await readJson(`content/${locale}.json`);
    if (languageFiles[locale] !== undefined && (!languageFiles[locale] || typeof languageFiles[locale] !== 'object' || Array.isArray(languageFiles[locale]))) {
      report(`content/${locale}.json`, 'The translation file must contain a JSON object of keys and text.');
      languageFiles[locale] = undefined;
    } else if (languageFiles[locale] !== undefined) {
      checkLocalizedStrings(languageFiles[locale], `content/${locale}.json`);
    }
  }
  checkKeySets(languageFiles);

  const [images, news, config] = await Promise.all([
    readJson('content/images.json'),
    readJson('content/news.json'),
    readJson('content/site.config.json')
  ]);
  const slots = await checkImageSlots(images);
  if (images !== undefined) {
    const references = [];
    for (const [filePath, value] of parsedFiles) {
      if (!['content/images.json', 'content/site.config.json'].includes(filePath)) {
        collectSlotReferences(value, filePath, references);
      }
    }
    for (const reference of references) {
      if (!Object.hasOwn(slots, reference.slotName)) {
        report(`${reference.sourcePath} → ${reference.key}="${reference.slotName}"`, 'This image slot is not listed in content/images.json. Choose a listed slot or add the missing slot.');
      }
    }
    await checkHtmlSlotReferences(slots);
    if (news !== undefined) checkNews(news, slots);
  }
  if (config !== undefined) checkSiteConfig(config);

  for (const warning of warnings) console.warn(warning);
  for (const error of errors) console.error(error);
  if (errors.length) {
    console.error(`\nValidation finished: ${errors.length} error(s), ${warnings.length} warning(s). Fix the errors above, then run this check again.`);
    process.exitCode = 1;
    return;
  }
  console.log(`✔ Content validation passed: no errors found.${warnings.length ? ` ${warnings.length} warning(s) need attention.` : ''}`);
}

await main();
