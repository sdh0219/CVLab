#!/usr/bin/env node
/**
 * 链接校验（对构建产物 dist/ 运行）：
 *   1. 站内链接（href/src 指向站内路径）必须在 dist/ 中存在对应文件
 *   2. 外链 http(s) 不做存活检测，但 gitee.com 链接必须是仓库格式 https://gitee.com/<owner>/<repo>
 * dist/ 不存在时跳过（提示先 npm run build）。
 */
import { readdirSync, statSync, readFileSync, existsSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const dist = resolve(join(dirname(fileURLToPath(import.meta.url)), '..', 'dist'));

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, out);
    else out.push(p);
  }
  return out;
}

if (!existsSync(dist)) {
  console.log('[check-links] dist/ 不存在，跳过链接检查（先运行 npm run build）。');
  process.exit(0);
}

const htmlFiles = walk(dist).filter((f) => f.endsWith('.html'));
const errors = [];
const attrRe = /(?:href|src)="([^"]+)"/g;

function targetExists(url) {
  let path = url.split('#')[0].split('?')[0];
  if (path === '' || path === '/') return true;
  path = decodeURIComponent(path);
  if (existsSync(join(dist, path))) return true;
  if (existsSync(join(dist, path, 'index.html'))) return true;
  if (existsSync(join(dist, path + '.html'))) return true;
  return false;
}

for (const file of htmlFiles) {
  const html = readFileSync(file, 'utf-8');
  for (const [, url] of html.matchAll(attrRe)) {
    if (/^(https?:)?\/\//.test(url)) {
      const gitee = url.match(/^https?:\/\/gitee\.com\/[^/]+\/[^/?#]+/);
      if (url.includes('gitee.com') && !gitee) {
        errors.push(`${file.replace(dist, '')}: Gitee 链接格式可疑 ${url}`);
      }
      continue;
    }
    if (/^(mailto:|tel:|data:|#|javascript:)/.test(url)) continue;
    if (url.startsWith('/') && !targetExists(url)) {
      errors.push(`${file.replace(dist, '')}: 站内链接不存在 ${url}`);
    }
  }
}

if (errors.length) {
  for (const e of errors) console.error(`[check-links] 错误: ${e}`);
  console.error(`[check-links] 共 ${errors.length} 个死链，请修复。`);
  process.exit(1);
}
console.log(`[check-links] 通过：${htmlFiles.length} 个页面的链接全部有效。`);
