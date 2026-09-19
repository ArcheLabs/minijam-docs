---
title: JamScript 类型与数据
description: JamScript 0.2 的有界 ABI 类型、JavaScript 值和规范编码。
---

# JamScript 类型与数据

JAM validator 需要知道值最多有多大、以及如何编码成 bytes。因此每个 action
输入、托管状态 key/value 和 query 输出都必须使用明确的 descriptor。

## 类型词汇

```text
unit, bool
u8, u16, u32, u64, u128
i8, i16, i32, i64, i128
address
fixedBytes(N), bytes(N), string(N)
fixedArray(T, N), array(T, N)
option(T), tuple(...), record({...})
enumType({...}), result(T, E)
```

Descriptor 在源码中是值：

```ts
import { address, bytes, record, u32 } from "jam";

const Key = bytes(32); // 最多 32 bytes；编码的是实际长度
const Entry = record({
  owner: address,
  score: u32,
});
```

`fixedBytes(N)` 要求恰好 `N` bytes；`bytes(N)` 允许从 0 到 `N` 的任意长度。
`fixedArray` 与 `array` 也有相同区别。这个上限属于校验规则和 ABI identity 的一
部分，并不表示每个值都会占满上限。

## 今天什么可以构建？

语言 metadata 和 client codec 支持上面的完整词汇。当前 ScriptC M2 executable
state/action binding 支持的集合较小：

```text
unit, bool, u8, u16, u32,
address, fixedBytes(N), bytes(N), record({...})
```

Record 可以嵌套这些支持的类型。`u64`、string、array、option、tuple、enum、
result 和宽有符号整数对 ABI generator/client 是有效 descriptor，但还没有在每个
M2 执行边界上做到可移植。第一个 Service 建议先用 `u32`，并在接入更宽 schema
前检查生成的 `service.abi.json`。

## JavaScript 与 client 表示

| Descriptor | Service 侧实际值 | Client 侧值 |
|---|---|---|
| `bool` | `boolean` | `boolean` |
| `u8` / `u16` / `u32` | `number` | safe `number` 或 `bigint` |
| `u64` / `u128`、`i64` / `i128` | ABI 支持，M2 执行受限 | `bigint` |
| `address`、`fixedBytes(N)`、`bytes(N)` | `Uint8Array` | `Uint8Array` |
| `string(N)` | descriptor 支持，M2 执行受限 | UTF-8 `string` |
| record | 包含声明字段的 object | 包含声明字段的 object |
| option / array / tuple | descriptor 支持，M2 执行受限 | `null` / array |

Client 在合适的场景接受 safe integer `number`，但 64/128 位值明确使用 `bigint`
更安全。

## 规范编码

- 定宽整数使用 little-endian。
- Boolean 只能是 `00` 或 `01`。
- `bytes(N)` 和 `string(N)` 使用 JAM general-natural 编码实际 UTF-8 byte
  长度，后面跟 bytes。
- Address 是 32 bytes。Fixed bytes 和 fixed array 没有额外 length prefix。
- Record 和 tuple 按声明/顺序编码，线上不携带字段名。
- Option、result 和 enum 以一个 byte 的 variant tag 开头。
- Decoder 必须消费完整值；尾随 bytes、错误 tag、非法 UTF-8 和越界值都会失败。

应用 ABI 使用这些规范 JAM codec 规则。它和 JAM protocol 的边界不同，后者在
Accumulate 初始化字段中使用 `FnEncode`。

## 会影响设计的大小限制

| 边界 | 当前限制 |
|---|---:|
| 单个 action payload | 1,000,000 bytes |
| 单个 managed-state key | 4,096 bytes |
| 单个 managed-state value | 65,536 bytes |
| State-view entries | 4,096 |
| 编码后的 state view | 1 MiB |

Compiler 会计算最大编码长度，并拒绝放不进边界的 schema。建议使用小而稳定的
record，并在部署前给 schema 命名时带上版本。
