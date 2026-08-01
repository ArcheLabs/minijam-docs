---
id: local-environment
title: 本地环境
description: 在本地启动可重置的 MiniJAM Stage 0 Native 环境。
slug: /minijam/operators/local-environment
---

# 本地环境

仓库提供可重置的 Stage 0 Native 全栈，包含 MiniJAM Node、Compiler API、Playground API、三个独立 Worker 和 Playground Web。它用于本地开发和人工测试，不是生产或公共服务器部署方式。

## 启动 Native 全栈

```bash
git clone git@github.com:ArcheLabs/minijam-client.git
cd minijam-client

./scripts/stage0-native.sh deps
./scripts/stage0-native.sh build
./scripts/stage0-native.sh up
```

启动器报告全栈就绪后，打开 [http://127.0.0.1:4173](http://127.0.0.1:4173)。

## 管理全栈

```bash
./scripts/stage0-native.sh logs
./scripts/stage0-native.sh down
./scripts/stage0-native.sh reset
```

`reset` 会删除本地 Stage 0 状态。Digest-pinned Compose 发布方式请参阅 [Stage 0 部署说明](https://github.com/ArcheLabs/minijam-client/blob/main/deploy/stage0/README.md)。本地密钥和配置必须保留在未提交文件中。
