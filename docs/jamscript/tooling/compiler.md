---
title: JamScript Compiler
description: Check, inspect, build, and locally run JamScript Service artifacts.
---

# JamScript Compiler

The public CLI is named `jams`.

## Everyday commands

| Command | Purpose |
|---|---|
| `jams new NAME` | Create a project, source file, and Service identity. |
| `jams check PATH` | Parse and validate the manifest and Service metadata. |
| `jams abi PATH` | Print the generated application ABI JSON. |
| `jams build PATH --output dist` | Compile the Service and write a deployment bundle. |
| `jams inspect dist` | Verify bundle checksums and print build metadata. |
| `jams run dist/service.pvm` | Execute a local PVM validation run. |
| `jams doctor` | Check canonical managed-toolchain readiness. |

From a repository checkout, use the same commands through the built binary:

```bash
cargo build --locked --bin jams
./target/debug/jams new my-service
./target/debug/jams check my-service
./target/debug/jams abi my-service
JAMSCRIPT_DEV_TOOLCHAIN=1 ./target/debug/jams build my-service --output my-service/dist
./target/debug/jams inspect my-service/dist
./target/debug/jams run my-service/dist/service.pvm
```

For a published release, install the managed bundle and use
`jams build --offline`. `--output` defaults to `dist`; `check`, `abi`, and
`build` default to the current directory when `PATH` is omitted.

## Toolchain commands

```bash
jams toolchain status
jams toolchain status --json
jams toolchain install
jams toolchain verify
jams toolchain path
jams doctor --json
```

`doctor` is about canonical release builds. A source checkout with
`JAMSCRIPT_DEV_TOOLCHAIN=1` can still be useful even when the current embedded
distribution manifest is not published.

## What the build does

```text
TypeScript source → parser/TypeIr → ScriptC M2 C
→ generated Rust runtime → Clang/LLVM + official PolkaVM linker
→ JamV1 PVM and JAM blob
```

Language `0.2` requires `[compiler] backend = "scriptc"`. There is no legacy
compiler fallback and no CLI flag for switching targets or optimization
profiles. Diagnostics reject malformed manifests, unsupported source shape,
unbounded ABI types, deterministic-profile violations, toolchain drift, and
tampered output bundles.
