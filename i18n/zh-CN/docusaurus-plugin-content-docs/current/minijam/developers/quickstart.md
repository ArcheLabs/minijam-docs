---
id: quickstart
title: 开发者概览
description: 当前 MiniJAM Stage-1 应用开发路径。
slug: /minijam/developers/quickstart
---

# 在 MiniJAM 上开发

当前默认应用开发路径已经变为 **JamScript + MiniJAM Stage-1**。

旧的浏览器 Playground 与 C/C++ 教程属于 Stage-0，仅作为历史资料保留。

## 1. 从 JamScript 开始

按照 [JamScript 快速开始](../../jamscript/getting-started/quickstart.md)安装 JamScript 并构建 Service。

~~~text
service.ts
   ↓
jams build
   ↓
已验证的 Service 产物
   ↓
jams deploy
   ↓
MiniJAM Stage-1
   ↓
backend / client / frontend
~~~

JamScript 构建与具体网络解耦。仅仅为了编译 Service，不需要 checkout MiniJAM。

## 2. 运行本地 Stage-1 网络

需要做本地集成时，按照[使用 Docker 运行 MiniJAM](./local-docker.md)启动已发布的 MiniJAM aggregate image。

## 3. 配置部署

JamScript 部署是显式操作，并使用命名网络配置。Deployment endpoint、Node endpoint 与可选 genesis 绑定属于部署配置，而不应写进 Service 源码。

请阅读 [JamScript 部署](../../jamscript/deployment/index.md)。

## 4. 使用应用路径

部署后，通过 JamScript client/backend 路径发送 action/Work，等待最终确认，并通过 Backend 读取托管状态。需要独立验证的 Client 可以启用 proof verification。

## 需要旧 Playground？

Stage-0 浏览器流程保留在 [Stage-0 Playground 归档](../../archive/stage-0-playground.md)，但已经不是推荐架构或开发流程。
