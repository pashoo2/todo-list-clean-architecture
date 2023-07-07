import { type TodoItemAggregate } from '@react-node-monorepo/domain';
import { type ComparableDTOTodoItemAggregateByDescriptionAlphabetOrderComparableValue } from '../comparable-value';
import { type CompareForSortFunction } from './types';
import { compareDTOTodoItemsByDescription } from './compare-dto-todo-item-descriptions';

export type CompareTodoItemsByDescriptionValue = Pick<TodoItemAggregate, 'description'>;

function getTodoItemDescriptionObject(
  todoItem: CompareTodoItemsByDescriptionValue,
): ComparableDTOTodoItemAggregateByDescriptionAlphabetOrderComparableValue {
  return { description: todoItem.description.description };
}

export const compareTodoItemsByDescription: CompareForSortFunction<CompareTodoItemsByDescriptionValue> =
  function compareTodoItemsByDescriptionImpl(
    firstTodoItem: CompareTodoItemsByDescriptionValue,
    secondTodoItem: CompareTodoItemsByDescriptionValue,
  ): number {
    return compareDTOTodoItemsByDescription(
      getTodoItemDescriptionObject(firstTodoItem),
      getTodoItemDescriptionObject(secondTodoItem),
    );
  };
