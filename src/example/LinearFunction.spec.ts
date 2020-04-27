// tslint:disable: no-unused-expression
import test from 'ava';
import {LinearFunctions} from './LinearFunction';

const randomValue = LinearFunctions.randomValue;
const encode = LinearFunctions.encode;
const decode = LinearFunctions.decode;
const fitness = LinearFunctions.fitness;

test('random value should be a number between -32 and 32', (t) => {
  const x = randomValue();
  t.is(typeof x, 'number', 'not a number');
  t.true(x > -32, 'less than 32');
  t.true(x < 32, 'more than 32');
});

test('encode function should encode a string of length 6', (t) => {
  const x = randomValue();
  const enc = encode(x);
  t.is(typeof enc, 'string', 'not a string');
  t.is(enc.length, 6, 'length is not 6');
});

test('encode function should encode a string with only 0 and 1 ', (t) => {
  const x = randomValue();
  const enc = encode(x);
  t.falsy(enc.match(/[^01]/), 'Something else than a 0 or a 1');
});

test('decode function should decode into a number', (t) => {
  const x = randomValue();
  const enc = encode(x);
  const dec = decode(enc);
  t.is(typeof dec, 'number', 'not a number');
});

test('decode function should decode into the first generated random value', (t) => {
  const x = randomValue();
  const enc = encode(x);
  const dec = decode(enc);
  t.deepEqual(x, dec, 'not the first generated number');
});

test('should return a number', (t) => {
  const x = 3;
  const fit = fitness(x);
  t.is(typeof fit, 'number', 'not a number');
});

test('should return the square of the number * -1', (t) => {
  const x = 3;
  const f = fitness(x);
  t.is(f, -9, 'not the square of 3');
});

/*
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
      expect(() => createEncodeFunctionOfBase(Number.MIN_SAFE_INTEGER, 8)).to.throw(Error);
    });

    it('should should throw with a base more than 16', () => {
      expect(() => createEncodeFunctionOfBase(8, 8)).to.not.throw(Error);
      expect(() => createEncodeFunctionOfBase(36, 8)).to.throw(Error);
      expect(() => createEncodeFunctionOfBase(515, 8)).to.throw(Error);
      expect(() => createEncodeFunctionOfBase(Number.MAX_SAFE_INTEGER, 8)).to.throw(Error);
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
      expect(ga.lastPopulation.population).to.be.lengthOf(ga.configuration.population.popsize);
    });

    it('should run once', () => {
      const c: Chromosome = ga.lastPopulation.population[0];

      expect(ga.runOnce());

      const c2 = ga.lastPopulation.population[0];

      expect(c).to.not.deep.equal(c2);
    });
  });
});

*/
