---
title: JamScript 支持的 JavaScript
description: JamScript 0.2 当前实际支持的 JavaScript 与 ScriptC M2 范围。
---

# JamScript 支持的 JavaScript

这里有两个相关但不同的问题：

1. ScriptC 能否在独立语言测试中编译某个 JavaScript 构造？
2. 当前 JamScript M2 runtime 能否在 action 或 state 边界编码它？

通过第一个测试，并不自动意味着它是可移植的 ABI 类型。

## 语言核心

| 功能 | 当前状态 | 说明 |
|---|---|---|
| `const` / `let` | 支持 | Service fixture 正在使用。 |
| 函数和 helper | 支持 | action body 可以调用 helper。 |
| `if`、`for`、`while` | 支持 | ScriptC conformance fixture 已覆盖。 |
| 算术、比较、布尔逻辑 | 支持 | 值仍需落在声明的类型/范围内。 |
| object literal 和属性访问 | 支持 | 适合 record 和局部计算。 |
| 数组和 `Uint8Array` | ScriptC conformance 支持 | 不会自动成为 ABI 数组。 |
| 字符串 | 独立 ScriptC conformance 支持 | 当前 M2 边界还不能执行 `string(N)`。 |
| closure 和 class | 没有兼容性承诺 | 不要把它们作为可移植 Service 合同的一部分。 |
| `try` / `catch` | 受限 | 应使用 `abort(code)` 表达应用失败；未捕获错误会成为 fatal runtime error。 |

## 当前 M2 可执行边界

`toolchains/scriptc/m2/compile-service.mjs` 生成的 action/state codec 当前支持
以下类型，包括嵌套 `record` 字段：

```text
unit, bool, u8, u16, u32,
address, fixedBytes(N), bytes(N), record({...})
```

parser 和 ABI generator 还认识更多类型，包括 `u64`、`u128`、宽有符号整数、
string、array、option、tuple、enum 和 result。client codec 可以编码/解码这些
descriptor，但在当前 M2 action/state 执行路径中使用它们可能会在 ScriptC transform
阶段失败。今天需要构建 Service 时，请使用上面的较小集合。

:::tip 为什么 `jams new` 仍然使用 `u64`？

这个 scaffold 保留了旧的 counter 示例，而 M2 executable codec 仍在扩展。`check`
和 `abi` 可以验证该 scaffold，但当前可构建的示例应使用 `u32`，并把结果持久化
到 managed state，见[第一个 Service](../getting-started/first-service.md)。

:::

## 明确不可用的 API

deterministic profile 会拒绝：

- `Date`、`Date.now()`、`performance.now()` 和其他 clock；
- `Math.random()`、熵源和非受控随机性；
- `process`、环境变量、文件系统、网络、socket 和 `fetch`；
- timer、`Promise`、`async`/`await`、dynamic `import`、`eval`、`require` 和
  `Function` constructor；
- DOM、浏览器全局对象和 `globalThis` 风格的环境访问。

当前 M2 transform 会检查完整的 source unit，所以把禁用 API 放进未使用的 helper
并不能可靠地绕过检查。请删除该 API，或把逻辑移到 Service 外部。

## 认证相关规则

`publicAction()` 提供空 sender；当前 M2 compiler 会拒绝读取 `ctx.sender` 的
public action。生成的 runtime 当前支持全 wallet action，或恰好一个 public action；
不要在同一个 Service 中混用两者。

Native C import 也还不属于当前公开 M2 源码路径。manifest 有 native module 的
plumbing，但 M2 transform 当前只接受来自 `jam` 的 import。在该边界端到端启用前，
请把 `native:<module>` 视为 experimental。
