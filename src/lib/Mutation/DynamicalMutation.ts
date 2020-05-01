import {MutationStrategy} from './GenericMutation';

export class DynamicalMutation<EncodedType> extends MutationStrategy<EncodedType> {
  constructor(private _mutation: (chain: EncodedType) => EncodedType, probability?: number) {
    super(probability);
  }
  public mutation(chain: EncodedType): EncodedType {
    return Math.random() < this.probability ? this._mutation(chain) : chain;
  }
}
