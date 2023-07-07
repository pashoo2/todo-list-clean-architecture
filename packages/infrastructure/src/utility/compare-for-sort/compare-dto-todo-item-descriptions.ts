import {
  ComparableDTOTodoItemAggregateByDescriptionAlphabetOrder,
  type ComparableDTOTodoItemAggregateByDescriptionAlphabetOrderComparableValue,
} from '../comparable-value';
import { type CompareForSortFunction } from './types';

export const compareDTOTodoItemsByDescription: CompareForSortFunction<ComparableDTOTodoItemAggregateByDescriptionAlphabetOrderComparableValue> =
  function compareTodoItemsByDescriptionImpl(
    firstTodoItemDTO: ComparableDTOTodoItemAggregateByDescriptionAlphabetOrderComparableValue,
    secondTodoItemDTO: ComparableDTOTodoItemAggregateByDescriptionAlphabetOrderComparableValue,
  ): number {
    const todoItemFirstComparable = new ComparableDTOTodoItemAggregateByDescriptionAlphabetOrder(
      firstTodoItemDTO,
    );
    const todoItemSecondComparable = new ComparableDTOTodoItemAggregateByDescriptionAlphabetOrder(
      secondTodoItemDTO,
    );
    return todoItemFirstComparable.isGreaterThan(todoItemSecondComparable) ? -1 : 0;
  };
