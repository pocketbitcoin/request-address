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
  | AddressV0Message;
```

### `RequestAddressV0Message`

```ts
type RequestAddressV0Message = {
  version: MessageVersion.V0,
  type: V0MessageType.RequestAddress,
  withMessageSignature?: string | false | null,
  withExtendedPublicKey?: boolean | null,
  withScriptType?: RequestAddressV0MessageScriptType | null,
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

### `RequestAddressV0MessageScriptType`

```ts
enum RequestAddressV0MessageScriptType {
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
