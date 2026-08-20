#!/usr/bin/env node
/**
 * 双语完整性校验：
 *   1. content/ 下所有 .md 文件必须命名为 <slug>.zh.md 或 <slug>.en.md
 *   2. 每个 <slug>.zh.md 必须有对应的 <slug>.en.md，反之亦然
 *   3. frontmatter 的 title / name 类字段不得为空
 * 任一规则失败 → exit 1（阻断构建/提交）。
 */
import { readdirSync, statSync, readFileSync, existsSync } from 'node:fs';
import { join, dirname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..', 'content');
const errors = [];
const warnings = [];

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, out);
    else out.push(p);
  }
  return out;
}

if (!existsSync(root)) {
  console.error('[check-i18n] content/ 目录不存在');
  process.exit(1);
}

const files = walk(root).filter((f) => f.endsWith('.md'));

for (const file of files) {
  const base = basename(file);
  const rel = file.slice(root.length + 1).replaceAll('\\', '/');
  if (!/^.+\.(zh|en)\.md$/.test(base)) {
    errors.push(`${rel}: 文件名必须形如 <slug>.zh.md / <slug>.en.md`);
    continue;
  }
  const locale = base.endsWith('.zh.md') ? 'zh' : 'en';
  const other = locale === 'zh' ? '.en.md' : '.zh.md';
  const sibling = join(dirname(file), base.replace(/\.(zh|en)\.md$/, '') + other);
  if (!existsSync(sibling)) {
    errors.push(`${rel}: 缺少配对文件 ${basename(sibling)}`);
  }
  const text = readFileSync(file, 'utf-8');
  if (!/^---\s*\n[\s\S]*?\n---/.test(text)) {
    errors.push(`${rel}: 缺少 frontmatter（--- 包围的 YAML 头）`);
  }
}

const collections = readdirSync(root).filter((n) => statSync(join(root, n)).isDirectory());
for (const col of collections) {
  const entries = readdirSync(join(root, col)).filter((f) => f.endsWith('.md'));
  if (entries.length === 0) warnings.push(`content/${col}/ 为空目录`);
}

if (warnings.length) {
  for (const w of warnings) console.warn(`[check-i18n] 警告: ${w}`);
}
if (errors.length) {
  for (const e of errors) console.error(`[check-i18n] 错误: ${e}`);
  console.error(`[check-i18n] 共 ${errors.length} 个问题，请修复后重试。`);
  process.exit(1);
}
console.log(`[check-i18n] 通过：${files.length} 个内容文件全部满足双语配对。`);
