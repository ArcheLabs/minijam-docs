---
title: JamScript 编译器
description: 检查、查看、构建并在本地运行 JamScript Service artifact。
---

# JamScript 编译器

公共 CLI 名称是 `jams`。

## 日常命令

| 命令 | 作用 |
|---|---|
| `jams new NAME` | 创建项目、源码文件和 Service identity。 |
| `jams check PATH` | 解析并校验 manifest 与 Service metadata。 |
| `jams abi PATH` | 输出生成的 application ABI JSON。 |
| `jams build PATH --output dist` | 编译 Service 并写入 deployment bundle。 |
| `jams inspect dist` | 校验 bundle checksums 并打印 build metadata。 |
| `jams run dist/service.pvm` | 执行一次本地 PVM validation。 |
| `jams doctor` | 检查 canonical managed-toolchain 是否就绪。 |

从仓库 checkout 时，通过构建出的 binary 使用同样的命令：

```bash
cargo build --locked --bin jams
./target/debug/jams new my-service
./target/debug/jams check my-service
./target/debug/jams abi my-service
JAMSCRIPT_DEV_TOOLCHAIN=1 ./target/debug/jams build my-service --output my-service/dist
./target/debug/jams inspect my-service/dist
./target/debug/jams run my-service/dist/service.pvm
```

使用已发布版本时，先安装 managed bundle，再使用 `jams build --offline`。
`--output` 默认是 `dist`；省略 `PATH` 时，`check`、`abi` 和 `build` 默认使用当前目录。

## Toolchain 命令

```bash
jams toolchain status
jams toolchain status --json
jams toolchain install
jams toolchain verify
jams toolchain path
jams doctor --json
```

`doctor` 面向 canonical release build。即使当前 embedded distribution manifest 尚未
发布，设置 `JAMSCRIPT_DEV_TOOLCHAIN=1` 的 source checkout 仍然可以用于开发。

## Build 做了什么

```text
TypeScript source → parser/TypeIr → ScriptC M2 C
→ generated Rust runtime → Clang/LLVM + official PolkaVM linker
→ JamV1 PVM 和 JAM blob
```

语言 `0.2` 要求 `[compiler] backend = "scriptc"`，没有 legacy compiler fallback，也
没有用于切换 target 或 optimization profile 的 CLI flag。Diagnostics 会拒绝错误的
manifest、unsupported source shape、无界 ABI 类型、determinism 违规、toolchain drift
和被篡改的输出 bundle。
