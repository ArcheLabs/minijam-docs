---
title: JamScript 兼容性
description: 在不混淆 release 与 main 分支协议状态的前提下固定 JamScript build。
---

# JamScript 兼容性

JamScript 同时存在多个独立演进的边界：源语言、compiler backend、target/SDK ABI、signed-action protocol、managed-state protocol、Backend/Client protocol，以及下游 MiniJAM compatibility。

因此，本站人工复制的一张固定版本表不应被视为权威来源。

## 对于已发布 build

具体 artifact 应保存并信任：

- JamScript release identity；
- project manifest 与 Service identity；
- 生成的 Service ABI；
- build metadata 与 checksum；
- artifact 携带的 protocol/build evidence。

所选择的 release asset 与生成 build metadata 才能说明实际使用了什么。

## 网络兼容性

JamScript 编译不依赖 MiniJAM 或 Jambda。MiniJAM 是下游 deployment/execution target，因此网络 compatibility 必须单独检查。

请使用：

- [JamScript releases](https://github.com/ArcheLabs/JamScript/releases)
- [JamScript MiniJAM compatibility notes](https://github.com/ArcheLabs/JamScript/blob/main/docs/minijam-spec-compatibility.md)
- [MiniJAM compatibility matrix](https://github.com/ArcheLabs/minijam-client/blob/main/docs/compatibility-matrix.md)

## Main 不等于 release

Main 分支可能包含比最新公开 CLI/toolchain 更新的语言或 Runtime 工作。除非兼容性已经明确验证，不要把 main 分支协议描述与更旧的 release artifact 混合使用。

修改 boundary type、field order、action selector、state schema、codec、signing protocol、managed-state version 或 target 时，都需要显式 compatibility/migration review。
