---
title: "线性代数不难 · 第13章 二次型、Cholesky 分解与瑞利商"
tags: [数学, 线性代数, 读书笔记]
created: "2026-10-06"
type: literature
summary: "线性代数不难 第13章 二次型、Cholesky 分解与瑞利商 详解（含推导与直觉）。"
---

# 第13章 二次型、Cholesky 分解与瑞利商

## 第一轮：核心概念

### 13.1 二次型

$$f(\mathbf{x}) = \mathbf{x}^TA\mathbf{x} = \sum_{i,j} a_{ij}x_ix_j$$

$A$ 为对称矩阵。二次型的几何图像：
- 正定：椭球面（碗形）
- 不定：马鞍面
- 半正定：退化的椭球（柱面）

### 13.2 正定矩阵

$A$ 正定 $\iff$ $\mathbf{x}^TA\mathbf{x} > 0$ 对所有 $\mathbf{x} \neq \mathbf{0}$

等价条件：
- 所有特征值 $> 0$
- 所有顺序主子式 $> 0$
- 存在 Cholesky 分解 $A = LL^T$

### 13.3 Cholesky 分解

对称正定矩阵 $A$ 可唯一分解为：

$$A = LL^T$$

其中 $L$ 是下三角矩阵，对角线元素为正。

$$L = \begin{bmatrix} l_{11} & 0 & \cdots & 0 \\ l_{21} & l_{22} & \cdots & 0 \\ \vdots & \vdots & \ddots & \vdots \\ l_{n1} & l_{n2} & \cdots & l_{nn} \end{bmatrix}$$

### 13.4 瑞利商

$$R_A(\mathbf{x}) = \frac{\mathbf{x}^TA\mathbf{x}}{\mathbf{x}^T\mathbf{x}}, \quad \mathbf{x} \neq \mathbf{0}$$

**极值性质**：

$$\lambda_{\min}(A) \leq R_A(\mathbf{x}) \leq \lambda_{\max}(A)$$

等号在 $\mathbf{x}$ 取对应特征向量时达到。

### 13.5 距离度量

**欧氏距离**：$d(\mathbf{x},\mathbf{y}) = \|\mathbf{x}-\mathbf{y}\|_2$

**马氏距离**：$d_M(\mathbf{x},\mathbf{y}) = \sqrt{(\mathbf{x}-\mathbf{y})^T\Sigma^{-1}(\mathbf{x}-\mathbf{y})}$

马氏距离自动归一化各方向的方差，消除特征间的相关性。

## 第二轮：推导与证明

### 推导1：Cholesky 分解的构造（2×2）

$$A = \begin{bmatrix} a & b \\ b & c \end{bmatrix} = \begin{bmatrix} l_{11} & 0 \\ l_{21} & l_{22} \end{bmatrix}\begin{bmatrix} l_{11} & l_{21} \\ 0 & l_{22} \end{bmatrix}$$

逐元素对应：

$$l_{11} = \sqrt{a},\quad l_{21} = b/l_{11},\quad l_{22} = \sqrt{c - l_{21}^2}$$

要求 $a > 0$ 且 $c - b^2/a > 0$，即 $A$ 正定。

### 推导2：瑞利商极值的证明

将 $\mathbf{x}$ 用 $A$ 的正交特征向量展开：$\mathbf{x}=\sum c_i\mathbf{v}_i$，则

$$R_A(\mathbf{x}) = \frac{\sum\lambda_ic_i^2}{\sum c_i^2}$$

这是 $\lambda_i$ 的加权平均（权重 $c_i^2/\sum c_j^2 \geq 0$，和为 1），故介于 $\lambda_{\min}$ 和 $\lambda_{\max}$ 之间。

### 推导3：马氏距离的几何意义

令 $\mathbf{z} = \Sigma^{-1/2}(\mathbf{x}-\mathbf{y})$，则 $d_M = \|\mathbf{z}\|_2$。

$\Sigma^{-1/2}$ 将数据"白化"：高方差方向压缩，低方差方向拉伸，使各方向方差归一化后计算欧氏距离。

### 推导4：二次型与特征值的关系

对 $A = V\Lambda V^T$，令 $\mathbf{y} = V^T\mathbf{x}$：

$$\mathbf{x}^TA\mathbf{x} = \mathbf{y}^T\Lambda\mathbf{y} = \sum_{i=1}^{n}\lambda_i y_i^2$$

在特征向量坐标系下，二次型是对角化的——各方向独立贡献 $\lambda_i y_i^2$。

---
