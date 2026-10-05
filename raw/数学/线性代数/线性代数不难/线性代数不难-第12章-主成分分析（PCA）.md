---
title: "线性代数不难 · 第12章 主成分分析（PCA）"
tags: [数学, 线性代数, 读书笔记]
created: "2026-10-06"
type: literature
summary: "线性代数不难 第12章 主成分分析（PCA） 详解（含推导与直觉）。"
---

# 第12章 主成分分析（PCA）

## 第一轮：核心概念

### 12.1 数据矩阵

$$X = \begin{bmatrix} \mathbf{x}_1^T \\ \mathbf{x}_2^T \\ \vdots \\ \mathbf{x}_n^T \end{bmatrix} \in \mathbb{R}^{n \times p}$$

$n$ 个样本，$p$ 个特征。中心化：$X_c = X - \mathbf{1}\bar{\mathbf{x}}^T$

### 12.2 协方差矩阵

$$\Sigma = \frac{1}{n-1}X_c^TX_c \in \mathbb{R}^{p \times p}$$

$\Sigma$ 是对称半正定矩阵，对角线为各特征方差，非对角线为协方差。

### 12.3 PCA 的数学表述

**目标**：找方向 $\mathbf{w}$（$\|\mathbf{w}\|=1$），使投影后方差最大：

$$\max_{\|\mathbf{w}\|=1} \mathbf{w}^T\Sigma\mathbf{w}$$

**解**：$\mathbf{w} = \mathbf{v}_1$（$\Sigma$ 的最大特征值对应的特征向量）

### 12.4 PCA 步骤

1. 中心化数据 $X_c$
2. 计算协方差矩阵 $\Sigma = \frac{1}{n-1}X_c^TX_c$
3. 对 $\Sigma$ 做特征值分解：$\Sigma = V\Lambda V^T$
4. 取前 $k$ 个特征向量 $V_{:,1:k}$
5. 降维：$Z = X_c V_{:,1:k} \in \mathbb{R}^{n \times k}$

### 12.5 椭圆视角

$\Sigma$ 的等值线 $\mathbf{x}^T\Sigma^{-1}\mathbf{x} = c$ 是椭圆：
- 椭圆主轴方向 = 特征向量方向
- 主轴长度 $\propto \sqrt{\lambda_i}$

PCA 即选择椭圆长轴方向为第一主成分。

## 第二轮：推导与证明

### 推导1：PCA 目标函数的推导

投影后方差：

$$\text{Var}(\mathbf{w}^T\mathbf{x}) = \mathbf{w}^T\Sigma\mathbf{w}$$

约束 $\|\mathbf{w}\|=1$，用 Lagrange 乘子：

$$\mathcal{L} = \mathbf{w}^T\Sigma\mathbf{w} - \lambda(\mathbf{w}^T\mathbf{w}-1)$$

$$\frac{\partial\mathcal{L}}{\partial\mathbf{w}} = 2\Sigma\mathbf{w} - 2\lambda\mathbf{w} = \mathbf{0} \Rightarrow \Sigma\mathbf{w} = \lambda\mathbf{w}$$

最优 $\mathbf{w}$ 是 $\Sigma$ 的特征向量，方差为对应特征值 $\lambda$。取最大特征值即得第一主成分。

### 推导2：方差解释比

第 $i$ 个主成分解释的方差比例：

$$\frac{\lambda_i}{\sum_{j=1}^{p}\lambda_j}$$

前 $k$ 个主成分的累计方差解释比：$\frac{\sum_{i=1}^{k}\lambda_i}{\sum_{j=1}^{p}\lambda_j}$

### 推导3：PCA 与 SVD 的关系

$$X_c = U\Sigma V^T$$

则 $\frac{1}{n-1}X_c^TX_c = V\frac{\Sigma^2}{n-1}V^T$

PCA 的特征向量 = SVD 的右奇异向量 $V$，PCA 的特征值 = $\sigma_i^2/(n-1)$。

---
