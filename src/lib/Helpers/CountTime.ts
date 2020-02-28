/**
 * Give you an interval of time in milliseconds
 * Context independant
 * Work in both Node JS and browser
 */
export class CountTime {
  private _isInBrowser: boolean;
  private _startBrowser = 0;
  private _startNode: [number, number] = [0, 0];
  constructor() {
    this._isInBrowser =
      typeof window !== 'undefined' && typeof process === 'undefined';
    this.reset();
  }

  reset() {
    if (this._isInBrowser) {
      this._startBrowser = window.performance.now();
    } else {
      this._startNode = process.hrtime();
    }
  }
  time(): number {
    if (this._isInBrowser) {
      return window.performance.now() - this._startBrowser;
    } else {
      const diff = process.hrtime(this._startNode);
      const nanoseconds = diff[0] * 1e9 + diff[1];
      return nanoseconds / 1e3;
    }
  }
}
