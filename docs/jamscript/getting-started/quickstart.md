---
title: JamScript Quickstart
description: Create, check, and build a JamScript 0.2 Service.
---

# JamScript Quickstart

This walkthrough creates a small counter Service, checks its ABI, builds a
JamV1 PVM artifact, and verifies the resulting bundle. The example uses a
`u32` counter because it is supported by the current ScriptC M2 executable
codec.

## 1. Install the CLI

For a published release, use the `jams` binary and run
`jams toolchain install` once. From the repository checkout, follow the
[contributor installation](./installation.md#repository-checkout-contributor-mode)
and use `./target/debug/jams` below.

```bash
cd JamScript
export JAMSCRIPT_DEV_TOOLCHAIN=1
```

## 2. Create a project

```bash
./target/debug/jams new hello-jam
./target/debug/jams check hello-jam
./target/debug/jams abi hello-jam
```

`new` creates:

```text
hello-jam/
├── jamscript.toml
├── src/service.ts
└── .jamscript/service.json
```

The identity file contains a generated `serviceKey` and `instanceId`. Keep it
with the project: changing it creates a different Service identity.

## 3. Use a buildable first Service

Replace `hello-jam/src/service.ts` with this example:

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

The action changes managed state; it does not return a value. In the current M2
service path, ScriptC action output is `unit`, so clients read the resulting
counter through `getCounter` after the Work is finalized.

Check the project again:

```bash
./target/debug/jams check hello-jam
./target/debug/jams abi hello-jam
```

## 4. Build the Service

The default `deployer` management mode needs a 32-byte wallet public key. Use
the account that will control management operations, not the Service key:

```bash
export JAMSCRIPT_DEPLOYER_ACCOUNT=0xYOUR_64_HEX_CHARACTER_PUBLIC_KEY
./target/debug/jams build hello-jam --output hello-jam/dist
```

With a published CLI, the equivalent command is:

```bash
jams build hello-jam --output hello-jam/dist --offline
```

The build output contains the executable artifacts and their metadata:

```text
service.elf
service.polkavm
service.pvm
service.blob
service.abi.json
build.json
protocol-v0.json
builder.json
checksums.json
generated_service.rs
generated_builder_application.rs
```

Inspect the bundle and run the local PVM validation aid:

```bash
./target/debug/jams inspect hello-jam/dist
./target/debug/jams run hello-jam/dist/service.pvm
```

`inspect` verifies the bundle checksums. `run` executes the artifact with the
deterministic local interpreter; it is not a network deployment command.

:::info Deployment is a separate step

JamScript produces the Service artifact. Submitting Work, waiting for
finalization, and querying the finalized state belong to the MiniJAM/client
workflow described in the [MiniJAM developer guide](/docs/minijam/developers/quickstart).

:::
