---
title: JamScript 稳定性策略
description: JamScript 的稳定级别和 breaking change 预期。
---

# JamScript 稳定性策略

JamScript 当前是 developer preview。下面的标签说明今天哪些内容可以相对放心地
依赖。

| 级别 | 含义 | 当前示例 |
|---|---|---|
| Versioned protocol boundary | Wire 变化需要新的 versioned boundary | `SignedActionV1`、application ABI `1`、managed-state protocol/layout `1` |
| Preview API | 可以使用，但源码或行为可能变化 | 语言 `0.2`、`jams` CLI、ScriptC M2、`jamscript.toml` |
| Generated/internal | 不要依赖名称或 layout | Generated Rust/C、allocator layout、build staging file、host-call 细节 |
| Experimental | Plumbing 已存在，但还未端到端支持 | Native C import、更宽的 M2 executable type surface |

Formal V1 是首个受支持的 wire/runtime protocol；此前的开发代际不是兼容合同。
源码兼容范围也窄于通用 TypeScript。

面向类生产工作时：

- 固定 JamScript CLI/toolchain release 和 source revision；
- 在 artifact 记录中保留 `build.json` 与 `service.abi.json`；
- 保持 Service identity 文件稳定；
- 把 type/schema 变化当作 migration；
- 除非在自己的精确 toolchain 中验证过，否则使用当前 M2 executable subset。

Generated function name、heap size、register convention 和中间文件可以在不提升
language version 的情况下变化。
