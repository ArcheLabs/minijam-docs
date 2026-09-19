---
id: quickstart
title: 开发者概览
description: 当前 MiniJAM 服务开发流程及其稳定性边界。
slug: /minijam/developers/quickstart
---

# 快速开始

MiniJAM Playground 允许你直接在浏览器中编写、编译和部署一个简单的 MiniJAM Service，并通过提交 Work 修改其链上状态。

当前 Playground 提供 C 和 C++ 示例，适合用于体验 MiniJAM Stage 0 的基本流程。

## 选择开发路径

- **JamScript：** 推荐的高层确定性 TypeScript 风格 JAM Service 开发路径。从 [JamScript 概览](/docs/jamscript)或[快速开始](/docs/jamscript/getting-started/quickstart)入门。
- **C / C++：** 通过当前 MiniJAM Playground 和底层工具提供。下文继续介绍 C/C++ Playground 流程。

:::warning 当前无法从公开源码构建完整 Stack

由于 MiniJAM 所依赖的 Jambda 目前处于私有状态，你暂时无法仅使用公开源码在本地构建完整的 MiniJAM Stack。

我们正在处理相关依赖的开放问题。在此之前，你仍然可以通过已经发布的 Docker 镜像运行完整服务。

:::

如需运行完整环境，请继续阅读使用 Docker 部署。

## 登录钱包

部署 Service 和提交 Work 前，需要连接一个 Polkadot 钱包。注意： 在真实的 JAM 环境中，并没有这个步骤，这是 MiniJAM 当前阶段为了方便测试、避免初期 service 之间相互影响特意设置的步骤。MiniJAM 的正式测试网会有所不同。

## Counter 示例

Counter 示例包含两个主要执行入口：

- `Refine`：读取 Work Payload 中的计数增量；
- `Accumulate`：读取当前计数值，应用增量并写回存储。

计数值保存在名为 `counter` 的 Service Storage Key 中。你可以不修改示例代码，直接完成后续编译和部署流程。

## 编译 Service

点击 **Build service**。

![编译 Service](/minijam/build.png)

编译完成后，页面会显示：

- 编译状态；
- Code Hash；
- Blob Size；
- 使用的 Toolchain；
- 编程语言和优化级别。

如果编译失败，编译器诊断信息会显示在结果区域。根据错误信息修改代码后，再次点击 **Build service** 即可重新编译。

## 部署 Service

编译成功后，点击 **Deploy service**。

![打开 Playground](/minijam/build.png)

Playground 会显示本次部署操作的确认窗口，其中包括：

- Controller；
- Code Hash；
- Code Length。

确认信息无误后，在钱包中签名。

![确认部署操作](/minijam/sign.png)

## 等待操作完成

签名完成后，页面会跳转到 Operation 页面。

Playground 会持续查询操作状态。创建 Service 时，操作可能依次经历以下阶段：

```
Preparing
    ↓
Submitted
    ↓
Waiting for finality
    ↓
Publishing code
    ↓
Waiting for finalized code
    ↓
Completed
```

![等待部署完成](/minijam/service.png)

根据操作类型，页面还可能显示：

- Operation ID；
- Extrinsic Hash；
- Service ID；
- Work ID；
- Execution Receipt；
- Package Hash；
- Bundle CID。

只有经过最终确认的数据才会被显示为已完成。

部署完成后，点击 **Open Service** 进入 Service 页面。

## 查看 Service

Service 页面展示当前已经最终确认的链上信息。

其中包括：

- Controller；
- Code Hash；
- Code Length；
- Preimage 状态；
- Finalized Block。

只有 Service 的 Controller 可以提交 Work 或升级 Service。连接其他账户时，这些操作会被禁用，这是本阶段特有的限制。

## 提交 Work

在 **Submit Work** 区域填写 Payload。

Counter 示例建议使用默认的 **Counter increment** 编码方式，然后输入一个整数，例如：

```
1
```

点击 **Run Work**。

![提交 Counter Work](/minijam/work.png)

确认操作并在钱包中签名后，Playground 会跳转到新的 Operation 页面。

Work 会经过 Worker Candidate、投票和 Accumulate 等阶段。页面显示 **Completed** 后，说明本次 Work 已完成处理。

随后点击 **View finalized Service state** 返回 Service 页面。

## 读取最终状态

在 Service 页面的 **Observe storage** 区域，将 Storage Key 设置为：

```
counter
```

点击 **Read finalized value**。

![读取 Counter 状态](/minijam/value.png)

页面会显示：

- 原始十六进制存储值；
- 解码后的 Counter 数值；
- 该值对应的最终确认区块。

例如，首次提交的增量为 `1` 时，结果通常显示为：

```
Counter: 1
```

再次提交增量 `2` 后，最终结果将变为：

```
Counter: 3
```

## 升级 Service

Service 页面还提供代码升级功能。

升级流程与首次部署类似：

1. 修改新的 C 源代码；
2. 点击 **Build upgrade**；
3. 检查新的 Code Hash；
4. 点击 **Upgrade Service**；
5. 在钱包中确认并签名；
6. 等待升级操作最终确认。

升级权限仅属于当前 Service Controller。

## 查看已部署的 Service

连接钱包后，打开右上角的账户菜单，然后选择 **My Services**。该页面会显示当前浏览器为该账户记录的 Service。
