---
title: MiniJamSpec
description: MiniJAM 规范网络 profile，以及它与 Runtime/Worker policy 的边界。
---

# MiniJamSpec

MiniJamSpec 是 MiniJAM 的规范网络 profile。

它**不是** JAM TinySpec、JAM FullSpec，也不是 MiniCells 专用 workload profile。

规范定义由 MiniJAM 所固定的 Jambda revision 维护，MiniJAM 生产代码直接导入该 profile，而不是在多个位置复制常量。

## 分层

| 层 | 示例 | 含义 |
|---|---|---|
| MiniJamSpec | validator、core、slot/epoch 参数、gas envelope | 规范网络 profile |
| Runtime policy | admission budget、deadline、pending-work limit | MiniJAM Runtime 行为 |
| Worker policy | execution lanes、cache、调度 | Operator 本地选择 |
| Application ABI | Service payload、PVM entry point | JamScript / Service 边界 |

调整 Worker 并发度不应悄悄变成共识变更；应用也不应把 MiniJamSpec 常量编译进 ABI。

## 规范值

本站不再维护第二份人工复制的参数表。请以 [MiniJamSpec 规范文档](https://github.com/ArcheLabs/minijam-client/blob/main/docs/minijam-spec.md) 和 [compatibility matrix](https://github.com/ArcheLabs/minijam-client/blob/main/docs/compatibility-matrix.md) 为准。
