---
title: JamScript 状态
description: JamScript Service 的持久托管状态与执行期内存。
---

# JamScript 状态

| 数据 | 生命周期 |
|---|---|
| action 输入 | 一次调用 |
| 局部变量和分配 | 一次执行 |
| action 输出 / Work Result | 从 Refine 传给 Accumulate |
| 托管 Service 状态 | 持久，由 trie root 认证 |

```ts
const scores = stateMap({ schema: "scores/v1", key: address, value: u64 });
const old = scores.get(ctx.sender);
scores.set(ctx.sender, old ? old + 1n : 1n);
```

Refine 读取 proof-backed 历史状态视图并生成规范 transition。Accumulate 比较 parent root、检查过期条件，只向 JAM/MiniJAM storage 写入 runtime 拥有的 `:jam-service-runtime:managed-state:v1` root commitment。schema 变化属于迁移，runtime 不会自动改写状态。
