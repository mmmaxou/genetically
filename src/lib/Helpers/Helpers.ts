import {CountTime} from './CountTime';

/**
 * High order function to create an encoder of a certain base
 */
export const createEncodeFunctionOfBase = (base: number, chainLength: number) => {
  if (chainLength <= 2) {
    throw new Error(`Number chainLength ${chainLength} given must be more than 2`);
  }
  if (base < 2 || base > 16) {
    throw new Error(`Number base ${base} given must be more than 2 and less than 16`);
  }
  const tooMuch = 2 ** chainLength - 1;
  return (x: number): string => {
    if (x > tooMuch) {
      throw new Error(`Can't encode ${x}, it's more than ${tooMuch} and won't fit in ${chainLength} digits`);
    }
    const res = x.toString(base).padStart(chainLength, '0');
    return res;
  };
};
export const timerFunction = (functionToTime: () => any, iterations: number = 10000): number => {
  const timer = new CountTime();
  [...Array(iterations)].map(() => functionToTime());
  return timer.time();
};

// https://medium.com/@nitinpatel_20236/how-to-shuffle-correctly-shuffle-an-array-in-javascript-15ea3f84bfb
export const shuffleArray = <T>(arr: readonly T[]) => {
  const array = arr.slice();
  // tslint:disable-next-line: no-let
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i);
    const temp = array[i];
    // tslint:disable-next-line: no-object-mutation no-expression-statement
    array[i] = array[j];
    // tslint:disable-next-line: no-object-mutation no-expression-statement
    array[j] = temp;
  }
  return array;
};

// https://github.com/baus/compute-histogram
// tslint:disable-next-line: typedef
export function computeHistogram(arr: readonly number[], numBins = 0, trimTailPercentage = 0.0) {
  // tslint:disable-next-line: readonly-array
  const bins: number[][] = [];
  // tslint:disable-next-line: no-let
  let dataCopy = [...arr].sort((a, b) => a - b);

  if (trimTailPercentage !== 0.0) {
    const rightPercentile = dataCopy[Math.floor((1.0 - trimTailPercentage) * dataCopy.length - 1)];
    const leftPercentile = dataCopy[Math.ceil(trimTailPercentage * dataCopy.length - 1)];
    dataCopy = dataCopy.filter((x) => x <= rightPercentile && x >= leftPercentile);
  }

  const min = dataCopy[0];
  const max = dataCopy[dataCopy.length - 1];

  if (numBins === 0) {
    const sturges = Math.ceil(Math.log2(dataCopy.length)) + 1;
    const iqr = computeIQR(dataCopy);
    // If IQR is 0, fd returns 1 bin. This is as per the NumPy implementation:
    //   https://github.com/numpy/numpy/blob/master/numpy/lib/histograms.py#L138
    // tslint:disable-next-line: no-let
    let fdbins = 1;
    if (iqr !== 0.0) {
      const fd = 2.0 * (iqr / Math.pow(dataCopy.length, 1.0 / 3.0));
      fdbins = Math.ceil((max - min) / fd);
    }
    // tslint:disable-next-line: no-parameter-reassignment
    numBins = Math.max(sturges, fdbins);
  }
  // tslint:disable-next-line: no-let
  for (let i = 0; i < numBins; i++) {
    bins.push([i, 0]);
  }

  const binSize = (max - min) / numBins === 0 ? 1 : (max - min) / numBins;
  dataCopy.forEach((item) => {
    // tslint:disable-next-line: no-let
    let binIndex = Math.floor((item - min) / binSize);
    // for values that lie exactly on last bin we need to subtract one
    if (binIndex === numBins) {
      binIndex--;
    }
    // tslint:disable-next-line: no-object-mutation
    bins[binIndex][1]++;
  });

  return bins;
}

// Simple helper function
const ascending = (a: number, b: number): number => a - b;

// https://github.com/compute-io/iqr/blob/master/lib/index.js
// tslint:disable-next-line: typedef
function computeIQR(arr: readonly number[]) {
  const tab = arr.slice();
  tab.sort(ascending);
  return quantile(tab, 0.75) - quantile(tab, 0.25);
}

// https://github.com/compute-io/quantile/blob/master/lib/index.js
// tslint:disable-next-line: typedef
function quantile(arr: readonly number[], p: number) {
  const len = arr.length;
  // tslint:disable-next-line: no-let
  let id;
  if (p === 0.0) {
    return arr[0];
  }
  if (p === 1.0) {
    return arr[len - 1];
  }
  id = len * p - 1;
  if (id === Math.floor(id)) {
    return (arr[id] + arr[id + 1]) / 2.0;
  }
  id = Math.ceil(id);
  return arr[id];
}
