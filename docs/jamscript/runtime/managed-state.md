---
title: Managed State
description: Authenticated application state, canonical roots, proofs, and the backend materialization boundary.
---

# Managed State

JamScript managed state gives each Service an authenticated application-state tree.

The important distinction is between **canonicality** and **availability**:

~~~text
finalized Service state
        │
        │ commits canonical managed-state root
        v
managed-state root
        │
        ├──── backend materialized state
        └──── proofs / historical snapshots
~~~

The backend may materialize and retain state so applications can query it efficiently, but its local head is not canonical merely because it exists.

## Canonical root

The canonical managed-state head is the commitment stored in the Service's finalized native state. A backend must compare its durable/materialized head with that commitment before serving canonical state.

If the canonical root is not materialized, the correct behavior is to fail rather than return a stale value.

## Refine

Refine consumes authenticated state witnesses and verifies them locally against the declared root before application execution uses the value.

Application code should use typed state access rather than constructing proof objects manually.

## Accumulate

Accumulate is the canonicality gate. It checks that the parent state root and any committed external Service roots are still current before advancing a transition.

This prevents a transition refined against stale state from being committed as if it were current.

## Client queries

Frontend/client queries can use two models:

- **trusted backend** — simpler value queries after the backend confirms its local head matches the canonical finalized root;
- **proof verification** — return a value plus storage proof and verify it locally against the canonical root.

The consensus and Refine/Accumulate execution path does not become proofless simply because a frontend chooses convenience queries.

For the implementation contract, see [Managed State V1](https://github.com/ArcheLabs/JamScript/blob/main/docs/managed-state.md) and [Service Backend V1](https://github.com/ArcheLabs/JamScript/blob/main/docs/service-backend-v1.md).
