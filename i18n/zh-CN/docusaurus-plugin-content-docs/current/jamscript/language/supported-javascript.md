---
title: JamScript 支持的 JavaScript
description: ScriptC M2 与 JamScript 0.2 的已验证兼容范围。
---

# JamScript 支持的 JavaScript

| 功能 | 状态 | 说明 |
|---|---|---|
| `const` / `let` | 支持 | 当前 fixture 使用 |
| 函数、嵌套 helper | 支持 | 会分析可达 helper |
| 条件、循环、比较 | 支持 | 已通过 PVM conformance |
| 数组、对象、字符串 | 支持 | ABI 动态值必须有界 |
| `Uint8Array` | 支持 | 已通过 PVM conformance |
| closure、class | 实验性 | 不在已发布 conformance 承诺中 |
| exception | 部分支持 | runtime 捕获 action 失败；通用语义不稳定 |
| 浮点 `number` | 部分支持 | 有确定性 soft-float 覆盖；ABI 需明确整数 descriptor |
| `bigint` | 部分支持 | 宽整数使用；只有已声明宽度可移植 |
| Promise / async / await | 不支持 | 可达用法会被拒绝 |
| `Date`、clock、随机数 | 不支持 | 不确定性来源 |
| fetch、socket、文件系统 | 不支持 | 无环境 I/O |
| DOM、timer | 不支持 | 无浏览器和事件循环 |
| dynamic import、`eval`、`Function` | 不支持 | 可达用法会被拒绝 |

parser 还限制顶层结构：只允许命名 import、`export const` action/query、状态声明和 helper 函数。编译器限制与确定性限制都可能产生错误。
