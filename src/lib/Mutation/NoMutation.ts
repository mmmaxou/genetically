import {MutationStrategy} from './GenericMutation';

/**
 * No Mutation strategy
 */
export class NoMutation extends MutationStrategy<any> {
  constructor() {
    super(0.1);
  }
  public mutation(chain: any): any {
    return chain;
  }
}
