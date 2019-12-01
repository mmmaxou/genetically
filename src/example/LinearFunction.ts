import {GeneticAlgorithm} from './../lib/GeneticAlgorithm';
import {createEncodeFunctionOfBase} from './../lib/Helpers';

/**
 * Function to maximize :
 * f(x) = -x²
 * In x in range [-32, 32]
 */

/**
 * Random starting value
 */
export const randomValue = () => Math.floor(Math.random() * 64) - 32;

/**
 * Transform x
 * start is [-32, 32]
 * end is   [000000, 111111]
 */
const encoder6 = createEncodeFunctionOfBase(2, 6);
export const encode = (x: number): string => encoder6(x + 32);

/**
 * Transform x
 * start is [000000, 111111]
 * end is [-32, 32]
 */
export const decode = (x: string): number => parseInt(x, 2) - 32;

/**
 * Function to optimize
 * f(x) = x²
 */
export const fitness = (i: number): number => -1 * i ** 2;

/**
 * Genetic algorithm creation
 */
export const LinearGeneticAlgorithm = () =>
  new GeneticAlgorithm<number>({
    ...GeneticAlgorithm.DEFAULT_CONFIGURATION,
    encode,
    decode,
    randomValue,
    fitness,
  });
