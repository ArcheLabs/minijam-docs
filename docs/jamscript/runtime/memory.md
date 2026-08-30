---
title: JamScript Memory Model
description: Execution-local allocation and persistent-state boundaries.
---

# JamScript Memory Model

The generated Service runs in bounded PVM linear memory. Ordinary variables, arrays, strings, objects, and typed arrays are execution-local and do not persist between calls. Persistent values must use managed state.

The freestanding runtime provides C-compatible `malloc`, `calloc`, `realloc`, and `free` symbols for ScriptC. They delegate to the guest allocator. Allocation is bounded; capacity exhaustion traps rather than requesting memory from an operating system. Freed blocks are marked, while reclamation and exact heap tuning remain runtime implementation details rather than a stable application API.

The production guest currently reserves a 64 KiB ScriptC heap, and the PVM build declares a 2 MiB minimum stack. These are current target parameters, not language guarantees. Application code should prefer bounded data and avoid relying on allocator addresses or object layout.
