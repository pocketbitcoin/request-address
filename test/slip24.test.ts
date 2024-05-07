/* eslint-env jest */

import { parseSlip24 } from '../src/slip24';

describe('slip24 payment request', () => {
  it('should parse correct slip24', () => {
    for (const fixture of [
      null,
      {
        recipientName: 'Merchant',
        nonce: null,
        memos: [{
          type: 'text',
          text: 'Hello World!',
        }],
        outputs: [{
          address: 'tb1q2q0j6gmfxynj40p0kxsr9jkagcvgpuqvqynnup',
          amount: 123456,
        }],
        signature: 'abc',
      }
    ]) {
      expect(parseSlip24(fixture)).toStrictEqual(fixture);
    }
  });

  it('should fail incorrect slip24', () => {
    for (const fixture of [
      undefined,
      {},
      [],
      {
        recipientName: 'Incomplete',
      }
    ]) {
      expect(() => parseSlip24(fixture)).toThrow();
    }
  });
});
