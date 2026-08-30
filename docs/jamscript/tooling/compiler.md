---
title: JamScript Compiler
description: Check, inspect, and compile JamScript 0.2 into PVM artifacts.
---

# JamScript Compiler

The current CLI is built from the JamScript Rust workspace:

```bash
cargo build --locked --bin jamscript
cargo run --locked --bin jamscript -- new NAME
cargo run --locked --bin jamscript -- check PATH
cargo run --locked --bin jamscript -- abi PATH
cargo run --locked --bin jamscript -- build PATH --output dist
cargo run --locked --bin jamscript -- inspect dist
```

`check` parses the manifest/source and validates metadata. `abi` prints the generated descriptor. `build` performs the complete ScriptC M2 and MiniJAM target pipeline; `inspect` verifies bundle checksums and prints build/protocol/Builder metadata.

```text
TypeScript source → JamScript parser/IR → ScriptC 0.0.34 C output
→ generated Rust runtime → Clang 20 + rust-lld → PolkaVM linker 0.30.0
→ MiniJAM converter → deployment bundle
```

Language `0.2` requires `[compiler] backend = "scriptc"`; there is no legacy fallback. The CLI currently exposes no optimization or alternate-target flag. Diagnostics reject unknown manifest fields, unsupported imports/top-level declarations, invalid bounded types, reachable nondeterministic APIs, toolchain-version drift, and invalid output artifacts.
