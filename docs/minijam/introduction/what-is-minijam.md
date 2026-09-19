---
id: what-is-minijam
title: What is MiniJAM?
slug: /minijam/introduction/what-is-minijam
sidebar_position: 1
---

# What is MiniJAM?

MiniJAM is an independent network for running a deliberately bounded JAM-compatible execution model before the broader JAM environment is available.

The supported implementation line is **Stage-1**. MiniJAM currently uses a Polkadot SDK chain as its host environment and Jambda for JAM execution components, while keeping the network profile, execution boundary, and application ABI explicit.

~~~text
Service code
    ↓
Work Package
    ↓
Refine
    ↓
Work Report
    ↓
verification / voting
    ↓
Accumulate
    ↓
canonical state transition
~~~

## What MiniJAM is not

MiniJAM is not the historical Stage-0 Playground, although that environment was useful for early validation.

MiniJAM is also not JAM TinySpec or JAM FullSpec. The network has its own canonical profile, **MiniJamSpec**, and deliberately separates network constants, Runtime policy, Worker-local policy, and the application ABI.

See [MiniJamSpec](../architecture/minijam-spec.md) and [Execution Boundary](../architecture/execution-boundary.md).

## Why MiniJAM exists

JAM protocol implementations, developer tooling, and applications mature on different timelines. MiniJAM allows the application and infrastructure ecosystem to be built and tested earlier while preserving a path toward broader JAM compatibility.

## Relationship with JamScript

MiniJAM provides the network. JamScript provides the recommended application stack.

Application developers normally start with [JamScript](../../jamscript/index.md), while node, Worker, infrastructure, and protocol developers start with MiniJAM.

## Long-term direction

The long-term direction remains to keep application and tooling boundaries useful as JAM matures, allow suitable Services to migrate, and let MiniJAM continue as a specialized or JAM-connected/L2 execution environment where that model remains useful.

This is a direction, not a claim that MiniJAM implements the full JAM protocol today.
