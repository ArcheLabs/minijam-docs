---
title: Formal RPC
description: The application-neutral MiniJAM Work and bundle gateway.
---

# Formal RPC

Formal RPC is MiniJAM's application-neutral gateway for Work ingress and bundle-related operations.

It belongs to the network/infrastructure boundary. It is **not** the JamScript application backend.

At the Stage-1 boundary, Formal RPC owns Work-ingress relayer responsibility and the bundle store/gateway role used by the network workflow.

Formal RPC does not define JamScript source semantics, the application ABI, managed-state canonicality, frontend convenience queries, or ownership abstraction. A JamScript backend may talk to Formal RPC internally while keeping that topology below the application API.
