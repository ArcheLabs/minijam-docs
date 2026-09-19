---
title: JamScript Compatibility Matrix
description: The current Formal V1 and JamV1 toolchain baseline.
---

# JamScript Compatibility Matrix

This is the baseline embedded by the current JamScript toolchain distribution.
For a particular build, `build.json` and the bundle manifest are authoritative.

| Component | Verified baseline |
|---|---|
| Public CLI | `jams`, workspace version `0.1.0` |
| Source language | `0.2` |
| Backend | `scriptc-m2` |
| ScriptC | `0.0.34`, revision `d7b4480` |
| TypeScript | `7.0.2` |
| Node.js | `24.15.0` |
| Rust | `nightly-2026-05-02` |
| Clang/LLVM | `20.1.8` official Linux distribution |
| PolkaVM linker | `0.30.0` |
| JAM target | `jam-v1` |
| JAM blob encoder | `0.1.28` |
| Application / managed state ABI | `1` / `1` |
| Signed action | `SignedActionV1` |
| Managed-state protocol/layout | `1` / `1` |

## MiniJAM relationship

JamScript targets its JamV1 boundary and does not require MiniJAM or Jambda to
compile a Service. MiniJAM is a downstream consumer used for network execution,
deployment, and live compatibility checks. A MiniJAM node revision can change
without changing the JamScript language or application ABI, but the downstream
workflow must still use a compatible target/runtime baseline.

## Reproducibility checklist

When sharing an artifact, keep:

- the JamScript source revision;
- `jamscript.toml` and `.jamscript/service.json`;
- the generated `service.abi.json`;
- `build.json`, `protocol-v0.json`, and `checksums.json`;
- the CLI/toolchain release identity.

Changing a source type, record field order, enum index, action name/selector,
state schema, codec, or target version requires an explicit compatibility and
state-migration review.
