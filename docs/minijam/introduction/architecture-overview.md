---
id: architecture-overview
title: Architecture Overview
slug: /minijam/introduction/architecture-overview
sidebar_position: 3
---

# Architecture Overview

MiniJAM is an independent Polkadot SDK chain composed of a Node, Runtime, Worker set, Bulletin-compatible data boundary, Bridge, and state-processing components. The Playground API also acts as the Stage 0 bundle gateway.

The current Work lifecycle is:

```text
Work submission
→ deterministic Worker assignment
→ ReportEnvelopeV1 submission
→ candidate report bond
→ assigned Worker Support/Oppose voting
→ accepted report enters execution queue
→ Runtime executes Accumulate
→ atomic state update
→ receipt and effects recorded
```

Workers re-fetch the declared inputs and independently validate the report before voting. The Runtime then validates and normalizes state changes before applying them atomically.

Stage 0 uses a `BulletinEvidence` abstraction, a Bulletin-compatible simulator, and the Playground API bundle gateway. This is not JAM availability and is not a direct integration with a production Bulletin Chain.
