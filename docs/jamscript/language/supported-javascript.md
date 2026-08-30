---
title: Supported JavaScript in JamScript
description: Verified ScriptC M2 and JamScript 0.2 language compatibility.
---

# Supported JavaScript in JamScript

This matrix describes the current tested surface, not general TypeScript or ScriptC compatibility.

| Feature | Status | Notes |
|---|---|---|
| `const` / `let` | Supported | Used by current fixtures |
| Functions and nested helpers | Supported | Reachable helpers are analyzed |
| Conditionals, loops, comparisons | Supported | PVM conformance-tested |
| Arrays | Supported | PVM conformance-tested; ABI arrays must be bounded |
| Object literals and properties | Supported | PVM conformance-tested |
| Strings | Supported | ABI strings require `string(max)` |
| `Uint8Array` | Supported | PVM conformance-tested |
| Closures | Experimental | Not part of the published conformance claim |
| Classes | Experimental | Not part of the published conformance claim |
| Exceptions | Partial | Runtime catches action failures; general exception semantics are not a stable API |
| Floating-point `number` | Partial | ScriptC has deterministic soft-float coverage; ABI numbers require explicit integer descriptors |
| `bigint` | Partial | Used for wide integer values; only declared ABI widths are portable |
| Promise / `async` / `await` | Unsupported | Reachable uses are rejected |
| `Date` and clocks | Unsupported | Nondeterministic ambient time |
| `Math.random()` / entropy | Unsupported | Nondeterministic randomness |
| `fetch`, sockets, filesystem | Unsupported | Ambient I/O is unavailable |
| DOM and browser APIs | Unsupported | No browser environment |
| timers | Unsupported | No event loop |
| dynamic import, `eval`, `Function` | Unsupported | Reachable uses are rejected |

The parser also restricts top-level structure: named imports only, `export const` actions/queries, state declarations, and helper functions. Compiler limitations and deliberate determinism fences may both produce errors; neither should be treated as ordinary JavaScript runtime behavior.
