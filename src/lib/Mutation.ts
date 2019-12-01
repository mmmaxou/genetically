import {BitChain} from './Chromosome';
const now = require('performance-now');

/**
 * Inspiration for mutation strategies
 * https://en.wikipedia.org/wiki/Mutation_(genetic_algorithm)
 */

const DEFAULT_MUTATION_CONFIGURATION = {
  probability: 0.05,
};

/**
 * Interface for a selection strategy
 */
export abstract class MutationStrategy {
  constructor(
    protected probability: number = DEFAULT_MUTATION_CONFIGURATION.probability
  ) {}
  /**
   * Mutate a chain
   */
  public abstract mutation(
    chain: BitChain,
    statistics?: MutationStatistics
  ): BitChain;
}

/**
 * Interface for statistics
 */
export class MutationStatistics {
  public time = 0;
}

/**
 * No Mutation strategy
 */
export class NoMutation extends MutationStrategy {
  public mutation(chain: string): string {
    return chain;
  }
}

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
  public mutation(
    chain: string,
    statistics = new MutationStatistics()
  ): string {
    const start = now();
    let returnChain: string;
    // console.log('chain length is ', chain.length);
    // console.log('next mutation counter is ', this._nextMutationCounter);

    // If the length of the chain is less than the _nextMutationCounter,
    // Don't mutate and return the chain
    // Decrement _nextMutationCounter
    if (chain.length < this._nextMutationCounter) {
      this._nextMutationCounter -= chain.length;
      returnChain = chain;
    } else if (chain.length === this._nextMutationCounter + 1) {
      const begin: string = chain.substring(0, this._nextMutationCounter);
      const flipped: string = chain[0] === '0' ? '1' : '0';
      this.computeNextMutation();
      returnChain = begin + flipped;
    } else {
      // Operate a bit flip on the selected bit chain number and redo a mutation
      const begin: string = chain.substring(0, this._nextMutationCounter);
      const flipped: string = chain[0] === '0' ? '1' : '0';
      const end: string = chain.substring(this._nextMutationCounter + 1);

      // console.log('begining is', begin);
      // console.log('flipped is', flipped);
      // console.log('end is', end);

      // Complete chain
      this.computeNextMutation();
      returnChain = begin + flipped + this.mutation(end, statistics);
    }

    /**
     * Returns
     */
    statistics.time += now() - start;
    return returnChain;
  }

  private computeNextMutation() {
    const p = Math.random();
    const iln1mp = this.invertedLogOfOneMinusProbability;
    this._nextMutationCounter = ~~(Math.log(1 - p) * iln1mp);
  }
}

/**
 * Naive Flip bit mutation
 * Use a probability for each mutation
 */
export class NaiveFlipBitMutation extends MutationStrategy {
  /**
   * Mutate a chain
   */
  public mutation(
    chain: string,
    statistics = new MutationStatistics()
  ): string {
    const start = now();
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
    statistics.time += now() - start;
    return newChain;
  }
}

/**
 * Automatically use the best algorithm based on the probability
 * The threshold 0.04 was found empirically
 */
export class FlipBitMutation extends MutationStrategy {
  private strategy: MutationStrategy;

  constructor(
    probability: number = DEFAULT_MUTATION_CONFIGURATION.probability
  ) {
    super(probability);
    if (probability > 0.04) {
      this.strategy = new NaiveFlipBitMutation(probability);
    } else {
      this.strategy = new SerieFlipBitMutation(probability);
    }
  }

  public mutation(
    chain: string,
    statistics = new MutationStatistics()
  ): string {
    return this.strategy.mutation(chain, statistics);
  }
}
