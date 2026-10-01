#!/usr/bin/env node
// validate.mjs — 校验 vault 的 wikilink（含标题锚点）与 wiki 页 frontmatter。
//
// 用法: node validate.mjs [vault根目录] [--ignore <正则>]
//   默认根目录为当前工作目录；含语法示例的文件（如 AGENTS.md）可加入 --ignore。
//
// 退出码: 0 全部通过；1 存在失效链接/锚点或 frontmatter 缺失。

import fs from 'fs';
import path from 'path';

const argv = process.argv.slice(2);
let ROOT_ARG = '', ignore = null;
for (let i = 0; i < argv.length; i++) {
  const a = argv[i];
  if (a === '--ignore') { ignore = argv[i + 1] ? new RegExp(argv[++i]) : null; continue; }
  if (a.startsWith('--')) continue;
  if (!ROOT_ARG) ROOT_ARG = a;
}
const ROOT = path.resolve(ROOT_ARG || process.cwd());

const SKIP = new Set(['.git', '.obsidian', '.pi', '.trash', 'node_modules']);
const walk = (dir, out = [], all = false) => {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.isDirectory()) { if (!SKIP.has(e.name)) walk(path.join(dir, e.name), out, all); }
    else if (all || e.name.toLowerCase().endsWith('.md')) out.push(path.join(dir, e.name));
  }
  return out;
};

const files = walk(ROOT);
const rel = f => path.relative(ROOT, f);
// 名称索引：.md 用无后缀名，非 md（.canvas/.png 等）用完整文件名（Obsidian 链接带扩展名）
const byName = new Map();
for (const f of walk(ROOT, [], true)) {
  const base = path.basename(f);
  byName.set(base, f);
  if (base.toLowerCase().endsWith('.md')) byName.set(base.slice(0, -3), f);
}

// 每个文件的标题集合（去重，含 Obsidian 的重复标题 -1/-2 后缀形式）
const headingsCache = new Map();
const headingsOf = f => {
  if (headingsCache.has(f)) return headingsCache.get(f);
  const txt = fs.readFileSync(f, 'utf8');
  const set = new Set();
  for (const line of txt.split('\n')) {
    const m = line.match(/^#{1,6}\s+(.*?)\s*#*\s*$/);
    if (m) set.add(m[1]);
  }
  // 追加重复标题的 -1/-2… 形式
  const seen = new Map();
  for (const h of [...set]) {
    const c = (seen.get(h) || 0) + 1; seen.set(h, c);
    if (c > 1) set.add(`${h}-${c - 1}`);
  }
  headingsCache.set(f, set);
  return set;
};

const unresolved = [], badAnchors = [];
let links = 0, anchors = 0;
for (const f of files) {
  if (ignore && ignore.test(rel(f))) continue;
  const txt = fs.readFileSync(f, 'utf8');
  for (const m of txt.matchAll(/\[\[([^\]]+)\]\]/g)) {
    links++;
    const raw = m[1];
    const targetPart = raw.split('|')[0];
    const [filePart, ...anchorParts] = targetPart.split('#');
    const target = filePart.trim();
    const anchor = anchorParts.join('#').trim();

    let targetFile = null;
    if (target === '') targetFile = f;                 // 同文件锚点 [[#标题]]
    else if (byName.has(target)) targetFile = byName.get(target);
    else { unresolved.push(`${rel(f)} -> [[${raw}]]`); continue; }

    if (anchor && !anchor.startsWith('^')) {           // 跳过块引用 ^id
      anchors++;
      const set = headingsOf(targetFile);
      const norm = a => a.replace(/\s+/g, ' ').trim();
      const ok = set.has(anchor) || [...set].some(h => norm(h) === norm(anchor));
      if (!ok) badAnchors.push(`${rel(f)} -> [[${raw}]]`);
    }
  }
}

const fmMissing = [];
for (const d of ['wiki/概念', 'wiki/实体', 'wiki/主题']) {
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

console.log(`扫描 ${files.length} 个 md，${links} 条 wikilink（其中 ${anchors} 条带标题锚点）`);
console.log(`失效目标文件: ${unresolved.length}`); unresolved.forEach(u => console.log('  ✗', u));
console.log(`失效标题锚点: ${badAnchors.length}`); badAnchors.forEach(u => console.log('  ✗', u));
console.log(`wiki 页 frontmatter 问题: ${fmMissing.length}`); fmMissing.forEach(u => console.log('  ✗', u));

process.exit(unresolved.length || badAnchors.length || fmMissing.length ? 1 : 0);
