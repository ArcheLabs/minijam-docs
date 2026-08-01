---
id: host-calls
title: HostCall
description: Stage 0 HostCall 支持和接口矩阵。
slug: /minijam/reference/host-calls
---

# HostCall

HostCall 向运行在 PVM 中的服务提供受控能力。服务必须只使用目标 MiniJAM 运行时支持的调用。不支持的调用会明确失败，不会被静默模拟为协议兼容。

下表来自当前的 [MiniJAM SDK HostCall 头文件](https://github.com/ArcheLabs/minijam-client/blob/main/service-toolchain/sdk/include/minijam/host.h) 和 [Jambda HostCall 表](https://github.com/ArcheLabs/minijam-client/blob/main/external/jambda/crates/state-backend/src/mutators/call_table.rs)。这是 Stage 0 接口参考，不代表完整 JAM HostCall 覆盖范围。

| Index | 名称 | 上下文 | 状态 | 输入 / 输出 | 错误边界 |
| ---: | --- | --- | --- | --- | --- |
| 0 | `GAS` | Refine / Accumulate | Supported | 返回剩余 gas | 执行引擎处理 gas 耗尽 |
| 1 | `FETCH` | Refine / Accumulate | Supported | 通过执行上下文获取声明的工作数据 | 缺失或无效数据由后端报告 |
| 2 | `LOOKUP` | Accumulate | Runtime-supported | 查找 preimage 数据 | 后端查找错误转换为 HostCall 错误 |
| 3 | `READ` | Accumulate | Runtime-supported | 读取服务存储 | 无效存储访问转换为 HostCall 错误 |
| 4 | `WRITE` | Accumulate | Runtime-supported | 写入服务存储 | 无效存储访问转换为 HostCall 错误 |
| 18 | `NEW` | Accumulate | Runtime-supported | 通过运行时上下文创建服务 | 返回运行时校验错误 |
| 20 | `TRANSFER` | Accumulate | Runtime-supported | 转移服务上下文资产 | 返回余额和运行时校验错误 |
| 25 | `YIELD` | Accumulate | Runtime-supported | 产出 Accumulate 结果 | 无效结果状态转换为 HostCall 错误 |
| 100 | `LOG` | Refine / Accumulate | Supported | 输出 JIP-1 日志消息 | VM 边界拒绝无效 guest memory |

当前公开 C SDK 暴露 `GAS`、`FETCH`、`READ`、`WRITE`、`NEW`、`TRANSFER`、`YIELD` 和 `LOG`。其他运行时 HostCall 不会自动对 SDK 服务可用。使用前请核对目标运行时和 ABI。

未知调用返回运行时的 unknown-host-call 行为。协议面稳定后可以扩展本表；未来应从 Rust 常量和 SDK 声明自动生成。
