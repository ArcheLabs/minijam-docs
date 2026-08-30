---
title: JamScript Refine 与 Accumulate
description: JamScript Service 生成的 Refine 和 Accumulate 边界。
---

# JamScript Refine 与 Accumulate

```text
Refine → 已认证 Work Result → Accumulate → 持久 Service 状态 root
```

应用作者导出 action 和 query，不手写 PVM 入口；target 会生成两个边界。

`minijam_refine()` 通过 MiniJAM SDK `FETCH` mode `13` 获取 payload，校验 SignedActionV1 network domain、ServiceKey、selector、payload commitment、sr25519 签名、过期字段和 nonce context，在 proof-backed 状态上执行，并通过 `a0/a1` 返回指针和长度。

`minijam_accumulate()` 从 VM 初始化的 `a0/a1` 解码 `(tick, service_id, item_count)`，以 mode `15` 取有序 operand，校验 envelope、parent root 和过期条件，再通过 `WRITE` 写入托管状态 commitment。

过期判断包含边界：`tick <= valid_until` 可提交，`tick > valid_until` 拒绝。上述名称和寄存器约定属于 MiniJAM SDK ABI 1。
