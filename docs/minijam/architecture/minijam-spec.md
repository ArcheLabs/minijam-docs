---
title: MiniJamSpec
description: The canonical MiniJAM network profile and its boundary from Runtime and Worker policy.
---

# MiniJamSpec

MiniJamSpec is MiniJAM's canonical network profile.

It is **not** JAM TinySpec, JAM FullSpec, or a MiniCells-specific workload profile.

The canonical definition is owned by the pinned Jambda revision consumed by MiniJAM. Production MiniJAM code imports that profile instead of duplicating its constants.

## Layers

| Layer | Examples | Meaning |
|---|---|---|
| MiniJamSpec | validators, cores, slot/epoch parameters, gas envelopes | canonical network profile |
| Runtime policy | admission budgets, deadlines, pending-work limits | MiniJAM Runtime behavior |
| Worker policy | execution lanes, caches, scheduling | local operator choice |
| Application ABI | Service payloads, PVM entry points | JamScript / Service boundary |

Changing Worker concurrency must not silently become a consensus change. Applications likewise must not compile MiniJamSpec constants into their ABI.

## Canonical values

This site does not maintain a second hand-copied constant table. Use the canonical [MiniJamSpec documentation](https://github.com/ArcheLabs/minijam-client/blob/main/docs/minijam-spec.md) and [compatibility matrix](https://github.com/ArcheLabs/minijam-client/blob/main/docs/compatibility-matrix.md).
