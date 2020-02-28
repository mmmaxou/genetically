import {MutationStrategy} from './GenericMutation';
import {BitChain} from '../Helpers/BitChain';

/**
 * Naive Flip bit mutation
 * Use a probability for each mutation
 */
export class NaiveFlipBitMutation extends MutationStrategy<BitChain> {
  /**
   * Mutate a chain
   */
  public mutation(chain: BitChain): BitChain {
    const newChain = chain
      .split('')
      .map((c) => {
        const p = Math.random();
        if (p < this.probability) {
          return c === '0' ? '1' : '0';
        } else {
          return c;
        }
      })
      .join('');
    return newChain;
  }
}
