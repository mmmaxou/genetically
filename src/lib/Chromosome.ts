import { GeneticAlgorithm } from './GeneticAlgorithm';
import { RequiredConfigureParams } from './Params';

export class Chromosome {
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
  private _computed = false;
  private _chain: string;
  /**
   * ==================================
   * Constructor
   * ==================================
   */
  constructor(private geneticAlgorithm: GeneticAlgorithm<any>) {
    this._chain = this.config.encode(this.config.randomValue());
  }
  /**
   * ==================================
   * Getters
   * ==================================
   */
  get config(): RequiredConfigureParams<any> {
    return this.geneticAlgorithm.configuration;
  }

  get chain(): string {
    return this._chain;
  }
  /**
   * ==================================
   * Public
   * ==================================
   */

  /**
   * Return the fitness score of the individual
   * Compute it if required
   */
  public get fitnessScore(): number {
    if (!this._computed) {
      this.run();
    }

    return this._fitnessScore;
  }

  /**
   * Can only be called once
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
   * ==================================
   * Private
   * ==================================
   */
}
