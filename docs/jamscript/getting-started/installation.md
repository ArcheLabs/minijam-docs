---
title: Install the JamScript Toolchain
description: Required and optional dependencies for JamScript 0.2.
---

# Install the JamScript Toolchain

## Required

| Dependency | Current requirement | Purpose |
|---|---|---|
| Rust | `1.88` toolchain | CLI, code generation, PVM guest build |
| Node.js | `24.x`; pinned `24.15.0` | ScriptC compiler |
| npm | lockfile-compatible | Install pinned ScriptC dependencies |
| Clang | 20 | Compile ScriptC-generated C for RISC-V |
| MiniJAM SDK | compatible checkout | Target adapter and PVM conversion |
| `readelf` or `llvm-readelf` | available on `PATH` | Validate generated ELF |

The tested workflow is Linux-oriented. Other operating systems are not currently documented as supported release environments.

```bash
git clone https://github.com/ArcheLabs/JamScript.git
git clone https://github.com/ArcheLabs/minijam-client.git
cd JamScript/toolchains/scriptc
npm ci --ignore-scripts
cd ../..
cargo build --locked --bin jamscript
cargo run --locked --bin jamscript -- --version
```

## Optional

- Set `JAMSCRIPT_MINIJAM_SDK` when the MiniJAM SDK is not auto-discovered.
- Set `JAMSCRIPT_DEPLOYER_ACCOUNT` for projects using `management.mode = "deployer"`.
- Native C modules need the same target C toolchain.

## Development-only

Workspace tests and linting use Cargo's test, formatting, and Clippy components. A local MiniJAM node is required only for the real network E2E path, not for parsing or ABI generation.
