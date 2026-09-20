---
title: JamScript 快速开始
description: 安装 JamScript、创建 Service、完成构建并部署到 MiniJAM。
---

# JamScript 快速开始

本教程会安装 JamScript、创建一个小型 Service、构建 PVM artifact，并部署到已配置
的 MiniJAM 网络。

## 1. 安装 JamScript

```bash
curl -fsSL https://install.minijam.xyz/jamscript | bash
```

验证托管工具链：

```bash
jams --version
jams toolchain verify
```

installer 同时会安装匹配的原生 JamScript Backend。版本固定与平台说明请查看
[安装](./installation.md)。

## 2. 创建项目

```bash
jams new hello-jam
jams check hello-jam
jams abi hello-jam
```

项目包含 manifest、Service 源码和持久化 Service identity。请把 identity 与项目
一起保存；重新生成它会创建新的逻辑 Service identity。

## 3. 添加 Counter Service

```ts
import { action, wallet, stateMap, query, address, u32 } from "jam";

const counters = stateMap({
  schema: "counter/v1",
  key: address,
  value: u32,
});

export const increment = action({
  auth: wallet(),
  input: { amount: u32 },
  execute(ctx, input) {
    const current = counters.get(ctx.sender);
    counters.set(
      ctx.sender,
      current === null ? input.amount : current + input.amount,
    );
  },
});

export const getCounter = query(counters);
```

再次检查：

```bash
jams check hello-jam
jams abi hello-jam
```

## 4. 构建与检查

```bash
jams build hello-jam --output hello-jam/dist
jams inspect hello-jam/dist
jams run hello-jam/dist/service.pvm
```

`jams run` 是确定性的本地 PVM 验证工具，不是网络部署命令。

托管工具链安装完成后，如果希望禁止任何工具链下载，可为 `jams build` 加上
`--offline`。

## 5. 配置 MiniJAM

在项目中配置命名 MiniJAM 网络。本地运行已发布网络请参阅
[使用 Docker 运行本地 MiniJAM](../../minijam/developers/local-docker.md)。

检查目标网络：

```bash
jams network list hello-jam
jams network show local hello-jam
```

请使用匹配 MiniJAM release 提供的 endpoint 与 genesis identity，不要复制旧教程
中的无关 RPC 参数。

## 6. 启动 Backend

在另一个终端中：

```bash
cd hello-jam
jams backend start --network local
```

CLI 会自动使用 installer 安装的匹配 Backend。

## 7. 部署

```bash
jams deploy hello-jam --network local --artifact hello-jam/dist
```

构建与部署是两个独立操作。构建 bundle 本身与网络无关；部署时才显式选择目标网络。

接着阅读[部署](../deployment/index.md)、[Backend](../backend/index.md)和
[Client](../client/index.md)。

:::info Stage-0 Playground

历史浏览器 Playground 已不再是默认 JamScript/MiniJAM 开发路径，相关资料保留在
Legacy 文档中。

:::
