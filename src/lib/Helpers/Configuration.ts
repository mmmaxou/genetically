import {BitChain} from './BitChain';
import {
  FitnessFunctionObjective,
  PopulationParams,
  ChangeConfigurationParams,
  RequiredConfigureParams,
  CompleteConfigureParams,
} from './Params';
import {FlipBitMutation} from '../Mutation/FlipBitMutation';
import {SinglePointCrossover} from '../Crossover/SinglePointCrossover';
import {RouletteWheelSelection} from '../Selection/RouletteWheelSelection';

export const DEFAULT_CONFIGURATION_POPULATION: PopulationParams = {
  popsize: 50,
};

export const DEFAULT_CONFIGURATION_GENETIC_ALGORITHM = {
  encode: () => {
    throw new Error('You need to give a custom encode function.');
  },
  decode: () => {
    throw new Error('You need to give a custom decode function.');
  },
  fitness: () => {
    throw new Error('You need to give a custom fitness function.');
  },
  randomValue: () => {
    throw new Error('You need to give a custom randomValue function.');
  },
  verbose: 'DEBUG' as 'NONE' | 'INFO' | 'DEBUG',
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

export class Configuration<T, EncodedType = BitChain> {
  /**
   * ==================================
   * Attributes
   * ==================================
   */

  /**
   * Store the complete configuration
   */
  private _config: CompleteConfigureParams<T, EncodedType>;

  /**
   * ==================================
   * Constructor
   * ==================================
   */
  constructor(config: RequiredConfigureParams<T, EncodedType> | CompleteConfigureParams<T, EncodedType>) {
    this._config = this.configure(config);
  }

  /**
   * ==================================
   * Getter
   * ==================================
   */

  get(): CompleteConfigureParams<T, EncodedType> {
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
  public changeConfiguration(configuration: ChangeConfigurationParams<T, EncodedType>): void {
    /**
     * Create new configuration
     */
    const config: CompleteConfigureParams<T, EncodedType> = {
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
  private configure(
    configuration: RequiredConfigureParams<T, EncodedType> | CompleteConfigureParams<T, EncodedType>
  ): CompleteConfigureParams<T, EncodedType> {
    /**
     * Default configuration
     */
    const popConfig: PopulationParams = {
      ...DEFAULT_CONFIGURATION_POPULATION,
      ...(configuration as CompleteConfigureParams<T, EncodedType>).population,
    };
    const config: CompleteConfigureParams<T, EncodedType> = {
      ...(DEFAULT_CONFIGURATION_GENETIC_ALGORITHM as CompleteConfigureParams<T, any>),
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
    return config;
  }

  /**
   * Verify the given configuration is valid
   */
  private testGeneticAlgorithmConfiguration(config: CompleteConfigureParams<T, EncodedType>): void | never {
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
    if (!(config.verbose === 'DEBUG' || config.verbose === 'INFO' || config.verbose === 'NONE')) {
      throw new Error(`Config.verbose should be one of 'INFO', 'DEBUG', 'NONE'`);
    }

    /**
     * Default configuration only work on Bitchain
     * Bitchain currently is a string
     * If not a string, then mu
     */
    if (typeof dec !== 'string') {
      // Mutation test
      try {
        const m = config.mutation.mutation;
        m(enc);
      } catch (e) {
        this.error(`\x1b[31mError during Genetic Algorithm configuration :`);
        this.error(`\x1b[31mGiven configuration is wrong`);
        this.error(
          `\x1b[31mYou used a type other than BitChain(=string),
but you did not provide a custom MutationStrategy to handle it.`,
          r
        );
        throw new Error(
          `\x1b[31mYou used a type other than BitChain(=string),
but you did not provide a custom MutationStrategy to handle it.`
        );
      }

      // Crossover test
      try {
        const m = config.mutation;
        const c = config.crossover.crossover;
        c([enc], m);
      } catch (e) {
        this.error(`\x1b[31mError during Genetic Algorithm configuration :`);
        this.error(`\x1b[31mGiven configuration is wrong`);
        this.error(
          `\x1b[31mYou used a type other than BitChain(=string),
but you did not provide a custom CrossoverStrategy to handle it.`,
          r
        );
        throw new Error(
          `\x1b[31mYou used a type other than BitChain(=string),
but you did not provide a custom CrossoverStrategy to handle it.`
        );
      }
    }
  }

  /**
   * Display error
   */
  private error(message: string, object: any = ''): void {
    if (this._config.verbose === 'DEBUG') {
      console.error(message, object);
    }
  }
}
