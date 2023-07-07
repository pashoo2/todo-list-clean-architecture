import { type ComparableValue } from './types';
import { ComparableString } from './comparable-string';
import { type DTOTodoItemAggregate } from '@react-node-monorepo/application';

export type ComparableDTOTodoItemAggregateByDescriptionAlphabetOrderComparableValue = Pick<
  DTOTodoItemAggregate,
  'description'
>;

export class ComparableDTOTodoItemAggregateByDescriptionAlphabetOrder
  implements
    ComparableValue<ComparableDTOTodoItemAggregateByDescriptionAlphabetOrderComparableValue>
{
  protected _todoItemDescriptionComparable: ComparableValue<string>;
  constructor(
    public readonly value: ComparableDTOTodoItemAggregateByDescriptionAlphabetOrderComparableValue,
  ) {
    this._todoItemDescriptionComparable = new ComparableString(value.description);
  }
  public isGreaterThan(
    otherValue:
      | ComparableDTOTodoItemAggregateByDescriptionAlphabetOrderComparableValue
      | ComparableValue<ComparableDTOTodoItemAggregateByDescriptionAlphabetOrderComparableValue>,
  ): boolean {
    if (
      typeof (otherValue as ComparableDTOTodoItemAggregateByDescriptionAlphabetOrderComparableValue)
        .description === 'string'
    ) {
      return this._isGreaterThan(
        otherValue as ComparableDTOTodoItemAggregateByDescriptionAlphabetOrderComparableValue,
      );
    }
    return !(
      otherValue as ComparableValue<ComparableDTOTodoItemAggregateByDescriptionAlphabetOrderComparableValue>
    ).isGreaterThan(this.value);
  }

  protected _isGreaterThan(
    otherValue: ComparableDTOTodoItemAggregateByDescriptionAlphabetOrderComparableValue,
  ): boolean {
    return this._todoItemDescriptionComparable.isGreaterThan(otherValue.description);
  }
}
