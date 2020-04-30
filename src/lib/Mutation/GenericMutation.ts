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
export abstract class MutationStrategy<EncodedType = BitChain> {
  constructor(protected probability: number = DEFAULT_MUTATION_CONFIGURATION.probability) {
    if (probability === 0) {
      throw new Error('A probability of 0 will not work. Use the class NoMutation instead.');
    } else if (probability > 1) {
      throw new Error(`A probability can't be > 1; given is ${probability}`);
    } else if (probability < 0) {
      throw new Error(`A probability can't be <= 0; given is ${probability}`);
    }
  }

  /**
   * Compute statistics
   */
  public mutationWithStatistics(chain: EncodedType, statistics: MutationStatistics): EncodedType {
    const timer = new CountTime();
    const newChain = this.mutation(chain);
    statistics.time += timer.time();
    return newChain;
  }

  /**
   * Mutate a chain
   */
  public abstract mutation(chain: EncodedType): EncodedType;
}
