---
title: "机器学习 · 第20章 Transformer"
tags: [数学, 读书笔记]
created: "2026-10-05"
type: literature
summary: "机器学习 第20章 Transformer 伴读（2 轮）。"
---

# 第20章 Transformer —— 位置编码与残差连接

## 📘 本节概览

Transformer=堆叠的自注意力+FFN+残差+LayerNorm。位置编码注入序列顺序信息。

## 📐 1. 位置编码

正弦编码：$PE_{(pos,2i)} = \sin(pos/10000^{2i/d})$，$PE_{(pos,2i+1)} = \cos(pos/10000^{2i/d})$

> 🔍 **对数间距的推导**：低频（$i$ 小）变化慢→捕获长程位置关系，高频（$i$ 大）变化快→捕获短程位置关系。相邻维度的频率比恒定→平移等变性。

**RoPE**（旋转位置编码）：$\vec{q}_m = R_m\vec{q}$，$R_m$ 是旋转矩阵（角度=$m\theta$）

> 🔍 **相对位置推导**：$\vec{q}_m^T\vec{k}_n = \vec{q}^T R_{n-m}\vec{k}$——注意力只依赖**相对位置** $n-m$。

## 📐 2. 残差连接

$\vec{y} = \vec{x} + F(\vec{x})$

> 🔍 **梯度推导**：$\frac{\partial L}{\partial \vec{x}} = \frac{\partial L}{\partial \vec{y}}(I + \frac{\partial F}{\partial \vec{x}})$。$I$ 项保证梯度至少有"直通"路径→缓解梯度消失→允许非常深的网络。

## 📐 3. Layer Normalization

$\hat{x}_i = \frac{x_i - \mu}{\sqrt{\sigma^2 + \epsilon}}$，$y_i = \gamma \hat{x}_i + \beta$

> 💡 LayerNorm vs BatchNorm：LayerNorm沿特征维度归一化（不依赖batch）→适合变长序列→Transformer的选择。

## 📐 4. 神经正切核（NTK）

无限宽网络在参数 $\theta_0$ 附近线性化：$f(\vec{x};\theta) \approx f(\vec{x};\theta_0) + \nabla_\theta f(\vec{x};\theta_0)^T(\theta-\theta_0)$

核 $K(\vec{x},\vec{x}') = \nabla_\theta f(\vec{x})^T \nabla_\theta f(\vec{x}')$（NTK）

> 💡 NTK将深度学习简化为核方法——训练动力学完全由NTK决定。但只描述"lazy training"（参数变化小）。

## 📝 本节要点

1. 位置编码注入顺序信息——RoPE实现相对位置编码。
2. 残差连接提供梯度直通路径——缓解梯度消失。
3. NTK描述宽网络的训练动力学——核方法视角。

## 🔮 发散性提问

1. **Pre-LN vs Post-LN：LayerNorm放在注意力前还是后？训练稳定性的差异？**
2. **Transformer的理论表达能力：它比RNN更强吗？**

如果你准备好了，请说 **"下一节"**，我将继续讲解 **第21章：VAE**。

---

---

### 🤔 问题 1：Pre-LN vs Post-LN

**Post-LN**（原始Transformer）：$\vec{y} = \text{LN}(\vec{x} + F(\vec{x}))$。**Pre-LN**：$\vec{y} = \vec{x} + F(\text{LN}(\vec{x}))$。Xiong et al.（2020）：Post-LN在深层时梯度爆炸→需要warmup；Pre-LN梯度更稳定→不需要warmup→训练更简单。目前主流用Pre-LN（GPT-3、LLaMA等）。

### 🤔 问题 2：Transformer vs RNN

理论：Transformer的表达能力≥RNN（自注意力可模拟RNN的递推——用注意力权重选择"前一个位置"）。但Transformer不假设序列顺序→可处理集合→比RNN更灵活。Perez et al.（2019）：Transformer是**图灵完备**的（用位置编码模拟图灵机的读写头移动）。

---

---
