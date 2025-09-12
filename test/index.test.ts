/* eslint-env jest */

import { parseMessage } from "../src";

const correctMessageFixtures = [
  {
    version: "0",
    type: "paymentRequest",
    bitcoinAddress: "bc1q",
    amount: 0.01,
    label: "Merchant",
    message: "Elderberries",
    slip24: {
      recipientName: "Merchant",
      nonce: null,
      memos: [
        {
          type: "text",
          text: "Elderberries",
        },
      ],
      outputs: [
        {
          address: "tb1q2q0j6gmfxynj40p0kxsr9jkagcvgpuqvqynnup",
          amount: 1000000,
        },
      ],
      signature: "abc",
    },
  },
  {
    version: "0",
    type: "verifyAddress",
    correlationId: "1234",
    bitcoinAddress: "bc1q",
  },
  {
    version: "0",
    type: "cancel",
  },
  {
    version: "0",
    type: "cancel",
    reason: null,
  },
  {
    version: "0",
    type: "cancel",
    correlationId: "1234",
    reason: "rejected_by_user",
  },
];

describe("parse message", () => {
  it("should parse correct message", () => {
    for (const fixture of correctMessageFixtures) {
      expect(parseMessage(fixture)).toStrictEqual(fixture);
    }
  });

  it("should fail incorrect message", () => {
    for (const fixture of [
      null,
      undefined,
      {},
      [],
      {
        version: "incomplete",
      },
    ]) {
      expect(() => parseMessage(fixture)).toThrow();
    }
  });
});
