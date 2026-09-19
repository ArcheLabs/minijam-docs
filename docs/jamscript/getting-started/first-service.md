---
title: Your First JamScript Service
description: Understand a small stateful JamScript Service from source to query.
---

# Your First JamScript Service

Here is the smallest useful stateful Service in the current ScriptC M2 path:

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

`stateMap` declares an authenticated map. Its keys are `address` values and
its values are `u32` values. `schema` is part of the state identity; give it a
versioned name and do not silently change its meaning later.

`wallet()` means the action must arrive as a Formal `SignedActionV1`. The
runtime verifies the network domain, Service key, action selector, payload
hash, sr25519 signature, expiry, and the sender's sequential nonce before the
body runs. `ctx.sender` is the verified 32-byte wallet address.

`get` returns `null` when a key is absent. `set` writes to a transaction overlay;
the change becomes persistent only when the Refine/Accumulate transition is
accepted. If the action calls `abort(code)` or fails, its state changes are
rolled back.

`query(counters)` publishes a client-readable description of the map. A query
does not execute application code and does not mutate state. The client reads
the finalized managed-state root, verifies a proof for the requested key, and
then decodes the value.

## Why the action has no `return`

The current M2 service runtime uses `executeOutput: unit`. The useful result of
this example is the state transition, which clients read through
`getCounter`. The return expression shown in older counter examples belongs to
an earlier compiler path and should not be used as an application output in a
current `0.2` Service.

## Build it

```bash
export JAMSCRIPT_DEV_TOOLCHAIN=1
export JAMSCRIPT_DEPLOYER_ACCOUNT=0xYOUR_64_HEX_CHARACTER_PUBLIC_KEY
./target/debug/jams check .
./target/debug/jams abi .
./target/debug/jams build . --output dist
```

For the release workflow, replace `./target/debug/jams` with `jams` and add
`--offline` after the toolchain has been installed.

Continue with [State](../language/state.md), [Types and data](../language/types-and-data.md),
and [Refine and Accumulate](../runtime/refine-and-accumulate.md).
