import {MutationStrategy} from './GenericMutation';
import {BitChain} from '../Helpers/BitChain';

/**
 * No Mutation strategy
 */
export class NoMutation extends MutationStrategy {
  public mutation(chain: BitChain): BitChain {
    return chain;
  }
}
