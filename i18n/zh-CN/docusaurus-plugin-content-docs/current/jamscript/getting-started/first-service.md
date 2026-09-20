---
title: 第一个 JamScript Service
description: 从源码到 query 理解一个小型有状态 JamScript Service。
---

# 第一个 JamScript Service

下面是当前已发布 JamScript 路径中的一个小型有状态 Service：

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

`stateMap` 声明经过认证的应用状态。这里 key 是 `address`，value 是 `u32`。
`schema` 属于状态 identity 的一部分，应使用带版本的名字，后续不要悄悄改变含义。

`wallet()` 要求 action 带有 JamScript 认证。Runtime 会在 action body 执行前验证
Ownership/controller proof，并通过执行上下文暴露已经验证的 sender。

key 不存在时，`get` 返回 `null`。`set` 写入当前 action 的事务状态视图；
失败的 action 不会提交部分状态。

`query(counters)` 发布 typed query 描述，Client 可以据此读取 finalized managed
state。

## 构建

如果还没有安装 JamScript：

```bash
curl -fsSL https://install.minijam.xyz/jamscript | bash
```

随后在项目目录中执行：

```bash
jams check .
jams abi .
jams build . --output dist
jams inspect dist
```

也可以在本地验证构建出的 PVM：

```bash
jams run dist/service.pvm
```

installer 已经提供托管 compiler/toolchain。正常应用开发不需要 checkout JamScript
源码仓库。

继续阅读[状态](../language/state.md)、[类型与数据](../language/types-and-data.md)和
[部署](../deployment/index.md)。
