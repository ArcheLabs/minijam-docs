---
id: what-is-minijam
title: 什么是 MiniJAM？
slug: /minijam/introduction/what-is-minijam
sidebar_position: 1
---

# 什么是 MiniJAM？

MiniJAM 是一个独立网络，用于在更完整的 JAM 环境成熟之前运行一个边界明确的 JAM-compatible 执行模型。

当前支持的实现线是 **Stage-1**。MiniJAM 目前使用 Polkadot SDK 链作为宿主环境，并使用 Jambda 提供 JAM 执行组件，同时明确区分网络 profile、执行边界和应用 ABI。

~~~text
Service Code
    ↓
Work Package
    ↓
Refine
    ↓
Work Report
    ↓
验证 / 投票
    ↓
Accumulate
    ↓
规范状态转换
~~~

## MiniJAM 不是什么

MiniJAM 不等同于历史 Stage-0 Playground。Playground 对早期验证很重要，但已经不再定义 MiniJAM 的产品边界。

MiniJAM 也不是 JAM TinySpec 或 JAM FullSpec。网络拥有自己的规范 profile：**MiniJamSpec**，并明确区分网络常量、Runtime policy、Worker 本地策略与应用 ABI。

请阅读 [MiniJamSpec](../architecture/minijam-spec.md) 与[执行边界](../architecture/execution-boundary.md)。

## 为什么需要 MiniJAM

JAM 协议实现、开发工具和应用生态的成熟速度并不相同。MiniJAM 允许我们更早建设和验证应用与基础设施，同时保留向更完整 JAM 兼容环境迁移的路径。

## 与 JamScript 的关系

MiniJAM 提供网络，JamScript 提供推荐的应用开发栈。

应用开发者通常应从 [JamScript](../../jamscript/index.md) 开始；Node、Worker、基础设施和协议开发者则从 MiniJAM 开始。

## 长期方向

长期方向仍然是：随着 JAM 成熟，让应用和工具边界继续可复用，使适合的 Service 能够迁移，并在有价值的场景中让 MiniJAM 继续作为专用网络或 JAM-connected/L2 执行环境存在。

这是长期方向，并不意味着 MiniJAM 今天已经实现完整 JAM 协议。
