---
title: JamScript Runtime ABI
description: Current application, runtime, and MiniJAM target ABI versions.
---

# JamScript Runtime ABI

| Boundary | Current value |
|---|---|
| Source language | `0.2` |
| Application ABI | `1` |
| Native C ABI | `1` |
| Signed action | Formal `SignedActionV1` |
| Managed-state protocol/layout | `1` / `1` |
| Runtime Refine input | `1` |
| Recovery format | `1` |
| Target adapter | `minijam-0.2` |
| MiniJAM SDK ABI | `1` |

The public PVM exports are `minijam_refine` and `minijam_accumulate`. Refine returns output pointer/size in `a0/a1`; Accumulate starts with an encoded input pointer/size in `a0/a1` and has no output registers. MiniJAM host calls supply payloads, operands, storage, gas, and logging.

Application data uses the generated descriptor and Jambda `jam-codec 0.1.1` rules. Fixed integers are little-endian; bounded dynamic values use JAM general-natural lengths. Decoders reject malformed tags, invalid UTF-8, out-of-bound values, trailing bytes, and incomplete values.

`build.json`, `protocol-v0.json`, and `service.abi.json` are the artifact-level sources of truth. Formal V1 is the first supported wire/runtime protocol, but JamScript overall remains pre-stable.
