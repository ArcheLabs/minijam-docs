---
title: Worker
description: Stage-1 Refine 执行角色，以及它与网络共识之间的边界。
---

# Worker

MiniJAM Worker 是负责 Refine 路径的链下执行角色。

Worker 获取执行所需输入，通过当前支持的执行引擎运行分配的 Work，并使用自己的签名身份提交协议结果。

除非协议明确承诺，Worker 的并发、cache 和调度属于 Operator 本地选择。本地 execution lanes 不等于 MiniJamSpec core 数，也不是应用 ABI 参数。

某个 Worker 生成结果并不意味着结果自动成为规范状态。Work Report、投票/验证与 Runtime 状态变化仍然遵循网络定义的接受路径。
