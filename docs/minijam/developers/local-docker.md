---
title: Run MiniJAM locally with Docker
description: Start the public, image-based MiniJAM development network.
---

# Run MiniJAM locally with Docker

Download the `minijam-local-<tag>.tar.gz` and matching `.sha256` asset from the MiniJAM release, then:

```bash
sha256sum -c minijam-local-<tag>.tar.gz.sha256
tar -xzf minijam-local-<tag>.tar.gz
cd minijam-local-<tag>
./minijam-local up
```

Open [http://127.0.0.1:4173](http://127.0.0.1:4173). This needs Docker only: no Rust, Cargo, Node.js, Jambda checkout, keystore, Worker seed, or Stage 0 credential.

:::warning Local development only
This network uses known public development keys, has no real-value assets, and has a different genesis from hosted Stage 0. Do not expose ports to the internet or reuse these keys on any public network.
:::

Use `./minijam-local status`, `logs`, `down`, `up`, or `reset` to operate it. The wrapper validates digest-pinned images and refuses non-loopback bindings.

The official Stage 0 Compose deployment is **Maintainer / Operator only**. Its credentials are never distributed in images or release bundles.
