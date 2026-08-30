---
title: JamScript 编译器
description: 检查、查看并把 JamScript 0.2 编译为 PVM 产物。
---

# JamScript 编译器

当前 CLI 从 JamScript Rust workspace 构建：

```bash
cargo build --locked --bin jamscript
cargo run --locked --bin jamscript -- new NAME
cargo run --locked --bin jamscript -- check PATH
cargo run --locked --bin jamscript -- abi PATH
cargo run --locked --bin jamscript -- build PATH --output dist
cargo run --locked --bin jamscript -- inspect dist
```

`check` 校验 manifest/source 与元数据；`abi` 输出 descriptor；`build` 执行完整 ScriptC M2/MiniJAM target pipeline；`inspect` 校验 bundle checksum 并打印元数据。

```text
TypeScript → JamScript parser/IR → ScriptC 0.0.34 C
→ 生成的 Rust runtime → Clang 20 + rust-lld → PolkaVM linker 0.30.0
→ MiniJAM converter → deployment bundle
```

语言 `0.2` 强制 `[compiler] backend = "scriptc"`，没有 legacy fallback。CLI 当前没有 optimization 或其他 target flag。
