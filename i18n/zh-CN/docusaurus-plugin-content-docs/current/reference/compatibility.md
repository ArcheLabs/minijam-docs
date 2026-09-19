---
title: 兼容性与真相源
description: 在不跨仓库复制协议事实的前提下理解 MiniJAM 与 JamScript 版本。
---

# 兼容性与真相源

本站是解释与 onboarding 层，不是第三套独立协议规范。

| 事项 | 规范所有者 |
|---|---|
| MiniJamSpec、网络常量、执行边界、Stage-1 部署 | MiniJAM Client / 固定的 Jambda |
| JamScript 语言、编译器、应用 ABI、托管状态、Ownership、Backend/Client 协议 | JamScript |
| MINI 经济与激励机制 | MINI 生态文档与治理流程 |

MiniJAM 与 JamScript 可以独立演进，因此本站避免维护第二份人工复制的版本表。

固定部署前，请检查：

- [MiniJAM compatibility matrix](https://github.com/ArcheLabs/minijam-client/blob/main/docs/compatibility-matrix.md)
- [MiniJAM execution boundary](https://github.com/ArcheLabs/minijam-client/blob/main/docs/execution-boundary.md)
- [JamScript releases](https://github.com/ArcheLabs/JamScript/releases)
- [JamScript MiniJAM compatibility notes](https://github.com/ArcheLabs/JamScript/blob/main/docs/minijam-spec-compatibility.md)

仓库 main 分支可能包含比最新公开 release 更新的工作。可复现部署应以所选择的 release artifact 及其匹配的 compatibility 信息为准。
