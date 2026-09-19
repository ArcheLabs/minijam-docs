---
title: Stage-1 Network
description: The supported MiniJAM deployment line and its operator-facing roles.
---

# Stage-1 Network

Stage-1 is the supported MiniJAM deployment line.

The reproducible deployment unit is a matching set of immutable image digests plus the chain/network configuration generated for those images.

## Roles

- **Node** — validator/runtime process and safe JSON-RPC surface.
- **Worker** — Refine execution process with its own signing key and state.
- **Formal RPC** — application-neutral Work ingress and bundle gateway.

For local development, the aggregate MiniJAM image runs these roles behind one launcher. Public or multi-host deployments use the compact/split deployment profiles from MiniJAM Client.

## Application boundary

Application tooling does not need to own the network lifecycle. JamScript builds artifacts independently, then deploys to a configured MiniJAM target. Its backend can consume Node/Formal RPC internally without exposing that topology to application code.

For operator details, use the canonical [Stage-1 Docker deployment guide](https://github.com/ArcheLabs/minijam-client/blob/main/docs/docker-deployment.md).
