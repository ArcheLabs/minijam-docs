---
title: 安装 JamScript 工具链
description: 安装 JamScript CLI 及其可复现的编译工具链。
---

# 安装 JamScript 工具链

JamScript 有两种使用方式：

1. 使用发布的 CLI 和托管 toolchain bundle，获得可复现构建。
2. 从仓库构建 CLI，适合参与 JamScript 开发，或匹配的 release bundle 尚未
   发布时使用。

编译过程不需要 MiniJAM checkout。MiniJAM 属于下游网络和兼容性检查。

## 推荐：托管 toolchain bundle

从同一个 GitHub Release 下载 `jams` CLI archive、对应的 managed toolchain
archive 和 release checksums。先校验下载文件，再执行：

```bash
./jams toolchain install
./jams doctor
```

第一条命令可能会通过网络下载一次精确版本的 bundle。bundle 自带 Node、ScriptC、
Rust、Clang/LLVM、PolkaVM linker、Cargo 依赖和 JAM target SDK。canonical build
不会回退到主机上的 `node`、`rustc` 或 `clang`。

安装后可以完全离线构建：

```bash
./jams build ./my-service --offline
```

可用 `JAMSCRIPT_TOOLCHAIN_HOME` 把不可变 bundle cache 放到指定位置，例如 CI
缓存。`jams toolchain verify` 会再次检查已安装文件；
`jams toolchain status --json` 适合 CI 诊断。

## 仓库 checkout：开发者模式

这是当前开发树最实用的方式：

```bash
git clone https://github.com/ArcheLabs/JamScript.git
cd JamScript
npm --prefix toolchains/scriptc ci --ignore-scripts
cargo build --locked --bin jams
./target/debug/jams --version
```

所需版本由 `rust-toolchain.toml` 和 toolchain manifest 锁定。源码构建在 Linux
x86_64 开发主机上要求 Rust `nightly-2026-05-02`、Node `24.15.0` 和 Clang
`20.1.8`。显式选择仓库中的 compiler 和 target 文件：

```bash
export JAMSCRIPT_DEV_TOOLCHAIN=1
./target/debug/jams check examples/counter
```

开发者产物的 `build.json` 会标记 `canonical_toolchain: false`。它们适合开发，
但不是 release artifact。

如果 Clang 不在 `/usr/lib/llvm-20/bin/clang`，请把 `JAMSCRIPT_CLANG` 设置为
绝对路径。需要时也可以分别用 `JAMSCRIPT_LLVM_AR` 和 `JAMSCRIPT_READELF`
指定对应工具。

:::tip 先做轻量检查

长时间构建前先运行 `./target/debug/jams check <project>`，再运行
`./target/debug/jams abi <project>`。这两步只解析项目并生成 metadata，不会
构建 PVM guest。

:::

## 平台说明

已发布的 v0.1 distribution 从 Linux x86_64 开始。其他平台可能在 release
manifest 中被标为 pending 或 unsupported；不要因为源码 checkout 能在某平台
编译，就默认该平台已有正式支持。
