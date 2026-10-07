#!/usr/bin/env node
// relink-raw.mjs — 单体 raw 按章拆分后，把 wiki/output 中指向旧单体的「标题锚点链接」
// 改指向新的章节文件。只改文件名部分，锚点文本保持不变。
//
// 用法: node relink-raw.mjs --root <vault根> [--book thomas|axler|milnor] [--dry-run]
//
// 与 split-raw.mjs 的 PRESETS 保持一致。

import fs from 'fs';
import path from 'path';

const args = {};
for (let i = 2; i < process.argv.length; i++) {
  const a = process.argv[i];
  if (a.startsWith('--')) args[a.slice(2)] = process.argv[i + 1] && !process.argv[i + 1].startsWith('--') ? process.argv[++i] : true;
}
const ROOT = path.resolve(args.root || process.cwd());
const DRY = !!args['dry-run'];

const pad = n => String(n).padStart(2, '0');

const BOOKS = {
  thomas: {
    old: '托马斯微积分-伴读', prefix: '托马斯微积分',
    names: { 1: '函数', 2: '极限与连续性', 3: '微分法', 4: '导数的应用', 5: '积分法', 6: '定积分的应用', 7: '积分方法', 8: '无穷序列与无穷级数', 9: '极坐标与圆锥曲线', 10: '向量与空间几何学', 11: '空间中的向量值函数和物体的运动', 12: '偏导数', 13: '多重积分', 14: '向量场中的积分' },
    appNames: { A: '实数与实线', B: '基本公式与积分简表' },
    resolve(anchor) {
      let m = anchor.match(/^第\s*(\d+)\s*章/);
      if (m) return `${'托马斯微积分'}-第${pad(m[1])}章-${this.names[+m[1]]}`;
      m = anchor.match(/^附录\s*([A-Z])/);
      if (m) return `托马斯微积分-附录${m[1]}-${this.appNames[m[1]]}`;
      return null;
    },
  },
  axler: {
    old: '线性代数应该这样学-伴读', prefix: '线性代数应该这样学',
    names: { 1: '向量空间', 2: '有限维向量空间', 3: '线性映射', 4: '多项式', 5: '本征值与本征向量', 6: '内积空间', 7: '内积空间上的算子', 8: '复向量空间上的算子', 9: '实向量空间上的算子', 10: '迹与行列式' },
    resolve(anchor) {
      let m = anchor.match(/第\s*(\d+)\s*章/);
      if (m) return `线性代数应该这样学-第${pad(m[1])}章-${this.names[+m[1]]}`;
      m = anchor.match(/(\d+)\.[A-F]/);
      if (m) return `线性代数应该这样学-第${pad(m[1])}章-${this.names[+m[1]]}`;
      // 第 1 章的子标题（无编号前缀）
      if (/复数：从实数到复数|向量空间的公理化定义|组（List）与|直和（Direct Sum）|关于域的题外话/.test(anchor)) {
        return `线性代数应该这样学-第01章-${this.names[1]}`;
      }
      return null;
    },
  },
  milnor: {
    old: '从微分观点看拓扑-伴读', prefix: '从微分观点看拓扑',
    names: { 1: '光滑流形和光滑映射', 2: 'Sard定理和Brown定理', 3: 'Sard定理的证明', 4: '映射的模2度', 5: '定向流形', 6: '向量场与Euler数', 7: '标架式协边和Pontryagin构造', 8: '练习' },
    resolve(anchor) {
      let m = anchor.match(/第\s*(\d+)\s*章/);
      if (m) return `从微分观点看拓扑-第${pad(m[1])}章-${this.names[+m[1]]}`;
      if (/附录/.test(anchor)) return `从微分观点看拓扑-附录-1维流形的分类`;
      return null;
    },
  },
  takagi: {
    old: '数学分析概论-伴读', prefix: '数学分析概论',
    names: { 1: '基本概念', 2: '微分', 3: '积分', 4: '无穷级数与一致收敛', 5: '解析函数及初等函数', 6: '傅里叶展开', 7: '微分续篇（隐函数）', 8: '多变量积分', 9: '勒贝格积分' },
    appNames: { I: '无理数论', II: '若干特殊曲线' },
    resolve(anchor) {
      let m = anchor.match(/^第\s*(\d+)\s*章/);
      if (m) return `数学分析概论-第${pad(m[1])}章-${this.names[+m[1]]}`;
      m = anchor.match(/^附录\s*(I{1,2})\b/);
      if (m) return `数学分析概论-附录${m[1]}-${this.appNames[m[1]]}`;
      return null;
    },
  },
};

const active = args.book ? [args.book] : Object.keys(BOOKS);
const books = active.map(k => BOOKS[k]).filter(Boolean);

const SKIP = new Set(['.git', '.obsidian', '.pi', 'node_modules', '.trash']);
const walk = (dir, out = []) => {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.isDirectory()) { if (!SKIP.has(e.name)) walk(path.join(dir, e.name), out); }
    else if (e.name.toLowerCase().endsWith('.md')) out.push(path.join(dir, e.name));
  }
  return out;
};

let changed = 0, lines = 0;
for (const file of walk(ROOT)) {
  const rel = path.relative(ROOT, file);
  let txt = fs.readFileSync(file, 'utf8');
  const orig = txt;
  for (const b of books) {
    const re = new RegExp(`\\[\\[${b.old}#([^\\]]+)\\]\\]`, 'g');
    txt = txt.replace(re, (full, anchor) => {
      const target = b.resolve(anchor);
      if (!target) { console.log(`  ? 无法解析: ${rel} -> ${full}`); return full; }
      lines++;
      return `[[${target}#${anchor}]]`;
    });
  }
  if (txt !== orig) { changed++; if (!DRY) fs.writeFileSync(file, txt, 'utf8'); console.log(`  ✓ ${rel}`); }
}
console.log(`\n${DRY ? '[dry-run] ' : ''}改了 ${lines} 条锚点，涉及 ${changed} 个文件`);
