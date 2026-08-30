---
title: JamScript Types and Data
description: Bounded ABI types and canonical data encoding in JamScript 0.2.
---

# JamScript Types and Data

Values crossing an action, state, query, or client boundary require a bounded descriptor:

- `unit`, `bool`, `u8/u16/u32/u64/u128`, `i8/i16/i32/i64/i128`;
- `address`, `fixedBytes(N)`, `bytes(N)`, `string(N)`;
- `fixedArray(T,N)`, `array(T,N)`, `option(T)`, `tuple(...)`, `record({...})`;
- bounded `enumType({...})` and `result(T,E)`.

Fixed-width integers are little-endian. Values of `u64`, `u128`, `i64`, and `i128` are represented as `bigint` in the TypeScript client. Records encode fields in declaration order; enums use fixed declared indices. Dynamic bytes, strings, and arrays include a JAM general-natural length and must remain within their declared maximum.

Plain JavaScript `number`, unbounded arrays or strings, `any`, `unknown`, and undescribed objects are not ABI types. The compiler calculates maximum encoded length and rejects boundary types exceeding action, state-key, or state-value limits.
