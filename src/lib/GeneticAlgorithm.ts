import { Population } from './Population';
import {
  ConfigureParams,
  RequiredConfigureParams,
  EncodeFunction,
  DecodeFunction,
  RandomValueFunction,
  FitnessFunction,
  PopulationParams
} from './Params';
export class GeneticAlgorithm<T> {
  /**
   * ==================================
   * Static
   * ==================================
   */
  static readonly DEFAULT_CONFIGURATION: ConfigureParams = {
    verbose: 'DEBUG',
    population: Population.DEFAULT_CONFIGURATION
  };

  /**
   * ==================================
   * Attributes
   * ==================================
   */
  private config: RequiredConfigureParams<T>;
  private populations: Population[] = [];

  /**
   * ==================================
   * Constructor
   * ==================================
   */
  /**
   * Require a configuration objet to start
   */
  constructor(config: RequiredConfigureParams<T>) {
    this.config = config;
    this.configure(config);
    this.populations = this.initGeneration();
  }

  /**
   * ==================================
   * Getters
   * ==================================
   */
  get encode(): EncodeFunction<T> {
    return this.config.encode;
  }

  get decode(): DecodeFunction<T> {
    return this.config.decode;
  }

  get randomValue(): RandomValueFunction<T> {
    return this.config.randomValue;
  }

  get fitness(): FitnessFunction<T> {
    return this.config.fitness;
  }

  get configuration(): RequiredConfigureParams<T> {
    return this.config;
  }

  get lastPopulation(): Population {
    if (this.populations.length === 0) {
      throw new Error(
        `Population array of genetic algorithm is currently empty`
      );
    }
    return this.populations[this.populations.length - 1];
  }
  /**
   * ==================================
   * Public
   * ==================================
   */
  /**
   * Change configuration
   */
  public configure(configuration: RequiredConfigureParams<T>): void {
    /**
     * Default configuration
     */
    const popConfig: PopulationParams = {
      ...Population.DEFAULT_CONFIGURATION,
      ...configuration.population
    };
    const config: RequiredConfigureParams<T> = {
      ...GeneticAlgorithm.DEFAULT_CONFIGURATION,
      ...configuration,
      population: popConfig
    };

    /**
     * Test configuration
     */
    this.testGeneticAlgorithmConfiguration(config);

    /**
     * Update configuration
     */
    this.config = config;
  }

  /**
   * Create a fresh population
   */
  public initGeneration(): Population[] {
    return [new Population(this)];
  }

  /**
   * Start the generation
   */
  public runOnce(): void {
    this.lastPopulation.run();
  }

  /**
   * ==================================
   * Private
   * ==================================
   */

  /**
   * Verify the given configuration is valid
   */
  private testGeneticAlgorithmConfiguration(
    config: RequiredConfigureParams<T>
  ) {
    /**
     * Test
     */
    const r = this.randomValue();
    const enc = this.encode(r);
    const dec = this.decode(enc);

    /**
     * Deep equal between encode and decode
     */
    if (JSON.stringify(r) !== JSON.stringify(dec)) {
      this.error(`\x1b[31mError during Genetic Algorithm configuration :`);
      this.error(`\x1b[31mGiven configuration is wrong`);
      this.error('\x1b[31mRandom value is', r);
      this.error('\x1b[31mEncoded value is', enc);
      this.error('\x1b[31mDecoded value is', dec);
      throw new Error(
        `Error trying to encode then decode a random value.
        code: 'decode(encode(randomValue))' is different than randomValue`
      );
    }

    /**
     * Verbose
     */
    if (
      !(
        config.verbose === 'DEBUG' ||
        config.verbose === 'INFO' ||
        config.verbose === 'NONE'
      )
    ) {
      throw new Error(
        `Config.verbose should be one of 'INFO', 'DEBUG', 'NONE'`
      );
    }
  }

  /**
   * Display error
   */
  private error(message: string, object?: any) {
    if (this.config.verbose === 'DEBUG') {
      console.error(message, object);
    }
  }
}
