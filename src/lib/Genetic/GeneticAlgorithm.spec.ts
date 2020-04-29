import test from 'ava';
import {GeneticAlgorithm} from './GeneticAlgorithm';
import {unpackVariableNames} from '../Helpers/Helpers';
import {DEFAULT_CONFIGURATION_GENETIC_ALGORITHM} from '../Helpers/Configuration';

test('Create a pointless Genetic algorithm', (t) => {
  const ga = new GeneticAlgorithm(
    (x) => x,
    (x) => x,
    () => 1,
    (x) => x
  );
  t.is(typeof ga, 'object', unpackVariableNames({ga}));
});

const pointlessGA = new GeneticAlgorithm(
  (x) => x,
  (x) => x,
  () => 1,
  (x) => x
);

test('Load default configuration', (t) => {
  t.is(typeof pointlessGA.configuration, 'object');
  const defaultMap = new Map();
  Object.entries(DEFAULT_CONFIGURATION_GENETIC_ALGORITHM).map(([key, value]) => defaultMap.set(key, value));
  const currentMap = new Map();
  Object.entries(pointlessGA.configuration).map(([key, value]) => currentMap.set(key, value));
  t.deepEqual(defaultMap, currentMap);
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
