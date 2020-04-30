import test from 'ava';
import {NoSelection} from './NoSelection';
import {GeneticAlgorithm} from '../Genetic/GeneticAlgorithm';
import {Population} from '../Genetic/Population';

test('Shall return the same', (t) => {
  const ga = new GeneticAlgorithm<number, string>(
    (x) => '' + x,
    (x) => +x,
    () => 1,
    (x) => x
  );
  const selection = new NoSelection<string>();
  const population = new Population(ga);
  const chains = population.population.map((c) => c.chain);
  const newPop = selection.selection(population);
  t.deepEqual(chains, newPop);
});
