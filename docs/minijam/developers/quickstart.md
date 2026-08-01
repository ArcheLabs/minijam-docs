---
id: quickstart
title: Developer Overview
description: The current MiniJAM service development workflow and its stability boundary.
slug: /minijam/developers/quickstart
---

# Developer Overview

:::warning Complete source builds are not publicly available

The complete MiniJAM Node, Runtime, Worker, and execution stack currently depends on a pinned private Jambda revision. It cannot be built independently from the public repository.

Use the published Docker release to run the complete Stage 0 stack. For service experimentation, use the Playground and its Compiler API.

:::

The intended path is:

```text
Create a Service
→ compile
→ submit Work
→ Refine
→ Work Report
→ Accumulate
```

## Repository and examples

Clone the [MiniJAM Client repository](https://github.com/ArcheLabs/minijam-client) and inspect the [Counter service](https://github.com/ArcheLabs/minijam-client/tree/main/examples/services/counter) and [Stage 0 SDK](https://github.com/ArcheLabs/minijam-client/tree/main/service-toolchain/sdk).

The SDK supports allocation-free, single-file C and restricted C++ services. Its ABI is pinned by `service-toolchain/compiler/toolchain.lock`.

## Build the committed examples

From the repository root:

```bash
./scripts/check-service-sdk.sh
./scripts/build-counter-services.sh
./scripts/test-counter-services.sh
```

The exact compiler output and artifact format are part of the current Service SDK development baseline. These commands validate Service SDK examples; they do not build the complete MiniJAM Node, Runtime, or Stage 0 Stack. Service HostCall semantics come from the pinned Jambda/JAM execution implementation.

To run the full environment, continue with [Docker deployment](../operators/docker-deployment.md).
