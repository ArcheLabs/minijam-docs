---
id: current-status
title: 当前状态
description: MiniJAM Stage 0 环境的权威状态摘要。
slug: /minijam/introduction/current-status
sidebar_position: 2
---

# 当前状态

MiniJAM 是一条独立的 Polkadot SDK 链，以经过精简的协议面实现 JAM 的核心服务执行路径。本页是当前 Stage 0 环境的权威状态摘要；实现、部署或发布基线变化时必须同步更新。

## Stage 0 概览

| 项目 | 当前值 |
| --- | --- |
| 当前阶段 | Stage 0 |
| 网络类型 | 可重置测试环境 |
| 是否生产就绪 | 否 |
| 是否具有真实经济价值 | 否 |
| 是否启用 Sudo | 是 |
| 高可用 | 否 |
| 协议版本 | `PROTOCOL_VERSION_V1` |
| JamCore 接口 | `1` |
| Gray Paper 基线 | `0.7.2` |

Stage 0 包含一个 Node、Compiler API、Playground API、三个独立 Worker 和 Playground Web。它是有意可重置、非高可用的测试基础设施，默认不公开 Node RPC 和内部服务端口。

## 组件状态

| 组件 | 状态 |
| --- | --- |
| Node | Available |
| Runtime | Available |
| Compiler API | Available |
| Playground API | Available |
| Playground Web | Available |
| Candidate Worker | Available |
| Independent Validator Workers | Available |
| Docker Stage 0 部署 | Available |
| 生产网络 | Not available |
| 完整 JAM availability | Not implemented |
| JAM disputes and judgments | Not implemented |
| 外部用户从公开源码构建完整 Stack | 不可用 |
| 使用 digest 固定镜像的 Docker release 部署 | 支持 |
| 托管的公共 Playground | 部署后补充地址 |
| 从镜像运行本地开发网络 | 支持 |
| 托管 Stage 0 | 仅由维护者运营 |
| 自托管官方 Stage 0 genesis | 仅维护者 |

## 运行和来源

- [MiniJAM Client 仓库](https://github.com/ArcheLabs/minijam-client)
- [Stage 0 部署说明](https://github.com/ArcheLabs/minijam-client/blob/main/deploy/stage0/README.md)
- [发布流程和 manifest 说明](https://github.com/ArcheLabs/minijam-client/blob/main/deploy/stage0/RELEASING.md)
- [Stage 0 故障排查](https://github.com/ArcheLabs/minijam-client/blob/main/deploy/stage0/TROUBLESHOOTING.md)
- [当前 release tags](https://github.com/ArcheLabs/minijam-client/tags)
- [JAM Gray Paper](https://graypaper.com/)
- [Bulletin-compatible 实现](https://github.com/ArcheLabs/minijam-client/tree/main/crates/minijam-bulletin-simulator)

Docker 部署全部健康后，Playground 默认可通过 `http://127.0.0.1:4173` 访问。公共托管 Playground 地址、release manifest 和状态页应在部署后单独列出。最近文档核验日期：2026-08-01。

:::note Maintainer note

仓库可能保留供 maintainer 和开发使用的 Native 部署材料，但它们不是外部用户部署路径，也不是运行完整 Stack 的支持方式。

:::

## 已知问题和边界

仓库的完整 Runtime 和 Node 构建可能需要私有 Jambda revision 及其当前编译器修复。Stage 0 未实现 JAM assurance、完整 availability、全局 disputes、judgments 或生产级持久性。经济参数和管理权限仍属于开发配置。

第一阶段文档覆盖服务执行流程、本地 Worker、SDK 和 Playground。尚未实现或测试的协议细节不会被描述为稳定保证。
