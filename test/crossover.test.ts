import {BitChain} from './../src/lib/Chromosome';
import {expect} from 'chai';
import {LinearGeneticAlgorithm} from './../src/example/LinearFunction';
import {Population} from './../src/lib/Population';
import {
  CrossoverStatistics,
  SinglePointCrossover,
} from './../src/lib/Crossover';
import {NoMutation} from './../src/lib/Mutation';
import {ITERATIONS} from './consts.test';

describe('Crossover Strategies', () => {
  const ga = LinearGeneticAlgorithm();
  ga.changeConfiguration({
    population: {
      popsize: 1000,
    },
  });
  ga.refreshPopulation();

  /**
   * Variables
   */
  let pop: Population;
  let statistics: CrossoverStatistics;
  let chains: BitChain[];

  pop = ga.lastPopulation;
  pop.run();

  beforeEach(() => {
    chains = ga.selection(pop);
    statistics = new CrossoverStatistics();
  });

  describe('Single Point', () => {
    const singlePoint = new SinglePointCrossover();
    it('should create a population of config.popsize length', () => {
      const c = singlePoint.crossover(chains, new NoMutation(), statistics);
      expect(c).to.be.a('array');
      expect(c).to.be.lengthOf(pop.popConfig.popsize);
    });

    it('should have a different fitness than the former population', () => {
      let cptDifferent = 0;
      for (let i = 0; i < ITERATIONS; i++) {
        const c = singlePoint.crossover(chains, new NoMutation(), statistics);
        const newPop = new Population(ga, c);
        newPop.run();
        cptDifferent += +(newPop.meanFitness !== pop.meanFitness);
      }
      // console.log('cpt more is ', cptMore);
      // console.log(statistics);
      expect(cptDifferent).to.equal(ITERATIONS);
    });
  });
});
