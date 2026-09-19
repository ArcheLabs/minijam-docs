---
title: JamScript 语言概览
description: JamScript 0.2 已实现的语言和 Service 模型。
---

# JamScript 语言概览

JamScript `0.2` 是一个刻意保持小巧的 TypeScript 风格语言。它保留适合确定性
应用逻辑的 JavaScript 部分，并为 JAM 边界增加类型化词汇。

```ts
import { action, wallet, stateMap, address, u32 } from "jam";

const balances = stateMap({
  schema: "balances/v1",
  key: address,
  value: u32,
});

export const credit = action({
  auth: wallet(),
  input: { amount: u32 },
  execute(ctx, input) {
    const old = balances.get(ctx.sender);
    balances.set(ctx.sender, old === null ? input.amount : old + input.amount);
  },
});
```

## 最常用的几个部分

| 部分 | 作用 |
|---|---|
| `action({...})` | 声明可调用的 Service 入口、认证方式、输入字段和 `execute(ctx, input)` body。 |
| `wallet()` | 要求签名 wallet action，并通过 `ctx.sender` 提供已验证的 sender。 |
| `publicAction()` | 无 signer，直接接收 raw payload。当前语言路径只支持一个 public action。 |
| `state(...)` / `stateMap(...)` | 用显式 schema 和有界类型声明持久化托管状态。 |
| `query(state)` | 为一个已声明的状态值增加 proof-backed client 读取 metadata。 |
| `abort(code)` | 用 `1` 到 `0x00ffffff` 的应用错误码停止当前 action。 |

应用代码写在 `execute` 中。当前 `ctx` 只在 wallet action 中提供 `sender`；它不
是通用 runtime 对象，也不提供 clock、network handle 或任意 storage handle。

## 顶层可以放什么

parser 接受 named import、descriptor/state 常量、helper 函数声明，以及初始化
为 `action(...)` 或 `query(...)` 的导出 `const` 声明。

用 descriptor 常量代替只存在于 TypeScript 类型层的 alias：

```ts
import { stateMap, address, bytes, u32, record } from "jam";

const Entry = record({ owner: address, amount: u32 });
const entries = stateMap({ schema: "entries/v1", key: bytes(32), value: Entry });
```

default import、namespace import、顶层可执行语句、destructuring 声明、schema 中
的 object spread，以及任意 module import 都不在当前源码 grammar 中。实际限制见
[支持的 JavaScript](./supported-javascript.md)。

## Action 输出与持久化

当前 ScriptC M2 路径把 action 的应用输出视为 `unit`。Action 通过修改托管状态
传递有效结果，client 在 finalized 后查询这个状态。局部变量和普通分配会在
执行结束时丢弃。

compiler 会把 metadata 提取为 typed IR，用 ScriptC M2 编译 action body，生成
Rust runtime wrapper，最后链接 JamV1 PolkaVM artifact。应用作者不需要自己实现
`minijam_refine` 或 `minijam_accumulate`。
