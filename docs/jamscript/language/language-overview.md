---
title: JamScript Language Overview
description: The language and program model implemented by JamScript 0.2.
---

# JamScript Language Overview

JamScript `0.2` accepts a restricted TypeScript compilation unit. Imports come from `jam` or declared `native:<module>` C modules. Top-level declarations define bounded types, state, exported actions, and queries; ScriptC compiles reachable action bodies.

An action declares authentication, bounded input, and `execute(ctx, input)`. Queries expose declared state. Persistent values use `state` or `stateMap`; ordinary variables and allocations live only for one execution.

JamScript is not a full browser or Node.js runtime. There is no DOM, ambient filesystem/network access, clock, entropy source, timer loop, or Promise/async execution. These restrictions preserve deterministic replay.

The compiler parses metadata into a typed IR, compiles compute code through ScriptC M2, generates a Rust runtime wrapper, links the PVM guest, and emits MiniJAM deployment artifacts. See [Supported JavaScript](./supported-javascript.md) for the verified language surface.
