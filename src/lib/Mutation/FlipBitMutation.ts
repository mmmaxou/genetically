import {
  MutationStrategy,
  DEFAULT_MUTATION_CONFIGURATION,
} from './GenericMutation';
import {NaiveFlipBitMutation} from './NaiveFlipBitMutation';
import {SerieFlipBitMutation} from './SerieBitFlipMutation';
import {BitChain} from '../Helpers/BitChain';

/**
 * Automatically use the best algorithm based on the probability
 * The threshold 0.65 was found empirically in the mutation.test.ts file
 */
export class FlipBitMutation extends MutationStrategy {
  private strategy: MutationStrategy;

  constructor(
    probability: number = DEFAULT_MUTATION_CONFIGURATION.probability
  ) {
    super(probability);
    if (probability > 0.65) {
      this.strategy = new NaiveFlipBitMutation(probability);
    } else {
      this.strategy = new SerieFlipBitMutation(probability);
    }
  }

  public mutation(chain: BitChain): BitChain {
    return this.strategy.mutation(chain);
  }
}
