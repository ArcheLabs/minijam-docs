---
title: 第一个 JamScript Service
description: 从源码到 query 理解一个小型有状态 JamScript Service。
---

# 第一个 JamScript Service

下面是当前 ScriptC M2 路径中一个最小但有用的有状态 Service：

```ts
import { action, wallet, stateMap, query, address, u32 } from "jam";

const counters = stateMap({
  schema: "counter/v1",
  key: address,
  value: u32,
});

export const increment = action({
  auth: wallet(),
  input: { amount: u32 },
  execute(ctx, input) {
    const old = counters.get(ctx.sender);
    counters.set(
      ctx.sender,
      old === null ? input.amount : old + input.amount,
    );
  },
});

export const getCounter = query(counters);
```

## 读懂这个例子

`stateMap` 声明一个经过认证的 map：key 是 `address`，value 是 `u32`。`schema`
属于状态 identity 的一部分，应使用带版本的名字，后续不要悄悄改变它的含义。

`wallet()` 表示 action 必须以 Formal `SignedActionV1` 到达。runtime 会在执行
body 前检查 network domain、Service key、action selector、payload hash、sr25519
签名、过期字段和 sender 的连续 nonce。`ctx.sender` 是已验证的 32-byte wallet
address。

key 不存在时，`get` 返回 `null`。`set` 写入 transaction overlay；只有
Refine/Accumulate transition 被接受后，修改才会持久化。如果 action 调用
`abort(code)` 或执行失败，状态修改会回滚。

`query(counters)` 发布一份 client 可读的 map 描述。query 不执行应用代码，也不
修改状态。client 会读取 finalized managed-state root，验证目标 key 的 proof，
最后才解码 value。

## 为什么 action 没有 `return`

当前 M2 Service runtime 使用 `executeOutput: unit`。这个示例的有效结果是状态
transition，client 在 `getCounter` 中读取它。旧 counter 示例中的 return 表达式
属于较早的 compiler 路径，不应在当前 `0.2` Service 中当作应用输出使用。

## 构建

```bash
export JAMSCRIPT_DEV_TOOLCHAIN=1
export JAMSCRIPT_DEPLOYER_ACCOUNT=0xYOUR_64_HEX_CHARACTER_PUBLIC_KEY
./target/debug/jams check .
./target/debug/jams abi .
./target/debug/jams build . --output dist
```

使用 release 流程时，把 `./target/debug/jams` 换成 `jams`，并在工具链安装后加上
`--offline`。

继续阅读[状态](../language/state.md)、[类型与数据](../language/types-and-data.md)
以及 [Refine 与 Accumulate](../runtime/refine-and-accumulate.md)。
