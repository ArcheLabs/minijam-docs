---
id: minijam-and-jam
title: MiniJAM 与 JAM
description: MiniJAM 与 JAM 在目标、执行模型、网络架构、数据可用性和安全假设上的区别。
slug: /minijam/introduction/minijam-and-jam
sidebar_position: 4
---

# MiniJAM 与 JAM

JAM 是由 Gray Paper 定义的协议。它将全局 Service 状态与可并行的链下计算结合起来，并通过 Coretime、Work Report 和全局状态转换构成统一的执行模型。

MiniJAM 是一个简化的 JAM 实现，用于在正式 JAM 环境成熟之前，开发、运行 JAM Service、执行工具与应用体验。

MiniJAM 当前使用基于 Polkadot SDK 的宿主环境承载区块、最终性、Runtime 和协议状态。当前文档主要为 Stage 0 的实现方式，不是对 MiniJAM 产品形态的永久定义。

:::warning 当前阶段

本文描述 MiniJAM 当前阶段的设计。

当前代码以 Gray Paper `0.7.2` 作为 JamCore 语义基线，公共协议版本为 `PROTOCOL_VERSION_V1`，接口版本为 `1`。这些均属于当前实现参数，可能随着协议演进而改变。

:::

## 核心区别

概括地说， MiniJAM 并不改变 JAM 的 STF ，只是调整了其影响，这有助于未来多客户端的适配。差异部分包括：

| 维度             | JAM                                                     | MiniJAM                                                                    |
| -------------- | ------------------------------------------------------- | -------------------------------------------------------------------------- |
| 宿主与最终性         | 共识、验证者集合和最终性属于 JAM 协议本身                                 | 当前由 Stage 0 宿主环境提供区块排序、最终性、Runtime 和历史状态                                   |
| Work Report 验证 | 使用 JAM 的 Guarantees、Assurances 和 Disputes 等协议流程         | 使用候选生产者、独立 Refine 重执行以及 Support/Oppose 投票                                  |
| Accumulate     | 作为 JAM 全局状态转换的一部分执行                                     | 由 Runtime 中的 Jambda Executive 执行                                           |
| 状态承载           | 按 Gray Paper 定义维护规范 JAM 状态                              | 当前将 JAM 状态持久化在 Runtime 的 `ProtocolState` 中                                 |
| 数据可用性          | 使用 JAM 定义的数据分发、可用性和恢复机制                                 | 当前使用内容承诺、Gateway 和 IPFS，不提供完整 JAM Availability 语义 |
| Coretime       | 包含完整的核心资源分配和 Coretime 模型                                | 下一版本实施                                                 |
| 安全边界           | 依赖 JAM 的共识、可用性、报告保障和争议机制                                | 依赖宿主最终性、Worker 分配、独立重执行、投票阈值、保证金和部署配置                                      |

## MiniJAM 简化了什么

MiniJAM 实行以下执行闭环：

```text
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

为了尽早提供这条路径，MiniJAM 当前进行了以下简化：

* 不实现完整 JAM Availability；
* 不实现完整 JAM Guarantees、Assurances 和 Disputes 流程；
* 不实现完整 JAM Coretime 分配和市场；
* 使用确定性 Worker 分配和独立重执行验证候选报告；
* 使用 Support/Oppose 投票决定候选报告是否被接受；
* 当前只使用一套 Runtime Executive 实现；
* 使用 MiniJAM 特有的 Work 协调、System Operations 和宿主集成方式。

这些简化降低了当前实现范围，但也意味着 MiniJAM 与 JAM 的安全假设和协议边界不同。

Guarantees、Assurances 和 Disputes 流程，Coretime 在 MiniJAM 下一阶段测试网中将被实施。

## 应用能否迁移到 JAM

MiniJAM 的目标之一，是降低未来开发 JAM Service 和工具的门槛。MiniJAM 的 Service、Work、Refine、Work Report 和 Accumulate 语义与 JAM 保持一致，因此在 MiniJAM 上开发的 Service 可以迁移到 JAM。

迁移工作量取决于应用依赖的能力。依赖以下 MiniJAM 特有能力的应用，需要额外适配：

* MiniJAM System Operations；
* MiniJAM 专用状态查询接口；
* Bridge；
* 当前宿主环境提供的网络接口。

## 权威来源

JAM 的规范行为以目标版本的 Gray Paper 为准。Gray Paper 官方资源页面持续提供最新版本和协议测试资源。

对于 MiniJAM，需要区分两类来源。

### 预期协议行为

MiniJAM 的预期设计由以下内容定义：

1. 已版本化的 MiniJAM 协议和设计文档；
2. 公共协议类型和接口定义；
3. 兼容性测试与测试向量；
4. 明确标记为 Stable 的接口文档。

### 当前部署行为

当前网络的实际行为由以下内容决定：

1. 当前部署的 Runtime 和 Worker 代码；
2. 当前网络配置；
3. 当前发布版本；
4. Current Status 页面；
5. 发布说明和已知问题。

如果设计文档、测试和部署代码之间出现不一致，应将其记录为协议、实现或文档问题。

