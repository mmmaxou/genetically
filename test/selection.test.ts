// tslint:disable: no-unused-expression

import {expect} from 'chai';
import {LinearGeneticAlgorithm} from '../src/example/LinearFunction';
import {Population} from '../src/lib/Population';
import {FitnessFunctionObjective} from '../src/lib/Helpers/Params';
import {ITERATIONS} from './consts.test';
import {SelectionStatistics} from '../src/lib/Selection/SelectionGeneric';
import {RouletteWheelSelection} from '../src/lib/Selection/RouletteWheelSelection';
import {Chromosome} from 'src/lib/Chromosome';

describe('Selections Strategies', () => {
  const ga = LinearGeneticAlgorithm();
  ga.changeConfiguration({
    population: {
      popsize: 100,
    },
  });
  ga.refreshPopulation();

  /**
   * Variables
   */
  let pop: Population;
  let statistics: SelectionStatistics;

  beforeEach(() => {
    pop = ga.lastPopulation;
    statistics = new SelectionStatistics();
    pop.run();
  });

  describe('Roulette Wheel', () => {
    const roulette = new RouletteWheelSelection();

    it('should not mutate a population', () => {
      const copyOfPopulation: Chromosome[] = [];
      pop.population.forEach((chromosome) => {
        const nClone = JSON.parse(JSON.stringify(chromosome));
        nClone.normalizeBaseOnSumOfFitness(pop.sumFitness);
        copyOfPopulation.push(nClone);
      });
      roulette.selectionWithStatistics(pop, statistics);
      expect(pop.population).to.deep.equal(copyOfPopulation);
    });

    it('should create a population of config.popsize length', () => {
      const c = roulette.selectionWithStatistics(pop, statistics);
      expect(c).to.be.a('array');
      expect(c).to.be.lengthOf(pop.popConfig.popsize);
    });

    it('should have on average a better fitness than the former population', () => {
      let cptMore = 0;
      for (let i = 0; i < ITERATIONS; i++) {
        const c = roulette.selection(pop);
        const newPop = new Population(ga, c);
        newPop.run();

        const objective: FitnessFunctionObjective = newPop.config.objective;
        if (objective === FitnessFunctionObjective.MAXIMIZE) {
          cptMore += newPop.meanFitness > pop.meanFitness ? 1 : 0;
        } else if (objective === FitnessFunctionObjective.MINIMIZE) {
          cptMore += newPop.meanFitness < pop.meanFitness ? 1 : 0;
        }
      }
      expect(cptMore).to.be.at.least(ITERATIONS / 2.5);
    });
  });
});
