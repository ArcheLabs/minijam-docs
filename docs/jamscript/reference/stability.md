---
title: JamScript Stability Policy
description: Stability levels and breaking-change expectations for JamScript.
---

# JamScript Stability Policy

JamScript is a developer preview. The labels below describe what you can safely
build around today.

| Level | Meaning | Current examples |
|---|---|---|
| Versioned protocol boundary | Wire changes require a versioned boundary | `SignedActionV1`, application ABI `1`, managed-state protocol/layout `1` |
| Preview API | Usable, but source or behavior may change | Language `0.2`, `jams` CLI, ScriptC M2, `jamscript.toml` |
| Generated/internal | Do not depend on names or layout | Generated Rust/C, allocator layout, build staging files, host-call details |
| Experimental | Present in plumbing but not end-to-end supported | Native C imports, broader M2 executable type surface |

Formal V1 is the first supported wire/runtime protocol. Development generations
before it are not compatibility contracts. Source compatibility is narrower than
general TypeScript compatibility.

For production-like work:

- pin the JamScript CLI/toolchain release and source revision;
- check `build.json` and `service.abi.json` into the artifact record;
- keep Service identity files stable;
- treat type/schema changes as migrations;
- use the current M2 executable subset unless you have verified a wider type in
  your exact toolchain.

Generated function names, heap size, register conventions, and intermediate
files may change without a language-version bump.
