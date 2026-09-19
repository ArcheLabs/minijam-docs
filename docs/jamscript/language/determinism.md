---
title: Determinism in JamScript
description: Why JamScript excludes ambient JavaScript runtime behavior.
---

# Determinism in JamScript

A validator must get the same result from the same Service code, signed input,
and anchored state. JamScript makes those inputs explicit and removes APIs that
could vary from one machine or replay to another.

## What a Service can depend on

- its declared action input;
- the verified wallet sender, when the action uses `wallet()`;
- the managed state supplied by the anchored witness;
- deterministic code and bounded data transformations.

There is no Service-side access to the system clock, network, filesystem,
environment variables, browser APIs, timers, threads, uncontrolled randomness,
or an operating-system allocator.

## APIs that are rejected

The current deterministic profile rejects `Date`, `Date.now()`,
`performance.now()`, `Math.random()`, `process`, `fetch`, sockets, filesystem
calls, `Promise`, `async`/`await`, dynamic imports, `eval`, `require`, and the
`Function` constructor. `globalThis` and DOM/browser globals are not available.

The M2 transform checks the full TypeScript source unit. An unused helper that
contains a forbidden API can therefore still fail the build. This is useful:
the error appears during compilation rather than after deployment.

## What to do instead

Pass changing information as a bounded action field, and pass authorization as
a signed wallet action. If an external system has to fetch data or use a clock,
perform that work outside the Service and include the resulting, explicitly
validated bytes in the protocol input. Do not try to recreate time or
randomness from local machine state.

`publicAction()` is intentionally weaker: it has no signer and receives an
empty sender. A public action must not use `ctx.sender`.
