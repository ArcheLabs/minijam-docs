---
title: JamScript Quickstart
description: Install JamScript, create a Service, build it, and deploy it to MiniJAM.
---

# JamScript Quickstart

This walkthrough installs JamScript, creates a small Service, builds its PVM
artifacts, and deploys it to a configured MiniJAM network.

## 1. Install JamScript

```bash
curl -fsSL https://install.minijam.xyz/jamscript | bash
```

Verify the managed toolchain:

```bash
jams --version
jams toolchain verify
```

The installer also installs the matching native JamScript backend. See
[Installation](./installation.md) for version pinning and platform details.

## 2. Create a project

```bash
jams new hello-jam
jams check hello-jam
jams abi hello-jam
```

The project contains the manifest, Service source, and persistent Service
identity. Keep the identity with the project: regenerating it creates a
different logical Service identity.

## 3. Add a counter Service

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
    const current = counters.get(ctx.sender);
    counters.set(
      ctx.sender,
      current === null ? input.amount : current + input.amount,
    );
  },
});

export const getCounter = query(counters);
```

Check the project again:

```bash
jams check hello-jam
jams abi hello-jam
```

## 4. Build and inspect

```bash
jams build hello-jam --output hello-jam/dist
jams inspect hello-jam/dist
jams run hello-jam/dist/service.pvm
```

`jams run` is a deterministic local PVM validation aid. It is not a network
deployment command.

After the managed toolchain is installed, add `--offline` to `jams build`
when you want to forbid toolchain downloads.

## 5. Configure MiniJAM

Configure a named MiniJAM network in the project. For a local published network,
see [Run MiniJAM locally with Docker](../../minijam/developers/local-docker.md).

Inspect the selected network:

```bash
jams network list hello-jam
jams network show local hello-jam
```

Use the endpoints and genesis identity supplied by the matching MiniJAM release;
do not copy unrelated RPC values from an old tutorial.

## 6. Start the backend

In a separate terminal:

```bash
cd hello-jam
jams backend start --network local
```

The backend installed by the JamScript installer is used automatically.

## 7. Deploy

```bash
jams deploy hello-jam --network local --artifact hello-jam/dist
```

Building and deployment are separate operations. The built bundle remains
network-independent; deployment selects the target network explicitly.

Continue with [Deployment](../deployment/index.md), [Backend](../backend/index.md),
and [Client](../client/index.md).

:::info Stage-0 Playground

The historical browser Playground is no longer the default JamScript/MiniJAM
development path. Its documentation remains in the legacy section.

:::
