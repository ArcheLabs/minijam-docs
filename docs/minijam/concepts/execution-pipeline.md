---
id: execution-pipeline
title: Execution Pipeline
slug: /minijam/concepts/execution-pipeline
---

# Execution Pipeline

The core path is:

```text
Service code → Refine → Work Report → independent verification → Accumulate → state change
```

Refine is the reproducible computation stage. Independent verification re-fetches inputs and checks the result. Accumulate is the state-changing stage.
