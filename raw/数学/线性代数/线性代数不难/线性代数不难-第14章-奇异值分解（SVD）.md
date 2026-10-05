---
title: "线性代数不难 · 第14章 奇异值分解（SVD）"
tags: [数学, 线性代数, 读书笔记]
created: "2026-10-06"
type: literature
summary: "线性代数不难 第14章 奇异值分解（SVD） 详解（含推导与直觉）。"
---

# 第14章 奇异值分解（SVD）

## 第一轮：核心定理与构造

### 14.1 SVD 定理

任意 $A \in \mathbb{R}^{m\times n}$（秩 $r$）可分解为：

$$A = U\Sigma V^T$$

- $U \in \mathbb{R}^{m\times m}$：左奇异向量矩阵（$AA^T$ 的特征向量），正交矩阵
- $\Sigma \in \mathbb{R}^{m\times n}$：奇异值矩阵，$\sigma_1\ge\sigma_2\ge\cdots\ge\sigma_r>0$，其余为 0
- $V \in \mathbb{R}^{n\times n}$：右奇异向量矩阵（$A^TA$ 的特征向量），正交矩阵

### 14.2 从 Gram 矩阵构造 SVD

**Step 1**：计算 $A^TA$，特征值分解得 $V$ 和 $\lambda_i$

**Step 2**：奇异值 $\sigma_i = \sqrt{\lambda_i}$

**Step 3**：计算 $AA^T$，特征值分解得 $U$

**Step 4**：验证 $A = U\Sigma V^T$

**示例**：$A = \begin{bmatrix} 0 & 1 \\ 1 & 1 \\ 1 & 0 \end{bmatrix}$

$A^TA = \begin{bmatrix} 2 & 1 \\ 1 & 2 \end{bmatrix}$，特征值 $\lambda_1=3, \lambda_2=1$

奇异值 $\sigma_1=\sqrt{3}, \sigma_2=1$

### 14.3 紧凑 SVD

$$A = U_r\Sigma_rV_r^T$$

仅保留非零奇异值对应的部分，$U_r\in\mathbb{R}^{m\times r}$，$\Sigma_r\in\mathbb{R}^{r\times r}$，$V_r\in\mathbb{R}^{n\times r}$

### 14.4 几何角度看 SVD

$A = U\Sigma V^T$ 分解为三步变换：
1. $V^T$：旋转/反射（正交变换）
2. $\Sigma$：沿坐标轴缩放（$\sigma_i$ 倍）
3. $U$：旋转/反射（正交变换）

单位圆 → 椭圆，半轴长度为奇异值。

### 14.5 四种 SVD

| 类型 | 形式 | 说明 |
|------|------|------|
| 完整 SVD | $A = U\Sigma V^T$ | $U$ 为 $m\times m$，$V$ 为 $n\times n$ |
| 紧凑 SVD | $A = U_r\Sigma_rV_r^T$ | 仅保留非零奇异值 |
| 截断 SVD | $A_k = U_k\Sigma_kV_k^T$ | 保留前 $k$ 个奇异值 |
| 外积 SVD | $A = \sum_{i=1}^{r}\sigma_i\mathbf{u}_i\mathbf{v}_i^T$ | 秩1分解之和 |

### 14.6 截断 SVD 与低秩逼近

$$A_k = \sum_{i=1}^{k}\sigma_i\mathbf{u}_i\mathbf{v}_i^T$$

$A_k$ 是 $A$ 的最优秩 $k$ 逼近（Eckart-Young 定理）。

### 14.7 伪逆

$$A^+ = V\Sigma^+U^T,\quad \Sigma^+_{ii} = 1/\sigma_i\;(\sigma_i>0),\;\text{其余为 }0$$

最小二乘解：$\mathbf{x}^* = A^+\mathbf{b}$（最小范数解）

## 第二轮：推导与证明

### 推导1：$A^TA$ 与 $AA^T$ 的关系

若 $A=U\Sigma V^T$，则：

$$A^TA = V\Sigma U^TU\Sigma V^T = V\Sigma^2V^T$$

$$AA^T = U\Sigma V^TV\Sigma U^T = U\Sigma^2U^T$$

两者非零特征值相同（均为 $\sigma_i^2$），特征向量分别为 $V$ 和 $U$ 的列。

### 推导2：奇异值的几何意义

$$\sigma_1 = \max_{\|\mathbf{x}\|=1}\|A\mathbf{x}\| = \|A\|_2 = \sqrt{\lambda_{\max}(A^TA)}$$

$\sigma_1$ 是 $A$ 作为线性算子的最大"放大倍数"。

### 推导3：Eckart-Young 定理

$$\min_{\operatorname{rank}(B)=k}\|A-B\|_F = \sqrt{\sigma_{k+1}^2+\cdots+\sigma_r^2}$$

最优逼近：$A_k = \sum_{i=1}^k\sigma_i\mathbf{u}_i\mathbf{v}_i^T$

**证明思路**：利用 SVD 将问题转化为对角矩阵的最优低秩逼近，再由 Weyl 不等式给出下界，截断 SVD 恰好达到下界。

**应用**：图像压缩、降噪、推荐系统。

### 推导4：伪逆的性质

- $AA^+A = A$
- $A^+AA^+ = A^+$
- $(AA^+)^T = AA^+$
- $(A^+A)^T = A^+A$

当 $A$ 列满秩：$A^+ = (A^TA)^{-1}A^T$（左逆）
当 $A$ 行满秩：$A^+ = A^T(AA^T)^{-1}$（右逆）

---
