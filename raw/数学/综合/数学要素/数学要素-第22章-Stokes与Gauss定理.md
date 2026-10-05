---
title: "数学要素 · 第22章 Stokes与Gauss定理"
tags: [数学, 读书笔记]
created: "2026-10-05"
type: literature
summary: "数学要素 第22章 Stokes与Gauss定理 伴读（2 轮）。"
---

# 第22章 Stokes与Gauss定理 —— 三大定理的统一

## 📘 本节概览

Stokes定理和Gauss散度定理是向量分析的核心——"边界积分=内部微分积分"。

## 📐 1. Stokes定理

$$\oint_{\partial S} \vec{F}\cdot d\vec{r} = \iint_S (\nabla\times\vec{F})\cdot d\vec{S}$$

> 🔍 **物理意义**：左=沿边界的环量，右=曲面上的旋度通量。"总环量=旋度总和"——旋度是"环量密度"。

## 📐 2. Gauss散度定理

$$\oint_{\partial V} \vec{F}\cdot d\vec{S} = \iiint_V \nabla\cdot\vec{F}\,dV$$

> 🔍 **推导**：先证长方体：$\oint_{\partial V}F_x\,dy\,dz = \iiint_V \partial_x F_x\,dV$（对面相消+微积分基本定理）。一般区域用分割+拼接。

> 🎯 散度 $\nabla\cdot\vec{F}$ 是"源密度"——每单位体积产生多少通量。Gauss定理说"总产出=总流出"——这是**守恒律**的数学表述。

## 📐 3. 统一：微分形式

$$\int_{\partial M}\omega = \int_M d\omega$$

Green（$n=2$，$k=1$）、Stokes（$n=3$，$k=2$）、Gauss（$n=3$，$k=3$）都是特例。

> 💡 这是**微积分基本定理**的推广：$\int_a^b f'\,dx = f(b)-f(a)$→"边界值=内部导数积分"。

## 📝 本节要点

1. Stokes：环量=旋度通量；Gauss：通量=散度积分。
2. 三大定理统一为 $\int_{\partial M}\omega=\int_M d\omega$——微积分基本定理的推广。
3. 守恒律=Gauss定理的物理表述。

## 🔮 发散性提问

1. **Gauss定理在流体中给出质量守恒（连续性方程 $\nabla\cdot\vec{v}+\partial\rho/\partial t=0$），在电磁学中给出Gauss定律（$\nabla\cdot\vec{E}=\rho/\epsilon_0$）。这些"守恒律"的数学结构有什么共同点？**
2. **Stokes定理的"反向"——已知边界积分，推断内部微分——有什么应用？CT扫描的数学原理与此有关吗？**

如果你准备好了，请说 **"下一节"**，我将继续讲解 **第23章：微分方程**。

---

---

### 🤔 问题 1：守恒律的共同结构

所有守恒律都是**连续性方程**：$\partial_t u + \nabla\cdot\vec{J} = S$，其中 $u$ 是密度，$\vec{J}$ 是流，$S$ 是源。积分形式：$\frac{d}{dt}\int_V u\,dV = -\oint_{\partial V}\vec{J}\cdot d\vec{S} + \int_V S\,dV$——"内部变化=-流出+产生"。

质量守恒：$u=\rho$，$\vec{J}=\rho\vec{v}$，$S=0$。Gauss定律：$u$ 无时间项（静场），$\vec{J}=\vec{E}$，$S=\rho/\epsilon_0$。共同点：**Gauss定理将微分形式（局部）和积分形式（全局）统一**。

### 🤔 问题 2：Stokes的"反向"

从边界积分推断内部——这是**Radon变换**的思想：从"投影"（边界积分）重建内部结构。CT扫描的数学原理是Radon变换——从所有方向的线积分重建2D/3D密度函数。Radon逆变换公式依赖Stokes定理的推广。MRI的数学原理是**Fourier变换**（不是Radon变换），但两者都是"从边界/投影信息重建内部"的思想。

---

---
