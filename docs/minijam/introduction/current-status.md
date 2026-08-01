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
| Production network | Not available |
| Full JAM availability | Not implemented |
| JAM disputes and judgments | Not implemented |
| Complete source build for external users | Not available |
| Digest-pinned Docker release deployment | Supported |
| Hosted public Playground | Link when deployed |
| Run local development network from images | Supported |
| Hosted Stage 0 | Maintainer-operated |
| Self-host official Stage 0 genesis | Maintainer-only |

## Operational references

- [MiniJAM Client repository](https://github.com/ArcheLabs/minijam-client)
- [Stage 0 deployment README](https://github.com/ArcheLabs/minijam-client/blob/main/deploy/stage0/README.md)
- [Release process and manifest instructions](https://github.com/ArcheLabs/minijam-client/blob/main/deploy/stage0/RELEASING.md)
- [Stage 0 troubleshooting](https://github.com/ArcheLabs/minijam-client/blob/main/deploy/stage0/TROUBLESHOOTING.md)
- [Current release tags](https://github.com/ArcheLabs/minijam-client/tags)
- [JAM Gray Paper](https://graypaper.com/)
- [Bulletin-compatible implementation](https://github.com/ArcheLabs/minijam-client/tree/main/crates/minijam-bulletin-simulator)

After a Docker deployment becomes healthy, the Playground is available at `http://127.0.0.1:4173` by default. A hosted public Playground URL, release manifest, and status page should be listed separately when deployed. Last documentation verification: 2026-08-01.

:::note Maintainer note

The repository may contain Native deployment materials for maintainer and development use. They are not an external-user deployment path and are not the supported way to run the complete Stack.

:::

## Known issues and boundaries

The repository's full Runtime and node builds may require the private Jambda revision and its current compiler fixes. Stage 0 does not implement JAM assurance semantics, full availability, global disputes, judgments, or production-grade permanence. Economic parameters and administrative privileges remain development configuration.
