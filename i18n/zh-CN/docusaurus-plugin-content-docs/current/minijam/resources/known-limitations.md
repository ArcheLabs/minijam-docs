---
id: known-limitations
title: 已知限制
slug: /minijam/resources/known-limitations
---

# 已知限制

MiniJAM 是实验性项目。第一阶段未实现完整的 JAM availability、guarantor、auditor、judgment、adjudication、Coretime 市场和经济机制。依赖接口前请检查当前 release 文档和部署配置。

## 源码构建边界

完整 MiniJAM Stack 当前无法仅使用公开仓库独立构建，因为执行路径依赖固定的私有 Jambda revision。当前支持的部署产物是使用 digest 固定镜像的 Docker release。

这一限制针对完整 Node、Runtime、Worker 和执行 Stack 的构建，不应被描述为 JAM HostCall 模型的限制。
