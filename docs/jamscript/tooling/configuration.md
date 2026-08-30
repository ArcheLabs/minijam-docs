---
title: JamScript Project Configuration
description: Implemented jamscript.toml fields for language 0.2.
---

# JamScript Project Configuration

`jamscript.toml` is strict: unknown fields are errors.

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

`package` and the ScriptC compiler selection are required. `management.mode` accepts `immutable`, `deployer`, or `key`; `deployer` needs `management.account` or `JAMSCRIPT_DEPLOYER_ACCOUNT`, and `key` requires `account`. Accounts are 32-byte hexadecimal public keys.

`target.minijam.sdk_root` selects the SDK. The environment variable `JAMSCRIPT_MINIJAM_SDK` is the alternative. Legacy `service_id` and `genesis_hash` fields are accepted for routing/network-domain compatibility, but `service_id` is not embedded in SignedActionV1 identity.

Native C modules may be declared as `[native.NAME]` with `language = "c"`, a non-empty `sources` list, and optional `include_dirs`. Paths must remain inside the project. No optimization, output, SDK ABI, or adapter-version manifest fields are currently implemented; output is selected with the CLI `--output` option.
