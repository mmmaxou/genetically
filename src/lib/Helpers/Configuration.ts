import {SinglePointCrossover} from '../Crossover/SinglePointCrossover';
import {FlipBitMutation} from '../Mutation/FlipBitMutation';
import {RouletteWheelSelection} from '../Selection/RouletteWheelSelection';
import {BitChain} from './BitChain';
import {
  DecodeFunction,
  EncodeFunction,
  FitnessFunctionObjective,
  GeneticAlgorithmConfiguration,
  PopulationConfiguration,
  RandomValueFunction,
  FitnessFunction,
} from './Params';

export const DEFAULT_CONFIGURATION_POPULATION: PopulationConfiguration = {
  popsize: 50,
};

export const DEFAULT_CONFIGURATION_GENETIC_ALGORITHM: GeneticAlgorithmConfiguration<BitChain> = {
  verbose: 'DEBUG',
  objective: FitnessFunctionObjective.MAXIMIZE,
  population: DEFAULT_CONFIGURATION_POPULATION,
  selection: new RouletteWheelSelection<BitChain>(),
  crossover: new SinglePointCrossover(),
  mutation: new FlipBitMutation(),
  iterations: 50,
  stopCondition: () => false,
  afterEach: () => {},
};

export class Configuration<EncodedType = BitChain> {
  /**
   * ==================================
   * Attributes
   * ==================================
   */

  /**
   * Store the complete configuration
   */
  private _config: GeneticAlgorithmConfiguration<EncodedType>;

  /**
   * ==================================
   * Constructor
   * ==================================
   */
  constructor(
    private readonly encode: EncodeFunction<any, EncodedType>,
    private readonly decode: DecodeFunction<any, EncodedType>,
    private readonly randomValue: RandomValueFunction<any>,
    private readonly fitness: FitnessFunction<any>,
    config?: Partial<GeneticAlgorithmConfiguration<EncodedType>>
  ) {
    // @TODO:
    // Verify encode
    // Verify decode
    // Verify randomValue
    // Verify fitness
    this._config = this.configure(config);
  }

  /**
   * ==================================
   * Getter
   * ==================================
   */

  get(): GeneticAlgorithmConfiguration<EncodedType> {
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
  public changeConfiguration(configuration: Partial<GeneticAlgorithmConfiguration<EncodedType>>): void {
    /**
     * Create new configuration
     */
    const config: GeneticAlgorithmConfiguration<EncodedType> = {
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
    configuration?: Partial<GeneticAlgorithmConfiguration<EncodedType>>
  ): GeneticAlgorithmConfiguration<EncodedType> {
    /**
     * Verify the type give is bitchain
     */

    /**
     * Default configuration
     */
    const config: GeneticAlgorithmConfiguration<EncodedType> = {
      ...(DEFAULT_CONFIGURATION_GENETIC_ALGORITHM as GeneticAlgorithmConfiguration<any>),
      ...configuration,
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
  private testGeneticAlgorithmConfiguration(config: GeneticAlgorithmConfiguration<EncodedType>): void | never {
    /**
     * Test
     */
    const r = this.randomValue();
    const enc = this.encode(r);
    const dec = this.decode(enc);
    const f = this.fitness;
    console.log(f);

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
