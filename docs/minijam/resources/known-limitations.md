---
id: known-limitations
title: Known Limitations
slug: /minijam/resources/known-limitations
---

# Known Limitations

MiniJAM is experimental. The first phase does not implement the complete JAM availability, guarantor, auditor, judgment, adjudication, Coretime market, or economic mechanisms. Consult the current release documentation and deployment configuration before relying on an interface.

## Source availability

The complete MiniJAM Stack cannot currently be built independently from the public repository because the execution path depends on a pinned private Jambda revision. The supported deployment artifact is the digest-pinned Docker release.

This limitation applies to building the complete Node, Runtime, Worker, and execution Stack. It is not a limitation of the JAM HostCall model.
