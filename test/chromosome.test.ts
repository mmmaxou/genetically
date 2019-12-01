// tslint:disable: no-unused-expression

import {Chromosome} from './../src/lib/Chromosome';
import {expect} from 'chai';
import 'mocha';
import {LinearGeneticAlgorithm} from './../src/example/LinearFunction';

describe('Chromosome Class', () => {
  const ga = LinearGeneticAlgorithm();
  describe('Creation', () => {
    it('should create a chromosome', () => {
      const c = new Chromosome(ga);
      expect(c).to.be.a('object');
    });
  });

  describe('Running', () => {
    it('should run if fitness is called before run', () => {
      const c = new Chromosome(ga);
      expect(c.fitnessScore).to.be.a('number');
      expect(c.run()).to.equal(false);
    });
    it('should only run once', () => {
      const c = new Chromosome(ga);
      expect(c.run()).to.equal(true);
      expect(c.run()).to.equal(false);
    });
  });
});
