---
title: Formal RPC
description: 应用中立的 MiniJAM Work 与 Bundle gateway。
---

# Formal RPC

Formal RPC 是 MiniJAM 中应用中立的 Work ingress 与 Bundle 相关 gateway。

它属于网络/基础设施边界，**不是** JamScript application backend。

在 Stage-1 边界下，Formal RPC 负责 Work-ingress relayer，以及网络流程所需的 Bundle store/gateway 职责。

Formal RPC 不定义 JamScript 源码语义、应用 ABI、托管状态规范性、前端便利查询或所有权抽象。JamScript Backend 可以在内部访问 Formal RPC，同时把这种拓扑保持在应用 API 之下。
