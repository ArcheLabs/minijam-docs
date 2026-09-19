---
title: JamScript State
description: Persistent managed state, state maps, queries, and state-safe execution.
---

# JamScript State

JamScript separates temporary execution data from authenticated persistent
state:

| Data | Lifetime |
|---|---|
| Action input | One invocation |
| Local variables and allocations | One execution |
| State overlay | One attempted transition |
| Managed Service state | Persistent, selected by a committed trie root |

## Scalar state

Use `state` when a Service has one value:

```ts
import { action, wallet, state, query, u32 } from "jam";

const total = state({ schema: "total/v1", value: u32 });

export const add = action({
  auth: wallet(),
  input: { amount: u32 },
  execute(_ctx, input) {
    const old = total.get();
    total.set(old === null ? input.amount : old + input.amount);
  },
});

export const getTotal = query(total);
```

Scalar state has an implicit empty key. `get()` returns `null` before the first
value is written.

## State maps

Use `stateMap` when values are addressed by a typed key:

```ts
import { action, wallet, stateMap, query, address, bytes, u32, record } from "jam";

const profiles = stateMap({
  schema: "profile/v1",
  key: address,
  value: record({ name: bytes(32), score: u32 }),
});

export const updateProfile = action({
  auth: wallet(),
  input: { name: bytes(32) },
  execute(ctx, input) {
    const profile = profiles.get(ctx.sender);
    if (profile === null) {
      profiles.set(ctx.sender, { name: input.name, score: 0 });
    } else {
      profiles.set(ctx.sender, { name: input.name, score: profile.score + 1 });
    }
  },
});

export const getProfile = query(profiles);
```

`get` and `has` distinguish a known absent value from a missing state witness.
`set` and `delete` are transactional. Calling `abort(code)`, encountering an
invalid proof, or hitting a fatal application error does not leave a partial
write behind.

## State schemas are part of identity

`schema` must be a non-empty ASCII string of at most 64 bytes and must be unique
within the Service. It is embedded in the managed application key:

```text
0x01 || little-endian namespace length || schema || canonical user key
```

Application keys are not hashed, and the Service ID is not added to them: each
Service already owns its own managed trie. Runtime-owned keys use a separate
internal namespace and are not writable through application bindings.

Treat a schema change as a migration. Changing field order, value type, or the
meaning of an existing schema changes the state identity; the runtime does not
rewrite old values automatically.

## Proof-backed reads

Refine executes against a state view anchored to a declared parent root. The
builder records the keys the application actually touches and includes the
corresponding proof data. For dynamic access:

- a valid non-inclusion becomes `null` once the key is included in the witness;
- a key missing from the witness produces a `NeedState` dependency so the
  builder can request it and rerun the application;
- an invalid or incomplete proof is a validation failure, not an empty value.

Queries follow the same trust model. The client resolves the finalized managed
state root, asks a provider for that explicit `(Service, root, key)`, verifies
the proof locally, and only then decodes the value. Managed state never falls
back to arbitrary JAM Service KV reads.
