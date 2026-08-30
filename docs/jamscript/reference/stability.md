---
title: JamScript Stability Policy
description: Stability levels and breaking-change expectations for JamScript.
---

# JamScript Stability Policy

JamScript is pre-stable. The following labels describe current expectations.

| Level | Meaning | Current examples |
|---|---|---|
| Stable within Formal V1 | Changes require a versioned boundary | SignedActionV1 encoding, application ABI 1 descriptors, managed-state layout 1 |
| Experimental | Usable but may change with migration notes | Language `0.2`, CLI, ScriptC M2 integration, configuration |
| Internal | No application compatibility promise | Generated Rust/C internals, allocator layout, build staging files |
| Deprecated | Retained temporarily, avoid new use | Manifest `service_id` and legacy `genesis_hash` spelling |

Formal V1 is the first supported wire/runtime protocol; earlier development generations are not contracts. Source compatibility is narrower than TypeScript compatibility and may change before a stable language release. Pin repository and lockfile revisions for reproducible builds, inspect generated metadata, and treat schema changes as explicit state migrations.
