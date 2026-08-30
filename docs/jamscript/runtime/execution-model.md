---
title: JamScript Execution Model
description: How JamScript source becomes a deterministic PVM Service.
---

# JamScript Execution Model

```text
service.ts → JamScript metadata IR + ScriptC M2 → generated runtime wrapper
           → RISC-V ELF → PolkaVM program → JamV1 PVM/blob
```

At build time, JamScript generates ABI metadata and the Service wrapper, compiles reachable TypeScript compute through ScriptC, and links a freestanding `riscv64/lp64e` guest. The MiniJAM converter emits `service.polkavm`, `service.pvm`, and `service.blob`.

At execution time, `minijam_refine` receives host-provided payload access, validates the Formal V1 signed action, reads an authenticated historical state view, runs the selected action, and returns a versioned result. `minijam_accumulate` receives the current tick and ordered Work Results, validates expiry and the parent-root compare-and-swap, then commits the new managed-state root.

MiniJAM is the current adapter. JamScript does not target the full JAM profile directly at this baseline.
