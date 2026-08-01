---
id: run-a-worker
title: Run a Worker
description: Configure and verify a MiniJAM Stage 0 Worker.
slug: /minijam/operators/run-a-worker
---

# Run a Worker

A Worker needs a registered Worker ID, a matching signing identity, Node RPC access, a bundle gateway, and a writable data directory. Stage 0 runs three independently keyed Workers.

## Configuration

For a container deployment, copy the [Worker example configuration](https://github.com/ArcheLabs/minijam-client/blob/main/deploy/worker/worker.example.toml), set the finalized genesis hash and Worker identity, and mount the signing seed as a read-only secret:

```text
MINIJAM_WORKER_SEED_FILE=/run/secrets/worker-seed
```

Each Worker needs its own registered ID, signing key, transaction account, nonce stream, and writable `/data` volume. Never put a signing seed in an image or committed configuration.

## Verify readiness

The Worker health endpoints are:

```text
GET /health/live
GET /health/ready
```

Readiness requires a loaded signing identity, a matching Node genesis, and a reachable bundle gateway. After readiness, submit a Work item and verify that the assigned Worker can retrieve inputs, independently re-execute Refine, and publish Support or Oppose.
