---
title: JamScript Overview
description: Build deterministic JAM applications with the JamScript application stack.
slug: /jamscript
---

# JamScript

JamScript is a deterministic application stack for JAM Services.

It includes a TypeScript-like source language, compiler/toolchain, application ABI, managed state, ownership primitives, deployment, backend, and client interfaces. The goal is to let application developers work at the Service level without implementing JAM execution plumbing themselves.

~~~text
service.ts
   ↓
JamScript compiler / managed toolchain
   ↓
Service PVM artifact + ABI
   ↓
explicit deployment
   ↓
MiniJAM Stage-1
   ↓
JamScript backend
   ↓
typed client / frontend
~~~

## The layers

### Language and toolchain

You describe actions, bounded data, queries, authentication, and state in source code. The public command is **jams**. Canonical builds use a managed toolchain rather than requiring the application project to own Rust, LLVM, Node, or a MiniJAM checkout.

Start with the [Quickstart](./getting-started/quickstart.md).

### Application Runtime and Managed State

JamScript turns application state into authenticated managed state with a canonical root committed through the Service's chain state. Refine verifies execution against an anchored view; Accumulate accepts only valid transitions and advances the canonical commitment.

See [Managed State](./runtime/managed-state.md).

### Ownership

Ownership is a cryptographic control primitive that is deliberately separated from a specific chain account format. External ecosystems such as Polkadot, EVM, or Matrix can be adapters into that primitive without becoming new consensus account types.

See [Ownership Abstraction](./ownership/index.md).

### Deployment

Building and deploying are separate operations. A Service artifact is network-independent; deployment selects an explicit named network and verifies the target identity and artifact before creating the Service.

See [Deployment](./deployment/index.md).

### Backend and Client

The JamScript backend is the application-facing bridge to a JAM-compatible network. It is not part of consensus and it is not Formal RPC. It materializes state, builds/verifies the required execution inputs, submits Work through the network path, and serves client-facing state APIs.

The client can use the backend in a convenience mode or request proof-backed state verification.

See [Backend](./backend/index.md) and [Client](./client/index.md).

## Trust model

A backend can make application access easier, but it does not become the source of canonicality. Canonical managed-state roots are selected by finalized Service state. Refine proofs and Accumulate root checks protect the execution boundary independently from frontend convenience queries.

## Preview boundary

JamScript is still a developer-preview stack. The released toolchain and the main branch may move at different speeds. For an exact build, treat release artifacts, build metadata, and the source repository's compatibility documents as authoritative.

See [JamScript Compatibility](./reference/compatibility.md) and the site-wide [Source of Truth](../reference/compatibility.md).
