---
title: JamScript Compatibility Matrix
description: Verified versions for the Formal V1 MiniJAM toolchain.
---

# JamScript Compatibility Matrix

| Component | Verified baseline |
|---|---|
| JamScript source language | `0.2` |
| JamScript workspace | `0.1.0` packages; HEAD `23f3adac02eb1648e4005586190dee6715c994c8` |
| ScriptC | `0.0.34`, revision `d7b4480`, M2 backend |
| Node.js | `24.x`; pin `24.15.0` |
| Rust | `1.88` |
| PolkaVM linker | `0.30.0` |
| Application / SDK ABI | `1` / `1` |
| `jam-codec` | `0.1.1` |
| target adapter | `minijam-0.2` |
| MiniJAM | locked baseline `18de55e175abb1cb40679be2e538644e2387655f` |
| Jambda | compatibility baseline `d33e0abf8116b23bbc551c6a8d7075eacb2994ce` |

The inspected standalone Jambda checkout is at `fe67ecf5ccbe16b3490d73cc4d8b1e48eb7bea86`; the release compatibility contract is instead the revision pinned by MiniJAM/JamScript. JamScript targets the MiniJAM ABI and does not currently claim direct full-JAM target compatibility.

Use the lockfiles and generated `build.json` for exact build identity. A changed source-language, ABI, state layout, codec, ScriptC surface, or target adapter needs explicit compatibility review.
