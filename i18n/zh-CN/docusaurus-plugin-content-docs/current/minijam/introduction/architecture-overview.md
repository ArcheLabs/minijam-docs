---
id: architecture-overview
title: 架构概览
slug: /minijam/introduction/architecture-overview
sidebar_position: 3
---

# 架构概览

MiniJAM 是一条独立的 Polkadot SDK 链，由 Node、Runtime、Worker 集合、Bulletin-compatible 数据边界、Bridge 和状态处理组件组成。Playground API 还承担 Stage 0 的 bundle gateway。

当前 Work 生命周期是：

```text
提交 Work
→ 确定性 Worker 分配
→ 提交 ReportEnvelopeV1
→ 锁定候选报告保证金
→ 被分配的 Worker 进行 Support/Oppose 投票
→ 被接受的报告进入执行队列
→ Runtime 执行 Accumulate
→ 原子状态更新
→ 记录 receipt 和 effects
```

Worker 会重新获取声明的输入并独立验证报告，然后投票。Runtime 随后校验并规范化状态变化，再以原子方式应用。

Stage 0 使用 `BulletinEvidence` 抽象、Bulletin-compatible simulator 和 Playground API bundle gateway。这不是 JAM availability，也不是直接接入正式 Bulletin Chain。
