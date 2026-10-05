---
title: "机器学习 · 第9章 PCA与降维"
tags: [数学, 读书笔记]
created: "2026-10-05"
type: literature
summary: "机器学习 第9章 PCA与降维 伴读（2 轮）。"
---

# 第9章 PCA与降维 —— 协方差矩阵的特征分解

## 📘 本节概览

PCA=协方差矩阵的特征分解。主成分=最大方差方向=最小重构误差方向=最佳低维逼近。

## 📐 1. 最大方差推导

**目标**：$\max_{\|\vec{w}\|=1} \vec{w}^T\Sigma\vec{w}$

> 🔍 **推导**：Lagrange函数 $L = \vec{w}^T\Sigma\vec{w} - \lambda(\vec{w}^T\vec{w}-1)$。$\partial L/\partial\vec{w} = 2\Sigma\vec{w} - 2\lambda\vec{w} = 0$→$\Sigma\vec{w} = \lambda\vec{w}$。**主成分=协方差矩阵的特征向量**，方差=特征值。

## 📐 2. 最小重构误差推导

**目标**：$\min \sum_i \|\vec{x}_i - P_k\vec{x}_i\|^2$（$P_k$ 是到前 $k$ 个主成分的投影）

> 🔍 **推导**：重构误差 $= \sum\|\vec{x}_i\|^2 - \sum\|P_k\vec{x}_i\|^2 = \text{tr}(\Sigma) - \sum_{i=1}^k \lambda_i = \sum_{i=k+1}^d \lambda_i$。最小化误差=最大化 $\sum_{i=1}^k \lambda_i$→选最大的 $k$ 个特征值。

> 💡 最大方差 ⟺ 最小重构误差——两个视角给出相同的特征向量。

## 📐 3. SVD与PCA的关系

数据矩阵 $X$（中心化），$X = U\Sigma V^T$。则 $\Sigma_{cov} = X^TX/n = V(\Sigma^T\Sigma/n)V^T$——PCA的特征向量=SVD的右奇异向量，特征值=$\sigma_i^2/n$。

## 📐 4. 核PCA

在特征空间 $\phi(\vec{x})$ 中做PCA→协方差矩阵的特征方程→用核矩阵 $K$ 代替→$\alpha K = \lambda \alpha$——核PCA=核矩阵的特征分解。

## 📝 本节要点

1. PCA=协方差矩阵特征分解——最大方差=最小重构误差。
2. SVD与PCA等价——数值上SVD更稳定。
3. 核PCA=核矩阵特征分解——非线性降维。

## 🔮 发散性提问

1. **PCA假设数据分布的主方向是线性的。当数据在弯曲流形上时，PCA会怎样？**
2. **PCA对异常值敏感——为什么？Robust PCA如何改进？**

如果你准备好了，请说 **"下一节"**，我将继续讲解 **第10章：聚类**。

---

---

### 🤔 问题 1：流形上的PCA

PCA找全局最大方差方向——对弯曲流形，这个方向可能"穿过"流形外部。例：Swiss roll数据——PCA将3D数据投影到2D平面，但正确的展开是"展开卷筒"（非线性）。Isomap/t-SNE/UMAP保留局部邻域结构→正确展开流形。

### 🤔 问题 2：Robust PCA

PCA对异常值敏感：协方差矩阵 $= \frac{1}{n}\sum\vec{x}_i\vec{x}_i^T$——单个异常值（$\|\vec{x}_i\|$ 很大）对协方差贡献巨大→主成分被异常值主导。Robust PCA：$\min \|L\|_* + \lambda\|S\|_1$ s.t. $X = L + S$（$L$=低秩，$S$=稀疏异常）。核范数 $\|L\|_*$ 是秩的凸松弛，$\|S\|_1$ 是稀疏性的凸松弛→凸优化→全局最优。

---

---
