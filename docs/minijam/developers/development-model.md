---
id: development-model
title: Development Model
slug: /minijam/developers/development-model
---

# Development Model

MiniJAM separates service execution into Refine and Accumulate. Refine performs work from declared inputs; Accumulate applies an accepted result to global and service state. A service should make its inputs, outputs, and host interactions explicit so another worker can reproduce the computation.
