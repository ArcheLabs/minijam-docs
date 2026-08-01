---
id: quickstart
title: Developer Overview
description: The current MiniJAM service development workflow and its stability boundary.
slug: /minijam/developers/quickstart
---

# Developer Overview

:::warning Draft

The end-to-end service SDK workflow is not yet publicly stable. The commands below are the repository's current development path and may require the pinned toolchain and private Jambda revision.

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

The exact compiler output and artifact format are part of the current development baseline. Keep service execution deterministic and use only HostCalls supported by the target runtime.
