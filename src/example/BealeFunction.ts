import {GeneticAlgorithm} from '../lib/GeneticAlgorithm';
import {createEncodeFunctionOfBase} from '../lib/Helpers';
import {FitnessFunctionObjective} from '../lib/Params';

/**
 * Motivation for function optimization
 * https://en.wikipedia.org/wiki/Test_functions_for_optimization
 *
 * Beale function
 *
 * f(x, y) = (1.5 - x - x*y) ** 2
 *           + (2.25 - x + (x*y) ** 2) ** 2
 *           + (2.625 - x + (x*y) ** 3) ** 2
 *
 * Encoded Range is [-128 <= x,y <= 127] ( base 10 )
 * Encoded Range is [00000000 <= x,y <= 11111111] ( base 2 )
 *
 * Solution Range is [-4.5 <= x,y <= 4.5]
 *
 * Minimum is f(x=3, y=0.5) = 0
 *
 */

/**
 * Struct
 */
export class BaeleSolutionStruct {
  constructor(public x: number, public y: number) {}
  toString(): string {
    const x = (this.x * 0.03529411764705924).toPrecision(2);
    const y = (this.y * 0.03529411764705924).toPrecision(2);
    return `[x=${x}, y=${y}]`;
  }
}

/**
 * Transform x and y
 * start is   [-128 <= x,y <= 127]
 * end is   [00000000 <= x,y <= 11111111]
 */
const encoder8 = createEncodeFunctionOfBase(2, 8);
export const encode = (struct: BaeleSolutionStruct): string => {
  // console.log('encode struct', struct);

  const encX = encoder8(struct.x + 128);
  const encY = encoder8(struct.y + 128);
  // console.log('enc x is', encX);
  // console.log('enc y is', encY);

  const s = encX + encY;
  // console.log('encoded s is', s);
  // console.log('s length is', s.length);

  return s;
};

/**
 * Transform x
 * start is [00000000 <= x,y <= 11111111]
 * end is   [-128 <= x,y <= 128]
 */
export const decode = (s: string): BaeleSolutionStruct => {
  // console.log('decode s', s);
  // console.log('s length is', s.length);

  const intX = parseInt(s.substr(0, 8), 2);
  const intY = parseInt(s.substr(8), 2);
  // console.log('int x is', intX);
  // console.log('int y is', intY);

  const decX = intX - 128;
  const decY = intY - 128;

  const struct = new BaeleSolutionStruct(decX, decY);
  // console.log('struct is', struct);

  return struct;
};

/**
 * Random starting value
 * Solution Range is [-4.5 <= x,y <= 4.5]
 */
export const randomValue = (): BaeleSolutionStruct => {
  const x = Math.floor(Math.random() * 256 - 128);
  const y = Math.floor(Math.random() * 256 - 128);
  const struct = new BaeleSolutionStruct(x, y);
  return decode(encode(struct));
};

/**
 * Beale function
 *
 * f(x, y) = (1.5 - x - x*y) ** 2
 *           + (2.25 - x + (x*y) ** 2) ** 2
 *           + (2.625 - x + (x*y) ** 3) ** 2
 *
 * Map structure from [-128,127] to [-4.5, 4.5]
 * 0.03529411764705924 = 1 / (128 / 4.5)
 */
export const fitness = (struct: BaeleSolutionStruct): number => {
  const x = struct.x * 0.03529411764705924;
  const y = struct.y * 0.03529411764705924;
  const xy = x * y;
  const xy2 = xy * xy;
  const xy3 = xy2 * xy;
  const p1 = 1.5 - x - xy;
  const p2 = 2.25 - x + xy2;
  const p3 = 2.625 - x - xy3;
  const f = p1 * p1 + p2 * p2 + p3 * p3;
  return -f;
};

/**
 * Genetic algorithm creation
 */
export const BealeGeneticAlgorithm = () =>
  new GeneticAlgorithm<BaeleSolutionStruct>({
    ...GeneticAlgorithm.DEFAULT_CONFIGURATION,
    objective: FitnessFunctionObjective.MINIMIZE,
    encode,
    decode,
    randomValue,
    fitness,
  });
