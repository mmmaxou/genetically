import {Population} from '../Population';
import {BitChain} from '../Chromosome';

/**
 * Inspirations for selections strategies
 * https://en.wikipedia.org/wiki/Selection_(genetic_algorithm)#a._Roulette_Wheel_Selection
 */

/**
 * Interface for a selection strategy
 */
export abstract class SelectionStrategy {
  public abstract selection(
    population: Population,
    statistics?: SelectionStatistics
  ): BitChain[];
}

/**
 * Type for selection strategy
 */
export type SelectionFunction = (
  population: Population,
  statistics?: SelectionStatistics
) => BitChain[];

/**
 * Interface for statistics
 */
export class SelectionStatistics {
  public time = 0;
  public iterations = 0;
  public averageIteration = 0;
  public averageTime = 0;
}
