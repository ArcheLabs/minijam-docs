---
id: quickstart
title: 开发者概览
description: 当前 MiniJAM 服务开发流程及其稳定性边界。
slug: /minijam/developers/quickstart
---

# 开发者概览

:::warning 草稿

端到端服务 SDK 流程目前尚未对外稳定发布。下面的命令是仓库当前的开发路径，可能需要固定工具链和私有 Jambda revision。

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

当前开发基线包含具体的编译输出和 artifact 格式。服务执行应保持确定性，并且只使用目标运行时支持的 HostCall。
