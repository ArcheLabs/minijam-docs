---
title: Stage-1 网络
description: 当前支持的 MiniJAM 部署线及其 Operator 角色。
---

# Stage-1 网络

Stage-1 是当前支持的 MiniJAM 部署线。

可复现部署单元由一组匹配的不可变 image digest 与对应链/网络配置组成。

## 角色

- **Node** — validator/runtime 进程与安全 JSON-RPC 接口。
- **Worker** — 使用独立签名 key 与状态执行 Refine。
- **Formal RPC** — 应用中立的 Work ingress 与 Bundle gateway。

本地开发时，MiniJAM aggregate image 通过一个 launcher 启动这些角色；公开或多主机部署则使用 MiniJAM Client 的 compact/split profile。

## 应用边界

应用工具无需管理网络生命周期。JamScript 可以独立构建 artifact，再部署到配置好的 MiniJAM target；其 Backend 可以在内部访问 Node/Formal RPC，而无需把网络拓扑暴露给应用代码。

Operator 细节请以规范 [Stage-1 Docker deployment guide](https://github.com/ArcheLabs/minijam-client/blob/main/docs/docker-deployment.md) 为准。
