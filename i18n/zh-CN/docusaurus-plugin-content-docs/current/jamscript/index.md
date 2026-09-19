---
title: JamScript 概览
description: 使用 JamScript 应用开发栈构建确定性的 JAM 应用。
slug: /jamscript
---

# JamScript

JamScript 是面向 JAM Service 的确定性应用开发栈。

它不仅包含 TypeScript 风格语言，还包括编译器/工具链、应用 ABI、托管状态、所有权原语、部署、Backend 与 Client。目标是让应用开发者工作在 Service 层，而无需自行实现 JAM 执行管线。

~~~text
service.ts
   ↓
JamScript compiler / managed toolchain
   ↓
Service PVM artifact + ABI
   ↓
显式部署
   ↓
MiniJAM Stage-1
   ↓
JamScript Backend
   ↓
typed client / frontend
~~~

## 各层职责

### Language 与 Toolchain

你在源码中描述 action、有界数据、query、认证和状态。公开命令是 **jams**。Canonical build 使用托管工具链，应用项目无需自行维护 Rust、LLVM、Node 或 MiniJAM checkout。

从[快速开始](./getting-started/quickstart.md)入门。

### Application Runtime 与 Managed State

JamScript 将应用状态组织为经过认证的托管状态，其规范 root 通过 Service 的链上状态进行 commitment。Refine 针对锚定状态视图验证执行；Accumulate 只接受有效 transition，并推进规范 commitment。

请阅读[托管状态](./runtime/managed-state.md)。

### Ownership

Ownership 是与特定链账户格式解耦的密码学控制原语。Polkadot、EVM、Matrix 等外部生态可以作为该原语的 adapter，而不需要变成新的共识账户类型。

请阅读[所有权抽象](./ownership/index.md)。

### Deployment

构建与部署是两个独立操作。Service artifact 与网络解耦；部署时显式选择命名网络，并在创建 Service 前验证目标网络与 artifact。

请阅读[部署](./deployment/index.md)。

### Backend 与 Client

JamScript Backend 是面向应用的 JAM-compatible network bridge。它不是共识的一部分，也不是 Formal RPC。它负责状态 materialization、执行输入构造/验证、通过网络路径提交 Work，以及提供面向 Client 的状态 API。

Client 可以使用便利查询，也可以选择 proof-backed 独立状态验证。

请阅读 [Backend](./backend/index.md) 与 [Client](./client/index.md)。

## 信任模型

Backend 可以让应用访问更方便，但不会因此成为规范性来源。规范 managed-state root 由 finalized Service state 选择；Refine proof 与 Accumulate root check 则独立保护执行边界。

## Preview 边界

JamScript 仍处于 developer preview。已发布 toolchain 与 main 分支可能以不同速度演进。对于具体 build，应以 release artifact、build metadata 与源仓库 compatibility 文档为准。

请阅读 [JamScript 兼容性](./reference/compatibility.md)与全站[真相源规则](../reference/compatibility.md)。
