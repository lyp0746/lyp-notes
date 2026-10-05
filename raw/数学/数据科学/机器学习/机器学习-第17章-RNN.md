---
title: "机器学习 · 第17章 RNN"
tags: [数学, 读书笔记]
created: "2026-10-05"
type: literature
summary: "机器学习 第17章 RNN 伴读（2 轮）。"
---

# 第17章 RNN —— 序列建模与梯度问题

## 📘 本节概览

RNN通过隐状态建模序列依赖。BPTT训练时梯度可能指数衰减（消失）或增长（爆炸）。

## 📐 1. RNN模型

$\vec{h}_t = \tanh(W_h\vec{h}_{t-1} + W_x\vec{x}_t + \vec{b})$，$\vec{y}_t = W_y\vec{h}_t$

## 📐 2. BPTT梯度分析

> 🔍 **推导**：$\frac{\partial L}{\partial W_h} = \sum_{t=1}^T \frac{\partial L}{\partial \vec{h}_T}\prod_{k=t+1}^{T} \frac{\partial \vec{h}_k}{\partial \vec{h}_{k-1}} \cdot \frac{\partial \vec{h}_t}{\partial W_h}$

其中 $\frac{\partial \vec{h}_k}{\partial \vec{h}_{k-1}} = \text{diag}(\sigma'(\vec{z}_k)) \cdot W_h$

> 🔍 **梯度消失/爆炸**：$\|\prod_{k=t+1}^T \frac{\partial \vec{h}_k}{\partial \vec{h}_{k-1}}\| \approx \|\text{diag}(\sigma')W_h\|^{T-t}$。若 $\|\text{diag}(\sigma')W_h\| < 1$→指数衰减（消失），$>1$→指数增长（爆炸）。

## 📐 3. 梯度裁剪

$\vec{g} \leftarrow \min(1, \frac{c}{\|\vec{g}\|})\vec{g}$——防止梯度爆炸。但不解决梯度消失。

## 📐 4. RNN的长期依赖问题

> 💡 理论结果（Bengio et al. 1994）：学习长期依赖的梯度必须指数增长→任何基于梯度的方法都有困难。这是结构性的——需要改变架构（LSTM）。

## 📝 本节要点

1. RNN=隐状态递推——序列的马尔可夫模型。
2. BPTT梯度：$\|\sigma' W_h\|^{T-t}$——消失或爆炸。
3. 梯度裁剪防爆，但不解决消失——需要LSTM。

## 🔮 发散性提问

1. **RNN的通用性：RNN是图灵完备的（Siegelmann & Sontag 1995）。这意味着什么？**
2. **双向RNN的梯度如何传播？与单向RNN的区别？**

如果你准备好了，请说 **"下一节"**，我将继续讲解 **第18章：LSTM与GRU**。

---

---

### 🤔 问题 1：RNN图灵完备

Siegelmann & Sontag（1995）：有理权重的RNN（含饱和非线性）可以模拟任何图灵机。即：给定足够长的序列和适当的权重，RNN可以计算任何可计算函数。但这只是存在性——实际训练中梯度问题使长程依赖几乎不可学习。

### 🤔 问题 2：双向RNN

前向RNN：$\vec{h}_t^{(f)} = f(W\vec{h}_{t-1}^{(f)} + U\vec{x}_t)$。后向RNN：$\vec{h}_t^{(b)} = f(W\vec{h}_{t+1}^{(b)} + U\vec{x}_t)$。输出：$\vec{y}_t = g(V_f\vec{h}_t^{(f)} + V_b\vec{h}_t^{(b)})$。梯度：前向链+后向链独立传播→不互相干扰。优势：利用未来上下文→更准确的预测。局限：不能用于在线/流式处理（需要完整序列）。

---

---
