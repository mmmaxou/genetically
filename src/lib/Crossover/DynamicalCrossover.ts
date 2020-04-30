import {CrossoverStrategy} from './GenericCrossover';
import {MutationStrategy} from '../Mutation/GenericMutation';
import {NoMutation} from '../Mutation/NoMutation';

/**
 * Create a custom dynamic crossover
 */
export class DynamicalCrossover<EncodedType> extends CrossoverStrategy<EncodedType> {
  constructor(private _crossover: (chain: EncodedType[], mutation: MutationStrategy) => EncodedType[]) {
    super();
  }

  /**
   * Must use mutation
   */
  public crossover(chains: EncodedType[], mutation = new NoMutation()): EncodedType[] {
    return this._crossover(chains, mutation);
  }
}
