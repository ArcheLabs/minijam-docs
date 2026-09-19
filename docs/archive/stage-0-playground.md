---
title: Legacy Stage-0 Playground
description: Historical browser-first MiniJAM development flow retained for reference.
---

# Legacy Stage-0 Playground

Stage-0 used a browser-first Playground, C/C++ examples, wallet-controlled Service deployment, and an early multi-process local stack.

That environment was useful for validating the first MiniJAM execution path, but it is no longer the recommended development architecture.

Use [JamScript](../jamscript/index.md) for application development, [MiniJAM Stage-1](../minijam/network/stage-1.md) for the supported network, and [Run MiniJAM locally](../minijam/developers/local-docker.md) for local integration.

The old API reference remains at [Playground API](../minijam/developers/playground-api.md).

Do not use Stage-0 controller, wallet, compiler, or deployment assumptions as a contract for Stage-1.
