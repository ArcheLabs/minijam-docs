---
id: local-environment
title: Local Environment
description: Start the resettable MiniJAM Stage 0 native environment locally.
slug: /minijam/operators/local-environment
---

# Local Environment

The repository provides a resettable Stage 0 native stack containing a MiniJAM Node, Compiler API, Playground API, three independent Workers, and Playground Web. It is for local development and human testing, not production or public-server deployment.

## Start the native stack

```bash
git clone git@github.com:ArcheLabs/minijam-client.git
cd minijam-client

./scripts/stage0-native.sh deps
./scripts/stage0-native.sh build
./scripts/stage0-native.sh up
```

Open [http://127.0.0.1:4173](http://127.0.0.1:4173) when the launcher reports that the stack is ready.

## Manage the stack

```bash
./scripts/stage0-native.sh logs
./scripts/stage0-native.sh down
./scripts/stage0-native.sh reset
```

`reset` removes the local Stage 0 state. For the digest-pinned Compose release, see the [Stage 0 deployment README](https://github.com/ArcheLabs/minijam-client/blob/main/deploy/stage0/README.md). Keep local keys and configuration outside committed files.
