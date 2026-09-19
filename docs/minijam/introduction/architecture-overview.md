---
id: architecture-overview
title: Architecture Overview
slug: /minijam/introduction/architecture-overview
sidebar_position: 3
---

# Architecture Overview

Stage-1 separates network responsibilities from the application layer.

~~~text
Application / JamScript
        │
        v
Formal RPC / deployment boundary
        │
        ├───────────────┐
        v               v
      Node            Worker
  Runtime/state     Refine execution
        │               │
        └──── Work Reports / votes ────┐
                                        v
                                Runtime / Jambda
                                   Accumulate
                                        │
                                        v
                                canonical state
~~~

## Node and Runtime

The node provides the chain, finality, Runtime, safe JSON-RPC surface, and canonical protocol coordination state. The Runtime integrates Jambda execution components and applies network state-transition rules.

## Worker

Workers execute the off-chain Refine path, fetch required inputs, and submit protocol results using their own signing identity. Worker concurrency is a local scheduling choice, not the same thing as MiniJamSpec core count.

## Formal RPC

Formal RPC is the application-neutral Work and bundle gateway. It owns Work-ingress and bundle-facing responsibilities, but it is not JamScript's application backend and is not the source of canonical application state.

## Application layer

JamScript compiles Services against a stable application boundary instead of embedding MiniJamSpec constants. Managed application state is committed through the Service's canonical chain state while backend/provider components make it practical to query and prove.

Exact protocol fields and version numbers belong to the implementation repositories. See [Compatibility and Source of Truth](../../reference/compatibility.md).
