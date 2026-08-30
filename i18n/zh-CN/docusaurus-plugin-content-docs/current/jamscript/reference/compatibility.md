---
title: JamScript 兼容性矩阵
description: Formal V1 MiniJAM 工具链的已验证版本。
---

# JamScript 兼容性矩阵

| 组件 | 已验证基线 |
|---|---|
| JamScript 语言 | `0.2` |
| JamScript workspace | `0.1.0` packages；HEAD `23f3adac02eb1648e4005586190dee6715c994c8` |
| ScriptC | `0.0.34`，revision `d7b4480`，M2 |
| Node.js / Rust | `24.x`（锁定 `24.15.0`）/ `1.88` |
| PolkaVM linker | `0.30.0` |
| Application / SDK ABI | `1` / `1` |
| `jam-codec` | `0.1.1` |
| target adapter | `minijam-0.2` |
| MiniJAM | 锁定基线 `18de55e175abb1cb40679be2e538644e2387655f` |
| Jambda | 兼容基线 `d33e0abf8116b23bbc551c6a8d7075eacb2994ce` |

本次检查的独立 Jambda checkout 为 `fe67ecf5ccbe16b3490d73cc4d8b1e48eb7bea86`；发布兼容合同仍以 MiniJAM/JamScript 锁定的 revision 为准。JamScript 当前面向 MiniJAM ABI，不声称直接兼容 full JAM target。精确 build identity 以 lockfile 与生成的 `build.json` 为准。
