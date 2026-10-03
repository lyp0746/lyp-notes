#!/usr/bin/env node
// build-figures.mjs — 由 map.config.json / 知识索引 / 主题页自动生成书籍插图（Graphviz → PNG）。
//
// 用法: node build-figures.mjs --vault . [--outdir book/figures]
//
// 产物（随书目/概念自动更新）:
//   fig-network.png      概念网络（主题页共现）—— 封面/网络图
//   fig-branches.png     分支 → 书目 树（含概念数）
//   fig-bridges.png      书 ↔ 交叉主线 二部图
//   fig-perspectives.png 五种视角星图
//
// 依赖: Graphviz `dot`（Windows 下 D:/Graphviz/bin/dot.exe）。

import fs from 'fs';
import path from 'path';
import { execFileSync } from 'child_process';

const args = {};
for (let i = 2; i < process.argv.length; i++) {
  const a = process.argv[i];
  if (a.startsWith('--')) args[a.slice(2)] = process.argv[i + 1] && !process.argv[i + 1].startsWith('--') ? process.argv[++i] : true;
}
const VAULT = path.resolve(args.vault || process.cwd());
const OUT = path.resolve(VAULT, args.outdir || 'book/figures');
fs.mkdirSync(OUT, { recursive: true });

const read = p => fs.readFileSync(path.join(VAULT, p), 'utf8').replace(/\r\n/g, '\n');
const exists = p => fs.existsSync(path.join(VAULT, p));
const cfg = JSON.parse(read('.pi/skills/build-wiki/map.config.json'));
const ki = exists('wiki/知识索引.md') ? read('wiki/知识索引.md') : '';

const CJK = process.env.GV_FONT || 'Microsoft YaHei';
const COL = { base: '#5B7DB1', alg: '#D79B00', ana: '#6FA84A', geo: '#9673A6', elem: '#B5739D', prob: '#C9A227', disc: '#B85450', num: '#5B8FF9', app: '#E8A33D' };
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '\\"');

const conceptsOf = title => {
  const lines = ki.split('\n');
  const re = new RegExp(`\\[\\[${title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\]\\]`);
  let i = lines.findIndex(l => /^##\s/.test(l) && re.test(l));
  if (i < 0) return [];
  const out = [];
  for (i++; i < lines.length && !/^##\s/.test(lines[i]); i++)
    for (const m of lines[i].matchAll(/\[\[([^\]]+)\]\]/g)) out.push(m[1].split('|')[0]);
  return out;
};

const books = cfg.branches.flatMap(b => (b.books || []).map(x => ({ ...x, branchId: b.id, branch: b.label })));
const conceptBranch = {};
for (const b of books) for (const c of conceptsOf(b.title)) if (!(c in conceptBranch)) conceptBranch[c] = b.branchId;

function run(name, src, engineArgs = []) {
  const dotFile = path.join(OUT, name + '.dot');
  fs.writeFileSync(dotFile, src, 'utf8');
  const cands = [process.env.DOT, 'dot', 'D:/Graphviz/bin/dot.exe'].filter(Boolean);
  let dot = null;
  for (const c of cands) { try { execFileSync(c, ['-V'], { stdio: 'ignore' }); dot = c; break; } catch {} }
  if (!dot) { console.warn('[警告] 未找到 Graphviz dot，跳过', name); return; }
  execFileSync(dot, [...engineArgs, '-Tpng', path.basename(dotFile), '-o', name + '.png'], { cwd: OUT, stdio: 'inherit' });
  console.log('  图 →', path.relative(VAULT, path.join(OUT, name + '.png')));
}

// ---------- 1. 概念网络（主题页共现） ----------
{
  const themeDir = path.join(VAULT, 'wiki/主题');
  const edges = new Map();
  if (fs.existsSync(themeDir)) {
    for (const f of fs.readdirSync(themeDir)) {
      if (!f.endsWith('.md') || f.includes('索引') || f.includes('符号表') || f.includes('方法')) continue;
      const links = [...read(path.join('wiki/主题', f)).matchAll(/\[\[([^\]|#]+)/g)].map(m => m[1].trim()).filter(c => c in conceptBranch);
      for (let i = 0; i < links.length; i++) for (let j = i + 1; j < links.length; j++) {
        const k = [links[i], links[j]].sort().join('||');
        edges.set(k, (edges.get(k) || 0) + 1);
      }
    }
  }
  let s = 'graph G {\n  graph [bgcolor="white", overlap=prism, splines=true, outputorder=edgesfirst, size="9,9", dpi=220];\n';
  s += `  node [shape=circle, style=filled, penwidth=0, label="", width=0.09, fixedsize=true];\n`;
  s += '  edge [color="#9AAFC455", penwidth=0.4];\n';
  for (const [c, br] of Object.entries(conceptBranch)) s += `  "${esc(c)}" [fillcolor="${COL[br] || '#999999'}"];\n`;
  for (const k of edges.keys()) { const [a, b] = k.split('||'); s += `  "${esc(a)}" -- "${esc(b)}";\n`; }
  s += '}\n';
  run('fig-network', s, ['-Ksfdp']);
}

// ---------- 2. 分支 → 书目 树 ----------
{
  let s = 'digraph G {\n  graph [bgcolor="white", rankdir=LR, nodesep=0.22, ranksep=0.9];\n';
  s += `  node [shape=box, style="rounded,filled", penwidth=0, fontname="${CJK}", fontsize=13];\n  edge [color="#C9C9C9", arrowhead=none, penwidth=1.2];\n`;
  s += `  MATH [label="数学", shape=ellipse, fillcolor="#1B1B1B", fontcolor="white", fontsize=18, width=1.1];\n`;
  for (const b of cfg.branches) {
    const n = (b.books || []).length, m = (b.books || []).reduce((s2, x) => s2 + conceptsOf(x.title).length, 0);
    s += `  b_${b.id} [label="${esc(b.label)}  ${n} 本·${m} 概念", fillcolor="${COL[b.id] || '#DDDDDD'}", fontcolor="#1B1B1B", width=3.2];\n  MATH -> b_${b.id};\n`;
  }
  for (const b of books) s += `  bk_${b.key} [label="${esc(b.title)}", fillcolor="#EAF0F6", fontcolor="#20303F"];\n  b_${b.branchId} -> bk_${b.key};\n`;
  s += '}\n';
  run('fig-branches', s);
}

// ---------- 3. 书 ↔ 交叉主线 二部图 ----------
{
  const bridges = (cfg.crosslines.files || []).map(f => path.basename(f, '.md'));
  let s = 'digraph G {\n  graph [bgcolor="white", rankdir=LR, nodesep=0.2, ranksep=1.2];\n';
  s += `  node [shape=box, style="rounded,filled", penwidth=0, fontname="${CJK}", fontsize=12];\n  edge [color="#A9C0D6", penwidth=1.1];\n`;
  const used = new Set();
  for (const bl of cfg.bridgeLinks || []) used.add(`${bl.book}||${bl.bridge}`);
  for (const b of books) s += `  B_${b.key} [label="${esc(b.title)}", fillcolor="${COL[b.branchId] || '#DDD'}", fontcolor="#1B1B1B"];\n`;
  bridges.forEach((t, i) => { s += `  T_${i} [label="${esc(t)}", fillcolor="#F2F2F2", fontcolor="#20303F"];\n`; });
  for (const bl of cfg.bridgeLinks || []) if (B(bl.book)) s += `  B_${bl.book} -> T_${bl.bridge};\n`;
  function B(k) { return books.some(b => b.key === k); }
  s += '}\n';
  run('fig-bridges', s);
}

// ---------- 4. 五种视角星图 ----------
{
  const views = [
    ['分支', '有哪些领域？'], ['历史', '怎么长出来的？'], ['方法母题', '什么处处复用？'],
    ['抽象层次', '同一件事的不同高度'], ['应用', '谁在用它？'],
  ];
  let s = 'graph G {\n  graph [bgcolor="white", overlap=false, splines=true];\n';
  s += `  node [shape=box, style="rounded,filled", penwidth=0, fontname="${CJK}", fontsize=13];\n  edge [color="#C9C9C9", penwidth=1.6];\n`;
  s += `  C [label="数学", shape=ellipse, fillcolor="#1B1B1B", fontcolor="white", fontsize=20, width=1.3];\n`;
  const cs = ['#5B8FF9', '#6FA84A', '#C9A227', '#9673A6', '#E8A33D'];
  views.forEach((v, i) => { s += `  v${i} [label="${esc(v[0])}\\n${esc(v[1])}", fillcolor="${cs[i]}22", color="${cs[i]}", penwidth=1.4, fontcolor="#20303F"];\n  C -- v${i};\n`; });
  s += '}\n';
  run('fig-perspectives', s);
}
