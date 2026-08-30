---
title: JamScript 内存模型
description: 执行期分配与持久状态边界。
---

# JamScript 内存模型

生成的 Service 在有界 PVM linear memory 中运行。普通变量、数组、字符串、对象和 typed array 仅存在于一次执行中；持久数据必须进入托管状态。

freestanding runtime 为 ScriptC 提供 C 兼容的 `malloc`、`calloc`、`realloc` 和 `free`，并委托给 guest allocator。分配有上限，容量耗尽会 trap，而不会向操作系统申请内存。地址和对象布局不是稳定应用 API。

生产 guest 当前保留 64 KiB ScriptC heap，PVM build 声明 2 MiB 最小 stack。这些是当前 target 参数，并非语言保证。应用应使用有界数据。
