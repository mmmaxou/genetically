import {BitChain} from '../Chromosome';

import {MutationStrategy} from '../Mutation/GenericMutation';

/**
 * Inspiration for crossover strategies
 * https://en.wikipedia.org/wiki/Crossover_(genetic_algorithm)
 */

/**
 * Interface for a selection strategy
 */
export abstract class CrossoverStrategy {
  public abstract crossover(
    chains: BitChain[],
    mutation: MutationStrategy,
    statistics?: CrossoverStatistics
  ): BitChain[];
}

/**
 * Crossover function
 */
export type CrossoverFunction = (
  chains: BitChain[],
  mutation: MutationStrategy,
  statistics?: CrossoverStatistics
) => BitChain[];

/**
 * Interface for statistics
 */
export class CrossoverStatistics {
  public time = 0;
}
