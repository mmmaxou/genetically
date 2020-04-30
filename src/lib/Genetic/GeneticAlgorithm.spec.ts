import test from 'ava';
import {DEFAULT_CONFIGURATION_GENETIC_ALGORITHM} from '../Helpers/Configuration';
import {unpackVariableNames} from '../Helpers/Helpers';
import {GeneticAlgorithm} from './GeneticAlgorithm';

test('Create a pointless Genetic algorithm', (t) => {
  const ga = new GeneticAlgorithm(
    (x) => x,
    (x) => x,
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
    (x) => x,
    (x) => x,
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
