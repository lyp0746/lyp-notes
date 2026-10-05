---
title: "线性代数不难 · 第15章 图论基础与 Laplacian 矩阵"
tags: [数学, 线性代数, 读书笔记]
created: "2026-10-06"
type: literature
summary: "线性代数不难 第15章 图论基础与 Laplacian 矩阵 详解（含推导与直觉）。"
---

# 第15章 图论基础与 Laplacian 矩阵

## 第一轮：核心概念

### 15.1 图的定义

无向图 $G=(V,E)$：
- $V$：节点集合，$|V|=n$
- $E$：边集合，$e=\{u,v\}\in E$ 表示 $u,v$ 相连

有向图：边有方向，$e=(u,v)$ 表示从 $u$ 到 $v$。

加权图 $G=(V,E,w)$：边有权重函数 $w:E\to\mathbb{R}^+$。

### 15.2 邻接矩阵

**无向图**的邻接矩阵 $A\in\mathbb{R}^{n\times n}$：

$$A_{ij} = \begin{cases} 1 & \text{若 } \{i,j\}\in E \\ 0 & \text{否则} \end{cases}$$

无向图：$A = A^T$（对称矩阵）。

**有向图**的邻接矩阵：

$$A_{ij} = \begin{cases} 1 & \text{若 } (i,j)\in E \\ 0 & \text{否则} \end{cases}$$

有向图：$A \ne A^T$（一般非对称）。

**加权图**的邻接矩阵：$A_{ij} = w(i,j)$（权重代替 0/1）。

示例（4 节点无向图）：

$$A = \begin{bmatrix} 0 & 1 & 1 & 1 \\ 1 & 0 & 1 & 0 \\ 1 & 1 & 0 & 1 \\ 1 & 0 & 1 & 0 \end{bmatrix}$$

### 15.3 度与度矩阵

节点 $i$ 的度 $d_i$：与 $i$ 相连的边数。

$$d_i = \sum_{j=1}^n A_{ij}$$

用全 1 向量 $\mathbf{1}$ 计算：

$$A\mathbf{1} = \begin{bmatrix} d_1 \\ d_2 \\ \vdots \\ d_n \end{bmatrix}$$

度矩阵 $D$：

$$D = \operatorname{diag}(d_1, d_2, \dots, d_n) = \begin{bmatrix} d_1 & & \\ & \ddots & \\ & & d_n \end{bmatrix}$$

对上述示例：

$$D = \begin{bmatrix} 3 & 0 & 0 & 0 \\ 0 & 2 & 0 & 0 \\ 0 & 0 & 3 & 0 \\ 0 & 0 & 0 & 2 \end{bmatrix}$$

### 15.4 图 Laplacian 矩阵

$$L = D - A$$

对上述示例：

$$L = \begin{bmatrix} 3 & -1 & -1 & -1 \\ -1 & 2 & -1 & 0 \\ -1 & -1 & 3 & -1 \\ -1 & 0 & -1 & 2 \end{bmatrix}$$

**性质**：
- $L$ 是对称半正定矩阵
- 行和为零：$L\mathbf{1}=\mathbf{0}$，即 $\lambda_1=0$ 是特征值
- 连通图：$\lambda_1=0$ 的重数为 1（即零空间一维，由 $\mathbf{1}$ 张成）
- $\lambda_2>0$ 当且仅当图连通

### 15.5 归一化 Laplacian

$$L_{\text{norm}} = D^{-1/2}LD^{-1/2} = I - D^{-1/2}AD^{-1/2}$$

其中 $D^{-1/2} = \operatorname{diag}(d_1^{-1/2}, \dots, d_n^{-1/2})$。

**性质**：
- $L_{\text{norm}}$ 对称半正定
- 特征值 $0 \le \lambda_i \le 2$
- $\lambda_1=0$ 对应特征向量 $D^{1/2}\mathbf{1}$

### 15.6 谱聚类

对 $L_{\text{norm}}$ 做特征值分解：

$$L_{\text{norm}}\mathbf{v}_i = \lambda_i\mathbf{v}_i, \quad 0 = \lambda_1 \le \lambda_2 \le \cdots \le \lambda_n$$

**Fiedler 向量**：$\mathbf{v}_2$（对应 $\lambda_2$ 的特征向量）。

二分聚类规则：

$$\text{类}_1 = \{i : v_{2,i} > 0\}, \quad \text{类}_2 = \{i : v_{2,i} < 0\}$$

几何直觉：$\mathbf{v}_2$ 沿图的最优切割方向将节点分为两社区。

**推广**：取前 $k$ 个特征向量 $\mathbf{v}_1,\dots,\mathbf{v}_k$，将节点映射到 $\mathbb{R}^k$，再对行向量做 $k$-means 聚类。

### 15.7 图的嵌入与可视化

将节点嵌入 $\mathbb{R}^2$：$\text{pos}: V \to \mathbb{R}^2$。

弹簧布局（spring layout）：将边视为弹簧，节点受力平衡后确定位置，等价于最小化能量函数：

$$E = \sum_{\{i,j\}\in E} \|\text{pos}(i) - \text{pos}(j)\|^2$$

## 第二轮：推导与证明

### 推导1：Laplacian 矩阵的二次型

$$\mathbf{x}^T L \mathbf{x} = \mathbf{x}^T(D-A)\mathbf{x} = \sum_{i=1}^n d_i x_i^2 - \sum_{i,j} A_{ij}x_i x_j = \sum_{\{i,j\}\in E}(x_i - x_j)^2$$

**证明**：

$$\sum_{\{i,j\}\in E}(x_i-x_j)^2 = \frac{1}{2}\sum_{i,j}A_{ij}(x_i-x_j)^2 = \frac{1}{2}\sum_{i,j}A_{ij}(x_i^2 - 2x_ix_j + x_j^2)$$

$$= \frac{1}{2}\left(\sum_i d_i x_i^2 + \sum_j d_j x_j^2 - 2\sum_{i,j}A_{ij}x_ix_j\right) = \sum_i d_i x_i^2 - \sum_{i,j}A_{ij}x_ix_j = \mathbf{x}^T(D-A)\mathbf{x}$$

**推论**：$\mathbf{x}^TL\mathbf{x} \ge 0$，故 $L$ 半正定。

### 推导2：$\lambda_2$ 与连通性

**定理**：$\lambda_2(L) > 0$ 当且仅当 $G$ 连通。

**证明思路**：
- $\lambda_1=0$，$\mathbf{v}_1=\mathbf{1}/\sqrt{n}$（归一化全 1 向量）
- $\lambda_2 = \min_{\mathbf{x}\perp\mathbf{1}} \frac{\mathbf{x}^TL\mathbf{x}}{\mathbf{x}^T\mathbf{x}} = \min_{\mathbf{x}\perp\mathbf{1}} \frac{\sum_{\{i,j\}\in E}(x_i-x_j)^2}{\sum_i x_i^2}$
- 若 $G$ 不连通，存在 $\mathbf{x}\perp\mathbf{1}$ 使得同一连通分量内 $x_i$ 相同，不同分量间 $x_i$ 不同，此时 $\sum(x_i-x_j)^2=0$（无边跨分量），故 $\lambda_2=0$
- 若 $G$ 连通，$\mathbf{x}\perp\mathbf{1}$ 意味着 $\mathbf{x}$ 非常向量，必有某边 $(i,j)$ 使 $x_i\ne x_j$，故 $\lambda_2>0$

### 推导3：Cheeger 不等式

图的最优切割（cut）：

$$h(G) = \min_{S\subset V} \frac{|\partial S|}{\min(|S|, |V\setminus S|)}$$

其中 $|\partial S|$ 是跨 $S$ 与 $V\setminus S$ 的边数。

**Cheeger 不等式**：

$$\frac{\lambda_2}{2} \le h(G) \le \sqrt{2\lambda_2}$$

**意义**：$\lambda_2$ 越大，图越"不可分割"（expander）；$\lambda_2$ 越小，图有明显的社区结构。

### 推导4：归一化 Laplacian 的二次型

$$\mathbf{x}^T L_{\text{norm}} \mathbf{x} = \sum_{\{i,j\}\in E} \left(\frac{x_i}{\sqrt{d_i}} - \frac{x_j}{\sqrt{d_j}}\right)^2$$

令 $\mathbf{y} = D^{1/2}\mathbf{x}$，则：

$$\mathbf{y}^T L \mathbf{y} = \sum_{\{i,j\}\in E}(y_i - y_j)^2$$

归一化消除了度数差异的影响，使高度节点和低度节点在谱分析中权重更均衡。

### 推导5：$A^k$ 的图论意义

$(A^k)_{ij}$ = 从节点 $i$ 到节点 $j$ 长度为 $k$ 的路径数目。

**证明**（归纳法）：
- $k=1$：$A_{ij}$ 直接表示有无边
- $k\to k+1$：$(A^{k+1})_{ij} = \sum_l (A^k)_{il}A_{lj}$，即所有经过中间节点 $l$ 的长度 $k+1$ 路径数之和

---

# 附录

## A. 知识脉络

```
一维数组（向量）
  │
  ├── 二维数组（矩阵）── 矩阵乘法 ── 线性变换
  │       │                              │
  │       ├── 行列式                     ├── 特征值/特征向量
  │       ├── 逆矩阵                     ├── 正交化（Gram-Schmidt）
  │       └── 秩                         └── PCA
  │
  ├── 线性方程组 ── 最小二乘 ── 伪逆
  │
  ├── 二次型 ── Cholesky ── Rayleigh 商
  │
  └── 图论 ── 邻接矩阵 ── 度矩阵 ── Laplacian ── 谱聚类
```

## B. 核心公式速查

| 主题 | 公式 |
|------|------|
| 矩阵乘法 | $(AB)_{ij}=\sum_k A_{ik}B_{kj}$ |
| 行列式（展开） | $\det(A)=\sum_j(-1)^{i+j}a_{ij}M_{ij}$ |
| 逆矩阵 | $A^{-1}=\frac{1}{\det A}\operatorname{adj}(A)$ |
| 秩-零化度 | $\operatorname{rank}(A)+\operatorname{nullity}(A)=n$ |
| Cramer 法则 | $x_j=\det(A_j)/\det(A)$ |
| 特征方程 | $\det(A-\lambda I)=0$ |
| Gram-Schmidt | $\mathbf{q}_k=(\mathbf{v}_k-\sum_{i<k}\langle\mathbf{v}_k,\mathbf{q}_i\rangle\mathbf{q}_i)/\|\cdot\|$ |
| PCA 投影 | $Z=XW$，$W$ 为协方差阵特征向量 |
| SVD | $A=U\Sigma V^T$ |
| 伪逆 | $A^+=V\Sigma^+U^T$ |
| Cholesky | $A=LL^T$（$A$ 正定） |
| Rayleigh 商 | $R(\mathbf{x})=\mathbf{x}^TA\mathbf{x}/(\mathbf{x}^T\mathbf{x})$ |
| Laplacian | $L=D-A$，$\mathbf{x}^TL\mathbf{x}=\sum_{\{i,j\}\in E}(x_i-x_j)^2$ |
| 归一化 Laplacian | $L_{\text{norm}}=D^{-1/2}LD^{-1/2}$ |
| Cheeger 不等式 | $\lambda_2/2 \le h(G) \le \sqrt{2\lambda_2}$ |
| Eckart-Young | $\min_{\operatorname{rank}(B)=k}\|A-B\|_F=\sqrt{\sigma_{k+1}^2+\cdots+\sigma_r^2}$ |

## C. 几何直觉索引

| 概念 | 几何意义 |
|------|----------|
| 行列式 | 线性变换对体积的缩放因子（含符号表示方向） |
| 特征向量 | 变换的不变方向（只缩放不旋转） |
| 正交投影 | 向子空间的垂直投影（最近点） |
| SVD | 旋转→缩放→旋转（正交变换分解） |
| PCA | 找数据方差最大的方向（主轴） |
| Gram-Schmidt | 逐个剥离分量，构造正交基 |
| 二次型 | 超椭圆/超双曲面的等值面形状 |
| Rayleigh 商 | 方向向量上的"能量密度" |
| Laplacian 特征值 | 图的"振动频率"（低频=全局结构，高频=局部细节） |
| Fiedler 向量 | 图的最优二分切割方向 |
