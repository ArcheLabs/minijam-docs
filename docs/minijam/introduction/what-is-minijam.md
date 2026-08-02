---
id: what-is-minijam
title: What is MiniJAM?
slug: /minijam/introduction/what-is-minijam
sidebar_position: 1
---

# What is MiniJAM?

MiniJAM is a simplified JAM implementation. It is used to implement JAM early and build a general ecosystem before the formal JAM environment matures, giving developers access to JAM's distinctive capabilities to expand what Web3 can do. MiniJAM preserves JAM-related semantics and flows as much as possible:

```text
Service Code
    v
Work Package
    v
Refine
    v
Work Report
    v
Independent Verification
    v
Accumulate
    v
State Update
```

## Why MiniJAM Is Needed

JAM's protocol implementation, developer tools, and application ecosystem will take time to mature. MiniJAM brings that work forward so developers can start building now:

- Services;
- SDKs and compilation tools;
- Playground and debugging tools;
- Worker and data infrastructure;
- wallets, explorers, and applications.

This allows JAM's arrival to become a gradual upgrade. When JAM formally launches, it can already have a mature ecosystem and applications.

## Relationship with JAM

MiniJAM preserves JAM core concepts and state-transition flows such as Service, PVM, Refine, Work Report, Accumulate, and HostCall, but it does not implement the full consensus mechanism.

MiniJAM currently uses a Polkadot SDK-based host environment to provide blocks, finality, Runtime, historical state, and RPC. This is the current-stage implementation approach, not MiniJAM's permanent product definition.

MiniJAM SDKs, tools, and infrastructure should be designed around general JAM concepts as much as possible, so they can continue serving formal JAM in the future.

See MiniJAM and JAM for the current implementation scope and compatibility boundaries.

## Long-Term Direction

After formal JAM matures, MiniJAM will exist as a JAM L2. The long-term goals are:

- allow some Services to migrate to JAM;
- keep SDKs, compilers, and developer tools serving JAM;
- keep existing applications and infrastructure reusable;
- continue running MiniJAM as a JAM L2 or dedicated execution environment.

## Known Issues and Boundaries

- The repository's full Runtime and Node build depends on private Jambda, so you cannot compile it locally. This means the current stage is not yet suitable for multi-client implementation.
- Stage 0 does not implement JAM assurance, full availability, global disputes, judgments, or production-grade persistence.
- Economic parameters and administrative permissions are still temporary configuration.
