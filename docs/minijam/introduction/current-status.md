---
id: current-status
title: Current Status
description: The authoritative status summary for the MiniJAM Stage 0 environment.
slug: /minijam/introduction/current-status
sidebar_position: 2
---

# Current Status

MiniJAM is an independent Polkadot SDK chain implementing a deliberately reduced JAM protocol surface. This page is the authoritative summary for the current Stage 0 environment; it should be updated when the implementation, deployment, or release baseline changes.

## Stage 0 at a glance

| Field | Current value |
| --- | --- |
| Current stage | Stage 0 |
| Network type | Resettable test environment |
| Production ready | No |
| Real economic value | No |
| Sudo enabled | Yes |
| High availability | No |
| Protocol version | `PROTOCOL_VERSION_V1` |
| JamCore interface | `1` |
| Gray Paper baseline | `0.7.2` |

Stage 0 contains one Node, Compiler API, Playground API, three independent Workers, and Playground Web. It is deliberately resettable, non-high-availability infrastructure for testing. Node RPC and internal service ports are not public by default.

## Component status

| Component | Status |
| --- | --- |
| Node | Available |
| Runtime | Available |
| Compiler API | Available |
| Playground API | Available |
| Playground Web | Available |
| Candidate Worker | Available |
| Independent Validator Workers | Available |
| Docker Stage 0 deployment | Available |
| Native local deployment | Available |
| Production network | Not available |
| Full JAM availability | Not implemented |
| JAM disputes and judgments | Not implemented |

## Operational references

- [MiniJAM Client repository](https://github.com/ArcheLabs/minijam-client)
- [Stage 0 deployment README](https://github.com/ArcheLabs/minijam-client/blob/main/deploy/stage0/README.md)
- [Native deployment README](https://github.com/ArcheLabs/minijam-client/blob/main/deploy/native/README.md)
- [Release process and manifest instructions](https://github.com/ArcheLabs/minijam-client/blob/main/deploy/stage0/RELEASING.md)
- [Current release tags](https://github.com/ArcheLabs/minijam-client/tags)
- [JAM Gray Paper](https://graypaper.com/)
- [Bulletin-compatible implementation](https://github.com/ArcheLabs/minijam-client/tree/main/crates/minijam-bulletin-simulator)

The Playground is available at `http://127.0.0.1:4173` after starting the native local deployment. A public Playground address, release manifest, and status page should be linked here when a public release provides them. Last documentation verification: 2026-08-01.

## Known issues and boundaries

The repository's full Runtime and node builds may require the private Jambda revision and its current compiler fixes. Stage 0 does not implement JAM assurance semantics, full availability, global disputes, judgments, or production-grade permanence. Economic parameters and administrative privileges remain development configuration.
