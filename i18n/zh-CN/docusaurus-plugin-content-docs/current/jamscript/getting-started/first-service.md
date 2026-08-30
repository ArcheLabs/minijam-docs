---
title: 第一个 JamScript Service
description: 从源码到状态转换理解生成的计数器 Service。
---

# 第一个 JamScript Service

生成的项目导出一个 action：

```ts
import { action, wallet, u64 } from "jam";
export const increment = action({
  auth: wallet(), input: { value: u64 },
  execute(ctx, input) { return input.value + 1; },
});
```

`wallet()` 要求有效的 Formal V1 签名 action；`u64` 固定输入边界及线上表示。编译器分配 selector，并写入 `service.abi.json`。

```text
签名输入 → 生成的 Refine → 认证并执行 → Work Result
Work Result → 生成的 Accumulate → 校验 root/过期时间 → 提交状态 root
```

该最小示例没有声明持久状态。需要持久化时使用 `state(...)` 或 `stateMap(...)`。继续阅读[状态](../language/state.md)、[Refine 与 Accumulate](../runtime/refine-and-accumulate.md)、[支持的 JavaScript](../language/supported-javascript.md)和[编译器](../tooling/compiler.md)。
