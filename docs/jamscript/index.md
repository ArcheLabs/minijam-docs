---
title: JamScript Overview
description: Build deterministic JAM Services with the JamScript 0.2 toolchain.
slug: /jamscript
---

# JamScript

JamScript is a TypeScript-like language and toolchain for building deterministic
JAM Services. You describe actions, bounded data, and managed state in
`service.ts`; `jams` turns that project into a PolkaVM/JAM artifact.

```text
service.ts → typed metadata + ScriptC M2 → generated runtime → JamV1 PVM/blob
```

The most important idea is that a Service is replayable. Its result depends
only on the signed action, the anchored managed state, and the code. There is
no browser, Node.js, filesystem, network, clock, or random-number API inside a
Service.

## Pick a starting point

| If you want to… | Start here |
|---|---|
| Build your first Service | [Quickstart](./getting-started/quickstart.md) |
| Understand the example line by line | [Your first Service](./getting-started/first-service.md) |
| Install the CLI and toolchain | [Installation](./getting-started/installation.md) |
| Design action and state data | [Types and data](./language/types-and-data.md) |
| Understand persistence | [State](./language/state.md) |
| Investigate a build error | [Supported JavaScript](./language/supported-javascript.md) and [Project configuration](./tooling/configuration.md) |

## The small mental model

- An **action** is the entry point a user or client calls. It declares its
  authentication mode and input schema.
- A **state map** is authenticated persistent storage owned by the Service.
  Reads and writes happen through the generated state binding.
- A **query** describes how a client reads a state value at a finalized state
  root. It is not an extra PVM entry point.
- **Refine** verifies and executes actions against an anchored state view.
  **Accumulate** accepts the resulting transition and commits the new state
  root; it does not run application code again.

:::warning Current preview boundary

Language `0.2` and the ScriptC M2 backend are the only supported source path,
and JamScript is still pre-stable. The public ABI descriptor is broader than
the current M2 executable codec subset; the [types guide](./language/types-and-data.md)
calls out the difference explicitly.

:::

The [MiniJAM developer guide](/docs/minijam/developers/quickstart) covers the
downstream network and deployment workflow. Compiling a JamScript Service does
not require a MiniJAM checkout.
