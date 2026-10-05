---
title: "机器学习 · 第18章 LSTM与GRU"
tags: [数学, 读书笔记]
created: "2026-10-05"
type: literature
summary: "机器学习 第18章 LSTM与GRU 伴读（2 轮）。"
---

# 第18章 LSTM与GRU —— 门控机制

## 📘 本节概览

LSTM通过门控机制为梯度提供"高速公路"——加法连接使梯度不衰减。GRU是LSTM的简化版本。

## 📐 1. LSTM结构

遗忘门：$\vec{f}_t = \sigma(W_f[\vec{h}_{t-1},\vec{x}_t]+\vec{b}_f)$

输入门：$\vec{i}_t = \sigma(W_i[\vec{h}_{t-1},\vec{x}_t]+\vec{b}_i)$

候选：$\tilde{\vec{c}}_t = \tanh(W_c[\vec{h}_{t-1},\vec{x}_t]+\vec{b}_c)$

细胞状态：$\vec{c}_t = \vec{f}_t \odot \vec{c}_{t-1} + \vec{i}_t \odot \tilde{\vec{c}}_t$

输出门：$\vec{o}_t = \sigma(W_o[\vec{h}_{t-1},\vec{x}_t]+\vec{b}_o)$

隐状态：$\vec{h}_t = \vec{o}_t \odot \tanh(\vec{c}_t)$

## 📐 2. LSTM的梯度高速公路

> 🔍 **关键推导**：$\vec{c}_t = \vec{f}_t \odot \vec{c}_{t-1} + \vec{i}_t \odot \tilde{\vec{c}}_t$

$\frac{\partial \vec{c}_t}{\partial \vec{c}_{t-1}} = \vec{f}_t$（逐元素）

$\frac{\partial L}{\partial \vec{c}_{t-k}} = \frac{\partial L}{\partial \vec{c}_t} \prod_{j=0}^{k-1} \vec{f}_{t-j}$

> 💡 与RNN对比：RNN的梯度路径是**乘法**（$\prod W_h$），LSTM的梯度路径是**加法+乘法**（$\vec{c}_t = \vec{f}_t \odot \vec{c}_{t-1} + ...$）。加法的梯度=1（不衰减），乘法的梯度=$\vec{f}_t$（可学习控制）。遗忘门≈1→梯度"高速公路"畅通→长程依赖可学习。

## 📐 3. GRU的简化

$\vec{z}_t = \sigma(W_z[\vec{h}_{t-1},\vec{x}_t])$（更新门），$\vec{r}_t = \sigma(W_r[\vec{h}_{t-1},\vec{x}_t])$（重置门）

$\vec{h}_t = (1-\vec{z}_t) \odot \vec{h}_{t-1} + \vec{z}_t \odot \tilde{\vec{h}}_t$

> 💡 GRU合并了遗忘门和输入门→参数更少→训练更快。实验：大多数任务上GRU≈LSTM。

## 📝 本节要点

1. LSTM的加法连接提供梯度高速公路——遗忘门控制信息保留。
2. 遗忘门≈1→梯度不衰减→长程依赖可学习。
3. GRU是LSTM的简化——合并门控→参数更少。

## 🔮 发散性提问

1. **LSTM的遗忘门偏置初始化为什么建议设为1？**
2. **LSTM与GRU的理论比较：在什么条件下LSTM严格优于GRU？**

如果你准备好了，请说 **"下一节"**，我将继续讲解 **第19章：Attention机制**。

---

---

### 🤔 问题 1：遗忘门偏置

Jozefowicz et al.（2015）：遗忘门偏置初始化为1→$\vec{f}_t \approx \sigma(1) \approx 0.73$→初始时倾向于"记住"→梯度高速公路畅通→训练初期不丢失信息。若初始化为0→$\sigma(0)=0.5$→一半信息被遗忘→训练困难。

### 🤔 问题 2：LSTM vs GRU

理论：LSTM的表达能力≥GRU（LSTM有独立的遗忘门和输入门→更灵活）。但GRU在某些简单任务上可能更快收敛（参数少→优化空间小）。实验（Greff et al. 2017）：LSTM的最关键组件是**遗忘门**——去掉遗忘门性能大幅下降，去掉输入门/输出门影响较小。

---

---
