---
title: JamScript Project Configuration
description: The implemented jamscript.toml fields for language 0.2.
---

# JamScript Project Configuration

`jamscript.toml` is strict. Unknown fields are errors, which is helpful when a
configuration was copied from an older branch.

## Minimal project

```toml
[package]
name = "counter"
version = "0.2.0"
entry = "src/service.ts"
language = "0.2"

[compiler]
backend = "scriptc"
```

This is enough for an immutable Service. `jams new` also adds a
`[management]` section so the generated project is ready for a managed
deployment policy.

## Implemented fields

| Section/field | Required | Meaning |
|---|---|---|
| `package.name` | yes | Package/Service display name. |
| `package.version` | yes | Application package version recorded in the ABI. |
| `package.entry` | yes | TypeScript entry file, usually `src/service.ts`. |
| `package.language` | yes | Must be `0.2`. |
| `compiler.backend` | yes | Must be `scriptc`. |
| `management.mode` | no | `immutable`, `deployer`, or `key`. Defaults to `deployer` when the section exists. |
| `management.account` | for `key`; optional for `deployer` | A 32-byte hexadecimal wallet public key. |
| `target.jam.genesis_hash` | no | 32-byte network domain used in action/management signing. Defaults to zero when omitted. |

Example with an explicit network domain and management key:

```toml
[target.jam]
genesis_hash = "0xYOUR_64_HEX_CHARACTER_GENESIS_HASH"

[management]
mode = "key"
account = "0xYOUR_64_HEX_CHARACTER_PUBLIC_KEY"
```

`deployer` reads `management.account` first and then
`JAMSCRIPT_DEPLOYER_ACCOUNT`. The deployer account must be a wallet public key
and must not equal the generated `serviceKey`. `immutable` must not have an
account and disables management actions.

## Service identity

The CLI stores identity separately from the manifest in
`.jamscript/service.json`:

```json
{
  "version": 2,
  "serviceKey": "0x…",
  "instanceId": "0x…",
  "name": "counter"
}
```

`serviceKey` identifies the Service. `instanceId` is a stable deployment
identity used by management envelopes. Back up this file and do not regenerate
it casually.

## Target and native-module notes

The current JamScript target is `jam-v1`, and its SDK comes from the managed
bundle or the repository's own target directory. There is no implemented
`[target.minijam] sdk_root` field; setting it produces an unknown-field error.
MiniJAM is a downstream deployment/compatibility workflow.

The manifest parser has `[native.NAME]` fields for future/experimental C
module plumbing (`language`, `sources`, and optional `include_dirs`), but the
current ScriptC M2 source transform accepts imports from `jam` only. Do not use
`native:<module>` in a language `0.2` Service unless you are working on that
experimental boundary.
