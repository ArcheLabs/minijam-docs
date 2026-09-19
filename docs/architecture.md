---
title: Architecture at a Glance
slug: /architecture
sidebar_position: 2
---

# Architecture at a Glance

The project is easiest to understand as three layers built around JAM's execution model.

~~~text
                         JAM execution model
                                │
                 ┌──────────────┴──────────────┐
                 │                             │
          MiniJamSpec / MiniJAM          Application boundary
                 │                             │
      ┌──────────┼──────────┐              JamScript
      │          │          │          ┌───────┼────────┐
    Node       Worker    Formal RPC   Language Runtime  Tooling
      │          │          │               │
      └──────────┴──────────┘        Managed State / Ownership
                 │                             │
           Stage-1 network             Backend / Client
                 └──────────────┬──────────────┘
                                │
                           Applications

                       MINI ecosystem layer
                 incentives / markets / governance
~~~

## MiniJAM: network and execution

MiniJAM is an independent network with a deliberately bounded JAM-compatible execution surface. Stage-1 is the supported deployment line. MiniJamSpec defines the network profile, while Runtime policy and Worker-local policy remain separate layers.

MiniJAM is not defined by the historical Playground and it is not a copy of JAM FullSpec.

## JamScript: application stack

JamScript sits above the network boundary. It provides a deterministic TypeScript-like source language, compiler/toolchain, application ABI, managed state, ownership primitives, deployment, backend, and client interfaces.

Normal application code should not need to understand Worker scheduling or construct storage proofs manually.

## MINI: ecosystem and economic layer

MINI is the economic and coordination layer around the network and its ecosystem: launch, incentives, liquidity, project markets, public goods, and governance can evolve here.

This separation does not make MINI secondary. It allows the economic system to evolve without silently changing MiniJAM consensus constants or JamScript ABI rules.

## Applications

JAM OS, Locus, MiniCells, and future Services consume these lower layers. They are applications and workloads, not definitions of MiniJAM consensus or JamScript itself.
