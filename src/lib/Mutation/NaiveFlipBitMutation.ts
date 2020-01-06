import {MutationStrategy} from './GenericMutation';

/**
 * Naive Flip bit mutation
 * Use a probability for each mutation
 */
export class NaiveFlipBitMutation extends MutationStrategy {
  /**
   * Mutate a chain
   */
  public mutation(chain: string): string {
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
