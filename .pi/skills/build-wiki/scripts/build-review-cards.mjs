#!/usr/bin/env node
// build-review-cards.mjs — 从 raw 章节文件提取「主动回忆问题 / 发散性提问」，生成自测复习卡。
//
// 用法:
//   node build-review-cards.mjs --in <章节目录> --out <输出.md> --title <书名> [--tags "数学,微积分"]
//
// 识别标题中含「主动回忆问题 / 发散性提问 / 发散性问题」且不含「详解 / 联想」的小节，
// 抓取其后的编号/项目列表，按章节汇总。

import fs from 'fs';
import path from 'path';

const args = {};
for (let i = 2; i < process.argv.length; i++) {
  const a = process.argv[i];
  if (a.startsWith('--')) args[a.slice(2)] = process.argv[i + 1] && !process.argv[i + 1].startsWith('--') ? process.argv[++i] : true;
}
const IN = args.in, OUT = args.out, TITLE = args.title || '读书';
if (!IN || !OUT) { console.error('用法: node build-review-cards.mjs --in <目录> --out <文件> --title <书名>'); process.exit(1); }

const MATCH = /主动回忆问题|发散性提问|发散性问题|发散性思考与提问/;
const EXCL = /详解|联想|更深刻/;
const created = args.created || new Date().toISOString().slice(0, 10);
const tags = args.tags || '数学,读书笔记';

const files = fs.readdirSync(IN).filter(f => f.endsWith('.md') && !f.endsWith('-伴读.md')).sort();
let total = 0, body = '';
for (const f of files) {
  const lines = fs.readFileSync(path.join(IN, f), 'utf8').replace(/\r\n/g, '\n').split('\n');
  const groups = [];
  let section = '', cap = null, capType = '', capSection = '';
  const flush = () => { if (cap && cap.items.length) groups.push({ section: capSection, type: capType, items: cap.items }); cap = null; };
  for (const line of lines) {
    const h = line.match(/^(#{1,3})\s+(.*)$/);
    if (h) {
      const txt = h[2].trim().replace(/^\d+\.\s*/, '');
      if (h[1].length === 1) section = txt;
      if (MATCH.test(txt) && !EXCL.test(txt)) {
        flush(); capType = /主动回忆/.test(txt) ? 'recall' : 'dive'; capSection = section || txt; cap = { items: [] };
      } else flush();
      continue;
    }
    if (cap) {
      const item = line.match(/^\s*(?:\d+\.|[-*])\s+(.+?)\s*$/);
      if (item) { cap.items.push(item[1].trim()); total++; }
      else if (line.trim() && cap.items.length && !/^\s{2,}/.test(line)) cap.items[cap.items.length - 1] += ' ' + line.trim();
    }
  }
  flush();
  if (!groups.length) continue;
  const label = f.replace(/\.md$/, '');
  body += `## ${label}\n\n`;
  for (const g of groups) {
    body += `**${g.section}** · ${g.type === 'recall' ? '主动回忆' : '发散提问'}\n\n`;
    g.items.forEach((it, i) => { body += `${i + 1}. ${it}\n`; });
    body += '\n';
  }
}

const fm = `---\ntitle: "${TITLE}复习卡"\ntags: [${tags}, 复习卡]\ncreated: "${created}"\ntype: literature\nsummary: "${TITLE}自测复习卡：自动提取自 raw 各章节的「主动回忆问题」与「发散性提问」。"\n---\n\n# 《${TITLE}》复习卡\n\n> 自动提取自 [[${args.link || TITLE + '-伴读'}]] 各章节的问题清单，供自测与讨论。\n\n`;
fs.writeFileSync(OUT, fm + body, 'utf8');
console.log(`提取问题 ${total} 条 → ${OUT}`);
