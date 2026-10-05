---
title: "机器学习 · 第8章 Boosting"
tags: [数学, 读书笔记]
created: "2026-10-05"
type: literature
summary: "机器学习 第8章 Boosting 伴读（2 轮）。"
---

# 第8章 Boosting —— 函数空间梯度下降

## 📘 本节概览

Boosting的数学本质是**函数空间中的梯度下降**——每步用弱学习器拟合负梯度方向。

## 📐 1. AdaBoost

$F(x) = \sum_{t=1}^T \alpha_t h_t(x)$

指数损失：$L(y,F) = e^{-yF(x)}$

> 🔍 **前向分步加性建模**：第 $t$ 步，固定 $F_{t-1}$，找 $(\alpha_t, h_t)$ 最小化 $\sum_i e^{-y_i(F_{t-1}(x_i)+\alpha_t h_t(x_i))}$。令 $w_i^{(t)} = e^{-y_i F_{t-1}(x_i)}$→加权误差→找最小加权误差的弱学习器→更新权重。

## 📐 2. 梯度提升

在任意可微损失 $L(y,F)$ 上做函数空间梯度下降：

> 🔍 **推导**：第 $t$ 步，负梯度 $r_i^{(t)} = -\frac{\partial L(y_i, F(x_i))}{\partial F(x_i)}|_{F=F_{t-1}}$。用弱学习器 $h_t$ 拟合 $\{(x_i, r_i^{(t)})\}$——拟合梯度方向。步长 $\alpha_t = \arg\min_\alpha \sum_i L(y_i, F_{t-1}(x_i)+\alpha h_t(x_i))$。

> 💡 AdaBoost=指数损失的梯度提升，LogitBoost=对数损失的梯度提升。统一框架：**在函数空间中做梯度下降，每步用弱学习器拟合梯度**。

## 📐 3. XGBoost的二阶近似

$L(y, F+\alpha h) \approx L(y,F) + g\alpha h + \frac{1}{2}h\alpha^2 h^2$（$g$=一阶梯度，$h$=二阶梯度）

> 🔍 **推导**：对损失做Taylor展开到二阶→闭式解→更快收敛。正则化项 $\gamma T + \frac{1}{2}\lambda\|\vec{w}\|^2$ 控制复杂度。

## 📝 本节要点

1. Boosting=函数空间梯度下降——AdaBoost是指数损失的特例。
2. 梯度提升：每步拟合负梯度——统一框架。
3. XGBoost用二阶近似+正则化——更快更稳。

## 🔮 发散性提问

1. **AdaBoost在指数损失下对异常值敏感——为什么？Huberized AdaBoost如何改进？**
2. **Boosting为什么不容易过拟合？边际理论（margin theory）的解释？**

如果你准备好了，请说 **"下一节"**，我将继续讲解 **第9章：PCA与降维**。

---

---

### 🤔 问题 1：指数损失与异常值

指数损失 $e^{-yF}$：当 $yF$ 很负（异常值误分类）时，$e^{-yF}$ 指数增长→异常值权重爆炸→后续弱学习器过度关注异常值。Huberized AdaBoost：对 $|yF| > \delta$ 的样本，损失改为线性增长（而非指数）→有界→对异常值鲁棒。

### 🤔 问题 2：边际理论

边际 $m(x,y) = yF(x)/\|\vec{\alpha}\|_1$。泛化界：$P(yF(x) \leq 0) \leq P(m \leq \theta) + O(\sqrt{d\cdot T/n}/\theta)$。Boosting增大边际→即使训练误差为零，继续迭代仍增大边际→泛化继续改善。这解释了"训练误差为零后继续迭代不过拟合"的现象。

---

---
