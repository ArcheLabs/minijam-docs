---
title: Worker
description: The Stage-1 Refine execution role and its boundary from network consensus.
---

# Worker

A MiniJAM Worker is the off-chain execution role responsible for the Refine path.

Workers fetch required inputs, execute assigned work through the supported execution engine, and submit protocol results using their own signing identity.

Worker concurrency, caching, and scheduling are local operator choices unless the protocol explicitly commits them. Local execution lanes are not MiniJamSpec core count and are not an application ABI parameter.

A Worker result is not canonical merely because one Worker produced it. Work Reports, voting/verification, and Runtime state changes follow the network-defined acceptance path.
