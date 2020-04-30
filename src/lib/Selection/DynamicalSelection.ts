import {SelectionStrategy} from './SelectionGeneric';
import {Population} from '../Genetic/Population';

export class DynamicalSelection<EncodedType> extends SelectionStrategy<EncodedType> {
  constructor(private _selection: (population: Population<EncodedType>) => EncodedType[]) {
    super();
  }
  public selection(population: Population<EncodedType>): EncodedType[] {
    return this._selection(population);
  }
}
