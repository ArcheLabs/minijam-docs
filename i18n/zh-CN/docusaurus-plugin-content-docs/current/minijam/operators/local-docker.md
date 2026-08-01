---
title: 使用 Docker 在本地运行 MiniJAM
description: 启动公开、基于镜像的 MiniJAM 本地开发网络。
---

# 使用 Docker 在本地运行 MiniJAM

从 MiniJAM Release 下载 `minijam-local-<tag>.tar.gz` 及对应 `.sha256`，然后执行：

```bash
sha256sum -c minijam-local-<tag>.tar.gz.sha256
tar -xzf minijam-local-<tag>.tar.gz
cd minijam-local-<tag>
./minijam-local up
```

打开 [http://127.0.0.1:4173](http://127.0.0.1:4173)。只需要 Docker；不需要 Rust、Cargo、Node.js、Jambda 源码、keystore、Worker seed 或 Stage 0 凭据。

:::warning 仅用于本地开发
该网络使用公开的确定性开发密钥，没有真实价值资产，且与托管 Stage 0 使用不同 genesis。不得将端口暴露到公网，也不得在任何公共网络复用这些密钥。
:::

可使用 `./minijam-local status`、`logs`、`down`、`up` 和 `reset` 管理网络。包装脚本会验证 digest 固定的镜像并拒绝非 loopback 绑定。

官方 Stage 0 Compose 部署仅供 **Maintainer / Operator** 使用；其凭据绝不随镜像或 release bundle 分发。
