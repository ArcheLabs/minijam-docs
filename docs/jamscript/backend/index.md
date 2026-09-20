---
title: JamScript Backend
description: The application-facing state, Work, and network bridge for deployed JamScript Services.
---

# JamScript Backend

The JamScript backend is the application-facing endpoint between the typed
client and a JAM-compatible network.

It is **not** part of JAM/MiniJAM consensus and it is **not** Formal RPC.

```text
frontend / @jamscript/client
          │
          v
   JamScript Backend
      │        │
      │        └── materialized managed state
      │
      ├── Node / finalized Service state
      └── Formal RPC / Work path
```

## Installation

The normal JamScript installer installs the matching native backend together
with the CLI and managed toolchain:

```bash
curl -fsSL https://install.minijam.xyz/jamscript | bash
```

For a configured project/network, start it with:

```bash
jams backend start --network local
```

The process runs in the foreground. A separately installed backend can still be
selected through `PATH` or `JAMSCRIPT_BACKEND_BIN`.

## Canonicality rule

For a deployed Service, the canonical managed-state head is selected by
finalized Service state.

The backend's database and trie are local materializations used for application
access and execution. They do not replace the finalized chain state as the
source of canonicality.

## Multi-Service operation

One backend process can serve multiple Services, but mutable state, registry
records, and pending Work remain Service-scoped.

The current registry also maintains a unique mapping from `serviceKey` to
`serviceId`. Registering a different Service ID with a `serviceKey` already
bound in the same backend database is rejected. Independent Services should use
independent Service identities.

This is important when reusing a persistent backend data directory: deleting or
switching the data directory starts a fresh backend registry; it is not a
migration of the records stored in the previous directory.

## Persistent data

The release backend uses persistent storage. Treat the configured data directory
as durable backend state.

Do not copy a live database directory as if it were a safe backup, and do not
replace a production data directory merely to bypass a registry conflict. For
local test environments, a fresh directory is useful when an intentionally
fresh registry is desired.

## Trust boundary

Frontend convenience queries may use the backend directly. The backend is an
application service, not consensus. Applications that require stronger
independent verification should use the proof/verification paths supported by
the matching JamScript client and release.

For the exact implementation contract and RPC names, see
[JamScript Service Backend V1](https://github.com/ArcheLabs/JamScript/blob/main/docs/service-backend-v1.md).
