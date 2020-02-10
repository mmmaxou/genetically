import {GeneticAlgorithm} from '../lib/GeneticAlgorithm';
import {createEncodeFunctionOfBase} from '../lib/Helpers/Helpers';
import {FitnessFunctionObjective} from '../lib/Helpers/Params';
import {DEFAULT_CONFIGURATION} from '../lib/Helpers/Configuration';

/**
 * Function to maximize :
 * f(x) = x³
 * In x in range [-32, 32]
 */

/**
 * Random starting value
 */
const randomValue = () => Math.ceil(Math.random() * 64) - 32;

/**
 * Transform x
 * start is [-32, 32]
 * end is   [000000, 111111]
 */
const encoder6 = createEncodeFunctionOfBase(2, 6);
const encode = (x: number): string => encoder6(x + 32);

/**
 * Transform x
 * start is [000000, 111111]
 * end is [-32, 32]
 */
const decode = (x: string): number => parseInt(x, 2) - 32;

/**
 * Function to optimize
 * f(x) = x²
 */
const fitness = (i: number): number => i ** 3;

/**
 * Genetic algorithm creation
 */
export const CubeGeneticAlgorithm = () =>
  new GeneticAlgorithm<number>({
    ...DEFAULT_CONFIGURATION.GENETIC_ALGORITHM,
    objective: FitnessFunctionObjective.MINIMIZE,
    encode,
    decode,
    randomValue,
    fitness,
  });

/**
 * Exporting Cube Functions
 */
export const CubeFunctions = {
  GeneticAlgorithm: CubeGeneticAlgorithm,
  encode,
  decode,
  randomValue,
  fitness,
};
