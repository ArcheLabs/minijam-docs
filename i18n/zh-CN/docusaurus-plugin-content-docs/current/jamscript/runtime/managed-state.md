---
title: 托管状态
description: 经过认证的应用状态、规范 root、proof 与 Backend materialization 边界。
---

# 托管状态

JamScript Managed State 为每个 Service 提供一棵经过认证的应用状态树。

最重要的区分是**规范性**与**可用性**：

~~~text
finalized Service state
        │
        │ commitment 规范 managed-state root
        v
managed-state root
        │
        ├──── Backend materialized state
        └──── proof / historical snapshot
~~~

Backend 可以 materialize 并保留状态，让应用高效查询；但本地 head 并不会因为存在就自动成为规范状态。

## 规范 root

规范 managed-state head 是 Service finalized native state 中保存的 commitment。Backend 在提供规范状态前，必须比较 durable/materialized head 与该 commitment。

如果规范 root 尚未 materialize，正确行为是失败，而不是返回旧值。

## Refine

Refine 消费经过认证的 state witness，并在应用执行读取数据前，针对声明的 root 本地验证 proof。

应用代码应该使用 typed state access，而不是手工构造 proof object。

## Accumulate

Accumulate 是规范性 gate。推进 transition 前，它会确认 parent state root 与所有已承诺的外部 Service root 仍然是当前值。

因此，针对旧状态完成 Refine 的 transition 不能被当作当前状态直接提交。

## Client 查询

Frontend/Client 可以使用两种模式：

- **trusted backend** — Backend 先确认本地 head 与 finalized canonical root 一致，再返回简单 value；
- **proof verification** — 返回 value + storage proof，并在 Client 侧针对 canonical root 独立验证。

前端选择便利查询，并不会让 consensus 与 Refine/Accumulate 执行路径变成 proofless。

实现契约请参阅 [Managed State V1](https://github.com/ArcheLabs/JamScript/blob/main/docs/managed-state.md) 与 [Service Backend V1](https://github.com/ArcheLabs/JamScript/blob/main/docs/service-backend-v1.md)。
