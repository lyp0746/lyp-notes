---
title: "线性代数不难 · 第9章 正交与 Gram-Schmidt"
tags: [数学, 线性代数, 读书笔记]
created: "2026-10-06"
type: literature
summary: "线性代数不难 第9章 正交与 Gram-Schmidt 详解（含推导与直觉）。"
---

# 第9章 正交与 Gram-Schmidt

## 第一轮：核心概念

### 9.1 正交矩阵

$Q$ 是正交矩阵 $\iff$ $Q^TQ = QQ^T = I$ $\iff$ $Q^{-1} = Q^T$

**2×2 正交矩阵**：旋转矩阵或反射矩阵。

$$Q = \begin{bmatrix} \cos\theta & -\sin\theta \\ \sin\theta & \cos\theta \end{bmatrix}\quad(\det=1)$$

或

$$Q = \begin{bmatrix} \cos\theta & \sin\theta \\ \sin\theta & -\cos\theta \end{bmatrix}\quad(\det=-1)$$

### 9.2 3×3 正交矩阵

$Q \in \mathbb{R}^{3\times 3}$ 正交：三列（行）构成 $\mathbb{R}^3$ 的标准正交基。

### 9.3 正交矩阵的性质

| 性质 | 说明 |
|------|------|
| $\det(Q) = \pm 1$ | 旋转（+1）或反射（-1） |
| $\|Q\mathbf{x}\| = \|\mathbf{x}\|$ | 保持长度 |
| $(Q\mathbf{x})\cdot(Q\mathbf{y}) = \mathbf{x}\cdot\mathbf{y}$ | 保持内积和角度 |
| $Q_1Q_2$ 正交 | 正交矩阵的乘积仍正交 |

### 9.4 Gram-Schmidt 正交化

将线性无关向量组 $\{\mathbf{a}_1, \mathbf{a}_2, \dots, \mathbf{a}_k\}$ 转化为正交单位向量组 $\{\mathbf{q}_1, \mathbf{q}_2, \dots, \mathbf{q}_k\}$：

**第一步**：

$$\mathbf{q}_1 = \frac{\mathbf{a}_1}{\|\mathbf{a}_1\|}$$

**第二步**：

$$\boldsymbol{\eta}_2 = \mathbf{a}_2 - (\mathbf{q}_1\mathbf{q}_1^T)\mathbf{a}_2, \quad \mathbf{q}_2 = \frac{\boldsymbol{\eta}_2}{\|\boldsymbol{\eta}_2\|}$$

**第三步**：

$$\boldsymbol{\eta}_3 = \mathbf{a}_3 - (\mathbf{q}_1\mathbf{q}_1^T)\mathbf{a}_3 - (\mathbf{q}_2\mathbf{q}_2^T)\mathbf{a}_3, \quad \mathbf{q}_3 = \frac{\boldsymbol{\eta}_3}{\|\boldsymbol{\eta}_3\|}$$

**一般步骤**：

$$\boldsymbol{\eta}_j = \mathbf{a}_j - \sum_{i=1}^{j-1}(\mathbf{q}_i\mathbf{q}_i^T)\mathbf{a}_j, \quad \mathbf{q}_j = \frac{\boldsymbol{\eta}_j}{\|\boldsymbol{\eta}_j\|}$$

其中 $\mathbf{q}_i\mathbf{q}_i^T$ 是向 $\mathbf{q}_i$ 方向的投影矩阵。

### 9.5 QR 分解

任意 $A \in \mathbb{R}^{m \times n}$（列满秩）可分解为：

$$A = QR$$

- $Q \in \mathbb{R}^{m \times n}$：列正交归一矩阵，$Q^TQ = I_n$
- $R \in \mathbb{R}^{n \times n}$：上三角矩阵

## 第二轮：推导与证明

### 推导1：Gram-Schmidt 的正交性验证

**$\mathbf{q}_1^T\mathbf{q}_2 = 0$**：

$$\mathbf{q}_1^T\boldsymbol{\eta}_2 = \mathbf{q}_1^T\mathbf{a}_2 - \mathbf{q}_1^T(\mathbf{q}_1\mathbf{q}_1^T)\mathbf{a}_2 = \mathbf{q}_1^T\mathbf{a}_2 - (\mathbf{q}_1^T\mathbf{q}_1)(\mathbf{q}_1^T\mathbf{a}_2) = \mathbf{q}_1^T\mathbf{a}_2 - 1\cdot\mathbf{q}_1^T\mathbf{a}_2 = 0$$

### 推导2：QR 分解的构造

由 Gram-Schmidt 过程，$\mathbf{a}_j = \sum_{i=1}^{j} r_{ij}\mathbf{q}_i$，其中 $r_{ij} = \mathbf{q}_i^T\mathbf{a}_j$。

写成矩阵形式 $A = QR$，$R$ 的元素：

$$R_{ij} = \begin{cases} \mathbf{q}_i^T\mathbf{a}_j & i \leq j \\ 0 & i > j \end{cases}$$

### 推导3：正交变换保持距离

$$\|Q\mathbf{x}\|^2 = (Q\mathbf{x})^T(Q\mathbf{x}) = \mathbf{x}^TQ^TQ\mathbf{x} = \mathbf{x}^T\mathbf{x} = \|\mathbf{x}\|^2$$

---
