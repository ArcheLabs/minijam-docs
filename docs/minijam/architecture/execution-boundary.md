---
title: Execution Boundary
description: The boundary between network consensus, Runtime policy, Worker policy, and the application ABI.
---

# Execution Boundary

MiniJAM deliberately separates the network profile, Runtime policy, Worker strategy, and application ABI.

- **MiniJamSpec** defines the network profile consumed by MiniJAM.
- **Runtime policy** owns chain-enforced execution and admission rules.
- **Worker strategy** may change local concurrency, caches, and scheduling without changing Work bytes or the application ABI.
- **Application ABI** is the stable Service boundary targeted by JamScript and other toolchains.

This separation is why JamScript can remain network-independent during compilation while still deploying to MiniJAM.

For the normative implementation statement, see [MiniJAM execution boundary](https://github.com/ArcheLabs/minijam-client/blob/main/docs/execution-boundary.md).
