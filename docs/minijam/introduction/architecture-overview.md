---
id: architecture-overview
title: Architecture Overview
slug: /minijam/introduction/architecture-overview
sidebar_position: 3
---

# Architecture Overview

MiniJAM is a simplified JAM implementation running in the Polkadot environment. It has the core execution model of JAM:

- Service;
- Work Package;
- Refine;
- Work Report;
- Accumulate;
- JAM state;
- deterministic execution based on historical state.

MiniJAM currently uses a Polkadot SDK Runtime to carry protocol state and state transitions, but the Polkadot SDK is only MiniJAM's host environment. MiniJAM's core architecture is not defined by the Node, consensus algorithm, or a specific deployment topology. It is defined by JAM's execution flow and state model.

In Stage 0, the host environment also provides blocks, transaction ordering, finality, and RPC, allowing MiniJAM to run and be validated before JAM mainnet is available.

## Overall Architecture

MiniJAM's core execution flow can be summarized as:

```text
User or application
    |
    | Submit Work Package and Bundle commitment
    v
MiniJAM Runtime
    |
    | Record Work and assign Workers
    v
Candidate Worker
    |
    | Fetch Bundle
    | Read anchored historical JAM state
    | Execute Refine
    v
Work Report
    |
    | Submit candidate report
    v
Other assigned Workers
    |
    | Fetch inputs again
    | Execute Refine independently
    | Support / Oppose
    v
Accepted Work Report
    |
    | Enter execution queue
    v
Jambda Executive in Runtime
    |
    | Execute Accumulate
    | Generate state changes
    v
State-change validation
    |
    | Validate boundaries and execution result
    v
Canonical JAM state
```

In this architecture:

- Workers are responsible for off-chain Refine execution and validation;
- the Runtime is responsible for executing Accumulate;
- protocol state in the Runtime is canonical state.

## State

MiniJAM's Runtime contains two semantically different types of state.

### Protocol Coordination State

Protocol coordination state manages the MiniJAM execution process, such as:

- submitted Work;
- Worker registration information;
- Worker assignment results;
- candidate reports;
- Support and Oppose votes;
- execution queue;
- Work status;
- Fuel reservation and settlement;
- Execution Receipts.

This state coordinates Workers and the Runtime, but it is not part of the JAM state space directly accessible to JAM Services.

### JAM Protocol State

JAM protocol state is the canonical state read and modified by Service execution. The current implementation stores it in the Runtime's `ProtocolState`:

```text
31-byte JAM State Key
    ->
State Value
```

## Refine

After Work is submitted, the Runtime deterministically assigns a group of Workers from the currently available Worker set. One Worker is designated as the candidate report producer.

The candidate producer must:

1. fetch the Bundle corresponding to the Work Package;
2. verify the Bundle size and content hash;
3. verify that the Bundle matches the on-chain Work Package commitment;
4. verify the historical state anchor used by the Work Package;
5. read the JAM state corresponding to that anchor;
6. execute Refine with Jambda;
7. generate the canonical Work Report;
8. wrap the Work Report as a candidate report and submit it.

You can think of Refine as off-chain execution. It does not require every validator to run the computation, but it relies on a specific mechanism to ensure the computation is executed correctly.

## Accumulate

After a Work Report is submitted, it is recorded in the runtime and can be processed once the relevant conditions are met. Accumulate is executed by the Jambda Executive in the Runtime, changing JAM protocol state.

```text
Accepted Work Reports
Pending Preimages
Pending System Operations
Current JAM state
    |
    v
Jambda Executive
    |
    v
Execution Output
    |
    +-- State Delta
    +-- Consumed Reports
    +-- Consumed Preimages
    +-- Consumed System Operations
    `-- Receipt Hash
```

Accumulate happens in the Runtime. This is the same in JAM and MiniJAM. Therefore, accumulation is expensive, and real Services should keep it efficient.

## Complete Work Lifecycle

Ordinary Work currently goes through the following process:

```text
Submit Work Package and Bundle commitment
    v
Runtime records Work
    v
Workers are deterministically assigned
    v
Candidate producer fetches Bundle
    v
Candidate producer executes Refine based on the Lookup Anchor
    v
Submit Work Report
    v
Other assigned Workers independently execute Refine
    v
Support / Oppose voting
    v
Candidate report is accepted
    v
Work Report enters execution queue
    v
Jambda Executive in Runtime executes Accumulate
    v
Validate State Delta
    v
Atomically update JAM state
    v
Record Execution Receipt
```

If a candidate report is rejected or times out, MiniJAM can enter the next candidate round and choose a new candidate producer. If no accepted report is produced after the maximum number of rounds, the Work is marked as failed.

## Data Storage

A Work Package itself is not enough to contain all data required for execution, so MiniJAM uses Bundles to carry larger execution inputs. In JAM, a large amount of data is temporarily stored in D3L. In MiniJAM, storage is implemented through the IPFS network. The Runtime records the Bundle content commitment as a signal for Workers.

After fetching a Bundle, a Worker must verify:

- the actual byte count matches the declared size;
- the actual content hash matches the declared hash;
- the Work Package in the Bundle matches the on-chain canonical Work Package;
- the Package Hash matches the on-chain record.

This storage approach is much more efficient than on-chain storage. Therefore, use it for data storage whenever possible. Only commitment data and data that needs to be exposed to other Services should be stored in chain state.
