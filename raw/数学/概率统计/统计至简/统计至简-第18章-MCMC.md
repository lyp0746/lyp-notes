---
title: "统计至简 · 第18章 MCMC"
tags: [数学, 读书笔记]
created: "2026-10-05"
type: literature
summary: "统计至简 第18章 MCMC 伴读（2 轮）。"
---

# 第18章 MCMC —— 从后验分布抽样

## 📘 本节概览

马尔可夫链蒙特卡洛（MCMC）构造一个Markov链，其平稳分布恰好是目标后验分布 $p(\theta|D)$。

## 📐 1. Metropolis-Hastings算法

1. 从当前状态 $\theta_t$ 提议 $\theta^* \sim q(\theta^*|\theta_t)$
2. 计算接受率 $\alpha = \min(1, \frac{p(\theta^*|D)q(\theta_t|\theta^*)}{p(\theta_t|D)q(\theta^*|\theta_t)})$
3. 以概率 $\alpha$ 接受 $\theta_{t+1} = \theta^*$，否则 $\theta_{t+1} = \theta_t$

> 🔍 **细致平衡条件**：$p(\theta)q(\theta'|\theta)\alpha(\theta,\theta') = p(\theta')q(\theta|\theta')\alpha(\theta',\theta)$。满足此条件的链有平稳分布 $p$。MH算法通过精心设计 $\alpha$ 保证细致平衡。

## 📐 2. Gibbs抽样

Gibbs是MH的特殊情况：每次只更新一个分量（或一组分量），从**条件后验**抽样。

$\theta = (\theta_1, ..., \theta_k)$。迭代：$\theta_1^{(t+1)} \sim p(\theta_1|\theta_2^{(t)},...,\theta_k^{(t)}, D)$, $\theta_2^{(t+1)} \sim p(\theta_2|\theta_1^{(t+1)},\theta_3^{(t)},..., D)$, ...

> 💡 Gibbs的优点：**无需调节接受率**（接受率=1）。缺点：需要条件后验有已知形式（通常是共轭情况）。**Blocked Gibbs**：将相关变量分组一起更新——减少自相关，加速收敛。

## 📐 3. HMC（Hamiltonian Monte Carlo）

引入辅助动量变量 $p$，构造Hamiltonian $H(\theta,p) = U(\theta) + K(p)$，其中 $U(\theta) = -\log p(\theta|D)$（势能），$K(p) = p^Tp/2$（动能）。

**Leapfrog积分**：模拟Hamiltonian动力学轨迹，Metropolis步骤接受/拒绝。

> 🔍 **HMC的优势**：利用梯度信息 $\nabla U(\theta)$ 做"智能"提案——沿高概率方向远距离移动。接受率可以保持很高（即使在大步长时）。Stan软件默认使用HMC的变种NUTS（No-U-Turn Sampler）。

## 📝 本节要点

1. MH算法：通过接受率保证细致平衡→平稳分布=目标分布。
2. Gibbs抽样：逐分量条件抽样——接受率=1但需要共轭性。
3. HMC：利用梯度信息——高维问题中最有效的MCMC方法。

## 🔮 发散性提问

1. **MCMC的混合问题：多模态后验分布时，链容易困在一个模式。并行回火（parallel tempering）如何解决？**
2. **变分推断（VI）作为MCMC的替代：将抽样问题转化为优化问题。ELBO（证据下界）的含义是什么？**

如果你准备好了，请说 **"下一节"**，我将继续讲解 **第19章：随机过程**。

---

---

### 🤔 问题 1：并行回火

运行多条链在不同"温度" $T_1 < T_2 < ... < T_K$ 下：$p_T(\theta) \propto p(\theta|D)^{1/T}$。高温链（$T$ 大）分布更平坦→更容易在不同模式间跳跃。定期交换相邻温度链的状态（Metropolis-type交换）。效果：高温链探索全局，低温链精细采样局部→结合两者的优势。

### 🤔 问题 2：变分推断与ELBO

VI用简单分布 $q(\theta;\phi)$ 近似复杂后验 $p(\theta|D)$，通过最小化KL散度 $KL(q||p)$ 来学习 $\phi$。$KL(q||p) = E_q[\log q] - E_q[\log p(D,\theta)] + \log p(D) = -ELBO + \log p(D)$。最大化ELBO = 最小化KL。ELBO = $E_q[\log p(D|\theta)] - KL(q||p(\theta))$（数据拟合项 - 正则项）。**Mean-field VI**：假设 $q$ 因子分解 $q(\theta) = \prod q_j(\theta_j)$——简化优化但低估后验方差。

---

---
