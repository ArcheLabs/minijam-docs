---
id: minijam-and-jam
title: MiniJAM and JAM
description: A comparison of MiniJAM and the JAM protocol.
slug: /minijam/introduction/minijam-and-jam
sidebar_position: 4
---

:::info Translation status

The complete first draft is currently available in Simplified Chinese. Use the language selector to read it. The English translation is in progress.

:::

This page explains the relationship between MiniJAM and JAM, including their execution model, network architecture, availability assumptions, verification process, and compatibility boundaries. JAM's authoritative protocol definition is the relevant version of the [Gray Paper](https://graypaper.com/). MiniJAM is an independent Polkadot SDK chain, not the JAM mainnet, and does not claim complete JAM protocol implementation.

The current implementation uses its own Aura block producers and GRANDPA finality participants. It does not inherit shared security from the Polkadot Relay Chain.

The Stage 0 data boundary uses a Bulletin-compatible simulator and the Playground API bundle gateway. It does not implement JAM availability or directly depend on a production Bulletin Chain. The current protocol baseline is `PROTOCOL_VERSION_V1`, JamCore interface `1`, and Gray Paper semantics `0.7.2`.

## HostCall boundary

MiniJAM does not define a reduced application HostCall set. Service HostCall semantics come from the pinned Jambda/JAM execution implementation.

MiniJAM-specific differences are implemented in system-service handling and in the integration between Work processing, Worker validation, Runtime execution, and chain state. This documentation therefore does not maintain a separate MiniJAM HostCall support matrix.
