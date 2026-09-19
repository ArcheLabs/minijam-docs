---
title: JamScript 快速开始
description: 创建、检查、构建并准备部署 JamScript Service。
---

# JamScript 快速开始

本教程创建一个小型 counter Service，检查 ABI，构建 PVM artifact，并校验 bundle。示例有意使用所选择 release line 中更保守、可执行的类型子集。

## 1. 安装 CLI

对于公开 release，请安装 **jams** CLI 与其 managed toolchain。参阅[安装](./installation.md)。

## 2. 创建项目

~~~bash
jams new hello-jam
jams check hello-jam
jams abi hello-jam
~~~

项目包含 manifest、Service 源码与持久化 Service identity 文件。请把 identity 与项目一起保存；重新生成它意味着创建另一个逻辑 Service identity。

## 3. 添加 Counter Service

~~~ts
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
~~~

再次检查：

~~~bash
jams check hello-jam
jams abi hello-jam
~~~

## 4. 构建与验证

根据所选择 release/project policy 配置管理控制者，然后构建：

~~~bash
jams build hello-jam --output hello-jam/dist --offline
jams inspect hello-jam/dist
jams run hello-jam/dist/service.pvm
~~~

**run** 是确定性的本地 PVM validation aid，不是网络部署命令。

## 5. 显式部署

部署是独立步骤。配置命名 MiniJAM 网络，先检查网络，再部署已经构建好的 artifact：

~~~bash
jams network list
jams network show local
jams deploy hello-jam --network local --artifact hello-jam/dist
~~~

不要盲目复制通用教程中的 RPC 端口；应使用匹配 Stage-1/release 环境提供的 endpoint 与 genesis identity。

接着阅读[部署](../deployment/index.md)，并通过 [Backend](../backend/index.md) 与 [Client](../client/index.md)连接应用。

:::info Stage-0 Playground

历史浏览器 Playground 已不再是默认 JamScript/MiniJAM 开发路径，相关资料保留在 MiniJAM Legacy 文档中。

:::
