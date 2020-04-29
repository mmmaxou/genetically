import test from 'ava';
import {Chromosome} from './Chromosome';
import {LinearGeneticAlgorithm} from '../../example/LinearFunction';
import {unpackVariableNames} from '../Helpers/Helpers';
const ga = LinearGeneticAlgorithm();

test('create a chromosome', (t) => {
  const c = new Chromosome(ga);
  t.is(typeof c, 'object', unpackVariableNames({c}));
});

test('should run if fitness is called before run', (t) => {
  const c = new Chromosome(ga);
  t.is(typeof c.fitnessScore, 'number', unpackVariableNames({'c.fitnessScore': c.fitnessScore}));
  t.false(c.run(), 'Run two times');
});

test('should only run once', (t) => {
  const c = new Chromosome(ga);
  t.true(c.run(), 'Run once');
  t.false(c.run(), 'Run twice');
});

test('should create a chain by default', (t) => {
  const chromosome = new Chromosome(ga);
  t.not(chromosome.chain, '');
  t.is(typeof chromosome.chain, 'string', unpackVariableNames(chromosome));
});
