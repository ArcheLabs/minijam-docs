---
title: 所有权抽象
description: 与单一链账户格式解耦的密码学控制身份。
---

# 所有权抽象

JamScript 将 **ownership** 与某一种区块链账户模型分离。

Ownership 是应用边界使用的规范密码学公开控制标识。它本身不是用户名、账户余额、交易、社交身份或授权证明。

## 为什么需要它

传统区块链应用经常把下面几件事紧耦合：

~~~text
chain
  = account format
  = signature scheme
  = user identity
~~~

JamScript 让应用面向一个规范 Ownership 原语，而由 adapter 把外部密码学表示解析为该原语。

这样 Polkadot、EVM、其他签名系统以及未来密码学都可以进入应用，而无需把每个应用状态 schema 固定在一种钱包格式上。

## Adapter 不等于新的 Ownership 类型

Polkadot、EVM、Matrix 等集成都属于围绕 Ownership 原语的 adapter。

Adapter 必须明确外部表示如何解析，以及需要什么验证或信任。一个社交用户名不会仅仅因为存在 adapter，就自动变成可在链上密码学验证的身份。

对于外部平台无法提供通用可验证用户公钥的情况，mapping/claim 层尤其必须明确自身的信任假设。

## Ownership 与授权不同

Ownership 标识公开密码学控制者；具体 action 仍然需要 authorization proof、nonce/replay 处理、domain separation 与应用策略。

不能把单独的 Ownership 值当成一个已经签名的 action。

当前原语编码与 adapter 契约请参阅 [Ownership Abstraction v1](https://github.com/ArcheLabs/JamScript/blob/main/docs/ownership-abstraction-v1.md)。
