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
  return (x: number): string => x.toString(base).padStart(chainLength, '0');
};
