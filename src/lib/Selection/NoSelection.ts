import {SelectionStrategy} from './SelectionGeneric';
import {Population} from '../Genetic/Population';

export class NoSelection<EncodedType> extends SelectionStrategy<EncodedType> {
  public selection(population: Population<EncodedType>): EncodedType[] {
    return population.population.map((c) => c.chain);
  }
}
