#!/usr/bin/env node
// validate.mjs — 校验 vault 的 wikilink 可解析性与 wiki 页 frontmatter。
//
// 用法: node validate.mjs [vault根目录] [--ignore <正则>]
//   默认根目录为当前工作目录；'*语法示例*.md' 等可加入 --ignore。
//
// 退出码: 0 全部通过；1 存在失效链接或 frontmatter 缺失。

import fs from 'fs';
import path from 'path';

const args = process.argv.slice(2);
const ROOT = path.resolve(args.find(a => !a.startsWith('--')) || process.cwd());
const ignoreIdx = args.indexOf('--ignore');
const ignore = ignoreIdx >= 0 && args[ignoreIdx + 1] ? new RegExp(args[ignoreIdx + 1]) : null;

const SKIP = new Set(['.git', '.obsidian', '.pi', '.tmp_thomas', 'node_modules', '.trash']);
const walk = (dir, out = []) => {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.isDirectory()) { if (!SKIP.has(e.name)) walk(path.join(dir, e.name), out); }
    else if (e.name.toLowerCase().endsWith('.md')) out.push(path.join(dir, e.name));
  }
  return out;
};

const files = walk(ROOT);
const basenames = new Set(files.map(f => path.basename(f, '.md')));
const rel = f => path.relative(ROOT, f);

const unresolved = [];
let links = 0;
for (const f of files) {
  if (ignore && ignore.test(rel(f))) continue;
  const txt = fs.readFileSync(f, 'utf8');
  for (const m of txt.matchAll(/\[\[([^\]]+)\]\]/g)) {
    links++;
    const target = m[1].split('|')[0].split('#')[0].trim();
    if (!basenames.has(target)) unresolved.push(`${rel(f)} -> [[${m[1]}]]`);
  }
}

const fmMissing = [];
const wikiDirs = ['wiki/概念', 'wiki/实体', 'wiki/主题'];
for (const d of wikiDirs) {
  const abs = path.join(ROOT, d);
  if (!fs.existsSync(abs)) continue;
  for (const name of fs.readdirSync(abs)) {
    if (!name.endsWith('.md') || name.includes('索引')) continue;
    const txt = fs.readFileSync(path.join(abs, name), 'utf8');
    const fm = txt.match(/^---\n([\s\S]*?)\n---/);
    const has = k => fm && new RegExp(`^${k}:`, 'm').test(fm[1]);
    const missing = ['title', 'tags', 'created', 'type', 'summary'].filter(k => !has(k));
    const noSource = !/## (参考源|相关)/.test(txt);
    if (missing.length || noSource) fmMissing.push(`${d}/${name}${missing.length ? ` (缺 ${missing.join(',')})` : ''}${noSource ? ' (无 参考源/相关)' : ''}`);
  }
}

console.log(`扫描 ${files.length} 个 md，${links} 条 wikilink`);
console.log(`失效链接: ${unresolved.length}`);
unresolved.forEach(u => console.log('  ✗', u));
console.log(`wiki 页 frontmatter 问题: ${fmMissing.length}`);
fmMissing.forEach(u => console.log('  ✗', u));

process.exit(unresolved.length || fmMissing.length ? 1 : 0);
