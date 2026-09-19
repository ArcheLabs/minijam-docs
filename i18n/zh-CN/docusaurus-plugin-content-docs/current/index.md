---
id: index
title: 文档
slug: /
sidebar_position: 1
---

# MiniJAM 文档

MiniJAM 是网络与执行环境；JamScript 是用于构建确定性 JAM Service 的应用开发栈；MINI 则是连接参与者、激励和长期网络发展的生态与经济层。

这三个层次彼此关联，但并不属于同一个协议边界。

## 从这里开始

### [使用 JamScript 构建应用](./jamscript/index.md)

当你需要编写 Service、定义 action 和托管状态、构建 PVM 产物、部署 Service、连接前端或使用所有权抽象时，从 JamScript 开始。

### [理解或运行 MiniJAM](./minijam/index.md)

当你需要了解 Stage-1 网络、MiniJamSpec、Worker、Formal RPC、执行边界或本地/网络部署时，阅读 MiniJAM 文档。

### [理解 MINI 生态](./ecosystem/index.md)

MINI 仍然是项目的一等组成部分。这里记录生态激励、代币经济、项目市场、公共物品以及未来治理机制。经济机制可以继续演化，而无需把它们误认为 MiniJAM 共识规则或 JamScript 应用 ABI。

## 默认应用路径

~~~text
JamScript 源码
    ↓
jams build
    ↓
Service 产物
    ↓
MiniJAM Stage-1
    ↓
JamScript backend / client
    ↓
应用
~~~

请阅读[架构总览](./architecture.md)了解完整关系。

历史 Stage-0 Playground 已不再是默认开发路径，但仍保留在 [Stage-0 归档](./archive/stage-0-playground.md) 中。

## 真相源

本站负责解释、教程与跨组件导航。协议事实由实现仓库维护：

- MiniJAM 网络/执行：[ArcheLabs/minijam-client](https://github.com/ArcheLabs/minijam-client)
- JamScript 语言/Runtime/Backend：[ArcheLabs/JamScript](https://github.com/ArcheLabs/JamScript)

在固定协议或 ABI 版本前，请阅读[兼容性与真相源](./reference/compatibility.md)。
