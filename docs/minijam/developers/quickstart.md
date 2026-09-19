---
id: quickstart
title: Developer Overview
description: The current MiniJAM Stage-1 application development path.
slug: /minijam/developers/quickstart
---

# Build on MiniJAM

The default application path is now **JamScript + MiniJAM Stage-1**.

The old browser Playground and C/C++ walkthrough belong to Stage-0 and are kept only as historical material.

## 1. Start with JamScript

Install JamScript and build a Service using the [JamScript Quickstart](../../jamscript/getting-started/quickstart.md).

~~~text
service.ts
   ↓
jams build
   ↓
verified Service artifact
   ↓
jams deploy
   ↓
MiniJAM Stage-1
   ↓
backend / client / frontend
~~~

JamScript builds are network-independent. You do not need a MiniJAM checkout merely to compile a Service.

## 2. Run a local Stage-1 network

For local integration, run the published aggregate MiniJAM image as described in [Run MiniJAM locally with Docker](./local-docker.md).

## 3. Configure deployment

JamScript deployment is explicit and uses a named network configuration. Deployment endpoint, node endpoint, and optional genesis binding belong to deployment configuration, not Service source code.

See [JamScript Deployment](../../jamscript/deployment/index.md).

## 4. Use the application path

After deployment, send actions/Work through the JamScript client/backend path, wait for finalized execution, and read managed state through the backend. Clients that need independent verification can request proof verification.

## Need the old Playground?

The Stage-0 browser flow is preserved under [Legacy Stage-0 Playground](../../archive/stage-0-playground.md). It is no longer the recommended architecture or workflow.
