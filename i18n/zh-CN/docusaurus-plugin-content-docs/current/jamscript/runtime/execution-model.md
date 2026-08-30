---
title: JamScript 执行模型
description: JamScript 源码如何成为确定性的 PVM Service。
---

# JamScript 执行模型

```text
service.ts → JamScript 元数据 IR + ScriptC M2 → 生成的 runtime wrapper
           → RISC-V ELF → PolkaVM 程序 → JamV1 PVM/blob
```

构建时，JamScript 生成 ABI 和 Service wrapper，通过 ScriptC 编译可达的 TypeScript compute，并链接 freestanding `riscv64/lp64e` guest。MiniJAM converter 输出 `service.polkavm`、`service.pvm` 和 `service.blob`。

执行时，`minijam_refine` 校验 Formal V1 签名 action，读取已认证的历史状态视图，运行 action 并返回版本化结果。`minijam_accumulate` 接收当前 tick 和有序 Work Result，校验过期条件和 parent-root compare-and-swap，再提交新的托管状态 root。

MiniJAM 是当前 adapter；此基线不声称直接支持完整 JAM profile。
