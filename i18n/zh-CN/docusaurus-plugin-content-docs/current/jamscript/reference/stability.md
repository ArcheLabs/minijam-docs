---
title: JamScript 稳定性策略
description: JamScript 当前稳定级别和 breaking change 预期。
---

# JamScript 稳定性策略

JamScript 尚未稳定。

| 级别 | 含义 | 当前示例 |
|---|---|---|
| Formal V1 内稳定 | 变更需要版本化边界 | SignedActionV1、application ABI 1 descriptor、managed-state layout 1 |
| 实验性 | 可用但可能随迁移说明改变 | 语言 `0.2`、CLI、ScriptC M2、配置 |
| 内部 | 不提供应用兼容承诺 | 生成的 Rust/C、allocator 布局、构建中间文件 |
| 已弃用 | 暂时保留，不建议新增使用 | manifest `service_id` 与 legacy `genesis_hash` 拼写 |

Formal V1 是首个受支持的 wire/runtime protocol，之前的开发代际不是合同。源码兼容范围窄于 TypeScript，稳定语言发布前仍可能改变。可复现构建应锁定仓库和 lockfile revision，并把 schema 变化视为明确的状态迁移。
