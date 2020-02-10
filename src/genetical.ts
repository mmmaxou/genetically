import {Helper} from './lib/Helpers/export';
import {GeneticAlgorithm} from './lib/GeneticAlgorithm';
import {Population} from './lib/Population';
import {Chromosome} from './lib/Chromosome';
import {Mutation} from './lib/Mutation/export';
import {Selection} from './lib/Selection/export';
import {Crossover} from './lib/Crossover/export';
import Functions from './example/export';

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

export * from './../src/lib/Chromosome';
export * from './../src/lib/Population';
export * from './../src/lib/GeneticAlgorithm';

export const Genetical = {
  ExampleFunctions: Functions,
  Crossover,
  Selection,
  Mutation,
  Chromosome,
  Population,
  GeneticAlgorithm,
  Helper,
};

export default Genetical;
