import {CountTime} from './../Helpers/CountTime';
import {BitChain} from '../Helpers/BitChain';

/**
 * Inspiration for mutation strategies
 * https://en.wikipedia.org/wiki/Mutation_(genetic_algorithm)
 */

export const DEFAULT_MUTATION_CONFIGURATION = {
  probability: 0.05,
};

/**
 * Interface for statistics
 */
export class MutationStatistics {
  public time = 0;
}

/**
 * Class for a selection strategy
 */
export abstract class MutationStrategy {
  constructor(
    protected probability: number = DEFAULT_MUTATION_CONFIGURATION.probability
  ) {}

  /**
   * Compute statistics
   */
  public mutationWithStatistics(
    chain: BitChain,
    statistics: MutationStatistics
  ): BitChain {
    const timer = new CountTime();
    const newChain = this.mutation(chain);
    statistics.time += timer.time();
    return newChain;
  }

  /**
   * Mutate a chain
   */
  public abstract mutation(chain: BitChain): BitChain;
}
