import {CrossoverStrategy} from './GenericCrossover';
import {NoMutation} from '../Mutation/NoMutation';
import {BitChain} from '../Helpers/BitChain';

/**
 * No Crossover
 * But apply mutation
 */
export class NoCrossover extends CrossoverStrategy {
  public crossover(
    chains: BitChain[],
    mutation = new NoMutation()
  ): BitChain[] {
    return chains.map((s) => mutation.mutation(s));
  }
}
