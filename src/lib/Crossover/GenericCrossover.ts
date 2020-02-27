import {MutationStrategy} from '../Mutation/GenericMutation';
import {BitChain} from '../Helpers/BitChain';

/**
 * Inspiration for crossover strategies
 * https://en.wikipedia.org/wiki/Crossover_(genetic_algorithm)
 */

/**
 * Interface for a selection strategy
 */
export abstract class CrossoverStrategy<EncodedType = BitChain> {
  public abstract crossover(
    chains: EncodedType[],
    mutation: MutationStrategy,
    statistics?: CrossoverStatistics
  ): EncodedType[];
}

/**
 * Crossover function
 */
export type CrossoverFunction<EncodedType = BitChain> = (
  chains: EncodedType[],
  mutation: MutationStrategy,
  statistics?: CrossoverStatistics
) => EncodedType[];

/**
 * Interface for statistics
 */
export class CrossoverStatistics {
  public time = 0;
}
