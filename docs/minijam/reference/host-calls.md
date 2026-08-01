---
id: host-calls
title: Host Calls
description: Stage 0 HostCall support and reference matrix.
slug: /minijam/reference/host-calls
---

# Host Calls

Host calls expose controlled capabilities to a service running in PVM. A service must use only calls supported by the target MiniJAM runtime. Unsupported calls fail explicitly; they are not silently emulated as protocol compatibility.

The matrix below is derived from the current [MiniJAM SDK host header](https://github.com/ArcheLabs/minijam-client/blob/main/service-toolchain/sdk/include/minijam/host.h) and the [Jambda host-call table](https://github.com/ArcheLabs/minijam-client/blob/main/external/jambda/crates/state-backend/src/mutators/call_table.rs). It is a Stage 0 reference, not a promise of complete JAM host-call coverage.

| Index | Name | Context | Status | Input / output | Error boundary |
| ---: | --- | --- | --- | --- | --- |
| 0 | `GAS` | Refine / Accumulate | Supported | Returns remaining gas | Gas exhaustion is handled by the execution engine |
| 1 | `FETCH` | Refine / Accumulate | Supported | Fetches declared work data through the execution context | Missing or invalid data is reported by the backend |
| 2 | `LOOKUP` | Accumulate | Runtime-supported | Looks up preimage data | Backend lookup errors become host-call errors |
| 3 | `READ` | Accumulate | Runtime-supported | Reads service storage | Invalid storage access becomes a host-call error |
| 4 | `WRITE` | Accumulate | Runtime-supported | Writes service storage | Invalid storage access becomes a host-call error |
| 18 | `NEW` | Accumulate | Runtime-supported | Creates a service through the runtime context | Runtime validation errors are returned |
| 20 | `TRANSFER` | Accumulate | Runtime-supported | Transfers service-context assets | Balance and runtime validation errors are returned |
| 25 | `YIELD` | Accumulate | Runtime-supported | Yields the accumulation result | Invalid result state becomes a host-call error |
| 100 | `LOG` | Refine / Accumulate | Supported | Emits a JIP-1 log message | Invalid guest memory is rejected by the VM boundary |

The public C SDK currently exposes `GAS`, `FETCH`, `READ`, `WRITE`, `NEW`, `TRANSFER`, `YIELD`, and `LOG`. Other runtime host calls are not automatically available to SDK services. Check the exact target runtime and ABI before using them.

Unknown calls return the runtime's unknown-host-call behavior. The implementation may expand this table as the protocol surface becomes stable; future automation should generate it from the Rust constants and SDK declarations.
