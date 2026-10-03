#!/usr/bin/env node
// split-raw.mjs — 把「书名-伴读.md」单体 raw 按章拆分为多个文件，并生成目录（TOC）。
//
// 用法:
//   node split-raw.mjs --in <单体.md> --outdir <目录> --book <preset> [--prefix <文件名前缀>] [--dry-run]
//
// preset 内置三本已知书；新书可用 --pattern/--names 自定义，或在本文件 PRESETS 里加一条。
// 输出:<outdir>/<prefix>-第NN章-<内容>.md，以及（可选）--toc <文件> 生成目录页。
//
// 设计要点:
//   - 轮次以 `## 提问 N` / `## 回答 N` 切分，整块原样搬运，不重排、不改正文。
//   - 每轮的所属章由「章标记正则」在回答文本中匹配；匹配不到则继承上一轮（处理同章追问）。
//   - raw 是 source of truth，拆分只是重新分区。

import fs from 'fs';
import path from 'path';

const args = {};
for (let i = 2; i < process.argv.length; i++) {
  const a = process.argv[i];
  if (a.startsWith('--')) args[a.slice(2)] = process.argv[i + 1] && !process.argv[i + 1].startsWith('--') ? process.argv[++i] : true;
}

const PRESETS = {
  thomas: {
    prefix: '托马斯微积分',
    defaultChapter: null,
    detect: [
      { re: /^#\s*第\s*(\d+)\s*章/m, key: m => `第${+m[1]}章` },
      { re: /^#\s*附录\s*([A-Z])/m, key: m => `附录${m[1]}` },
    ],
    names: {
      '第1章': '函数', '第2章': '极限与连续性', '第3章': '微分法', '第4章': '导数的应用',
      '第5章': '积分法', '第6章': '定积分的应用', '第7章': '积分方法', '第8章': '无穷序列与无穷级数',
      '第9章': '极坐标与圆锥曲线', '第10章': '向量与空间几何学', '第11章': '空间中的向量值函数和物体的运动',
      '第12章': '偏导数', '第13章': '多重积分', '第14章': '向量场中的积分',
      '附录A': '实数与实线', '附录B': '基本公式与积分简表',
    },
  },
  axler: {
    prefix: '线性代数应该这样学',
    defaultChapter: '第1章',
    detect: [
      { re: /^#\s*第\s*(\d+)\s*章/m, key: m => `第${+m[1]}章` },
      { re: /^##\s*📘\s*(\d+)\.[A-F]/m, key: m => `第${+m[1]}章` },
      { re: /^##\s*📘\s*第\s*(\d+)\s*章/m, key: m => `第${+m[1]}章` },
    ],
    names: {
      '第1章': '向量空间', '第2章': '有限维向量空间', '第3章': '线性映射', '第4章': '多项式',
      '第5章': '本征值与本征向量', '第6章': '内积空间', '第7章': '内积空间上的算子',
      '第8章': '复向量空间上的算子', '第9章': '实向量空间上的算子', '第10章': '迹与行列式',
    },
  },
  milnor: {
    prefix: '从微分观点看拓扑',
    defaultChapter: null,
    detect: [
      { re: /^##\s*📘\s*第\s*(\d+)\s*章/m, key: m => `第${+m[1]}章` },
      { re: /^##\s*📘\s*附录/m, key: () => '附录' },
    ],
    names: {
      '第1章': '光滑流形和光滑映射', '第2章': 'Sard定理和Brown定理', '第3章': 'Sard定理的证明',
      '第4章': '映射的模2度', '第5章': '定向流形', '第6章': '向量场与Euler数',
      '第7章': '标架式协边和Pontryagin构造', '第8章': '练习', '附录': '1维流形的分类',
    },
  },
  artin: {
    prefix: '代数Artin',
    defaultChapter: null,
    detect: [
      { re: /^##\s*(第[一二三四五六七八九十]+章)/m, key: m => m[1], window: 2500 },
    ],
    names: {
      '第一章': '矩阵', '第二章': '群论', '第三章': '向量空间', '第四章': '线性变换',
      '第五章': '正交性', '第六章': '对称', '第七章': '群论进阶', '第八章': '双线性型',
      '第九章': '线性群', '第十章': '群表示', '第十一章': '环', '第十二章': '因子分解',
      '第十三章': '代数整数', '第十四章': '模', '第十五章': '域', '第十六章': '伽罗瓦理论',
    },
  },
};

const IN = args.in, OUTDIR = args.outdir;
const preset = PRESETS[args.book];
if (!IN || !OUTDIR || (!preset && !args.pattern)) {
  console.error('用法: node split-raw.mjs --in <单体> --outdir <目录> --book thomas|axler|milnor [--toc <文件>] [--dry-run]');
  process.exit(1);
}
const cfg = preset || { prefix: 'book', defaultChapter: null, detect: [{ re: new RegExp(args.pattern), key: m => m[1] }], names: {} };
const prefix = args.prefix || cfg.prefix;
const DRY = !!args['dry-run'];

let text = fs.readFileSync(IN, 'utf8').replace(/\r\n/g, '\n');
// 去掉文首 frontmatter 与书名头，只保留轮次
const firstTurn = text.search(/^##\s*提问\s*\d+\s*$/m);
if (firstTurn > 0) text = text.slice(firstTurn);

const blocks = text.split(/(?=^##\s*提问\s*\d+\s*$)/m).filter(b => /^##\s*提问\s*\d+\s*$/.test(b.split('\n')[0] || ''));

const groups = new Map();
let cur = cfg.defaultChapter;
const order = [];
for (const block of blocks) {
  const ans = block.split(/^##\s*回答\s*\d+\s*$/m).slice(1).join('\n');
  let key = null;
  for (const d of cfg.detect) {
    const m = (d.window ? ans.slice(0, d.window) : ans).match(d.re);
    if (m) { key = d.key(m); break; }
  }
  if (key) cur = key;
  const k = cur || '未分类';
  if (!groups.has(k)) { groups.set(k, []); order.push(k); }
  groups.get(k).push(block.trim());
}

const CN = { 一: 1, 二: 2, 三: 3, 四: 4, 五: 5, 六: 6, 七: 7, 八: 8, 九: 9, 十: 10 };
const cn2num = s => s.length === 1 ? CN[s] : (s[0] === '十' ? 10 + (CN[s[1]] || 0) : (s[1] === '十' ? CN[s[0]] * 10 + (s[2] ? CN[s[2]] : 0) : null));
const fileName = key => {
  const name = cfg.names[key] || key;
  let k2 = key;
  let m = key.match(/^第(\d+)章$/);
  if (m) k2 = `第${m[1].padStart(2, '0')}章`;
  else if ((m = key.match(/^第([一二三四五六七八九十]+)章$/))) k2 = `第${String(cn2num(m[1])).padStart(2, '0')}章`;
  return `${prefix}-${k2}-${name}.md`;
};

if (DRY) {
  console.log(`轮次 ${blocks.length}，章节 ${order.length}`);
  for (const k of order) console.log(`  ${k} (${cfg.names[k] || ''}): ${groups.get(k).length} 轮 → ${fileName(k)}`);
  process.exit(0);
}

fs.mkdirSync(OUTDIR, { recursive: true });
const created = args.created || new Date().toISOString().slice(0, 10);
const toc = [];
for (const k of order) {
  const name = cfg.names[k] || k;
  const fm = `---\ntitle: "${prefix} · ${k} ${name}"\ntags: [数学, 读书笔记]\ncreated: "${created}"\ntype: literature\nsummary: "${prefix} ${k} ${name} 伴读（讲解 + 问答）。"\n---\n\n`;
  fs.writeFileSync(path.join(OUTDIR, fileName(k)), fm + groups.get(k).join('\n\n') + '\n', 'utf8');
  toc.push(`- [[${fileName(k).replace(/\.md$/, '')}|${k} ${name}]]（${groups.get(k).length} 轮）`);
}
if (args.toc) {
  const tfm = `---\ntitle: "${prefix} · 伴读"\ntags: [数学, 读书笔记]\ncreated: "${created}"\ntype: literature\nsummary: "${prefix} 逐节伴读目录：按章拆分为 ${order.length} 个文件。"\n---\n\n# ${prefix} · 伴读\n\n> 原始素材（raw 层）。来源：DeepSeek 对话导出（已去重、去思考过程）。正文已按章拆分到同目录文件。\n\n`;
  fs.writeFileSync(args.toc, tfm + toc.join('\n') + '\n', 'utf8');
}
console.log(`已写出 ${order.length} 个章节文件 → ${OUTDIR}`);
