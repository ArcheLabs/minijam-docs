---
id: execution-pipeline
title: 执行流程
slug: /minijam/concepts/execution-pipeline
---

# 执行流程

核心路径是：

```text
服务代码 → Refine → Work Report → 独立验证 → Accumulate → 状态变化
```

Refine 是可复现的计算阶段。独立验证会重新获取输入并检查结果。Accumulate 是改变状态的阶段。
