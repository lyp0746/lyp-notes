---
name: build-wiki
description: 把 raw 原始素材（对话导出、网页、PDF 摘录）清洗去重、按内容命名归档，再编译成中文命名的 wiki 概念/实体/主题页与 output 报告（raw → wiki → output），并可用 Git 版本化。当用户要求「整理 raw」「重建 wiki/output」「把对话/网页加入知识库」或维护数学读书笔记库时使用。
---

# build-wiki：raw → 中文 wiki → output

把零散原始素材固化为结构化知识库的标准流程。适用于本 vault（数学读书笔记库，规范见 `AGENTS.md`）。

## 何时使用

- 用户往 `raw/` 放了新素材（对话导出、网页摘录、PDF 笔记），要求「整理 wiki 和 output」。
- 素材本身杂乱：含 HTML、公式（KaTeX/MathJax）、思考过程、**重叠分片**，或多种导出格式混用。
- 需要把知识组织成**中文命名**的概念页，让 Obsidian 图谱显示中文。
- 需要把成果纳入 Git 并推送到远程仓库。

## 总原则

1. **raw 是 source of truth**：清洗后按「学科 / 分支」归档，文件名体现内容（如 `线性代数应该这样学-伴读.md`）。
2. **wiki 用中文命名**：概念、实体、主题全部中文；**一个概念一个文件**。
3. **索引用领域相关的中文名**（不要到处都叫 `索引.md`，会重名、图谱难分辨）：
   `总索引.md`（根）、`素材索引.md`（raw）、`知识索引.md`（wiki）、`概念索引.md`、`实体索引.md`、`主题索引.md`、`产出索引.md`。
4. **三层单向流动**：`raw/` → `wiki/` → `output/`。
5. **必经交叉链接**：每个 wiki 页用 `[[中文页名]]` 互连，并在「参考源」指向 raw 文件。
6. **frontmatter 五字段**：`title / tags / created / type / summary`（`type ∈ {fleeting, literature, permanent}`）。

## 输入格式识别

对话导出常见两种，先判断再清洗：

| 格式 | 特征 | 处理 |
| --- | --- | --- |
| HTML 导出 | `### 用户` / `### DeepSeek AI`，正文含 `<p>`、`<span class="katex">`、`<annotation encoding="application/x-tex">` | 去标签、还原 LaTeX |
| 干净 Markdown | `## 🧑 提问 N` / `## 🤖 回答 N`，回答内是 `<details><summary>💭 思考过程</summary>…</details>` | 去 `<details>` 思考块 |

**思考过程默认删掉**（见文末说明）：它是模型的内部推理，通常与正式回答重复，且可能含推测，属于噪声。

## 步骤

### 1. 侦察素材

- 列出 `raw/` 全部文件，检查格式、结构标记、是否重叠分片（大小递增/开头重复）。
- 统计「总块数 vs 唯一块数」判断重复率。

### 2. 清洗为干净 Markdown（+ 去重）

- 去 HTML、还原 KaTeX、**删除思考过程**。
- 按「去空白文本」哈希去重，保留首次出现，顺序即原始顺序。
- 一键：`node scripts/clean-and-dedupe.mjs --in <目录> --out <文件>`（可选 `--user/--assistant` 指定标记正则；脚本自动识别上表两种格式与 `<details>`）。
- 需要 turndown 时：`npm i turndown turndown-plugin-gfm`（缺失则降级为正则清标签）。

### 3. 按内容命名 + 归档 raw

- 路径：`raw/<学科>/<分支>/<书名或主题>-<来源>.md`。
- 加 frontmatter（`type: literature`）。
- 若素材是**重叠分片**：合并去重后按内容命名（如按章节拆分 `第01章-…`，或整本 `书名-伴读.md`）。

### 4. 编译 wiki（中文命名）

目录：`wiki/概念/`、`wiki/实体/`、`wiki/主题/`。

- **概念页**：中文文件名（`向量空间.md`、`若尔当形.md`）。结构：`# 概念` → `## 定义` → `## 核心要点` → `## 与其他概念的关系` → `## 参考源`；`type: permanent`。
- **实体页**：人物、书籍（`谢尔顿·阿克斯勒.md`、`线性代数应该这样学.md`）。
- **主题页**：跨概念综述（`…-导读.md`）。
- 多本书可共存于同一 `wiki/概念/`，在 `知识索引.md` 按来源分组。
- 每个概念至少在「与其他概念的关系」链接 2–3 个邻居。

### 5. 生成 output

`output/` 下 2–4 篇中文报告：`…-章节地图.md`、`…-核心概念速查表.md`、`…-学习路线.md`。`type: literature`，注明来源 wiki。

### 6. 更新索引（领域相关中文名）

`总索引.md`、`素材索引.md`、`知识索引.md`、`概念索引.md`、`实体索引.md`、`主题索引.md`、`产出索引.md`，列出同层全部页面及一句话摘要。

### 7. 校验

- 所有 `[[链接]]` 可解析（除语法示例）。
- 每个 wiki 页五字段 frontmatter 完整、有「参考源」。
- 索引与目录内容一致。

### 8. 纳入 Git（可选）

```bash
git init -b main
git config core.quotepath false && git config core.autocrlf false
printf '* text=auto eol=lf\n' > .gitattributes
git add -A && git commit -m "初始化：数学读书笔记库"
git remote add origin <url> && git push -u origin main
```
Windows 下用 `D:\Git\cmd\git.exe`，注意 `safe.directory` 与中文路径（`core.quotepath=false`）。

## 命名与规范速查

- 文件：中文；概念一个概念一个文件；**索引用领域相关中文名**。
- 标签：领域标签（`数学`、`线性代数`、`拓扑`…）+ 具体主题标签；不自创领域标签。
- 术语统一：同一概念只用一个写法（如统一用「本征值」）。
- 不使用 Daily Notes / 日记。

## 质量检查清单

- [ ] raw 无 HTML 残留、无重复块、无思考过程、按 学科/分支 归档、命名体现内容。
- [ ] wiki 文件名全中文；每个概念 ≥ 2 条 `[[链接]]`。
- [ ] 每个 wiki 页有完整五字段 frontmatter 与「参考源」。
- [ ] output 报告链接回 wiki。
- [ ] 所有索引（`总索引`/`素材索引`/`知识索引`/`概念索引`/`实体索引`/`主题索引`/`产出索引`）与目录一致，无失效链接。
- [ ] 如启用 Git：工作区干净、远程已同步。

## 关于「思考过程」

- 它是模型的内部推理，**通常与最终回答重复**，且可能含未完成/被推翻的推测，属于噪声。
- 但**并非完全没有信息**：偶尔包含有价值的直观、备选思路或“为什么这样定义”的动机。
- 默认处理：**raw 里删掉思考、只留正式回答**（更干净、可检索）。若某段思考确有价值，可将其要点并入对应 wiki 概念页的「直观」段落，而不是原样保留。

## 目录结构

```
总索引.md / AGENTS.md
raw/<学科>/<分支>/<书名>-伴读.md + 素材索引.md
wiki/知识索引.md + 概念/ 实体/ 主题/（各含 *索引.md）
output/产出索引.md + *.md
templates/{读书笔记模板,概念笔记模板}.md
.pi/skills/build-wiki/
```
