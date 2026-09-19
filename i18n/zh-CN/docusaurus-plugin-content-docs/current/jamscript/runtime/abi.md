---
title: JamScript Runtime ABI
description: 当前应用、runtime 与 JamV1 ABI 边界。
---

# JamScript Runtime ABI

以下是当前 Formal V1 developer-preview baseline：

| 边界 | 当前值 |
|---|---|
| 源语言 | `0.2` |
| CLI/workspace | `0.1.0`，公共命令 `jams` |
| ScriptC backend | `scriptc-m2`，ScriptC `0.0.34` |
| Application ABI | `1` |
| Native C ABI | `1`（experimental plumbing） |
| Signed action | `SignedActionV1` |
| Managed-state protocol/layout | `1` / `1` |
| Runtime Refine input | `1` |
| Recovery format | `1` |
| Target | `jam-v1` |
| PolkaVM linker | `0.30.0` |
| JAM blob encoder | `0.1.28` |

生成的公开 PVM export 是 `minijam_refine` 和 `minijam_accumulate`。Refine 通过
`a0/a1` 返回 output pointer/size；Accumulate 通过 `a0/a1` 接收 invocation-context
input，没有 application output register。这些属于 target integration 细节。

## Application ABI

`service.abi.json` 从同一个 `TypeIr` graph 生成，描述：

- action name、selector、认证方式和 input field；
- query name、所属 state、key type 和 nullable output；
- state schema、key/value type 和 state kind；
- 所有引用到的 type descriptor。

当前 M2 Service 路径中，action 的 `executeOutput` 是 `unit`；state 变化要等
finalized 后通过 managed-state query 观察。Client codec 支持更宽的 descriptor 集合，
详见[类型与数据](../language/types-and-data.md)。

Application value 使用规范 JAM codec 规则。它和 JAM protocol 边界不同，后者在
Accumulate 初始化中使用 `FnEncode` 字段。

## Artifact 的事实来源

排查具体 build 时一起检查：

- `build.json`：精确的 compiler、target 和 toolchain identity；
- `protocol-v0.json`：产物包含的 protocol boundary；
- `service.abi.json`：application contract；
- `checksums.json`：bundle 完整性。

Formal V1 是首个受支持的 wire/runtime protocol。JamScript 源码兼容性和 M2 可执行
surface 仍然是 pre-stable。
