---
id: what-is-minijam
title: 什么是 MiniJAM？
slug: /minijam/introduction/what-is-minijam
sidebar_position: 1
---

# 什么是 MiniJAM？

MiniJAM 是一个简化的 JAM 实现，用于在正式 JAM 环境成熟之前，提前实施 JAM 并建设通用生态，使得开发者能借助 JAM 独有的能力扩展 Web3 的边界。MiniJAM 尽可能地保留了 JAM 的相关语义和流程：

```
Service Code
    ↓
Work Package
    ↓
Refine
    ↓
Work Report
    ↓
Independent Verification
    ↓
Accumulate
    ↓
State Update
```

## 为什么需要 MiniJAM

JAM 的协议实现、开发工具和应用生态需要较长时间才能成熟。MiniJAM 希望将这些工作提前，让开发者现在就可以开始建设：

- Service；
- SDK 和编译工具；
- Playground 和调试工具；
- Worker 和数据基础设施；
- 钱包、浏览器和应用。

这样，JAM 的到来可以成为一次渐进式升级，使得其正式上线时，已经拥有成熟的生态和应用。

## 与 JAM 的关系

MiniJAM 保留了 Service、PVM、Refine、Work Report、Accumulate 和 HostCall 等 JAM 核心概念和状态转换流程，但没有实现完整共识机制。

MiniJAM 当前使用基于 Polkadot SDK 的宿主环境提供区块、最终性、Runtime、历史状态和 RPC。这是当前阶段的实现方式，不是 MiniJAM 的永久产品定义。

MiniJAM 的 SDK、工具和基础设施应尽可能围绕通用 JAM 概念设计，使其未来能够继续服务于正式 JAM。

请参阅 MiniJAM 与 JAM，了解当前实现范围和兼容性边界。

## 长期方向

正式 JAM 成熟后，MiniJAM 将作为 JAM 的 L2 而存在。长期目标是：

- 让部分 Service 迁移到 JAM；
- 让 SDK、编译器和开发工具继续服务 JAM；
- 让现有应用和基础设施保持可复用；
- 让 MiniJAM 继续作为 JAM 的 L2 或专用执行环境运行。

## 已知问题和边界

- 仓库的完整 Runtime 和 Node 构建需要私有 Jambda ，因此你无法在本地编译，因此当前尚不适合实施多客户端。
- Stage 0 未实现 JAM assurance、完整 availability、全局 disputes、judgments 或生产级持久性。
- 经济参数和管理权限仍属于临时性配置。
