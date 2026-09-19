---
title: Compatibility and Source of Truth
description: How to read MiniJAM and JamScript versions without duplicating protocol facts across repositories.
---

# Compatibility and Source of Truth

This site is an explanation and onboarding layer. It is not a third independent protocol specification.

| Concern | Canonical owner |
|---|---|
| MiniJamSpec, network constants, execution boundary, Stage-1 deployment | MiniJAM Client / pinned Jambda |
| JamScript language, compiler, application ABI, managed state, ownership, backend/client protocols | JamScript |
| MINI economics and incentive mechanisms | MINI ecosystem documents and governance process |

MiniJAM and JamScript can advance independently, so this site avoids a second hand-copied version table.

Before pinning a deployment, check:

- [MiniJAM compatibility matrix](https://github.com/ArcheLabs/minijam-client/blob/main/docs/compatibility-matrix.md)
- [MiniJAM execution boundary](https://github.com/ArcheLabs/minijam-client/blob/main/docs/execution-boundary.md)
- [JamScript releases](https://github.com/ArcheLabs/JamScript/releases)
- [JamScript MiniJAM compatibility notes](https://github.com/ArcheLabs/JamScript/blob/main/docs/minijam-spec-compatibility.md)

Repository main branches may contain work newer than the latest public release. Use the selected release artifacts and their matching compatibility information for reproducible deployments.

This page intentionally avoids pinning moving main-branch version numbers; release-specific compatibility belongs to the selected release evidence.
