---
title: "机器学习 · 第22章 GAN"
tags: [数学, 读书笔记]
created: "2026-10-05"
type: literature
summary: "机器学习 第22章 GAN 伴读（2 轮）。"
---

# 第22章 GAN —— 对抗训练与Nash均衡

## 📘 本节概览

GAN的数学本质是**博弈论**——生成器和判别器达到Nash均衡。最优判别器下，GAN目标=JS散度。

## 📐 1. GAN目标

$$\min_G \max_D V(D,G) = E_{x \sim p_{\text{data}}}[\log D(x)] + E_{z \sim p_z}[\log(1-D(G(z)))]$$

## 📐 2. 最优判别器

> 🔍 **推导**：固定 $G$，对 $D$ 最大化 $V$。变分法：$D^*(x) = \frac{p_{\text{data}}(x)}{p_{\text{data}}(x) + p_g(x)}$

代入得：$V(D^*,G) = 2D_{JS}(p_{\text{data}} \| p_g) - \log 4$

> 💡 最优判别器下，GAN目标=JS散度+常数。最小化JS散度→$p_g \to p_{\text{data}}$。

## 📐 3. 全局最优

$p_g = p_{\text{data}}$ ⟺ $D^*(x) = 1/2$（判别器无法区分）⟺ $V = -\log 4$

> 🔍 **证明**：$D_{JS}(p \| q) = 0$ ⟺ $p = q$（a.e.）。所以 $p_g = p_{\text{data}}$ 是唯一全局最优。

## 📐 4. 训练不稳定性

GAN的Nash均衡可能不唯一，训练可能振荡。梯度消失：当判别器太强（$D \approx 1$），$\nabla_G \log(1-D(G(z))) \approx 0$→生成器梯度消失。

> 💡 改进：Wasserstein GAN用Earth Mover距离替代JS散度→梯度处处有意义→训练更稳定。

## 📝 本节要点

1. GAN=博弈论——生成器和判别器达到Nash均衡。
2. 最优判别器下目标=JS散度——全局最优=数据分布。
3. 训练不稳定——WGAN用Wasserstein距离改进。

## 🔮 发散性提问

1. **Wasserstein距离 $W(p,q) = \inf_\gamma E[\|x-y\|]$ 为什么比JS散度更适合GAN？**
2. **Mode Collapse：生成器只产生少数几种样本。数学原因？解决方法？**

如果你准备好了，请说 **"下一节"**，我将继续讲解 **第23章：扩散模型**。

---

---

### 🤔 问题 1：Wasserstein距离

JS散度的问题：若 $p, q$ 支撑不重叠（如两个delta分布），$D_{JS}=\log 2$（常数）→梯度=0→无法优化。Wasserstein距离：即使支撑不重叠，$W_1$ 仍给出"移动概率质量的最小代价"→梯度有意义→可优化。WGAN：$\min_G \max_{\|D\|_L \leq 1} E[D(x)] - E[D(G(z))]$——Lipschitz判别器估计Wasserstein距离。

### 🤔 问题 2：Mode Collapse

数学原因：GAN目标不惩罚"覆盖所有模式"——生成器可能只覆盖部分模式就能使判别器困惑（局部Nash均衡）。解决：(1) **Unrolled GAN**：生成器考虑判别器的$k$步更新→避免短视；(2) **Minibatch discrimination**：判别器看一批样本的多样性→惩罚mode collapse；(3) **WGAN+GP**：Wasserstein距离+梯度惩罚→更稳定的训练→减少mode collapse。

---

---
