---
id: architecture-overview
title: 架构概览
slug: /minijam/introduction/architecture-overview
sidebar_position: 3
---

# 架构概览

# 架构概览

MiniJAM 是一个运行在 Polkadot 环境中的简化 JAM 实现。它拥有 JAM 最核心的执行模型：

- Service；
- Work Package；
- Refine；
- Work Report；
- Accumulate；
- JAM 状态；
- 基于历史状态的确定性执行。

MiniJAM 当前使用 Polkadot SDK Runtime 承载协议状态和状态转换，但 Polkadot SDK 只是 MiniJAM 的宿主环境。MiniJAM 的核心架构并不由 Node、共识算法或具体部署拓扑定义，而是由 JAM 的执行流程和状态模型定义。

在 Stage 0 中，宿主环境还负责提供区块、交易排序、最终性和 RPC，使 MiniJAM 可以在 JAM 主网可用之前运行和验证。

## 整体架构

MiniJAM 的核心执行流程可以概括为：

```
用户或应用
    │
    │ 提交 Work Package 和 Bundle 承诺
    ▼
MiniJAM Runtime
    │
    │ 记录 Work 并分配 Worker
    ▼
候选 Worker
    │
    │ 获取 Bundle
    │ 读取锚定的历史 JAM 状态
    │ 执行 Refine
    ▼
Work Report
    │
    │ 提交候选报告
    ▼
其他被分配的 Worker
    │
    │ 重新获取输入
    │ 独立执行 Refine
    │ Support / Oppose
    ▼
被接受的 Work Report
    │
    │ 进入执行队列
    ▼
Runtime 中的 Jambda Executive
    │
    │ 执行 Accumulate
    │ 生成状态变更
    ▼
状态变更验证
    │
    │ 校验边界和执行结果
    ▼
规范 JAM 状态
```

在这套架构中：

- Worker 负责链下执行和验证 Refine；
- Runtime 负责执行 Accumulate；
- Runtime 中的协议状态是规范状态；

## 状态

MiniJAM 的 Runtime 中存在两类语义不同的状态。

### 协议协调状态

协议协调状态用于管理 MiniJAM 的运行流程，例如：

- 已提交的 Work；
- Worker 注册信息；
- Worker 分配结果；
- 候选报告；
- Support 和 Oppose 投票；
- 执行队列；
- Work 状态；
- Fuel 预留和结算；
- Execution Receipt。

这些状态用于协调 Worker 和 Runtime，但它们不属于 JAM Service 可以直接访问的 JAM 状态空间。

### JAM 协议状态

JAM 协议状态是 Service 执行所读取和修改的规范状态。当前实现将其保存在 Runtime 的 `ProtocolState` 中：

```
31-byte JAM State Key
    →
State Value
```

## Refine

当一个 Work 被提交后，Runtime 会从当前可用的 Worker 集合中确定性地分配一组 Worker。其中一个 Worker被指定为候选报告生产者。

候选生产者需要：

1. 获取 Work Package 对应的 Bundle；
2. 验证 Bundle 的大小和内容哈希；
3. 验证 Bundle 与链上 Work Package 承诺一致；
4. 验证 Work Package 使用的历史状态锚点；
5. 读取该锚点对应的 JAM 状态；
6. 使用 Jambda 执行 Refine；
7. 生成规范 Work Report；
8. 将 Work Report 封装为候选报告并提交。

你可以将 Refine 理解为一种链下执行，不需要所有验证者都运行，而是通过特定的机制确保它被正确执行。

## Accumulate

工作报告被提交后，会被记录到 runtime 中，满足相关条件后即可处理。Accumulate 由 Runtime 中的 Jambda Executive 执行，从而改变 JAM 协议状态。

```
已接受的 Work Reports
Pending Preimages
Pending System Operations
当前 JAM 状态
    │
    ▼
Jambda Executive
    │
    ▼
Execution Output
    │
    ├── State Delta
    ├── Consumed Reports
    ├── Consumed Preimages
    ├── Consumed System Operations
    └── Receipt Hash
```

累积发生在 Runtime，这在 JAM 和 MiniJAM 中是相同的。因此累积是昂贵的，在编写实际服务时，它应当相当高效。

## Work 的完整生命周期

一个普通 Work 当前会经历以下过程：

```
提交 Work Package 和 Bundle 承诺
    ↓
Runtime 记录 Work
    ↓
确定性分配 Worker
    ↓
候选生产者获取 Bundle
    ↓
候选生产者基于 Lookup Anchor 执行 Refine
    ↓
提交 Work Report
    ↓
其他被分配 Worker 独立执行 Refine
    ↓
Support / Oppose 投票
    ↓
候选报告被接受
    ↓
Work Report 进入执行队列
    ↓
Runtime 中的 Jambda Executive 执行 Accumulate
    ↓
验证 State Delta
    ↓
原子更新 JAM 状态
    ↓
记录 Execution Receipt
```

如果候选报告被拒绝或超时，MiniJAM 可以进入下一候选轮次，并重新选择候选生产者。如果达到最大轮次数仍未产生被接受的报告，该 Work 会被标记为失败。

## 数据存储

Work Package 本身不足以包含执行所需的所有数据，因此 MiniJAM 使用 Bundle 承载较大的执行输入。在 JAM 中，大量的数据暂存在 D3L 中。在 MiniJAM 中，使用 IPFS 网络来实现存储，Runtime 中记录的是 Bundle 的内容承诺，作为 Worker 的信号。

Worker 获取 Bundle 后必须验证：

- 实际字节数与声明的大小一致；
- 实际内容哈希与声明的哈希一致；
- Bundle 中的 Work Package 与链上规范 Work Package 一致；
- Package Hash 与链上记录一致。

通过这种方式存储的数据相对链上存储来说，相当高效。因此，尽可能使用该方式存储数据，只有承诺类数据、需要暴露给其他服务的数据存储在链状态中。
