// // tslint:disable: no-unused-expression

import test from 'ava';
import {LinearGeneticAlgorithm} from '../../example/LinearFunction';
import {BitChain} from '../Helpers/BitChain';
import {NoMutation} from '../Mutation/NoMutation';
import {CrossoverStatistics} from './GenericCrossover';
import {SinglePointCrossover} from './SinglePointCrossover';

const ga = LinearGeneticAlgorithm();
const pop = ga.lastPopulation;
const singlePoint = new SinglePointCrossover();
pop.run();

let statistics: CrossoverStatistics;
let chains: BitChain[];

test.beforeEach(() => {
  chains = ga.selection(pop);
  statistics = new CrossoverStatistics();
});

test('should create a population of config.popsize length', (t) => {
  const c = singlePoint.crossover(chains, new NoMutation(), statistics);
  t.true(Array.isArray(c), 'Not an array');
  t.true(c.length === pop.popConfig.popsize, 'Length is not configured one');
});

test.todo('should have a different fitness than the former population 99% of time');
