---
id: quickstart
title: 开发者概览
description: 当前 MiniJAM 服务开发流程及其稳定性边界。
slug: /minijam/developers/quickstart
---

# 开发者概览

:::warning 当前无法从公开源码构建完整 Stack

完整的 MiniJAM Node、Runtime、Worker 和执行 Stack 当前依赖固定的私有 Jambda revision，外部用户无法仅使用公开仓库独立完成构建。

运行完整 Stage 0 Stack 时，请使用已经发布的 Docker release。开发和体验 Service 时，请使用 Playground 及其 Compiler API。

:::

目标流程是：

```text
创建 Service
→ 编译
→ 提交 Work
→ Refine
→ Work Report
→ Accumulate
```

## 仓库和示例

克隆 [MiniJAM Client 仓库](https://github.com/ArcheLabs/minijam-client)，查看 [Counter service](https://github.com/ArcheLabs/minijam-client/tree/main/examples/services/counter) 和 [Stage 0 SDK](https://github.com/ArcheLabs/minijam-client/tree/main/service-toolchain/sdk)。

SDK 支持无分配的单文件 C 和受限 C++ 服务，ABI 由 `service-toolchain/compiler/toolchain.lock` 固定。

## 构建已提交示例

在仓库根目录执行：

```bash
./scripts/check-service-sdk.sh
./scripts/build-counter-services.sh
./scripts/test-counter-services.sh
```

当前开发基线包含具体的编译输出和 artifact 格式。这些命令只验证 Service SDK 示例，不构建完整 MiniJAM Node、Runtime 或 Stage 0 Stack。Service HostCall 语义来自当前固定的 Jambda/JAM 执行实现。

如需运行完整环境，请继续阅读[使用 Docker 部署](../operators/docker-deployment.md)。
