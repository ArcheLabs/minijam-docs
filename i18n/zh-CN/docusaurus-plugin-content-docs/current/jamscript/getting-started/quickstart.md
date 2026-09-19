---
title: JamScript 快速开始
description: 创建、检查并构建 JamScript 0.2 Service。
---

# JamScript 快速开始

本教程创建一个小型 counter Service，检查它的 ABI，构建 JamV1 PVM 产物，并
校验生成的 bundle。示例使用 `u32`，因为它属于当前 ScriptC M2 可执行 codec
支持的边界类型。

## 1. 安装 CLI

如果使用已发布版本，使用 `jams` binary 并运行一次 `jams toolchain install`。
如果从仓库 checkout 开始，请先完成[开发者安装](./installation.md#仓库-checkout开发者模式)，
下面使用 `./target/debug/jams`。

```bash
cd JamScript
export JAMSCRIPT_DEV_TOOLCHAIN=1
```

## 2. 创建项目

```bash
./target/debug/jams new hello-jam
./target/debug/jams check hello-jam
./target/debug/jams abi hello-jam
```

`new` 会创建：

```text
hello-jam/
├── jamscript.toml
├── src/service.ts
└── .jamscript/service.json
```

identity 文件包含自动生成的 `serviceKey` 和 `instanceId`。请和项目一起保管；
更换它就相当于创建了另一个 Service identity。

## 3. 使用当前可构建的 Service

将 `hello-jam/src/service.ts` 替换为：

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

action 修改托管状态，而不是返回值。当前 M2 Service 路径中，ScriptC action
输出是 `unit`；Work finalized 后，client 通过 `getCounter` 读取 counter。

再次检查项目：

```bash
./target/debug/jams check hello-jam
./target/debug/jams abi hello-jam
```

## 4. 构建 Service

默认的 `deployer` management mode 需要 32-byte wallet public key。这里应该填写
拥有管理权限的 account，不是 Service key：

```bash
export JAMSCRIPT_DEPLOYER_ACCOUNT=0xYOUR_64_HEX_CHARACTER_PUBLIC_KEY
./target/debug/jams build hello-jam --output hello-jam/dist
```

使用已发布 CLI 时，对应命令是：

```bash
jams build hello-jam --output hello-jam/dist --offline
```

构建输出包括可执行产物和 metadata：

```text
service.elf
service.polkavm
service.pvm
service.blob
service.abi.json
build.json
protocol-v0.json
builder.json
checksums.json
generated_service.rs
generated_builder_application.rs
```

检查 bundle，并使用本地 PVM validation aid：

```bash
./target/debug/jams inspect hello-jam/dist
./target/debug/jams run hello-jam/dist/service.pvm
```

`inspect` 会校验 bundle checksums；`run` 使用确定性的本地 interpreter 执行产物，
它不是网络部署命令。

:::info 部署是独立步骤

JamScript 负责生成 Service artifact。提交 Work、等待 finalized 以及查询 finalized
state 属于 MiniJAM/client 流程，见 [MiniJAM 开发者指南](/docs/minijam/developers/quickstart)。

:::
