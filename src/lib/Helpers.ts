const now = require('performance-now');

/**
 * High order function to create an encoder of a certain base
 */
export const createEncodeFunctionOfBase = (
  base: number,
  chainLength: number
) => {
  if (chainLength <= 2) {
    throw new Error(
      `Number chainLength ${chainLength} given must be more than 2`
    );
  }
  if (base < 2 || base > 16) {
    throw new Error(
      `Number base ${base} given must be more than 2 and less than 16`
    );
  }
  const tooMuch = 2 ** chainLength - 1;
  return (x: number): string => {
    if (x > tooMuch) {
      throw new Error(
        `Can't encode ${x}, it's more than ${tooMuch} and won't fit in ${chainLength} digits`
      );
    }
    const res = x.toString(base).padStart(chainLength, '0');
    return res;
  };
};

export const timerFunction = (
  functionToTime: () => any,
  iterations: number = 10000
): number => {
  const start = now();
  for (let i = 0; i < iterations; i++) {
    functionToTime();
  }
  return now() - start;
};
