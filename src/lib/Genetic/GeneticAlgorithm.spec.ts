import test from 'ava';
import {DEFAULT_CONFIGURATION_GENETIC_ALGORITHM} from '../Helpers/Configuration';
import {unpackVariableNames} from '../Helpers/Helpers';
import {GeneticAlgorithm} from './GeneticAlgorithm';
import {NoMutation} from '../Mutation/NoMutation';
import {NoCrossover} from '../Crossover/NoCrossover';
import {NoSelection} from '../Selection/NoSelection';
import {CountTime} from '../Helpers/CountTime';

test('Create a pointless Genetic algorithm', (t) => {
  const ga = new GeneticAlgorithm<number, string>(
    (x) => '' + x,
    (x) => +x,
    () => 1,
    (x) => x
  );
  t.is(typeof ga, 'object', unpackVariableNames({ga}));
});

test('Load default configuration', (t) => {
  const stringGA = new GeneticAlgorithm<number, string>(
    () => '1',
    () => 1,
    () => 1,
    () => 1
  );
  t.is(typeof stringGA.configuration, 'object');
  const deft = DEFAULT_CONFIGURATION_GENETIC_ALGORITHM;
  const conf = stringGA.configuration;
  t.deepEqual(deft.afterEach, conf.afterEach);
  t.deepEqual(deft.crossover, conf.crossover);
  t.deepEqual(deft.iterations, conf.iterations);
  t.deepEqual(deft.mutation, conf.mutation);
  t.deepEqual(deft.objective, conf.objective);
  t.deepEqual(deft.population, conf.population);
  t.deepEqual(deft.selection, conf.selection);
  t.deepEqual(deft.stopCondition, conf.stopCondition);
  t.deepEqual(deft.verbose, conf.verbose);
});

test('Allow changing configuration', (t) => {
  const ga = new GeneticAlgorithm(
    (x) => '' + x,
    (x) => +x,
    () => 1,
    (x) => x
  );
  t.is(ga.configuration.verbose, DEFAULT_CONFIGURATION_GENETIC_ALGORITHM.verbose);
  ga.changeConfiguration({verbose: 'NONE'});
  t.is(ga.configuration.verbose, 'NONE');
  ga.changeConfiguration({verbose: 'INFO'});
  t.is(ga.configuration.verbose, 'INFO');
  ga.changeConfiguration({verbose: 'DEBUG'});
  t.is(ga.configuration.verbose, 'DEBUG');
});

test('Wait a few seconds after each run', (t) => {
  const ga = new GeneticAlgorithm<number, string>(
    (x) => '' + x,
    (x) => +x,
    () => ~~Math.random() * 99999,
    (x) => x,
    {
      iterations: 10,
      population: {
        popsize: 2,
      },
      mutation: new NoMutation(),
      crossover: new NoCrossover(),
      selection: new NoSelection(),
      afterEach() {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve();
          }, 200);
        });
      },
    }
  );
  t.plan(2);
  const timer = new CountTime();
  return ga.run().then(() => {
    const time = timer.time();
    t.assert(time > 1700, unpackVariableNames({time}));
    t.assert(time < 2300, unpackVariableNames({time}));
  });
});
