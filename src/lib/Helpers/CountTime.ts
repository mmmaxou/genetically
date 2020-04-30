import hirestime from 'hirestime';

/**
 * Give you an interval of time in milliseconds
 * Context independant
 * Work in both Node JS and browser
 */
export class CountTime {
  private _elapsed: {
    (): number;
    s: () => number;
    ms: () => number;
    ns: () => number;
    milliseconds(): number;
    seconds(): number;
    nanoseconds(): number;
  };
  constructor() {
    this._elapsed = this.reset();
  }
  reset() {
    return hirestime();
  }
  time(): number {
    return this._elapsed.milliseconds();
  }
}
