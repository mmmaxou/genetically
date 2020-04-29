import test from 'ava';
import {LinearGeneticAlgorithm} from '../../example/LinearFunction';
import {Chromosome} from '../Genetic/Chromosome';
import {Population} from '../Genetic/Population';
import {RouletteWheelSelection} from './RouletteWheelSelection';
import {SelectionStatistics} from './SelectionGeneric';

const ga = LinearGeneticAlgorithm();
let pop: Population;
let statistics: SelectionStatistics;
const roulette = new RouletteWheelSelection();

test.beforeEach(() => {
  pop = ga.lastPopulation;
  statistics = new SelectionStatistics();
  pop.run();
});

test('Roulette wheel should not mutate a population', (t) => {
  const copyOfPopulation: Chromosome[] = [];
  pop.population.forEach((chromosome) => {
    const nClone = Chromosome.From(chromosome);
    copyOfPopulation.push(nClone);
  });
  roulette.selectionWithStatistics(pop, statistics);
  t.deepEqual(pop.population, copyOfPopulation, 'Mutated the object');
});

test('Roulette wheel should create a population of config.popsize length', (t) => {
  const c = roulette.selectionWithStatistics(pop, statistics);
  t.true(Array.isArray(c), 'Not an array');
  t.is(c.length, pop.popConfig.popsize, 'Population size is not the same');
});
