---
id: run-a-worker
title: 运行 Worker
description: 配置并验证 MiniJAM Stage 0 Worker。
slug: /minijam/operators/run-a-worker
---

# 运行 Worker

Worker 需要注册的 Worker ID、匹配的签名身份、Node RPC、bundle gateway 和可写数据目录。Stage 0 运行三个使用不同密钥的 Worker。

## 配置

容器部署请复制 [Worker 配置示例](https://github.com/ArcheLabs/minijam-client/blob/main/deploy/worker/worker.example.toml)，设置最终 genesis hash 和 Worker 身份，并将签名 seed 以只读 secret 挂载：

```text
MINIJAM_WORKER_SEED_FILE=/run/secrets/worker-seed
```

每个 Worker 都需要独立的注册 ID、签名密钥、交易账户、nonce 流和可写 `/data` volume。不要将签名 seed 放入镜像或提交的配置中。

## 验证就绪

Worker 健康端点为：

```text
GET /health/live
GET /health/ready
```

就绪状态要求签名身份已加载、Node genesis 匹配且 bundle gateway 可访问。就绪后提交 Work，并确认被分配的 Worker 可以获取输入、独立重新执行 Refine 以及发布 Support 或 Oppose。
