---
title: 安装 JamScript
description: 安装 JamScript CLI、托管工具链和匹配的 Backend。
---

# 安装 JamScript

## 快速安装

正常开发请直接使用官方 installer：

```bash
curl -fsSL https://install.minijam.xyz/jamscript | bash
```

不传参数时，installer 会自动选择最新发布的 JamScript 版本（包括 RC），并安装三部分：

- `jams` —— JamScript CLI；
- `jams build` 使用的托管 compiler/toolchain；
- 与该 JamScript 版本匹配的原生 `jamscript-service-backend`。

安装前会校验 release 中发布的 SHA-256 checksum。

默认二进制目录为：

```text
~/.local/bin
```

如果该目录尚未位于 `PATH`，installer 会输出当前 shell 需要执行的命令。

## 支持的平台

当前 v0.1 release line 提供原生发布产物：

- Linux x86_64；
- macOS Apple Silicon（arm64）。

当前 release 暂不支持 Windows。

## 验证安装

```bash
jams --version
jams toolchain verify
```

托管工具链由 installer 自动安装，因此普通用户无需另外安装 Rust、Cargo、Node、
LLVM、ScriptC 或 PolkaVM linker。

可以通过以下命令查看工具链：

```bash
jams toolchain status
jams toolchain status --json
jams toolchain path
```

## 固定精确版本

为了可复现开发或 CI，可以固定不可变 release tag：

```bash
curl -fsSL https://install.minijam.xyz/jamscript \
  | bash -s -- --version v0.1.0-rc.7
```

installer 会自动选择匹配的 Backend release。以上示例对应：

```text
backend-v0.1.0-rc.7
```

也可以指定二进制目录：

```bash
curl -fsSL https://install.minijam.xyz/jamscript \
  | bash -s -- --bin-dir "$HOME/bin"
```

## 启动 Backend

项目已配置本地 MiniJAM 网络后：

```bash
jams backend start --network local
```

Backend 会以前台进程运行。installer 已经把匹配的原生 Backend 安装在 `jams`
旁边，因此正常 JamScript 开发路径不要求 Docker。

仍可通过 `PATH` 或 `JAMSCRIPT_BACKEND_BIN` 使用自定义 Backend binary。

## 离线构建

托管工具链完成安装后，可以在不下载工具链的情况下构建：

```bash
jams build . --output dist --offline
```

可通过 `JAMSCRIPT_TOOLCHAIN_HOME` 更改托管工具链 cache 的位置，例如放入 CI
缓存目录。

## Installer 的基础依赖

installer 只需要 Bash、curl、tar、gzip、awk，以及 `sha256sum` 或 macOS
`shasum`。

它**不要求**：

- checkout JamScript 仓库；
- checkout MiniJAM 源码；
- 预装 Rust/Cargo；
- 预装 Node；
- 预装 LLVM/Clang；
- Docker。

## 手动安装

如果不希望把脚本直接 pipe 给 Bash：

1. 从选定的 `v...` GitHub Release 下载对应平台的 JamScript CLI archive 与
   `SHA256SUMS`；
2. 从匹配的 `backend-v...` Release 下载对应平台的 Backend archive 与
   `SHA256SUMS`；
3. 校验两个 checksum；
4. 将 `jams` 和 `jamscript-service-backend` 安装到 `PATH` 中的目录；
5. 执行 `jams toolchain install` 与 `jams toolchain verify`。

源码构建主要用于开发 JamScript 本身，不再是应用开发的推荐安装方式。

继续阅读[快速开始](./quickstart.md)。
