import {Population} from '../Population';
import {BitChain} from '../Chromosome';
import {now} from 'lodash';

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
  public averageIteration = 0;
  public averageTime = 0;
}

/**
 * Inspirations for selections strategies
 * https://en.wikipedia.org/wiki/Selection_(genetic_algorithm)#a._Roulette_Wheel_Selection
 */

/**
 * Interface for a selection strategy
 */
export abstract class SelectionStrategy {
  public abstract selection(population: Population): BitChain[];

  public selectionWithStatistics(
    population: Population,
    statistics: SelectionStatistics
  ): BitChain[] {
    const start = now();
    const averageIteration = population.population.length * 3;
    const averageTime = averageIteration * 0.0005;
    const chain = this.selection(population);
    statistics.time += now() - start;
    statistics.averageIteration += averageIteration;
    statistics.averageTime += averageTime;
    return chain;
  }
}
