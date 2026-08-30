---
title: Determinism in JamScript
description: Why JamScript excludes ambient JavaScript runtime behavior.
---

# Determinism in JamScript

Every validator must obtain the same result from the same Service code, input, and anchored state. JamScript therefore makes dependencies explicit and rejects reachable ambient behavior.

Services do not have browser APIs, network or filesystem access, a system clock, timers, process environment, uncontrolled entropy, dynamic loading, `eval`, or Promise/async scheduling. `Date.now()` and `Math.random()` are unavailable for the same reason.

Use signed inputs, bounded ABI values, and protocol-provided context instead. If a Service needs time-like or random-looking data, it must come from an explicitly defined, consensus-safe protocol input; JamScript `0.2` does not invent such a source.

ScriptC's surface manifest and JamScript's reachability analysis enforce these fences. An unreachable helper may contain a forbidden name, but a reachable use fails the build.
