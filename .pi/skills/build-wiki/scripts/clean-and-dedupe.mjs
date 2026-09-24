#!/usr/bin/env node
// clean-and-dedupe.mjs — 把 HTML 风格的对话导出（.md/.txt）清洗为干净 Markdown 并去重。
//
// 用法:
//   node clean-and-dedupe.mjs --in <目录或文件> --out <输出文件> \
//        [--user "^### 用户"] [--assistant "^### DeepSeek AI"]
//
// 依赖（可选，缺失时降级为正则清标签）:
//   npm i turndown turndown-plugin-gfm
//
// 功能:
//   1. 按 用户/助手 标记切分轮次
//   2. 删除「思考过程」块（<p>思考：</p><blockquote>…</blockquote>）
//   3. HTML → Markdown；KaTeX 的 <annotation encoding="application/x-tex"> 还原为 $…$/$$…$$
//   4. 按去空白文本哈希去重（保留首次出现）
//   5. 输出合并后的 Markdown（## 用户 / ## 助手）

import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const args = {};
for (let i = 2; i < process.argv.length; i += 2) args[process.argv[i].replace(/^--/, '')] = process.argv[i + 1];
const IN = args.in, OUT = args.out;
const USER_MARK = args.user || '^#{2,4} 用户';
const ASST_MARK = args.assistant || '^#{2,4} DeepSeek AI';
if (!IN || !OUT) { console.error('用法: node clean-and-dedupe.mjs --in <目录> --out <文件> [--user 正则] [--assistant 正则]'); process.exit(1); }

let turndown = null, gfm = null;
try {
  const td = await import('turndown'); const g = await import('turndown-plugin-gfm');
  turndown = td.default; gfm = g.gfm;
} catch { console.warn('[提示] 未安装 turndown，降级为正则清标签。可运行: npm i turndown turndown-plugin-gfm'); }

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

const stripThinking = h => h
  .replace(/^<p>\s*思考[：:]\s*<\/p>\s*<blockquote>[\s\S]*?<\/blockquote>/i, '')
  .replace(/^<p>\s*思考[：:]\s*<\/p>/i, '');

const htmlToMd = h => {
  h = stripThinking(h.trim());
  if (conv) { try { return conv.turndown(h).trim(); } catch { /* fall through */ } }
  return h.replace(/<\/(p|div|li|h[1-6]|blockquote|tr)>/gi, '\n').replace(/<br\s*\/?>/gi, '\n')
    .replace(/<li[^>]*>/gi, '- ').replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"')
    .replace(/\n{3,}/g, '\n\n').trim();
};

const files = [];
const collect = p => { const st = fs.statSync(p); if (st.isDirectory()) fs.readdirSync(p).sort().forEach(f => collect(path.join(p, f))); else if (/\.(md|txt)$/i.test(p)) files.push(p); };
collect(IN);

const norm = s => s.replace(/\s+/g, '');
const turns = [];
for (const f of files) {
  const t = fs.readFileSync(f, 'utf8');
  const re = new RegExp(`(${USER_MARK})`, 'm');
  for (const chunk of t.split(re).join('\n').split(new RegExp(USER_MARK, 'm')).slice(1)) {
    const ai = chunk.search(new RegExp(ASST_MARK, 'm'));
    if (ai === -1) continue;
    const prompt = chunk.slice(0, ai).replace(/-{3,}/g, '').trim();
    const html = chunk.slice(ai).replace(new RegExp(ASST_MARK, 'm'), '');
    turns.push({ prompt, md: htmlToMd(html) });
  }
}
const seen = new Set(); const uniq = [];
for (const t of turns) { const k = norm(t.md); if (seen.has(k)) continue; seen.add(k); uniq.push(t); }

const out = [];
for (const t of uniq) { out.push('## 用户', '', t.prompt, '', '## 助手', '', t.md, '', '---', ''); }
fs.writeFileSync(OUT, out.join('\n'), 'utf8');
console.log(`文件 ${files.length} 个 | 轮次 ${turns.length} | 去重后 ${uniq.length} | 输出 ${OUT}`);
