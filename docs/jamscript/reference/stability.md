---
title: JamScript Stability Policy
description: Stability levels and breaking-change expectations for JamScript.
---

# JamScript Stability Policy

JamScript v0.1 is an RC/testnet developer preview.

| Level | Meaning | Current examples |
|---|---|---|
| Versioned protocol boundary | Wire changes require an explicit versioned boundary | application ABI, managed-state formats, signed/ownership action formats |
| Preview API | Usable, but source or behavior may still change | JamScript language surface, `jams` CLI, `jamscript.toml`, Backend/Client convenience APIs |
| Generated/internal | Do not depend on names or layout | generated guest code, allocator layout, build staging files, host-call details |
| Experimental | Present but still being optimized or expanded | broader language coverage, numeric lowering, performance-specific compiler paths |

For reproducible work:

- pin an exact JamScript release;
- verify the managed toolchain;
- keep `build.json` and `service.abi.json` with the artifact record;
- keep the Service identity file stable;
- treat type/schema changes as migrations;
- run end-to-end checks against the exact MiniJAM/network release you deploy to.

## Current performance limitations

The current implementation uses the mature PolkaVM toolchain. This provides a
reliable execution foundation, but introduces efficiency overhead that is
expected to decrease as JamScript-specific tooling matures.

In the current ScriptC path, ordinary numeric computation can still use
floating-point `number` representation internally in some paths. Fixed-width
ABI types such as `u64` and `u128` remain explicit at Service boundaries,
but internal numeric lowering is not yet fully optimized.

Windows is not supported by the current native v0.1 release.

Generated function names, heap details, register conventions, and intermediate
files may change without a language-version bump.
