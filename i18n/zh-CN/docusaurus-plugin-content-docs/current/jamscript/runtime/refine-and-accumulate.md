---
title: JamScript Refine 与 Accumulate
description: Service 生成的 Refine 和 Accumulate 边界做了什么。
---

# JamScript Refine 与 Accumulate

应用作者导出 action、state 和 query。Target 会生成 PVM entry，通常不需要自己
编写这些函数。

```text
signed action + state witness
  → Refine
  → authenticated state transition / receipts
  → Accumulate
  → committed managed-state root
```

## Refine

生成的 `minijam_refine` entry 会：

1. 从 target host 获取不透明的 Work payload；
2. 对 wallet action 解码 Formal `SignedActionV1` envelope；
3. 检查 network domain、Service key、action selector、payload hash、sr25519 签名、
   过期字段和 sender nonce；
4. 打开 proof-backed managed-state view；
5. 在 transaction 中运行选中的 ScriptC action；
6. 编码新的 root、receipts 和 recovery/state transition output。

`publicAction()` 的 payload 没有签名，sender 为空。当前生成的 runtime 支持全
wallet action，或一个 public action，不支持混用。

如果 action 读取了 witness 中不存在的 key，runtime 可以返回 `NeedState` dependency。
Producer 可以扩展 access plan 并重跑 action；这正是动态 state access 仍然保持
确定性的原因。

## Accumulate

生成的 `minijam_accumulate` entry 不会再次运行应用代码。它会：

- 读取 authoritative tick 和有序的 Refine result；
- 从当前 managed-state commitment 开始；
- 只接受 parent root 与当前 root 匹配的 transition；
- 在 `tick > valid_until` 时拒绝 transition；
- 把新的 34-byte managed-state commitment 写入 runtime 保留 key。

过期判断包含边界：`tick == valid_until` 仍然有效。Accumulate 不把 application-level
state diff 当作新的应用逻辑执行；transition 和 proof 检查共同建立新的 root。

Export name、host-call number 和 `a0/a1` register 约定都是 target ABI 细节。调试
artifact 或集成 host 时有用，但它们不是 JamScript application API。
