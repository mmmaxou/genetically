import {
  ConfigureParams,
  FitnessFunctionObjective,
  PopulationParams,
  ChangeConfigurationParams,
  RequiredConfigureParams,
} from './Params';
import {RouletteWheelSelection} from './Selection';
import {FlipBitMutation} from './Mutation/FlipBitMutation';
import {SinglePointCrossover} from './Crossover/SinglePointCrossover';

export const DEFAULT_CONFIGURATION_POPULATION: PopulationParams = {
  popsize: 50,
};

export const DEFAULT_CONFIGURATION_GENETIC_ALGORITHM: ConfigureParams = {
  verbose: 'DEBUG',
  objective: FitnessFunctionObjective.MAXIMIZE,
  population: DEFAULT_CONFIGURATION_POPULATION,
  selection: new RouletteWheelSelection(),
  crossover: new SinglePointCrossover(),
  mutation: new FlipBitMutation(),
  iterations: 50,
  stopCondition: () => false,
  afterEach: () => {},
};

export const DEFAULT_CONFIGURATION = {
  GENETIC_ALGORITHM: DEFAULT_CONFIGURATION_GENETIC_ALGORITHM,
  POPULATION: DEFAULT_CONFIGURATION_POPULATION,
};

export class Configuration<T> {
  /**
   * ==================================
   * Attributes
   * ==================================
   */

  private _config: RequiredConfigureParams<T>;

  /**
   * ==================================
   * Constructor
   * ==================================
   */
  constructor(config: RequiredConfigureParams<T>) {
    this._config = config;
    this.configure(config);
  }

  /**
   * ==================================
   * Getter
   * ==================================
   */

  get(): RequiredConfigureParams<T> {
    return this._config;
  }

  /**
   * ==================================
   * Public
   * ==================================
   */

  /**
   * Change the configuration on the fly
   */
  public changeConfiguration(
    configuration: ChangeConfigurationParams<T>
  ): void {
    /**
     * Create new configuration
     */
    const config: RequiredConfigureParams<T> = {
      ...DEFAULT_CONFIGURATION_GENETIC_ALGORITHM,
      ...this._config,
      ...configuration,
    };

    /**
     * Test configuration
     */
    this.testGeneticAlgorithmConfiguration(config);

    /**
     * Update configuration
     */
    this._config = config;
  }

  /**
   * ==================================
   * Private
   * ==================================
   */
  /**
   * Change configuration
   */
  private configure(configuration: RequiredConfigureParams<T>): void {
    /**
     * Default configuration
     */
    const popConfig: PopulationParams = {
      ...DEFAULT_CONFIGURATION_POPULATION,
      ...configuration.population,
    };
    const config: RequiredConfigureParams<T> = {
      ...DEFAULT_CONFIGURATION_GENETIC_ALGORITHM,
      ...configuration,
      population: popConfig,
    };

    /**
     * Test configuration
     */
    this.testGeneticAlgorithmConfiguration(config);

    /**
     * Update configuration
     */
    this._config = config;
  }

  /**
   * Verify the given configuration is valid
   */
  private testGeneticAlgorithmConfiguration(
    config: RequiredConfigureParams<T>
  ) {
    /**
     * Test
     */
    const r = this._config.randomValue();
    const enc = this._config.encode(r);
    const dec = this._config.decode(enc);

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
        `\x1b[31mError trying to encode then decode a random value.
\x1b[31mcode: 'decode(encode(randomValue))' is different than randomValue`
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
  private error(message: string, object: any = '') {
    if (this._config.verbose === 'DEBUG') {
      console.error(message, object);
    }
  }
}
