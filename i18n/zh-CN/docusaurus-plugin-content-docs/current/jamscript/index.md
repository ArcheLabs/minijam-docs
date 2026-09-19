---
title: JamScript 概览
description: 使用 JamScript 0.2 工具链构建确定性的 JAM Service。
slug: /jamscript
---

# JamScript

JamScript 是用于构建确定性 JAM Service 的 TypeScript 风格语言和工具链。
你在 `service.ts` 中描述 action、有界数据和托管状态，`jams` 会把项目编译为
PolkaVM/JAM 产物。

```text
service.ts → 类型元数据 + ScriptC M2 → 生成的 runtime → JamV1 PVM/blob
```

最重要的一点是：Service 可以被重复执行并得到同样的结果。结果只依赖签名
action、锚定的托管状态和代码。Service 内没有浏览器、Node.js、文件系统、网络、
时钟或随机数 API。

## 从哪里开始

| 你的目标 | 从这里开始 |
|---|---|
| 构建第一个 Service | [快速开始](./getting-started/quickstart.md) |
| 逐行理解示例 | [第一个 Service](./getting-started/first-service.md) |
| 安装 CLI 和工具链 | [安装](./getting-started/installation.md) |
| 设计 action 和状态数据 | [类型与数据](./language/types-and-data.md) |
| 理解持久化 | [状态](./language/state.md) |
| 排查构建错误 | [支持的 JavaScript](./language/supported-javascript.md) 与 [项目配置](./tooling/configuration.md) |

## 一个够用的心智模型

- **action** 是用户或 client 调用的入口，声明认证方式和输入 schema。
- **state map** 是由 Service 拥有、经过认证的持久化存储。读写通过生成的
  state binding 完成。
- **query** 描述 client 如何在 finalized state root 上读取一个状态值。它不
  是额外的 PVM 入口。
- **Refine** 在锚定的状态视图上验证并执行 action；**Accumulate** 接受结果
  transition 并提交新的 state root，不会再次运行应用代码。

:::warning 当前预览边界

目前唯一支持的源码路径是语言 `0.2` + ScriptC M2 backend，JamScript 整体仍未
稳定。公开 ABI descriptor 比当前 M2 实际可执行的 codec 子集更宽；[类型与数据](./language/types-and-data.md)
会明确说明两者的区别。

:::

[MiniJAM 开发者指南](/docs/minijam/developers/quickstart)介绍下游网络和部署流程。
编译 JamScript Service 不需要 MiniJAM checkout。
