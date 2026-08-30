---
title: JamScript Runtime ABI
description: 当前应用、runtime 与 MiniJAM target ABI 版本。
---

# JamScript Runtime ABI

| 边界 | 当前值 |
|---|---|
| 源语言 | `0.2` |
| Application / Native C ABI | `1` / `1` |
| 签名 action | Formal `SignedActionV1` |
| 托管状态 protocol/layout | `1` / `1` |
| Runtime Refine input / recovery | `1` / `1` |
| target adapter | `minijam-0.2` |
| MiniJAM SDK ABI | `1` |

公开 PVM export 是 `minijam_refine` 和 `minijam_accumulate`。Refine 通过 `a0/a1` 返回输出指针/大小；Accumulate 启动时从 `a0/a1` 取得输入指针/大小且无输出寄存器。

应用数据使用生成的 descriptor 和 Jambda `jam-codec 0.1.1` 规则。decoder 会拒绝错误 tag、非法 UTF-8、越界值、尾随字节和不完整数据。`build.json`、`protocol-v0.json` 与 `service.abi.json` 是 artifact 层面的事实来源。Formal V1 是首个受支持的 wire/runtime protocol，但 JamScript 整体仍未稳定。
