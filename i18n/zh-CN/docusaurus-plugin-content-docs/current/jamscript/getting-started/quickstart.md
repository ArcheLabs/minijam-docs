---
title: JamScript 快速开始
description: 创建、检查并构建 JamScript 0.2 Service。
---

# JamScript 快速开始

当前流程从源码构建，使用 JamScript 仓库及同级目录中的 MiniJAM SDK。

## 前置条件

安装 Git、带 Cargo 的 Rust `1.88`、Node.js `24.x`（锁定版本为 `24.15.0`）、npm、Clang 20 和 ELF 检查工具，并将 `JamScript` 与 `minijam-client` 克隆为同级目录。

```bash
cd JamScript
cd toolchains/scriptc && npm ci --ignore-scripts && cd ../..
cargo build --locked --bin jamscript
cargo run --locked --bin jamscript -- new hello-jam
cargo run --locked --bin jamscript -- check hello-jam
cargo run --locked --bin jamscript -- abi hello-jam
```

`new` 会创建 `jamscript.toml`、`src/service.ts` 和本地 Service 身份文件 `.jamscript/service.json`。

```bash
export JAMSCRIPT_DEPLOYER_ACCOUNT=0x你的64位十六进制公钥
cargo run --locked --bin jamscript -- build hello-jam
cargo run --locked --bin jamscript -- inspect dist
```

若 MiniJAM 不在同级目录，请把 `JAMSCRIPT_MINIJAM_SDK` 设为其绝对路径。产物包含 ABI、生成源码、构建元数据、ELF、PolkaVM/PVM/blob、Builder artifact 和校验和。

:::info 部署状态
源码编译已受支持；部署需要当前 MiniJAM 网络/客户端流程，JamScript CLI 本身不执行部署。
:::
