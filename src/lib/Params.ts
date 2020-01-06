import {SelectionStrategy} from './Selection';
import {CrossoverStrategy} from './Crossover';
import {Population} from './Population';
import {MutationStrategy} from './Mutation/GenericMutation';

export type EncodeFunction<T> = (x: T) => string;
export type DecodeFunction<T> = (s: string) => T;
export type RandomValueFunction<T> = () => T;
export type FitnessFunction<T> = (individual: T) => number;
export type StopConditionFunction = (pop: Population, i: number) => boolean;
export type AfterEachFunction = (pop: Population, i: number) => void;

export enum FitnessFunctionObjective {
  MINIMIZE,
  MAXIMIZE,
}

export interface ConfigureParams {
  verbose: 'NONE' | 'INFO' | 'DEBUG';
  objective: FitnessFunctionObjective;
  iterations: number;
  population: PopulationParams;
  selection: SelectionStrategy;
  crossover: CrossoverStrategy;
  mutation: MutationStrategy;
  stopCondition: StopConditionFunction;
  afterEach: AfterEachFunction;
}
export interface RequiredConfigureParams<T> extends ConfigureParams {
  encode: EncodeFunction<T>;
  decode: DecodeFunction<T>;
  randomValue: RandomValueFunction<T>;
  fitness: FitnessFunction<T>;
}

export interface ChangeConfigurationParams<T> {
  // Configure
  verbose?: 'NONE' | 'INFO' | 'DEBUG';
  objective?: FitnessFunctionObjective;
  iterations?: number;
  population?: PopulationParams;
  selection?: SelectionStrategy;
  crossover?: CrossoverStrategy;
  mutation?: MutationStrategy;
  stopCondition?: StopConditionFunction;
  afterEach?: AfterEachFunction;

  // Required
  encode?: EncodeFunction<T>;
  decode?: DecodeFunction<T>;
  randomValue?: RandomValueFunction<T>;
  fitness?: FitnessFunction<T>;
}
export interface PopulationParams {
  popsize: number;
}
