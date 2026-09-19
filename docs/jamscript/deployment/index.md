---
title: Deployment
description: Explicit, network-aware deployment of verified JamScript Service artifacts.
---

# Deployment

JamScript separates **build** from **deployment**.

A canonical build produces a network-independent Service artifact. Deployment is a later control-plane operation that selects a target network, verifies the artifact and network identity, and creates the Service.

## Named networks

Deployment targets belong in project/network configuration rather than Service source code.

A network entry can describe:

- network kind;
- deployment RPC;
- optional node RPC;
- optional pinned genesis hash.

Use the CLI to inspect configured targets before deployment:

~~~bash
jams network list
jams network show local
~~~

Release-specific endpoint values should come from the matching MiniJAM/JamScript deployment artifacts rather than being copied from a generic tutorial.

## Deploy

After building:

~~~bash
jams deploy ./my-service --network local --artifact ./my-service/dist
~~~

The CLI verifies the artifact metadata/checksums before submitting a create request. A successful deployment records the selected network, Service identity, artifact identity, finalized context, and operation metadata locally without persisting RPC credentials.

## Failure semantics

Deployment is a mutation. A transport timeout after submission can mean the network accepted the request even though the client did not receive the result.

JamScript therefore does not blindly retry an outcome-unknown deployment.

## Current network support

The current release line supports MiniJAM Stage-1 as the deployment target. JAM remains a reserved future target in the configuration model.

For the exact contract, see [JamScript Deployment v0.1](https://github.com/ArcheLabs/JamScript/blob/main/docs/deployment.md).
