---
id: architecture-overview
title: Architecture Overview
slug: /minijam/introduction/architecture-overview
sidebar_position: 3
---

# Architecture Overview

MiniJAM connects service programs, workers, a runtime, and a data layer. A worker obtains the inputs for a Work Package, executes Refine, and produces a Candidate or Work Report. Independent workers can re-fetch the inputs and re-execute the computation before support is submitted. Accumulate then applies accepted results to chain state.

This architecture is deliberately a documented subset and should not be read as a complete description of JAM networking or availability.
