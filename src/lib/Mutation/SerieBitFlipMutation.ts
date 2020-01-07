import {
  MutationStrategy,
  DEFAULT_MUTATION_CONFIGURATION,
} from './GenericMutation';
import {BitChain} from '../Helpers/BitChain';

/**
 * Flip bit mutation
 * Compute next probability each time a mutation is done
 * Use probabilities to compute a counter for the next flip bit
 */
export class SerieFlipBitMutation extends MutationStrategy {
  public _nextMutationCounter = 0;
  private invertedLogOfOneMinusProbability: number;

  constructor(
    probability: number = DEFAULT_MUTATION_CONFIGURATION.probability
  ) {
    super(probability);
    this.invertedLogOfOneMinusProbability = 1 / Math.log(1 - probability);
  }

  /**
   * Mutate a chain
   */
  public mutation(chain: BitChain): BitChain {
    let returnChain: BitChain;
    // console.log('chain length is ', chain.length);
    // console.log('next mutation counter is ', this._nextMutationCounter);

    // If the length of the chain is less than the _nextMutationCounter,
    // Don't mutate and return the chain
    // Decrement _nextMutationCounter
    if (chain.length < this._nextMutationCounter) {
      this._nextMutationCounter -= chain.length;
      returnChain = chain;
    } else if (chain.length === this._nextMutationCounter + 1) {
      const begin: BitChain = chain.substring(0, this._nextMutationCounter);
      const flipped: BitChain = chain[0] === '0' ? '1' : '0';
      this.computeNextMutation();
      returnChain = begin + flipped;
    } else {
      // Operate a bit flip on the selected bit chain number and redo a mutation
      const begin: BitChain = chain.substring(0, this._nextMutationCounter);
      const flipped: BitChain = chain[0] === '0' ? '1' : '0';
      const end: BitChain = chain.substring(this._nextMutationCounter + 1);

      // console.log('begining is', begin);
      // console.log('flipped is', flipped);
      // console.log('end is', end);

      // Complete chain
      this.computeNextMutation();
      returnChain = begin + flipped + this.mutation(end);
    }

    /**
     * Returns
     */
    return returnChain;
  }

  /**
   * Compute the next mutation
   */
  private computeNextMutation() {
    const p = Math.random();
    const iln1mp = this.invertedLogOfOneMinusProbability;
    this._nextMutationCounter = ~~(Math.log(1 - p) * iln1mp);
  }
}
