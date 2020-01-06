import {BitChain} from './../src/lib/Helpers/BitChain';
import {expect} from 'chai';
import 'mocha';

describe('Bitchain Class', () => {
  describe('Creation', () => {
    it('should give out the length', () => {
      expect(() => new BitChain()).to.not.throw();
      expect(new BitChain(0)).to.be.lengthOf(1);
      expect(new BitChain(45)).to.be.lengthOf(6);
    });
    it('should store and give the number used', () => {
      const b = new BitChain(4897);
      expect(b.toNumber()).to.equal(4897);
    });
    it('should not work with negatives', () => {
      expect(() => new BitChain(-45)).to.throw();
    });
  });
});
