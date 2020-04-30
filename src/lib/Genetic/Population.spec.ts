import test from 'ava';
import {LinearGeneticAlgorithm} from '../../example/LinearFunction';
import {DEFAULT_CONFIGURATION_POPULATION} from '../Helpers/Configuration';
import {unpackVariableNames} from '../Helpers/Helpers';
import {FitnessFunctionObjective} from '../Helpers/Params';

const ga = LinearGeneticAlgorithm();
const p = ga.lastPopulation;

test('should be created by the algorithm genetic class', (t) => {
  t.is(typeof p, 'object');
});

test('should contain a population of config.popsize length', (t) => {
  t.is(p.population.length, p.popConfig.popsize);
});

test('should not be computed by default', (t) => {
  t.false(p.computed);
});

test('should load the default configuration', (t) => {
  const deft = DEFAULT_CONFIGURATION_POPULATION;
  const conf = p.popConfig;
  t.deepEqual(deft.popsize, conf.popsize);
});

test('should fail to run only once', (t) => {
  const nga = LinearGeneticAlgorithm();
  const r = nga.lastPopulation;
  t.true(r.run());
  t.false(r.run());
});
test('should be marked as computed', (t) => {
  const nga = LinearGeneticAlgorithm();
  const r = nga.lastPopulation;
  t.false(r.computed);
  t.true(r.run());
  t.true(r.computed);
});

test('should compute the fittest', (t) => {
  const nga = LinearGeneticAlgorithm();
  const r = nga.lastPopulation;
  t.throws(() => r.fittest);
  r.run();
  t.notThrows(() => r.fittest);
  t.is(typeof r.fittest, 'object');
  t.is(typeof r.fittest.chain, 'string');
});

test('should compute the least fittest', (t) => {
  const nga = LinearGeneticAlgorithm();
  const r = nga.lastPopulation;
  t.throws(() => r.leastFit);
  r.run();
  t.notThrows(() => r.leastFit);
  t.is(typeof r.leastFit, 'object');
  t.is(typeof r.leastFit.chain, 'string');
});

test('should compute the sum', (t) => {
  const nga = LinearGeneticAlgorithm();
  const r = nga.lastPopulation;
  t.throws(() => r.sumFitness);
  r.run();
  t.notThrows(() => r.sumFitness);
  t.is(typeof r.sumFitness, 'number');
  t.not(r.sumFitness, 10);
});

test('should compute the mean', (t) => {
  const nga = LinearGeneticAlgorithm();
  const r = nga.lastPopulation;
  t.throws(() => r.meanFitness);
  r.run();
  t.notThrows(() => r.meanFitness);
  t.is(typeof r.meanFitness, 'number');
  t.not(r.meanFitness, 10);
});

test('should sort the individuals', (t) => {
  const nga = LinearGeneticAlgorithm();
  const r = nga.lastPopulation;
  nga.changeConfiguration({
    objective: FitnessFunctionObjective.MAXIMIZE,
  });
  nga.run();
  t.assert(r.population[0].fitnessScore > r.population[r.population.length - 1].fitnessScore);
});

test('should sort the individuals reverse order', (t) => {
  const nga = LinearGeneticAlgorithm();
  const r = nga.lastPopulation;
  nga.changeConfiguration({
    objective: FitnessFunctionObjective.MINIMIZE,
  });
  nga.run();
  t.assert(r.population[0].fitnessScore < r.population[r.population.length - 1].fitnessScore);
});

test('should normalize the individuals', (t) => {
  const nga = LinearGeneticAlgorithm();
  const r = nga.lastPopulation;
  r.run();
  r.population.forEach((individual) => {
    t.is(typeof individual.normalizedFitnessScore, 'number');
    t.assert(individual.normalizedFitnessScore >= 0, unpackVariableNames({individual}));
    t.assert(individual.normalizedFitnessScore <= 1, unpackVariableNames({individual}));
  });
});
