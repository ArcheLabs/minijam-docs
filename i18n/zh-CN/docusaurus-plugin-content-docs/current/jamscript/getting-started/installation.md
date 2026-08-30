---
title: 安装 JamScript 工具链
description: JamScript 0.2 的必要与可选依赖。
---

# 安装 JamScript 工具链

| 依赖 | 当前要求 | 用途 |
|---|---|---|
| Rust | `1.88` | CLI、代码生成和 PVM guest 构建 |
| Node.js | `24.x`；锁定 `24.15.0` | ScriptC 编译器 |
| npm | 与 lockfile 兼容 | 安装 ScriptC 依赖 |
| Clang | 20 | 为 RISC-V 编译生成的 C |
| MiniJAM SDK | 兼容 checkout | target adapter 与 PVM 转换 |
| `readelf`/`llvm-readelf` | 位于 `PATH` | 校验 ELF |

已测试流程以 Linux 为主，其他操作系统尚未作为受支持的发布环境记录。

```bash
git clone https://github.com/ArcheLabs/JamScript.git
git clone https://github.com/ArcheLabs/minijam-client.git
cd JamScript/toolchains/scriptc && npm ci --ignore-scripts && cd ../..
cargo build --locked --bin jamscript
cargo run --locked --bin jamscript -- --version
```

可选设置：`JAMSCRIPT_MINIJAM_SDK` 指定 SDK，`JAMSCRIPT_DEPLOYER_ACCOUNT` 指定部署者公钥。运行 workspace 测试还需要 Rustfmt/Clippy；只有真实网络 E2E 才要求本地 MiniJAM 节点。
