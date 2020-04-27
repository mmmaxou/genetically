// tslint:disable: no-unused-expression
import {ITERATIONS} from './consts';
import {CountTime} from './../src/lib/Helpers/CountTime';
import {expect} from 'chai';

describe('Helper functions and classes', () => {
  describe('class CountTime', () => {
    it('should count time', () => {
      const func = () => 95 * 78;
      const time = new CountTime();

      for (let i = 0; i < ITERATIONS; i++) {
        func();
      }

      const end = time.time();
      expect(end).to.be.a('number');
      expect(end).to.be.above(0);
    });
  });
});
