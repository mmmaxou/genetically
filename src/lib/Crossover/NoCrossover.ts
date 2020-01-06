import {CrossoverStrategy} from './GenericCrossover';
import {NoMutation} from '../Mutation/NoMutation';

/**
 * No Crossover
 * But apply mutation
 */
export class NoCrossover extends CrossoverStrategy {
  public crossover(chains: string[], mutation = new NoMutation()): string[] {
    return chains.map((s) => mutation.mutation(s));
  }
}
