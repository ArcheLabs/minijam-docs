---
title: JamScript State
description: Persistent managed state and execution-local memory in JamScript Services.
---

# JamScript State

JamScript separates four kinds of data:

| Data | Lifetime |
|---|---|
| Action input | One invocation |
| Local variables and allocations | One execution |
| Action output / Work Result | Passed from Refine to Accumulate |
| Managed Service state | Persistent, authenticated by a committed trie root |

Declare bounded persistent state with `state(...)` or `stateMap(...)`:

```ts
const scores = stateMap({
  schema: "scores/v1",
  key: address,
  value: u64,
});

const old = scores.get(ctx.sender);
scores.set(ctx.sender, old ? old + 1n : 1n);
```

Refine reads a proof-backed historical state view and produces a canonical transition. Accumulate compares the parent root, checks expiry, and writes only the runtime-owned `:jam-service-runtime:managed-state:v1` root commitment into JAM/MiniJAM storage. Schema changes are migrations; the runtime does not rewrite state automatically.
