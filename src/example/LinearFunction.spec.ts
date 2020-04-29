import test from 'ava';
import {Chromosome} from '../lib/Genetic/Chromosome';
import {LinearFunction, LinearGeneticAlgorithm} from './LinearFunction';
import {unpackVariableNames} from '../lib/Helpers/Helpers';

const randomValue = LinearFunction.randomValue;
const encode = LinearFunction.encode;
const decode = LinearFunction.decode;
const fitness = LinearFunction.fitness;

test('random value should be a number between -32 and 32', (t) => {
  const x = randomValue();
  t.is(typeof x, 'number', 'not a number');
  t.true(x > -32, unpackVariableNames({x}));
  t.true(x < 32, unpackVariableNames({x}));
});

test('encode function should encode a string of length 6', (t) => {
  const x = randomValue();
  const enc = encode(x);
  t.is(typeof enc, 'string', unpackVariableNames({enc}));
  t.is(enc.length, 6, unpackVariableNames({'enc.length': enc.length}));
});

test('encode function should encode a string with only 0 and 1 ', (t) => {
  const x = randomValue();
  const enc = encode(x);
  t.falsy(enc.match(/[^01]/), unpackVariableNames({enc}));
});

test('decode function should decode into a number', (t) => {
  const x = randomValue();
  const enc = encode(x);
  const dec = decode(enc);
  t.is(typeof dec, 'number', unpackVariableNames({dec}));
});

test('decode function should decode into the first generated random value', (t) => {
  const x = randomValue();
  const enc = encode(x);
  const dec = decode(enc);
  t.deepEqual(x, dec, unpackVariableNames({x, dec}));
});

test('fitness function should return a number', (t) => {
  const x = 3;
  const fit = fitness(x);
  t.is(typeof fit, 'number', unpackVariableNames({fit}));
});

test('fitness function should return the square of the number * -1', (t) => {
  const x = 3;
  const f = fitness(x);
  t.is(f, -9, unpackVariableNames({f}));
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
  t.notDeepEqual(c, c2, unpackVariableNames({c, c2}));
});
