---
title: JamScript 执行模型
description: JamScript 源码如何成为确定性的 JamV1 PVM Service。
---

# JamScript 执行模型

## 构建流程

```text
service.ts
  → parser + TypeIr metadata
  → ScriptC M2 transformed TypeScript/C
  → 生成的 Rust runtime wrapper
  → freestanding riscv64/lp64e ELF
  → PolkaVM 程序
  → JamV1 PVM/blob
```

Parser 提取 action、state schema、query、认证方式和 ABI 类型。ScriptC M2 编译
应用 body。生成的 Rust 负责协议敏感的部分：SignedActionV1 校验、state-view
处理、transaction 边界、result 编码以及 Refine/Accumulate export。

最终 target 是 JamV1。Canonical build 使用的 target SDK 由 JamScript toolchain
bundle 自带，因此 MiniJAM checkout 不是 compiler dependency。

## Runtime 流程

```text
Work payload
  → Refine 验证并执行 action
  → versioned transition + receipts
  → Accumulate 检查 transition
  → managed-state root commitment
```

Refine 在历史的 proof-backed state view 上执行，并生成确定性的 state diff/root
transition。Accumulate 消费有序的 Refine result，只有 parent root 和 validity
检查匹配时才发布新的 root。应用代码不会在 Accumulate 中再次执行。

## 生成的产物

`jams build` 除了 PVM artifact，还会写入开发者需要检查的文件：

- `service.abi.json`：action、query、state 和 type descriptor；
- `build.json`：compiler、target、code、ABI 和 toolchain identity；
- `protocol-v0.json`：当前 Formal V1/developer-preview 边界；
- `builder.json`：portable producer-side application metadata；
- `generated_service.rs` 与 `generated_builder_application.rs`；
- `checksums.json`：bundle 文件 hash；
- `scriptc/`：可重定位的 ScriptC source、profile、runtime 和 generated C。

把这些文件当作构建证据。应用代码应依赖 source API 和 generated ABI，不要依赖
生成的 Rust function name。
