---
title: "托马斯微积分 · 附录A 实数与实线"
tags: [数学, 读书笔记]
created: "2026-10-01"
type: literature
summary: "托马斯微积分 附录A 实数与实线 伴读（讲解 + 问答）。"
---

# 附录A 实数与实线

> 本附录回顾微积分的基础：实数系、实线、数学归纳法、直线与圆、抛物线、三角公式、极限定理的证明等。
>
> 这些内容是微积分严格性的根基。虽然前面的章节已经大量使用了实数、极限、不等式等概念，但这里要把它们系统化，为后续学习打下坚实基础。
>
> 本附录核心：实数的性质、实线的完备性、数学归纳法、直线与圆、抛物线、三角公式、极限定理的证明。
>

## A.1 实数与实线

### 实数系

**实数**是微积分的基本研究对象。实数系 $\mathbb{R}$ 由以下数集组成：

- **自然数** $\mathbb{N}=\{1,2,3,\dots\}$
- **整数** $\mathbb{Z}=\{\dots,-2,-1,0,1,2,\dots\}$
- **有理数** $\mathbb{Q}=\left\{\frac{p}{q}: p,q\in\mathbb{Z},\ q\neq 0\right\}$
- **无理数**：不能表示为两个整数之比的实数，如 $\sqrt{2}$、$\pi$、$e$

**实数 = 有理数 ∪ 无理数**

### 实数的性质

实数系 $\mathbb{R}$ 满足以下公理：

**域公理**（加法与乘法）：

1. **交换律**：$a+b=b+a$，$ab=ba$
2. **结合律**：$(a+b)+c=a+(b+c)$，$(ab)c=a(bc)$
3. **分配律**：$a(b+c)=ab+ac$
4. **单位元**：$a+0=a$，$a\cdot 1=a$
5. **逆元**：$a+(-a)=0$，$a\cdot a^{-1}=1$（$a\neq 0$）

**序公理**：

1. **三歧性**：对任意 $a,b$，$a<b$、$a=b$、$a>b$ 恰有一个成立
2. **传递性**：若 $a<b$ 且 $b<c$，则 $a<c$
3. **加法保序**：若 $a<b$，则 $a+c<b+c$
4. **乘法保序**：若 $a<b$ 且 $c>0$，则 $ac<bc$

**完备性公理**（最重要的）：

> 任何非空有上界的实数集必有最小上界（上确界）。
>

这是实数系与有理数系的本质区别。有理数系不满足完备性：例如集合 $\{x\in\mathbb{Q}: x^2<2\}$ 在 $\mathbb{Q}$ 中有上界但无最小上界。

### 实线

**实线**是实数系的几何表示：一条直线，每点对应一个实数，每个实数对应一点。

**区间**：

| 记号 | 含义 | 图形 |
| --- | --- | --- |
| $(a,b)$ | $a<x<b$ | 开区间 |
| $[a,b]$ | $a\le x\le b$ | 闭区间 |
| $[a,b)$ | $a\le x<b$ | 半开区间 |
| $(a,\infty)$ | $x>a$ | 无穷区间 |
| $(-\infty,b]$ | $x\le b$ | 无穷区间 |

**绝对值**：

$$|x|=
\begin{cases}
x, & x\ge 0\\
-x, & x<0
\end{cases}$$

**绝对值性质**：

1. $|x|\ge 0$
2. $|xy|=|x||y|$
3. $|x+y|\le |x|+|y|$（三角不等式）
4. $|x-y|$ 表示 $x$ 与 $y$ 在实线上的距离

### 例1：解绝对值不等式

解 $|2x-3|<5$。

**解**：

$$-5<2x-3<5$$

$$-2<2x<8$$

$$-1<x<4$$

解集为 $(-1,4)$。

### 例2：上确界与下确界

集合 $S=\{x: x^2<2\}$。

- 上界：任何 $\ge\sqrt{2}$ 的数都是上界
- 最小上界（上确界）：$\sup S=\sqrt{2}$
- 下界：任何 $\le-\sqrt{2}$ 的数都是下界
- 最大下界（下确界）：$\inf S=-\sqrt{2}$

注意：$\sqrt{2}\notin S$，但它是 $S$ 的上确界。这体现了实数的完备性。

## A.2 数学归纳法

### 归纳法原理

设 $P(n)$ 是关于正整数 $n$ 的命题。若：

1. **基础步**：$P(1)$ 成立；
2. **归纳步**：若 $P(k)$ 成立，则 $P(k+1)$ 成立；

则 $P(n)$ 对所有正整数 $n$ 成立。

### 例3：证明求和公式

证明

$$1+2+3+\cdots+n=\frac{n(n+1)}{2}$$

**证明**：

- **基础步**：$n=1$，左边 $=1$，右边 $=\frac{1\cdot 2}{2}=1$，成立。
- **归纳步**：假设 $1+2+\cdots+k=\frac{k(k+1)}{2}$。
则 $1+2+\cdots+k+(k+1)
=
\frac{k(k+1)}{2}+(k+1)
=
\frac{(k+1)(k+2)}{2}$ 即 $P(k+1)$ 成立。

由归纳法，命题对所有正整数成立。

### 例4：证明不等式

证明 $2^n>n$ 对所有正整数 $n$ 成立。

**证明**：

- **基础步**：$n=1$，$2^1=2>1$，成立。
- **归纳步**：假设 $2^k>k$。则 $2^{k+1}=2\cdot 2^k>2k\ge k+1$ （因为 $k\ge 1$ 时 $2k\ge k+1$）。

由归纳法，命题成立。

## A.3 直线、圆和抛物线

### 直线

**斜率**：

$$m=\frac{y_2-y_1}{x_2-x_1}$$

**点斜式**：

$$y-y_1=m(x-x_1)$$

**斜截式**：

$$y=mx+b$$

**一般式**：

$$Ax+By+C=0$$

**平行与垂直**：

- 平行：$m_1=m_2$
- 垂直：$m_1m_2=-1$

### 圆

**标准方程**：

$$(x-h)^2+(y-k)^2=r^2$$

圆心 $(h,k)$，半径 $r$。

**一般方程**：

$$x^2+y^2+Dx+Ey+F=0$$

配方后可化为标准形式。

### 抛物线

**标准形式**：

$$y=ax^2+bx+c$$

**顶点形式**：

$$y=a(x-h)^2+k$$

顶点 $(h,k)$，对称轴 $x=h$。

**开口方向**：

- $a>0$：开口向上
- $a<0$：开口向下

**顶点坐标**：

$$h=-\frac{b}{2a},\quad k=c-\frac{b^2}{4a}$$

### 例5：求圆的方程

求圆心 $(2,-3)$，半径 $5$ 的圆的方程。

**解**：

$$(x-2)^2+(y+3)^2=25$$

### 例6：求抛物线顶点

求 $y=2x^2-8x+5$ 的顶点。

**解**：

$$h=-\frac{-8}{2\cdot 2}=2$$

$$k=2(2)^2-8(2)+5=8-16+5=-3$$

顶点 $(2,-3)$。

## A.4 角公式

### 基本恒等式

**倒数关系**：

$$\csc\theta=\frac{1}{\sin\theta},\quad
\sec\theta=\frac{1}{\cos\theta},\quad
\cot\theta=\frac{1}{\tan\theta}$$

**商关系**：

$$\tan\theta=\frac{\sin\theta}{\cos\theta},\quad
\cot\theta=\frac{\cos\theta}{\sin\theta}$$

**勾股恒等式**：

$$\sin^2\theta+\cos^2\theta=1$$

$$1+\tan^2\theta=\sec^2\theta$$

$$1+\cot^2\theta=\csc^2\theta$$

### 加法公式

$$\sin(A+B)=\sin A\cos B+\cos A\sin B$$

$$\cos(A+B)=\cos A\cos B-\sin A\sin B$$

$$\tan(A+B)=\frac{\tan A+\tan B}{1-\tan A\tan B}$$

### 倍角公式

$$\sin 2\theta=2\sin\theta\cos\theta$$

$$\cos 2\theta=\cos^2\theta-\sin^2\theta=1-2\sin^2\theta=2\cos^2\theta-1$$

### 半角公式

$$\sin^2\theta=\frac{1-\cos 2\theta}{2}$$

$$\cos^2\theta=\frac{1+\cos 2\theta}{2}$$

### 例7：证明恒等式

证明 $\sin^2\theta+\cos^2\theta=1$。

**证明**：在单位圆上，点 $(\cos\theta,\sin\theta)$ 到原点的距离为 $1$，所以

$$\cos^2\theta+\sin^2\theta=1$$

## A.5 极限定理的证明

### 和法则的证明

**定理**：若 $\lim_{x\to c}f(x)=L$，$\lim_{x\to c}g(x)=M$，则

$$\lim_{x\to c}(f(x)+g(x))=L+M$$

**证明**：给定 $\epsilon>0$。

由 $\lim f=L$，存在 $\delta_1>0$，使得

$$0<|x-c|<\delta_1\Rightarrow |f(x)-L|<\frac{\epsilon}{2}$$

由 $\lim g=M$，存在 $\delta_2>0$，使得

$$0<|x-c|<\delta_2\Rightarrow |g(x)-M|<\frac{\epsilon}{2}$$

取 $\delta=\min\{\delta_1,\delta_2\}$。若 $0<|x-c|<\delta$，则

$$|(f(x)+g(x))-(L+M)|
\le |f(x)-L|+|g(x)-M|
<\frac{\epsilon}{2}+\frac{\epsilon}{2}
=\epsilon$$

所以 $\lim(f+g)=L+M$。

### 夹层定理的证明

**定理**：若 $g(x)\le f(x)\le h(x)$ 且 $\lim g=\lim h=L$，则 $\lim f=L$。

**证明**：给定 $\epsilon>0$。

存在 $\delta_1>0$，使得

$$0<|x-c|<\delta_1\Rightarrow |g(x)-L|<\epsilon$$

即 $L-\epsilon<g(x)<L+\epsilon$。

存在 $\delta_2>0$，使得

$$0<|x-c|<\delta_2\Rightarrow |h(x)-L|<\epsilon$$

即 $L-\epsilon<h(x)<L+\epsilon$。

取 $\delta=\min\{\delta_1,\delta_2\}$。若 $0<|x-c|<\delta$，则

$$L-\epsilon<g(x)\le f(x)\le h(x)<L+\epsilon$$

所以 $|f(x)-L|<\epsilon$，即 $\lim f=L$。

## A.6 常见的极限

### 基本极限

$$\lim_{x\to 0}\frac{\sin x}{x}=1$$

$$\lim_{x\to 0}\frac{1-\cos x}{x}=0$$

$$\lim_{x\to 0}\frac{e^x-1}{x}=1$$

$$\lim_{x\to\infty}\left(1+\frac{1}{x}\right)^x=e$$

### 例8：用基本极限求极限

计算 $\displaystyle\lim_{x\to 0}\frac{\sin 3x}{x}$。

**解**：

$$\lim_{x\to 0}\frac{\sin 3x}{x}
=
\lim_{x\to 0}\frac{\sin 3x}{3x}\cdot 3
=
1\cdot 3=3$$

## A.7 实数理论

### 完备性的等价形式

实数系的完备性有以下等价表述：

1. **上确界原理**：任何非空有上界的实数集有上确界。
2. **单调收敛定理**：任何有界单调数列收敛。
3. **柯西收敛准则**：数列收敛当且仅当它是柯西列。
4. **区间套定理**：任何闭区间套有唯一公共点。
5. **聚点定理**：任何有界无限集有聚点。
6. **有限覆盖定理**：闭区间上的任何开覆盖有有限子覆盖。

### 例9：用上确界原理证明单调收敛

设 $\{a_n\}$ 单调递增且有上界。令 $L=\sup\{a_n\}$。则对任意 $\epsilon>0$，存在 $N$ 使得 $a_N>L-\epsilon$。由于单调递增，对 $n>N$ 有 $a_n\ge a_N>L-\epsilon$。又 $a_n\le L$。所以 $|a_n-L|<\epsilon$，即 $a_n\to L$。

## A.8 向量积的分配律

### 分配律

$$\mathbf{a}\times(\mathbf{b}+\mathbf{c})
=
\mathbf{a}\times\mathbf{b}+\mathbf{a}\times\mathbf{c}$$

$$(\mathbf{a}+\mathbf{b})\times\mathbf{c}
=
\mathbf{a}\times\mathbf{c}+\mathbf{b}\times\mathbf{c}$$

### 证明思路

用分量形式展开：

$$\mathbf{a}=\langle a_1,a_2,a_3\rangle,\quad
\mathbf{b}=\langle b_1,b_2,b_3\rangle,\quad
\mathbf{c}=\langle c_1,c_2,c_3\rangle$$

则

$$\mathbf{a}\times(\mathbf{b}+\mathbf{c})
=
\begin{vmatrix}
\mathbf{i} & \mathbf{j} & \mathbf{k}\\
a_1 & a_2 & a_3\\
b_1+c_1 & b_2+c_2 & b_3+c_3
\end{vmatrix}$$

行列式对第二行线性，所以等于

$$\begin{vmatrix}
\mathbf{i} & \mathbf{j} & \mathbf{k}\\
a_1 & a_2 & a_3\\
b_1 & b_2 & b_3
\end{vmatrix}
+
\begin{vmatrix}
\mathbf{i} & \mathbf{j} & \mathbf{k}\\
a_1 & a_2 & a_3\\
c_1 & c_2 & c_3
\end{vmatrix}
=
\mathbf{a}\times\mathbf{b}+\mathbf{a}\times\mathbf{c}$$

## A.9 混合导数定理与增量定理

### 混合导数定理

**定理**：若 $f(x,y)$ 的二阶混合偏导数 $f_{xy}$ 和 $f_{yx}$ 在包含点 $(a,b)$ 的开区域上连续，则

$$f_{xy}(a,b)=f_{yx}(a,b)$$

**意义**：混合偏导数与求导顺序无关（在连续性条件下）。

### 增量定理

**定理**：若 $f(x,y)$ 在点 $(a,b)$ 可微，则

$$\Delta f=f(a+\Delta x,b+\Delta y)-f(a,b)
=
f_x(a,b)\Delta x+f_y(a,b)\Delta y+\epsilon_1\Delta x+\epsilon_2\Delta y$$

其中 $\epsilon_1,\epsilon_2\to 0$ 当 $(\Delta x,\Delta y)\to(0,0)$。

**意义**：可微函数的增量可以分解为线性主部和高阶无穷小。

## 本节易错点总结

1. 实数的完备性是有理数系不具备的，这是微积分严格性的基础。
2. 数学归纳法需要基础步和归纳步都成立。
3. 绝对值不等式 $|x+y|\le|x|+|y|$ 中等号不一定成立。
4. 圆的方程中，圆心是 $(h,k)$，不是 $(h,-k)$。
5. 抛物线顶点公式 $h=-b/(2a)$ 只适用于 $y=ax^2+bx+c$。
6. 三角恒等式中，注意符号：$\cos(A+B)=\cos A\cos B-\sin A\sin B$。
7. 极限和法则的证明中，取 $\delta=\min\{\delta_1,\delta_2\}$。
8. 夹层定理要求三个函数在去心邻域内满足不等式。
9. 混合导数定理要求二阶偏导数连续。
10. 向量积分配律的证明用行列式的线性性质。

## 主动回忆问题

1. 实数系有哪些公理？完备性公理的内容是什么？
2. 叙述数学归纳法原理，并用它证明 $1+2+\cdots+n=n(n+1)/2$。
3. 写出直线、圆、抛物线的标准方程。
4. 写出三角函数的勾股恒等式、加法公式、倍角公式、半角公式。
5. 证明极限的和法则。
6. 证明夹层定理。
7. 写出基本极限 $\lim_{x\to 0}\frac{\sin x}{x}=1$ 和 $\lim_{x\to\infty}(1+1/x)^x=e$。
8. 叙述混合导数定理和增量定理。

## 发散性提问

1. 为什么实数系的完备性对微积分至关重要？如果只使用有理数，微积分会遇到什么困难？
2. 数学归纳法与良序原理有什么关系？如何用良序原理证明归纳法？
3. 在解析几何中，直线、圆、抛物线分别对应什么代数方程？它们的几何性质如何从方程中读出？
4. 三角恒等式在微积分中有什么应用？如何用三角恒等式简化积分？
5. 极限定理的证明中，为什么取 $\delta=\min\{\delta_1,\delta_2\}$？如果取 $\delta=\max$ 会怎样？
6. 实数完备性的不同等价形式之间如何互相推导？请举例说明。
7. 混合导数定理中连续性条件是否必要？能否举出反例？
8. 增量定理与微分有什么关系？如何用增量定理证明可微性？

**下一节预告：**
附录B 基本代数公式、几何公式、积分简表、级数等。
等你说“下一节”，我继续推进。

---

# 附录A 实数与实线 —— 主动回忆问题与发散性提问详解

> 下面把附录A末尾的**主动回忆问题**和**发散性提问**逐一详解。
>

## 一、主动回忆问题详解

### 1. 实数系有哪些公理？完备性公理的内容是什么？

**实数系的公理**分为三组：

**（1）域公理**（加法与乘法运算）：

| 公理 | 加法 | 乘法 |
| --- | --- | --- |
| 交换律 | $a+b=b+a$ | $ab=ba$ |
| 结合律 | $(a+b)+c=a+(b+c)$ | $(ab)c=a(bc)$ |
| 分配律 | $a(b+c)=ab+ac$ | — |
| 单位元 | $a+0=a$ | $a\cdot 1=a$ |
| 逆元 | $a+(-a)=0$ | $a\cdot a^{-1}=1$（$a\neq 0$） |

**（2）序公理**：

1. **三歧性**：对任意 $a,b$，$a<b$、$a=b$、$a>b$ 恰有一个成立；
2. **传递性**：若 $a<b$ 且 $b<c$，则 $a<c$；
3. **加法保序**：若 $a<b$，则 $a+c<b+c$；
4. **乘法保序**：若 $a<b$ 且 $c>0$，则 $ac<bc$。

**（3）完备性公理**：

> **任何非空有上界的实数集必有最小上界（上确界）。**
>

即：若 $S\subseteq\mathbb{R}$，$S\neq\varnothing$，且存在 $M$ 使得对所有 $x\in S$ 有 $x\le M$，则存在唯一的数 $\sup S$，使得：

- $\sup S$ 是 $S$ 的上界；
- 若 $M$ 是 $S$ 的任意上界，则 $\sup S\le M$。

**完备性的意义**：

有理数系 $\mathbb{Q}$ 不满足完备性。例如：

$$S=\{x\in\mathbb{Q}: x^2<2\}$$

在 $\mathbb{Q}$ 中有上界（如 $2$），但在 $\mathbb{Q}$ 中无最小上界。其最小上界是 $\sqrt{2}$，而 $\sqrt{2}\notin\mathbb{Q}$。

完备性是实数系与有理数系的**本质区别**，也是微积分严格性的根基。没有完备性，中值定理、介值定理、单调收敛定理等都无法成立。

### 2. 叙述数学归纳法原理，并用它证明 $1+2+\cdots+n=\frac{n(n+1)}{2}$

**数学归纳法原理**：

设 $P(n)$ 是关于正整数 $n$ 的命题。若：

1. **基础步**：$P(1)$ 成立；
2. **归纳步**：若 $P(k)$ 成立，则 $P(k+1)$ 成立；

则 $P(n)$ 对所有正整数 $n$ 成立。

**证明 $1+2+\cdots+n=\frac{n(n+1)}{2}$**：

**基础步**：$n=1$ 时，左边 $=1$，右边 $=\frac{1\cdot 2}{2}=1$，成立。

**归纳步**：假设 $n=k$ 时成立，即

$$1+2+\cdots+k=\frac{k(k+1)}{2}$$

则 $n=k+1$ 时：

$$1+2+\cdots+k+(k+1)
=
\frac{k(k+1)}{2}+(k+1)$$

提取公因式 $(k+1)$：

$$=
(k+1)\left(\frac{k}{2}+1\right)
=
(k+1)\cdot\frac{k+2}{2}
=
\frac{(k+1)(k+2)}{2}$$

即 $P(k+1)$ 成立。

由归纳法，命题对所有正整数 $n$ 成立。

**直观理解**：归纳法就像多米诺骨牌——推倒第一张（基础步），并保证每张倒下时能推倒下一张（归纳步），则所有骨牌都会倒下。

### 3. 写出直线、圆、抛物线的标准方程

**直线**：

| 形式 | 方程 | 说明 |
| --- | --- | --- |
| 点斜式 | $y-y_1=m(x-x_1)$ | 过点 $(x_1,y_1)$，斜率 $m$ |
| 斜截式 | $y=mx+b$ | 斜率 $m$，$y$ 截距 $b$ |
| 一般式 | $Ax+By+C=0$ | $A,B$ 不同时为零 |
| 截距式 | $\frac{x}{a}+\frac{y}{b}=1$ | $x$ 截距 $a$，$y$ 截距 $b$ |

**斜率**：$m=\frac{y_2-y_1}{x_2-x_1}$

**平行与垂直**：

- 平行：$m_1=m_2$
- 垂直：$m_1m_2=-1$

**圆**：

| 形式 | 方程 | 说明 |
| --- | --- | --- |
| 标准方程 | $(x-h)^2+(y-k)^2=r^2$ | 圆心 $(h,k)$，半径 $r$ |
| 一般方程 | $x^2+y^2+Dx+Ey+F=0$ | 配方后可化为标准形式 |

**一般方程化为标准方程**：

$$\left(x+\frac{D}{2}\right)^2+\left(y+\frac{E}{2}\right)^2
=
\frac{D^2+E^2-4F}{4}$$

圆心 $\left(-\frac{D}{2},-\frac{E}{2}\right)$，半径 $r=\frac{1}{2}\sqrt{D^2+E^2-4F}$。

**抛物线**：

| 形式 | 方程 | 说明 |
| --- | --- | --- |
| 标准形式 | $y=ax^2+bx+c$ | 开口向上（$a>0$）或向下（$a<0$） |
| 顶点形式 | $y=a(x-h)^2+k$ | 顶点 $(h,k)$，对称轴 $x=h$ |

**顶点坐标**：

$$h=-\frac{b}{2a},\qquad k=c-\frac{b^2}{4a}$$

**开口方向**：

- $a>0$：开口向上
- $a<0$：开口向下

### 4. 写出三角函数的勾股恒等式、加法公式、倍角公式、半角公式

**勾股恒等式**：

$$\sin^2\theta+\cos^2\theta=1$$

$$1+\tan^2\theta=\sec^2\theta$$

$$1+\cot^2\theta=\csc^2\theta$$

**加法公式**：

$$\sin(A+B)=\sin A\cos B+\cos A\sin B$$

$$\cos(A+B)=\cos A\cos B-\sin A\sin B$$

$$\tan(A+B)=\frac{\tan A+\tan B}{1-\tan A\tan B}$$

**减法公式**（由加法公式取 $B\to-B$）：

$$\sin(A-B)=\sin A\cos B-\cos A\sin B$$

$$\cos(A-B)=\cos A\cos B+\sin A\sin B$$

**倍角公式**：

$$\sin 2\theta=2\sin\theta\cos\theta$$

$$\cos 2\theta=\cos^2\theta-\sin^2\theta
=1-2\sin^2\theta
=2\cos^2\theta-1$$

$$\tan 2\theta=\frac{2\tan\theta}{1-\tan^2\theta}$$

**半角公式**：

$$\sin^2\theta=\frac{1-\cos 2\theta}{2}$$

$$\cos^2\theta=\frac{1+\cos 2\theta}{2}$$

**积化和差公式**：

$$\sin A\cos B=\frac{1}{2}[\sin(A+B)+\sin(A-B)]$$

$$\cos A\cos B=\frac{1}{2}[\cos(A+B)+\cos(A-B)]$$

$$\sin A\sin B=\frac{1}{2}[\cos(A-B)-\cos(A+B)]$$

### 5. 证明极限的和法则

**定理**：若 $\lim_{x\to c}f(x)=L$，$\lim_{x\to c}g(x)=M$，则

$$\lim_{x\to c}(f(x)+g(x))=L+M$$

**证明**：

给定 $\epsilon>0$。

由 $\lim_{x\to c}f(x)=L$，存在 $\delta_1>0$，使得

$$0<|x-c|<\delta_1\Rightarrow |f(x)-L|<\frac{\epsilon}{2}$$

由 $\lim_{x\to c}g(x)=M$，存在 $\delta_2>0$，使得

$$0<|x-c|<\delta_2\Rightarrow |g(x)-M|<\frac{\epsilon}{2}$$

取 $\delta=\min\{\delta_1,\delta_2\}$。若 $0<|x-c|<\delta$，则同时有 $0<|x-c|<\delta_1$ 和 $0<|x-c|<\delta_2$，所以

$$|f(x)-L|<\frac{\epsilon}{2},\qquad |g(x)-M|<\frac{\epsilon}{2}$$

于是

$$|(f(x)+g(x))-(L+M)|
=
|(f(x)-L)+(g(x)-M)|$$

由三角不等式：

$$\le |f(x)-L|+|g(x)-M|
<
\frac{\epsilon}{2}+\frac{\epsilon}{2}
=
\epsilon$$

所以 $\lim_{x\to c}(f(x)+g(x))=L+M$。

**关键点**：

- 取 $\delta=\min\{\delta_1,\delta_2\}$ 保证两个不等式同时成立；
- 用三角不等式 $|a+b|\le|a|+|b|$；
- 把 $\epsilon$ 分成两半，各取 $\epsilon/2$。

### 6. 证明夹层定理

**定理**：若在包含 $c$ 的某个开区间内（$c$ 本身可能除外）

$$g(x)\le f(x)\le h(x)$$

且

$$\lim_{x\to c}g(x)=\lim_{x\to c}h(x)=L$$

则

$$\lim_{x\to c}f(x)=L$$

**证明**：

给定 $\epsilon>0$。

由 $\lim_{x\to c}g(x)=L$，存在 $\delta_1>0$，使得

$$0<|x-c|<\delta_1\Rightarrow |g(x)-L|<\epsilon$$

即

$$L-\epsilon<g(x)<L+\epsilon$$

由 $\lim_{x\to c}h(x)=L$，存在 $\delta_2>0$，使得

$$0<|x-c|<\delta_2\Rightarrow |h(x)-L|<\epsilon$$

即

$$L-\epsilon<h(x)<L+\epsilon$$

取 $\delta=\min\{\delta_1,\delta_2\}$。若 $0<|x-c|<\delta$，则同时有 $g(x)>L-\epsilon$ 和 $h(x)<L+\epsilon$。由夹层条件 $g(x)\le f(x)\le h(x)$，得

$$L-\epsilon<g(x)\le f(x)\le h(x)<L+\epsilon$$

所以

$$L-\epsilon<f(x)<L+\epsilon$$

即

$$|f(x)-L|<\epsilon$$

因此 $\lim_{x\to c}f(x)=L$。

**直观理解**：$f$ 被夹在 $g$ 和 $h$ 之间，而 $g$ 和 $h$ 都趋近 $L$，所以 $f$ 也不得不趋近 $L$。

### 7. 写出基本极限 $\lim_{x\to 0}\frac{\sin x}{x}=1$ 和 $\lim_{x\to\infty}(1+1/x)^x=e$

**基本极限 1**：

$$\boxed{
\lim_{x\to 0}\frac{\sin x}{x}=1
}$$

**证明思路**（几何法）：对 $0<x<\pi/2$，比较三个面积：

$$\frac{1}{2}\sin x<\frac{1}{2}x<\frac{1}{2}\tan x$$

即

$$\sin x<x<\tan x$$

除以 $\sin x$：

$$1<\frac{x}{\sin x}<\frac{1}{\cos x}$$

取倒数：

$$\cos x<\frac{\sin x}{x}<1$$

由夹层定理，$\lim_{x\to 0^+}\frac{\sin x}{x}=1$。由于 $\sin x/x$ 是偶函数，左极限也等于 1。

**基本极限 2**：

$$\boxed{
\lim_{x\to\infty}\left(1+\frac{1}{x}\right)^x=e
}$$

**证明思路**：令 $f(x)=\ln(1+x)$。则

$$\lim_{x\to 0}\frac{\ln(1+x)}{x}
=
\lim_{x\to 0}\frac{\ln(1+x)-\ln 1}{x}
=
f'(0)
=
\frac{1}{1+0}
=
1$$

所以

$$\ln\left[\lim_{x\to 0}(1+x)^{1/x}\right]=1$$

取指数：

$$\lim_{x\to 0}(1+x)^{1/x}=e$$

令 $x=1/t$，当 $x\to 0^+$ 时 $t\to\infty$，得

$$\lim_{t\to\infty}\left(1+\frac{1}{t}\right)^t=e$$

**其他等价形式**：

$$\lim_{x\to 0}\frac{e^x-1}{x}=1$$

$$\lim_{x\to 0}\frac{1-\cos x}{x}=0$$

### 8. 叙述混合导数定理和增量定理

**混合导数定理**：

> 若 $f(x,y)$ 的二阶混合偏导数 $f_{xy}$ 和 $f_{yx}$ 在包含点 $(a,b)$ 的开区域上**连续**，则
>
> $$\boxed{f_{xy}(a,b)=f_{yx}(a,b)}$$
>

**意义**：在连续性条件下，混合偏导数与求导顺序无关。

**反例**：若 $f_{xy}$ 和 $f_{yx}$ 不连续，则可能不相等。经典例子：

$$f(x,y)=
\begin{cases}
\frac{xy(x^2-y^2)}{x^2+y^2}, & (x,y)\neq(0,0)\\
0, & (x,y)=(0,0)
\end{cases}$$

在原点处 $f_{xy}(0,0)=-1$，$f_{yx}(0,0)=1$，不相等。

**增量定理**：

> 若 $f(x,y)$ 在点 $(a,b)$ **可微**，则
>
> $$\boxed{
\Delta f=f(a+\Delta x,b+\Delta y)-f(a,b)
=
f_x(a,b)\Delta x+f_y(a,b)\Delta y+\epsilon_1\Delta x+\epsilon_2\Delta y
}$$
>
> 其中 $\epsilon_1,\epsilon_2\to 0$ 当 $(\Delta x,\Delta y)\to(0,0)$。
>

**意义**：可微函数的增量可以分解为**线性主部** $f_x\Delta x+f_y\Delta y$ 和**高阶无穷小** $\epsilon_1\Delta x+\epsilon_2\Delta y$。

**与微分的关系**：

$$df=f_x(a,b)\,dx+f_y(a,b)\,dy$$

是增量的线性主部，即

$$\Delta f\approx df$$

误差是高阶无穷小。

**推广到 $n$ 元函数**：

$$\Delta f=\nabla f(a)\cdot\Delta\mathbf{x}+o(\|\Delta\mathbf{x}\|)$$

## 二、发散性提问详解

### 1. 为什么实数系的完备性对微积分至关重要？如果只使用有理数，微积分会遇到什么困难？

**完备性的重要性**：

微积分的核心概念——极限、连续、导数、积分——都依赖于实数系的完备性。

**如果只用有理数，会遇到以下困难**：

**（1）极限可能不存在**：

数列

$$1,\ 1.4,\ 1.41,\ 1.414,\ 1.4142,\dots$$

每一项都是有理数，趋近于 $\sqrt{2}$，但 $\sqrt{2}\notin\mathbb{Q}$。所以在 $\mathbb{Q}$ 中这个数列不收敛。

**（2）介值定理失效**：

函数 $f(x)=x^2-2$ 在 $\mathbb{Q}$ 上连续，$f(1)=-1<0$，$f(2)=2>0$，但在 $\mathbb{Q}$ 中不存在 $c$ 使得 $f(c)=0$，因为 $\sqrt{2}\notin\mathbb{Q}$。

**（3）中值定理失效**：

函数 $f(x)=x^3-2$ 在 $\mathbb{Q}$ 上可微，但在 $\mathbb{Q}$ 中不存在 $c$ 使得 $f'(c)=0$ 的零点。

**（4）微积分基本定理失效**：

有些函数在 $\mathbb{Q}$ 上可积但原函数不存在。

**（5）无法定义 $\pi$、$e$ 等常数**：

这些数都是无理数，在 $\mathbb{Q}$ 中无法严格定义。

**结论**：完备性是微积分严格性的基石。没有完备性，微积分的所有核心定理都无法成立。实数系是微积分的**唯一合适的基础**。

### 2. 数学归纳法与良序原理有什么关系？如何用良序原理证明归纳法？

**良序原理**：

> 任何非空正整数集必有最小元素。
>

**数学归纳法原理**：

> 若 $P(1)$ 成立，且 $P(k)\Rightarrow P(k+1)$，则 $P(n)$ 对所有正整数 $n$ 成立。
>

**用良序原理证明归纳法**：

**反证法**：假设 $P(n)$ 不对所有正整数成立。令

$$S=\{n\in\mathbb{N}: P(n)\text{ 不成立}\}$$

则 $S$ 非空。由良序原理，$S$ 有最小元素 $m$。

由于 $P(1)$ 成立，所以 $m\neq 1$，即 $m\ge 2$。因此 $m-1$ 是正整数。

由于 $m$ 是 $S$ 的最小元素，所以 $m-1\notin S$，即 $P(m-1)$ 成立。

由归纳步，$P(m-1)\Rightarrow P(m)$，所以 $P(m)$ 成立。这与 $m\in S$ 矛盾。

因此 $S$ 为空，即 $P(n)$ 对所有正整数成立。

**结论**：良序原理与数学归纳法等价。归纳法可以从良序原理推导出来，反之亦然。

**推广**：良序原理还可以用于证明**强归纳法**（假设 $P(1),\dots,P(k)$ 都成立，推出 $P(k+1)$）。

### 3. 在解析几何中，直线、圆、抛物线分别对应什么代数方程？它们的几何性质如何从方程中读出？

**直线**：

- **方程**：$Ax+By+C=0$
- **几何性质**：
  - 斜率：$m=-A/B$（$B\neq 0$）
  - $x$ 截距：$-C/A$（$A\neq 0$）
  - $y$ 截距：$-C/B$（$B\neq 0$）
  - 法向量：$\langle A,B\rangle$
  - 方向向量：$\langle B,-A\rangle$

**圆**：

- **方程**：$(x-h)^2+(y-k)^2=r^2$
- **几何性质**：
  - 圆心：$(h,k)$
  - 半径：$r$
  - 对称性：关于 $x=h$、$y=k$ 对称
  - 与坐标轴的交点：令 $y=0$ 或 $x=0$ 解方程

**抛物线**：

- **方程**：$y=ax^2+bx+c$
- **几何性质**：
  - 顶点：$\left(-\frac{b}{2a},\ c-\frac{b^2}{4a}\right)$
  - 对称轴：$x=-\frac{b}{2a}$
  - 开口方向：$a>0$ 向上，$a<0$ 向下
  - 与 $x$ 轴交点：判别式 $\Delta=b^2-4ac$
    - $\Delta>0$：两个交点
    - $\Delta=0$：一个交点（相切）
    - $\Delta<0$：无交点
  - 焦点：$\left(-\frac{b}{2a},\ c-\frac{b^2-1}{4a}\right)$
  - 准线：$y=c-\frac{b^2+1}{4a}$

**统一观点**：这些曲线都是**圆锥曲线**，可以由平面截圆锥得到。它们的方程都是二次的，几何性质可以从方程的系数中读出。

### 4. 三角恒等式在微积分中有什么应用？如何用三角恒等式简化积分？

**三角恒等式在微积分中的应用**：

**（1）求极限**：

$$\lim_{x\to 0}\frac{\sin x}{x}=1$$

**（2）求导数**：

$$\frac{d}{dx}\sin x=\cos x,\qquad
\frac{d}{dx}\cos x=-\sin x$$

**（3）求积分**：

$$\int\sin^2 x\,dx
=
\int\frac{1-\cos 2x}{2}\,dx
=
\frac{x}{2}-\frac{\sin 2x}{4}+C$$

**（4）化简被积函数**：

$$\int\sin^3 x\,dx
=
\int\sin x(1-\cos^2 x)\,dx
=
-\cos x+\frac{\cos^3 x}{3}+C$$

**（5）三角代换**：

$$\int\frac{dx}{\sqrt{1-x^2}}=\arcsin x+C$$

**（6）傅里叶级数**：

三角恒等式用于将周期函数展开为三角级数。

**简化积分的常用技巧**：

| 被积函数 | 使用的恒等式 | 结果 |
| --- | --- | --- |
| $\sin^2 x$ | $\sin^2 x=\frac{1-\cos 2x}{2}$ | 降幂 |
| $\cos^2 x$ | $\cos^2 x=\frac{1+\cos 2x}{2}$ | 降幂 |
| $\sin^3 x$ | $\sin^3 x=\sin x(1-\cos^2 x)$ | 换元 |
| $\sin x\cos x$ | $\sin x\cos x=\frac{\sin 2x}{2}$ | 简化 |
| $\sin A\sin B$ | 积化和差 | 转化为和 |

### 5. 极限定理的证明中，为什么取 $\delta=\min\{\delta_1,\delta_2\}$？如果取 $\delta=\max$ 会怎样？

**为什么取 $\min$**：

在和法则的证明中，我们需要**同时**满足两个条件：

$$0<|x-c|<\delta_1\Rightarrow |f(x)-L|<\frac{\epsilon}{2}$$

$$0<|x-c|<\delta_2\Rightarrow |g(x)-M|<\frac{\epsilon}{2}$$

取 $\delta=\min\{\delta_1,\delta_2\}$，则当 $0<|x-c|<\delta$ 时：

- 因为 $\delta\le\delta_1$，所以 $0<|x-c|<\delta_1$ 成立，第一个不等式成立；
- 因为 $\delta\le\delta_2$，所以 $0<|x-c|<\delta_2$ 成立，第二个不等式成立。

**如果取 $\delta=\max\{\delta_1,\delta_2\}$**：

假设 $\delta_1<\delta_2$，取 $\delta=\delta_2$。则当 $0<|x-c|<\delta_2$ 时，不一定有 $0<|x-c|<\delta_1$。例如取 $|x-c|=\frac{\delta_1+\delta_2}{2}$，它小于 $\delta_2$ 但大于 $\delta_1$，所以第一个不等式不一定成立。

**结论**：取 $\min$ 是为了**同时满足所有条件**。这是极限证明中的标准技巧。

**推广**：对于 $n$ 个条件，取 $\delta=\min\{\delta_1,\dots,\delta_n\}$。

### 6. 实数完备性的不同等价形式之间如何互相推导？请举例说明

**等价形式**：

1. **上确界原理**：非空有上界的集合有上确界；
2. **单调收敛定理**：有界单调数列收敛；
3. **柯西收敛准则**：数列收敛 $\iff$ 它是柯西列；
4. **区间套定理**：闭区间套有唯一公共点；
5. **聚点定理**：有界无限集有聚点；
6. **有限覆盖定理**：闭区间上的开覆盖有有限子覆盖。

**推导示例**：

**上确界原理 $\Rightarrow$ 单调收敛定理**：

设 $\{a_n\}$ 单调递增且有上界。令 $L=\sup\{a_n\}$。对任意 $\epsilon>0$，由上确界的定义，存在 $N$ 使得 $a_N>L-\epsilon$。由于单调递增，对 $n>N$ 有 $a_n\ge a_N>L-\epsilon$。又 $a_n\le L$。所以 $|a_n-L|<\epsilon$，即 $a_n\to L$。

**单调收敛定理 $\Rightarrow$ 区间套定理**：

设 $[a_n,b_n]$ 是闭区间套。则 $\{a_n\}$ 单调递增有上界 $b_1$，$\{b_n\}$ 单调递减有下界 $a_1$。由单调收敛定理，$a_n\to a$，$b_n\to b$。由 $a_n\le b_n$ 得 $a\le b$。又 $b_n-a_n\to 0$，所以 $a=b$。这个公共点 $a$ 属于所有区间。

**区间套定理 $\Rightarrow$ 聚点定理**：

设 $S$ 有界无限。将包含 $S$ 的区间不断二分，每次取包含无穷多点的子区间，得到闭区间套。由区间套定理，存在公共点 $p$。$p$ 的任意邻域包含无穷多点，所以 $p$ 是聚点。

**聚点定理 $\Rightarrow$ 有限覆盖定理**：

用反证法。假设闭区间 $[a,b]$ 有开覆盖无有限子覆盖。不断二分，得到闭区间套，每个子区间都无有限子覆盖。由区间套定理，存在公共点 $p$。$p$ 属于某个开集，该开集包含某个子区间，矛盾。

**结论**：这些等价形式互相推导，构成实数完备性的完整理论。它们是实分析的基础。

### 7. 混合导数定理中连续性条件是否必要？能否举出反例？

**连续性条件是必要的**。

**反例**：

$$f(x,y)=
\begin{cases}
\frac{xy(x^2-y^2)}{x^2+y^2}, & (x,y)\neq(0,0)\\
0, & (x,y)=(0,0)
\end{cases}$$

**计算 $f_{xy}(0,0)$**：

先求 $f_x(0,y)$：

$$f_x(0,y)=\lim_{h\to 0}\frac{f(h,y)-f(0,y)}{h}
=
\lim_{h\to 0}\frac{\frac{hy(h^2-y^2)}{h^2+y^2}}{h}
=
\lim_{h\to 0}\frac{y(h^2-y^2)}{h^2+y^2}
=
-y$$

再求 $f_{xy}(0,0)$：

$$f_{xy}(0,0)=\lim_{k\to 0}\frac{f_x(0,k)-f_x(0,0)}{k}
=
\lim_{k\to 0}\frac{-k-0}{k}
=
-1$$

**计算 $f_{yx}(0,0)$**：

先求 $f_y(x,0)$：

$$f_y(x,0)=\lim_{k\to 0}\frac{f(x,k)-f(x,0)}{k}
=
\lim_{k\to 0}\frac{\frac{xk(x^2-k^2)}{x^2+k^2}}{k}
=
\lim_{k\to 0}\frac{x(x^2-k^2)}{x^2+k^2}
=
x$$

再求 $f_{yx}(0,0)$：

$$f_{yx}(0,0)=\lim_{h\to 0}\frac{f_y(h,0)-f_y(0,0)}{h}
=
\lim_{h\to 0}\frac{h-0}{h}
=
1$$

所以 $f_{xy}(0,0)=-1\neq 1=f_{yx}(0,0)$。

**原因**：$f_{xy}$ 和 $f_{yx}$ 在原点不连续。

**结论**：混合导数定理中的连续性条件不可省略。若二阶混合偏导数不连续，则求导顺序可能影响结果。

### 8. 增量定理与微分有什么关系？如何用增量定理证明可微性？

**增量定理**：

若 $f(x,y)$ 在 $(a,b)$ 可微，则

$$\Delta f=f(a+\Delta x,b+\Delta y)-f(a,b)
=
f_x(a,b)\Delta x+f_y(a,b)\Delta y+\epsilon_1\Delta x+\epsilon_2\Delta y$$

其中 $\epsilon_1,\epsilon_2\to 0$ 当 $(\Delta x,\Delta y)\to(0,0)$。

**与微分的关系**：

**微分**定义为增量的**线性主部**：

$$df=f_x(a,b)\,dx+f_y(a,b)\,dy$$

增量定理说明：

$$\Delta f=df+\text{高阶无穷小}$$

即

$$\Delta f\approx df$$

当 $\Delta x,\Delta y$ 很小时，微分 $df$ 是增量 $\Delta f$ 的良好近似。

**用增量定理证明可微性**：

要证明 $f$ 在 $(a,b)$ 可微，需要证明存在线性函数 $L(h,k)=Ah+Bk$，使得

$$\lim_{(h,k)\to(0,0)}
\frac{f(a+h,b+k)-f(a,b)-Ah-Bk}{\sqrt{h^2+k^2}}
=
0$$

由增量定理，取 $A=f_x(a,b)$，$B=f_y(a,b)$，则

$$f(a+h,b+k)-f(a,b)-f_x h-f_y k
=
\epsilon_1 h+\epsilon_2 k$$

其中 $\epsilon_1,\epsilon_2\to 0$。

所以

$$\frac{|\epsilon_1 h+\epsilon_2 k|}{\sqrt{h^2+k^2}}
\le
|\epsilon_1|\frac{|h|}{\sqrt{h^2+k^2}}
+
|\epsilon_2|\frac{|k|}{\sqrt{h^2+k^2}}
\le
|\epsilon_1|+|\epsilon_2|
\to 0$$

因此 $f$ 在 $(a,b)$ 可微。

**推广到 $n$ 元函数**：

$$\Delta f=\nabla f(a)\cdot\Delta\mathbf{x}+o(\|\Delta\mathbf{x}\|)$$

**意义**：增量定理是可微性的**等价刻画**。它说明可微函数的增量可以局部线性化，这是微积分中“以直代曲”思想的严格表述。

## 三、总结

1. 实数系公理：域公理、序公理、完备性公理。完备性是微积分严格性的根基。
2. 数学归纳法：基础步 + 归纳步，与良序原理等价。
3. 直线、圆、抛物线的标准方程及其几何性质。
4. 三角恒等式：勾股、加法、倍角、半角、积化和差。
5. 极限和法则证明：取 $\delta=\min\{\delta_1,\delta_2\}$，用三角不等式。
6. 夹层定理：三个函数夹逼，极限相等。
7. 基本极限：$\lim_{x\to 0}\frac{\sin x}{x}=1$，$\lim_{x\to\infty}(1+1/x)^x=e$。
8. 混合导数定理：连续性条件下 $f_{xy}=f_{yx}$，否则可能不等。
9. 增量定理：$\Delta f=df+o(\|\Delta\mathbf{x}\|)$，是可微性的等价刻画。
10. 完备性的等价形式：上确界原理、单调收敛、柯西准则、区间套、聚点、有限覆盖。
11. 三角恒等式在积分中用于降幂、换元、积化和差。
12. 增量定理与微分：微分是增量的线性主部。

这些内容为微积分提供了严格的数学基础，是学习实分析、微分几何、微分方程的必备知识。

**下一节预告：**
附录B 基本代数公式、几何公式、积分简表、级数等。
等你说“下一节”，我继续推进。

---
