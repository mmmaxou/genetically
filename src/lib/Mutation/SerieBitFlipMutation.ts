import {MutationStrategy, DEFAULT_MUTATION_CONFIGURATION} from './GenericMutation';
import {BitChain} from '../Helpers/BitChain';

/**
 * Flip bit mutation
 * Compute next probability each time a mutation is done
 * Use probabilities to compute a counter for the next flip bit
 */
export class SerieFlipBitMutation extends MutationStrategy<BitChain> {
  private _nextMutationOccurance: number;
  private invertedLogOfOneMinusProbability: number;

  constructor(probability: number = DEFAULT_MUTATION_CONFIGURATION.probability) {
    super(probability);
    this.invertedLogOfOneMinusProbability = 1 / Math.log(1 - probability) || 0;
    this._nextMutationOccurance = this.computeNextMutation();
  }

  /**
   * Mutate a chain
   */
  public mutation(chain: BitChain): BitChain {
    // console.log('chain length is ', chain.length);
    // console.log('next mutation counter is ', this._nextMutationCounter);

    // If the length of the chain is less than the _nextMutationCounter,
    // Don't mutate and return the chain
    // Decrement _nextMutationCounter
    if (chain.length === 0 || chain.length < this._nextMutationOccurance) {
      this._nextMutationOccurance -= chain.length;
      return chain;
    } else {
      // Operate a bit flip on the selected bit chain number and redo a mutation
      const begin: BitChain = chain.substring(0, this._nextMutationOccurance);
      const flipped: BitChain = chain[this._nextMutationOccurance] === '0' ? '1' : '0';
      const end: BitChain = chain.substring(this._nextMutationOccurance + 1);

      // console.log('begining is', begin);
      // console.log('flipped is', flipped);
      // console.log('end is', end);
      // console.log('next occurance is', this._nextMutationOccurance);
      // console.log('');

      // Complete chain
      this._nextMutationOccurance = this.computeNextMutation();
      return begin + flipped + this.mutation(end);
    }
  }

  /**
   * Compute the next mutation
   */
  private computeNextMutation(): number {
    const p = Math.random();
    return Math.round(Math.log(1 - p) * this.invertedLogOfOneMinusProbability) || 0;
  }
}
