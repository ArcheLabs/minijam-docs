---
title: Run MiniJAM locally with Docker
description: Start the public, image-based MiniJAM local development network.
---

# Run MiniJAM locally with Docker

MiniJAM provides a local development network based on prebuilt Docker images. You do not need to compile MiniJAM, Jambda, or any Rust or Node.js project.

## Requirements

Running the local network requires:

* Docker Engine or Docker Desktop
* Docker Compose v2
* Bash, `tar`, and `sha256sum`

On Windows, run the following commands through WSL2 with Docker Desktop integration enabled.

## Download and Start

Download the following two files from the MiniJAM GitHub Release:

```text
minijam-local-<tag>.tar.gz
minijam-local-<tag>.tar.gz.sha256
```

Make sure both files are in the same directory, then run:

```bash
sha256sum -c minijam-local-<tag>.tar.gz.sha256
tar -xzf minijam-local-<tag>.tar.gz
cd minijam-local-<tag>
./minijam-local up
```

The startup script will:

1. check Docker and Docker Compose;
2. verify that all images are pinned to immutable SHA-256 digests;
3. pull the required images;
4. start the MiniJAM Node, Compiler, Playground, three Workers, and Web frontend;
5. wait until all services are healthy.

After startup completes, open:

* Playground: http://127.0.0.1:4173
* Node RPC: http://127.0.0.1:9944

You can interact through the Playground Web UI or through Node RPC.
