---
id: playground-api
title: Playground API
slug: /minijam/developers/playground-api
sidebar_position: 6
---

# Playground API

通过 Playground API，你可以直接完成：

* 在线编译 Service；
* 部署本地编译的 Service Blob；
* 升级 Service；
* 提交 Work；
* 查询操作状态；
* 读取 Service Storage。

## Base URL

```text
https://playground.minijam.xyz/api/v1
```

:::warning Stage 0

Stage 0 是可重置的测试环境。Service 和链上状态可能被清除。

:::

## 接口

| 方法     | 路径                       | 用途           |
| ------ | ------------------------ | ------------ |
| `GET`  | `/config`                | 获取当前网络配置     |
| `POST` | `/build`                 | 在线编译 Service |
| `POST` | `/actions/prepare`       | 准备签名授权       |
| `POST` | `/services`              | 创建 Service   |
| `GET`  | `/services/{id}`         | 查询 Service   |
| `POST` | `/services/{id}/upgrade` | 升级 Service   |
| `POST` | `/work`                  | 提交 Work      |
| `GET`  | `/services/{id}/storage` | 查询 Storage   |
| `GET`  | `/operations/{id}`       | 查询操作状态       |

## 在线编译

```http
POST /build
Content-Type: application/json
```

```json
{
  "language": "c",
  "source": "你的 Service 源代码",
  "optimization": "Os"
}
```

当前支持：

* `c`
* `cpp`
* `O0`
* `Os`

成功后会返回：

```json
{
  "success": true,
  "blobBase64": "...",
  "codeHash": "0x...",
  "codeLength": 2048,
  "diagnostics": []
}
```

## 部署本地编译的 Service

在线编译不是必需的。只要你能够生成兼容 MiniJAM 的 `service.blob`，就可以自行计算：

* Blob 的 Base64；
* Blob 的 Blake2-256 Hash。

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

## 准备签名

创建、升级和提交 Work 前，都需要准备一个 Action。

```http
POST /actions/prepare
Content-Type: application/json
```

请求：

```json
{
  "account": "0x...",
  "action": "create_service",
  "paramsHash": "0x...",
  "expiry": 1785657600
}
```

支持的 Action：

| 操作         | Action            |
| ---------- | ----------------- |
| 创建 Service | `create_service`  |
| 升级 Service | `upgrade_service` |
| 提交 Work    | `work`            |

`paramsHash` 是操作参数 JSON 的 Blake2-256 Hash。

响应：

```json
{
  "actionId": "0x...",
  "signingPayload": "0x...",
  "expiry": 1785657600
}
```

## 本地签名

当前接口使用 sr25519 签名。

安装依赖：

```bash
npm install @polkadot/keyring @polkadot/util @polkadot/util-crypto
```

签名示例：

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

`account` 应使用：

```js
u8aToHex(pair.publicKey)
```

## 创建 Service

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

接口返回 HTTP `202` 和一个 `operationId`：

```json
{
  "operationId": "0x...",
  "kind": "create",
  "status": "prepared"
}
```

## 查询操作状态

```http
GET /operations/{operationId}
```

常见状态：

| 状态                 | 含义           |
| ------------------ | ------------ |
| `prepared`         | 操作已创建        |
| `waiting_receipt`  | 等待链上 Receipt |
| `waiting_preimage` | 等待代码确认       |
| `tracking_work`    | 等待 Work 完成   |
| `succeeded`        | 操作成功         |
| `failed`           | 操作失败         |

成功创建后：

```json
{
  "status": "succeeded",
  "result": {
    "serviceId": 1000,
    "preimageHash": "0x..."
  }
}
```

## 查询 Service

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

## 升级 Service

```http
POST /services/{serviceId}/upgrade
Content-Type: application/json
```

准备 Action 时使用：

```text
upgrade_service
```

请求：

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

你必须使用当前 Service Controller 对应的账户签名。

## 提交 Work

MiniJAM 通过 Work 与 Service 交互。

```http
POST /work
Content-Type: application/json
```

准备 Action 时使用：

```text
work
```

请求：

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

你可以先通过下面的接口获取当前 `codeHash`：

```http
GET /services/{serviceId}
```

Work 成功后，Operation 会返回：

```json
{
  "status": "succeeded",
  "result": {
    "workId": 42,
    "executionReceipt": "0x..."
  }
}
```

当前 Stage 0 要求 Work 由目标 Service 的 Controller 授权。

## 查询 Storage

```http
GET /services/{serviceId}/storage?key=0x...
```

响应：

```json
{
  "serviceId": 1000,
  "key": "0x636f756e746572",
  "value": "0x00000001",
  "finalizedBlock": "0x..."
}
```

不存在的值返回：

```json
{
  "value": null
}
```

查询结果来自最终确认状态。

## 完整流程

```text
本地生成 service.blob
        ↓
计算 blobBase64 和 codeHash
        ↓
计算 paramsHash
        ↓
POST /actions/prepare
        ↓
本地签署 signingPayload
        ↓
POST /services
        ↓
轮询 /operations/{id}
        ↓
获得 serviceId
        ↓
POST /work
        ↓
读取最终 Storage
```

## 错误状态

| 状态码   | 含义                        |
| ----- | ------------------------- |
| `400` | 参数、签名、Base64 或 Hash 无效    |
| `403` | 当前账户不是 Service Controller |
| `404` | Service 不存在               |
| `409` | Action 已过期或已被使用           |
| `503` | Compiler、链节点或内部服务不可用      |
