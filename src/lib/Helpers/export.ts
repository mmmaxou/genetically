import {CountTime} from './CountTime';
import {createEncodeFunctionOfBase} from './Helpers';
import {
  Configuration,
  DEFAULT_CONFIGURATION_POPULATION,
  DEFAULT_CONFIGURATION_GENETIC_ALGORITHM,
} from './Configuration';
import {Emitter} from './NanoEvents';

export const Helper = {
  Emitter,
  Configuration,
  CountTime,
  DEFAULT_CONFIGURATION_GENETIC_ALGORITHM,
  DEFAULT_CONFIGURATION_POPULATION,
  createEncodeFunctionOfBase,
};
export default Helper;
