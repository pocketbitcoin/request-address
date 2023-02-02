# `request-address`

> Defines a JSON-based protocol for requesting bitcoin addresses

* 👌 Simple
* 🗓️ Versioned
* 🍡 Supports script types
* 🖋️ Supports message signatures
* 👩‍🚀 Supports extended public keys

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
  | ExtendedPublicKeyV0Message;
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
  VerifyAddress = 'verifyAddress',
  Address = 'address',
}
```

### `MessageVersion`

```ts
enum MessageVersion {
  V0 = '0',
}
```

## License

MIT
