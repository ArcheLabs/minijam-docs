---
title: JamScript Backend
description: The application-facing state, Work, and network bridge for deployed JamScript Services.
---

# JamScript Backend

The JamScript backend is the application-facing endpoint between the typed client and a JAM-compatible network.

It is **not** part of JAM/MiniJAM consensus and it is **not** Formal RPC.

~~~text
frontend / @jamscript/client
          │
          v
   JamScript Backend
      │        │
      │        └── materialized managed state
      │
      ├── Node / finalized Service state
      └── Formal RPC / Work path
~~~

## Canonicality rule

For a deployed Service, the canonical managed-state head is the root committed by finalized Service state.

The backend's local database and trie are availability/proof/execution materializations. Before serving canonical state, the backend must ensure its durable head matches the chain-selected commitment.

This means a backend cannot make stale state canonical by returning it.

## One endpoint does not mean one trust boundary

Frontend convenience queries can default to a trusted-backend mode.

Refine still verifies authenticated state witnesses, and Accumulate still revalidates canonical roots before committing transitions. Clients can also request proof-backed state queries for independent verification.

## Multi-Service operation

One backend process can serve multiple Services, but mutable state and pending Work must remain Service-scoped. Service identity, code identity, state roots, and package/work keys cannot be mixed across Services.

## Operations

The release backend uses persistent storage and exposes liveness/readiness endpoints. Treat the data directory as durable service state and do not copy a live database as if it were a safe backup.

For the exact implementation contract and RPC names, see [JamScript Service Backend V1](https://github.com/ArcheLabs/JamScript/blob/main/docs/service-backend-v1.md).
