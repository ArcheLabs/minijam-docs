---
title: JamScript Execution Model
description: How JamScript source becomes a deterministic JamV1 PVM Service.
---

# JamScript Execution Model

## Build pipeline

```text
service.ts
  → parser + TypeIr metadata
  → ScriptC M2 transformed TypeScript/C
  → generated Rust runtime wrapper
  → freestanding riscv64/lp64e ELF
  → PolkaVM program
  → JamV1 PVM/blob
```

The parser extracts actions, state schemas, queries, authentication, and ABI
types. ScriptC M2 compiles the application body. Generated Rust owns the
protocol-sensitive work: SignedActionV1 validation, state-view handling,
transaction boundaries, result encoding, and the Refine/Accumulate exports.

The final target is JamV1. The target SDK used for a canonical build is owned
by the JamScript toolchain bundle, so a MiniJAM checkout is not a compiler
dependency.

## Runtime pipeline

```text
Work payload
  → Refine verifies and executes the action
  → versioned transition + receipts
  → Accumulate checks the transition
  → managed-state root commitment
```

Refine sees a historical, proof-backed state view and produces a deterministic
state diff/root transition. Accumulate consumes ordered Refine results and
publishes the new root only when the parent root and validity checks match.
Application code is not run a second time during Accumulate.

## Generated outputs

`jams build` writes the PVM artifacts plus the files developers need to inspect:

- `service.abi.json`: action, query, state, and type descriptors;
- `build.json`: compiler, target, code, ABI, and toolchain identity;
- `protocol-v0.json`: the current Formal V1/developer-preview boundary;
- `builder.json`: the portable producer-side application metadata;
- `generated_service.rs` and `generated_builder_application.rs`;
- `checksums.json`: hashes for the bundle files;
- `scriptc/`: relocatable ScriptC source, profile, runtime, and generated C.

Treat these files as build evidence. Application code should depend on the
source API and the generated ABI, not on generated Rust function names.
