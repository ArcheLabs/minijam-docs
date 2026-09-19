---
title: JamScript 状态
description: 持久化托管状态、state map、query 和安全的状态执行。
---

# JamScript 状态

JamScript 把临时执行数据与经过认证的持久状态分开：

| 数据 | 生命周期 |
|---|---|
| Action input | 一次调用 |
| 局部变量和分配 | 一次执行 |
| State overlay | 一次尝试中的 transition |
| 托管 Service 状态 | 持久化，由 committed trie root 选择 |

## Scalar state

Service 只有一个值时使用 `state`：

```ts
import { action, wallet, state, query, u32 } from "jam";

const total = state({ schema: "total/v1", value: u32 });

export const add = action({
  auth: wallet(),
  input: { amount: u32 },
  execute(_ctx, input) {
    const old = total.get();
    total.set(old === null ? input.amount : old + input.amount);
  },
});

export const getTotal = query(total);
```

Scalar state 使用隐式空 key。第一次写入前，`get()` 返回 `null`。

## State map

值需要通过 typed key 定位时使用 `stateMap`：

```ts
import { action, wallet, stateMap, query, address, bytes, u32, record } from "jam";

const profiles = stateMap({
  schema: "profile/v1",
  key: address,
  value: record({ name: bytes(32), score: u32 }),
});

export const updateProfile = action({
  auth: wallet(),
  input: { name: bytes(32) },
  execute(ctx, input) {
    const profile = profiles.get(ctx.sender);
    if (profile === null) {
      profiles.set(ctx.sender, { name: input.name, score: 0 });
    } else {
      profiles.set(ctx.sender, { name: input.name, score: profile.score + 1 });
    }
  },
});

export const getProfile = query(profiles);
```

`get` 和 `has` 能区分“已知不存在的值”和“缺少 state witness”。`set` 与
`delete` 都是 transactional。调用 `abort(code)`、proof 无效或应用出现 fatal
错误，都不会留下部分写入。

## State schema 属于 identity

`schema` 必须是非空 ASCII 字符串，最多 64 bytes，并且在同一 Service 内唯一。
它会被编码进 managed application key：

```text
0x01 || little-endian namespace length || schema || canonical user key
```

Application key 不会 hash，也不会加入 Service ID：每个 Service 已经拥有自己的
managed trie。Runtime-owned key 使用独立的 internal namespace，应用 binding 不能
写入它们。

把 schema 变化当成 migration。改变字段顺序、value type 或已有 schema 的含义，
都会改变 state identity；runtime 不会自动重写旧值。

## Proof-backed 读取

Refine 在锚定 parent root 的 state view 上执行。Builder 会记录应用实际访问的
key，并携带对应 proof。动态访问时：

- key 被包含在 witness 后，合法的 non-inclusion 表示为 `null`；
- witness 中没有的 key 会产生 `NeedState` dependency，builder 可以请求它并重
  跑应用；
- proof 无效或不完整属于 validation failure，而不是空值。

Query 遵循相同的信任模型。Client 先解析 finalized managed-state root，再向
provider 请求明确的 `(Service, root, key)`，本地验证 proof，最后解码 value。
Managed state 不会回退到任意 JAM Service KV 读取。
