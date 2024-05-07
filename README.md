# `request-address`

> Defines a JSON-based protocol for requesting bitcoin addresses and more

* 👌 Simple
* 🗓️ Versioned
* 🍡 Supports script types
* 🖋️ Supports message signatures
* 👩‍🚀 Supports extended public keys
* 💸 Supports SLIP-0024 payment requests

## Example

A service or wallet requests a bitcoin address request `requestAddress`:

```json
{
  "version": "0",
  "type": "requestAddress",
  "withMessageSignature": "SX0KOveC",
  "withExtendedPublicKey": true,
  "withScriptType": "p2wpkh"
}
```

The other service or wallet replies with the requested `address`:

```json
{
  "version": "0",
  "type": "address",
  "bitcoinAddress": "bc1qfd8phxz2vcazlfjtxqef94xjwulf5xyjghrxge",
  "signature": "Hzqs3cyg1YYF7M/m+U3BbDFykpZELv4xQhk4uWGCGAoOOq3kYKcR3uUzhXludmyEjQct7rAx3NxrWDBUmWcs/B8=",
  "extendedPublicKey": "zpub6rjWsJX5PFBXVAivrvSX7QUwtHKPuudSYokPBiA35H6g6ue4YaLPNQYhSkiL1G8zGAhQNuiMi15k4xMKBy4jHPj99uWDnKihRuvGDycEGiD"
}
```

A user can be prompted to verify received address with `verifyAddress`:

```json
{
  "version": "0",
  "type": "verifyAddress",
  "bitcoinAddress": "bc1qfd8phxz2vcazlfjtxqef94xjwulf5xyjghrxge"
}
```

A service or wallet can also request an extended public key `requestExtendedPublicKey`:

```json
{
  "version": "0",
  "type": "requestExtendedPublicKey",
  "withScriptType": "p2wpkh"
}
```

The other service or wallet replies with the requested `extendedPublicKey`:

```json
{
  "version": "0",
  "type": "extendedPublicKey",
  "extendedPublicKey": "zpub6rjWsJX5PFBXVAivrvSX7QUwtHKPuudSYokPBiA35H6g6ue4YaLPNQYhSkiL1G8zGAhQNuiMi15k4xMKBy4jHPj99uWDnKihRuvGDycEGiD"
}
```

A service or wallet sends a `paymentRequest`:

```json
{
  "version": "0",
  "type": "paymentRequest",
  "bitcoinAddress": "bc1qfd8phxz2vcazlfjtxqef94xjwulf5xyjghrxge",
  "amount": 0.01,
  "label": "Dragon's Tale",
  "message": "Elderberries",
  "slip24": {
    "recipientName": "Dragon's Tale",
    "nonce": null,
    "memos": [{
      "type": "text",
      "text": "Elderberries"
    }],
    "outputs": [{
      "address": "bc1qfd8phxz2vcazlfjtxqef94xjwulf5xyjghrxge",
      "amount": 1000000
    }],
    "signature": "MEQCIH+0V4j4DTzT4y9EE9XHjQlyRfwHnnVQL9NFFYVCta1PAiAW0mlS4YtDzNzwJ0gR8ApKzdIKmSBKzClnxyFFp84oig=="
  }
}
```

## API

### `serializeMessage(message: Message): string`

> Serialize a message to string for transmission

### `parseMessage(value: any): Message`

> Parse a string into a message

## Messages

### `Message`

```ts
type Message =
  | RequestAddressV0Message
  | RequestExtendedPublicKeyV0Message
  | VerifyAddressV0Message
  | AddressV0Message
  | ExtendedPublicKeyV0Message
  | PaymentRequestV0Message;
```

### `RequestAddressV0Message`

```ts
type RequestAddressV0Message = {
  version: MessageVersion.V0,
  type: V0MessageType.RequestAddress,
  withMessageSignature?: string | false | null,
  withExtendedPublicKey?: boolean | null,
  withScriptType?: V0MessageScriptType | null,
};
```

### `RequestExtendedPublicKeyV0Message`

```ts
type RequestExtendedPublicKeyV0Message = {
  version: MessageVersion.V0,
  type: V0MessageType.RequestExtendedPublicKey,
  withScriptType?: V0MessageScriptType | null,
};
```

### `VerifyAddressV0Message`

```ts
type VerifyAddressV0Message = {
  version: MessageVersion.V0,
  type: V0MessageType.VerifyAddress,
  bitcoinAddress: string,
};
```

### `AddressV0Message`

```ts
type AddressV0Message = {
  version: MessageVersion.V0,
  type: V0MessageType.Address,
  bitcoinAddress: string,
  signature?: string | null,
  extendedPublicKey?: string | null,
};
```

### `ExtendedPublicKeyV0Message`

```ts
type ExtendedPublicKeyV0Message = {
  version: MessageVersion.V0,
  type: V0MessageType.ExtendedPublicKey,
  extendedPublicKey: string,
};
```

### `PaymentRequestV0Message`

```ts
type PaymentRequestV0Message = {
  version: MessageVersion.V0,
  type: V0MessageType.PaymentRequest,
  bitcoinAddress: string,
  amount: number,
  label: string | null,
  message: string | null,
  slip24: Slip24 | null,
};
```

### `V0MessageScriptType`

```ts
enum V0MessageScriptType {
  P2PKH = 'p2pkh',
  P2WPKH = 'p2wpkh',
  P2SH = 'p2sh',
  P2TR = 'p2tr',
}
```

### `V0MessageType`

```ts
enum V0MessageType {
  RequestAddress = 'requestAddress',
  RequestExtendedPublicKey = 'requestExtendedPublicKey',
  VerifyAddress = 'verifyAddress',
  Address = 'address',
  ExtendedPublicKey = 'extendedPublicKey',
  PaymentRequest = 'paymentRequest',
}
```

### `MessageVersion`

```ts
enum MessageVersion {
  V0 = '0',
}
```

### `Slip24`

```ts
type Slip24 = {
  recipientName: string,
  nonce: string | null,
  memos: Array<{
    type: 'text',
    text: string,
  } | {
    type: 'refund',
    refund: string,
  } | {
    type: 'coinPurchase',
    coinPurchase: {
      coinType: number,
      amount: string,
      address: string,
    },
  }>,
  outputs: Array<{
    amount: number,
    address: string,
  }>,
  signature: string,
};
```

## License

MIT
