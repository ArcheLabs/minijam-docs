---
title: JamScript 的确定性
description: JamScript 为什么排除环境 JavaScript 行为。
---

# JamScript 的确定性

Validator 必须从相同的 Service 代码、签名输入和锚定状态得到相同结果。JamScript
让这些输入显式化，并移除可能在不同机器或 replay 中产生差异的 API。

## Service 可以依赖什么

- 声明的 action input；
- 使用 `wallet()` 时经过验证的 wallet sender；
- 锚定 witness 提供的托管状态；
- 确定性的代码和有界数据转换。

Service 不能访问系统 clock、网络、文件系统、环境变量、浏览器 API、timer、thread、
非受控随机性或操作系统 allocator。

## 会被拒绝的 API

当前 deterministic profile 拒绝 `Date`、`Date.now()`、`performance.now()`、
`Math.random()`、`process`、`fetch`、socket、文件系统调用、`Promise`、
`async`/`await`、dynamic import、`eval`、`require` 和 `Function` constructor。
`globalThis` 以及 DOM/浏览器全局对象也不可用。

M2 transform 会检查完整的 TypeScript source unit。因此未使用的 helper 中包含禁用
API 也可能让构建失败。这样可以让错误在编译期出现，而不是部署后才暴露。

## 应该怎么做

把变化中的信息作为有界 action field 传入，把授权交给签名 wallet action。如果外部
系统需要取数或使用 clock，应在 Service 外部完成，并把结果作为协议输入中明确、可
验证的 bytes 传入。不要尝试从本地机器状态重建时间或随机数。

`publicAction()` 刻意更弱：它没有 signer，收到的 sender 为空。Public action 不
能使用 `ctx.sender`。
