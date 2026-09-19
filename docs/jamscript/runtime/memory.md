---
title: JamScript Memory Model
description: Execution-local allocation and persistent-state boundaries.
---

# JamScript Memory Model

The generated Service runs in bounded PolkaVM linear memory. A JavaScript
object, array, string, `Uint8Array`, or local variable exists only for the
current execution. If data must survive a call, put it in managed state.

## Current runtime budgets

| Resource | Current boundary |
|---|---:|
| ScriptC guest heap | 64 KiB |
| Minimum PVM stack declared by the guest | 2 MiB |
| State-view entries | 4,096 |
| Encoded state view | 1 MiB |
| One state value | 64 KiB |
| One state key | 4 KiB |

The heap is reset at guest entry. `malloc`, `calloc`, `realloc`, and `free`
are provided as freestanding C-compatible symbols for ScriptC; they do not
request memory from an operating system. Exhausting the heap is a runtime
failure, not an invitation to grow it dynamically.

These are current target parameters, not a source-level compatibility promise.
Write bounded code, avoid building large temporary collections, and do not
depend on allocator addresses or object layout.

The action payload and generated result also have bounded runtime limits. The
compiler's maximum-encoded-length checks are the earliest and clearest place
to catch an oversized schema.
