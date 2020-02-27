import {GeneticAlgorithm} from './GeneticAlgorithm';
import {RequiredConfigureParams} from './Helpers/Params';
import {BitChain} from './Helpers/BitChain';

export class Chromosome<EncodedType = BitChain> {
  /**
   * ==================================
   * Static
   * ==================================
   */
  /**
   * ==================================
   * Attributes
   * ==================================
   */
  private _fitnessScore = 0;
  private _normalizedFitnessScore = 0;
  private _computed = false;
  private _normalized = false;
  private _chain: EncodedType;
  /**
   * ==================================
   * Constructor
   * ==================================
   */
  constructor(
    private geneticAlgorithm: GeneticAlgorithm<any, EncodedType>,
    initialChain?: EncodedType
  ) {
    if (initialChain) {
      this._chain = initialChain;
    } else {
      this._chain = this.config.encode(this.config.randomValue());
    }
  }
  /**
   * ==================================
   * Getters
   * ==================================
   */
  get config(): RequiredConfigureParams<any> {
    return this.geneticAlgorithm.configuration;
  }

  get chain(): EncodedType {
    return this._chain;
  }

  /**
   * Return the fitness score of the individual
   * Compute it if required
   */
  get fitnessScore(): number {
    if (!this._computed) {
      this.run();
    }

    return this._fitnessScore;
  }

  /**
   * Return the normalized fitness score based on the population this is living in
   */
  get normalizedFitnessScore(): number {
    if (!this._normalized) {
      throw new Error(
        'You must call chromosome.normalizeBaseOnSumOfFitness( sum ) before'
      );
    } else {
      return this._normalizedFitnessScore;
    }
  }
  /**
   * ==================================
   * Public
   * ==================================
   */

  /**
   * Can only be called once
   * return true if computations were done
   * return false if run was already called
   */
  public run(): boolean {
    /**
     * Verify it was not already run
     */
    if (this._computed) {
      return false;
    }

    /**
     * Process
     */
    this._fitnessScore = this.config.fitness(this.config.decode(this._chain));

    /**
     * Freeze computed
     */
    this._computed = true;
    Object.freeze(this._computed);
    return true;
  }

  /**
   * Normalize the fitness score of the individual
   * Mark it normalized
   */
  public normalizeBaseOnSumOfFitness(sum: number) {
    this._normalized = true;
    this._normalizedFitnessScore = this._fitnessScore / sum;
  }

  /**
   * ==================================
   * Private
   * ==================================
   */
}
