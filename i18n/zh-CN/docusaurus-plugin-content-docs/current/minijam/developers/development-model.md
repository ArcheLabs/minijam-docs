---
id: development-model
title: 开发模型
slug: /minijam/developers/development-model
---

# 开发模型

MiniJAM 将服务执行分为 Refine 和 Accumulate。Refine 基于声明的输入执行计算；Accumulate 将被接受的结果应用到全局状态和服务状态。服务应明确输入、输出和 HostCall，使其他 Worker 能够复现计算。
