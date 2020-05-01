import {SinglePointCrossover} from '../Crossover/SinglePointCrossover';
import {FlipBitMutation} from '../Mutation/FlipBitMutation';
import {RouletteWheelSelection} from '../Selection/RouletteWheelSelection';
import {BitChain, BitChainGuard} from './BitChain';
import {FitnessFunctionObjective, GeneticAlgorithmConfiguration, PopulationConfiguration} from './Params';
import {SelectionStrategy} from '../Selection/SelectionGeneric';
import {DynamicalSelection} from '../Selection/DynamicalSelection';
import {MutationStrategy} from '../Mutation/GenericMutation';
import {CrossoverStrategy} from '../Crossover/GenericCrossover';
import {DynamicalMutation} from '../Mutation/DynamicalMutation';
import {DynamicalCrossover} from '../Crossover/DynamicalCrossover';

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
  waitBetweenIterations: undefined,
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
  private _config: GeneticAlgorithmConfiguration<EncodedType>;
  private _selection: SelectionStrategy<EncodedType>;
  private _mutation: MutationStrategy<EncodedType>;
  private _crossover: CrossoverStrategy<EncodedType>;

  /**
   * ==================================
   * Constructor
   * ==================================
   */
  constructor(
    private readonly encode: (x: T) => EncodedType,
    private readonly decode: (s: EncodedType) => T,
    private readonly randomValue: () => T,
    private readonly fitness: (individual: T) => number,
    config?: Partial<GeneticAlgorithmConfiguration<EncodedType>>
  ) {
    this._config = this.initialize(config);
    this._selection =
      typeof this._config.selection === 'function'
        ? new DynamicalSelection<EncodedType>(this._config.selection)
        : this._config.selection;
    this._mutation =
      typeof this._config.mutation === 'function'
        ? new DynamicalMutation<EncodedType>(this._config.mutation)
        : this._config.mutation;
    this._crossover =
      typeof this._config.crossover === 'function'
        ? new DynamicalCrossover<EncodedType>(this._config.crossover)
        : this._config.crossover;
    this.testGeneticAlgorithmConfiguration(this._config);
  }

  /**
   * ==================================
   * Getter
   * ==================================
   */

  get verbose() {
    return this._config.verbose;
  }
  get objective() {
    return this._config.objective;
  }
  get iterations() {
    return this._config.iterations;
  }
  get population() {
    return this._config.population;
  }
  get selection() {
    return this._selection;
  }
  get mutation() {
    return this._mutation;
  }
  get crossover() {
    return this._crossover;
  }
  get stopCondition() {
    return this._config.stopCondition;
  }
  get waitBetweenIterations() {
    return this._config.waitBetweenIterations;
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
     * Update configuration
     */
    this._config = config;

    /**
     * Test configuration
     */
    this.testGeneticAlgorithmConfiguration(config);
  }

  /**
   * ==================================
   * Private
   * ==================================
   */
  /**
   * Change configuration
   */
  private initialize(
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
     * Update configuration
     */
    return config;
  }

  /**
   * Verify the given configuration is valid
   */
  private testGeneticAlgorithmConfiguration(config: GeneticAlgorithmConfiguration<EncodedType>): void | never {
    // @TODO:
    // Verify encode
    // Verify decode
    // Verify randomValue
    // Verify fitness

    /**
     * Test
     */
    const r = this.randomValue();
    const enc = this.encode(r);
    const dec = this.decode(enc);
    const f = this.fitness;

    /**
     * Deep equal between encode and decode
     */
    if (JSON.stringify(r) !== JSON.stringify(dec)) {
      throw new Error(
        `Error during Genetic Algorithm configuration
        Given configuration is wrong
        Random value is ${r}
        Encoded value is ${enc}
        Decoded value is ${dec}
        Error trying to encode then decode a random value.
code: 'decode(encode(randomValue))' is different than randomValue`
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
    if (!BitChainGuard(dec)) {
      // Mutation test
      try {
        this.mutation.mutation(enc);
      } catch (e) {
        console.error('Error is ', e);
        throw new Error(`Error during Genetic Algorithm configuration
          Given configuration is wrong
          You used a type other than BitChain(=string),
          but you did not provide a custom MutationStrategy to handle it.`);
      }

      // Crossover test
      try {
        this.crossover.crossover([enc], this.mutation);
      } catch (e) {
        console.error('Error is ', e);
        throw new Error(
          `Error during Genetic Algorithm configuration :
          Given configuration is wrong
          You used a type other than BitChain(=string),
but you did not provide a custom CrossoverStrategy to handle it.`
        );
      }
    }

    /**
     * Fitness function returns a number
     */
    if (typeof f(r) !== 'number') {
      throw new Error(`The fitness function must return a number`);
    }
  }
}
