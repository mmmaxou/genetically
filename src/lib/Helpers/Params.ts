import {Population} from '../Population';
import {MutationStrategy} from '../Mutation/GenericMutation';
import {CrossoverStrategy} from '../Crossover/GenericCrossover';
import {SelectionStrategy} from '../Selection/SelectionGeneric';
import {BitChain} from './BitChain';

export type EncodeFunction<T, EncodedType = BitChain> = (x: T) => EncodedType;
export type DecodeFunction<T, EncodedType = BitChain> = (s: EncodedType) => T;
export type RandomValueFunction<T> = () => T;
export type FitnessFunction<T> = (individual: T) => number;
export type StopConditionFunction<EncodedType = BitChain> = (
  pop: Population<EncodedType>,
  i: number
) => boolean;
export type AfterEachFunction<EncodedType = BitChain> = (
  pop: Population<EncodedType>,
  i: number
) => void;

export enum FitnessFunctionObjective {
  MINIMIZE,
  MAXIMIZE,
}

export interface ConfigureParams<EncodedType = BitChain> {
  /**
   * Verbose parameter control the level of verbose the application is using. Change the informations provided in the console
   * Default is DEBUG
   */
  verbose: 'NONE' | 'INFO' | 'DEBUG';

  /**
   * Wheither you want to maximize or minimize a function
   * Default is maximize
   */
  objective: FitnessFunctionObjective;

  /**
   * Amount of iteration the genetic algorithm should do for completion
   * Default is 50
   */
  iterations: number;

  /**
   * Population configuration object. Refer to PopulationParams for more details
   */
  population: PopulationParams;

  /**
   * The selection function used to create new population. Use your own selection function or use one provided in Selection namespace
   * Default is RouletteWheelSelection
   */
  selection: SelectionStrategy;

  /**
   * The crossover function used to mix two encoded chromosomes into two descendant.
   * Use your own crossover function or use one provided in Crossover namespace
   * Default is SinglePointCrossover
   */
  crossover: CrossoverStrategy;

  /**
   * The mutation function used to alter a chromosome after the crossover
   * Use your own mutation function or use one provided in Mutation namespace
   */
  mutation: MutationStrategy;

  /**
   * A function returning a boolean. If the function returns true, the evolution will stop
   * Default is undefined
   */
  stopCondition: StopConditionFunction;

  /**
   * A visitor function running after each iteration of the population
   * Default is undefined
   */
  afterEach: AfterEachFunction;
}

export interface RequiredConfigureParams<T, EncodedType = BitChain>
  extends ConfigureParams<EncodedType> {
  /**
   * The encoding function takes a variable of your type T and must return a BitChain encoded version of this variable.
   * It is the opposite of the decode function
   * Must be provided
   */
  encode: EncodeFunction<T, EncodedType>;

  /**
   * The decoding function takes an encoded BitChain and must return a variable of your type T.
   * Must be provided
   * It is the opposite of the decode function
   */
  decode: DecodeFunction<T, EncodedType>;

  /**
   * A function returning a random value for initiating the neural network
   * Must be provided
   */
  randomValue: RandomValueFunction<T>;

  /**
   * The core function. Evaluate how fit a chromosome is.
   * You can use the objective parameter to choose if you want to maximize or minimize this function
   * Must be provided
   */
  fitness: FitnessFunction<T>;
}

export interface ChangeConfigurationParams<T, EncodedType = BitChain> {
  // Configure
  /**
   * Verbose parameter control the level of verbose the application is using. Change the informations provided in the console
   */
  verbose?: 'NONE' | 'INFO' | 'DEBUG';

  /**
   * Wheither you want to maximize or minimize a function
   */
  objective?: FitnessFunctionObjective;

  /**
   * Amount of iteration the genetic algorithm should do for completion
   */
  iterations?: number;

  /**
   * Population configuration object. Refer to PopulationParams for more details
   */
  population?: PopulationParams;

  /**
   * The selection function used to create new population. Use your own selection function or use one provided in Selection namespace
   */
  selection?: SelectionStrategy;

  /**
   * The crossover function used to mix two encoded chromosomes into two descendant.
   * Use your own crossover function or use one provided in Crossover namespace
   */
  crossover?: CrossoverStrategy;

  /**
   * The mutation function used to alter a chromosome after the crossover
   * Use your own mutation function or use one provided in Mutation namespace
   */
  mutation?: MutationStrategy;

  /**
   * A function returning a boolean. If the function returns true, the evolution will stop
   */
  stopCondition?: StopConditionFunction;

  /**
   * A visitor function running after each iteration of the population
   */
  afterEach?: AfterEachFunction;

  // Required
  /**
   * The encoding function takes a variable of your type T and must return a BitChain encoded version of this variable.
   * It is the opposite of the decode function
   */
  encode?: EncodeFunction<T, EncodedType>;

  /**
   * The decoding function takes an encoded BitChain and must return a variable of your type T.
   * It is the opposite of the decode function
   */
  decode?: DecodeFunction<T, EncodedType>;

  /**
   * A function returning a random value for initiating the neural network
   */
  randomValue?: RandomValueFunction<T>;

  /**
   * The core function. Evaluate how fit a chromosome is.
   * You can use the objective parameter to choose if you want to maximize or minimize this function
   */
  fitness?: FitnessFunction<T>;
}
export interface PopulationParams {
  /**
   * The size of the population.
   * Default is 50
   */
  popsize: number;
}
