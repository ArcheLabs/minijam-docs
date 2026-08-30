---
title: Your First JamScript Service
description: Understand the generated counter Service from source to state transition.
---

# Your First JamScript Service

The generated project contains one action:

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

`wallet()` requires a valid Formal V1 signed action. The `u64` descriptor makes input bounded and fixes its wire representation. The compiler assigns an action selector and emits it in `service.abi.json`.

```text
signed input → generated Refine entry → authenticate and execute → Work Result
Work Result → generated Accumulate entry → validate root/expiry → commit state root
```

This smallest example returns a computed result but declares no persistent application state. For persistence, declare a `state(...)` or `stateMap(...)`; managed state is authenticated during Refine and only its reserved root commitment is written during Accumulate.

Build it with the commands in the [Quickstart](./quickstart.md). Continue with [State](../language/state.md), [Refine and Accumulate](../runtime/refine-and-accumulate.md), [Supported JavaScript](../language/supported-javascript.md), and the [compiler](../tooling/compiler.md).
