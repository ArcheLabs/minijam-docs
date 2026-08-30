---
id: quickstart
title: Developer Overview
description: The current MiniJAM service development workflow and its stability boundary.
slug: /minijam/developers/quickstart
---

# Quickstart

MiniJAM Playground lets you write, compile, and deploy a simple MiniJAM Service directly in the browser, then submit Work to modify its on-chain state.

The current Playground provides C and C++ examples. It is suitable for trying the basic MiniJAM Stage 0 flow.

## Choose a development path

- **JamScript:** the recommended high-level, deterministic TypeScript-based path for writing JAM Services. Start with the [JamScript overview](/docs/jamscript) or [Quickstart](/docs/jamscript/getting-started/quickstart).
- **C / C++:** available through the current MiniJAM Playground and lower-level tooling. The workflow below remains the C/C++ Playground path.

:::warning The Complete Stack Cannot Currently Be Built from Public Source

Because the Jambda dependency used by MiniJAM is currently private, you cannot build the complete MiniJAM Stack locally from public source alone.

We are working on opening the relevant dependencies. Until then, you can still run the complete service through published Docker images.

:::

To run the complete environment, continue with Docker deployment.

## Connect a Wallet

Before deploying a Service or submitting Work, connect a Polkadot wallet. Note: a real JAM environment does not have this step. MiniJAM currently includes it to make testing easier and to prevent early Services from interfering with each other. The formal MiniJAM testnet will differ.

## Counter Example

The Counter example includes two main execution entry points:

- `Refine`: reads the counter increment from the Work Payload;
- `Accumulate`: reads the current counter value, applies the increment, and writes it back to storage.

The counter value is stored under the Service Storage Key named `counter`. You can complete the following build and deployment flow without changing the example code.

## Compile the Service

Click **Build service**.

![Build Service](/minijam/build.png)

After compilation completes, the page shows:

- build status;
- Code Hash;
- Blob Size;
- Toolchain used;
- programming language and optimization level.

If compilation fails, compiler diagnostics appear in the result area. Fix the code according to the error message, then click **Build service** again to recompile.

## Deploy the Service

After the build succeeds, click **Deploy service**.

![Open Playground](/minijam/build.png)

Playground shows a confirmation dialog for the deployment operation, including:

- Controller;
- Code Hash;
- Code Length.

After confirming the information, sign in your wallet.

![Confirm Deployment Operation](/minijam/sign.png)

## Wait for the Operation to Complete

After signing, the page navigates to the Operation page.

Playground continuously queries the operation status. When creating a Service, the operation may go through the following stages:

```text
Preparing
    v
Submitted
    v
Waiting for finality
    v
Publishing code
    v
Waiting for finalized code
    v
Completed
```

![Wait for Deployment Completion](/minijam/service.png)

Depending on the operation type, the page may also show:

- Operation ID;
- Extrinsic Hash;
- Service ID;
- Work ID;
- Execution Receipt;
- Package Hash;
- Bundle CID.

Only finalized data is displayed as completed.

After deployment completes, click **Open Service** to enter the Service page.

## View the Service

The Service page shows current finalized on-chain information, including:

- Controller;
- Code Hash;
- Code Length;
- Preimage status;
- Finalized Block.

Only the Service Controller can submit Work or upgrade the Service. When another account is connected, these actions are disabled. This is a Stage 0-specific restriction.

## Submit Work

Fill in the Payload in the **Submit Work** area.

For the Counter example, use the default **Counter increment** encoding mode and enter an integer such as:

```text
1
```

Click **Run Work**.

![Submit Counter Work](/minijam/work.png)

After confirming the operation and signing in your wallet, Playground navigates to a new Operation page.

Work goes through Worker Candidate, voting, and Accumulate stages. When the page shows **Completed**, the Work has finished processing.

Then click **View finalized Service state** to return to the Service page.

## Read Finalized State

In the **Observe storage** area of the Service page, set the Storage Key to:

```text
counter
```

Click **Read finalized value**.

![Read Counter State](/minijam/value.png)

The page shows:

- the raw hexadecimal storage value;
- the decoded Counter value;
- the finalized block corresponding to the value.

For example, if the first submitted increment is `1`, the result usually shows:

```text
Counter: 1
```

After submitting another increment of `2`, the final result becomes:

```text
Counter: 3
```

## Upgrade the Service

The Service page also provides code upgrade functionality.

The upgrade flow is similar to the initial deployment:

1. modify the new C source code;
2. click **Build upgrade**;
3. check the new Code Hash;
4. click **Upgrade Service**;
5. confirm and sign in the wallet;
6. wait until the upgrade operation is finalized.

Upgrade permission belongs only to the current Service Controller.

## View Deployed Services

After connecting a wallet, open the account menu in the upper-right corner and select **My Services**. This page shows the Services recorded by the current browser for that account.
