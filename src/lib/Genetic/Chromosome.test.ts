import test from 'ava';
import {Chromosome} from './Chromosome';
import {LinearGeneticAlgorithm} from '../../example/LinearFunction';
const ga = LinearGeneticAlgorithm();

test('create a chromosome', (t) => {
  const c = new Chromosome(ga);
  t.true(typeof c === 'object', 'Not an object');
});

test('should run if fitness is called before run', (t) => {
  const c = new Chromosome(ga);
  t.true(typeof c.fitnessScore === 'number', 'Not a number');
  t.false(c.run(), 'Run two times');
});

test('should only run once', (t) => {
  const c = new Chromosome(ga);
  t.true(c.run(), 'Run once');
  t.false(c.run(), 'Run twice');
});
