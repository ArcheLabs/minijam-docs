---
title: Install the JamScript Toolchain
description: Install the JamScript CLI and its reproducible compiler toolchain.
---

# Install the JamScript Toolchain

There are two ways to work with JamScript:

1. Use a published CLI and its managed toolchain bundle for reproducible
   builds.
2. Build the CLI from the repository when working on JamScript itself or when
   the matching release bundle is not published yet.

Neither path needs a MiniJAM checkout for compilation. MiniJAM is a downstream
network and compatibility check.

## Recommended: managed toolchain bundle

Download the `jams` CLI archive, the matching managed toolchain archive, and
the release checksums from the same GitHub Release. Verify the downloaded
checksums, then run:

```bash
./jams toolchain install
./jams doctor
```

The first command may download the exact bundle once. The bundle owns Node,
ScriptC, Rust, Clang/LLVM, the PolkaVM linker, Cargo dependencies, and the JAM
target SDK. A canonical build does not fall back to the host `node`, `rustc`,
or `clang`.

After installation, builds can be completely offline:

```bash
./jams build ./my-service --offline
```

Use `JAMSCRIPT_TOOLCHAIN_HOME` to place the immutable bundle cache somewhere
specific, such as a CI cache. `jams toolchain verify` checks the installed
files again; `jams toolchain status --json` is convenient for CI diagnostics.

## Repository checkout: contributor mode

This is the useful path for the current development tree:

```bash
git clone https://github.com/ArcheLabs/JamScript.git
cd JamScript
npm --prefix toolchains/scriptc ci --ignore-scripts
cargo build --locked --bin jams
./target/debug/jams --version
```

The repository pins the required versions in `rust-toolchain.toml` and the
toolchain manifest. The source build expects Rust
`nightly-2026-05-02`, Node `24.15.0`, and Clang `20.1.8` on a Linux x86_64
development host. Select the repository's compiler and target files explicitly:

```bash
export JAMSCRIPT_DEV_TOOLCHAIN=1
./target/debug/jams check examples/counter
```

Contributor artifacts are marked `canonical_toolchain: false` in `build.json`.
They are useful for development, but they are not release artifacts.

If Clang is not at `/usr/lib/llvm-20/bin/clang`, set
`JAMSCRIPT_CLANG` to its absolute path. `JAMSCRIPT_LLVM_AR` and
`JAMSCRIPT_READELF` are available for the corresponding tools when needed.

:::tip Check the environment before a long build

Run `./target/debug/jams check <project>` first, then `./target/debug/jams abi
<project>`. These commands parse the project and generate metadata without
building the PVM guest.

:::

## Platform note

The published v0.1 distribution starts with Linux x86_64. Other platforms may
be listed in the release manifest as pending or unsupported; do not assume a
host platform is supported merely because the source checkout builds there.
