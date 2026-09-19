---
title: JamScript 兼容性矩阵
description: 当前 Formal V1 与 JamV1 工具链基线。
---

# JamScript 兼容性矩阵

以下是当前 JamScript toolchain distribution 内嵌的 baseline。具体 build 应以
`build.json` 和 bundle manifest 为准。

| 组件 | 已验证基线 |
|---|---|
| Public CLI | `jams`，workspace version `0.1.0` |
| 源语言 | `0.2` |
| Backend | `scriptc-m2` |
| ScriptC | `0.0.34`，revision `d7b4480` |
| TypeScript | `7.0.2` |
| Node.js | `24.15.0` |
| Rust | `nightly-2026-05-02` |
| Clang/LLVM | `20.1.8` official Linux distribution |
| PolkaVM linker | `0.30.0` |
| JAM target | `jam-v1` |
| JAM blob encoder | `0.1.28` |
| Application / managed state ABI | `1` / `1` |
| Signed action | `SignedActionV1` |
| Managed-state protocol/layout | `1` / `1` |

## 与 MiniJAM 的关系

JamScript 面向 JamV1 边界，编译 Service 不需要 MiniJAM 或 Jambda。MiniJAM 是下游
network execution、deployment 和 live compatibility check 的消费者。MiniJAM node
revision 可以变化而不改变 JamScript language 或 application ABI，但下游流程仍需
使用兼容的 target/runtime baseline。

## 可复现构建清单

分享 artifact 时请保留：

- JamScript source revision；
- `jamscript.toml` 和 `.jamscript/service.json`；
- 生成的 `service.abi.json`；
- `build.json`、`protocol-v0.json` 和 `checksums.json`；
- CLI/toolchain release identity。

改变 source type、record field order、enum index、action name/selector、state schema、
codec 或 target version，都需要进行明确的兼容性与 state-migration review。
