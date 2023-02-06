import { isBoolean, isLiteral, isNullish, isObject, isOneOf, isString } from './utils';

export enum MessageVersion {
  V0 = '0',
}

export enum V0MessageType {
  RequestAddress = 'requestAddress',
  RequestExtendedPublicKey = 'requestExtendedPublicKey',
  VerifyAddress = 'verifyAddress',
  Address = 'address',
  ExtendedPublicKey = 'extendedPublicKey',
}

export enum V0MessageScriptType {
  P2PKH = 'p2pkh',
  P2WPKH = 'p2wpkh',
  P2SH = 'p2sh',
  P2TR = 'p2tr',
}

export type RequestAddressV0Message = {
  version: MessageVersion.V0,
  type: V0MessageType.RequestAddress,
  withMessageSignature?: string | false | null,
  withExtendedPublicKey?: boolean | null,
  withScriptType?: V0MessageScriptType | null,
};

export type RequestExtendedPublicKeyV0Message = {
  version: MessageVersion.V0,
  type: V0MessageType.RequestExtendedPublicKey,
  withScriptType?: V0MessageScriptType | null,
};

export type VerifyAddressV0Message = {
  version: MessageVersion.V0,
  type: V0MessageType.VerifyAddress,
  bitcoinAddress: string,
};

export type AddressV0Message = {
  version: MessageVersion.V0,
  type: V0MessageType.Address,
  bitcoinAddress: string,
  signature?: string | null,
  extendedPublicKey?: string | null,
};

export type ExtendedPublicKeyV0Message = {
  version: MessageVersion.V0,
  type: V0MessageType.ExtendedPublicKey,
  extendedPublicKey: string,
};

export type Message =
  | RequestAddressV0Message
  | RequestExtendedPublicKeyV0Message
  | VerifyAddressV0Message
  | AddressV0Message
  | ExtendedPublicKeyV0Message;

export function serializeMessage(message: Message) {
  return JSON.stringify(message);
}

export function parseMessage(value: any): Message {
  let object = value;

  if (typeof object === 'string') {
    try {
      object = JSON.parse(object);
    } catch (e) {
      throw new Error('could not parse as json');
    }
  }

  if (!isObject(object)) {
    throw new Error('not an object');
  }

  const { version } = object;

  if (isLiteral(version, MessageVersion.V0 as const)) {
    const { type } = object;

    if (!isOneOf(type, ...Object.values(V0MessageType))) {
      throw new Error('invalid type');
    }

    if (type === V0MessageType.RequestAddress) {
      const { withMessageSignature } = object;
      if (!isString(withMessageSignature) && !isNullish(withMessageSignature)) {
        throw new Error('message signature indicator invalid');
      }

      const { withExtendedPublicKey } = object;
      if (!isBoolean(withExtendedPublicKey) && !isNullish(withExtendedPublicKey)) {
        throw new Error('extended public key indicator invalid');
      }

      const { withScriptType } = object;
      if (!isOneOf(withScriptType, ...Object.values(V0MessageScriptType)) && !isNullish(withScriptType)) {
        throw new Error('script type indicator invalid');
      }

      return {
        version,
        type,
        withMessageSignature, // !true
        withExtendedPublicKey,
        withScriptType,
      };
    } else if (type === V0MessageType.RequestExtendedPublicKey) {
      const { withScriptType } = object;
      if (!isOneOf(withScriptType, ...Object.values(V0MessageScriptType)) && !isNullish(withScriptType)) {
        throw new Error('script type indicator invalid');
      }

      return {
        version,
        type,
        withScriptType,
      };
    } else if (type === V0MessageType.VerifyAddress) {
      const { bitcoinAddress } = object;
      if (!isString(bitcoinAddress)) {
        throw new Error('bitcoin address missing');
      }

      return {
        version,
        type,
        bitcoinAddress,
      };
    } else if (type === V0MessageType.Address) {
      const { bitcoinAddress } = object;
      if (!isString(bitcoinAddress)) {
        throw new Error('bitcoin address missing');
      }

      const { signature } = object;
      if (!isString(signature) && !isNullish(signature)) {
        throw new Error('signature invalid');
      }

      const { extendedPublicKey } = object;
      if (!isString(extendedPublicKey) && !isNullish(extendedPublicKey)) {
        throw new Error('extended public key invalid');
      }

      return {
        version,
        type,
        bitcoinAddress,
        signature,
        extendedPublicKey,
      };
    } else if (type === V0MessageType.ExtendedPublicKey) {
      const { extendedPublicKey } = object;
      if (!isString(extendedPublicKey)) {
        throw new Error('extended public key missing');
      }

      return {
        version,
        type,
        extendedPublicKey,
      };
    } else {
      throw new Error('unsupported type');
    }
  }

  throw new Error('unsupported version');
}
