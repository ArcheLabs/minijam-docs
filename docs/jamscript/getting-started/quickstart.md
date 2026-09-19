---
title: JamScript Quickstart
description: Create, check, build, and prepare to deploy a JamScript Service.
---

# JamScript Quickstart

This walkthrough creates a small counter Service, checks its ABI, builds a PVM artifact, and verifies the resulting bundle. The example intentionally uses the conservative executable subset supported by the selected release line.

## 1. Install the CLI

For a published release, install the **jams** CLI and its managed toolchain. See [Installation](./installation.md).

## 2. Create a project

~~~bash
jams new hello-jam
jams check hello-jam
jams abi hello-jam
~~~

The project includes a manifest, Service source, and a persistent Service identity file. Keep the identity with the project: regenerating it creates a different logical Service identity.

## 3. Add a counter Service

~~~ts
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
~~~

Run checks again:

~~~bash
jams check hello-jam
jams abi hello-jam
~~~

## 4. Build and validate

Configure the management controller required by your selected release/project policy, then build:

~~~bash
jams build hello-jam --output hello-jam/dist --offline
jams inspect hello-jam/dist
jams run hello-jam/dist/service.pvm
~~~

**run** is a deterministic local PVM validation aid. It is not network deployment.

## 5. Deploy explicitly

Deployment is a separate step. Configure a named MiniJAM network, inspect it, and deploy the already-built artifact:

~~~bash
jams network list
jams network show local
jams deploy hello-jam --network local --artifact hello-jam/dist
~~~

Do not copy generic RPC ports blindly: use the endpoints and genesis identity supplied by the matching Stage-1/release environment.

Continue with [Deployment](../deployment/index.md), then use the [Backend](../backend/index.md) and [Client](../client/index.md) for application access.

:::info Stage-0 Playground

The historical browser Playground is no longer the default JamScript/MiniJAM development path. It is kept under the MiniJAM legacy documentation.

:::
