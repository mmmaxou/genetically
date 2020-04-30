import {BitChain} from '../Helpers/BitChain';
import {shuffleArray} from '../Helpers/Helpers';
import {MutationStrategy} from '../Mutation/GenericMutation';
import {CrossoverStrategy} from './GenericCrossover';

/**
 * https://en.wikipedia.org/wiki/Crossover_(genetic_algorithm)#Single-point_crossover
 * Single Point Crossover
 */
export class SinglePointCrossover extends CrossoverStrategy<BitChain> {
  public crossover(chains: readonly BitChain[], mutation: MutationStrategy): BitChain[] {
    /**
     * Init
     */
    const created: BitChain[] = [];
    const shuffledChains = shuffleArray(chains);

    /**
     * For loop to create children
     */
    for (let i = 0; i < shuffledChains.length; i += 2) {
      const A = shuffledChains[i];

      /**
       * If the amount of population is odd
       * Push the last element
       */
      if (i + 1 >= shuffledChains.length) {
        created.push(A);
        continue;
      }
      const B = shuffledChains[i + 1];

      /**
       * A point on both parents' chromosomes is picked randomly, and designated a 'crossover point'.
       */
      const crossoverPoint = ~~(Math.random() * shuffledChains.length);

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
    return created;
  }
}
