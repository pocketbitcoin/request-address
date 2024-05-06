import { isArray, isNull, isNumber, isObject, isOneOf, isString } from './utils';

export type Slip24 = {
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
      bitcoinAddress: string,
    },
  }>,
  outputs: Array<{
    amount: number,
    bitcoinAddress: string,
  }>,
  signature: string,
};

export function serializeSlip24(message: Slip24 | null) {
  return JSON.stringify(message);
}

export function parseSlip24(value: any): Slip24 | null {
  let object = value;

  if (isNull(value)) {
    return null;
  }

  if (!isObject(object)) {
    throw new Error('not an object');
  }

  const { recipientName } = object;
  if (!isString(recipientName)) {
    throw new Error('recipient name invalid');
  }

  const { nonce } = object;
  if (!isString(nonce) && !isNull(nonce)) {
    throw new Error('nonce invalid');
  }

  const { memos } = object;
  if (!isArray(memos)) {
    throw new Error('memos invalid');
  }

  for (const memo of memos) {
    if (!isObject(memo)) {
      throw new Error('memo not an object');
    }

    const { type } = memo;
    if (!isOneOf(type, 'text' as const, 'refund' as const, 'coinPurchase' as const)) {
      throw new Error('invalid type');
    }

    if (type === 'text') {
      const { text } = memo;
      if (!isString(text)) {
        throw new Error('text invalid');
      }
    } else if (type === 'refund') {
      const { refund } = memo;
      if (!isString(refund)) {
        throw new Error('refund invalid');
      }
    } else if (type === 'coinPurchase') {
      const { coinPurchase } = memo;
      if (!isObject(coinPurchase)) {
        throw new Error('not an object');
      }

      const { coinType } = coinPurchase;
      if (!isNumber(coinType)) {
        throw new Error('coin type invalid');
      }

      const { amount } = coinPurchase;
      if (!isString(amount)) {
        throw new Error('amount invalid');
      }

      const { bitcoinAddress } = coinPurchase;
      if (!isString(bitcoinAddress)) {
        throw new Error('bitcoin address invalid');
      }
    } else {
      throw new Error('unsupported type');
    }
  }

  const { outputs } = object;
  if (!isArray(outputs)) {
    throw new Error('outputs invalid');
  }

  for (const output of outputs) {
    if (!isObject(output)) {
      throw new Error('output not an object');
    }

    const { amount } = output;
    if (!isNumber(amount)) {
      throw new Error('amount invalid');
    }

    const { bitcoinAddress } = output;
    if (!isString(bitcoinAddress)) {
      throw new Error('bitcoin address invalid');
    }
  }

  const { signature } = object;
  if (!isString(signature)) {
    throw new Error('signature invalid');
  }

  return {
    recipientName,
    nonce,
    memos,
    outputs,
    signature
  };
}
