import test from 'ava';
import {DynamicalCrossover} from './DynamicalCrossover';

test('Create an object', (t) => {
  const crossover = new DynamicalCrossover<string>((chain) => chain);
  t.is(typeof crossover, 'object');
});

test('Use a custom crossover', (t) => {
  const crossover = new DynamicalCrossover<string>((c) => c.sort());
  const chain = ['15', '9', '7'];
  const nChain = crossover.crossover(chain);
  t.deepEqual(nChain, chain);
});
