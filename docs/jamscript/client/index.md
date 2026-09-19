---
title: JamScript Client
description: Typed application access to JamScript actions and managed state.
---

# JamScript Client

The JamScript client is the application-facing interface for deployed Services.

Its job is to keep network topology, proof plumbing, and binary encoding below the normal application API while preserving explicit verification choices.

## State queries

The default application path asks the backend for a value after the backend confirms that its materialized head matches the finalized canonical root.

Applications that need independent verification can select proof verification so the client receives a value plus storage proof and verifies it against the canonical root.

The choice is about frontend trust and convenience; it does not change the consensus execution rules.

## Actions and ownership

Client-side action construction follows the Service ABI and the configured ownership/authentication method. Ownership identifies the cryptographic controller; the concrete action envelope still carries the authorization data needed by the selected protocol.

## Network topology

A frontend should normally know the JamScript backend URL, not every Node, Worker, or Formal RPC endpoint.

This keeps infrastructure topology replaceable without making it part of application state or source code.

For exact client APIs, use the selected JamScript release and its generated ABI/client package as the authoritative contract.
