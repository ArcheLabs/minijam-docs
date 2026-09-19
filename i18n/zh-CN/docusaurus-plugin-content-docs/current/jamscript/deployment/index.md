---
title: 部署
description: 将已验证的 JamScript Service artifact 显式部署到目标网络。
---

# 部署

JamScript 将**构建**与**部署**分离。

Canonical build 生成与网络无关的 Service artifact。Deployment 是之后的 control-plane 操作：选择目标网络、验证 artifact 与网络身份，然后创建 Service。

## 命名网络

Deployment target 应放在项目/网络配置中，而不是写进 Service 源码。

网络配置可以描述：

- network kind；
- deployment RPC；
- 可选 node RPC；
- 可选固定 genesis hash。

部署前可以用 CLI 查看配置：

~~~bash
jams network list
jams network show local
~~~

Release-specific endpoint 应来自匹配的 MiniJAM/JamScript 部署 artifact，而不是从通用教程里复制固定端口。

## 部署

完成构建后：

~~~bash
jams deploy ./my-service --network local --artifact ./my-service/dist
~~~

CLI 会在提交创建请求前验证 artifact metadata/checksum。成功部署后，会在本地记录所选择网络、Service identity、artifact identity、finalized context 与 operation metadata，同时不会持久化 RPC credential。

## 失败语义

Deployment 是 mutation。请求提交后的网络超时可能意味着网络已经接受操作，只是 Client 没收到结果。

因此 JamScript 不会对 outcome unknown 的部署进行盲目重试。

## 当前网络支持

当前 release line 支持 MiniJAM Stage-1 作为 deployment target；JAM 在配置模型中仍属于未来保留目标。

精确契约请参阅 [JamScript Deployment v0.1](https://github.com/ArcheLabs/JamScript/blob/main/docs/deployment.md)。
