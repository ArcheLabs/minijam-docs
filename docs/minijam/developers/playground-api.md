---
id: playground-api
title: Playground API
slug: /minijam/developers/playground-api
sidebar_position: 6
---

# Playground API

With the Playground API, you can directly:

* compile Services online;
* deploy locally compiled Service Blobs;
* upgrade Services;
* submit Work;
* query operation status;
* read Service Storage.

## Base URL

```text
https://playground.minijam.xyz/api/v1
```

:::warning Stage 0

Stage 0 is a resettable test environment. Services and on-chain state may be cleared.

:::

## Endpoints

| Method | Path | Purpose |
| --- | --- | --- |
| `GET` | `/config` | Get the current network configuration |
| `POST` | `/build` | Compile a Service online |
| `POST` | `/actions/prepare` | Prepare signing authorization |
| `POST` | `/services` | Create a Service |
| `GET` | `/services/{id}` | Query a Service |
| `POST` | `/services/{id}/upgrade` | Upgrade a Service |
| `POST` | `/work` | Submit Work |
| `GET` | `/services/{id}/storage` | Query Storage |
| `GET` | `/operations/{id}` | Query operation status |

## Online Compilation

```http
POST /build
Content-Type: application/json
```

```json
{
  "language": "c",
  "source": "your Service source code",
  "optimization": "Os"
}
```

Currently supported:

* `c`
* `cpp`
* `O0`
* `Os`

A successful response returns:

```json
{
  "success": true,
  "blobBase64": "...",
  "codeHash": "0x...",
  "codeLength": 2048,
  "diagnostics": []
}
```

## Deploy a Locally Compiled Service

Online compilation is not required. As long as you can generate a MiniJAM-compatible `service.blob`, you can calculate:

* Blob Base64;
* Blob Blake2-256 Hash.

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

## Prepare Signing

Before creating, upgrading, or submitting Work, you need to prepare an Action.

```http
POST /actions/prepare
Content-Type: application/json
```

Request:

```json
{
  "account": "0x...",
  "action": "create_service",
  "paramsHash": "0x...",
  "expiry": 1785657600
}
```

Supported Actions:

| Operation | Action |
| --- | --- |
| Create Service | `create_service` |
| Upgrade Service | `upgrade_service` |
| Submit Work | `work` |

`paramsHash` is the Blake2-256 Hash of the operation parameters JSON.

Response:

```json
{
  "actionId": "0x...",
  "signingPayload": "0x...",
  "expiry": 1785657600
}
```

## Local Signing

The current API uses sr25519 signatures.

Install dependencies:

```bash
npm install @polkadot/keyring @polkadot/util @polkadot/util-crypto
```

Signing example:

```js
import { Keyring } from "@polkadot/keyring";
import {
  hexToU8a,
  stringToU8a,
  u8aConcat,
  u8aToHex,
} from "@polkadot/util";
import { cryptoWaitReady } from "@polkadot/util-crypto";

await cryptoWaitReady();

const pair = new Keyring({
  type: "sr25519",
}).addFromUri(process.env.MINIJAM_SIGNER_URI);

function signAction(prepared) {
  const message = u8aConcat(
    stringToU8a("<Bytes>"),
    hexToU8a(prepared.signingPayload),
    stringToU8a("</Bytes>"),
  );

  return {
    actionId: prepared.actionId,
    signature: u8aToHex(pair.sign(message)),
  };
}
```

Use the following value for `account`:

```js
u8aToHex(pair.publicKey)
```

## Create a Service

```http
POST /services
Content-Type: application/json
```

```json
{
  "authorization": {
    "actionId": "0x...",
    "signature": "0x..."
  },
  "blobBase64": "...",
  "codeHash": "0x...",
  "minItemGas": 10000000,
  "minMemoGas": 10000000
}
```

The API returns HTTP `202` and an `operationId`:

```json
{
  "operationId": "0x...",
  "kind": "create",
  "status": "prepared"
}
```

## Query Operation Status

```http
GET /operations/{operationId}
```

Common statuses:

| Status | Meaning |
| --- | --- |
| `prepared` | Operation created |
| `waiting_receipt` | Waiting for on-chain Receipt |
| `waiting_preimage` | Waiting for code confirmation |
| `tracking_work` | Waiting for Work completion |
| `succeeded` | Operation succeeded |
| `failed` | Operation failed |

After successful creation:

```json
{
  "status": "succeeded",
  "result": {
    "serviceId": 1000,
    "preimageHash": "0x..."
  }
}
```

## Query a Service

```http
GET /services/{serviceId}
```

```json
{
  "serviceId": 1000,
  "controller": "0x...",
  "codeHash": "0x...",
  "codeLength": 2048,
  "preimageReady": true,
  "finalizedBlock": "0x...",
  "finalizedBlockNumber": 12345
}
```

## Upgrade a Service

```http
POST /services/{serviceId}/upgrade
Content-Type: application/json
```

Use this Action when preparing:

```text
upgrade_service
```

Request:

```json
{
  "authorization": {
    "actionId": "0x...",
    "signature": "0x..."
  },
  "serviceId": 1000,
  "blobBase64": "...",
  "codeHash": "0x...",
  "minItemGas": 10000000,
  "minMemoGas": 10000000
}
```

You must sign with the account corresponding to the current Service Controller.

## Submit Work

MiniJAM interacts with Services through Work.

```http
POST /work
Content-Type: application/json
```

Use this Action when preparing:

```text
work
```

Request:

```json
{
  "authorization": {
    "actionId": "0x...",
    "signature": "0x..."
  },
  "serviceId": 1000,
  "serviceCodeHash": "0x...",
  "payloadBase64": "aW5jcmVtZW50",
  "extrinsicsBase64": []
}
```

You can first get the current `codeHash` through:

```http
GET /services/{serviceId}
```

After Work succeeds, the Operation returns:

```json
{
  "status": "succeeded",
  "result": {
    "workId": 42,
    "executionReceipt": "0x..."
  }
}
```

Stage 0 currently requires Work to be authorized by the target Service's Controller.

## Query Storage

```http
GET /services/{serviceId}/storage?key=0x...
```

Response:

```json
{
  "serviceId": 1000,
  "key": "0x636f756e746572",
  "value": "0x00000001",
  "finalizedBlock": "0x..."
}
```

A missing value returns:

```json
{
  "value": null
}
```

Query results come from finalized state.

## Complete Flow

```text
Generate service.blob locally
        v
Calculate blobBase64 and codeHash
        v
Calculate paramsHash
        v
POST /actions/prepare
        v
Sign signingPayload locally
        v
POST /services
        v
Poll /operations/{id}
        v
Receive serviceId
        v
POST /work
        v
Read finalized Storage
```

## Error Statuses

| Status code | Meaning |
| --- | --- |
| `400` | Invalid parameters, signature, Base64, or Hash |
| `403` | Current account is not the Service Controller |
| `404` | Service does not exist |
| `409` | Action has expired or has already been used |
| `503` | Compiler, chain node, or internal service unavailable |
