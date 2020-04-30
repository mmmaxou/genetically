import test from 'ava';
import {LinearFunction} from '../../example/LinearFunction';
import {Configuration, DEFAULT_CONFIGURATION_GENETIC_ALGORITHM} from './Configuration';

test('Create a configuration', (t) => {
  const conf = new Configuration<number, string>(
    LinearFunction.encode,
    LinearFunction.decode,
    LinearFunction.randomValue,
    LinearFunction.fitness
  );

  t.true(typeof conf === 'object');
  t.is(conf.afterEach, DEFAULT_CONFIGURATION_GENETIC_ALGORITHM.afterEach);
  t.is(conf.crossover, DEFAULT_CONFIGURATION_GENETIC_ALGORITHM.crossover);
  t.is(conf.iterations, DEFAULT_CONFIGURATION_GENETIC_ALGORITHM.iterations);
  t.is(conf.mutation, DEFAULT_CONFIGURATION_GENETIC_ALGORITHM.mutation);
  t.is(conf.objective, DEFAULT_CONFIGURATION_GENETIC_ALGORITHM.objective);
  t.deepEqual(conf.population, DEFAULT_CONFIGURATION_GENETIC_ALGORITHM.population);
  t.is(conf.selection, DEFAULT_CONFIGURATION_GENETIC_ALGORITHM.selection);
  t.is(conf.stopCondition, DEFAULT_CONFIGURATION_GENETIC_ALGORITHM.stopCondition);
  t.is(conf.verbose, DEFAULT_CONFIGURATION_GENETIC_ALGORITHM.verbose);
});

test('Error if configuration is not made of string and no Crossover', (t) => {
  t.plan(1);
  t.notThrows(() => {
    const conf = new Configuration<number, number>(
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
    const conf = new Configuration<number, number>(
      (x) => x,
      (x) => -x,
      () => 2,
      () => 1,
      {
        verbose: 'NONE',
      }
    );
    conf.changeConfiguration({});
    return;
  });
});
