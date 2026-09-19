---
title: 使用 Docker 在本地运行 MiniJAM
description: 使用不可变 release image 启动当前支持的 MiniJAM Stage-1 本地网络。
---

# 使用 Docker 在本地运行 MiniJAM

Stage-1 本地开发使用已发布的 MiniJAM aggregate image，不需要在本地编译 Rust，也不要求 Docker Compose。

## 要求

- Docker Engine 或 Docker Desktop
- 来自匹配 release 的不可变 MiniJAM aggregate image digest

## 启动网络

~~~bash
docker run --rm \
  -p 9944:9944 -p 8080:8080 \
  ghcr.io/archelabs/minijam@sha256:<digest> --dev
~~~

Aggregate image 包含本地 launcher，以及 Stage-1 Node、一个 Worker 和 Formal RPC。

Image digest 是可复现部署身份的一部分。在可复现性或 release 检查中，不要用会移动的未固定 tag 替代 digest。

## Stage-1 角色

- **Node：** 链、Runtime、最终性与安全 Node RPC。
- **Worker：** 使用独立签名身份执行链下 Refine。
- **Formal RPC：** 应用中立的 Work ingress 与 Bundle gateway。

可选 Service compiler 不属于 Stage-1 runtime network。JamScript 维护自己的 compiler/toolchain 分发。

公开或多主机部署请以规范 [Stage-1 Docker deployment guide](https://github.com/ArcheLabs/minijam-client/blob/main/docs/docker-deployment.md) 为准。
