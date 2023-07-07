import { TodoItemAggregate } from '@react-node-monorepo/domain';

import type { OperationResult, TodoItemAggregateRepositoryCRUD } from '../../repository';
import type { UseCase } from '../types';

export interface CustomerEntityUseCaseUpdateTodoItemParameters {
  todoItem: TodoItemAggregate;
}

export type CustomerEntityUseCaseUpdateTodoItemResult = Promise<void>;

export class CustomerEntityUseCaseUpdateTodoItemImpl
  implements
    UseCase<
      CustomerEntityUseCaseUpdateTodoItemParameters,
      CustomerEntityUseCaseUpdateTodoItemResult
    >
{
  constructor(protected readonly _todoItemAggregateCRUD: TodoItemAggregateRepositoryCRUD) {}

  public async run(
    parameters: CustomerEntityUseCaseUpdateTodoItemParameters,
  ): CustomerEntityUseCaseUpdateTodoItemResult {
    const { todoItem } = parameters;
    const result: OperationResult<void> = await this._todoItemAggregateCRUD.update(todoItem);

    if (!result.isSuccess) {
      throw result.result;
    }
    return result.result;
  }
}
