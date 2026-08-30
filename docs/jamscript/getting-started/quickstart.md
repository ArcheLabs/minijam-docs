---
title: JamScript Quickstart
description: Create, check, and build a JamScript 0.2 Service.
---

# JamScript Quickstart

This source-based flow uses the current JamScript repository and its sibling MiniJAM SDK checkout.

## Prerequisites

Install Git, Rust `1.88` with Cargo, Node.js `24.x` (the pinned build is `24.15.0`), npm, Clang 20, and standard ELF inspection tools. Clone `JamScript` and `minijam-client` as sibling directories.

```bash
cd JamScript
cd toolchains/scriptc && npm ci --ignore-scripts && cd ../..
cargo build --locked --bin jamscript
```

## Create and check a Service

```bash
cargo run --locked --bin jamscript -- new hello-jam
cargo run --locked --bin jamscript -- check hello-jam
cargo run --locked --bin jamscript -- abi hello-jam
```

`new` creates `jamscript.toml`, `src/service.ts`, and a local `.jamscript/service.json` identity. The generated example exports a wallet-authenticated `increment` action.

## Build

The default management mode needs a 32-byte wallet public key:

```bash
export JAMSCRIPT_DEPLOYER_ACCOUNT=0xYOUR_64_HEX_CHARACTER_PUBLIC_KEY
cargo run --locked --bin jamscript -- build hello-jam
cargo run --locked --bin jamscript -- inspect dist
```

If the MiniJAM checkout is not a sibling directory, set `JAMSCRIPT_MINIJAM_SDK` to its absolute path. The bundle includes `service.abi.json`, generated sources, build metadata, `service.elf`, `service.polkavm`, `service.pvm`, `service.blob`, a portable Builder artifact, and checksums.

:::info Deployment status
Compilation is supported from source. Deployment requires the current MiniJAM network/client workflow and is not performed by the JamScript CLI itself.
:::
