import test from 'ava';
import {BitChain} from '../Helpers/BitChain';
import {SerieFlipBitMutation} from './SerieBitFlipMutation';

let chain: BitChain;
test.beforeEach(() => {
  chain = '0000';
});

test('should mutate a chain', (t) => {
  const M = new SerieFlipBitMutation();
  M._nextMutationCounter = 3;
  const c = M.mutation(chain);
  t.is(c, '0001');
});

test('should create a chain of bits 0 or 1', (t) => {
  const M = new SerieFlipBitMutation();
  const c = M.mutation(chain);
  c.split('').forEach((char) => {
    t.true(char === '0' || char === '1');
  });
});

test('should not mutate in place', (t) => {
  const M = new SerieFlipBitMutation();
  const nChain = '01'.repeat(1000);
  const nClone = JSON.parse(JSON.stringify(nChain));
  M.mutation(nChain);
  t.deepEqual(nChain, nClone);
});

test('should create a chain of same length than the one given', (t) => {
  const M = new SerieFlipBitMutation();
  const nChain = '01'.repeat(1000);
  const c = M.mutation(nChain);
  t.true(c.length === nChain.length);
});
