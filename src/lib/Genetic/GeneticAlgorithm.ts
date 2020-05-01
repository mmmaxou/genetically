import {CrossoverStatistics} from '../Crossover/GenericCrossover';
import {BitChain} from '../Helpers/BitChain';
import {Configuration} from '../Helpers/Configuration';
import {CountTime} from '../Helpers/CountTime';
import {Emitter, Unsubscribe} from '../Helpers/NanoEvents';
import {GeneticAlgorithmConfiguration} from '../Helpers/Params';
import {SelectionStatistics} from '../Selection/SelectionGeneric';
import {Chromosome} from './Chromosome';
import {Population} from './Population';

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
  private _timer: CountTime;
  private _running = false;
  private _emitter = new Emitter();

  /**
   * ==================================
   * Constructor
   * ==================================
   */
  /**
   * Require a configuration objet to start
   */
  constructor(
    /**
     * The encoding function takes a variable of your type T and must return a BitChain encoded version of this variable.
     * It is the opposite of the decode function
     * Must be provided
     */
    public readonly encode: (x: T) => EncodedType,

    /**
     * The decoding function takes an encoded BitChain and must return a variable of your type T.
     * Must be provided
     * It is the opposite of the decode function
     */
    public readonly decode: (s: EncodedType) => T,

    /**
     * A function returning a random value for initiating the neural network
     * Must be provided
     */
    public readonly randomValue: () => T,

    /**
     * The core function. Evaluate how fit a chromosome is.
     * You can use the objective parameter to choose if you want to maximize or minimize this function
     * Must be provided
     */
    public readonly fitness: (individual: T) => number,

    /**
     * Parameters used to change the configuration of the GeneticAlgorithm Object
     */
    config?: Partial<GeneticAlgorithmConfiguration<EncodedType>>
  ) {
    this.config = new Configuration<T, EncodedType>(encode, decode, randomValue, fitness, config);
    this.populations = [new Population<EncodedType>(this)];
    this.allTimeBestChromosome = this.lastPopulation.population[0];
    this._timer = new CountTime();
  }

  /**
   * ==================================
   * Getters
   * ==================================
   */
  get selection() {
    return this.config.selection;
  }

  get crossover() {
    return this.config.crossover;
  }

  get mutation() {
    return this.config.mutation;
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

  get configuration() {
    return this.config;
  }

  get changeConfiguration() {
    return this.config.changeConfiguration.bind(this.config);
  }

  /**
   * ==================================
   * Public
   * ==================================
   */

  /**
   * Refresh the last population
   */
  public refreshPopulation(): void {
    this.populations[this.populations.length - 1] = new Population<EncodedType>(this);
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
    const selected: EncodedType[] = this.selection.selectionWithStatistics(this.lastPopulation, selectionStatistics);
    /**
     * Crossover
     * and
     * Mutation
     */
    const crossoverStatistics = new CrossoverStatistics();
    const crossed: EncodedType[] = this.crossover.crossoverWithStatistics(selected, this.mutation, crossoverStatistics);

    /**
     * Create new population
     */
    const newPop = new Population(this, crossed);
    this.populations.push(newPop);
  }

  /**
   * Same than run once but faster.
   * Don't save all time best
   * Don't use statistics
   */
  public runOnceFast(): void {
    this.runPopulation();
    const selected: EncodedType[] = this.selection.selection(this.lastPopulation);
    const crossed: EncodedType[] = this.crossover.crossover(selected, this.mutation);
    const newPop = new Population(this, crossed);
    this.populations.push(newPop);
  }

  /**
   * Evolve
   */
  public run(): Promise<Population<EncodedType>> {
    this._running = true;
    this._timer.reset();
    return this.run__Recurr();
  }

  public pause(): void {
    this._running = false;
  }

  public resume(): void {
    this._running = true;
    this.run__Recurr();
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

  public onPeek(callback: (population: Population<EncodedType>, iteration: number) => void): Unsubscribe {
    return this._emitter.on('peek', callback);
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

  private run__Recurr(): Promise<Population<EncodedType>> {
    this.runOnce();
    this.runPopulation();
    this.emitPeek();
    const stop =
      this.populations.length >= this.config.iterations ||
      this.config.stopCondition(this.lastPopulation, this.populations.length) ||
      !this._running;

    if (stop) {
      return new Promise((resolve) => {
        this.tryToSaveAllTimeBest();
        this.time = this._timer.time();
        this._running = false;
        if (this.config.waitBetweenIterations) {
          this.config.waitBetweenIterations().then(() => resolve(this.lastPopulation));
        } else {
          resolve(this.lastPopulation);
        }
      });
    } else {
      return new Promise((resolve) => {
        if (this.config.waitBetweenIterations) {
          this.config.waitBetweenIterations().then(() => resolve(this.run__Recurr()));
        } else {
          resolve(this.run__Recurr());
        }
      });
    }
  }

  /**
   * Events system :
   * Peek
   * Return the last population
   */

  private emitPeek() {
    this._emitter.emit('peek', this.lastPopulation, this.populations.length - 1);
  }
}
