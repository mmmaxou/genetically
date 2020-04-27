import {GeneticAlgorithm} from './GeneticAlgorithm';
import {RequiredConfigureParams} from './Helpers/Params';
import {BitChain} from './Helpers/BitChain';

export class Chromosome<EncodedType = BitChain> {
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
   * Static
   * ==================================
   */

  static From(chromosome: Chromosome<any>): Chromosome<any> {
    const c = new Chromosome(chromosome.geneticAlgorithm);
    c._chain = chromosome._chain;
    c._computed = chromosome._computed;
    c._fitnessScore = chromosome._fitnessScore;
    c._normalized = chromosome._normalized;
    c._normalizedFitnessScore = chromosome._normalizedFitnessScore;
    return c;
  }

  /**
   * ==================================
   * Constructor
   * ==================================
   */
  constructor(private geneticAlgorithm: GeneticAlgorithm<any, EncodedType>, initialChain?: EncodedType) {
    this._chain = initialChain || this.config.encode(this.config.randomValue());
  }

  /**
   * ==================================
   * Getters
   * ==================================
   */

  /**
   * Return the configuration in use
   */
  get config(): RequiredConfigureParams<any, EncodedType> {
    return this.geneticAlgorithm.configuration;
  }

  /**
   * Return the chain in use
   */
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
      throw new Error('You must call chromosome.normalizeBaseOnSumOfFitness( sum ) before');
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
   * Return a deep copy of the chromosome
   */
  public clone(): Chromosome<EncodedType> {
    return Chromosome.From(this);
  }

  /**
   * Return a deep copy of the chain
   * TODO: MODIFY THIS !!!!!!!
   */
  public cloneChain(): EncodedType {
    return JSON.parse(JSON.stringify(this._chain));
  }

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
   * Mark it normalize
   *
   * TODO : Normalize based on INV SUM
   */
  public normalizeBaseOnSumOfFitness(sum: number): void {
    this._normalized = true;
    this._normalizedFitnessScore = this._fitnessScore / sum;
  }

  /**
   * ==================================
   * Private
   * ==================================
   */
}
