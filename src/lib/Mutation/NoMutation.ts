import {MutationStrategy} from './GenericMutation';

/**
 * No Mutation strategy
 */
export class NoMutation extends MutationStrategy {
  public mutation(chain: string): string {
    return chain;
  }
}
