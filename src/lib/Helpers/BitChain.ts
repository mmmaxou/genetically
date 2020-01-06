import {BitSet} from 'BitSet';

export class BitChain extends BitSet {
  constructor(input?: string | number | BitSet | Array<number> | Uint8Array) {
    super(input);

    if (typeof input === 'number' && input < 0) {
      throw this.LessThanZeroError();
    } else if (
      typeof input === 'string' &&
      !input.startsWith('0b') &&
      !input.startsWith('0x')
    ) {
      const n = parseInt(input, 10);
      if (Number.isSafeInteger(n) && n < 0) {
        throw this.LessThanZeroError();
      }
    }
  }

  get length(): number {
    return this.toString().length;
  }

  toNumber(): number {
    return +this.toString(10);
  }

  private LessThanZeroError(): Error {
    return new Error(
      'Do not use number less than 0. Encode and decode them to fit your needs. i.e. add 256 to a range of [-256,256] to become [0,512]'
    );
  }
}
