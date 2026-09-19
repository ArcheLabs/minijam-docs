---
title: JamScript 内存模型
description: 执行期分配与持久状态的边界。
---

# JamScript 内存模型

生成的 Service 在有界 PolkaVM linear memory 中运行。JavaScript object、array、
string、`Uint8Array` 或局部变量只存在于当前执行。如果数据必须跨调用保存，请
放进 managed state。

## 当前 runtime 预算

| 资源 | 当前边界 |
|---|---:|
| ScriptC guest heap | 64 KiB |
| Guest 声明的最小 PVM stack | 2 MiB |
| State-view entries | 4,096 |
| 编码后的 state view | 1 MiB |
| 单个 state value | 64 KiB |
| 单个 state key | 4 KiB |

Heap 会在 guest entry 时重置。ScriptC 使用的 `malloc`、`calloc`、`realloc` 和
`free` 是 freestanding C-compatible symbol，不会向操作系统申请内存。Heap 用尽
会导致 runtime failure，而不会自动动态扩容。

这些是当前 target 参数，不是源码级兼容性承诺。请编写有界代码，避免构造很大的
临时集合，也不要依赖 allocator 地址或 object layout。

Action payload 和 generated result 同样有 runtime 上限。Compiler 的最大编码长度
检查是发现 schema 过大的最早、最清晰的位置。
