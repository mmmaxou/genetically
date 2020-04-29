import test from 'ava';
import {LinearGeneticAlgorithm} from '../../example/LinearFunction';
import {Population} from '../Genetic/Population';
import {Chromosome} from '../Genetic/Chromosome';
import {ITERATIONS} from '../../consts';
import {SelectionStatistics} from './SelectionGeneric';
import {RouletteWheelSelection} from './RouletteWheelSelection';
import {FitnessFunctionObjective} from '../Helpers/Params';

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

test('should have on average a better fitness than the former population', (t) => {
  let cptMore = 0;
  for (let i = 0; i < ITERATIONS; i++) {
    const c = roulette.selection(pop);
    const newPop = new Population(ga, c);
    const objective: FitnessFunctionObjective = newPop.config.objective;
    newPop.run();
    if (objective === FitnessFunctionObjective.MAXIMIZE) {
      cptMore += newPop.meanFitness > pop.meanFitness ? 1 : 0;
    } else if (objective === FitnessFunctionObjective.MINIMIZE) {
      cptMore += newPop.meanFitness < pop.meanFitness ? 1 : 0;
    }
  }
  t.true(cptMore > ITERATIONS / 2.5, 'Fitness is not better than former population');
});
