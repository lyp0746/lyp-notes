#!/usr/bin/env node
// clean-and-dedupe.mjs — 把对话导出（HTML 或干净 Markdown）清洗为干净 Markdown 并去重。
//
// 用法:
//   node clean-and-dedupe.mjs --in <目录或文件> --out <输出文件> [--user 正则] [--assistant 正则] [--keep-thinking]
//
// 自动识别两种常见导出格式:
//   1) HTML 导出:   "### 用户"      / "### DeepSeek AI"（正文含 <p>、KaTeX annotation）
//   2) 干净 Markdown: "## 🧑 提问 N" / "## 🤖 回答 N"（回答内含 <details>💭 思考过程</details>）
//
// 功能: 切分轮次 → 删除思考过程（<details> 或 "思考：" blockquote）→ HTML→Markdown（KaTeX 还原）
//        → 按去空白文本哈希去重（保留首次）→ 输出 "## 提问 N / ## 回答 N"
//
// 依赖（可选）: npm i turndown turndown-plugin-gfm

import fs from 'fs';
import path from 'path';

const args = {};
for (let i = 2; i < process.argv.length; i++) {
  const a = process.argv[i];
  if (a.startsWith('--')) args[a.slice(2)] = process.argv[i + 1] && !process.argv[i + 1].startsWith('--') ? process.argv[++i] : true;
}
const IN = args.in, OUT = args.out;
if (!IN || !OUT) { console.error('用法: node clean-and-dedupe.mjs --in <目录> --out <文件> [--user 正则] [--assistant 正则] [--keep-thinking]'); process.exit(1); }
const KEEP_THINKING = !!args['keep-thinking'];

let turndown = null, gfm = null;
try { turndown = (await import('turndown')).default; gfm = (await import('turndown-plugin-gfm')).gfm; }
catch { console.warn('[提示] 未安装 turndown，降级为正则清标签。可运行: npm i turndown turndown-plugin-gfm'); }

function makeConverter() {
  if (!turndown) return null;
  const svc = new turndown({ headingStyle: 'atx', codeBlockStyle: 'fenced', bulletListMarker: '-', emDelimiter: '*' });
  svc.use(gfm);
  svc.addRule('katex', {
    filter: n => n.classList && n.classList.contains('katex'),
    replacement: (c, node) => {
      const ann = node.querySelector('annotation[encoding="application/x-tex"]');
      const tex = ann ? ann.textContent : (node.textContent || '').replace(/\s+/g, ' ').trim();
      const disp = node.closest?.('.katex-display') || node.parentElement?.classList.contains('katex-display');
      return disp ? `\n\n$$\n${tex}\n$$\n\n` : `$${tex}$`;
    },
  });
  return svc;
}
const conv = makeConverter();

const stripThinking = h => {
  let s = h.replace(/<details>[\s\S]*?<\/details>\s*/gi, '');
  s = s.replace(/<p>\s*思考[：:]\s*<\/p>\s*<blockquote>[\s\S]*?<\/blockquote>/i, '').replace(/<p>\s*思考[：:]\s*<\/p>/i, '');
  return s;
};
const htmlToMd = h => {
  h = (KEEP_THINKING ? h : stripThinking(h)).trim();
  if (conv) { try { return conv.turndown(h).trim(); } catch { /* fall through */ } }
  return h.replace(/<\/(p|div|li|h[1-6]|blockquote|tr)>/gi, '\n').replace(/<br\s*\/?>/gi, '\n')
    .replace(/<li[^>]*>/gi, '- ').replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"')
    .replace(/\n{3,}/g, '\n\n').trim();
};

const detect = (t, kind) => {
  const pats = kind === 'user'
    ? [/^##\s*🧑\s*提问\s*\d*\s*$/m, /^###\s*用户\s*$/m, /^##\s*用户\s*$/m, /^##\s*提问\s*\d*\s*$/m, /^user:\s*$/m]
    : [/^##\s*🤖\s*回答\s*\d*\s*$/m, /^###\s*DeepSeek AI\s*$/m, /^##\s*助手\s*$/m, /^###\s*助手\s*$/m, /^##\s*回答\s*\d*\s*$/m, /^assistant:\s*$/m];
  for (const p of pats) if (p.test(t)) return p;
  return null;
};

const files = [];
const collect = p => { const st = fs.statSync(p); if (st.isDirectory()) fs.readdirSync(p).sort().forEach(f => collect(path.join(p, f))); else if (/\.(md|txt)$/i.test(p)) files.push(p); };
collect(IN);

const norm = s => s.replace(/\s+/g, '');
const turns = [];
for (const f of files) {
  const t = fs.readFileSync(f, 'utf8');
  const U = args.user ? new RegExp(args.user, 'gm') : detect(t, 'user');
  const A = args.assistant ? new RegExp(args.assistant, 'gm') : detect(t, 'assistant');
  if (!U || !A) { console.warn('跳过（无法识别标记）:', f); continue; }
  const chunks = t.split(U).slice(1);
  for (const chunk of chunks) {
    const ai = chunk.search(A);
    if (ai === -1) continue;
    const prompt = chunk.slice(0, ai).replace(/-{3,}/g, '').trim();
    const html = chunk.slice(ai).replace(A, '');
    turns.push({ prompt, md: htmlToMd(html) });
  }
}
const seen = new Set(); const uniq = [];
for (const t of turns) { const k = norm(t.md); if (seen.has(k)) continue; seen.add(k); uniq.push(t); }

const out = [];
uniq.forEach((t, i) => { out.push(`## 提问 ${i + 1}`, '', t.prompt, '', `## 回答 ${i + 1}`, '', t.md, '', '---', ''); });
fs.writeFileSync(OUT, out.join('\n'), 'utf8');
console.log(`文件 ${files.length} | 轮次 ${turns.length} | 去重后 ${uniq.length} | 输出 ${OUT}`);
