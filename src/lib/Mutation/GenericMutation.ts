import {BitChain} from '../Chromosome';

import {now} from 'lodash';

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
    const start = now();
    const time = this.mutation(chain);
    statistics.time += now() - start;
    return time;
  }

  /**
   * Mutate a chain
   */
  public abstract mutation(chain: BitChain): BitChain;
}
