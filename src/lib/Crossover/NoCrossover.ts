import {CrossoverStrategy} from './GenericCrossover';
import {NoMutation} from '../Mutation/NoMutation';

/**
 * No Crossover
 * But apply mutation
 */
export class NoCrossover extends CrossoverStrategy<any> {
  public crossover(chains: any[], mutation = new NoMutation()): any[] {
    return chains.map((s) => mutation.mutation(s));
  }
}
