import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const root = process.cwd();
const baseRoot = path.join(root, 'docs');
const zhRoot = path.join(root, 'i18n', 'zh-CN', 'docusaurus-plugin-content-docs', 'current');
const supportedExtensions = new Set(['.md', '.mdx']);
function collectDocs(directory, relativeTo = directory) {
  if (!fs.existsSync(directory)) return [];
  const results = [];
  for (const entry of fs.readdirSync(directory, {withFileTypes: true})) {
    const absolutePath = path.join(directory, entry.name);
    if (entry.isDirectory()) results.push(...collectDocs(absolutePath, relativeTo));
    else if (supportedExtensions.has(path.extname(entry.name))) results.push(path.relative(relativeTo, absolutePath).replaceAll('\\', '/'));
  }
  return results.sort();
}
const baseDocs = collectDocs(baseRoot); const zhDocs = collectDocs(zhRoot);
const zhSet = new Set(zhDocs); const baseSet = new Set(baseDocs);
const missingChinese = baseDocs.filter((file) => !zhSet.has(file)); const orphanChinese = zhDocs.filter((file) => !baseSet.has(file));
if (missingChinese.length === 0 && orphanChinese.length === 0) { console.log(`i18n parity check passed: ${baseDocs.length} document pairs.`); process.exit(0); }
if (missingChinese.length) { console.error('\nMissing Simplified Chinese documents:'); missingChinese.forEach((file) => console.error(`  - ${file}`)); }
if (orphanChinese.length) { console.error('\nChinese documents without an English base document:'); orphanChinese.forEach((file) => console.error(`  - ${file}`)); }
process.exit(1);
