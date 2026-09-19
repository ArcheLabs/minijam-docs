---
title: JamScript Refine and Accumulate
description: What the generated Refine and Accumulate boundaries do for a Service.
---

# JamScript Refine and Accumulate

Application authors export actions, state, and queries. The target generates
the PVM entries; you normally never write these functions yourself.

```text
signed action + state witness
  → Refine
  → authenticated state transition / receipts
  → Accumulate
  → committed managed-state root
```

## Refine

The generated `minijam_refine` entry:

1. obtains the opaque Work payload from the target host;
2. decodes the Formal `SignedActionV1` envelope for wallet actions;
3. checks the network domain, Service key, action selector, payload hash,
   sr25519 signature, expiry, and sender nonce;
4. opens the proof-backed managed-state view;
5. runs the selected ScriptC action in a transaction;
6. encodes the new root, receipts, and recovery/state transition output.

For `publicAction()`, the payload is not signed and the sender is empty. The
current generated runtime supports either wallet-only actions or one public
action, not a mixture.

If the action reads a key not present in the witness, the runtime can return a
`NeedState` dependency. A producer can expand the access plan and rerun the
action; this is why dynamic state access remains deterministic.

## Accumulate

The generated `minijam_accumulate` entry does not rerun application code. It:

- reads the authoritative tick and ordered Refine results;
- starts from the current managed-state commitment;
- accepts only a transition whose parent root matches the current root;
- rejects a transition when `tick > valid_until`;
- writes the new 34-byte managed-state commitment to the reserved runtime key.

Expiry is inclusive: `tick == valid_until` is still valid. Accumulate ignores
the application-level state diff as new application logic; the transition and
proof checks establish the new root.

The export names, host-call numbers, and `a0/a1` register conventions are
target ABI details. They are useful when integrating a host or debugging an
artifact, but they are not part of the JamScript application API.
