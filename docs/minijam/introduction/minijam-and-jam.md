---
id: minijam-and-jam
title: MiniJAM and JAM
description: Differences between MiniJAM and JAM in goals, execution model, network architecture, data availability, and security assumptions.
slug: /minijam/introduction/minijam-and-jam
sidebar_position: 4
---

# MiniJAM and JAM

JAM is the protocol defined by the Gray Paper. It combines global Service state with parallelizable off-chain computation, forming a unified execution model through Coretime, Work Reports, and global state transitions.

MiniJAM is a simplified JAM implementation used to develop and run JAM Services, execution tools, and application experiences before the formal JAM environment matures.

MiniJAM currently uses a Polkadot SDK-based host environment to carry blocks, finality, Runtime, and protocol state. The current documentation mainly describes the Stage 0 implementation approach. It is not a permanent definition of the MiniJAM product shape.

:::warning Current Stage

This document describes MiniJAM's current-stage design.

The current code uses Gray Paper `0.7.2` as the JamCore semantic baseline. The public protocol version is `PROTOCOL_VERSION_V1`, and the interface version is `1`. These are current implementation parameters and may change as the protocol evolves.

:::

## Core Differences

In short, MiniJAM does not change JAM's STF. It adjusts the scope around it, which helps with future multi-client adaptation. The differences include:

| Dimension | JAM | MiniJAM |
| --- | --- | --- |
| Host and finality | Consensus, validator set, and finality belong to the JAM protocol itself | Currently, the Stage 0 host environment provides block ordering, finality, Runtime, and historical state |
| Work Report verification | Uses JAM protocol flows such as Guarantees, Assurances, and Disputes | Uses candidate producers, independent Refine re-execution, and Support/Oppose voting |
| Accumulate | Executed as part of JAM global state transition | Executed by the Jambda Executive inside the Runtime |
| State hosting | Maintains canonical JAM state as defined by the Gray Paper | Currently persists JAM state in the Runtime's `ProtocolState` |
| Data availability | Uses JAM-defined data distribution, availability, and recovery mechanisms | Currently uses content commitments, Gateway, and IPFS; it does not provide full JAM Availability semantics |
| Coretime | Includes the complete core resource allocation and Coretime model | Planned for the next version |
| Security boundary | Relies on JAM consensus, availability, report guarantees, and dispute mechanisms | Relies on host finality, Worker assignment, independent re-execution, voting thresholds, bonds, and deployment configuration |

## What MiniJAM Simplifies

MiniJAM implements the following execution loop:

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

To provide this path early, MiniJAM currently makes the following simplifications:

* it does not implement full JAM Availability;
* it does not implement the full JAM Guarantees, Assurances, and Disputes flows;
* it does not implement full JAM Coretime allocation and markets;
* it uses deterministic Worker assignment and independent re-execution to verify candidate reports;
* it uses Support/Oppose voting to decide whether a candidate report is accepted;
* it currently uses a single Runtime Executive implementation;
* it uses MiniJAM-specific Work coordination, System Operations, and host integration.

These simplifications reduce the current implementation scope, but they also mean MiniJAM has different security assumptions and protocol boundaries from JAM.

The Guarantees, Assurances, and Disputes flows, along with Coretime, will be implemented in the next MiniJAM testnet stage.

## Can Applications Migrate to JAM?

One of MiniJAM's goals is to lower the barrier to future JAM Service and tooling development. MiniJAM keeps Service, Work, Refine, Work Report, and Accumulate semantics aligned with JAM, so Services developed on MiniJAM can migrate to JAM.

The migration effort depends on the capabilities an application relies on. Applications that depend on the following MiniJAM-specific capabilities need additional adaptation:

* MiniJAM System Operations;
* MiniJAM-specific state query APIs;
* Bridge;
* network interfaces provided by the current host environment.

## Authoritative Sources

JAM's normative behavior is defined by the target version of the Gray Paper. The official Gray Paper resource page continuously provides the latest version and protocol testing resources.

For MiniJAM, distinguish between two types of sources.

### Intended Protocol Behavior

MiniJAM's intended design is defined by:

1. versioned MiniJAM protocol and design documents;
2. public protocol types and interface definitions;
3. compatibility tests and test vectors;
4. interface documentation explicitly marked Stable.

### Current Deployment Behavior

The actual behavior of the current network is determined by:

1. the deployed Runtime and Worker code;
2. the current network configuration;
3. the current release version;
4. the Current Status page;
5. release notes and known issues.

If design documents, tests, and deployed code are inconsistent, the inconsistency should be recorded as a protocol, implementation, or documentation issue.
