---
title: JamScript 项目配置
description: 语言 0.2 已实现的 jamscript.toml 字段。
---

# JamScript 项目配置

`jamscript.toml` 为严格配置，未知字段会报错。

```toml
[package]
name = "counter"
version = "0.2.0"
entry = "src/service.ts"
language = "0.2"

[compiler]
backend = "scriptc"

[management]
mode = "deployer"

[target.minijam]
sdk_root = "../minijam-client"
```

`management.mode` 接受 `immutable`、`deployer` 或 `key`。`deployer` 需要 `management.account` 或 `JAMSCRIPT_DEPLOYER_ACCOUNT`；`key` 必须提供 `account`。account 是 32-byte 十六进制公钥。

可用 `target.minijam.sdk_root` 或 `JAMSCRIPT_MINIJAM_SDK` 选择 SDK。legacy `service_id` 与 `genesis_hash` 仍可解析，但 `service_id` 不进入 SignedActionV1 身份。Native C 模块使用 `[native.NAME]`、`language = "c"`、非空 `sources` 和可选 `include_dirs`；路径不得逃出项目。当前没有 optimization、output、SDK ABI 或 adapter-version 配置字段。
