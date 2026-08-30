---
title: JamScript 语言概览
description: JamScript 0.2 已实现的语言和程序模型。
---

# JamScript 语言概览

JamScript `0.2` 接受受限的 TypeScript 编译单元。import 来自 `jam` 或已声明的 `native:<module>` C 模块；顶层声明定义有界类型、状态、导出的 action 和 query，ScriptC 编译可达的 action body。

action 声明认证、有界输入和 `execute(ctx, input)`。query 暴露已声明状态。持久值使用 `state` 或 `stateMap`；普通变量和分配只在一次执行中存在。

JamScript 不是完整浏览器或 Node.js 运行时：没有 DOM、环境文件/网络、时钟、熵源、timer 或 Promise/async。编译器生成类型 IR 和 Rust runtime wrapper，经 ScriptC M2 编译并链接 PVM guest，最后输出 MiniJAM 产物。具体范围见[支持的 JavaScript](./supported-javascript.md)。
