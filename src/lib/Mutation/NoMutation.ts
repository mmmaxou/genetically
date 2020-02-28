import {MutationStrategy} from './GenericMutation';

/**
 * No Mutation strategy
 */
export class NoMutation extends MutationStrategy<any> {
  public mutation(chain: any): any {
    return chain;
  }
}
