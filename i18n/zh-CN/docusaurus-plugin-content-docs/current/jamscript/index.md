---
title: JamScript 概览
description: 使用接近 TypeScript 的开发体验构建 JAM Service。
slug: /jamscript
---

# JamScript

JamScript 是用于构建 JAM Service 的 TypeScript-like 语言与工具链。它把 JAM/PVM
底层细节封装在确定性的构建流程、typed application interface、managed state、
Ownership、部署流程和 `jams` CLI 之后。

## 安装

```bash
curl -fsSL https://install.minijam.xyz/jamscript | bash
```

installer 会自动选择最新发布的 JamScript 版本，并安装：

- `jams` CLI；
- 托管 compiler/toolchain；
- 匹配的原生 JamScript Backend。

当前原生 release 支持 Linux x86_64 和 macOS Apple Silicon。版本固定与手动安装请
参阅[安装](./getting-started/installation.md)。

```text
service.ts
   ↓
JamScript compiler / managed toolchain
   ↓
service.pvm + service.blob + ABI
   ↓
显式部署
   ↓
MiniJAM
   ↓
JamScript Backend
   ↓
typed client / frontend
```

## Language 与 Toolchain

应用开发者通过 JamScript 描述 action、有界数据、query、认证与状态。Canonical
release build 使用托管工具链，因此应用项目不需要自行维护 Rust、LLVM、Node 或
MiniJAM 源码 checkout。

从[快速开始](./getting-started/quickstart.md)入门。

## Managed State

JamScript 为 Service 提供 typed managed state，并把应用执行连接到网络最终选择的
finalized Service state。

请阅读[托管状态](./runtime/managed-state.md)。

## Ownership

Ownership 是与单一链账户格式解耦的密码学控制原语。不同生态可以通过兼容的
Ownership/controller adapter 接入，而无需重新定义 JAM 共识账户模型。

请阅读[所有权抽象](./ownership/index.md)。

## Deployment

构建与部署是独立操作。先构建 Service artifact，之后部署时再显式选择已配置网络。

请阅读[部署](./deployment/index.md)。

## Backend 与 Client

JamScript Backend 是面向应用的网络 bridge。它不是共识，也不是 Formal RPC。
Typed Client 通过 Backend 完成应用提交与状态访问。

请阅读 [Backend](./backend/index.md) 与 [Client](./client/index.md)。

## Preview 边界

JamScript v0.1 当前仍是 RC/testnet developer preview。需要可复现性时应固定精确
release，并把 `build.json`、Service ABI 与 Service identity 和部署 artifact
一起保存。

请阅读[兼容性](./reference/compatibility.md)与[稳定性策略](./reference/stability.md)。
