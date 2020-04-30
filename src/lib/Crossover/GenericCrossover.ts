import {MutationStrategy} from '../Mutation/GenericMutation';
import {BitChain} from '../Helpers/BitChain';
import {CountTime} from '../Helpers/CountTime';

/**
 * Inspiration for crossover strategies
 * https://en.wikipedia.org/wiki/Crossover_(genetic_algorithm)
 */

/**
 * Interface for a selection strategy
 */
export abstract class CrossoverStrategy<EncodedType = BitChain> {
  public abstract crossover(chains: EncodedType[], mutation: MutationStrategy<EncodedType>): EncodedType[];

  /**
   * Compute statistics
   */
  public crossoverWithStatistics(
    chains: EncodedType[],
    mutation: MutationStrategy<EncodedType>,
    statistics: CrossoverStatistics
  ): EncodedType[] {
    const timer = new CountTime();
    const newChain = this.crossover(chains, mutation);
    statistics.time += timer.time();
    return newChain;
  }
}

/**
 * Interface for statistics
 */
export class CrossoverStatistics {
  public time = 0;
}
