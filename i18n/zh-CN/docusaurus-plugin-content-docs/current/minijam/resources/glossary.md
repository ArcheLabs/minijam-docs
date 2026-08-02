---
id: glossary
title: 术语表
slug: /minijam/resources/glossary
---

# 术语表

本术语表以 Gray Paper `0.7.2` 为基线，解释 MiniJAM 文档和代码中常见的 JAM 概念。

标记为 **MiniJAM** 的术语属于 MiniJAM 当前实现，不是 Gray Paper 的原生协议术语。

:::info 术语边界

本页面向 Service 开发者和 MiniJAM 参与者，不是 Gray Paper 数学符号与协议常量的完整索引。

同一术语在 Gray Paper 和 MiniJAM 中可能具有不同的实现边界。具体行为应以对应版本的协议和实现为准。

:::

## 基础概念

### JAM

Join-Accumulate Machine，由 Gray Paper 定义的协议。

JAM 将可并行执行的 Refine 与修改全局状态的 Accumulate 结合起来，为 Service 提供通用计算和共享状态环境。

### Service

JAM 中具有独立身份、代码和状态的应用执行单元。

Service 通过 Service ID 标识，可以拥有代码 Preimage、持久化 Storage、余额和其他协议状态。其 Refine 逻辑处理工作输入，Accumulate 逻辑更新规范状态。

### Service ID

标识 Service 的无符号整数。

Work Item 使用 Service ID 指定执行哪个 Service，Service Storage 和 Preimage 也以 Service ID 作为命名空间的一部分。

### Service Account

JAM 全局状态中与某个 Service 对应的账户记录。

它包含该 Service 的代码、存储、余额、Gas 配置和其他协议信息。它不是普通用户钱包账户。

### State

由协议共同维护的规范状态。

其中包含 Service Account、Service Storage、Preimage、报告状态、Validator 信息以及其他协议数据。

### Validator

参与 JAM 共识、报告保障、数据可用性和审计等协议职责的节点身份。

MiniJAM 当前没有复现完整 JAM Validator 职责，而是使用宿主 Authority 和 Worker 承担不同部分的功能。

### Core

用于执行 Refine 工作的逻辑计算资源。

Core 表示协议分配的并行计算能力，不等同于某台机器上的物理 CPU 核心。

### Coretime

在特定时间范围内使用 Core 的权利。

正式 JAM 使用 Coretime 协调和分配并行计算资源。MiniJAM Stage 0 不实现完整 Coretime 市场，下一版本中实施。

## PVM 与执行

### PVM

Polkadot Virtual Machine。

JAM 使用的确定性、Gas 计量虚拟机。Service 代码、Refine、Accumulate 和授权逻辑都可以在 PVM 中运行。

### Guest Program

在 PVM 内运行的程序。

Guest Program 只能通过规定的 Host Call 与外部状态和宿主能力交互。

### Gas

对 PVM 执行资源的计量单位。

Work Item 分别声明 Refine Gas Limit 和 Accumulate Gas Limit。Gas 耗尽通常会产生 Out-of-Gas 错误。

### Gas Limit

一次 PVM 执行允许消耗的最大 Gas。

Refine 和 Accumulate 使用不同的 Gas Limit，以分别约束链下计算和规范状态转换。

### Host Call

PVM Guest 向宿主环境发出的受控请求。

Gray Paper `0.7.2` 定义的 Host Call 涵盖 Gas 查询、数据获取、Preimage 查询、历史查询、Storage 读写、Segment 导出、Service 管理、转账和嵌套 PVM 等能力。

Host Call 是受协议约束的执行接口。

### Refine Invocation

执行某个 Work Item 的 Service Refine 逻辑的一次 PVM 调用。

它处理 Payload、Extrinsic Data 和 Imported Segment，并在 Refinement Context 约束下执行允许的历史查询。

### Accumulate Invocation

执行某个 Service Accumulate 逻辑的一次 PVM 调用。

它接收一个或多个与该 Service 相关的 Accumulation Input，并可以修改该 Service 的规范状态。

### Is-Authorized

在执行 Work Package 前运行的授权判断。

它使用 Authorization Code、Authorization Token 和 Authorizer Config 判断该 Work Package 是否被允许执行。

## Work Package

### Work Package

提交给某个 Core 进行 Refine 的工作集合。

一个 Work Package 包含：

* Authorization Token；
* Authorization Code Host；
* Authorization Code Hash；
* Authorizer Config；
* Refinement Context；
* 一个或多个 Work Item。

### Work Item

Work Package 中针对某个 Service 的单项工作。

Work Item 通常包含：

* Service ID；
* Service Code Hash；
* Payload；
* Refine Gas Limit；
* Accumulate Gas Limit；
* Imported Segment；
* Extrinsic Data；
* Exported Segment 数量。

一个 Work Package 可以包含多个 Work Item。

### Payload

由 Work Package 提交者传给某个 Work Item 的任意字节数据。

Payload 可在 Refine 中读取，其哈希会进入对应的 Work Digest。

### Extrinsic Data

与 Work Package 一起提供、并通过哈希和长度承诺的外部字节数据。

Refine 可以通过 Host Call 获取这些数据。

这里的 Extrinsic Data 是 JAM Work Item 输入，不应与宿主链交易中的 Extrinsic 混淆。

### Imported Segment

由先前 Work Package 导出，并被当前 Work Item 读取的固定长度数据段。

Imported Segment 通过承诺和证明验证其来源和完整性。

### Exported Segment

由 Refine 执行产生的固定长度数据段。

它可以被后续 Work Package 作为 Imported Segment 使用。Work Package 预先声明每个 Work Item 允许导出的 Segment 数量。

### Segment Root

对一个 Work Package 产生的 Exported Segment 作出的 Merkle Root 承诺。

后续 Work Package 可以使用 Segment Root 和索引验证导入数据。

### Work Bundle

执行或审计 Work Package 所需的完整数据集合。

它通常包括 Work Package、Extrinsic Data、Imported Segment 及其证明。Work Bundle 通常比链上记录的 Work Package 更大。

### Package Hash

Work Package 规范编码的哈希。

它用于标识 Work Package、声明依赖关系，并将 Work Report 与原始 Work Package 绑定。

## Refinement Context

### Refinement Context

描述 Work Package 执行所依赖历史协议上下文的数据。

Gray Paper 中的 Refinement Context 包括：

* Anchor；
* Anchor Posterior State Root；
* Anchor Accumulation Output Log；
* Lookup Anchor；
* Lookup Anchor Timeslot；
* Prerequisite Work Package Hashes。

### Anchor

Refinement Context 引用的历史区块。

它将 Work Package 的执行上下文绑定到一个确定的协议历史位置，并关联对应的状态根和 Accumulation Output Log。

### Lookup Anchor

用于历史 Preimage 和协议状态查询的历史区块。

Service Code 和其他历史数据必须从 Lookup Anchor 所确定的状态视图中读取，而不是任意使用执行时的最新状态。

### Historical Lookup

在某个历史 Timeslot 的 Service 状态中查询 Preimage。

它使 Refine 可以确定性地使用 Lookup Anchor 上可用的 Service Code 和数据。

### Prerequisite

当前 Work Report 在 Accumulate 前依赖的另一个 Work Package。

只有依赖的 Work Package 已完成 Accumulate 后，当前 Work Report 才能进入 Accumulate。

## Refine 与 Work Report

### Refine

将 Work Package 转换为 Work Report 的计算阶段。

Refine 通常可以在 Core 上并行执行。它可以读取输入、产生 Work Result 并导出 Segment。

### Work Result

一个 Work Item 执行 Refine 后产生的结果。

它可以是成功返回的字节数据，也可以是 Out-of-Gas、Panic、代码不可用或输出不合法等错误。

### Work Digest

Work Report 中对应单个 Work Item 的摘要。

它包含：

* Service ID；
* Service Code Hash；
* Payload Hash；
* Accumulate Gas Limit；
* Work Result；
* Refine Gas Used；
* Imported、Exported 和 Extrinsic Data 的统计信息。

Work Digest 是 Refine 结果进入 Accumulate 的主要数据载体。

### Work Report

一个 Work Package 执行 Refine 后产生的规范报告。

Gray Paper `0.7.2` 中，Work Report 包含：

* Availability Specification；
* Refinement Context；
* Core Index；
* Authorizer 和 Authorization Trace；
* Segment Root Lookup；
* Work Digests；
* Is-Authorized Gas Used。

Work Report 描述计算结果，但只有通过后续保障与可用性流程后，才能进入 Accumulate。

### Core Index

标识 Work Package 在哪个 Core 上执行的索引。

## Accumulate 与状态

### Accumulate

将已通过验证且数据可用的 Work Result 应用到规范 Service State 的阶段。

Accumulate 按 Service 聚合 Work Digest，并执行对应 Service 的 Accumulate 逻辑。与 Refine 不同，Accumulate 可以修改全局规范状态。

### Accumulation Input

传给 Service Accumulate 逻辑的输入。

它可以是由 Work Digest 和 Work Report 提取出的 Operand Tuple，也可以是 Deferred Transfer。

### Operand Tuple

从 Work Report 和 Work Digest 中提取、传给 Accumulate 的关键数据。

它包含 Package Hash、Segment Root、Authorizer、Payload Hash、Gas Limit、Authorization Trace 和 Work Result。

### Deferred Transfer

由一次 Accumulate 产生、在后续 Accumulation 轮次中处理的 Service 间转账。

它包含发送方、接收方、金额、Memo 和 Gas Limit。

### Accumulation Output

Service 在 Accumulate 中产生的输出承诺。

它可以被记录到协议维护的 Accumulation Output Log，并供后续协议上下文引用。

### Service Storage

属于某个 Service 的持久化键值状态。

Service 只能通过受控 Host Call 读取和修改自己的 Storage，除非协议明确提供其他能力。

### Preimage

由 Hash 标识的原始字节数据。

Service Code 和其他大型数据通常通过 Hash 在状态中引用，并通过 Preimage 机制提供实际内容。

### State Root

对完整协议状态的 Merkle Root 承诺。

它将区块与确定的后验状态绑定。

## MiniJAM 核心

### Worker

在链下获取 Work Bundle、执行 Refine、生成候选 Work Report或独立验证候选报告的执行者。

MiniJAM Worker 只负责 Refine 和验证，不能直接修改规范 JAM 状态。

### Assigned Worker

被确定性分配给某个 Work 的 Worker。

只有被分配的 Worker 才能生产候选报告或参与对应报告的验证。

### Candidate Producer

被指定负责生成当前轮次候选 Work Report 的 Worker。

MiniJAM 当前从被分配 Worker 中确定一个 Candidate Producer，而不是允许所有 Worker 同时提交候选报告。

### Candidate Report

Candidate Producer 执行 Refine 后提交的 Work Report。

它仍需由其他 Assigned Worker 独立重新执行 Refine 并验证。

### Support

Worker 独立执行 Refine 后，确认本地结果与 Candidate Report 一致时提交的投票。

Support 不是 JAM Assurance。

### Oppose

Worker 独立执行 Refine 后，发现候选报告不一致或无效时提交的反对投票。

Oppose 可以携带错误原因，例如 `InvalidRefine`。

## MiniJAM 系统操作

### System Service

MiniJAM 保留的系统级 Service。

### System Operation

由 MiniJAM 宿主入口提交，并由 Runtime 中的 Jambda Executive 执行的系统命令。

当前主要包括：

* Create Service；
* Upgrade Service。

### System Receipt

System Operation 执行后产生的结果。

它可以表示 Service 已创建、Service 已升级或请求被拒绝。

### Ingress Relayer

被授权向 Runtime 提交 Work、Preimage 和 System Operation 的宿主账户。

它是 Stage 0 的入口控制机制，不是 JAM Gray Paper 原生角色，仅仅是为了测试期间方便，在下一版本中将被移除。

### Service Controller

MiniJAM 中被授权管理某个 Service 的账户。

当前 Playground 使用 Controller 判断谁可以提交 Work 或升级 Service。同样地，这也是一个方便测试的临时设计，下一版本将移除。

### Work Deposit

提交 Work 时锁定的经济保证。

它用于约束无效或失败 Work。Stage 0 的具体金额属于网络配置，不应视为永久协议参数。

### Candidate Bond

Candidate Producer 提交候选报告时锁定的经济保证。

候选报告被拒绝时，可以按照配置进行罚没。

[1]: https://github.com/gavofyork/graypaper/releases/tag/v0.7.2 "Release v0.7.2 · gavofyork/graypaper · GitHub"

