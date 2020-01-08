/// <reference types="node" />

declare module 'compute-histogram' {
  export function calculateHistogram(
    arr: number[],
    numBins?: number,
    trimTailPercentage?: number
  ): number[][];
}
