---
id: minijam-and-jam
title: MiniJAM 与 JAM
description: MiniJAM 与 JAM 在目标、执行模型、网络架构、数据可用性和安全假设上的区别。
slug: /minijam/introduction/minijam-and-jam
sidebar_position: 4
---

# MiniJAM 与 JAM

JAM 是由 [Gray Paper](https://graypaper.com/) 定义的协议，其目标是为 Polkadot 提供一种新的基础执行与服务模型。MiniJAM 是一条独立的 Polkadot SDK 链，用于更早地开发、运行和验证 JAM 风格的服务与开发工具。

MiniJAM 不等同于 JAM 主网，也不宣称完整实现当前 Gray Paper 中定义的全部协议。两者共享部分核心概念，但运行环境、共识来源、数据可用性、工作报告验证和状态处理方式并不相同。

:::warning 当前阶段

本文描述 MiniJAM 当前阶段的设计。MiniJAM 仍在演进，具体实现应以当前代码、网络配置和 Current Status 页面为准。

:::

## 共同基础

MiniJAM 的设计保留或借鉴了以下 JAM 概念：

- 以 service 作为应用执行单元。
- 使用 PVM 作为服务程序的执行目标。
- 将执行过程划分为 Refine 与 Accumulate。
- 使用 Work Package、Work Report 和状态变化描述计算结果。
- 通过 HostCall 让服务访问受控的宿主能力。
- 让可并行计算与全局状态更新承担不同职责。

这些共同点使 MiniJAM 可以作为 JAM 风格开发模型的早期实验环境，但不代表两个网络在协议层完全兼容。

## 核心区别

| 维度 | JAM | MiniJAM |
|---|---|---|
| 定位 | 由 Gray Paper 定义的完整基础协议，并可作为 Polkadot 未来基础架构的一部分 | 用于早期开发、测试和运行 JAM 风格服务的独立实验性网络 |
| 协议范围 | 定义验证者、核心分配、数据可用性、报告保障、争议处理、状态转换和网络行为 | 当前只实现产品目标所需的垂直切片，并主动省略或简化部分完整 JAM 流程 |
| 共识与最终性 | 由 JAM 协议自身定义其验证者和链状态流程 | 当前运行在独立的 Polkadot SDK 链上，由自身的 Aura 区块生产者和 GRANDPA 最终性参与者维护，不继承 Polkadot Relay Chain 的共享安全 |
| 执行模型 | Refine 在核心计算环境中执行，Accumulate 参与全局状态转换 | 保留 Refine 与 Accumulate 的分工，但由 MiniJAM 的 Worker、验证流程和运行时完成 |
| 数据可用性 | 使用 JAM 定义的数据可用性、分发和恢复机制 | Stage 0 使用 Bulletin-compatible simulator 和 Playground API bundle gateway 实现当前所需的数据获取语义；未实现 JAM availability，也不是直接依赖正式 Bulletin Chain |
| 工作报告保障 | 使用 JAM 的 guarantor、审计、争议与判定流程 | 当前使用确定性 Worker 分配、ReportEnvelopeV1、候选报告保证金，以及被分配 Worker 的 Support/Oppose 投票 |
| Accumulate | 作为 JAM 协议全局状态转换的一部分 | 集成到 MiniJAM 的链上运行时和状态转换流程 |
| 状态管理 | 遵循 Gray Paper 对 service state 和全局状态的定义 | 保留 JAM 的原始状态与状态转换逻辑，但部分当前未使用的状态始终保持默认值 |
| Coretime 与资源市场 | 包含 JAM 的核心分配和资源使用模型 | 第一阶段不实现完整 JAM Coretime 市场和全部经济机制 |
| 安全假设 | 依赖完整 JAM 协议中的验证、可用性和争议机制 | 当前安全性依赖 MiniJAM 的 Authority 集合、Worker 分配与投票规则、候选报告保证金、惩罚规则、数据获取边界和实际部署配置 |
| 兼容性 | Gray Paper 是协议兼容性的权威标准 | 目标是逐步提高执行模型、工具和服务开发体验的兼容性，不承诺当前协议等价 |
| 协议版本基线 | 取决于目标 Gray Paper 版本 | 当前 JamCore 语义基线为 Gray Paper 0.7.2，公共协议为 `PROTOCOL_VERSION_V1`，接口版本为 `1` |
| Bridge | 不包含 MiniJAM 专用资产托管模型 | 当前包含原生资产 escrow、release、replay protection 和 Runtime bridge effects |

## MiniJAM 简化了什么

MiniJAM 当前重点验证一条可运行的开发路径：

```text
Service code
  ↓
Refine
  ↓
Work Report
  ↓
Independent verification
  ↓
Accumulate
  ↓
State change
```

为了尽早提供这条路径，MiniJAM 没有在第一阶段复制 JAM 的全部网络和安全流程。当前简化内容包括：

- 不实现完整 JAM 数据可用性子系统。
- 不实现完整 guarantor、auditor、judgment 和 adjudication 流程。
- 不实现完整 JAM Coretime 分配和市场。
- 使用 MiniJAM 自身的 Worker 分配与独立重执行规则验证 Candidate。
- 将 Accumulate 和状态更新接入 MiniJAM 的运行时。
- 在 system service 处理、Work 流程、Worker 验证、Runtime 执行和链状态之间采用 MiniJAM 特有的集成方式。

这些简化降低了早期网络的实现复杂度，同时也意味着 MiniJAM 的安全边界和 JAM 不同。

## HostCall 边界

MiniJAM 不定义一个缩减后的应用 HostCall 集合。Service 使用的 HostCall 语义来自当前固定的 Jambda/JAM 执行实现。

MiniJAM 的特有差异位于 system service 的处理，以及 Work 流程、Worker 验证、Runtime 执行和链状态之间的集成。因此，本文档不单独维护一份 MiniJAM HostCall 支持矩阵。

## “兼容”具体指什么

MiniJAM 文档应分别描述四种兼容性，避免只使用笼统的“JAM compatible”。

### 概念兼容

MiniJAM 使用 service、Refine、Accumulate、Work Report 和 HostCall 等 JAM 核心概念。

### 执行兼容

MiniJAM 计划让符合其支持范围的 PVM 程序和执行行为尽可能接近 JAM。具体兼容范围必须由测试向量和实现状态证明。

### 工具兼容

SDK、编译器、Playground 和调试工具应尽量采用可迁移的开发模型，但 MiniJAM 专用接口可能需要在迁移时调整。

### 协议兼容

协议兼容意味着满足特定版本 Gray Paper 的完整网络行为。MiniJAM 当前不作这一声明。

## 应用能否迁移到 JAM

MiniJAM 的目标之一，是降低未来迁移 JAM 的成本。实际迁移范围取决于应用使用的能力：

- 遵循当前固定的 Jambda/JAM 执行语义，并且不依赖 MiniJAM 特有 system service 或网络行为的应用，预计需要的适配更少。
- 使用 MiniJAM 专用网络接口、状态接口、数据发布方式或经济机制，需要适配。
- 使用 MiniJAM 特有的 system service、状态接口、数据发布方式或网络行为，需要适配。
- 是否能够直接复用二进制、状态或部署记录，必须由未来兼容性测试确认。

因此，文档不应承诺“无修改迁移”或“字节级兼容”，除非对应测试已经存在并持续通过。

## 如何选择

选择 MiniJAM，适合以下目标：

- 现在开始体验 JAM 风格的服务开发。
- 在 Playground 中观察 Refine、Work Report、Accumulate 和状态变化。
- 测试 PVM、HostCall、Worker 和服务工具链。
- 参与 MiniJAM 网络与生态应用开发。

直接研究 JAM，适合以下目标：

- 实现或验证完整 Gray Paper 协议。
- 研究 JAM 验证者、availability、guaranteeing、auditing 和争议流程。
- 构建针对正式 JAM 协议版本的客户端。
- 判断协议级兼容性。

## 权威来源

JAM 的协议行为以对应版本的 Gray Paper 为准。

MiniJAM 的行为以以下来源为准：

1. 当前部署版本的代码。
2. Current Status 页面。
3. 网络配置和发布说明。
4. 已通过的兼容性测试。
5. 本文档中明确标记为 Stable 的接口。

当文档与代码不一致时，应记录问题并修正文档，不应通过模糊措辞掩盖差异。
