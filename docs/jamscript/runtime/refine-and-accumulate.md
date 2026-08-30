---
title: JamScript Refine and Accumulate
description: Generated Refine and Accumulate boundaries for JamScript Services.
---

# JamScript Refine and Accumulate

```text
Refine → authenticated Work Result → Accumulate → persistent Service state root
```

Application authors export actions and queries; they do not manually implement the PVM entries. The target generates both boundaries.

## Refine

`minijam_refine()` obtains the action payload through MiniJAM SDK `FETCH` mode `13`. It verifies the SignedActionV1 network domain, ServiceKey, selector, payload commitment, sr25519 signature, expiry field, and nonce context. It executes against proof-backed managed state and returns the result pointer and length in `a0/a1`.

## Accumulate

`minijam_accumulate()` captures the VM-initialized `a0/a1` input and decodes `(tick, service_id, item_count)`. It fetches ordered operands with mode `15`, validates the result envelope, parent root, and expiry, then writes the reserved managed-state commitment through MiniJAM `WRITE`.

Expiry is inclusive: a result may commit when `tick <= valid_until`; it is rejected when `tick > valid_until`. Accumulate does not rerun application compute.

These names and register conventions are MiniJAM SDK ABI 1 behavior, not a promise for every future JAM target.
