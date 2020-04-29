// tslint:disable: no-string-literal

import test from 'ava';
import {BitChain} from '../Helpers/BitChain';
import {SerieFlipBitMutation} from './SerieBitFlipMutation';
import {unpackVariableNames} from '../Helpers/Helpers';

let chain: BitChain;
test.beforeEach(() => {
  chain = '0000';
});

test('should mutate a chain', (t) => {
  const M = new SerieFlipBitMutation();

  M['_nextMutationOccurance'] = 3;
  const c = M.mutation('0000');
  t.is(c, '0001');
  t.not(M['_nextMutationOccurance'], 0);

  M['_nextMutationOccurance'] = 5;
  const c2Chain = '000000000000000';
  const c2 = M.mutation(c2Chain);

  t.is(c2.substring(0, 6), '000001');
  t.is(c2.length, c2Chain.length);
});

test('should work if chain is empty', (t) => {
  const mutator = new SerieFlipBitMutation();
  t.notThrows(() => mutator.mutation(''));
  t.is(mutator.mutation(''), '');
});

test('should create a chain of bits 0 or 1', (t) => {
  const M = new SerieFlipBitMutation();
  const c = M.mutation(chain);
  c.split('').forEach((char) => {
    t.true(char === '0' || char === '1', unpackVariableNames({char}));
  });
});

test('should not mutate in place', (t) => {
  const M = new SerieFlipBitMutation(0.1);
  const nChain = '0'.repeat(1000);
  const nClone = JSON.parse(JSON.stringify(nChain));
  M.mutation(nChain);
  t.deepEqual(nChain, nClone);
});

test.only('should create a chain of same length than the one given', (t) => {
  const M = new SerieFlipBitMutation(0.1);
  const nChain = '0'.repeat(200);
  const mutatedChain = M.mutation(nChain);
  t.is(mutatedChain.length, nChain.length, unpackVariableNames({mutatedChain, nChain}));
});

test('_nextMutationOccurance shall always be 0 with probability of 1', (t) => {
  const M = new SerieFlipBitMutation(1);
  t.is(M['_nextMutationOccurance'], 0);
});

test('With probability of 1', (t) => {
  const M = new SerieFlipBitMutation(1);
  const nChain = '0'.repeat(100);
  const mutatedChain = M.mutation(nChain);
  t.is(mutatedChain, '1'.repeat(100));
  t.is(mutatedChain.length, nChain.length, unpackVariableNames({mutatedChain, nChain}));
});

test('Error when probability is not between 0 and 1', (t) => {
  // tslint:disable no-unused-expression
  t.notThrows(() => {
    new SerieFlipBitMutation(0.2);
    new SerieFlipBitMutation(0.5);
    new SerieFlipBitMutation(0.7);
    new SerieFlipBitMutation(0.9);
    new SerieFlipBitMutation(1);
  });
  t.throws(() => new SerieFlipBitMutation(0));
  t.throws(() => new SerieFlipBitMutation(1.1));
  t.throws(() => new SerieFlipBitMutation(10));
  t.throws(() => new SerieFlipBitMutation(-10));
  t.throws(() => new SerieFlipBitMutation(-0));
  t.throws(() => new SerieFlipBitMutation(-1));
  t.throws(() => new SerieFlipBitMutation(20));
  // tslint:enable no-unused-expression
});

test('should work for odd chain', (t) => {
  const M = new SerieFlipBitMutation(0.1);
  const nChain = '0'.repeat(200) + '0';
  const mutatedChain = M.mutation(nChain);
  t.is(mutatedChain.length, nChain.length, unpackVariableNames({mutatedChain, nChain}));
});
