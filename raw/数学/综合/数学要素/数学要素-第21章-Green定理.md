---
title: "数学要素 · 第21章 Green定理"
tags: [数学, 读书笔记]
created: "2026-10-05"
type: literature
summary: "数学要素 第21章 Green定理 伴读（2 轮）。"
---

# 第21章 Green定理 —— 2D版Stokes定理

## 📘 本节概览

Green定理将2D区域上的二重积分转化为边界上的线积分——Stokes定理的2D特例。

## 📐 1. Green定理

$$\oint_{\partial D} (P\,dx+Q\,dy) = \iint_D \left(\frac{\partial Q}{\partial x}-\frac{\partial P}{\partial y}\right)dx\,dy$$

> 🔍 **证明思路**：先证简单情形 $Q=0$：$\oint_{\partial D}P\,dx = -\iint_D P_y\,dx\,dy$。对 $y$-简单区域 $D=\{(x,y):a\leq x\leq b, \phi_1(x)\leq y\leq\phi_2(x)\}$，左端=上下边界积分相消，右端=Fubini定理。一般区域用分割+拼接。

## 📐 2. 面积公式

$A = \frac{1}{2}\oint_{\partial D}(x\,dy-y\,dx)$

> 🔍 **推导**：令 $P=-y/2$，$Q=x/2$→$Q_x-P_y=1$→Green定理给出面积。

## 📐 3. 与Stokes定理的关系

Green定理=Stokes定理在2D的特例：$\oint_{\partial D}\omega = \iint_D d\omega$，$\omega=P\,dx+Q\,dy$，$d\omega=(Q_x-P_y)dx\wedge dy$。

> 💡 微分形式语言统一了Green、Stokes、Gauss——"边界上积分=内部微分积分"。

## 📝 本节要点

1. Green定理：边界线积分=区域二重积分——2D版Stokes。
2. 面积可用边界线积分计算——几何应用。
3. 微分形式语言统一三大定理。

## 🔮 发散性提问

1. **Green定理的证明中，为什么需要区域是"简单"的？非简单区域（如环形）如何处理？**
2. **Green定理→Cauchy积分公式：$\oint f(z)dz=2\pi i\sum\text{Res}$。复分析与向量分析的统一？**

如果你准备好了，请说 **"下一节"**，我将继续讲解 **第22章：Stokes与Gauss定理**。

---

---

### 🤔 问题 1：非简单区域

环形区域 $D$ 的边界有两条曲线（外边界正向+内边界反向）。Green定理仍成立：$\oint_{\partial D}=\oint_{\text{外}}-\oint_{\text{内}}$。一般：用"切割"将非简单区域化为简单区域——切割线上的积分正反相消。

### 🤔 问题 2：Cauchy积分公式

$f(z)=u+iv$，$dz=dx+idy$。$\oint f(z)dz = \oint(u\,dx-v\,dy)+i\oint(v\,dx+u\,dy)$。Green定理：$= \iint(-v_x-u_y)dxdy+i\iint(u_x-v_y)dxdy$。Cauchy-Riemann方程 $u_x=v_y$，$u_y=-v_x$→两个被积函数=0→$\oint f(z)dz=0$（Cauchy定理）。有极点时用留数——Cauchy积分公式是Green定理+极点贡献。

---

---
