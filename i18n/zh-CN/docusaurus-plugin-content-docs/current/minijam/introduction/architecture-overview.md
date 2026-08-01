---
id: architecture-overview
title: 架构概览
slug: /minijam/introduction/architecture-overview
sidebar_position: 3
---

# 架构概览

MiniJAM 连接服务程序、Worker、运行时和数据层。Worker 获取 Work Package 的输入，执行 Refine，并产生 Candidate 或 Work Report。独立 Worker 可以重新获取输入并重新执行计算，再提交 Support。Accumulate 随后将被接受的结果应用到链上状态。

该架构是有明确范围的文档子集，不应理解为 JAM 网络或可用性机制的完整描述。
