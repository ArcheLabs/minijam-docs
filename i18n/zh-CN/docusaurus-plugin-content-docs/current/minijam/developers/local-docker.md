---
title: 使用 Docker 在本地运行 MiniJAM
description: 启动公开、基于镜像的 MiniJAM 本地开发网络。
---

# 使用 Docker 在本地运行 MiniJAM

MiniJAM 提供了一个基于预构建 Docker 镜像的本地开发网络。你不需要编译 MiniJAM、Jambda 或任何 Rust、Node.js 项目。

## 环境要求

运行本地网络需要：

* Docker Engine 或 Docker Desktop
* Docker Compose v2
* Bash、`tar` 和 `sha256sum`

在 Windows 上，建议通过启用了 Docker Desktop 集成的 WSL2 运行以下命令。

## 下载并启动

从 MiniJAM GitHub Release 下载以下两个文件：

```text
minijam-local-<tag>.tar.gz
minijam-local-<tag>.tar.gz.sha256
```

确保两个文件位于同一目录，然后执行：

```bash
sha256sum -c minijam-local-<tag>.tar.gz.sha256
tar -xzf minijam-local-<tag>.tar.gz
cd minijam-local-<tag>
./minijam-local up
```

启动脚本会：

1. 检查 Docker 和 Docker Compose；
2. 验证所有镜像均固定到不可变的 SHA-256 digest；
3. 拉取所需镜像；
4. 启动 MiniJAM Node、Compiler、Playground、三个 Worker 和 Web 前端；
5. 等待所有服务进入健康状态。

启动完成后，打开：

* Playground：http://127.0.0.1:4173
* Node RPC：http://127.0.0.1:9944

你可以使用 Playground 提供的 Web UI 或者通过 Node RPC 进行交互。