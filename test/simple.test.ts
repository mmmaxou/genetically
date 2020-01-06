import {Chromosome} from './../src/lib/Chromosome';
import {
  randomValue,
  encode,
  decode,
  fitness,
  LinearGeneticAlgorithm,
} from './../src/example/LinearFunction';
import {expect} from 'chai';
import 'mocha';
import {createEncodeFunctionOfBase} from '../src/lib/Helpers/Helpers';

describe('Linear function', () => {
  describe('Coding representation of a solution', () => {
    describe('Creation of a random population element', () => {
      it('should be a number', () => {
        const x = randomValue();
        expect(x).to.be.a('number');
      });
      it('should be higher than -32', () => {
        const x = randomValue();
        expect(x).to.be.at.least(-32);
      });
      it('should be less than 32', () => {
        const x = randomValue();
        expect(x).to.be.at.most(32);
      });
    });

    describe('Encoding a solution', () => {
      it('should encode into a string', () => {
        const x = randomValue();
        const enc = encode(x);
        expect(enc).to.be.a('string');
      });

      it('should encode into a 6 length string', () => {
        const x = randomValue();
        const enc = encode(x);
        expect(enc).to.have.lengthOf(6);
      });

      it('should be a binary string', () => {
        const x = randomValue();
        const enc = encode(x);
        expect(enc).to.not.match(/[^01]/);
      });
    });

    describe('Decoding a solution', () => {
      it('should decode into a number', () => {
        const x = randomValue();
        const enc = encode(x);
        const dec = decode(enc);
        expect(dec).to.be.a('number');
      });

      it('should decode into the first generated random value', () => {
        const x = randomValue();
        const enc = encode(x);
        const dec = decode(enc);
        expect(JSON.stringify(x)).to.be.equal(JSON.stringify(dec));
      });
    });
  });

  describe('Fitness function', () => {
    it('should return a number', () => {
      const x = 3;
      const f = fitness(x);
      expect(f).to.be.a('number');
    });

    it('should return the square of the number * -1', () => {
      const x = 3;
      const f = fitness(x);
      expect(f).to.equal(-9);
    });
  });
});

describe('Helper functions', () => {
  describe('createEncodeFunctionOfBase function', () => {
    it('should return a function', () => {
      expect(createEncodeFunctionOfBase(2, 8)).to.be.a('function');
    });

    it('should should throw with a chain length less than 2', () => {
      expect(() => createEncodeFunctionOfBase(8, 8)).to.not.throw(Error);
      expect(() => createEncodeFunctionOfBase(8, 0)).to.throw(Error);
    });

    it('should should throw with a base less than 2', () => {
      expect(() => createEncodeFunctionOfBase(8, 8)).to.not.throw(Error);
      expect(() => createEncodeFunctionOfBase(0, 8)).to.throw(Error);
      expect(() => createEncodeFunctionOfBase(-515, 8)).to.throw(Error);
      expect(() =>
        createEncodeFunctionOfBase(Number.MIN_SAFE_INTEGER, 8)
      ).to.throw(Error);
    });

    it('should should throw with a base more than 16', () => {
      expect(() => createEncodeFunctionOfBase(8, 8)).to.not.throw(Error);
      expect(() => createEncodeFunctionOfBase(36, 8)).to.throw(Error);
      expect(() => createEncodeFunctionOfBase(515, 8)).to.throw(Error);
      expect(() =>
        createEncodeFunctionOfBase(Number.MAX_SAFE_INTEGER, 8)
      ).to.throw(Error);
    });
  });
});

describe('Linear Genetic Algorithm', () => {
  const ga = LinearGeneticAlgorithm();

  describe('Computation', () => {
    it('should compute a fitness', () => {
      expect(ga.fitness(1)).to.be.equal(-1);
      expect(ga.fitness(10)).to.be.equal(-10 * 10);
      expect(ga.fitness(0)).to.be.equal(0);
    });
  });

  describe('Generations', () => {
    it('should create a whole population', () => {
      expect(ga.lastPopulation.population).to.be.lengthOf(
        ga.configuration.population.popsize
      );
    });

    it('should run once', () => {
      const c: Chromosome = ga.lastPopulation.population[0];

      expect(ga.runOnce());

      const c2 = ga.lastPopulation.population[0];

      expect(c).to.not.deep.equal(c2);
    });
  });
});
