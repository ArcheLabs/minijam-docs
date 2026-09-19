---
title: JamScript Language Overview
description: The language and Service model implemented by JamScript 0.2.
---

# JamScript Language Overview

JamScript `0.2` is a deliberately small TypeScript-like language. It keeps the
parts of JavaScript that are useful for deterministic application logic and
adds a typed vocabulary for JAM boundaries.

```ts
import { action, wallet, stateMap, address, u32 } from "jam";

const balances = stateMap({
  schema: "balances/v1",
  key: address,
  value: u32,
});

export const credit = action({
  auth: wallet(),
  input: { amount: u32 },
  execute(ctx, input) {
    const old = balances.get(ctx.sender);
    balances.set(ctx.sender, old === null ? input.amount : old + input.amount);
  },
});
```

## The four pieces you use most

| Piece | What it does |
|---|---|
| `action({...})` | Declares a callable Service entry point, its auth mode, input fields, and `execute(ctx, input)` body. |
| `wallet()` | Requires a signed wallet action and provides the verified sender as `ctx.sender`. |
| `publicAction()` | Accepts a raw payload without a signer. The current language path supports one public action only. |
| `state(...)` / `stateMap(...)` | Declares persistent managed state with an explicit schema and bounded types. |
| `query(state)` | Adds client metadata for proof-backed reads of one declared state value. |
| `abort(code)` | Stops the current action with an application error code from `1` through `0x00ffffff`. |

Application code runs inside `execute`. The current `ctx` contains `sender` for
wallet actions; it is not a general runtime object and does not expose a clock,
network handle, or arbitrary storage handle.

## What belongs at the top level

The parser accepts named imports, descriptor/state constants, helper function
declarations, and exported `const` declarations whose initializer is
`action(...)` or `query(...)`.

Use descriptor constants instead of TypeScript-only type aliases:

```ts
import { stateMap, address, bytes, u32, record } from "jam";

const Entry = record({ owner: address, amount: u32 });
const entries = stateMap({ schema: "entries/v1", key: bytes(32), value: Entry });
```

Default imports, namespace imports, top-level executable statements,
destructuring declarations, object spreads in schemas, and arbitrary module
imports are outside the current source grammar. See [Supported JavaScript](./supported-javascript.md)
for the practical compiler boundary.

## Action output and persistence

The current ScriptC M2 path treats an action's application output as `unit`.
Actions communicate useful results by changing managed state; clients query
that state after finalization. Local variables and ordinary allocations are
discarded at the end of execution.

The compiler extracts metadata into a typed IR, compiles the action body with
ScriptC M2, generates the Rust runtime wrapper, and links the final JamV1
PolkaVM artifact. Application authors do not implement `minijam_refine` or
`minijam_accumulate` themselves.
