import {Chromosome, BitChain} from './Chromosome';
import {PopulationParams, RequiredConfigureParams} from './Params';
import {GeneticAlgorithm} from './GeneticAlgorithm';
const now = require('performance-now');

/**
 * Contains the logic of a population
 * Descr
 */
export class Population {
  /**
   * ==================================
   * Static
   * ==================================
   */
  static readonly DEFAULT_CONFIGURATION: PopulationParams = {
    popsize: 50,
  };
  /**
   * ==================================
   * Attributes
   * ==================================
   */
  private _population: Chromosome[] = [];
  private _computed = false;
  private _fittest: Chromosome = this.population[0];
  private _leastFit: Chromosome = this.population[0];
  private _sumFitness = 0;
  private _meanFitness = 0;
  private _timeToRun = 0;

  /**
   * ==================================
   * Constructor
   * ==================================
   */
  constructor(
    private geneticAlgorithm: GeneticAlgorithm<any>,
    initialPopulation?: Chromosome[] | BitChain[]
  ) {
    if (initialPopulation) {
      if (typeof initialPopulation[0] === 'string') {
        // initialPopulation is an array of string
        // Create associated chromosomes
        this._population = (initialPopulation as BitChain[]).map(
          (chain: BitChain) => new Chromosome(this.geneticAlgorithm, chain)
        );
      } else {
        // initialPopulation is an array of chromosome
        // Use it as is
        this._population = initialPopulation as Chromosome[];
      }
    } else {
      this._population = this.initPopulation();
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
      throw this.notComputedError();
    } else {
      return this._fittest;
    }
  }

  /**
   * Get the least fittest individual
   */
  get leastFit(): Chromosome {
    if (!this._computed) {
      throw this.notComputedError();
    } else {
      return this._leastFit;
    }
  }

  /**
   * Get the mean fitness of the population
   */
  get sumFitness(): number {
    if (!this._computed) {
      throw this.notComputedError();
    } else {
      return this._sumFitness;
    }
  }

  /**
   * Get the mean fitness of the population
   */
  get meanFitness(): number {
    if (!this._computed) {
      throw this.notComputedError();
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
   * Compute the fitness of every individual
   * Compute statistics for the population
   * Normalize the population
   * Sort the population
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
    const startTime = now();
    let fittest: Chromosome = this.population[0];
    let leastFit: Chromosome = this.population[0];
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
        leastFit = individual;
      }
      sum += score;
    });
    const mean = sum / this.population.length;

    /**
     * Normalize individuals
     */
    this.population.forEach((individual) => {
      individual.normalizeBaseOnSumOfFitness(sum);
    });

    /**
     * Sort individuals
     */
    // this.population.sort((A, B) => {
    //   return B.normalizedFitnessScore - A.normalizedFitnessScore;
    // });

    /**
     * Assign
     */
    this._fittest = fittest;
    this._leastFit = leastFit;
    this._sumFitness = sum;
    this._meanFitness = mean;
    this._timeToRun = now() - startTime;

    /**
     * Freeze _computed
     */
    this._computed = true;
    Object.freeze(this._computed);
    return true;
  }

  /**
   * Display the statistics of the population
   * Can only be called after run()
   */
  public display(): void {
    if (!this._computed) {
      console.log(`
===== Population =====
Population size is ${this._population.length}
Population is not yet computed.
Call population.run()
      `);
    } else {
      console.log(`
===== Population =====
Population size is ${this._population.length}
Time for running was ${this._timeToRun}
Fittest chromosome is ${this.fittest.fitnessScore}
Least fit chromosome is ${this.leastFit.fitnessScore}
Mean fitness is ${this.meanFitness}
Chain of the fittest is ${this.fittest.chain}
Solution of the fittest is ${this.geneticAlgorithm.decode(this.fittest.chain)}
      `);
    }
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

  private notComputedError(): Error {
    return new Error(`You must call population.run() before finding mean`);
  }
}
