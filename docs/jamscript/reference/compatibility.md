---
title: JamScript Compatibility
description: How to pin a released JamScript build without confusing release and main-branch protocol state.
---

# JamScript Compatibility

JamScript has several independently evolving boundaries: source language, compiler backend, target/SDK ABI, signed-action protocol, managed-state protocol, backend/client protocol, and downstream MiniJAM compatibility.

A single hand-copied table on this website is therefore not authoritative.

## For a released build

For a particular artifact, keep and trust:

- the JamScript release identity;
- the project manifest and Service identity;
- generated Service ABI;
- build metadata and checksums;
- protocol/build evidence shipped with the artifact.

The selected release assets and generated build metadata define what was actually used.

## For network compatibility

JamScript compilation does not require MiniJAM or Jambda. MiniJAM is a downstream deployment/execution target, so network compatibility must be checked separately.

Use:

- [JamScript releases](https://github.com/ArcheLabs/JamScript/releases)
- [JamScript MiniJAM compatibility notes](https://github.com/ArcheLabs/JamScript/blob/main/docs/minijam-spec-compatibility.md)
- [MiniJAM compatibility matrix](https://github.com/ArcheLabs/minijam-client/blob/main/docs/compatibility-matrix.md)

## Main is not a release

The main branch can contain newer language/runtime work than the latest published CLI/toolchain. Do not mix a main-branch protocol description with an older release artifact unless that compatibility is explicitly tested.

Changing a boundary type, field order, action selector, state schema, codec, signing protocol, managed-state version, or target requires an explicit compatibility/migration review.
