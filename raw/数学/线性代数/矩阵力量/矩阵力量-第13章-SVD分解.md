---
title: "矩阵力量 · 第13章 SVD分解"
tags: [数学, 读书笔记]
created: "2026-10-05"
type: literature
summary: "矩阵力量 第13章 SVD分解 伴读（2 轮）。"
---

# 第13章 SVD分解 —— 万能分解

## 📘 本节概览

SVD $A = U\Sigma V^T$ 是线性代数最普适的分解——对**任何矩阵**（不要求方阵、对称、可逆）都存在。它同时给出四个基本子空间的正交基。

## 📐 1. SVD的推导

$A^TA$ 是 $n\times n$ 对称正半定→有EVD：$A^TA = V\Lambda V^T$（$\Lambda = \Sigma^2$，$\sigma_i = \sqrt{\lambda_i}$）。

定义 $U$ 的前 $r$ 列：$\vec{u}_i = A\vec{v}_i/\sigma_i$（$i=1,\ldots,r$）。验证：$\vec{u}_i^T\vec{u}_j = \vec{v}_i^TA^TA\vec{v}_j/(\sigma_i\sigma_j) = \delta_{ij}$——正交。

扩充 $\{\vec{u}_1,\ldots,\vec{u}_r\}$ 为 $\mathbb{R}^m$ 的正交基 $\{\vec{u}_1,\ldots,\vec{u}_m\}$，则 $A = U\Sigma V^T$。

## 📐 2. SVD揭示的结构

| 子空间 | 正交基 |
|--------|--------|
| 列空间 $C(A)$ | $\vec{u}_1,\ldots,\vec{u}_r$ |
| 左零空间 $N(A^T)$ | $\vec{u}_{r+1},\ldots,\vec{u}_m$ |
| 行空间 $C(A^T)$ | $\vec{v}_1,\ldots,\vec{v}_r$ |
| 零空间 $N(A)$ | $\vec{v}_{r+1},\ldots,\vec{v}_n$ |

**低秩近似**（Eckart-Young定理）：$A_k = \sum_{i=1}^k \sigma_i \vec{u}_i\vec{v}_i^T$ 是 $A$ 在Frobenius范数下的**最优秩$k$近似**。

> 🔍 **证明思路**（Eckart-Young）：设 $B$ 是任意秩$\leq k$矩阵，则 $N(B)$ 维数$\geq n-k$。取 $S = \text{span}\{\vec{v}_1,\ldots,\vec{v}_{k+1}\}$（维数$k+1$），$S \cap N(B) \neq \{0\}$（维数之和>全空间）。取单位向量 $\vec{x} \in S \cap N(B)$，则 $\|A-B\| \geq \|(A-B)\vec{x}\| = \|A\vec{x}\| \geq \sigma_{k+1}$。

## 📝 本节要点

1. SVD对任何矩阵都存在——$U$ 和 $V$ 是正交基，$\Sigma$ 是奇异值。
2. Eckart-Young：截断SVD=最优低秩近似。
3. SVD同时给出四个基本子空间的正交基。

## 🔮 发散性提问

1. **SVD的计算复杂度 $O(mn^2)$（$m \geq n$）。随机SVD如何加速？为什么"随机投影+小矩阵SVD"能近似大矩阵SVD？**
2. **SVD在数据科学中无处不在（PCA、推荐系统、图像压缩）。SVD为什么是"最数学的分解"——它同时优化了代数、几何和分析三个视角？**

如果你准备好了，请说 **"下一节"**，我将继续讲解 **第14章：四大分解比较**。

---

---

### 🤔 问题 1：随机SVD

核心思想：$A \approx Q Q^T A$（$Q$ 是 $A$ 的列空间的低维正交基）。步骤：(1) 随机矩阵 $\Omega \in \mathbb{R}^{n \times k}$，计算 $Y = A\Omega$（$k$ 个随机投影）；(2) QR分解 $Y = QR$；(3) 小矩阵 $B = Q^TA \in \mathbb{R}^{k \times n}$；(4) $B$ 的SVD：$B = \hat{U}\Sigma V^T$；(5) $U = Q\hat{U}$。复杂度 $O(mnk)$——当 $k \ll n$ 时远快于 $O(mn^2)$。精度：$\mathbb{E}\|A - A_k\| \leq (1 + \sqrt{k/(k-p)})\sigma_{k+1}$（$p$ 是过采样参数）。

### 🤔 问题 2：SVD的"最数学"性

代数：SVD给出四个子空间的正交基——最清晰的代数结构。几何：$A$ 的作用=旋转($V^T$)→缩放($\Sigma$)→旋转($U$)——最直观的几何解释。分析：Eckart-Young给出最优低秩近似——最精确的分析性质。三者统一：正交性（代数）=保长变换（几何）=最优性（分析）。

---

---
