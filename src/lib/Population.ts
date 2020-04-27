import {CountTime} from './Helpers/CountTime';
import {Chromosome} from './Chromosome';
import {
  PopulationParams,
  FitnessFunctionObjective,
  CompleteConfigureParams,
} from './Helpers/Params';
import {GeneticAlgorithm} from './GeneticAlgorithm';
import {BitChain} from './Helpers/BitChain';
import {computeHistogram} from './Helpers/Helpers';

/**
 * Contains the logic of a population
 */
export class Population<EncodedType = BitChain> {
  /**
   * ==================================
   * Attributes
   * ==================================
   */
  private _population: Chromosome<EncodedType>[] = [];
  private _computed = false;
  private _fittest: Chromosome<EncodedType> = this.population[0];
  private _leastFit: Chromosome<EncodedType> = this.population[0];
  private _sumFitness = 0;
  private _meanFitness = 0;
  private _timeToRun = 0;
  private _histogram: number[][] = [];

  /**
   * ==================================
   * Constructor
   * ==================================
   */
  constructor(
    private geneticAlgorithm: GeneticAlgorithm<any, EncodedType>,
    initialPopulation?: Chromosome<EncodedType>[] | EncodedType[]
  ) {
    if (initialPopulation) {
      if (typeof initialPopulation[0] === 'string') {
        // initialPopulation is an array of string
        // Create associated chromosomes
        this._population = (initialPopulation as EncodedType[]).map(
          (chain: EncodedType) =>
            new Chromosome<EncodedType>(this.geneticAlgorithm, chain)
        );
      } else {
        // initialPopulation is an array of chromosome
        // Use it as is
        this._population = initialPopulation as Chromosome<EncodedType>[];
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

  /**
   * Return the configuration in use
   */
  get config(): CompleteConfigureParams<any, EncodedType> {
    return this.geneticAlgorithm.configuration;
  }

  /**
   * Return the configuration of the population in use
   */
  get popConfig(): PopulationParams {
    return this.config.population;
  }

  /**
   * Get an overview of the population
   */
  get population(): Chromosome<EncodedType>[] {
    return this._population;
  }

  /**
   * Get the fittest individual
   */
  get fittest(): Chromosome<EncodedType> {
    if (!this.computed) {
      throw this.notComputedError();
    }
    return this._fittest;
  }

  /**
   * Get the least fittest individual
   */
  get leastFit(): Chromosome<EncodedType> {
    if (!this.computed) {
      throw this.notComputedError();
    }
    return this._leastFit;
  }

  /**
   * Get the mean fitness of the population
   */
  get sumFitness(): number {
    if (!this.computed) {
      throw this.notComputedError();
    }
    return this._sumFitness;
  }

  /**
   * Get the mean fitness of the population
   */
  get meanFitness(): number {
    if (!this.computed) {
      throw this.notComputedError();
    }
    return this._meanFitness;
  }

  get histogram(): number[][] {
    if (!this.computed) {
      throw this.notComputedError();
    }
    return this._histogram;
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
    /// Verify it was not already run
    if (this._computed) {
      return false;
    }

    /// Process
    const timer = new CountTime();
    let fittest: Chromosome<EncodedType> = this.population[0];
    let leastFit: Chromosome<EncodedType> = this.population[0];
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

    /// Sort individuals
    const MaximizeSort = (
      A: Chromosome<EncodedType>,
      B: Chromosome<EncodedType>
    ) => {
      return B.fitnessScore - A.fitnessScore;
    };
    const MinimizeSort = (
      A: Chromosome<EncodedType>,
      B: Chromosome<EncodedType>
    ) => {
      return A.fitnessScore - B.fitnessScore;
    };
    const SortFunction =
      this.config.objective === FitnessFunctionObjective.MAXIMIZE
        ? MaximizeSort
        : MinimizeSort;
    this.population.sort(SortFunction);

    /// Normalize individuals
    const fitnesses: number[] = [];
    this.population.forEach((individual) => {
      fitnesses.push(individual.fitnessScore);
      individual.normalizeBaseOnSumOfFitness(sum);
    });

    /// Assign
    this._fittest = fittest;
    this._leastFit = leastFit;
    this._sumFitness = sum;
    this._meanFitness = mean;
    this._histogram = computeHistogram(fitnesses);
    this._timeToRun = timer.time();

    /// Freeze _computed
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
  private initPopulation(): Chromosome<EncodedType>[] {
    return Array.from(
      Array(this.popConfig.popsize),
      () => new Chromosome<EncodedType>(this.geneticAlgorithm)
    );
  }

  private notComputedError(): Error {
    return new Error(`You must call population.run() before finding mean`);
  }
}
