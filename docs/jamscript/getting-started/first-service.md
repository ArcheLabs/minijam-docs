---
title: Your First JamScript Service
description: Understand a small stateful JamScript Service from source to query.
---

# Your First JamScript Service

Here is a small stateful Service using the current released JamScript path:

```ts
import { action, wallet, stateMap, query, address, u32 } from "jam";

const counters = stateMap({
  schema: "counter/v1",
  key: address,
  value: u32,
});

export const increment = action({
  auth: wallet(),
  input: { amount: u32 },
  execute(ctx, input) {
    const old = counters.get(ctx.sender);
    counters.set(
      ctx.sender,
      old === null ? input.amount : old + input.amount,
    );
  },
});

export const getCounter = query(counters);
```

## Read the example

`stateMap` declares authenticated application state. Its keys are `address`
values and its values are `u32` values. `schema` is part of the state
identity; give it a versioned name and do not silently change its meaning later.

`wallet()` requires an authenticated JamScript action. The runtime verifies
the ownership/controller proof before the action body runs, and exposes the
verified sender through the execution context.

`get` returns `null` when a key is absent. `set` writes to the action's
transactional state view; failed actions do not commit partial state changes.

`query(counters)` publishes a typed query description that the client can use
to read finalized managed state.

## Build it

If JamScript is not installed yet:

```bash
curl -fsSL https://install.minijam.xyz/jamscript | bash
```

Then, from the project directory:

```bash
jams check .
jams abi .
jams build . --output dist
jams inspect dist
```

You can validate the built PVM locally with:

```bash
jams run dist/service.pvm
```

The installer already provides the managed compiler/toolchain. You do not need
a JamScript source checkout for normal application development.

Continue with [State](../language/state.md),
[Types and data](../language/types-and-data.md), and
[Deployment](../deployment/index.md).
