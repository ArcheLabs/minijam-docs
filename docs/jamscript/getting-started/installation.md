---
title: Install JamScript
description: Install the JamScript CLI, managed toolchain, and matching backend.
---

# Install JamScript

## Quick install

For normal development, use the official installer:

```bash
curl -fsSL https://install.minijam.xyz/jamscript | bash
```

With no arguments, the installer selects the latest published JamScript release,
including RC releases, and installs three matching components:

- `jams` — the JamScript CLI;
- the managed compiler/toolchain used by `jams build`;
- the native `jamscript-service-backend` from the matching backend release.

The installer verifies the SHA-256 checksums published with the release before
installing executables.

The default binary directory is:

```text
~/.local/bin
```

If that directory is not already on `PATH`, the installer prints the command
needed for the current shell.

## Supported platforms

The current v0.1 release line provides native release artifacts for:

- Linux x86_64;
- macOS Apple Silicon (arm64).

Windows is not supported by the current release.

## Verify the installation

```bash
jams --version
jams toolchain verify
```

The managed toolchain is installed by the bootstrap installer, so normal users
do not need to install Rust, Cargo, Node, LLVM, ScriptC, or the PolkaVM linker
separately.

You can inspect the managed toolchain with:

```bash
jams toolchain status
jams toolchain status --json
jams toolchain path
```

## Pin an exact release

For reproducible development or CI, pin an immutable release tag:

```bash
curl -fsSL https://install.minijam.xyz/jamscript \
  | bash -s -- --version v0.1.0-rc.7
```

The installer resolves the matching backend release automatically. For the
example above, that is `backend-v0.1.0-rc.7`.

A custom binary directory can be selected with:

```bash
curl -fsSL https://install.minijam.xyz/jamscript \
  | bash -s -- --bin-dir "$HOME/bin"
```

## Start the backend

For a project with a configured local MiniJAM network:

```bash
jams backend start --network local
```

The backend runs in the foreground. The installer places the matching native
backend next to `jams`, so Docker is not required for the normal JamScript
development path.

Custom backend binaries remain supported through `PATH` and
`JAMSCRIPT_BACKEND_BIN`.

## Offline builds

After the managed toolchain has been installed, builds can be run without
toolchain downloads:

```bash
jams build . --output dist --offline
```

`JAMSCRIPT_TOOLCHAIN_HOME` can be used to move the managed toolchain cache,
for example into a CI cache directory.

## Bootstrap requirements

The installer needs Bash, curl, tar, gzip, awk, and either `sha256sum` or
macOS `shasum`.

It does **not** require:

- a JamScript repository checkout;
- a MiniJAM source checkout;
- preinstalled Rust/Cargo;
- preinstalled Node;
- preinstalled LLVM/Clang;
- Docker.

## Manual installation

If you do not want to pipe the installer into Bash:

1. download the platform-specific JamScript CLI archive and `SHA256SUMS` from
   the selected `v...` GitHub Release;
2. download the platform-specific backend archive and `SHA256SUMS` from the
   matching `backend-v...` Release;
3. verify both checksums;
4. install `jams` and `jamscript-service-backend` into a directory on
   `PATH`;
5. run `jams toolchain install` and `jams toolchain verify`.

Source builds are intended for work on JamScript itself, not as the recommended
application-development installation path.

Continue with the [Quickstart](./quickstart.md).
