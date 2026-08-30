---
title: JamScript 的确定性
description: JamScript 为何排除环境 JavaScript 行为。
---

# JamScript 的确定性

每个验证者必须从相同 Service 代码、输入和锚定状态得到相同结果。因此 JamScript 要求依赖显式，并拒绝可达的环境行为。

Service 没有浏览器 API、网络/文件系统、系统时钟、timer、进程环境、非受控熵、动态加载、`eval` 或 Promise/async 调度；`Date.now()` 与 `Math.random()` 同样不可用。

应改用签名输入、有界 ABI 值和协议明确提供的 context。ScriptC surface manifest 与 JamScript reachability 分析负责执行这些限制：不可达 helper 中可以出现受禁名称，可达用法则构建失败。
