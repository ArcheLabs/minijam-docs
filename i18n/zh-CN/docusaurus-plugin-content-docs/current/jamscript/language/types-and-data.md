---
title: JamScript 类型与数据
description: JamScript 0.2 的有界 ABI 类型和规范编码。
---

# JamScript 类型与数据

跨 action、state、query 或 client 边界的值必须使用有界 descriptor：

- `unit`、`bool`、有符号/无符号 8/16/32/64/128 位整数；
- `address`、`fixedBytes(N)`、`bytes(N)`、`string(N)`；
- `fixedArray(T,N)`、`array(T,N)`、`option(T)`、`tuple(...)`、`record({...})`；
- 有界 `enumType({...})` 和 `result(T,E)`。

定宽整数为 little-endian；TypeScript client 用 `bigint` 表示 64/128 位整数。record 按声明顺序编码，enum 使用固定 index，动态值携带 JAM general-natural 长度且不得超过上限。

普通 JavaScript `number`、无界数组/字符串、`any`、`unknown` 和无 descriptor 对象不是 ABI 类型。编译器会计算最大编码长度并拒绝超出边界的类型。
