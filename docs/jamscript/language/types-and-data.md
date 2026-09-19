---
title: JamScript Types and Data
description: Bounded ABI types, JavaScript values, and canonical data encoding in JamScript 0.2.
---

# JamScript Types and Data

JAM validators need to know how large a value can be and how its bytes are
encoded. Every action input, managed-state key/value, and query output therefore
uses an explicit descriptor.

## Type vocabulary

```text
unit, bool
u8, u16, u32, u64, u128
i8, i16, i32, i64, i128
address
fixedBytes(N), bytes(N), string(N)
fixedArray(T, N), array(T, N)
option(T), tuple(...), record({...})
enumType({...}), result(T, E)
```

Descriptors are values in the source language:

```ts
import { address, bytes, record, u32 } from "jam";

const Key = bytes(32); // at most 32 bytes; the actual length is encoded
const Entry = record({
  owner: address,
  score: u32,
});
```

`fixedBytes(N)` requires exactly `N` bytes. `bytes(N)` allows any length from
zero through `N`. The same distinction applies to `fixedArray` and `array`.
The bound is part of validation and ABI identity; it is not a promise that the
value always uses its maximum size.

## What is buildable today?

The language metadata and client codec support the full vocabulary above. The
current ScriptC M2 executable state/action binding supports this smaller set:

```text
unit, bool, u8, u16, u32,
address, fixedBytes(N), bytes(N), record({...})
```

Records may nest the supported types. `u64`, strings, arrays, options, tuples,
enums, results, and wide signed integers are valid descriptors for the ABI
generator/client, but are not yet portable at every M2 execution boundary.
Use `u32` for a first build and check the generated `service.abi.json` before
integrating a wider schema.

## JavaScript and client representations

| Descriptor | Service-side practical value | Client-side value |
|---|---|---|
| `bool` | `boolean` | `boolean` |
| `u8` / `u16` / `u32` | `number` | safe `number` or `bigint` |
| `u64` / `u128`, `i64` / `i128` | ABI-supported, M2 execution limited | `bigint` |
| `address`, `fixedBytes(N)`, `bytes(N)` | `Uint8Array` | `Uint8Array` |
| `string(N)` | descriptor-supported, M2 execution limited | UTF-8 `string` |
| records | object with the declared fields | object with the declared fields |
| option / array / tuple | descriptor-supported, M2 execution limited | `null` / array |

The client accepts a safe integer `number` where appropriate, but `bigint` is
the unambiguous choice for 64- and 128-bit values.

## Canonical encoding

- Fixed-width integers are little-endian.
- Booleans are exactly `00` or `01`.
- `bytes(N)` and `string(N)` encode the actual UTF-8 byte length using JAM
  general-natural encoding, followed by the bytes.
- Addresses are 32 bytes. Fixed bytes and fixed arrays have no extra length
  prefix.
- Records and tuples are encoded in declaration/order order, without field
  names on the wire.
- Options, results, and enums begin with a one-byte variant tag.
- A decoder must consume the complete value; trailing bytes, invalid tags,
  malformed UTF-8, and bound violations are errors.

The application ABI uses these canonical JAM codec rules. It is separate from
the JAM protocol's `FnEncode` fields used at the Accumulate boundary.

## Size limits that affect design

| Boundary | Current limit |
|---|---:|
| One action payload | 1,000,000 bytes |
| One managed-state key | 4,096 bytes |
| One managed-state value | 65,536 bytes |
| State-view entries | 4,096 |
| Encoded state view | 1 MiB |

The compiler calculates maximum encoded lengths and rejects a schema that
cannot fit its boundary. Prefer small, stable records and version schema names
before deploying them.
