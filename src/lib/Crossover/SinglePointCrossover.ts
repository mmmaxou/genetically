import {CrossoverStrategy, CrossoverStatistics} from './GenericCrossover';
import {MutationStrategy} from '../Mutation/GenericMutation';
import {shuffle, now} from 'lodash';
import {BitChain} from '../Helpers/BitChain';

/**
 * https://en.wikipedia.org/wiki/Crossover_(genetic_algorithm)#Single-point_crossover
 * Single Point Crossover
 */
export class SinglePointCrossover extends CrossoverStrategy {
  public crossover(
    chains: BitChain[],
    mutation: MutationStrategy,
    statistics = new CrossoverStatistics()
  ): BitChain[] {
    /**
     * Init
     */
    const created: BitChain[] = [];
    const start = now();
    shuffle(chains);
    /**
     * For loop to create children
     */
    for (let i = 0; i < chains.length; i += 2) {
      const A = chains[i];

      /**
       * If the amount of population is odd
       * Push the last element
       */
      if (i + 1 >= chains.length) {
        created.push(A);
        continue;
      }
      const B = chains[i + 1];

      /**
       * A point on both parents' chromosomes is picked randomly, and designated a 'crossover point'.
       */
      const crossoverPoint = ~~(Math.random() * chains.length);

      /**
       * Bits to the right of that point are swapped between the two parent chromosomes.
       */
      const a = A.substring(0, crossoverPoint) + B.substring(crossoverPoint);
      const b = B.substring(0, crossoverPoint) + A.substring(crossoverPoint);

      /**
       * Mutate chains
       */
      const m1 = mutation.mutation(a);
      const m2 = mutation.mutation(b);
      /**
       * Add them to creation
       */
      created.push(m1, m2);
    }

    /**
     * Returns
     */
    statistics.time += now() - start;
    return created;
  }
}
