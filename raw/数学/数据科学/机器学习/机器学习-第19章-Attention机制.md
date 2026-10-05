---
title: "机器学习 · 第19章 Attention机制"
tags: [数学, 读书笔记]
created: "2026-10-05"
type: literature
summary: "机器学习 第19章 Attention机制 伴读（2 轮）。"
---

# 第19章 Attention机制 —— 全局依赖建模

## 📘 本节概览

Attention用**查询-键-值**机制建模全局依赖。核心：$\text{softmax}(QK^T/\sqrt{d_k})V$——加权聚合所有位置的信息。

## 📐 1. 注意力公式

$$\text{Attention}(Q,K,V) = \text{softmax}\left(\frac{QK^T}{\sqrt{d_k}}\right)V$$

> 🔍 **缩放的推导**：$QK^T$ 的元素方差 $\approx d_k$（假设 $q,k$ 各分量独立方差1）。除以 $\sqrt{d_k}$ 使方差归一化→softmax不饱和→梯度有效。

## 📐 2. 自注意力的矩阵形式

$Y = \text{softmax}(XX^TW_QW_K^T/\sqrt{d_k})XW_V$

> 💡 自注意力=核平滑：$\text{softmax}(XX^T/\sqrt{d_k})$ 定义了样本间的"相似度核"→输出=核加权平均。与核方法的联系：自注意力是一种**自适应核方法**——核参数（$W_Q, W_K, W_V$）由数据学习。

## 📐 3. 多头注意力

$\text{MultiHead} = \text{Concat}(\text{head}_1,...,\text{head}_h)W_O$，$\text{head}_i = \text{Attention}(QW_Q^i, KW_K^i, VW_V^i)$

> 💡 多头=在子空间中独立计算注意力→捕获不同类型的依赖（语法、语义、位置等）。

## 📐 4. 注意力的复杂度

自注意力：$O(n^2 d)$（$n$=序列长度，$d$=维度）→长序列瓶颈。改进：线性注意力（$O(nd^2)$）、局部注意力（$O(nkd)$）、Flash Attention（IO优化）。

## 📝 本节要点

1. Attention=查询-键-值加权聚合——全局依赖建模。
2. 缩放因子 $\sqrt{d_k}$ 防止softmax饱和。
3. 自注意力≈自适应核方法——多头在子空间独立计算。

## 🔮 发散性提问

1. **线性注意力如何将复杂度从$O(n^2)$降到$O(n)$？关键近似？**
2. **注意力与消息传递神经网络的关系？Transformer是特殊的GNN吗？**

如果你准备好了，请说 **"下一节"**，我将继续讲解 **第20章：Transformer**。

---

---

### 🤔 问题 1：线性注意力

标准注意力：$\text{softmax}(QK^T)V$——先算 $n \times n$ 矩阵再乘 $V$→$O(n^2)$。线性注意力（Katharopoulos et al. 2020）：$\phi(Q)(\phi(K)^TV)$——先算 $d \times d$ 矩阵再乘 $\phi(Q)$→$O(nd^2)$。关键近似：将softmax分解为 $\phi(Q)\phi(K)^T$（如 $\phi(x) = \text{elu}(x)+1$）→失去softmax的归一化→近似。

### 🤔 问题 2：Transformer与GNN

Transformer的全连接自注意力=**全连接图上的GNN**。每个token是节点，注意力权重=边权重（动态计算）。区别：(1) GNN边由输入图决定，Transformer边是全连接+动态权重；(2) GNN消息传递=邻居聚合，Transformer=全局加权聚合。所以Transformer=**集合上的GNN**（无图结构→全连接）。

---

---
