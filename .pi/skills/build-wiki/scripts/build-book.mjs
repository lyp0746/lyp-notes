#!/usr/bin/env node
// build-book.mjs — 从 vault 的 wiki / 数学大地图自动编译一本可增量更新的 PDF 书。
//
// 设计目标：**配置驱动、可重复运行**。新增书籍后，只要更新 map.config.json 与 wiki/知识索引.md，
// 重新运行本脚本，PDF 就会自动收录新书（分支、概念清单、各书导读）。
//
// 用法:
//   node build-book.mjs --vault . [--config book/book.config.json] [--md-only] [--no-pdf]
//
// 依赖: Pandoc + XeLaTeX（Windows 下已装于 D:/Pandoc、MiKTeX）。找不到 Pandoc 时只产出 Markdown。
//
// 输出:
//   <cfg.output>.md    合并后的书稿（Markdown）
//   <cfg.output>.pdf    最终 PDF

import fs from 'fs';
import path from 'path';
import { execFileSync } from 'child_process';

const args = {};
for (let i = 2; i < process.argv.length; i++) {
  const a = process.argv[i];
  if (a.startsWith('--')) args[a.slice(2)] = process.argv[i + 1] && !process.argv[i + 1].startsWith('--') ? process.argv[++i] : true;
}
const VAULT = path.resolve(args.vault || process.cwd());
const CONFIG = path.resolve(VAULT, args.config || 'book/book.config.json');
const MD_ONLY = !!args['md-only'];
const NO_PDF = !!args['no-pdf'];

const read = p => fs.readFileSync(path.join(VAULT, p), 'utf8').replace(/\r\n/g, '\n');
const exists = p => fs.existsSync(path.join(VAULT, p));

const cfg = JSON.parse(read(args.config || 'book/book.config.json'));
const mapCfg = JSON.parse(read('.pi/skills/build-wiki/map.config.json'));

// ---------- 工具：清理 Obsidian 语法，转成 Pandoc 可读的纯 Markdown ----------
function sanitize(text) {
  let t = text;
  // 去 frontmatter
  t = t.replace(/^---\n[\s\S]*?\n---\n?/, '');
  // 去 mermaid 代码块（PDF 里不渲染，改由文本分支清单承担）
  t = t.replace(/```mermaid[\s\S]*?```/g, '');
  // 去 HTML 注释（含 MAP:AUTO 标记）
  t = t.replace(/<!--[\s\S]*?-->/g, '');
  // 装饰性符号在 PDF 字体中缺字：去掉图例/星标/待补框，箭头转数学模式
  t = t.replace(/^>\s*图例：.*$/gm, '');
  t = t.replace(/★|◆/g, '');
  t = t.replace(/◻\s*/g, '');
  t = t.replace(/⇔/g, ' $\\Leftrightarrow$ ');
  // 去 canvas / 图片嵌入
  t = t.replace(/!\[\[[^\]]*\]\]/g, '');
  // callout 标记行 `> [!note] 标题` → `> **标题**`
  t = t.replace(/^>\s*\[!\w+\]\s*(.*)$/gm, (m, rest) => (rest ? `> **${rest}**` : ''));
  // 高亮 ==x== → x
  t = t.replace(/==([^=]+)==/g, '$1');
  // wikilink → 文本：[[目标#锚点|别名]] / [[目标|别名]] / [[目标#锚点]] / [[目标]]
  t = t.replace(/\[\[([^\]]+)\]\]/g, (m, inner) => {
    const [target, alias] = inner.split('|');
    if (alias) return alias.trim();
    return target.split('#')[0].replace(/\.md$/, '').trim();
  });
  // 压缩多余空行
  return t.replace(/\n{3,}/g, '\n\n').trim();
}

const shift = (line, n) => {
  const m = line.match(/^(#{1,6})\s+(.*)$/);
  return m ? '#'.repeat(Math.min(6, m[1].length + n)) + ' ' + m[2] : line;
};
const demote = (text, n) => text.split('\n').map(l => shift(l, n)).join('\n');

// 包含一个 wiki 页：取其首个 H1 作标题，正文去掉 H1 后降级
function includeChapter(file, level = 2) {
  if (!exists(file)) return null;
  let t = sanitize(read(file));
  const h1 = t.match(/^#\s+(.*)$/m);
  const title = h1 ? h1[1].trim() : path.basename(file, '.md');
  t = t.replace(/^#\s+.*$(\n)?/m, '');
  return { title, body: demote(t.trim(), level - 1) };
}

// 知识索引：书名 → 概念清单（与 update-map.mjs 同源）
const ki = exists('wiki/知识索引.md') ? read('wiki/知识索引.md') : '';
const conceptsOf = bookTitle => {
  const lines = ki.split('\n');
  const esc = bookTitle.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  let i = lines.findIndex(l => /^##\s/.test(l) && new RegExp(`\\[\\[${esc}\\]\\]`).test(l));
  if (i < 0) return [];
  const out = [];
  for (i++; i < lines.length && !/^##\s/.test(lines[i]); i++)
    for (const m of lines[i].matchAll(/\[\[([^\]]+)\]\]/g)) out.push(m[1].split('|')[0]);
  return out;
};

// ---------- 组装书稿 ----------
const allBooks = mapCfg.branches.flatMap(b => (b.books || []).map(x => ({ ...x, branch: b.label })));
const date = cfg.date || new Date().toISOString().slice(0, 10);
let out = [];
out.push('---');
out.push(`title: "${cfg.title}"`);
out.push(`author: "${cfg.author || ''}"`);
out.push(`date: "${date}"`);
out.push(`lang: "${cfg.lang || 'zh-CN'}"`);
out.push('---');
out.push('');
out.push(`> ${cfg.blurb || ''}`);
out.push('');

// 本版信息（自动）
out.push('# 本版信息');
out.push('');
out.push(`本 PDF 由 \`build-book.mjs\` 自动生成，构建日期 **${date}**。`);
out.push('');
out.push(`当前收录 **${allBooks.length}** 本书、**${allBooks.reduce((s, x) => s + conceptsOf(x.title).length, 0)}** 个概念节点：`);
out.push('');
for (const b of allBooks) out.push(`- 《${b.title}》（${b.branch}）`);
out.push('');
out.push('> 增删书籍后，更新 `map.config.json` 与 `wiki/知识索引.md`，重新运行脚本即可刷新本 PDF。');
out.push('');
out.push('\\newpage');
out.push('');

for (const part of cfg.parts || []) {
  if (part.title) { out.push(`# ${part.title}`); out.push(''); }
  for (const src of part.sources || []) {
    if (src.type === 'file' || src.type === 'guide') {
      const c = includeChapter(src.path, 2);
      if (c) { out.push(`## ${c.title}`); out.push(''); out.push(c.body); out.push(''); }
    } else if (src.type === 'map') {
      let t = sanitize(read('数学大地图.md'));
      t = t.replace(/^#\s+.*$/m, ''); // 去掉文件自身的 H1
      out.push('## 数学大地图');
      out.push('');
      out.push(demote(t.trim(), 1));
      out.push('');
    } else if (src.type === 'crosslines') {
      const exclude = new Set(src.exclude || []);
      for (const f of mapCfg.crosslines.files) {
        if (exclude.has(f)) continue;
        const c = includeChapter(f, 2);
        if (c) { out.push(`## ${c.title}`); out.push(''); out.push(c.body); out.push(''); }
      }
    } else if (src.type === 'bookGuides') {
      for (const b of allBooks) {
        const c = includeChapter(b['导读'], 2);
        if (c) { out.push(`## ${c.title}`); out.push(''); out.push(c.body); out.push(''); }
      }
    } else if (src.type === 'branchIndex') {
      for (const br of mapCfg.branches) {
        out.push(`## ${br.label}`);
        out.push('');
        if (!(br.books || []).length) { out.push('（本库暂未收录）'); out.push(''); continue; }
        for (const b of br.books) {
          const cs = conceptsOf(b.title);
          out.push(`**《${b.title}》** — ${cs.join(' · ') || '（概念待补）'}`);
          out.push('');
        }
      }
    }
  }
  out.push('\\newpage');
  out.push('');
}

const manifest = out.join('\n').replace(/\n{3,}/g, '\n\n');
const outBase = path.resolve(VAULT, cfg.output || 'book/数学地图');
fs.mkdirSync(path.dirname(outBase), { recursive: true });
fs.writeFileSync(outBase + '.md', manifest, 'utf8');
console.log(`书稿 Markdown → ${path.relative(VAULT, outBase)}.md（${manifest.length} 字符）`);

if (MD_ONLY || NO_PDF) process.exit(0);

// ---------- 调 Pandoc 生成 PDF ----------
const pandocCandidates = [process.env.PANDOC, 'pandoc', 'D:/Pandoc/pandoc.exe', 'D:/Pandoc/pandoc'].filter(Boolean);
let pandoc = null;
for (const c of pandocCandidates) { try { execFileSync(c, ['--version'], { stdio: 'ignore' }); pandoc = c; break; } catch {} }
if (!pandoc) { console.warn('[警告] 未找到 Pandoc，已只生成 Markdown；装好 Pandoc 后重跑即可出 PDF。'); process.exit(0); }

// 生成动态页眉/封面变量
fs.writeFileSync(path.join(VAULT, 'book/_meta.tex'),
  `\\renewcommand{\\booktitle}{${(cfg.title || '').replace(/[\\{}]/g, '')}}\n` +
  `\\renewcommand{\\booksubtitle}{${(cfg.subtitle || '').replace(/[\\{}]/g, '')}}\n`, 'utf8');

const rel = p => path.relative(VAULT, p).replace(/\\/g, '/');
const pdfArgs = [
  rel(outBase) + '.md',
  '-o', rel(outBase) + '.pdf',
  '--pdf-engine=xelatex',
  '--toc', '--toc-depth=2', '--top-level-division=part', '--standalone',
  '--resource-path=book;book/figures;.',
  '-V', 'documentclass=book', '-V', 'classoption=oneside',
  '-V', `CJKmainfont=${cfg.cjkFont || 'SimSun'}`,
  '-V', `CJKsansfont=${cfg.cjkSans || 'SimHei'}`,
  '-V', `mainfont=${cfg.mainFont || 'Cambria'}`,
  '-V', 'geometry:margin=2.4cm', '-V', `papersize=${cfg.papersize || 'a4'}`,
  '-V', 'fontsize=11pt', '-V', 'linestretch=1.2',
  '-V', 'toc-title=目录',
  '--include-in-header=book/nature.tex',
  '--include-in-header=book/_meta.tex',
];
try {
  execFileSync(pandoc, pdfArgs, { cwd: VAULT, stdio: ['ignore', 'inherit', 'inherit'] });
  console.log(`PDF → ${path.relative(VAULT, outBase)}.pdf`);
} catch (e) {
  console.error('[错误] Pandoc/XeLaTeX 编译失败（Markdown 已保留，可手动排查）。');
  process.exit(1);
}
