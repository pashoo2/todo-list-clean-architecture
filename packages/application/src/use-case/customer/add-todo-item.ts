import { type TodoItemAggregate } from '@react-node-monorepo/domain';

import { type OperationResult, type TodoItemAggregateRepositoryCRUD } from '../../repository';
import { type UseCase } from '../types';

export interface CustomerEntityUseCaseAddTodoItemImplParameters {
  todoItem: TodoItemAggregate;
}

export type CustomerEntityUseCaseAddTodoItemImplResult = Promise<TodoItemAggregate>;

export class CustomerEntityUseCaseAddTodoItemImpl
  implements
    UseCase<
      CustomerEntityUseCaseAddTodoItemImplParameters,
      CustomerEntityUseCaseAddTodoItemImplResult
    >
{
  constructor(protected readonly _todoItemAggregateCRUDRepo: TodoItemAggregateRepositoryCRUD) {}

  public async run(
    parameters: CustomerEntityUseCaseAddTodoItemImplParameters,
  ): CustomerEntityUseCaseAddTodoItemImplResult {
    const { todoItem } = parameters;

    const result: OperationResult<TodoItemAggregate> = await this._todoItemAggregateCRUDRepo.create(
      todoItem,
    );

    if (!result.isSuccess) {
      throw result.result;
    }
    return result.result;
  }
}
