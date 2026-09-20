---
title: JamScript Backend
description: 面向已部署 JamScript Service 的应用状态、Work 与网络 bridge。
---

# JamScript Backend

JamScript Backend 是 typed Client 与 JAM-compatible network 之间的应用入口。

它**不是** JAM/MiniJAM 共识的一部分，也**不是** Formal RPC。

```text
frontend / @jamscript/client
          │
          v
   JamScript Backend
      │        │
      │        └── materialized managed state
      │
      ├── Node / finalized Service state
      └── Formal RPC / Work path
```

## 安装

正常 JamScript installer 会把匹配的原生 Backend 与 CLI、托管工具链一起安装：

```bash
curl -fsSL https://install.minijam.xyz/jamscript | bash
```

项目和网络配置完成后：

```bash
jams backend start --network local
```

Backend 会以前台进程运行。仍可通过 `PATH` 或
`JAMSCRIPT_BACKEND_BIN` 选择自定义安装的 Backend。

## 规范性规则

对于已部署 Service，canonical managed-state head 由 finalized Service state 选择。

Backend 数据库和 trie 是用于应用访问与执行的本地 materialization，不会取代
finalized chain state 成为规范性来源。

## 多 Service

一个 Backend 进程可以服务多个 Service，但 mutable state、registry record 和
pending Work 都保持 Service-scoped。

当前 registry 还维护唯一的 `serviceKey -> serviceId` 映射。如果同一个 Backend
数据库中某个 `serviceKey` 已经绑定 Service ID，再使用相同 `serviceKey`
注册另一个不同 Service ID 会被拒绝。独立 Service 应使用独立的 Service identity。

因此复用持久化 Backend 数据目录时要特别注意：删除或切换数据目录会得到一个新的
Backend registry，这并不等于迁移了旧目录中的注册记录。

## 持久化数据

Release Backend 使用持久化存储。应把配置的数据目录视为 durable backend state。

不要把正在运行的数据库目录直接复制成“安全备份”，也不要在正式环境中通过更换数据
目录来绕过 registry 冲突。对于明确需要全新 registry 的本地测试，使用新的数据目录
是合理的。

## 信任边界

Frontend 便利查询可以直接使用 Backend。Backend 是应用服务，不是共识本身。
如果应用需要更强的独立验证，应使用匹配 JamScript Client/release 提供的
proof/verification 路径。

精确实现契约与 RPC 名称请参阅
[JamScript Service Backend V1](https://github.com/ArcheLabs/JamScript/blob/main/docs/service-backend-v1.md)。
