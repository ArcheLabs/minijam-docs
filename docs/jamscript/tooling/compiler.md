---
title: JamScript Compiler
description: Check, inspect, build, and locally run JamScript Service artifacts.
---

# JamScript Compiler

The public CLI is `jams`.

Install it with:

```bash
curl -fsSL https://install.minijam.xyz/jamscript | bash
```

The installer also installs the managed compiler/toolchain and matching native
backend.

## Everyday commands

| Command | Purpose |
|---|---|
| `jams new NAME` | Create a project, source file, and Service identity. |
| `jams check PATH` | Parse and validate the manifest and Service metadata. |
| `jams abi PATH` | Print the generated application ABI JSON. |
| `jams build PATH --output dist` | Compile the Service and write a deployment bundle. |
| `jams inspect dist` | Verify bundle checksums and print build metadata. |
| `jams run dist/service.pvm` | Execute a local PVM validation run. |
| `jams network list PATH` | List configured deployment networks. |
| `jams network show NAME PATH` | Inspect a configured network. |
| `jams deploy PATH --network NAME` | Deploy a built Service to a configured network. |
| `jams backend start --network NAME` | Start the installed JamScript backend. |

`--output` defaults to `dist`. `check`, `abi`, and `build` default to the
current directory when `PATH` is omitted.

## Managed toolchain commands

```bash
jams toolchain status
jams toolchain status --json
jams toolchain install
jams toolchain verify
jams toolchain path
```

Normal users do not need to install Rust, Node, LLVM, ScriptC, or PolkaVM
separately. The release toolchain is managed by `jams`.

After the toolchain is installed, `--offline` can be used to forbid toolchain
downloads during a build:

```bash
jams build . --output dist --offline
```

## What the build does

At a high level:

```text
JamScript source
  ↓
parser / typed IR
  ↓
ScriptC + generated guest runtime
  ↓
managed Rust / LLVM toolchain
  ↓
official PolkaVM linker
  ↓
service.pvm + service.blob + ABI/build metadata
```

The release build is deterministic and verifies the managed toolchain and output
bundle metadata.

## Current performance boundary

The current implementation deliberately builds on the mature PolkaVM toolchain.
That provides a stable execution foundation, but also introduces efficiency
overhead that can be reduced as JamScript-specific lowering and tooling mature.

Ordinary numeric computation in the current ScriptC path can still use
floating-point `number` representation internally in some paths. Fixed-width
ABI types such as `u64` and `u128` remain explicit at Service boundaries.
This internal numeric lowering is a preview limitation and is expected to be
optimized before a stable release.

See [Stability Policy](../reference/stability.md) for the current preview
boundary.
