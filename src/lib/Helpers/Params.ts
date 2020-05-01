import {CrossoverStrategy} from '../Crossover/GenericCrossover';
import {MutationStrategy} from '../Mutation/GenericMutation';
import {Population} from '../Genetic/Population';
import {SelectionStrategy} from '../Selection/SelectionGeneric';
import {BitChain} from './BitChain';

export enum FitnessFunctionObjective {
  MINIMIZE,
  MAXIMIZE,
}

/**
 * Parameters used to change the configuration of the GeneticAlgorithm Object after it's initialization
 */
export interface GeneticAlgorithmConfiguration<EncodedType = BitChain> {
  // Configure
  /**
   * Verbose parameter control the level of verbose the application is using. Change the informations provided in the console
   */
  verbose: 'NONE' | 'INFO' | 'DEBUG';

  /**
   * Wheither you want to maximize or minimize a function
   */
  objective: FitnessFunctionObjective;

  /**
   * Amount of iteration the genetic algorithm should do for completion
   */
  iterations: number;

  /**
   * Population configuration object. Refer to PopulationParams for more details
   */
  population: PopulationConfiguration;

  /**
   * The selection function used to create new population. Use your own selection function or use one provided in Selection namespace
   */
  selection: ((population: Population<EncodedType>) => EncodedType[]) | SelectionStrategy<EncodedType>;
  /**
   * The crossover function used to mix two encoded chromosomes into two descendant.
   * Use your own crossover function or use one provided in Crossover namespace
   */
  crossover: ((chains: EncodedType[], mutation: MutationStrategy) => EncodedType[]) | CrossoverStrategy<EncodedType>;

  /**
   * The mutation function used to alter a chromosome after the crossover
   * Use your own mutation function or use one provided in Mutation namespace
   */
  mutation: ((chain: EncodedType) => EncodedType) | MutationStrategy<EncodedType>;

  /**
   * A function returning a boolean. If the function returns true, the evolution will stop
   */
  stopCondition: (pop: Population<EncodedType>, i: number) => boolean;

  /**
   * A function that must returns a Promise.
   * The next iteration will not start until the Promise is fullfilled.
   */
  waitBetweenIterations?: () => Promise<void>;
}

/**
 * Parameters used to change the configuration of the Genetic Algorithm Population Object after it's initialization
 */
export interface PopulationConfiguration {
  /**
   * The size of the population.
   * Default is 50
   */
  popsize: number;
}
