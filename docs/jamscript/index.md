---
title: JamScript Overview
description: Build JAM Services with a TypeScript-like developer experience.
slug: /jamscript
---

# JamScript

JamScript is a TypeScript-like language and toolchain for building JAM
Services. It hides low-level JAM/PVM plumbing behind a deterministic build
pipeline, typed application interfaces, managed state, Ownership, deployment,
and the `jams` CLI.

## Install

```bash
curl -fsSL https://install.minijam.xyz/jamscript | bash
```

The installer selects the latest published JamScript release and installs:

- the `jams` CLI;
- the managed compiler/toolchain;
- the matching native JamScript backend.

Current native release platforms are Linux x86_64 and macOS Apple Silicon.
See [Installation](./getting-started/installation.md) for version pinning and
manual installation.

```text
service.ts
   ↓
JamScript compiler / managed toolchain
   ↓
service.pvm + service.blob + ABI
   ↓
explicit deployment
   ↓
MiniJAM
   ↓
JamScript backend
   ↓
typed client / frontend
```

## Language and toolchain

Application developers describe actions, bounded data, queries, authentication,
and state in JamScript. Canonical release builds use the managed toolchain
instead of requiring each application project to maintain Rust, LLVM, Node, or
a MiniJAM source checkout.

Start with the [Quickstart](./getting-started/quickstart.md).

## Managed state

JamScript provides typed managed state for Services and connects application
execution to the finalized Service state selected by the network.

See [Managed State](./runtime/managed-state.md).

## Ownership

Ownership is a cryptographic control primitive separated from a single chain
account format. Different ecosystems can be represented through compatible
Ownership/controller adapters without redefining the JAM consensus account
model.

See [Ownership Abstraction](./ownership/index.md).

## Deployment

Building and deployment are separate operations. A Service artifact is built
first; deployment later selects an explicit configured network.

See [Deployment](./deployment/index.md).

## Backend and Client

The JamScript backend is an application-facing bridge to the network. It is not
consensus and it is not Formal RPC. The typed client uses it for application
submission and state access.

See [Backend](./backend/index.md) and [Client](./client/index.md).

## Preview boundary

JamScript v0.1 is currently an RC/testnet developer preview. Pin an exact release
when reproducibility matters, and keep `build.json`, the Service ABI, and
Service identity with deployed artifacts.

See [Compatibility](./reference/compatibility.md) and
[Stability Policy](./reference/stability.md).
