// tslint:disable: no-unused-expression

import {DEFAULT_CONFIGURATION_POPULATION} from '../src/lib/Helpers/Configuration';
import {Population} from './../src/lib/Population';
import {expect} from 'chai';
import {LinearGeneticAlgorithm} from './../src/example/LinearFunction';
import {FitnessFunctionObjective} from '../src/lib/Helpers/Params';

describe('Population Class', () => {
  const ga = LinearGeneticAlgorithm();
  const p = ga.initGeneration()[0];
  describe('Creation', () => {
    it('should be created by the algorithm genetic class', () => {
      expect(p).to.exist;
    });

    it('should contain a population of config.popsize length', () => {
      expect(p.population).to.be.lengthOf(p.popConfig.popsize);
    });

    it('should not be computed', () => {
      expect(p.computed).to.equal(false);
    });
  });
  describe('Configuration', () => {
    it('should load the default configuration', () => {
      expect(p.popConfig).to.deep.equal(DEFAULT_CONFIGURATION_POPULATION);
    });
  });
  describe('Run function', () => {
    let r: Population;
    beforeEach(() => {
      r = LinearGeneticAlgorithm().initGeneration()[0];
    });
    it('should fail to run only once', () => {
      expect(r.run()).to.equal(true);
      expect(r.run()).to.equal(false);
    });
    it('should be marked as computed', () => {
      expect(r.computed).to.equal(false);
      r.run();
      expect(r.computed).to.equal(true);
    });

    it('should compute the fittest', () => {
      expect(() => r.fittest).to.throw(Error);
      r.run();
      expect(() => r.fittest).to.not.throw(Error);
      expect(r.fittest).to.be.a('object');
      expect(r.fittest.chain).to.be.a('string');
    });

    it('should compute the least fittest', () => {
      expect(() => r.leastFit).to.throw(Error);
      r.run();
      expect(() => r.leastFit).to.not.throw(Error);
      expect(r.leastFit).to.be.a('object');
      expect(r.leastFit.chain).to.be.a('string');
    });

    it('should compute the sum', () => {
      expect(() => r.sumFitness).to.throw(Error);
      r.run();
      expect(() => r.sumFitness).to.not.throw(Error);
      expect(r.sumFitness).to.be.a('number');
      expect(r.sumFitness).to.not.equal(0);
    });

    it('should compute the mean', () => {
      expect(() => r.meanFitness).to.throw(Error);
      r.run();
      expect(() => r.meanFitness).to.not.throw(Error);
      expect(r.meanFitness).to.be.a('number');
      expect(r.meanFitness).to.not.equal(0);
    });

    it('should sort the individuals', () => {
      r.run();
      const objective: FitnessFunctionObjective = r.config.objective;
      if (objective === FitnessFunctionObjective.MAXIMIZE) {
        expect(r.population[0].fitnessScore).to.be.above(
          r.population[r.population.length - 1].fitnessScore
        );
      } else if (objective === FitnessFunctionObjective.MINIMIZE) {
        expect(r.population[0].fitnessScore).to.be.below(
          r.population[r.population.length - 1].fitnessScore
        );
      }
    });

    it('should normalize the individuals', () => {
      r.run();
      r.population.forEach((individual) => {
        expect(individual.normalizedFitnessScore).to.be.a('number');
        expect(individual.normalizedFitnessScore).to.be.at.least(0);
        expect(individual.normalizedFitnessScore).to.be.at.most(1);
      });
    });
  });
});
