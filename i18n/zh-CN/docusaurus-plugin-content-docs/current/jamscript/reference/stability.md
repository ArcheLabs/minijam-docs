---
title: JamScript 稳定性策略
description: JamScript 的稳定级别和 breaking change 预期。
---

# JamScript 稳定性策略

JamScript v0.1 当前是 RC/testnet developer preview。

| 级别 | 含义 | 当前示例 |
|---|---|---|
| Versioned protocol boundary | Wire 变化需要显式 versioned boundary | application ABI、managed-state format、signed/ownership action format |
| Preview API | 可以使用，但源码或行为仍可能变化 | JamScript 语言表面、`jams` CLI、`jamscript.toml`、Backend/Client 便利 API |
| Generated/internal | 不要依赖名称或 layout | generated guest code、allocator layout、build staging file、host-call 细节 |
| Experimental | 已存在但仍在扩展或优化 | 更宽语言覆盖、numeric lowering、性能相关 compiler path |

需要可复现性时：

- 固定精确 JamScript release；
- 验证托管工具链；
- 把 `build.json` 与 `service.abi.json` 和 artifact record 一起保存；
- 保持 Service identity 文件稳定；
- 把 type/schema 变化当作 migration；
- 针对实际部署的 MiniJAM/network release 运行端到端测试。

## 当前性能限制

当前实现使用成熟的 PolkaVM 工具链。这提供了可靠的执行基础，但也带来一定效率损失；
随着 JamScript-specific 工具链继续成熟，这部分开销预计会逐步下降。

当前 ScriptC 路径中，部分普通数值计算在内部仍可能使用浮点 `number` 表示。
Service 边界上的 `u64`、`u128` 等定宽 ABI 类型仍然是明确的，但内部 numeric
lowering 尚未完全优化。

当前 v0.1 原生 release 暂不支持 Windows。

Generated function name、heap 细节、register convention 和中间文件可以在不提升
language version 的情况下变化。
