---
title: JamScript 概览
description: 使用 JamScript 0.2 构建确定性的 JAM Service。
slug: /jamscript
---

# JamScript

JamScript 是用于构建 JAM Service 的确定性 TypeScript 风格语言。语言 `0.2` 通过锁定的 ScriptC backend 编译为 PVM 程序；MiniJAM 是当前受支持的目标。

```ts
import { action, wallet, u64 } from "jam";
export const increment = action({
  auth: wallet(), input: { value: u64 },
  execute(ctx, input) { return input.value + 1; },
});
```

```text
JamScript 源码 → 编译器 + ScriptC → PVM 程序 → JAM Service → MiniJAM
```

JamScript 提供有界 ABI 类型、已认证 action、托管持久状态以及生成的 Refine 和 Accumulate 入口，并排除环境中不确定的平台 API。

:::warning 尚未稳定
目前只支持语言 `0.2`。工具链和公开接口仍在演进；Formal V1 之前的开发版本不属于兼容性承诺。
:::

从[快速开始](./getting-started/quickstart.md)入门，再阅读[支持的 JavaScript](./language/supported-javascript.md)和[执行模型](./runtime/execution-model.md)。
