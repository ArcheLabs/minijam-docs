---
title: Ownership Abstraction
description: Cryptographic control identities that are independent from one specific chain account format.
---

# Ownership Abstraction

JamScript separates **ownership** from a particular blockchain account model.

Ownership is the canonical cryptographic public control identifier used by the application boundary. It is not a username, account balance, transaction, social identity, or authorization proof by itself.

## Why it exists

Traditional blockchain applications often couple:

~~~text
chain
  = account format
  = signature scheme
  = user identity
~~~

JamScript instead allows the application to reason about a canonical ownership primitive while adapters resolve external cryptographic representations into it.

That creates room for Polkadot, EVM, other signature systems, and future cryptography without redefining every application-state schema around one wallet format.

## Adapters are not new ownership kinds

Polkadot, EVM, Matrix, and other integrations are adapters around the ownership primitive.

An adapter must define how an external representation is resolved and what verification or trust is required. A social username is not automatically a cryptographically verifiable on-chain identity merely because an adapter exists.

This is especially important for identity systems where the external platform does not expose a universally verifiable user key. In those cases, the mapping/claim layer must make its trust assumptions explicit.

## Ownership versus authorization

Ownership identifies the public cryptographic controller. A concrete action still needs an authorization proof, replay/nonce handling, domain separation, and application policy.

Do not treat an Ownership value alone as a signed action.

For the current primitive encoding and adapter contracts, see [Ownership Abstraction v1](https://github.com/ArcheLabs/JamScript/blob/main/docs/ownership-abstraction-v1.md).
