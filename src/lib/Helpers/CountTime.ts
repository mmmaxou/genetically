import {performance} from 'perf_hooks';

/**
 * Give you an interval of time in milliseconds
 * Context independant
 * Work in both Node JS and browser
 */
export class CountTime {
  private _start = 0;
  constructor() {
    this.reset();
  }
  reset(): void {
    this._start = performance.now();
  }
  time(): number {
    return performance.now() - this._start;
  }
}
