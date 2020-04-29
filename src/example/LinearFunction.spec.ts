import test from 'ava';
import {Chromosome} from '../lib/Chromosome';
import {LinearFunctions, LinearGeneticAlgorithm} from './LinearFunction';

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

test('fitness function should return a number', (t) => {
  const x = 3;
  const fit = fitness(x);
  t.is(typeof fit, 'number', 'not a number');
});

test('fitness function should return the square of the number * -1', (t) => {
  const x = 3;
  const f = fitness(x);
  t.is(f, -9, 'not the square of 3');
});

test('fitness function should compute a fitness', (t) => {
  const ga = LinearGeneticAlgorithm();
  t.is(ga.fitness(1), -1);
  t.is(ga.fitness(10), -10 * 10);
  t.is(ga.fitness(0), 0 || -0);
});

test('LinearGeneticAlgorithm should create a whole population', (t) => {
  const ga = LinearGeneticAlgorithm();
  t.is(ga.lastPopulation.population.length, ga.configuration.population.popsize);
});

test('LinearGeneticAlgorithm should run once', (t) => {
  const ga = LinearGeneticAlgorithm();
  const c: Chromosome = ga.lastPopulation.population[0];
  ga.runOnce();
  const c2 = ga.lastPopulation.population[0];
  t.notDeepEqual(c, c2);
});
