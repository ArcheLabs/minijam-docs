---
id: index
title: Documentation
slug: /
sidebar_position: 1
---

# MiniJAM Documentation

MiniJAM is the network and execution environment. JamScript is the application stack for building deterministic JAM Services. MINI is the ecosystem and economic layer that coordinates participation, incentives, and long-term network development.

These three layers are related, but they are not the same protocol boundary.

## Start here

### [Build an application with JamScript](./jamscript/index.md)

Use JamScript when you want to write a Service, define actions and managed state, build a PVM artifact, deploy it, connect a frontend, or use ownership abstraction.

### [Understand or run MiniJAM](./minijam/index.md)

Use MiniJAM documentation for the Stage-1 network model, MiniJamSpec, Worker behavior, Formal RPC, execution boundaries, or local/network deployment.

### [Understand the MINI ecosystem](./ecosystem/index.md)

MINI remains a first-class part of the project. Its documentation covers ecosystem incentives, token economics, project markets, public goods, and future governance mechanisms. Those mechanisms can evolve without redefining MiniJAM consensus or the JamScript application ABI.

## Default application path

~~~text
JamScript source
    ↓
jams build
    ↓
Service artifact
    ↓
MiniJAM Stage-1
    ↓
JamScript backend / client
    ↓
Application
~~~

See [Architecture at a Glance](./architecture.md) for the full relationship.

The historical Stage-0 Playground is no longer the default development path. It remains available under [Legacy Stage-0](./archive/stage-0-playground.md).

## Source of truth

This site is the explanation and onboarding layer. Protocol facts are owned by the implementation repositories:

- MiniJAM network/execution: [ArcheLabs/minijam-client](https://github.com/ArcheLabs/minijam-client)
- JamScript language/runtime/backend: [ArcheLabs/JamScript](https://github.com/ArcheLabs/JamScript)

See [Compatibility and Source of Truth](./reference/compatibility.md) before pinning protocol or ABI versions.
