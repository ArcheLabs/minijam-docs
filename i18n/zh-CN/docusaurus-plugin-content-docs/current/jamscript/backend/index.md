---
title: JamScript Backend
description: 面向已部署 JamScript Service 的应用状态、Work 与网络 bridge。
---

# JamScript Backend

JamScript Backend 是 typed Client 与 JAM-compatible network 之间的应用入口。

它**不是** JAM/MiniJAM 共识的一部分，也**不是** Formal RPC。

~~~text
frontend / @jamscript/client
          │
          v
   JamScript Backend
      │        │
      │        └── materialized managed state
      │
      ├── Node / finalized Service state
      └── Formal RPC / Work path
~~~

## 规范性规则

对于已部署 Service，规范 managed-state head 是 finalized Service state 所 commitment 的 root。

Backend 本地数据库与 trie 属于 availability/proof/execution materialization。在提供规范状态前，Backend 必须确认 durable head 与链选择的 commitment 一致。

因此 Backend 不能通过“返回旧状态”让旧状态变成规范状态。

## 一个 endpoint 不代表一个信任边界

Frontend 便利查询可以默认使用 trusted-backend mode。

但 Refine 仍会验证认证 state witness，Accumulate 仍会在提交 transition 前重新验证 canonical root。Client 也可以请求 proof-backed state query 进行独立验证。

## 多 Service

一个 Backend 进程可以服务多个 Service，但 mutable state 与 pending Work 必须按 Service 隔离。Service identity、code identity、state root 和 package/work key 不能跨 Service 混用。

## 运维

Release Backend 使用持久化存储，并提供 liveness/readiness endpoint。应把 data directory 视为 durable service state，不要把正在运行的数据库目录直接复制成“安全备份”。

精确实现契约与 RPC 名称请参阅 [JamScript Service Backend V1](https://github.com/ArcheLabs/JamScript/blob/main/docs/service-backend-v1.md)。
