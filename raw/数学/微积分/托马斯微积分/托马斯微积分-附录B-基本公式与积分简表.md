---
title: "托马斯微积分 · 附录B 基本公式与积分简表"
tags: [数学, 读书笔记]
created: "2026-10-01"
type: literature
summary: "托马斯微积分 附录B 基本公式与积分简表 伴读（讲解 + 问答）。"
---

## 提问 220

下一节

## 回答 220

# 附录B 基本代数公式、几何公式、积分简表、级数等

> 本附录汇集微积分中常用的公式、法则和展开式，供快速查阅。它们不是新的理论，而是前面各章反复使用的工具。掌握这些公式，可以大幅提高计算速度和准确性。
>
> 本附录核心：基本代数公式、几何公式、积分简表、级数展开、向量运算符、极限、微分法则、积分法则。
>

## B.1 基本代数公式

### 乘法公式

$$(a+b)^2=a^2+2ab+b^2$$

$$(a-b)^2=a^2-2ab+b^2$$

$$(a+b)^3=a^3+3a^2b+3ab^2+b^3$$

$$(a-b)^3=a^3-3a^2b+3ab^2-b^3$$

$$a^2-b^2=(a-b)(a+b)$$

$$a^3-b^3=(a-b)(a^2+ab+b^2)$$

$$a^3+b^3=(a+b)(a^2-ab+b^2)$$

**二项式定理**：

$$(a+b)^n=\sum_{k=0}^n \binom{n}{k}a^{n-k}b^k$$

其中二项式系数：

$$\binom{n}{k}=\frac{n!}{k!(n-k)!}$$

### 二次方程

$$ax^2+bx+c=0$$

求根公式：

$$x=\frac{-b\pm\sqrt{b^2-4ac}}{2a}$$

判别式：

$$\Delta=b^2-4ac$$

- $\Delta>0$：两个不同实根；
- $\Delta=0$：一个重根；
- $\Delta<0$：两个共轭复根。

韦达定理：

$$x_1+x_2=-\frac{b}{a},\qquad x_1x_2=\frac{c}{a}$$

### 指数法则

$$a^x a^y=a^{x+y}$$

$$\frac{a^x}{a^y}=a^{x-y}$$

$$(a^x)^y=a^{xy}$$

$$a^x b^x=(ab)^x$$

$$a^0=1,\qquad a^{-x}=\frac{1}{a^x}$$

$$a^{1/n}=\sqrt[n]{a}$$

### 对数法则

$$\log_a(xy)=\log_a x+\log_a y$$

$$\log_a\frac{x}{y}=\log_a x-\log_a y$$

$$\log_a x^r=r\log_a x$$

$$\log_a x=\frac{\ln x}{\ln a}$$

$$a^{\log_a x}=x,\qquad \log_a a^x=x$$

### 不等式

$$|x|\le a\iff -a\le x\le a$$

$$|x|\ge a\iff x\le -a\text{ 或 }x\ge a$$

三角不等式：

$$|x+y|\le |x|+|y|$$

$$||x|-|y||\le |x-y|$$

## B.2 几何公式

### 三角形

面积：

$$A=\frac{1}{2}bh$$

海伦公式：

$$A=\sqrt{s(s-a)(s-b)(s-c)}$$

其中 $s=\frac{a+b+c}{2}$。

正弦定理：

$$\frac{a}{\sin A}=\frac{b}{\sin B}=\frac{c}{\sin C}$$

余弦定理：

$$c^2=a^2+b^2-2ab\cos C$$

### 圆与扇形

圆面积：

$$A=\pi r^2$$

圆周长：

$$C=2\pi r$$

扇形面积：

$$A=\frac{1}{2}r^2\theta$$

弧长：

$$s=r\theta$$

### 圆柱、圆锥、球

圆柱体积：

$$V=\pi r^2 h$$

圆柱侧面积：

$$S=2\pi rh$$

圆锥体积：

$$V=\frac{1}{3}\pi r^2 h$$

圆锥侧面积：

$$S=\pi r l$$

其中 $l=\sqrt{r^2+h^2}$ 是母线长。

球体积：

$$V=\frac{4}{3}\pi r^3$$

球表面积：

$$S=4\pi r^2$$

### 旋转体

绕 $x$ 轴旋转：

$$V=\pi\int_a^b [f(x)]^2\,dx$$

绕 $y$ 轴旋转（壳法）：

$$V=2\pi\int_a^b x f(x)\,dx$$

## B.3 积分简表

### 基本积分

$$\int x^n\,dx=\frac{x^{n+1}}{n+1}+C\quad (n\neq -1)$$

$$\int \frac{1}{x}\,dx=\ln|x|+C$$

$$\int e^x\,dx=e^x+C$$

$$\int a^x\,dx=\frac{a^x}{\ln a}+C$$

$$\int \sin x\,dx=-\cos x+C$$

$$\int \cos x\,dx=\sin x+C$$

$$\int \sec^2 x\,dx=\tan x+C$$

$$\int \csc^2 x\,dx=-\cot x+C$$

$$\int \sec x\tan x\,dx=\sec x+C$$

$$\int \csc x\cot x\,dx=-\csc x+C$$

$$\int \frac{1}{1+x^2}\,dx=\arctan x+C$$

$$\int \frac{1}{\sqrt{1-x^2}}\,dx=\arcsin x+C$$

### 三角积分

$$\int \sin^2 x\,dx=\frac{x}{2}-\frac{\sin 2x}{4}+C$$

$$\int \cos^2 x\,dx=\frac{x}{2}+\frac{\sin 2x}{4}+C$$

$$\int \tan x\,dx=-\ln|\cos x|+C$$

$$\int \sec x\,dx=\ln|\sec x+\tan x|+C$$

### 有理函数积分

$$\int \frac{1}{x^2+a^2}\,dx=\frac{1}{a}\arctan\frac{x}{a}+C$$

$$\int \frac{1}{x^2-a^2}\,dx=\frac{1}{2a}\ln\left|\frac{x-a}{x+a}\right|+C$$

$$\int \frac{1}{\sqrt{a^2-x^2}}\,dx=\arcsin\frac{x}{a}+C$$

$$\int \frac{1}{\sqrt{x^2+a^2}}\,dx=\ln\left|x+\sqrt{x^2+a^2}\right|+C$$

### 分部积分

$$\int u\,dv=uv-\int v\,du$$

常用选择：$u$ 按“反对幂指三”顺序选取。

### 三角代换

| 形式 | 代换 | 结果 |
| --- | --- | --- |
| $\sqrt{a^2-x^2}$ | $x=a\sin\theta$ | $\sqrt{a^2-x^2}=a\cos\theta$ |
| $\sqrt{a^2+x^2}$ | $x=a\tan\theta$ | $\sqrt{a^2+x^2}=a\sec\theta$ |
| $\sqrt{x^2-a^2}$ | $x=a\sec\theta$ | $\sqrt{x^2-a^2}=a\tan\theta$ |

## B.4 级数

### 泰勒级数

若 $f$ 在 $x=a$ 处有任意阶导数，则

$$f(x)=\sum_{n=0}^{\infty}\frac{f^{(n)}(a)}{n!}(x-a)^n$$

### 麦克劳林级数

$$f(x)=\sum_{n=0}^{\infty}\frac{f^{(n)}(0)}{n!}x^n$$

### 常见展开

$$e^x=\sum_{n=0}^{\infty}\frac{x^n}{n!}=1+x+\frac{x^2}{2!}+\frac{x^3}{3!}+\cdots$$

$$\sin x=\sum_{n=0}^{\infty}\frac{(-1)^n x^{2n+1}}{(2n+1)!}
=x-\frac{x^3}{3!}+\frac{x^5}{5!}-\cdots$$

$$\cos x=\sum_{n=0}^{\infty}\frac{(-1)^n x^{2n}}{(2n)!}
=1-\frac{x^2}{2!}+\frac{x^4}{4!}-\cdots$$

$$\ln(1+x)=\sum_{n=1}^{\infty}\frac{(-1)^{n-1}x^n}{n}
=x-\frac{x^2}{2}+\frac{x^3}{3}-\cdots\quad (-1<x\le 1)$$

$$\frac{1}{1-x}=\sum_{n=0}^{\infty}x^n=1+x+x^2+\cdots\quad (|x|<1)$$

$$(1+x)^r=\sum_{n=0}^{\infty}\binom{r}{n}x^n
=1+rx+\frac{r(r-1)}{2!}x^2+\cdots\quad (|x|<1)$$

### 欧拉公式

$$e^{ix}=\cos x+i\sin x$$

由此可得：

$$e^{i\pi}+1=0$$

### 收敛半径

若 $\lim_{n\to\infty}\left|\frac{a_{n+1}}{a_n}\right|=L$，则收敛半径 $R=1/L$。

## B.5 向量运算符公式（笛卡儿坐标形式）

### 梯度

$$\nabla f=\left\langle \frac{\partial f}{\partial x},\frac{\partial f}{\partial y},\frac{\partial f}{\partial z}\right\rangle$$

### 散度

$$\nabla\cdot\mathbf{F}
=
\frac{\partial P}{\partial x}
+
\frac{\partial Q}{\partial y}
+
\frac{\partial R}{\partial z}$$

### 旋度

$$\nabla\times\mathbf{F}
=
\begin{vmatrix}
\mathbf{i} & \mathbf{j} & \mathbf{k}\\
\partial_x & \partial_y & \partial_z\\
P & Q & R
\end{vmatrix}$$

即

$$\nabla\times\mathbf{F}
=
\left\langle
\frac{\partial R}{\partial y}-\frac{\partial Q}{\partial z},
\frac{\partial P}{\partial z}-\frac{\partial R}{\partial x},
\frac{\partial Q}{\partial x}-\frac{\partial P}{\partial y}
\right\rangle$$

### 拉普拉斯算子

$$\nabla^2 f
=
\frac{\partial^2 f}{\partial x^2}
+
\frac{\partial^2 f}{\partial y^2}
+
\frac{\partial^2 f}{\partial z^2}$$

### 重要恒等式

$$\nabla\times(\nabla f)=\mathbf{0}$$

$$\nabla\cdot(\nabla\times\mathbf{F})=0$$

$$\nabla\cdot(f\mathbf{F})=\nabla f\cdot\mathbf{F}+f\nabla\cdot\mathbf{F}$$

$$\nabla\times(f\mathbf{F})=\nabla f\times\mathbf{F}+f\nabla\times\mathbf{F}$$

## B.6 极限

### 基本极限

$$\lim_{x\to 0}\frac{\sin x}{x}=1$$

$$\lim_{x\to 0}\frac{1-\cos x}{x}=0$$

$$\lim_{x\to 0}\frac{e^x-1}{x}=1$$

$$\lim_{x\to 0}\frac{\ln(1+x)}{x}=1$$

$$\lim_{x\to\infty}\left(1+\frac{1}{x}\right)^x=e$$

$$\lim_{x\to 0}(1+x)^{1/x}=e$$

### 等价无穷小（$x\to 0$）

$$\sin x\sim x,\qquad \tan x\sim x,\qquad \arcsin x\sim x$$

$$1-\cos x\sim \frac{x^2}{2}$$

$$e^x-1\sim x,\qquad \ln(1+x)\sim x$$

$$(1+x)^r-1\sim rx$$

### 洛必达法则

若 $\lim_{x\to c}\frac{f(x)}{g(x)}$ 为 $\frac{0}{0}$ 或 $\frac{\infty}{\infty}$ 型，且 $\lim_{x\to c}\frac{f'(x)}{g'(x)}$ 存在，则

$$\lim_{x\to c}\frac{f(x)}{g(x)}
=
\lim_{x\to c}\frac{f'(x)}{g'(x)}$$

## B.7 微分法则

### 基本导数

$$\frac{d}{dx}(c)=0$$

$$\frac{d}{dx}(x^n)=nx^{n-1}$$

$$\frac{d}{dx}(\sin x)=\cos x$$

$$\frac{d}{dx}(\cos x)=-\sin x$$

$$\frac{d}{dx}(\tan x)=\sec^2 x$$

$$\frac{d}{dx}(e^x)=e^x$$

$$\frac{d}{dx}(\ln x)=\frac{1}{x}$$

$$\frac{d}{dx}(\arcsin x)=\frac{1}{\sqrt{1-x^2}}$$

$$\frac{d}{dx}(\arctan x)=\frac{1}{1+x^2}$$

### 运算法则

$$(f\pm g)'=f'\pm g'$$

$$(fg)'=f'g+fg'$$

$$\left(\frac{f}{g}\right)'=\frac{f'g-fg'}{g^2}$$

$$(f\circ g)'(x)=f'(g(x))g'(x)$$

### 隐式微分

若 $F(x,y)=0$，则

$$\frac{dy}{dx}=-\frac{F_x}{F_y}$$

### 反函数微分

$$(f^{-1})'(x)=\frac{1}{f'(f^{-1}(x))}$$

## B.8 积分法则

### 换元法

$$\int f(g(x))g'(x)\,dx=\int f(u)\,du$$

其中 $u=g(x)$。

### 分部积分

$$\int u\,dv=uv-\int v\,du$$

### 部分分式

有理函数 $\frac{P(x)}{Q(x)}$ 可以分解为部分分式，再逐项积分。

### 三角代换

见 B.3 节。

### 定积分性质

$$\int_a^b f(x)\,dx=-\int_b^a f(x)\,dx$$

$$\int_a^b f(x)\,dx=\int_a^c f(x)\,dx+\int_c^b f(x)\,dx$$

$$\int_a^b [f(x)\pm g(x)]\,dx=\int_a^b f(x)\,dx\pm\int_a^b g(x)\,dx$$

### 微积分基本定理

$$\int_a^b f(x)\,dx=F(b)-F(a)$$

其中 $F'(x)=f(x)$。

## 本节易错点总结

1. 二项式系数 $\binom{n}{k}$ 与排列数不同，不要混淆。
2. 对数法则中，$\log_a(x+y)\neq \log_a x+\log_a y$。
3. 海伦公式中 $s$ 是半周长，不是周长。
4. 圆锥侧面积是 $\pi r l$，不是 $\pi r h$。
5. 积分 $\int x^{-1}dx=\ln|x|+C$，不要写成 $\frac{x^0}{0}$。
6. 泰勒级数展开要求函数在展开点有任意阶导数。
7. 常见级数展开的收敛半径不同，使用前要检查。
8. 梯度是向量，散度是标量，旋度是向量。
9. $\nabla\times(\nabla f)=\mathbf{0}$ 和 $\nabla\cdot(\nabla\times\mathbf{F})=0$ 是两个不同的恒等式。
10. 洛必达法则只适用于 $\frac{0}{0}$ 或 $\frac{\infty}{\infty}$ 型。
11. 等价无穷小只能在乘除中使用，加减中慎用。
12. 分部积分中 $u$ 和 $dv$ 的选择影响计算难度。

## 主动回忆问题

1. 写出二项式定理和二次方程求根公式。
2. 写出指数法则和对数法则。
3. 写出圆、球、圆锥的体积和面积公式。
4. 写出基本积分表（至少 10 个）。
5. 写出 $e^x$、$\sin x$、$\cos x$、$\ln(1+x)$ 的麦克劳林级数。
6. 写出梯度、散度、旋度的笛卡儿坐标公式。
7. 写出两个重要恒等式：$\nabla\times(\nabla f)=\mathbf{0}$ 和 $\nabla\cdot(\nabla\times\mathbf{F})=0$。
8. 写出基本极限 $\lim_{x\to 0}\frac{\sin x}{x}=1$ 和 $\lim_{x\to\infty}(1+1/x)^x=e$。
9. 写出乘积法则、商法则、链式法则。
10. 写出换元法、分部积分、部分分式、三角代换的公式。

## 发散性提问

1. 为什么二项式定理中的系数 $\binom{n}{k}$ 与组合数相同？它在概率论中有什么应用？
2. 泰勒级数为什么能表示函数？收敛半径的几何意义是什么？
3. 在向量分析中，梯度、散度、旋度分别描述什么物理量？它们之间有什么恒等式？
4. 积分简表中的公式是如何推导出来的？哪些可以用换元法，哪些需要分部积分？
5. 等价无穷小在极限计算中非常方便，但为什么在加减中不能随意替换？请举例说明。
6. 洛必达法则的适用条件是什么？如果极限不存在，能否说明原极限不存在？
7. 在数值计算中，泰勒级数展开如何用于近似函数值和估计误差？
8. 如何把本附录的公式推广到高维？例如，梯度、散度、旋度在曲线坐标系中的形式是什么？

**下一节预告：**
附录B 详解提问。
等你说“下一节”或“详解提问”，我继续推进。

---

## 提问 221

详解提问

## 回答 221

# 附录B 基本公式与法则 —— 主动回忆问题与发散性提问详解

> 下面把附录B末尾的**主动回忆问题**和**发散性提问**逐一详解。
>

## 一、主动回忆问题详解

### 1. 写出二项式定理和二次方程求根公式

**二项式定理**：

对任意正整数 $n$：

$$\boxed{
(a+b)^n=\sum_{k=0}^n \binom{n}{k}a^{n-k}b^k
}$$

其中二项式系数：

$$\binom{n}{k}=\frac{n!}{k!(n-k)!}$$

**展开形式**：

$$(a+b)^n=a^n+na^{n-1}b+\frac{n(n-1)}{2!}a^{n-2}b^2+\cdots+nab^{n-1}+b^n$$

**常见特例**：

- $n=2$：$(a+b)^2=a^2+2ab+b^2$
- $n=3$：$(a+b)^3=a^3+3a^2b+3ab^2+b^3$
- $n=0$：$(a+b)^0=1$

**广义二项式定理**（$r$ 为任意实数）：

$$(1+x)^r=\sum_{n=0}^\infty \binom{r}{n}x^n,\quad |x|<1$$

其中 $\binom{r}{n}=\frac{r(r-1)\cdots(r-n+1)}{n!}$。

**二次方程求根公式**：

方程 $ax^2+bx+c=0$（$a\neq 0$）的根为：

$$\boxed{
x=\frac{-b\pm\sqrt{b^2-4ac}}{2a}
}$$

**判别式**：

$$\Delta=b^2-4ac$$

- $\Delta>0$：两个不同实根；
- $\Delta=0$：一个重根 $x=-b/(2a)$；
- $\Delta<0$：两个共轭复根 $x=\frac{-b\pm i\sqrt{|\Delta|}}{2a}$。

**韦达定理**：

$$x_1+x_2=-\frac{b}{a},\qquad x_1x_2=\frac{c}{a}$$

### 2. 写出指数法则和对数法则

**指数法则**（$a>0$，$b>0$，$x,y\in\mathbb{R}$）：

$$\boxed{a^x a^y=a^{x+y}}$$

$$\boxed{\frac{a^x}{a^y}=a^{x-y}}$$

$$\boxed{(a^x)^y=a^{xy}}$$

$$\boxed{a^x b^x=(ab)^x}$$

$$a^0=1,\qquad a^{-x}=\frac{1}{a^x}$$

$$a^{1/n}=\sqrt[n]{a},\qquad a^{m/n}=\sqrt[n]{a^m}$$

**对数法则**（$a>0$，$a\neq 1$，$x>0$，$y>0$）：

$$\boxed{\log_a(xy)=\log_a x+\log_a y}$$

$$\boxed{\log_a\frac{x}{y}=\log_a x-\log_a y}$$

$$\boxed{\log_a x^r=r\log_a x}$$

$$\log_a 1=0,\qquad \log_a a=1$$

**换底公式**：

$$\boxed{\log_a x=\frac{\ln x}{\ln a}=\frac{\log_b x}{\log_b a}}$$

**反函数关系**：

$$a^{\log_a x}=x,\qquad \log_a a^x=x$$

**注意**：

$$\log_a(x+y)\neq \log_a x+\log_a y$$

这是最常见的错误之一。

### 3. 写出圆、球、圆锥的体积和面积公式

**圆**（半径 $r$）：

$$\boxed{\text{面积 }A=\pi r^2}$$

$$\boxed{\text{周长 }C=2\pi r}$$

**球**（半径 $r$）：

$$\boxed{\text{体积 }V=\frac{4}{3}\pi r^3}$$

$$\boxed{\text{表面积 }S=4\pi r^2}$$

**圆柱**（半径 $r$，高 $h$）：

$$\boxed{\text{体积 }V=\pi r^2 h}$$

$$\boxed{\text{侧面积 }S=2\pi r h}$$

$$\text{全面积 }S=2\pi r h+2\pi r^2$$

**圆锥**（底面半径 $r$，高 $h$，母线长 $l=\sqrt{r^2+h^2}$）：

$$\boxed{\text{体积 }V=\frac{1}{3}\pi r^2 h}$$

$$\boxed{\text{侧面积 }S=\pi r l}$$

$$\text{全面积 }S=\pi r l+\pi r^2$$

**扇形**（半径 $r$，圆心角 $\theta$）：

$$\text{面积 }A=\frac{1}{2}r^2\theta$$

$$\text{弧长 }s=r\theta$$

### 4. 写出基本积分表（至少 10 个）

$$\boxed{\int x^n\,dx=\frac{x^{n+1}}{n+1}+C\quad (n\neq -1)}$$

$$\boxed{\int \frac{1}{x}\,dx=\ln|x|+C}$$

$$\boxed{\int e^x\,dx=e^x+C}$$

$$\boxed{\int a^x\,dx=\frac{a^x}{\ln a}+C}$$

$$\boxed{\int \sin x\,dx=-\cos x+C}$$

$$\boxed{\int \cos x\,dx=\sin x+C}$$

$$\boxed{\int \sec^2 x\,dx=\tan x+C}$$

$$\boxed{\int \csc^2 x\,dx=-\cot x+C}$$

$$\boxed{\int \sec x\tan x\,dx=\sec x+C}$$

$$\boxed{\int \csc x\cot x\,dx=-\csc x+C}$$

$$\boxed{\int \frac{1}{1+x^2}\,dx=\arctan x+C}$$

$$\boxed{\int \frac{1}{\sqrt{1-x^2}}\,dx=\arcsin x+C}$$

$$\int \tan x\,dx=-\ln|\cos x|+C$$

$$\int \sec x\,dx=\ln|\sec x+\tan x|+C$$

### 5. 写出 $e^x$、$\sin x$、$\cos x$、$\ln(1+x)$ 的麦克劳林级数

**$e^x$**：

$$\boxed{
e^x=\sum_{n=0}^\infty \frac{x^n}{n!}
=1+x+\frac{x^2}{2!}+\frac{x^3}{3!}+\cdots
}$$

收敛半径：$R=\infty$。

**$\sin x$**：

$$\boxed{
\sin x=\sum_{n=0}^\infty \frac{(-1)^n x^{2n+1}}{(2n+1)!}
=x-\frac{x^3}{3!}+\frac{x^5}{5!}-\frac{x^7}{7!}+\cdots
}$$

收敛半径：$R=\infty$。

**$\cos x$**：

$$\boxed{
\cos x=\sum_{n=0}^\infty \frac{(-1)^n x^{2n}}{(2n)!}
=1-\frac{x^2}{2!}+\frac{x^4}{4!}-\frac{x^6}{6!}+\cdots
}$$

收敛半径：$R=\infty$。

**$\ln(1+x)$**：

$$\boxed{
\ln(1+x)=\sum_{n=1}^\infty \frac{(-1)^{n-1}x^n}{n}
=x-\frac{x^2}{2}+\frac{x^3}{3}-\frac{x^4}{4}+\cdots
}$$

收敛区间：$-1<x\le 1$。

**补充常用展开**：

$$\frac{1}{1-x}=1+x+x^2+x^3+\cdots,\quad |x|<1$$

$$(1+x)^r=1+rx+\frac{r(r-1)}{2!}x^2+\cdots,\quad |x|<1$$

$$\arctan x=x-\frac{x^3}{3}+\frac{x^5}{5}-\cdots,\quad |x|\le 1$$

### 6. 写出梯度、散度、旋度的笛卡儿坐标公式

**梯度**（标量函数 $f$）：

$$\boxed{
\nabla f
=
\left\langle
\frac{\partial f}{\partial x},
\frac{\partial f}{\partial y},
\frac{\partial f}{\partial z}
\right\rangle
}$$

**散度**（向量场 $\mathbf{F}=\langle P,Q,R\rangle$）：

$$\boxed{
\nabla\cdot\mathbf{F}
=
\frac{\partial P}{\partial x}
+
\frac{\partial Q}{\partial y}
+
\frac{\partial R}{\partial z}
}$$

**旋度**（向量场 $\mathbf{F}=\langle P,Q,R\rangle$）：

$$\boxed{
\nabla\times\mathbf{F}
=
\begin{vmatrix}
\mathbf{i} & \mathbf{j} & \mathbf{k}\\
\dfrac{\partial}{\partial x} & \dfrac{\partial}{\partial y} & \dfrac{\partial}{\partial z}\\
P & Q & R
\end{vmatrix}
}$$

展开：

$$\nabla\times\mathbf{F}
=
\left\langle
\frac{\partial R}{\partial y}-\frac{\partial Q}{\partial z},
\frac{\partial P}{\partial z}-\frac{\partial R}{\partial x},
\frac{\partial Q}{\partial x}-\frac{\partial P}{\partial y}
\right\rangle$$

**拉普拉斯算子**：

$$\nabla^2 f
=
\nabla\cdot(\nabla f)
=
\frac{\partial^2 f}{\partial x^2}
+
\frac{\partial^2 f}{\partial y^2}
+
\frac{\partial^2 f}{\partial z^2}$$

### 7. 写出两个重要恒等式

**恒等式 1**：梯度的旋度为零：

$$\boxed{\nabla\times(\nabla f)=\mathbf{0}}$$

**证明**：直接计算：

$$\nabla\times(\nabla f)
=
\left\langle
\frac{\partial}{\partial y}\frac{\partial f}{\partial z}-\frac{\partial}{\partial z}\frac{\partial f}{\partial y},
\cdots
\right\rangle
=
\mathbf{0}$$

因为混合偏导数相等。

**物理意义**：保守场无旋。

**恒等式 2**：旋度的散度为零：

$$\boxed{\nabla\cdot(\nabla\times\mathbf{F})=0}$$

**证明**：直接计算：

$$\nabla\cdot(\nabla\times\mathbf{F})
=
\frac{\partial}{\partial x}\left(\frac{\partial R}{\partial y}-\frac{\partial Q}{\partial z}\right)
+\cdots
=
0$$

因为混合偏导数相等。

**物理意义**：旋度场无散。例如磁场 $\mathbf{B}$ 无散，存在向量势 $\mathbf{A}$ 使 $\mathbf{B}=\nabla\times\mathbf{A}$。

### 8. 写出基本极限

$$\boxed{
\lim_{x\to 0}\frac{\sin x}{x}=1
}$$

**几何证明**：对 $0<x<\pi/2$，比较面积：

$$\frac{1}{2}\sin x<\frac{1}{2}x<\frac{1}{2}\tan x$$

得

$$\cos x<\frac{\sin x}{x}<1$$

由夹层定理，极限为 1。

$$\boxed{
\lim_{x\to\infty}\left(1+\frac{1}{x}\right)^x=e
}$$

**证明思路**：令 $f(x)=\ln(1+x)$。则 $f'(0)=1$，所以

$$\lim_{x\to 0}\frac{\ln(1+x)}{x}=1$$

即

$$\lim_{x\to 0}(1+x)^{1/x}=e$$

令 $x=1/t$ 即得。

**其他相关极限**：

$$\lim_{x\to 0}\frac{1-\cos x}{x}=0$$

$$\lim_{x\to 0}\frac{e^x-1}{x}=1$$

$$\lim_{x\to 0}\frac{\ln(1+x)}{x}=1$$

### 9. 写出乘积法则、商法则、链式法则

**乘积法则**：

$$\boxed{(fg)'=f'g+fg'}$$

**商法则**：

$$\boxed{
\left(\frac{f}{g}\right)'
=
\frac{f'g-fg'}{g^2}
}$$

**链式法则**：

$$\boxed{
(f\circ g)'(x)=f'(g(x))\cdot g'(x)
}$$

**莱布尼茨记号**：若 $y=f(u)$，$u=g(x)$，则

$$\frac{dy}{dx}=\frac{dy}{du}\cdot\frac{du}{dx}$$

### 10. 写出换元法、分部积分、部分分式、三角代换的公式

**换元法**：

$$\boxed{
\int f(g(x))g'(x)\,dx
=
\int f(u)\,du
}$$

其中 $u=g(x)$。定积分形式：

$$\int_a^b f(g(x))g'(x)\,dx
=
\int_{g(a)}^{g(b)} f(u)\,du$$

**分部积分**：

$$\boxed{
\int u\,dv=uv-\int v\,du
}$$

定积分形式：

$$\int_a^b u\,dv=[uv]_a^b-\int_a^b v\,du$$

**部分分式**：将有理函数 $\frac{P(x)}{Q(x)}$ 分解为简单分式之和。

常见形式：

- $\frac{A}{x-a}$
- $\frac{A}{(x-a)^n}$
- $\frac{Ax+B}{x^2+px+q}$

**三角代换**：

| 形式 | 代换 | 结果 |
| --- | --- | --- |
| $\sqrt{a^2-x^2}$ | $x=a\sin\theta$ | $\sqrt{a^2-x^2}=a\cos\theta$ |
| $\sqrt{a^2+x^2}$ | $x=a\tan\theta$ | $\sqrt{a^2+x^2}=a\sec\theta$ |
| $\sqrt{x^2-a^2}$ | $x=a\sec\theta$ | $\sqrt{x^2-a^2}=a\tan\theta$ |

## 二、发散性提问详解

### 1. 为什么二项式定理中的系数 $\binom{n}{k}$ 与组合数相同？它在概率论中有什么应用？

**为什么相同**：

展开 $(a+b)^n=(a+b)(a+b)\cdots(a+b)$（$n$ 个因子）。要得到 $a^{n-k}b^k$，需要从 $n$ 个因子中选择 $k$ 个贡献 $b$，其余 $n-k$ 个贡献 $a$。选择 $k$ 个因子的方式数为：

$$\binom{n}{k}=\frac{n!}{k!(n-k)!}$$

这正是组合数的定义：从 $n$ 个对象中取 $k$ 个的组合数。

**在概率论中的应用**：

**（1）二项分布**：进行 $n$ 次独立试验，每次成功概率为 $p$，则成功 $k$ 次的概率为：

$$P(X=k)=\binom{n}{k}p^k(1-p)^{n-k}$$

**（2）伯努利试验**：抛硬币 $n$ 次，正面出现 $k$ 次的概率为 $\binom{n}{k}/2^n$。

**（3）组合计数**：从 $n$ 个元素中取 $k$ 个的方法数为 $\binom{n}{k}$。

**（4）期望与方差**：二项分布的期望 $E[X]=np$，方差 $\text{Var}(X)=np(1-p)$。

**（5）帕斯卡三角形**：二项式系数排列成帕斯卡三角形，满足递推关系：

$$\binom{n}{k}=\binom{n-1}{k-1}+\binom{n-1}{k}$$

### 2. 泰勒级数为什么能表示函数？收敛半径的几何意义是什么？

**泰勒级数为什么能表示函数**：

泰勒级数

$$f(x)=\sum_{n=0}^\infty \frac{f^{(n)}(a)}{n!}(x-a)^n$$

用多项式逼近函数。其核心思想是：**用函数在某点的各阶导数信息，重构函数在该点附近的取值**。

**直观理解**：

- 0 阶：$f(a)$ 匹配函数值；
- 1 阶：$f'(a)$ 匹配斜率；
- 2 阶：$f''(a)$ 匹配曲率；
- 依次匹配更高阶的局部行为。

**泰勒定理**：若 $f$ 在 $a$ 附近有 $n+1$ 阶导数，则

$$f(x)=P_n(x)+R_n(x)$$

其中 $P_n$ 是 $n$ 阶泰勒多项式，余项

$$R_n(x)=\frac{f^{(n+1)}(\xi)}{(n+1)!}(x-a)^{n+1}$$

对某个 $\xi$ 介于 $a$ 和 $x$ 之间。

若 $R_n(x)\to 0$ 当 $n\to\infty$，则泰勒级数收敛到 $f(x)$。

**收敛半径的几何意义**：

幂级数 $\sum a_n(x-a)^n$ 的收敛半径 $R$ 定义为：

$$R=\frac{1}{\limsup_{n\to\infty}|a_n|^{1/n}}$$

**几何意义**：

- 在 $|x-a|<R$ 内，级数绝对收敛；
- 在 $|x-a|>R$ 外，级数发散；
- 在 $|x-a|=R$ 上，行为不确定（可能收敛也可能发散）。

**复平面上的意义**：收敛半径等于从展开中心 $a$ 到最近的**奇点**的距离。例如：

- $1/(1-x)$ 在 $x=0$ 展开，收敛半径 $R=1$，因为 $x=1$ 是奇点；
- $\ln(1+x)$ 在 $x=0$ 展开，收敛半径 $R=1$，因为 $x=-1$ 是奇点。

**应用**：泰勒级数用于数值逼近、求解微分方程、计算极限、估计误差。

### 3. 在向量分析中，梯度、散度、旋度分别描述什么物理量？它们之间有什么恒等式？

**梯度** $\nabla f$：

- **物理量**：标量场 $f$ 变化最快的方向和速率；
- **例子**：温度梯度、电势梯度、高度梯度；
- **方向**：指向 $f$ 增加最快的方向；
- **大小**：最大方向导数。

**散度** $\nabla\cdot\mathbf{F}$：

- **物理量**：向量场的源汇强度；
- **例子**：流体速度场的散度、电场的散度；
- **正散度**：有源；
- **负散度**：有汇；
- **零散度**：无源无汇（不可压缩流体）。

**旋度** $\nabla\times\mathbf{F}$：

- **物理量**：向量场的局部旋转趋势；
- **例子**：流体涡量、磁场旋度；
- **方向**：旋转轴方向（右手法则）；
- **大小**：单位面积最大环流。

**重要恒等式**：

| 恒等式 | 意义 |
| --- | --- |
| $\nabla\times(\nabla f)=\mathbf{0}$ | 梯度的旋度为零（保守场无旋） |
| $\nabla\cdot(\nabla\times\mathbf{F})=0$ | 旋度的散度为零（旋度场无散） |
| $\nabla\cdot(f\mathbf{F})=\nabla f\cdot\mathbf{F}+f\nabla\cdot\mathbf{F}$ | 乘积的散度 |
| $\nabla\times(f\mathbf{F})=\nabla f\times\mathbf{F}+f\nabla\times\mathbf{F}$ | 乘积的旋度 |
| $\nabla\cdot(\nabla f)=\nabla^2 f$ | 拉普拉斯算子 |

**物理应用**：

- 电磁学：$\nabla\cdot\mathbf{E}=\rho/\varepsilon_0$，$\nabla\cdot\mathbf{B}=0$，$\nabla\times\mathbf{E}=-\partial\mathbf{B}/\partial t$，$\nabla\times\mathbf{B}=\mu_0\mathbf{J}+\mu_0\varepsilon_0\partial\mathbf{E}/\partial t$；
- 流体力学：$\nabla\cdot\mathbf{v}=0$（不可压缩），$\boldsymbol{\omega}=\nabla\times\mathbf{v}$（涡量）；
- 热传导：$\mathbf{q}=-k\nabla T$（傅里叶定律）。

### 4. 积分简表中的公式是如何推导出来的？哪些可以用换元法，哪些需要分部积分？

**推导方法分类**：

**（1）换元法**：

- $\int \frac{1}{x}dx=\ln|x|+C$：令 $u=x$，或直接由 $(ln x)'=1/x$；
- $\int e^{ax}dx=\frac{1}{a}e^{ax}+C$：令 $u=ax$；
- $\int \sin(ax)dx=-\frac{1}{a}\cos(ax)+C$：令 $u=ax$；
- $\int \frac{1}{x^2+a^2}dx=\frac{1}{a}\arctan\frac{x}{a}+C$：令 $x=a\tan\theta$。

**（2）分部积分**：

- $\int x e^x dx=x e^x-e^x+C$：令 $u=x$，$dv=e^x dx$；
- $\int \ln x\,dx=x\ln x-x+C$：令 $u=\ln x$，$dv=dx$；
- $\int x\sin x\,dx=-x\cos x+\sin x+C$：令 $u=x$，$dv=\sin x\,dx$；
- $\int \arctan x\,dx=x\arctan x-\frac{1}{2}\ln(1+x^2)+C$。

**（3）三角恒等式**：

- $\int \sin^2 x\,dx=\frac{x}{2}-\frac{\sin 2x}{4}+C$：用 $\sin^2 x=\frac{1-\cos 2x}{2}$；
- $\int \cos^2 x\,dx=\frac{x}{2}+\frac{\sin 2x}{4}+C$：用 $\cos^2 x=\frac{1+\cos 2x}{2}$；
- $\int \tan x\,dx=-\ln|\cos x|+C$：用 $\tan x=\frac{\sin x}{\cos x}$，换元 $u=\cos x$。

**（4）部分分式**：

- $\int \frac{1}{x^2-a^2}dx=\frac{1}{2a}\ln\left|\frac{x-a}{x+a}\right|+C$：分解为 $\frac{1}{2a}\left(\frac{1}{x-a}-\frac{1}{x+a}\right)$；
- $\int \frac{1}{x(x+1)}dx=\ln\left|\frac{x}{x+1}\right|+C$：分解为 $\frac{1}{x}-\frac{1}{x+1}$。

**（5）三角代换**：

- $\int \sqrt{a^2-x^2}dx=\frac{x}{2}\sqrt{a^2-x^2}+\frac{a^2}{2}\arcsin\frac{x}{a}+C$：令 $x=a\sin\theta$；
- $\int \frac{1}{\sqrt{x^2+a^2}}dx=\ln|x+\sqrt{x^2+a^2}|+C$：令 $x=a\tan\theta$。

**总结**：积分简表中的公式大多可以通过换元法、分部积分、三角恒等式、部分分式或三角代换推导。熟练掌握这些方法，可以自己推导出表中没有的公式。

### 5. 等价无穷小在极限计算中非常方便，但为什么在加减中不能随意替换？请举例说明

**等价无穷小**：当 $x\to 0$ 时，$\sin x\sim x$，$\tan x\sim x$，$1-\cos x\sim x^2/2$，$e^x-1\sim x$，$\ln(1+x)\sim x$。

**为什么在加减中不能随意替换**：

等价无穷小只保证**比值**趋近于 1，即 $\frac{f(x)}{g(x)}\to 1$。在乘除中，这种误差会被“约掉”；但在加减中，误差可能被放大，导致结果错误。

**反例 1**：

$$\lim_{x\to 0}\frac{\tan x-\sin x}{x^3}$$

若随意替换 $\tan x\sim x$，$\sin x\sim x$，则

$$\frac{x-x}{x^3}=0$$

但实际结果为 $1/2$。正确做法：用泰勒展开

$$\tan x=x+\frac{x^3}{3}+\cdots,\qquad \sin x=x-\frac{x^3}{6}+\cdots$$

所以

$$\tan x-\sin x=\frac{x^3}{3}+\frac{x^3}{6}+\cdots=\frac{x^3}{2}+\cdots$$

因此极限为 $1/2$。

**反例 2**：

$$\lim_{x\to 0}\frac{e^x-1-x}{x^2}$$

若替换 $e^x-1\sim x$，则分子为 $x-x=0$，极限为 0。但实际结果为 $1/2$。正确做法：

$$e^x=1+x+\frac{x^2}{2}+\cdots$$

所以 $e^x-1-x\sim x^2/2$。

**正确使用原则**：

- 乘除中可以使用等价无穷小替换；
- 加减中应使用**泰勒展开**，保留足够高阶的项；
- 若非要替换，需保证替换后的误差比分母高阶。

**推广**：等价无穷小本质上是泰勒展开的一阶近似。在加减中，一阶近似可能不够，需要更高阶。

### 6. 洛必达法则的适用条件是什么？如果极限不存在，能否说明原极限不存在？

**洛必达法则**：

若 $\lim_{x\to c}f(x)=\lim_{x\to c}g(x)=0$ 或 $\pm\infty$（即 $\frac{0}{0}$ 或 $\frac{\infty}{\infty}$ 型），且：

1. $f$ 和 $g$ 在 $c$ 附近（除 $c$ 外）可导；
2. $g'(x)\neq 0$ 在 $c$ 附近；
3. $\lim_{x\to c}\frac{f'(x)}{g'(x)}$ 存在（或为 $\pm\infty$）；

则

$$\boxed{
\lim_{x\to c}\frac{f(x)}{g(x)}
=
\lim_{x\to c}\frac{f'(x)}{g'(x)}
}$$

**适用条件**：

- 必须是 $\frac{0}{0}$ 或 $\frac{\infty}{\infty}$ 型；
- 分子分母在去心邻域内可导；
- 分母的导数不为零；
- **导数的比的极限存在**。

**如果极限不存在，能否说明原极限不存在**：

**不能**。若 $\lim\frac{f'}{g'}$ 不存在，原极限 $\lim\frac{f}{g}$ 可能仍然存在。

**反例**：

$$\lim_{x\to\infty}\frac{x+\sin x}{x}$$

分子分母都趋于无穷，是 $\frac{\infty}{\infty}$ 型。用洛必达法则：

$$\lim_{x\to\infty}\frac{1+\cos x}{1}$$

这个极限不存在（因为 $\cos x$ 振荡）。但原极限存在：

$$\lim_{x\to\infty}\frac{x+\sin x}{x}
=
\lim_{x\to\infty}\left(1+\frac{\sin x}{x}\right)
=
1$$

**结论**：洛必达法则的失败（导数比极限不存在）不说明原极限不存在。此时需要用其他方法（如夹层定理、泰勒展开、等价无穷小）。

**注意事项**：

- 每次使用洛必达法则前，必须检查是否满足 $\frac{0}{0}$ 或 $\frac{\infty}{\infty}$ 型；
- 可能需要多次使用；
- 若导数比极限不存在，应改用其他方法。

### 7. 在数值计算中，泰勒级数展开如何用于近似函数值和估计误差？

**近似函数值**：

用 $n$ 阶泰勒多项式

$$P_n(x)=\sum_{k=0}^n \frac{f^{(k)}(a)}{k!}(x-a)^k$$

近似 $f(x)$：

$$f(x)\approx P_n(x)$$

**例子**：计算 $\sin(0.1)$。

用麦克劳林级数：

$$\sin x\approx x-\frac{x^3}{6}$$

取 $x=0.1$：

$$\sin(0.1)\approx 0.1-\frac{0.001}{6}\approx 0.0998333$$

实际值 $\sin(0.1)=0.0998334$，误差约 $10^{-7}$。

**误差估计**：

由泰勒定理，余项为：

$$R_n(x)=\frac{f^{(n+1)}(\xi)}{(n+1)!}(x-a)^{n+1}$$

对某个 $\xi$ 介于 $a$ 和 $x$ 之间。

**误差上界**：

$$|R_n(x)|\le \frac{M}{(n+1)!}|x-a|^{n+1}$$

其中 $M=\max|f^{(n+1)}(\xi)|$。

**例子**：估计 $\sin(0.1)$ 用 $P_3(x)=x-\frac{x^3}{6}$ 的误差。

$$R_3(x)=\frac{f^{(4)}(\xi)}{4!}x^4=\frac{\sin\xi}{4!}x^4$$

因为 $|\sin\xi|\le 1$：

$$|R_3(0.1)|\le\frac{1}{24}(0.1)^4\approx 4.17\times 10^{-6}$$

**数值计算中的应用**：

- **计算器算法**：计算器用泰勒级数或切比雪夫多项式近似三角函数、指数、对数；
- **数值微分**：用泰勒展开推导有限差分公式；
- **数值积分**：用泰勒展开估计误差；
- **求解微分方程**：用泰勒级数构造数值解。

**实用技巧**：

- 选择展开点 $a$ 使计算简单（如 $a=0$）；
- 选择足够多的项以达到精度要求；
- 用余项估计误差，确定所需项数。

### 8. 如何把本附录的公式推广到高维？例如，梯度、散度、旋度在曲线坐标系中的形式是什么？

**推广到高维**：

**（1）梯度**：从标量函数 $f$ 到向量场

$$\nabla f=\left(\frac{\partial f}{\partial x_1},\frac{\partial f}{\partial x_2},\dots,\frac{\partial f}{\partial x_n}\right)$$

**（2）散度**：从向量场 $\mathbf{F}=(F_1,\dots,F_n)$ 到标量

$$\nabla\cdot\mathbf{F}=\sum_{i=1}^n\frac{\partial F_i}{\partial x_i}$$

**（3）旋度**：从向量场到反对称矩阵（或 2-形式）

$$(\nabla\times\mathbf{F})_{ij}=\frac{\partial F_j}{\partial x_i}-\frac{\partial F_i}{\partial x_j}$$

**曲线坐标系中的形式**：

**柱坐标**（$r,\theta,z$）：

- 梯度： $\nabla f=\frac{\partial f}{\partial r}\mathbf{e}_r
+\frac{1}{r}\frac{\partial f}{\partial\theta}\mathbf{e}_\theta
+\frac{\partial f}{\partial z}\mathbf{e}_z$
- 散度： $\nabla\cdot\mathbf{F}
=
\frac{1}{r}\frac{\partial}{\partial r}(rF_r)
+\frac{1}{r}\frac{\partial F_\theta}{\partial\theta}
+\frac{\partial F_z}{\partial z}$
- 旋度： $\nabla\times\mathbf{F}
=
\left(
\frac{1}{r}\frac{\partial F_z}{\partial\theta}-\frac{\partial F_\theta}{\partial z}
\right)\mathbf{e}_r
+\left(
\frac{\partial F_r}{\partial z}-\frac{\partial F_z}{\partial r}
\right)\mathbf{e}_\theta
+\frac{1}{r}\left(
\frac{\partial}{\partial r}(rF_\theta)-\frac{\partial F_r}{\partial\theta}
\right)\mathbf{e}_z$

**球坐标**（$\rho,\phi,\theta$）：

- 梯度： $\nabla f=\frac{\partial f}{\partial\rho}\mathbf{e}_\rho
+\frac{1}{\rho}\frac{\partial f}{\partial\phi}\mathbf{e}_\phi
+\frac{1}{\rho\sin\phi}\frac{\partial f}{\partial\theta}\mathbf{e}_\theta$
- 散度： $\nabla\cdot\mathbf{F}
=
\frac{1}{\rho^2}\frac{\partial}{\partial\rho}(\rho^2F_\rho)
+\frac{1}{\rho\sin\phi}\frac{\partial}{\partial\phi}(\sin\phi F_\phi)
+\frac{1}{\rho\sin\phi}\frac{\partial F_\theta}{\partial\theta}$
- 旋度： $\nabla\times\mathbf{F}
=
\frac{1}{\rho\sin\phi}
\left[
\frac{\partial}{\partial\phi}(\sin\phi F_\theta)-\frac{\partial F_\phi}{\partial\theta}
\right]\mathbf{e}_\rho
+\frac{1}{\rho}
\left[
\frac{1}{\sin\phi}\frac{\partial F_\rho}{\partial\theta}-\frac{\partial}{\partial\rho}(\rho F_\theta)
\right]\mathbf{e}_\phi
+\frac{1}{\rho}
\left[
\frac{\partial}{\partial\rho}(\rho F_\phi)-\frac{\partial F_\rho}{\partial\phi}
\right]\mathbf{e}_\theta$

**推广到流形**：

在微分几何中，梯度、散度、旋度可以用**外微分**和**霍奇星算子**统一表示：

- 梯度：$df$（外微分）；
- 旋度：$*d\omega$（外微分 + 霍奇星）；
- 散度：$*d*\omega$。

**应用**：

- 电磁学中的麦克斯韦方程组；
- 流体力学中的纳维-斯托克斯方程；
- 广义相对论中的爱因斯坦场方程；
- 计算机图形学中的曲面微分算子。

## 三、总结

1. 二项式定理：$(a+b)^n=\sum\binom{n}{k}a^{n-k}b^k$，系数为组合数。
2. 二次方程求根：$x=\frac{-b\pm\sqrt{b^2-4ac}}{2a}$。
3. 指数、对数法则，注意 $\log(x+y)\neq\log x+\log y$。
4. 圆、球、圆锥的体积和面积公式。
5. 基本积分表：幂、指数、三角、反三角。
6. 麦克劳林级数：$e^x$、$\sin x$、$\cos x$、$\ln(1+x)$。
7. 梯度、散度、旋度的笛卡儿坐标公式。
8. 两个重要恒等式：$\nabla\times(\nabla f)=\mathbf{0}$，$\nabla\cdot(\nabla\times\mathbf{F})=0$。
9. 基本极限：$\lim\frac{\sin x}{x}=1$，$\lim(1+1/x)^x=e$。
10. 乘积、商、链式法则。
11. 换元法、分部积分、部分分式、三角代换。
12. 泰勒级数用于近似和误差估计。
13. 等价无穷小在加减中不能随意替换。
14. 洛必达法则失败不说明原极限不存在。
15. 梯度、散度、旋度可以推广到高维和曲线坐标系。

这些公式和法则构成微积分计算的工具箱，熟练掌握可以大幅提高解题效率和准确性。

**下一节预告：**
附录B 详解提问已完成。下一节将进入第14章复习指导问题的详解提问，或根据用户指示继续推进。
等你说“下一节”，我继续推进。

---
