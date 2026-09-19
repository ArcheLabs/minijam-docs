---
title: JamScript Runtime ABI
description: Current application, runtime, and JamV1 ABI boundaries.
---

# JamScript Runtime ABI

The following versions are the current Formal V1 developer-preview baseline:

| Boundary | Current value |
|---|---|
| Source language | `0.2` |
| CLI/workspace | `0.1.0`, public command `jams` |
| ScriptC backend | `scriptc-m2`, ScriptC `0.0.34` |
| Application ABI | `1` |
| Native C ABI | `1` (experimental plumbing) |
| Signed action | `SignedActionV1` |
| Managed-state protocol/layout | `1` / `1` |
| Runtime Refine input | `1` |
| Recovery format | `1` |
| Target | `jam-v1` |
| PolkaVM linker | `0.30.0` |
| JAM blob encoder | `0.1.28` |

The generated public PVM exports are `minijam_refine` and
`minijam_accumulate`. Refine returns an output pointer and size in `a0/a1`;
Accumulate receives its invocation-context input through `a0/a1` and has no
application output registers. These are target integration details.

## Application ABI

`service.abi.json` is generated from one shared `TypeIr` graph. It describes:

- action names, selectors, authentication, and input fields;
- query names, their state, key type, and nullable output;
- state schemas, key/value types, and state kind;
- all referenced type descriptors.

For the current M2 service path, action `executeOutput` is `unit`; state changes
are observed by querying managed state after finalization. The client codec
supports the broader descriptor set documented in [Types and data](../language/types-and-data.md).

Application values use canonical JAM codec rules. They are separate from the
JAM protocol boundary, where Accumulate initialization uses `FnEncode` fields.

## Artifact sources of truth

When diagnosing a specific build, inspect these files together:

- `build.json` for exact compiler, target, and toolchain identity;
- `protocol-v0.json` for the emitted protocol boundary;
- `service.abi.json` for the application contract;
- `checksums.json` for bundle integrity.

Formal V1 is the first supported wire/runtime protocol. JamScript source
compatibility and the M2 executable surface remain pre-stable.
