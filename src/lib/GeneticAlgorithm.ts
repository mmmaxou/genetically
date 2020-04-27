import {CountTime} from './Helpers/CountTime';
import {Configuration} from './Helpers/Configuration';
import {Population} from './Population';
import {
  RequiredConfigureParams,
  EncodeFunction,
  DecodeFunction,
  RandomValueFunction,
  FitnessFunction,
  ChangeConfigurationParams,
  CompleteConfigureParams,
} from './Helpers/Params';
import {Chromosome} from './Chromosome';
import {MutationStrategy} from './Mutation/GenericMutation';
import {CrossoverFunction, CrossoverStatistics} from './Crossover/GenericCrossover';
import {SelectionFunction, SelectionStatistics} from './Selection/SelectionGeneric';
import {BitChain} from './Helpers/BitChain';

export class GeneticAlgorithm<T, EncodedType = BitChain> {
  /**
   * ==================================
   * Attributes
   * ==================================
   */
  private config: Configuration<T, EncodedType>;
  private populations: Population<EncodedType>[] = [];
  private allTimeBestChromosome: Chromosome<EncodedType>;
  private time = 0;

  /**
   * ==================================
   * Constructor
   * ==================================
   */
  /**
   * Require a configuration objet to start
   */
  constructor(config: RequiredConfigureParams<T, EncodedType> | CompleteConfigureParams<T, EncodedType>) {
    this.config = new Configuration(config);
    this.populations = this.initGeneration();
    this.allTimeBestChromosome = this.lastPopulation.population[0];
  }

  /**
   * ==================================
   * Getters
   * ==================================
   */
  get encode(): EncodeFunction<T, EncodedType> {
    return this.configuration.encode;
  }

  get decode(): DecodeFunction<T, EncodedType> {
    return this.configuration.decode;
  }

  get randomValue(): RandomValueFunction<T> {
    return this.configuration.randomValue;
  }

  get fitness(): FitnessFunction<T> {
    return this.configuration.fitness;
  }

  get selection(): SelectionFunction<EncodedType> {
    return this.configuration.selection.selection;
  }

  get crossover(): CrossoverFunction<EncodedType> {
    return this.configuration.crossover.crossover;
  }

  get mutation(): MutationStrategy<EncodedType> {
    return this.configuration.mutation;
  }

  get configuration(): CompleteConfigureParams<T, EncodedType> {
    return this.config.get();
  }

  get allTimeBest(): Chromosome<EncodedType> {
    return this.allTimeBestChromosome;
  }

  get lastPopulation(): Population<EncodedType> {
    if (this.populations.length === 0) {
      throw new Error(`Population array of genetic algorithm is currently empty`);
    }
    return this.populations[this.populations.length - 1];
  }
  /**
   * ==================================
   * Public
   * ==================================
   */

  /**
   * Change the configuration on the fly
   */
  public changeConfiguration(configuration: ChangeConfigurationParams<T, EncodedType>): void {
    this.config.changeConfiguration(configuration);
  }

  /**
   * Create a fresh population
   */
  public initGeneration(): Population<EncodedType>[] {
    return [new Population<EncodedType>(this)];
  }

  /**
   * Refresh the last population
   */
  public refreshPopulation(): void {
    this.populations[this.populations.length - 1] = this.initGeneration()[0];
  }

  /**
   * Compute statistics
   */
  public runPopulation(): void {
    this.lastPopulation.run();
  }

  /**
   * Start the generation
   */
  public runOnce(): void {
    /**
     * Compute the fitness of the population
     */
    this.runPopulation();

    /**
     * Display population
     */
    // this.lastPopulation.display();

    /**
     * Save the all time best
     */
    this.tryToSaveAllTimeBest();

    /**
     * Selection
     */
    const selectionStatistics = new SelectionStatistics();
    const selected: EncodedType[] = this.selection(this.lastPopulation, selectionStatistics);
    /**
     * Crossover
     * and
     * Mutation
     */
    const crossoverStatistics = new CrossoverStatistics();
    const crossed: EncodedType[] = this.crossover(selected, this.mutation, crossoverStatistics);

    /**
     * Create new population
     */
    const newPop = new Population(this, crossed);
    this.populations.push(newPop);
  }

  /**
   * Evolve
   */
  public run(): void {
    let stop = false;
    const timer = new CountTime();
    while (!stop) {
      /**
       * Run once
       */
      this.runOnce();
      this.runPopulation();

      /**
       * After each
       */
      this.configuration.afterEach(this.lastPopulation, this.populations.length);

      /**
       * Stop conditions
       */
      if (
        this.populations.length >= this.configuration.iterations ||
        this.configuration.stopCondition(this.lastPopulation, this.populations.length)
      ) {
        stop = true;
      }

      /**
       * Save time
       */
      this.time = timer.time();
    }

    /**
     * Save the all time best
     */
    this.tryToSaveAllTimeBest();
  }

  /**
   * Display informations about the generation
   * Display informations about the last population
   */
  public display(): void {
    console.log(`
===== Generation =====
Generation is ${this.populations.length}
Time elapsed is ${this.time}ms
All time best is ${this.allTimeBest.fitnessScore}
All time best chain is ${this.allTimeBest.chain}
All time best code is ${this.decode(this.allTimeBest.chain)}

`);
    this.lastPopulation.display();
  }

  /**
   * ==================================
   * Private
   * ==================================
   */
  private tryToSaveAllTimeBest(): void {
    /**
     * Save the all time best
     */
    const currentBest = this.lastPopulation.fittest;
    if (!this.allTimeBestChromosome) {
      this.allTimeBestChromosome = currentBest;
    } else if (this.allTimeBestChromosome.fitnessScore < currentBest.fitnessScore) {
      this.allTimeBestChromosome = currentBest;
    }
  }
}
