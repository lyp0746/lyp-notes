---
title: "机器学习 · 第5章 SVM"
tags: [数学, 读书笔记]
created: "2026-10-05"
type: literature
summary: "机器学习 第5章 SVM 伴读（2 轮）。"
---

# 第5章 SVM —— 间隔最大化与对偶

## 📘 本节概览

SVM的数学核心是**间隔最大化**——找离所有样本最远的超平面。对偶理论将问题从特征空间转到样本空间，核技巧使非线性分类成为可能。

## 📐 1. 硬间隔SVM

原始问题：$\min_{\vec{w},b} \frac{1}{2}\|\vec{w}\|^2$ s.t. $y_i(\vec{w}^T\vec{x}_i+b) \geq 1$

> 🔍 **间隔的推导**：超平面 $\vec{w}^T\vec{x}+b=0$ 到点 $\vec{x}_i$ 的距离 $= |y_i(\vec{w}^T\vec{x}_i+b)|/\|\vec{w}\|$。约束要求 $y_i(\vec{w}^T\vec{x}_i+b) \geq 1$，所以间隔 $\geq 1/\|\vec{w}\|$。最大化间隔=最小化 $\|\vec{w}\|^2$。

## 📐 2. 对偶问题

Lagrange函数：$L = \frac{1}{2}\|\vec{w}\|^2 - \sum\alpha_i[y_i(\vec{w}^T\vec{x}_i+b)-1]$

> 🔍 **推导对偶**：$\partial L/\partial\vec{w}=0$→$\vec{w}=\sum\alpha_i y_i\vec{x}_i$，$\partial L/\partial b=0$→$\sum\alpha_i y_i=0$

代入得对偶：$\max_\alpha \sum\alpha_i - \frac{1}{2}\sum\sum\alpha_i\alpha_j y_i y_j \vec{x}_i^T\vec{x}_j$ s.t. $\alpha_i \geq 0$, $\sum\alpha_i y_i = 0$

> 💡 **强对偶**：Slater条件成立（可行解存在）→对偶间隙为零→KKT条件给出最优解。

## 📐 3. 核技巧

对偶中只出现内积 $\vec{x}_i^T\vec{x}_j$→替换为 $K(\vec{x}_i,\vec{x}_j)=\phi(\vec{x}_i)^T\phi(\vec{x}_j)$

隐式映射到高维空间——无需显式计算 $\phi$。

## 📐 4. 软间隔与KKT

软间隔：$\min \frac{1}{2}\|\vec{w}\|^2 + C\sum\xi_i$ s.t. $y_i(\vec{w}^T\vec{x}_i+b) \geq 1-\xi_i$, $\xi_i \geq 0$

KKT条件：$0 \leq \alpha_i \leq C$，$\alpha_i[y_i(\vec{w}^T\vec{x}_i+b)-1+\xi_i]=0$

支持向量：$\alpha_i > 0$ 的样本。$0 < \alpha_i < C$→在间隔边界上；$\alpha_i = C$→在间隔内或误分类。

## 📝 本节要点

1. SVM=间隔最大化→凸优化→对偶→核技巧。
2. 对偶只依赖内积→核方法可行——隐式高维映射。
3. KKT条件确定支持向量——解的稀疏性。

## 🔮 发散性提问

1. **RBF核 $K(x,y)=\exp(-\gamma\|x-y\|^2)$ 对应什么特征空间？维数？**
2. **SVM的对偶间隙为什么为零？Slater条件的几何意义？**

如果你准备好了，请说 **"下一节"**，我将继续讲解 **第6章：决策树**。

---

---

### 🤔 问题 1：RBF核特征空间

$K(x,y) = e^{-\gamma\|x-y\|^2} = e^{-\gamma\|x\|^2}e^{-\gamma\|y\|^2}e^{2\gamma x^Ty}$

Taylor展开 $e^{2\gamma x^Ty} = \sum_{k=0}^{\infty}\frac{(2\gamma)^k}{k!}(x^Ty)^k$——无穷级数，对应**无穷维**特征空间。每个 $(x^Ty)^k$ 对应所有 $k$ 阶交叉项。RBF核的特征空间包含所有阶数的多项式——这是它"万能"的原因。

### 🤔 问题 2：Slater条件

Slater条件：存在严格可行点（不等式约束严格成立）。几何：可行域有"内点"（不只在边界上）。满足Slater→强对偶成立→对偶间隙=0。SVM中，数据线性可分→严格可行点存在→Slater成立。

---

---
