---
title: JamScript 编译器
description: 检查、查看、构建并在本地运行 JamScript Service artifact。
---

# JamScript 编译器

公共 CLI 名称是 `jams`。

安装：

```bash
curl -fsSL https://install.minijam.xyz/jamscript | bash
```

installer 同时会安装托管 compiler/toolchain 与匹配的原生 Backend。

## 日常命令

| 命令 | 作用 |
|---|---|
| `jams new NAME` | 创建项目、源码文件和 Service identity。 |
| `jams check PATH` | 解析并校验 manifest 与 Service metadata。 |
| `jams abi PATH` | 输出生成的 application ABI JSON。 |
| `jams build PATH --output dist` | 编译 Service 并写入 deployment bundle。 |
| `jams inspect dist` | 校验 bundle checksum 并打印 build metadata。 |
| `jams run dist/service.pvm` | 执行本地 PVM validation。 |
| `jams network list PATH` | 列出已配置的部署网络。 |
| `jams network show NAME PATH` | 查看指定网络配置。 |
| `jams deploy PATH --network NAME` | 将已构建 Service 部署到指定网络。 |
| `jams backend start --network NAME` | 启动已安装的 JamScript Backend。 |

`--output` 默认是 `dist`；省略 `PATH` 时，`check`、`abi` 和 `build`
默认使用当前目录。

## 托管工具链命令

```bash
jams toolchain status
jams toolchain status --json
jams toolchain install
jams toolchain verify
jams toolchain path
```

普通用户无需另外安装 Rust、Node、LLVM、ScriptC 或 PolkaVM。Release toolchain 由
`jams` 管理。

工具链安装完成后，可以使用 `--offline` 禁止构建过程中下载工具链：

```bash
jams build . --output dist --offline
```

## Build 做了什么

高层流程：

```text
JamScript source
  ↓
parser / typed IR
  ↓
ScriptC + generated guest runtime
  ↓
managed Rust / LLVM toolchain
  ↓
official PolkaVM linker
  ↓
service.pvm + service.blob + ABI/build metadata
```

Release build 是确定性的，并会验证托管工具链和输出 bundle metadata。

## 当前性能边界

当前实现有意建立在成熟的 PolkaVM 工具链之上。这提供了稳定的执行基础，但也带来
一定效率损失。随着 JamScript-specific lowering 与工具链继续成熟，这部分开销会
逐步降低。

当前 ScriptC 路径中，部分普通数值计算在内部仍可能使用浮点 `number` 表示。
Service 边界上的 `u64`、`u128` 等定宽 ABI 类型仍然是明确的，但内部 numeric
lowering 尚处于 preview 阶段，正式版本前会继续优化。

当前稳定性边界请参阅[稳定性策略](../reference/stability.md)。
