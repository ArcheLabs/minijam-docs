---
title: 执行边界
description: 区分 MiniJAM 网络共识、Runtime policy、Worker policy 与应用 ABI。
---

# 执行边界

MiniJAM 明确区分网络 profile、Runtime policy、Worker strategy 与 application ABI。

- **MiniJamSpec** 定义 MiniJAM 所消费的网络 profile。
- **Runtime policy** 负责链上强制的执行与 admission rule。
- **Worker strategy** 可以改变本地并发、cache 和调度，而不改变 Work 字节或应用 ABI。
- **Application ABI** 是 JamScript 与其他 toolchain 面向的稳定 Service 边界。

因此 JamScript 可以在编译阶段保持网络无关，同时仍然部署到 MiniJAM。

规范实现说明请参阅 [MiniJAM execution boundary](https://github.com/ArcheLabs/minijam-client/blob/main/docs/execution-boundary.md)。
