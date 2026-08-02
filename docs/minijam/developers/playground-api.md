---
id: playground-api
title: Playground API
slug: /minijam/developers/playground-api
sidebar_position: 6
---

# Playground API

Use the Playground API to:

* compile services online;
* deploy locally compiled service blobs;
* upgrade services;
* submit work;
* query operation status;
* read service storage.

## Base URL

```text
https://playground.minijam.xyz/api/v1
```

:::warning Stage 0

Stage 0 is a resettable test environment. Services and chain state may be cleared.

:::

## Endpoints

| Method | Path | Purpose |
| --- | --- | --- |
| `GET` | `/config` | Get the current network configuration |
| `POST` | `/build` | Compile a service online |
| `POST` | `/actions/prepare` | Prepare a signing authorization |
| `POST` | `/services` | Create a service |
| `GET` | `/services/{id}` | Query a service |
| `POST` | `/services/{id}/upgrade` | Upgrade a service |
| `POST` | `/work` | Submit work |
| `GET` | `/services/{id}/storage` | Query storage |
| `GET` | `/operations/{id}` | Query operation status |

## Online Compilation

```http
POST /build
Content-Type: application/json
```

```json
{
  "language": "c",
  "source": "your service source code",
  "optimization": "Os"
}
```

Supported values:

* `c`
* `cpp`
* `O0`
* `Os`

The response includes the compiled blob, code hash, code length, and diagnostics.

## Local Blobs

Online compilation is optional. If you can produce a MiniJAM-compatible `service.blob`, submit its Base64 encoding and Blake2-256 hash.

```js
import { readFile } from "node:fs/promises";
import { blake2AsHex } from "@polkadot/util-crypto";

const blob = await readFile("./service.blob");

const params = {
  blobBase64: blob.toString("base64"),
  codeHash: blake2AsHex(blob, 256),
  minItemGas: 10_000_000,
  minMemoGas: 10_000_000,
};
```

## Signing

Creating, upgrading, and submitting work all require a prepared action.

```http
POST /actions/prepare
Content-Type: application/json
```

```json
{
  "account": "0x...",
  "action": "create_service",
  "paramsHash": "0x...",
  "expiry": 1785657600
}
```

Supported actions are `create_service`, `upgrade_service`, and `work`. The `paramsHash` value is the Blake2-256 hash of the operation parameters JSON.

## Operations

Service creation and work submission return HTTP `202` with an `operationId`. Poll:

```http
GET /operations/{operationId}
```

Common statuses include `prepared`, `waiting_receipt`, `waiting_preimage`, `tracking_work`, `succeeded`, and `failed`.

## Service Storage

After a service is deployed, read finalized storage through:

```http
GET /services/{serviceId}/storage?key=counter
```

For the Counter example, the `counter` key stores the finalized counter value.
