---
title: "矩阵力量 · 第22章 Hilbert空间初步"
tags: [数学, 读书笔记]
created: "2026-10-05"
type: literature
summary: "矩阵力量 第22章 Hilbert空间初步 伴读（3 轮）。"
---

# 第22章 Hilbert空间初步 —— 无穷维的线性代数

## 📘 本节概览

Hilbert空间是完备内积空间——无穷维的"欧氏空间"。有限维线性代数的许多结论在此成立，但关键区别：无穷维中闭有界≠紧。

## 📐 1. Hilbert空间的定义

完备内积空间 $H$：内积 $\langle \cdot,\cdot\rangle$ + Cauchy序列收敛（完备性）。

例：$\ell^2 = \{(x_n) : \sum |x_n|^2 < \infty\}$（平方可和序列），$L^2[0,1] = \{f : \int_0^1 |f|^2 < \infty\}$（平方可积函数）。

## 📐 2. 投影定理与Riesz表示

**投影定理**：闭子空间 $M \subseteq H$，任何 $\vec{x} \in H$ 可唯一分解 $\vec{x} = \vec{y} + \vec{z}$（$\vec{y} \in M$，$\vec{z} \perp M$）。

**Riesz表示定理**：有界线性泛函 $f \in H^*$ 可唯一表示为 $f(\vec{x}) = \langle \vec{x}, \vec{y}\rangle$（某个 $\vec{y} \in H$）。

> 🔍 **Riesz定理的证明思路**：$\ker f$ 是闭子空间（$f$ 连续）。若 $f\neq0$，取 $\vec{z} \perp \ker f$（投影定理），令 $\vec{y} = \overline{f(\vec{z})}\vec{z}/\|\vec{z}\|^2$，验证 $\langle \vec{x},\vec{y}\rangle = f(\vec{x})$。

## 📐 3. 紧算子与谱定理

**紧算子** $K$：将有界集映射为相对紧集（闭包紧）。在Hilbert空间中，紧算子的谱是**离散的**（0是唯一可能的聚点），非零谱点都是特征值。

**紧自伴算子的谱定理**：$K = \sum_{i=1}^{\infty} \lambda_i \langle \cdot, \vec{e}_i\rangle \vec{e}_i$（$\lambda_i \to 0$）。

> 💡 有限维中所有有界算子都是紧的——所以有限维谱定理是无穷维的特例。无穷维中，恒等算子不是紧的（闭单位球不紧）——这是有限维与无穷维的根本区别。

## 📝 本节要点

1. Hilbert空间=完备内积空间——投影定理和Riesz表示成立。
2. 紧算子有离散谱——类似有限维。一般算子可能有连续谱。
3. 有限维 vs 无穷维的根本区别：闭有界≠紧。

## 🔮 发散性提问

1. **Sobolev空间 $H^s$ 是带导数正则性的Hilbert空间。$H^s$ 的内积如何定义？为什么PDE理论中Sobolev空间比 $L^2$ 更合适？**
2. **非自伴算子的谱定理更复杂——需要考虑伪谱（pseudospectrum）。伪谱如何定义？为什么非正规算子的特征值对扰动极其敏感？**

---

---

### 🤔 问题 1：Sobolev空间

$H^s(\mathbb{R}^n) = \{f \in L^2 : (1+|\xi|^2)^{s/2}\hat{f} \in L^2\}$（$\hat{f}$ 是Fourier变换）。内积：$\langle f,g\rangle_{H^s} = \int (1+|\xi|^2)^s \hat{f}(\xi)\overline{\hat{g}(\xi)}\,d\xi$。$s$ 是"导数阶数"——$s=k$（整数）时等价于 $f$ 及其直到 $k$ 阶弱导数都在 $L^2$ 中。

PDE中Sobolev空间更合适的原因：(1) **嵌入定理**：$H^s \hookrightarrow C^k$（$s > n/2+k$）——足够高的Sobolev正则性→连续性；(2) **紧嵌入**：$H^{s_1} \hookrightarrow H^{s_2}$（$s_1>s_2$）是紧的——Rellich-Kondrachov定理，这是PDE解的存在性证明的关键；(3) **对偶性**：$H^{-s} = (H^s)^*$——负阶Sobolev空间包含分布（如Dirac $\delta$）。

### 🤔 问题 2：伪谱

$\varepsilon$-伪谱：$\sigma_\varepsilon(A) = \{\lambda \in \mathbb{C} : \|(A-\lambda I)^{-1}\| > 1/\varepsilon\} = \bigcup_{\|E\|<\varepsilon} \sigma(A+E)$。伪谱=所有 $\varepsilon$-扰动下可能的特征值。

非正规算子（$AA^* \neq A^*A$）的特征值对扰动极其敏感：$\|A\vec{v}-\lambda\vec{v}\| \leq \varepsilon\|\vec{v}\|$ 不保证 $|\lambda - \lambda_j| \leq C\varepsilon$（$C$ 可能极大）。例：Toeplitz矩阵 $\begin{pmatrix} 0 & 1 & & \\ & 0 & \ddots & \\ & & \ddots & 1 \\ \varepsilon & & & 0 \end{pmatrix}$——特征值从0突变到 $\varepsilon^{1/n}$-单位根（$|\cdot|=\varepsilon^{1/n}$，$\varepsilon$ 小但 $\varepsilon^{1/n}$ 不小）。

---

---

> **提问**：全书总结

# 矩阵力量 —— 全书主线与数学地图

## 🗺️ 全书结构

| 部分 | 章节 | 核心概念 | 数学主线 |
|------|------|----------|----------|
| 基础 | 1-2 | 向量、矩阵 | 对象与运算 |
| 核心 | 3-9 | 乘法、行列式、逆、空间、变换、方程、特征值 | 结构与不变量 |
| 分解 | 10-14 | LU、QR、EVD、SVD、四大比较 | 分解母题 |
| 应用 | 15-18 | 回归、二次型、投影、最小二乘 | 投影与优化 |
| 高级 | 19-22 | 微积分、指数、函数、Hilbert | 无穷维推广 |

## 🔗 三大母题的贯穿

1. **分解**：EVD（$A=P\Lambda P^{-1}$）、SVD（$A=U\Sigma V^T$）、谱分解（$A=\sum\lambda_i P_i$）、QR（$A=QR$）——将复杂对象分解为简单组件。
2. **不变量**：秩、迹、行列式、特征值——相似变换下不变，刻画变换的内在性质。
3. **对偶**：行空间↔列空间、$A$↔$A^T$、$V$↔$V^*$、内积↔Riesz表示——两个视角的等价描述。

## 💡 核心洞见

1. **矩阵=线性变换的数值表示**——选择基→矩阵，换基→相似变换，内在性质=不变量。
2. **SVD是最普适的分解**——对任何矩阵都存在，同时给出四个子空间的正交基。
3. **正定=能量有下界**——优化、动力系统、概率的交汇点。
4. **有限维是无穷维的特例**——Hilbert空间理论"修复"了大部分有限维结论，但紧性是关键区别。

## 🔮 终极发散

1. **线性代数与微分几何的交汇在哪里？切空间是线性空间，切映射是线性映射——矩阵力量如何服务于流形上的分析？**
2. **矩阵力量与数学要素的交汇在哪里？微积分中的"导数是线性映射"如何将两本书统一？**
3. **线性代数是"线性"的理论。但非线性问题无处不在——线性代数如何服务于非线性世界？迭代线性化（Newton法）的哲学是什么？**

---
