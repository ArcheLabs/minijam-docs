---
title: JamScript Overview
description: Build deterministic JAM Services with JamScript language 0.2.
slug: /jamscript
---

# JamScript

JamScript is a deterministic TypeScript-based language for building JAM Services. Language `0.2` compiles through the pinned ScriptC backend into a PVM program; MiniJAM is the current supported target.

```ts
import { action, wallet, u64 } from "jam";

export const increment = action({
  auth: wallet(),
  input: { value: u64 },
  execute(ctx, input) {
    return input.value + 1;
  },
});
```

```text
JamScript source → compiler + ScriptC → PVM program → JAM Service → MiniJAM
```

JamScript provides bounded ABI types, authenticated actions, managed persistent state, and generated Refine and Accumulate entry points. It deliberately excludes ambient, nondeterministic platform APIs.

:::warning Pre-stable
Language `0.2` is the only supported source language. The toolchain and public surfaces are evolving; development versions before Formal V1 are not compatibility contracts.
:::

Start with the [Quickstart](./getting-started/quickstart.md), then see [Supported JavaScript](./language/supported-javascript.md) and the [execution model](./runtime/execution-model.md).
