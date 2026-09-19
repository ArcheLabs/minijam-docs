---
title: JamScript 项目配置
description: 语言 0.2 已实现的 jamscript.toml 字段。
---

# JamScript 项目配置

`jamscript.toml` 是严格配置。未知字段会报错，这能及时发现从旧 branch 复制来的
配置。

## 最小项目

```toml
[package]
name = "counter"
version = "0.2.0"
entry = "src/service.ts"
language = "0.2"

[compiler]
backend = "scriptc"
```

这足够创建 immutable Service。`jams new` 还会添加 `[management]`，让生成的项目
可以直接配置 management policy。

## 已实现字段

| Section/field | 必需 | 含义 |
|---|---|---|
| `package.name` | 是 | Package/Service 名称。 |
| `package.version` | 是 | 写入 ABI 的 application package 版本。 |
| `package.entry` | 是 | TypeScript entry file，通常是 `src/service.ts`。 |
| `package.language` | 是 | 必须是 `0.2`。 |
| `compiler.backend` | 是 | 必须是 `scriptc`。 |
| `management.mode` | 否 | `immutable`、`deployer` 或 `key`。有该 section 时默认 `deployer`。 |
| `management.account` | `key` 必需；`deployer` 可选 | 32-byte 十六进制 wallet public key。 |
| `target.jam.genesis_hash` | 否 | action/management signing 使用的 32-byte network domain。省略时默认为零。 |

显式指定 network domain 和 management key：

```toml
[target.jam]
genesis_hash = "0xYOUR_64_HEX_CHARACTER_GENESIS_HASH"

[management]
mode = "key"
account = "0xYOUR_64_HEX_CHARACTER_PUBLIC_KEY"
```

`deployer` 先读取 `management.account`，再读取 `JAMSCRIPT_DEPLOYER_ACCOUNT`。
Deployer account 必须是 wallet public key，且不能等于自动生成的 `serviceKey`。
`immutable` 不能配置 account，并会关闭 management action。

## Service identity

CLI 将 identity 独立保存在 `.jamscript/service.json`：

```json
{
  "version": 2,
  "serviceKey": "0x…",
  "instanceId": "0x…",
  "name": "counter"
}
```

`serviceKey` 标识 Service；`instanceId` 是 management envelope 使用的稳定部署
identity。请备份这个文件，不要随意重新生成。

## Target 和 native module 说明

当前 JamScript target 是 `jam-v1`，SDK 来自 managed bundle 或仓库自己的 target
目录。没有实现 `[target.minijam] sdk_root` 字段；设置它会触发 unknown-field error。
MiniJAM 属于下游部署/兼容性流程。

Manifest parser 有 `[native.NAME]` 字段，用于未来/experimental C module plumbing
（`language`、`sources` 和可选 `include_dirs`），但当前 ScriptC M2 source transform
只接受来自 `jam` 的 import。在处理该 experimental 边界之前，不要在语言 `0.2`
Service 中使用 `native:<module>`。
