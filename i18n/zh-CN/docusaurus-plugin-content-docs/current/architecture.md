---
title: 架构总览
slug: /architecture
sidebar_position: 2
---

# 架构总览

当前体系最适合被理解为围绕 JAM 执行模型形成的三个层次。

~~~text
                         JAM 执行模型
                              │
                ┌─────────────┴─────────────┐
                │                           │
        MiniJamSpec / MiniJAM           应用边界
                │                           │
      ┌─────────┼─────────┐             JamScript
      │         │         │        ┌────────┼────────┐
    Node      Worker   Formal RPC   Language Runtime Tooling
      │         │         │                 │
      └─────────┴─────────┘         Managed State / Ownership
                │                           │
          Stage-1 网络               Backend / Client
                └─────────────┬─────────────┘
                              │
                             应用

                         MINI 生态层
                    激励 / 市场 / 治理
~~~

## MiniJAM：网络与执行

MiniJAM 是一个独立网络，提供有明确边界的 JAM-compatible 执行面。Stage-1 是当前支持的部署线。MiniJamSpec 定义网络 profile，而 Runtime policy 与 Worker 本地策略属于不同层次。

MiniJAM 不再由历史 Playground 定义，也不是 JAM FullSpec 的复制品。

## JamScript：应用开发栈

JamScript 位于网络边界之上，提供确定性的 TypeScript 风格语言、编译器/工具链、应用 ABI、托管状态、所有权原语、部署、Backend 与 Client。

普通应用不应该需要理解 Worker 调度，也不应该手工构造存储证明。

## MINI：生态与经济层

MINI 是围绕网络与生态形成的经济和协调层：启动、激励、流动性、项目市场、公共物品和治理都可以在这里演化。

这种分层并不意味着 MINI 次要，而是允许经济系统持续变化，而不悄悄改变 MiniJAM 共识参数或 JamScript ABI。

## 应用

JAM OS、Locus、MiniCells 以及未来 Service 都是这些底层能力的消费者。它们属于应用和工作负载，而不是 MiniJAM 共识或 JamScript 本身的定义。
