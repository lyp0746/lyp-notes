#!/usr/bin/env node
// update-map.mjs — 由 map.config.json 自动生成/更新 `数学大地图.canvas` 与 `数学大地图.md` 的自动块。
//
// 用法:
//   node update-map.mjs --vault <vault根> [--config <map.config.json>] [--check]
//
// 数据流: map.config.json（分支/书目/交叉主线的唯一来源）
//        + wiki/知识索引.md（每本书的概念清单）
//        → 数学大地图.canvas（自动布局，确定性 id）
//        → 数学大地图.md 中 <!-- MAP:AUTO:START --> … <!-- MAP:AUTO:END --> 之间
//
// --check 只报告漂移（知识索引有但 config 没有的书、config 指向缺失的文件），不写文件。

import fs from 'fs';
import path from 'path';

const args = {};
for (let i = 2; i < process.argv.length; i++) {
  const a = process.argv[i];
  if (a.startsWith('--')) args[a.slice(2)] = process.argv[i + 1] && !process.argv[i + 1].startsWith('--') ? process.argv[++i] : true;
}
const VAULT = path.resolve(args.vault || process.cwd());
const CONFIG = path.resolve(args.config || path.join(VAULT, '.pi/skills/build-wiki/map.config.json'));
const CHECK = !!args.check;
const cfg = JSON.parse(fs.readFileSync(CONFIG, 'utf8'));

// ---------- 读取知识索引：书名 → 概念清单 ----------
const kiPath = path.join(VAULT, 'wiki/知识索引.md');
const ki = fs.existsSync(kiPath) ? fs.readFileSync(kiPath, 'utf8').replace(/\r\n/g, '\n') : '';
const conceptsOf = bookTitle => {
  const lines = ki.split('\n');
  const esc = bookTitle.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const re = new RegExp(`\\[\\[${esc}\\]\\]`);
  let i = lines.findIndex(l => /^##\s/.test(l) && re.test(l));
  if (i < 0) return [];
  const out = [];
  for (i++; i < lines.length && !/^##\s/.test(lines[i]); i++) {
    for (const m of lines[i].matchAll(/\[\[([^\]]+)\]\]/g)) out.push(m[1].split('|')[0]);
  }
  return out;
};

// ---------- 唯一 id（确定性） ----------
let _n = 0x1000000;
const nid = () => (++_n).toString(16).padStart(16, '0');

// ---------- 画布元素收集 ----------
const nodes = [];
const edges = [];
const add = (o, type) => { const n = { id: nid(), type, ...o }; nodes.push(n); return n; };
const group = (o, x, y, w, h) => add({ x, y, width: w, height: h, ...o }, 'group');
const text = (t, x, y, w, h, color) => add({ x, y, width: w, height: h, ...(color ? { color } : {}), text: t }, 'text');
const file = (f, x, y, w, h) => add({ x, y, width: w, height: h, file: f }, 'file');
const edge = (a, b, opts = {}) => edges.push({ id: nid(), fromNode: a.id, toNode: b.id, toEnd: 'arrow', ...opts });

const COL = { base: 520, gap: 40, noteH: 150, bookH: 120, bookGap: 20, phLineH: 46, pad: 40, perRow: 4 };

// 根与视角说明
const root = text(cfg.root, 380, -170, 420, 150, '6');
const persp = text(cfg.perspectiveNote, -640, -170, 960, 150);

// 分支网格：每行 perRow 个
const branchGroups = [];
const rows = Math.ceil(cfg.branches.length / COL.perRow);
let y = 80;
for (let r = 0; r < rows; r++) {
  const slice = cfg.branches.slice(r * COL.perRow, (r + 1) * COL.perRow);
  const cellW = COL.base;
  const rowW = slice.length * cellW + (slice.length - 1) * COL.gap;
  const x0 = Math.round(-rowW / 2);
  // 行高 = 该行最高 group
  const heights = slice.map(b => {
    const books = (b.books || []).length;
    const ph = (b.placeholders || []).length;
    return COL.pad + COL.noteH + books * (2 * COL.bookH + COL.bookGap) + (ph ? 20 + ph * COL.phLineH : 0) + COL.pad;
  });
  const h = Math.max(...heights);
  slice.forEach((b, i) => {
    const gx = x0 + i * (cellW + COL.gap);
    const g = group({ label: b.label, color: b.color }, gx, y, cellW, h);
    branchGroups.push({ branch: b, group: g, x: gx, y, h, w: cellW });
    let cy = y + COL.pad;
    const books = (b.books || []);
    const tag = b.next ? '（下一个计划）' : '';
    const noteText = `## ${b.label}${tag}\n\n${books.map(x => `**${x.title}** ★`).join(' · ') || '（本库暂无收录）'}`;
    text(noteText, gx + 20, cy, cellW - 40, COL.noteH); cy += COL.noteH;
    for (const x of books) {
      const f1 = file(x['导读'], gx + 20, cy, cellW - 40, COL.bookH); cy += COL.bookH + COL.bookGap;
      const f2 = file(x['伴读'], gx + 20, cy, cellW - 40, COL.bookH); cy += COL.bookH;
      x._f = { 导读: f1, 伴读: f2 };
    }
    if ((b.placeholders || []).length) {
      text((b.placeholders || []).join('\n'), gx + 20, cy + 10, cellW - 40, (b.placeholders).length * COL.phLineH);
    }
  });
  y += h + 60;
}

// 交叉主线
const cl = cfg.crosslines;
const clNote = text(cl.note, -Math.round((cl.files.length * 370 + (cl.files.length - 1) * 40) / 2), y + 20, 900, 70);
const clGroupW = Math.max(900, cl.files.length * 370 + (cl.files.length - 1) * 40);
const clGroupX = -Math.round(clGroupW / 2);
let clH = COL.pad + 80 + Math.ceil(cl.files.length / 4) * (COL.bookH + 30);
const clGroup = group({ label: cl.label, color: cl.color }, clGroupX, y, clGroupW, clH);
// 重新放 note 进组
clNote.x = clGroupX + 20; clNote.y = y + COL.pad;
const bridgeFiles = [];
cl.files.forEach((f, i) => {
  const col = i % 4, row = Math.floor(i / 4);
  bridgeFiles.push(file(f, clGroupX + 20 + col * 370, y + COL.pad + 80 + row * (COL.bookH + 30), 350, COL.bookH));
});
y += clH + 60;

// 方法论 + 内部统一注释
const method = text(cfg.methodology, 120, y, 1040, 440, '4');
const extra = text(cl.note2, -Math.round(clGroupW / 2) + 20, y + 60, clGroupW - 40, 140);

// 边
for (const bg of branchGroups) edge(root, bg.group);
edge(root, clGroup, { color: '4' });
edge(root, method, { color: '4' });
// 书与书之间的“基底/升级”关系
for (const link of (cfg.links || [])) {
  const from = cfg.branches.flatMap(b => b.books || []).find(x => x.key === link.from);
  const to = cfg.branches.flatMap(b => b.books || []).find(x => x.key === link.to);
  if (from && to) edge(from._f['伴读'], to._f['伴读'], { label: link.label, color: '4' });
}
// 桥接页与相关书相连
for (const bl of (cfg.bridgeLinks || [])) {
  const book = cfg.branches.flatMap(b => b.books || []).find(x => x.key === bl.book);
  const bf = bridgeFiles[bl.bridge];
  if (book && bf) edge(book._f['伴读'], bf, { color: '4' });
}

// ---------- 校验 + 写文件 ----------
const ids = new Set(); let dup = 0, badRef = 0, badFile = 0;
for (const n of nodes) { if (ids.has(n.id)) dup++; ids.add(n.id); }
for (const e of edges) if (!ids.has(e.fromNode) || !ids.has(e.toNode)) badRef++;
for (const n of nodes) if (n.type === 'file' && !fs.existsSync(path.join(VAULT, n.file))) { badFile++; console.log('  ✗ 文件节点缺失:', n.file); }

// 漂移检查：知识索引里出现、但 config 未登记的书
const configBooks = cfg.branches.flatMap(b => b.books || []).map(x => x.title);
const kiBooks = [...ki.matchAll(/^##\s.*\[\[([^\]]+)\]\]/gm)].map(m => m[1].split('|')[0])
  .filter(t => !/索引|总索引/.test(t));
const notInConfig = kiBooks.filter(t => !configBooks.includes(t));

if (CHECK) {
  console.log(`canvas: nodes=${nodes.length} edges=${edges.length} dup=${dup} 悬空=${badRef} 缺失文件=${badFile}`);
  if (notInConfig.length) console.log('  知识索引有、config 未登记:', notInConfig.join(', '));
  process.exit(dup || badRef || badFile || notInConfig.length ? 1 : 0);
}

fs.writeFileSync(path.join(VAULT, '数学大地图.canvas'), JSON.stringify({ nodes, edges }, null, 2) + '\n', 'utf8');

// ---------- 生成 数学大地图.md 自动块（Mermaid + 分支详图） ----------
const mm = ['```mermaid', 'graph TD'];
mm.push('  M[数学]');
for (const bg of branchGroups) {
  const b = bg.branch;
  mm.push(`  M --> ${b.id}[${b.label}]`);
  for (const x of (b.books || [])) mm.push(`  ${b.id} --> ${x.key}[${x.title} ★]`);
}
const bk = cfg.branches.flatMap(b => b.books || []);
mm.push('```');
let detail = mm.join('\n') + '\n\n';
for (const b of cfg.branches) {
  const tag = b.next ? ' ◆（下一个计划）' : (b.books || []).length ? '' : ' ◻';
  detail += `### ${b.label}${tag}\n`;
  for (const x of (b.books || [])) {
    const cs = conceptsOf(x.title);
    detail += `- **${x.title} ★** — [[${x.title}]]（[[${path.basename(x['导读'], '.md')}|导读]]）\n  ${cs.map(c => `[[${c}]]`).join(' · ')}\n`;
  }
  for (const ph of (b.placeholders || [])) detail += `- ${ph}\n`;
  detail += '\n';
}
const mapPath = path.join(VAULT, '数学大地图.md');
if (fs.existsSync(mapPath)) {
  let t = fs.readFileSync(mapPath, 'utf8');
  const re = /<!-- MAP:AUTO:START -->[\s\S]*?<!-- MAP:AUTO:END -->/;
  const block = `<!-- MAP:AUTO:START -->\n${detail.trim()}\n<!-- MAP:AUTO:END -->`;
  if (re.test(t)) { t = t.replace(re, block); fs.writeFileSync(mapPath, t, 'utf8'); }
  else console.log('  ! 数学大地图.md 未找到 MAP:AUTO 标记，跳过自动块');
}
console.log(`已更新 数学大地图.canvas（${nodes.length} 节点 / ${edges.length} 边）与 数学大地图.md 自动块`);
if (notInConfig.length) console.log('  ⚠ 知识索引有、config 未登记:', notInConfig.join(', '));
