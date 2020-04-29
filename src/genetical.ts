import {Functions} from './../src/example/export';
import {Chromosome} from './lib/Genetic/Chromosome';
import {Crossover} from './../src/lib/Crossover/export';
import {GeneticAlgorithm} from './lib/Genetic/GeneticAlgorithm';
import {Helper} from './../src/lib/Helpers/export';
import {Mutation} from './../src/lib/Mutation/export';
import {Population} from './lib/Genetic/Population';
import {Selection} from './../src/lib/Selection/export';

/**
 * Crossover
 */
/**
 * Functions
 */
export * from './../src/example/BealeFunction';
export * from './../src/example/BoothFunction';
export * from './../src/example/CubeFunction';
export * from './../src/example/LinearFunction';
/**
 * Main
 */
export * from './../src/lib/Genetic/Chromosome';
export * from './../src/lib/Genetic/GeneticAlgorithm';
export * from './../src/lib/Genetic/Population';
/**
 * Crossover
 */
export * from './../src/lib/Crossover/GenericCrossover';
export * from './../src/lib/Crossover/NoCrossover';
export * from './../src/lib/Crossover/SinglePointCrossover';
/**
 * Helpers
 */
export * from './../src/lib/Helpers/BitChain';
export * from './../src/lib/Helpers/Configuration';
export * from './../src/lib/Helpers/Helpers';
export * from './../src/lib/Helpers/Params';
/**
 * Mutations
 */
export * from './../src/lib/Mutation/FlipBitMutation';
export * from './../src/lib/Mutation/GenericMutation';
export * from './../src/lib/Mutation/NaiveFlipBitMutation';
export * from './../src/lib/Mutation/NoMutation';
export * from './../src/lib/Mutation/SerieBitFlipMutation';
/**
 * Selection
 */
export * from './../src/lib/Selection/RouletteWheelSelection';
export * from './../src/lib/Selection/SelectionGeneric';

export const Genetical = {
  Chromosome,
  Crossover,
  ExampleFunctions: Functions,
  GeneticAlgorithm,
  Helper,
  Mutation,
  Population,
  Selection,
};

export default Genetical;
