import {Functions} from './example/export';
import {Chromosome} from './lib/Genetic/Chromosome';
import {Crossover} from './lib/Crossover/export';
import {GeneticAlgorithm} from './lib/Genetic/GeneticAlgorithm';
import {Helper} from './lib/Helpers/export';
import {Mutation} from './lib/Mutation/export';
import {Population} from './lib/Genetic/Population';
import {Selection} from './lib/Selection/export';

/**
 * Crossover
 */
/**
 * Functions
 */
export * from './example/BealeFunction';
export * from './example/BoothFunction';
export * from './example/CubeFunction';
export * from './example/LinearFunction';
/**
 * Main
 */
export * from './lib/Genetic/Chromosome';
export * from './lib/Genetic/GeneticAlgorithm';
export * from './lib/Genetic/Population';
/**
 * Crossover
 */
export * from './lib/Crossover/GenericCrossover';
export * from './lib/Crossover/NoCrossover';
export * from './lib/Crossover/SinglePointCrossover';
/**
 * Helpers
 */
export * from './lib/Helpers/BitChain';
export * from './lib/Helpers/Configuration';
export * from './lib/Helpers/Helpers';
export * from './lib/Helpers/Params';
/**
 * Mutations
 */
export * from './lib/Mutation/FlipBitMutation';
export * from './lib/Mutation/GenericMutation';
export * from './lib/Mutation/NaiveFlipBitMutation';
export * from './lib/Mutation/NoMutation';
export * from './lib/Mutation/SerieBitFlipMutation';
/**
 * Selection
 */
export * from './lib/Selection/RouletteWheelSelection';
export * from './lib/Selection/SelectionGeneric';

export const Genetically = {
  Chromosome,
  Crossover,
  ExampleFunctions: Functions,
  GeneticAlgorithm,
  Helper,
  Mutation,
  Population,
  Selection,
};

export default Genetically;
