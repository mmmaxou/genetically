import { GeneticAlgorithm } from './../lib/GeneticAlgorithm';
import { createEncodeFunctionOfBase } from './../lib/Helpers';

/**
 * Function to optimize :
 * f(x) = x²
 * In x in range [0, 64]
 */

/**
 * Random starting value
 */
export const randomValue = () => ~~(Math.random() * 64);

/**
 * Transform x
 * start is [0, 64]
 * end is   [000000, 111111]
 */
export const encode = createEncodeFunctionOfBase(2, 6);

/**
 * Transform x
 * start is [000000, 111111]
 * end is   [0, 64]
 */
export const decode = (x: string): number => parseInt(x, 2);

/**
 * Function to optimize
 * f(x) = x²
 */
export const fitness = (i: number): number => i ** 2;

/**
 * Genetic algorithm creation
 */
export const LinearGeneticAlgorithm = () =>
  new GeneticAlgorithm<number>({
    ...GeneticAlgorithm.DEFAULT_CONFIGURATION,
    encode,
    decode,
    randomValue,
    fitness
  });
