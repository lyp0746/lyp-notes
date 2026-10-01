#!/usr/bin/env node
// normalize-raw.mjs — 去掉章节文件里的「对话样板」。
//
// 精读导出中绝大多数轮次是「下一节 / 详解提问」这类无信息量的指令，正文全在回答里。
// 本脚本：删除样板轮的 `## 提问 N` / `## 回答 N` 外壳，只留正文；非样板提问保留为引用块。
// 只动外壳、不动正文，可逆（git）。
//
// 用法: node normalize-raw.mjs --dir <章节目录> [--dry-run]

import fs from 'fs';
import path from 'path';

const args = {};
for (let i = 2; i < process.argv.length; i++) {
  const a = process.argv[i];
  if (a.startsWith('--')) args[a.slice(2)] = process.argv[i + 1] && !process.argv[i + 1].startsWith('--') ? process.argv[++i] : true;
}
const DIR = args.dir;
if (!DIR) { console.error('用法: node normalize-raw.mjs --dir <章节目录> [--dry-run]'); process.exit(1); }
const DRY = !!args['dry-run'];

const BOILER = /^(下一节|详解提问|详解|继续|好的|是|next)\s*[。.!！]*$/;

const files = fs.readdirSync(DIR).filter(f => f.endsWith('.md') && !f.endsWith('-伴读.md')).sort();
let totalBoiler = 0, totalKept = 0;
for (const f of files) {
  const p = path.join(DIR, f);
  let text = fs.readFileSync(p, 'utf8').replace(/\r\n/g, '\n');
  const fmMatch = text.match(/^(---\n[\s\S]*?\n---\n)/);
  const fm = fmMatch ? fmMatch[1] : '';
  const rest = fm ? text.slice(fm.length) : text;
  const blocks = rest.split(/(?=^## 提问 \d+$)/m).filter(b => /^## 提问 \d+$/.test(b.split('\n')[0] || ''));
  const pieces = [];
  let boiler = 0, kept = 0;
  for (const b of blocks) {
    const m = b.match(/^## 提问 (\d+)\n([\s\S]*?)^## 回答 (\d+)\n([\s\S]*)$/m);
    if (!m) continue;
    const q = m[2].trim(), a = m[4].trim();
    if (BOILER.test(q.split('\n')[0].trim())) { pieces.push(a); boiler++; }
    else { pieces.push(`> **提问**：${q.replace(/\n+/g, ' ')}\n\n${a}`); kept++; }
  }
  totalBoiler += boiler; totalKept += kept;
  const out = fm + (fm ? '\n' : '') + pieces.join('\n\n') + '\n';
  if (!DRY) fs.writeFileSync(p, out, 'utf8');
  console.log(`  ${f}: 样板轮 ${boiler} 去除，保留提问 ${kept}`);
}
console.log(`\n${DRY ? '[dry-run] ' : ''}共去除样板轮 ${totalBoiler}，保留有信息提问 ${totalKept}`);
