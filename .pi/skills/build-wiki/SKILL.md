---
name: build-wiki
description: 把 raw 原始素材（对话导出、网页、PDF 摘录）清洗去重、按内容命名归档，再编译成中文命名的 wiki 概念/实体/主题页与 output 报告（raw → wiki → output）。当用户要求「整理 raw」「重建 wiki/output」「把对话/网页加入知识库」或维护数学读书笔记库时使用。
---

# build-wiki：raw → 中文 wiki → output

把零散原始素材固化为结构化知识库的标准流程。适用于本 vault（数学读书笔记库，规范见 `AGENTS.md`）。

## 何时使用

- 用户往 `raw/` 放了新素材（对话导出、网页摘录、PDF 笔记），要求「整理 wiki 和 output」。
- 素材本身杂乱：含 HTML 标签、公式（KaTeX/MathJax）、思考过程、**重叠分片**。
- 需要把知识组织成**中文命名**的概念页，让 Obsidian 图谱显示中文。

## 总原则

1. **raw 是 source of truth**：清洗后按「学科 / 分支 / 书籍」归档，文件名用「内容」。
2. **wiki 用中文命名**：概念、实体、主题、索引全部中文；一个概念一个文件。
3. **三层单向流动**：`raw/`（素材）→ `wiki/`（知识）→ `output/`（产物）。
4. **必经交叉链接**：每个 wiki 页用 `[[中文页名]]` 互连，并在「参考源」指向 raw 文件。
5. **frontmatter 五字段**：`title / tags / created / type / summary`（见 `AGENTS.md`）。

## 步骤

### 1. 侦察素材

- 列出 `raw/` 全部文件，检查：格式（是否含 HTML）、结构（用户/助手标记）、是否重叠。
- 若多个文件是**同一对话的重叠分片**（大小递增、开头重复），先合并去重再归档。
- 统计「总块数 vs 唯一块数」判断重复率。

### 2. 清洗为干净 Markdown

- **去 HTML**：把 `<h1>`→`#`、`<li>`→`-`、`<strong>`→`**`、`<blockquote>`→`>` 等转成 Markdown（可用 `turndown` + `turndown-plugin-gfm`）。
- **还原公式**：KaTeX 的 `<annotation encoding="application/x-tex">` 里是原始 LaTeX；行间公式还原为 `$$\n…\n$$`，行内用 `$…$`。
- **去掉思考过程**：DeepSeek 导出的 `<p>思考：</p><blockquote>…</blockquote>` 整段删除，只保留正式回答。
- 用 `scripts/clean-and-dedupe.mjs` 一键完成：`node scripts/clean-and-dedupe.mjs --in <目录> --out <文件>`（首次先 `npm i turndown turndown-plugin-gfm`）。

### 3. 去重

- 按「去空白后的文本」哈希去重，**保留首次出现**，顺序即原始顺序。
- 校验：去重后唯一块数应等于真实内容数；若一份素材在多个文件重复出现，只留一次。

### 4. 按内容命名 + 归档 raw

- 放到 `raw/<学科>/<分支>/<书籍或主题>/`。
- 文件名体现内容与顺序：
  - 章节笔记：`第01章-向量空间.md`、`第02章-…`
  - 对话/文章：`<主题>-<来源>.md`
- 每个 raw 文件加 frontmatter（`type: literature`）。

### 5. 编译 wiki（中文命名）

目录：`wiki/概念/`、`wiki/实体/`、`wiki/主题/`。

- **概念页**：一个概念一个文件，用中文名（如 `向量空间.md`、`若尔当形.md`）。
  - 结构：`# 概念` → `## 定义` → `## 核心要点` → `## 与其他概念的关系` → `## 参考源`。
  - `type: permanent`。
- **实体页**：人物、书籍、定理体系（如 `谢尔顿·阿克斯勒.md`、`线性代数应该这样学.md`）。
- **主题页**：跨概念综述（如 `…-导读.md`）。
- **交叉链接**：正文中用 `[[概念名]]`；每个概念至少在「与其他概念的关系」里链接 2–3 个邻居。
- **参考源**：链接对应 raw 章节文件。

### 6. 生成 output

基于 wiki 产出 2–3 篇报告，`output/` 下中文命名：

- `…-章节地图.md`（逐章逐节 + 关键定理）
- `…-核心概念速查表.md`（一句话速查表）
- `…-学习路线.md`（分阶段路径）

`type: literature`，并注明来源 wiki。

### 7. 更新索引（中文）

- `索引.md`（根）、`raw/索引.md`、`wiki/索引.md`、`wiki/概念/索引.md`、`wiki/实体/索引.md`、`wiki/主题/索引.md`、`output/索引.md`。
- 索引列出同层全部页面及一句话摘要。
- 每次增删页面后同步更新。

## 命名与规范速查

- 文件：中文；概念一个概念一个文件；索引统一叫 `索引.md`。
- frontmatter：五字段；`type ∈ {fleeting, literature, permanent}`。
- 标签：领域标签（`数学`、`线性代数`…）+ 具体主题标签；不自创领域标签。
- 术语统一：同一概念只用一个写法（如统一用「本征值」）。
- 不使用 Daily Notes / 日记。

## 质量检查清单

- [ ] raw 无 HTML 残留、无重复块、命名体现内容、已按学科归档。
- [ ] wiki 文件名全中文；每个概念至少有 2 条 `[[链接]]`。
- [ ] 每个 wiki 页有完整五字段 frontmatter 与「参考源」。
- [ ] output 报告链接回 wiki。
- [ ] 所有 `索引.md` 与目录内容一致；无失效 `[[链接]]`。

## 目录结构

```
raw/学科/分支/书籍/第NN章-*.md     # 素材
wiki/{概念,实体,主题}/*.md + 索引.md
output/*.md + 索引.md
templates/{读书笔记模板,概念笔记模板}.md
AGENTS.md
```
