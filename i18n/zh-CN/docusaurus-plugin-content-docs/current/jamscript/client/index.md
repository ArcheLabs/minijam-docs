---
title: JamScript Client
description: 使用 typed application API 访问 JamScript action 与托管状态。
---

# JamScript Client

JamScript Client 是已部署 Service 面向应用的接口。

它的目标是在正常应用 API 之下隐藏网络拓扑、proof plumbing 与二进制编码，同时保留显式验证选择。

## 状态查询

默认应用路径会向 Backend 请求 value；Backend 首先确认其 materialized head 与 finalized canonical root 一致。

需要独立验证的应用可以选择 proof verification，让 Client 获取 value + storage proof，并针对 canonical root 本地验证。

这个选择影响的是前端信任和便利性，并不会改变共识执行规则。

## Action 与 Ownership

Client 构造 action 时遵循 Service ABI 与所选择的 Ownership/认证方式。Ownership 标识密码学控制者；具体 action envelope 仍需携带所选协议要求的 authorization data。

## 网络拓扑

Frontend 通常只需要知道 JamScript Backend URL，而不需要知道每一个 Node、Worker 或 Formal RPC endpoint。

这样可以替换基础设施拓扑，而无需让它成为应用状态或源码的一部分。

精确 Client API 应以所选择的 JamScript release 及其生成 ABI/client package 为准。
