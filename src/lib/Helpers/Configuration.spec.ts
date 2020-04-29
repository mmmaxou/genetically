import test from 'ava';
import {LinearFunction} from '../../example/LinearFunction';
import {Configuration, DEFAULT_CONFIGURATION_GENETIC_ALGORITHM} from './Configuration';

test('Create a configuration', (t) => {
  const conf = new Configuration<string>(
    LinearFunction.encode,
    LinearFunction.decode,
    LinearFunction.randomValue,
    LinearFunction.fitness
  );
  t.true(typeof conf === 'object');
  t.true(typeof conf.get() === 'object');
  t.is(conf.get().afterEach, DEFAULT_CONFIGURATION_GENETIC_ALGORITHM.afterEach);
  t.is(conf.get().crossover, DEFAULT_CONFIGURATION_GENETIC_ALGORITHM.crossover);
  t.is(conf.get().iterations, DEFAULT_CONFIGURATION_GENETIC_ALGORITHM.iterations);
  t.is(conf.get().mutation, DEFAULT_CONFIGURATION_GENETIC_ALGORITHM.mutation);
  t.is(conf.get().objective, DEFAULT_CONFIGURATION_GENETIC_ALGORITHM.objective);
  t.deepEqual(conf.get().population, DEFAULT_CONFIGURATION_GENETIC_ALGORITHM.population);
  t.is(conf.get().selection, DEFAULT_CONFIGURATION_GENETIC_ALGORITHM.selection);
  t.is(conf.get().stopCondition, DEFAULT_CONFIGURATION_GENETIC_ALGORITHM.stopCondition);
  t.is(conf.get().verbose, DEFAULT_CONFIGURATION_GENETIC_ALGORITHM.verbose);
});

test('Error if configuration is not made of string and no Crossover', (t) => {
  t.plan(1);
  t.notThrows(() => {
    const conf = new Configuration<number>(
      (x) => x,
      (x) => x,
      () => 0,
      () => 0
    );
    conf.changeConfiguration({});
  });
});

test('Encode and decode are opposite', (t) => {
  t.throws(() => {
    const conf = new Configuration<number>(
      (x) => x,
      (x) => -x,
      () => 2,
      () => 1
    );
    conf.changeConfiguration({});
    return;
  });
});
