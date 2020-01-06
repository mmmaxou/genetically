import {DEFAULT_CONFIGURATION} from '../lib/Configuration';
import {FitnessFunctionObjective} from '../lib/Params';
import {GeneticAlgorithm} from '../lib/GeneticAlgorithm';
import {createEncodeFunctionOfBase} from '../lib/Helpers';

/**
 * Motivation for function optimization
 * https://en.wikipedia.org/wiki/Test_functions_for_optimization
 *
 * Booth function
 *
 * f(x, y) = (x + 2y - 7) ** 2 + (2x + y - 5) ** 2
 *
 * Encoded Range is [-HALF_RANGE <= x,y <= HALF_RANGE] ( base 10 )
 * Encoded Range is [00000000 <= x,y <= 11111111] ( base 2 )
 *
 * Solution Range is [-10 <= x,y <= 10]
 *
 * Minimum is f(x=1, y=3) = 0
 *
 */

const N_BITS = 8;
const HALF_RANGE = 2 ** (N_BITS - 1);
const RANGE = HALF_RANGE * 2;
const FINAL_RANGE = 10;
const M_HALFRANGE_TO_FINALRANGE = 1 / (HALF_RANGE / FINAL_RANGE);

/**
 * Struct
 */
export class BoothSolutionStruct {
  constructor(public x: number, public y: number) {}
  toString(): string {
    const x = (this.x * M_HALFRANGE_TO_FINALRANGE).toPrecision(5);
    const y = (this.y * M_HALFRANGE_TO_FINALRANGE).toPrecision(5);
    return `[x=${x}, y=${y}]`;
  }
}

/**
 * Transform x and y
 * start is   [-HALF_RANGE <= x,y <= HALF_RANGE]
 * end is   [00000000 <= x,y <= 11111111]
 */
const encoder8 = createEncodeFunctionOfBase(2, N_BITS);
export const encode = (struct: BoothSolutionStruct): string => {
  // console.log('encode struct', struct);

  const encX = encoder8(struct.x + HALF_RANGE);
  const encY = encoder8(struct.y + HALF_RANGE);
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
 * end is   [-HALF_RANGE <= x,y <= HALF_RANGE]
 */
export const decode = (s: string): BoothSolutionStruct => {
  // console.log('decode s', s);
  // console.log('s length is', s.length);

  const intX = parseInt(s.substr(0, N_BITS), 2);
  const intY = parseInt(s.substr(N_BITS), 2);
  // console.log('int x is', intX);
  // console.log('int y is', intY);

  const decX = intX - HALF_RANGE;
  const decY = intY - HALF_RANGE;

  const struct = new BoothSolutionStruct(decX, decY);
  // console.log('struct is', struct);

  return struct;
};

/**
 * Random starting value
 * Solution Range is [-4.5 <= x,y <= 4.5]
 */
export const randomValue = (): BoothSolutionStruct => {
  const x = Math.floor(Math.random() * RANGE - HALF_RANGE);
  const y = Math.floor(Math.random() * RANGE - HALF_RANGE);
  const struct = new BoothSolutionStruct(x, y);
  return decode(encode(struct));
};

/**
 * Booth function
 *
 * f(x, y) = (x + 2y - 7) ** 2 + (2x + y - 5) ** 2
 *
 * Map structure from [-HALF_RANGE, HALF_RANGE] to [-FINAL_RANGE, FINAL_RANGE]
 */
export const fitness = (struct: BoothSolutionStruct): number => {
  const x = struct.x * M_HALFRANGE_TO_FINALRANGE;
  const y = struct.y * M_HALFRANGE_TO_FINALRANGE;
  const p1 = x + 2 * y - 7;
  const p2 = 2 * x + y - 5;
  const f = p1 * p1 + p2 * p2;
  return -f;
};

/**
 * Genetic algorithm creation
 */
export const BoothGeneticAlgorithm = () =>
  new GeneticAlgorithm<BoothSolutionStruct>({
    ...DEFAULT_CONFIGURATION.GENETIC_ALGORITHM,
    objective: FitnessFunctionObjective.MINIMIZE,
    encode,
    decode,
    randomValue,
    fitness,
  });
