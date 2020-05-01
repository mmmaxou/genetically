import test from 'ava';
import {LinearFunction} from '../../example/LinearFunction';
import {Configuration, DEFAULT_CONFIGURATION_GENETIC_ALGORITHM} from './Configuration';
import {NoCrossover} from '../Crossover/NoCrossover';
import {NoSelection} from '../Selection/NoSelection';
import {NoMutation} from '../Mutation/NoMutation';
import {DynamicalCrossover} from '../Crossover/DynamicalCrossover';
import {DynamicalSelection} from '../Selection/DynamicalSelection';
import {DynamicalMutation} from '../Mutation/DynamicalMutation';

test('Create a configuration', (t) => {
  const conf = new Configuration<number, string>(
    LinearFunction.encode,
    LinearFunction.decode,
    LinearFunction.randomValue,
    LinearFunction.fitness
  );

  t.true(typeof conf === 'object');
  t.is(conf.waitBetweenIterations, DEFAULT_CONFIGURATION_GENETIC_ALGORITHM.waitBetweenIterations);
  t.is(conf.crossover, DEFAULT_CONFIGURATION_GENETIC_ALGORITHM.crossover);
  t.is(conf.iterations, DEFAULT_CONFIGURATION_GENETIC_ALGORITHM.iterations);
  t.is(conf.mutation, DEFAULT_CONFIGURATION_GENETIC_ALGORITHM.mutation);
  t.is(conf.objective, DEFAULT_CONFIGURATION_GENETIC_ALGORITHM.objective);
  t.deepEqual(conf.population, DEFAULT_CONFIGURATION_GENETIC_ALGORITHM.population);
  t.is(conf.selection, DEFAULT_CONFIGURATION_GENETIC_ALGORITHM.selection);
  t.is(conf.stopCondition, DEFAULT_CONFIGURATION_GENETIC_ALGORITHM.stopCondition);
  t.is(conf.verbose, DEFAULT_CONFIGURATION_GENETIC_ALGORITHM.verbose);
});

test('Create a configuration using function for crossover / mutaton / selection', (t) => {
  const conf = new Configuration<number, string>(
    LinearFunction.encode,
    LinearFunction.decode,
    LinearFunction.randomValue,
    LinearFunction.fitness,
    {
      crossover: new NoCrossover().crossover,
      selection: new NoSelection<string>().selection,
      mutation: new NoMutation().mutation,
    }
  );

  t.assert(conf.crossover.crossover === new DynamicalCrossover(new NoCrossover().crossover).crossover);
  t.assert(conf.selection.selection === new DynamicalSelection(new NoSelection<string>().selection).selection);
  t.assert(conf.mutation.mutation === new DynamicalMutation(new NoMutation().mutation).mutation);
});

test('Validate configuration', (t) => {
  t.plan(1);
  t.notThrows(() => {
    const conf = new Configuration<number, string>(
      (x) => '' + x,
      (x) => +x,
      () => 1,
      (x) => x
    );
    conf.changeConfiguration({});
  });
});

test('Encode and decode are opposite', (t) => {
  t.plan(1);
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

test('Error if verbose is not a "NONE", "INFO", "NONE"', (t) => {
  const verbose = ['a', 'z', 'e'].join() as 'NONE';
  t.throws(() => {
    const conf = new Configuration<number, string>(
      LinearFunction.encode,
      LinearFunction.decode,
      LinearFunction.randomValue,
      LinearFunction.fitness,
      {
        verbose,
      }
    );
    conf.changeConfiguration({});
  });
});

test('Error on encoded type not string and no mutation', (t) => {
  t.plan(1);
  t.throws(() => {
    const conf = new Configuration<number, {}>(
      (x) => ({x}),
      (x) => +!!x,
      LinearFunction.randomValue,
      LinearFunction.fitness
    );
    conf.changeConfiguration({});
  });
});

test('Error on encoded type not string and no crossover', (t) => {
  t.plan(1);
  t.throws(() => {
    const conf = new Configuration<number, {}>(
      (x) => ({x}),
      (x) => +!!x,
      LinearFunction.randomValue,
      LinearFunction.fitness,
      {
        mutation: new NoMutation(),
      }
    );
    conf.changeConfiguration({});
  });
});

test('Work on encoded type not string and crossover + mutation', (t) => {
  t.plan(1);
  t.notThrows(() => {
    const conf = new Configuration<number, number>(
      (x) => x,
      (x) => x,
      () => 1,
      () => 1,
      {
        mutation: new NoMutation(),
        crossover: new NoCrossover(),
      }
    );
    conf.changeConfiguration({});
  });
});
