export type EncodeFunction<T> = (x: T) => string;
export type DecodeFunction<T> = (s: string) => T;
export type RandomValueFunction<T> = () => T;
export type FitnessFunction<T> = (individual: T) => number;

export interface ConfigureParams {
  verbose?: 'NONE' | 'INFO' | 'DEBUG';
  population: PopulationParams;
}
export interface RequiredConfigureParams<T> extends ConfigureParams {
  encode: EncodeFunction<T>;
  decode: DecodeFunction<T>;
  randomValue: RandomValueFunction<T>;
  fitness: FitnessFunction<T>;
}
export interface PopulationParams {
  popsize: number;
}
