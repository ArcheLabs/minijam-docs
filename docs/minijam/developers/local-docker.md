---
title: Run MiniJAM locally with Docker
description: Start the supported MiniJAM Stage-1 local network from an immutable release image.
---

# Run MiniJAM locally with Docker

Stage-1 local development uses the published aggregate MiniJAM image. It does not require a local Rust build or Docker Compose.

## Requirements

- Docker Engine or Docker Desktop
- an immutable MiniJAM aggregate image digest from a matching release

## Start the network

~~~bash
docker run --rm \
  -p 9944:9944 -p 8080:8080 \
  ghcr.io/archelabs/minijam@sha256:<digest> --dev
~~~

The aggregate image contains the local launcher plus the Stage-1 node, one Worker, and Formal RPC.

The image digest is part of the reproducible deployment identity. Do not replace it with an unpinned moving tag in reproducibility or release checks.

## Stage-1 roles

- **Node:** chain, Runtime, finality, and safe node RPC.
- **Worker:** off-chain Refine execution with its own signing identity.
- **Formal RPC:** application-neutral Work ingress and bundle gateway.

The optional Service compiler is not part of the Stage-1 runtime network. JamScript owns its own compiler/toolchain distribution.

For public or multi-host deployment, use the canonical [Stage-1 Docker deployment guide](https://github.com/ArcheLabs/minijam-client/blob/main/docs/docker-deployment.md).
