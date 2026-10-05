---
title: "矩阵力量 · 第12章 特征值分解（EVD）"
tags: [数学, 读书笔记]
created: "2026-10-05"
type: literature
summary: "矩阵力量 第12章 特征值分解（EVD） 伴读（2 轮）。"
---

# 第12章 特征值分解（EVD） —— 矩阵的"DNA"

## 📘 本节概览

EVD $A = P\Lambda P^{-1}$ 将矩阵分解为特征向量×特征值×特征向量逆——这是矩阵最核心的结构分解。对称矩阵的EVD退化为正交对角化 $A = Q\Lambda Q^T$（谱定理）。

## 📐 1. EVD的推导

$A\vec{v}_i = \lambda_i \vec{v}_i$ 对所有 $i$，写成矩阵形式：$AP = P\Lambda$（$P$ 的列是特征向量，$\Lambda$ 是特征值对角矩阵）。若 $P$ 可逆（$n$ 个线性无关特征向量），则 $A = P\Lambda P^{-1}$。

**函数计算**：$f(A) = Pf(\Lambda)P^{-1}$——矩阵函数化为标量函数。例：$A^k = P\Lambda^k P^{-1}$，$e^A = Pe^\Lambda P^{-1}$。

## 📐 2. 对称矩阵的谱定理

**实对称矩阵**：$A = Q\Lambda Q^T = \sum_{i=1}^n \lambda_i \vec{q}_i\vec{q}_i^T$

> 🔍 **证明思路**：(1) 特征值全实：$\lambda = \vec{v}^HA\vec{v}/\vec{v}^H\vec{v}$，$A$ 实对称→$\lambda$ 实；(2) 不同特征值的特征向量正交；重根时Gram-Schmidt正交化；(3) 归纳法：在 $\vec{q}_1^\perp$ 上限制 $A$→更小对称矩阵。

**谱分解**：$A = \sum \lambda_i P_i$（$P_i = \vec{q}_i\vec{q}_i^T$ 是正交投影到第 $i$ 个特征空间的投影矩阵）。

> 💡 从数学地图视角，谱定理是**分解**和**不变量**两大母题的交汇：特征值是不变量，谱分解是分解。

## 📝 本节要点

1. EVD $A=P\Lambda P^{-1}$：矩阵函数化为标量函数。
2. 谱定理：对称矩阵=正交投影的加权和——证明用归纳法。
3. 可对角化 ⟺ 几何重数=代数重数。

## 🔮 发散性提问

1. **Jordan标准形 $A=PJP^{-1}$ 是不可对角化矩阵的"最接近对角化"形式。Jordan块 $J_k(\lambda)$ 对 $A^k$ 的行为有什么影响？为什么Jordan块导致多项式增长而非指数增长？**
2. **Cayley-Hamilton定理：$p(A)=0$（$p$ 是特征多项式）。如何从EVD推导Cayley-Hamilton？不可对角化时如何推广？**

如果你准备好了，请说 **"下一节"**，我将继续讲解 **第13章：SVD分解**。

---

---

### 🤔 问题 1：Jordan块与$A^k$

Jordan块 $J_k(\lambda) = \lambda I + N$（$N$ 是幂零：$N^k=0$）。$J_k(\lambda)^n = (\lambda I + N)^n = \sum_{j=0}^{k-1}\binom{n}{j}\lambda^{n-j}N^j$——多项式×指数。所以 $A^k$ 的增长由 $|\lambda_{\max}|^k$（指数）和 $k^{m-1}$（多项式，$m$ 是最大Jordan块大小）共同决定。Jordan块越大→多项式因子越高→"暂态"越长。

### 🤔 问题 2：Cayley-Hamilton

可对角化时：$p(A) = Pp(\Lambda)P^{-1} = 0$（因为 $p(\lambda_i)=0$ 对所有 $i$）。不可对角化时：用稠密性论证——可对角化矩阵在所有矩阵中稠密，$p$ 连续→$p(A)=0$ 对所有 $A$ 成立。或直接用Jordan标准形：每个Jordan块满足 $p(J_k(\lambda))=0$（因为 $p(\lambda)=0$ 且 $p'(\lambda)=0$ 等，由特征多项式的重根性质）。

---

---
