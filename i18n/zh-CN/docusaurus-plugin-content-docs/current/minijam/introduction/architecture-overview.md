---
id: architecture-overview
title: 架构概览
slug: /minijam/introduction/architecture-overview
sidebar_position: 3
---

# 架构概览

Stage-1 将网络职责与应用层明确分离。

~~~text
应用 / JamScript
       │
       v
Formal RPC / deployment boundary
       │
       ├──────────────┐
       v              v
     Node           Worker
 Runtime / 状态     Refine 执行
       │              │
       └──── Work Report / 投票 ────┐
                                     v
                              Runtime / Jambda
                                 Accumulate
                                     │
                                     v
                                  规范状态
~~~

## Node 与 Runtime

Node 提供链、最终性、Runtime、安全 JSON-RPC 接口以及规范的协议协调状态。Runtime 集成 Jambda 执行组件，并应用网络状态转换规则。

## Worker

Worker 执行链下 Refine 路径，获取所需输入，并使用自己的签名身份提交协议结果。Worker 并发度是本地调度选择，不等于 MiniJamSpec 的 Core 数。

## Formal RPC

Formal RPC 是应用中立的 Work 与 Bundle gateway，负责 Work ingress 和 Bundle 相关职责。它不是 JamScript application backend，也不是应用规范状态的真相源。

## 应用层

JamScript 面向稳定的应用边界编译 Service，而不是把 MiniJamSpec 常量写入应用。托管应用状态通过 Service 的规范链上状态提交，Backend/Provider 则负责让这些状态便于查询和证明。

精确协议字段与版本号由实现仓库维护。请阅读[兼容性与真相源](../../reference/compatibility.md)。
