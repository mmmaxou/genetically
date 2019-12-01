import {expect} from 'chai';
import {LinearGeneticAlgorithm} from './../src/example/LinearFunction';
import {Population} from './../src/lib/Population';
import {
  RouletteWheelSelection,
  SelectionStatistics,
} from './../src/lib/Selection';
import _ from 'lodash';

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
      const copyOfPopulation = _.cloneDeep(pop.population);
      roulette.selection(pop, statistics);
      expect(pop.population).to.deep.equal(copyOfPopulation);
    });

    it('should create a population of config.popsize length', () => {
      const c = roulette.selection(pop, statistics);
      expect(c).to.be.a('array');
      expect(c).to.be.lengthOf(pop.popConfig.popsize);
    });

    it('should take at most 20% more than average computation time ( 95% of the time )', () => {
      const ITERATIONS = 12345;
      let cptMore = 0;
      for (let i = 0; i < ITERATIONS; i++) {
        roulette.selection(pop, statistics);
        const percentage = (a: number, b: number) => Math.abs(a / b) * 100;
        const deltaIter = percentage(
          statistics.iterations,
          statistics.averageIteration
        );
        const deltaTime = percentage(statistics.time, statistics.averageTime);

        // console.log(statistics);
        // console.log('delta iter is ', deltaIter);
        // console.log('delta time is ', deltaTime);
        cptMore += deltaIter < 130 ? 0.5 : 0;
        cptMore += deltaTime < 130 ? 0.5 : 0;
      }
      expect(cptMore).to.be.at.least(ITERATIONS * 0.95);
    });

    it('should have on average a better fitness than the former population', () => {
      const ITERATIONS = 12345;
      let cptMore = 0;
      for (let i = 0; i < ITERATIONS; i++) {
        const c = roulette.selection(pop);
        const newPop = new Population(ga, c);
        newPop.run();
        cptMore += newPop.meanFitness > pop.meanFitness ? 1 : 0;
      }
      expect(cptMore).to.be.at.least(ITERATIONS / 2);
    });
  });
});
