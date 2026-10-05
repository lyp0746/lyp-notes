---
title: "数据有道 · 第13章 PageRank"
tags: [数学, 读书笔记]
created: "2026-10-05"
type: literature
summary: "数据有道 第13章 PageRank 伴读（2 轮）。"
---

# 第13章 PageRank —— 随机游走的平稳分布

## 📘 本节概览

PageRank用随机游走的平稳分布给网页排序。核心思想：**重要页面=被很多重要页面链接的页面**。

## 📐 1. PageRank方程

$\vec{r} = \alpha M\vec{r} + (1-\alpha)\vec{v}$

- $M$：转移矩阵（列随机）
- $\alpha$：阻尼因子（通常0.85）
- $\vec{v}$：个性化向量（跳跃分布）

> 🔍 **推导为线性方程**：$(I - \alpha M)\vec{r} = (1-\alpha)\vec{v}$→$\vec{r} = (1-\alpha)(I-\alpha M)^{-1}\vec{v}$。$(I-\alpha M)$ 严格对角占优→可逆→解存在唯一。

## 📐 2. 幂迭代法

$\vec{r}^{(t+1)} = \alpha M\vec{r}^{(t)} + (1-\alpha)\vec{v}$

> 🔍 **收敛性证明**：$\|\vec{r}^{(t+1)} - \vec{r}^*\| = \|\alpha M(\vec{r}^{(t)}-\vec{r}^*)\| \leq \alpha\|\vec{r}^{(t)}-\vec{r}^*\|$→线性收敛，速率 $\alpha$。$\alpha=0.85$→每步误差缩小15%→约50步达到机器精度。

## 📐 3. 个性化PageRank

$\vec{v}$ 不均匀→偏好特定主题的排序。应用：推荐系统、社交网络中的权威度排序。

## 📝 本节要点

1. PageRank=带阻尼的随机游走平稳分布——解存在唯一。
2. 幂迭代线性收敛——速率由 $\alpha$ 决定。
3. 个性化PageRank通过 $\vec{v}$ 注入偏好。

## 🔮 发散性提问

1. **PageRank与HITS的区别：HITS分authority和hub，PageRank统一。哪个更适合什么场景？**
2. **PageRank在连续空间中的推广：扩散过程、Fokker-Planck方程。如何理解？**

如果你准备好了，请说 **"下一节"**，我将继续讲解 **第14章：社区检测**。

---

---

### 🤔 问题 1：PageRank vs HITS

**HITS**：每个节点有authority（被好hub指向）和hub（指向好authority）两个分数。$a_i = \sum_{j \to i} h_j$，$h_i = \sum_{i \to j} a_j$→迭代是 $A^TA$ 和 $AA^T$ 的幂法→收敛到主特征向量。
**区别**：PageRank值唯一（全局排序），HITS值依赖查询（局部排序）。PageRank适合全局权威度，HITS适合特定主题的专家发现。

### 🤔 问题 2：连续PageRank

离散随机游走→连续扩散过程。Fokker-Planck方程 $\partial_t p = \nabla \cdot (D\nabla p) - \nabla \cdot (vp)$ 描述概率密度的演化。平稳分布 $\nabla \cdot (D\nabla p^*) - \nabla \cdot (vp^*) = 0$ 是连续版PageRank。应用：城市中的热点分布、信息在社交网络中的传播。

---

---
