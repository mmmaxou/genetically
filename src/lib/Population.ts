import { Chromosome } from './Chromosome';
import { PopulationParams, RequiredConfigureParams } from './Params';
import { GeneticAlgorithm } from './GeneticAlgorithm';
export class Population {
  /**
   * ==================================
   * Static
   * ==================================
   */
  static readonly DEFAULT_CONFIGURATION: PopulationParams = {
    popsize: 50
  };
  /**
   * ==================================
   * Attributes
   * ==================================
   */
  private _population: Chromosome[] = [];
  private _computed = false;
  private _fittest: Chromosome = this.population[0];
  private _leastFittest: Chromosome = this.population[0];
  private _sumFitness = 0;
  private _meanFitness = 0;

  /**
   * ==================================
   * Constructor
   * ==================================
   */
  constructor(private geneticAlgorithm: GeneticAlgorithm<any>) {
    this._population = this.initPopulation();
  }
  /**
   * ==================================
   * Getters
   * ==================================
   */
  get config(): RequiredConfigureParams<any> {
    return this.geneticAlgorithm.configuration;
  }
  get popConfig(): PopulationParams {
    return this.config.population;
  }
  /**
   * Get an overview of the population
   */
  get population(): Chromosome[] {
    return this._population;
  }

  /**
   * Get the fittest individual
   */
  get fittest(): Chromosome {
    if (!this._computed) {
      throw new Error(
        `You must call population.run() before finding the fittest`
      );
    } else {
      return this._fittest;
    }
  }

  /**
   * Get the least fittest individual
   */
  get leastFittest(): Chromosome {
    if (!this._computed) {
      throw new Error(
        `You must call population.run() before finding the least fittest`
      );
    } else {
      return this._leastFittest;
    }
  }

  /**
   * Get the mean fitness of the population
   */
  get sumFitness(): number {
    if (!this._computed) {
      throw new Error(`You must call population.run() before finding sum`);
    } else {
      return this._sumFitness;
    }
  }

  /**
   * Get the mean fitness of the population
   */
  get meanFitness(): number {
    if (!this._computed) {
      throw new Error(`You must call population.run() before finding mean`);
    } else {
      return this._meanFitness;
    }
  }

  /**
   * Get the _computed value
   * Computed is set to true once run is called once
   */
  get computed(): boolean {
    return this._computed;
  }

  /**
   * ==================================
   * Public
   * ==================================
   */

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
    let fittest: Chromosome = this.population[0];
    let leastFittest: Chromosome = this.population[0];
    let max = Number.MIN_SAFE_INTEGER;
    let min = Number.MAX_SAFE_INTEGER;
    let sum = 0;
    this.population.forEach((individual) => {
      individual.run();
      const score = individual.fitnessScore;
      if (max < score) {
        max = score;
        fittest = individual;
      } else if (min > score) {
        min = score;
        leastFittest = individual;
      }
      sum += score;
    });
    const mean = sum / this.population.length;

    /**
     * Assign
     */
    this._fittest = fittest;
    this._leastFittest = leastFittest;
    this._sumFitness = sum;
    this._meanFitness = mean;

    /**
     * Freeze _computed
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

  /**
   * Generate a new population with empty individuals
   */
  private initPopulation(): Chromosome[] {
    return Array.from(
      Array(this.popConfig.popsize),
      () => new Chromosome(this.geneticAlgorithm)
    );
  }
}
