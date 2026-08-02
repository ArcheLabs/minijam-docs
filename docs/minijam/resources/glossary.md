---
id: glossary
title: Glossary
slug: /minijam/resources/glossary
---

# Glossary

This glossary uses Gray Paper `0.7.2` as its baseline and explains common JAM concepts that appear in MiniJAM documentation and code.

Terms marked as **MiniJAM** belong to the current MiniJAM implementation. They are not native protocol terms from the Gray Paper.

:::info Terminology Boundary

This page is for Service developers and MiniJAM participants. It is not a complete index of Gray Paper mathematical notation or protocol constants.

The same term may have different implementation boundaries in the Gray Paper and MiniJAM. Concrete behavior should follow the corresponding protocol and implementation version.

:::

## Basic Concepts

### JAM

Join-Accumulate Machine, the protocol defined by the Gray Paper.

JAM combines parallelizable Refine execution with Accumulate, which modifies global state, providing Services with a general computation and shared-state environment.

### Service

An application execution unit in JAM with its own identity, code, and state.

A Service is identified by a Service ID. It can have code Preimage, persistent Storage, balance, and other protocol state. Its Refine logic processes work input, and its Accumulate logic updates canonical state.

### Service ID

An unsigned integer that identifies a Service.

Work Items use Service ID to specify which Service should execute. Service Storage and Preimage are also namespaced partly by Service ID.

### Service Account

The account record in JAM global state corresponding to a Service.

It contains the Service's code, storage, balance, Gas configuration, and other protocol information. It is not a normal user wallet account.

### State

Canonical state jointly maintained by the protocol.

It contains Service Accounts, Service Storage, Preimages, report state, Validator information, and other protocol data.

### Validator

A node identity participating in protocol duties such as JAM consensus, report guaranteeing, data availability, and auditing.

MiniJAM currently does not reproduce the full set of JAM Validator responsibilities. Instead, host Authorities and Workers each take on different parts of the functionality.

### Core

A logical computation resource used to execute Refine work.

Core represents the parallel computation capacity allocated by the protocol. It is not the same as a physical CPU core on a machine.

### Coretime

The right to use a Core during a specific time range.

Formal JAM uses Coretime to coordinate and allocate parallel computation resources. MiniJAM Stage 0 does not implement the full Coretime market. It will be implemented in the next version.

## PVM and Execution

### PVM

Polkadot Virtual Machine.

The deterministic, Gas-metered virtual machine used by JAM. Service code, Refine, Accumulate, and authorization logic can all run in the PVM.

### Guest Program

A program running inside the PVM.

A Guest Program can interact with external state and host capabilities only through specified Host Calls.

### Gas

The metering unit for PVM execution resources.

Work Items separately declare a Refine Gas Limit and an Accumulate Gas Limit. Running out of Gas usually produces an Out-of-Gas error.

### Gas Limit

The maximum amount of Gas a single PVM execution may consume.

Refine and Accumulate use different Gas Limits to separately constrain off-chain computation and canonical state transitions.

### Host Call

A controlled request sent by a PVM Guest to the host environment.

The Host Calls defined by Gray Paper `0.7.2` cover capabilities such as Gas queries, data fetching, Preimage queries, historical queries, Storage reads and writes, Segment export, Service management, transfers, and nested PVM execution.

Host Calls are protocol-constrained execution interfaces.

### Refine Invocation

A single PVM invocation that executes a Service's Refine logic for a Work Item.

It processes Payload, Extrinsic Data, and Imported Segment, and executes allowed historical queries under the constraints of the Refinement Context.

### Accumulate Invocation

A single PVM invocation that executes a Service's Accumulate logic.

It receives one or more Accumulation Inputs related to that Service and may modify that Service's canonical state.

### Is-Authorized

The authorization check run before executing a Work Package.

It uses Authorization Code, Authorization Token, and Authorizer Config to decide whether the Work Package is allowed to execute.

## Work Package

### Work Package

A collection of work submitted to a Core for Refine.

A Work Package contains:

* Authorization Token;
* Authorization Code Host;
* Authorization Code Hash;
* Authorizer Config;
* Refinement Context;
* one or more Work Items.

### Work Item

A single unit of work in a Work Package for a specific Service.

A Work Item usually contains:

* Service ID;
* Service Code Hash;
* Payload;
* Refine Gas Limit;
* Accumulate Gas Limit;
* Imported Segment;
* Extrinsic Data;
* Exported Segment count.

A Work Package can contain multiple Work Items.

### Payload

Arbitrary bytes passed by the Work Package submitter to a Work Item.

Payload can be read during Refine, and its hash is included in the corresponding Work Digest.

### Extrinsic Data

External byte data provided with a Work Package and committed to by hash and length.

Refine can fetch this data through Host Calls.

This Extrinsic Data is JAM Work Item input. It should not be confused with extrinsics in host-chain transactions.

### Imported Segment

A fixed-length data segment exported by a previous Work Package and read by the current Work Item.

Imported Segment verifies its origin and integrity through commitments and proofs.

### Exported Segment

A fixed-length data segment produced by Refine execution.

It can be used by a later Work Package as an Imported Segment. A Work Package declares in advance how many Segments each Work Item may export.

### Segment Root

A Merkle Root commitment to the Exported Segments produced by a Work Package.

Later Work Packages can use the Segment Root and index to verify imported data.

### Work Bundle

The complete data set required to execute or audit a Work Package.

It usually includes the Work Package, Extrinsic Data, Imported Segment, and related proofs. A Work Bundle is usually larger than the Work Package recorded on-chain.

### Package Hash

The hash of a Work Package's canonical encoding.

It identifies the Work Package, declares dependencies, and binds the Work Report to the original Work Package.

## Refinement Context

### Refinement Context

Data describing the historical protocol context that Work Package execution depends on.

In the Gray Paper, Refinement Context includes:

* Anchor;
* Anchor Posterior State Root;
* Anchor Accumulation Output Log;
* Lookup Anchor;
* Lookup Anchor Timeslot;
* Prerequisite Work Package Hashes.

### Anchor

The historical block referenced by the Refinement Context.

It binds Work Package execution context to a definite historical protocol position and associates it with the corresponding state root and Accumulation Output Log.

### Lookup Anchor

The historical block used for historical Preimage and protocol state queries.

Service Code and other historical data must be read from the state view determined by the Lookup Anchor, rather than arbitrarily using the latest state at execution time.

### Historical Lookup

A Preimage query in Service state at a historical Timeslot.

It allows Refine to deterministically use Service Code and data available at the Lookup Anchor.

### Prerequisite

Another Work Package that the current Work Report depends on before Accumulate.

The current Work Report can enter Accumulate only after the dependent Work Package has completed Accumulate.

## Refine and Work Report

### Refine

The computation stage that transforms a Work Package into a Work Report.

Refine can usually execute in parallel on Cores. It can read inputs, produce Work Results, and export Segments.

### Work Result

The result produced after a Work Item executes Refine.

It may be successfully returned bytes, or an error such as Out-of-Gas, Panic, unavailable code, or invalid output.

### Work Digest

The digest in a Work Report corresponding to a single Work Item.

It contains:

* Service ID;
* Service Code Hash;
* Payload Hash;
* Accumulate Gas Limit;
* Work Result;
* Refine Gas Used;
* statistics for Imported, Exported, and Extrinsic Data.

Work Digest is the main data carrier through which Refine results enter Accumulate.

### Work Report

The canonical report produced after a Work Package executes Refine.

In Gray Paper `0.7.2`, a Work Report contains:

* Availability Specification;
* Refinement Context;
* Core Index;
* Authorizer and Authorization Trace;
* Segment Root Lookup;
* Work Digests;
* Is-Authorized Gas Used.

The Work Report describes the computation result, but it can enter Accumulate only after subsequent guarantee and availability flows.

### Core Index

The index identifying which Core executed the Work Package.

## Accumulate and State

### Accumulate

The stage that applies a verified and available Work Result to canonical Service State.

Accumulate aggregates Work Digests by Service and executes the corresponding Service Accumulate logic. Unlike Refine, Accumulate can modify global canonical state.

### Accumulation Input

Input passed to a Service's Accumulate logic.

It may be an Operand Tuple extracted from a Work Digest and Work Report, or it may be a Deferred Transfer.

### Operand Tuple

Key data extracted from a Work Report and Work Digest and passed to Accumulate.

It contains Package Hash, Segment Root, Authorizer, Payload Hash, Gas Limit, Authorization Trace, and Work Result.

### Deferred Transfer

An inter-Service transfer produced by one Accumulate and processed in a later Accumulation round.

It contains sender, recipient, amount, Memo, and Gas Limit.

### Accumulation Output

An output commitment produced by a Service during Accumulate.

It can be recorded in the protocol-maintained Accumulation Output Log and referenced by later protocol contexts.

### Service Storage

Persistent key-value state belonging to a Service.

A Service can read and modify only its own Storage through controlled Host Calls, unless the protocol explicitly provides other capabilities.

### Preimage

Original byte data identified by a Hash.

Service Code and other large data are usually referenced in state by Hash, while the actual content is provided through the Preimage mechanism.

### State Root

A Merkle Root commitment to the complete protocol state.

It binds a block to a determined posterior state.

## MiniJAM Core

### Worker

An executor that fetches Work Bundles off-chain, executes Refine, generates candidate Work Reports, or independently verifies candidate reports.

MiniJAM Workers are responsible only for Refine and verification. They cannot directly modify canonical JAM state.

### Assigned Worker

A Worker deterministically assigned to a particular Work.

Only assigned Workers can produce candidate reports or participate in verification for the corresponding report.

### Candidate Producer

The Worker designated to generate the candidate Work Report for the current round.

MiniJAM currently chooses one Candidate Producer from the assigned Workers, rather than allowing all Workers to submit candidate reports simultaneously.

### Candidate Report

The Work Report submitted after the Candidate Producer executes Refine.

It still needs other Assigned Workers to independently re-execute Refine and verify it.

### Support

A vote submitted when a Worker independently executes Refine and confirms that the local result matches the Candidate Report.

Support is not JAM Assurance.

### Oppose

An opposition vote submitted when a Worker independently executes Refine and finds that the candidate report is inconsistent or invalid.

Oppose can carry an error reason, such as `InvalidRefine`.

## MiniJAM System Operations

### System Service

A system-level Service reserved by MiniJAM.

### System Operation

A system command submitted through a MiniJAM host entry point and executed by the Jambda Executive in the Runtime.

It currently mainly includes:

* Create Service;
* Upgrade Service.

### System Receipt

The result produced after a System Operation executes.

It can indicate that a Service was created, a Service was upgraded, or a request was rejected.

### Ingress Relayer

A host account authorized to submit Work, Preimage, and System Operation to the Runtime.

It is a Stage 0 ingress-control mechanism, not a native JAM Gray Paper role. It exists only for testing convenience and will be removed in the next version.

### Service Controller

An account authorized to manage a Service in MiniJAM.

The current Playground uses Controller to decide who can submit Work or upgrade a Service. This is also a temporary testing convenience and will be removed in the next version.

### Work Deposit

An economic bond locked when submitting Work.

It constrains invalid or failed Work. The concrete Stage 0 amount is network configuration and should not be treated as a permanent protocol parameter.

### Candidate Bond

An economic bond locked when a Candidate Producer submits a candidate report.

If the candidate report is rejected, the bond can be slashed according to configuration.

[1]: https://github.com/gavofyork/graypaper/releases/tag/v0.7.2 "Release v0.7.2 - gavofyork/graypaper - GitHub"
