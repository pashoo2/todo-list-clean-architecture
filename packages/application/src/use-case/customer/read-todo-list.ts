import { TodoItemAggregate } from '@react-node-monorepo/domain';

import type {
  ListFromStorage,
  OperationResult,
  TodoItemAggregateRepositoryList,
  TodoItemAggregateRepositoryListFilter,
  TodoItemAggregateRepositoryListFilterParameters,
} from '../../repository';
import type { UseCase } from '../types';

export type CustomerEntityUseCaseReadTodoListImplResult = Promise<
  ListFromStorage<TodoItemAggregate> | Error
>;

export type CustomerEntityUseCaseReadTodoListImplResultParameters =
  Partial<TodoItemAggregateRepositoryListFilterParameters>;

export class CustomerEntityUseCaseReadTodoListImpl
  implements
    UseCase<
      CustomerEntityUseCaseReadTodoListImplResultParameters,
      CustomerEntityUseCaseReadTodoListImplResult
    >
{
  constructor(
    protected readonly _todoItemAggregateListRepo: TodoItemAggregateRepositoryList,
    protected readonly _todoItemAggregateListRepoFilter: TodoItemAggregateRepositoryListFilter,
  ) {}

  public async run(
    parameters: CustomerEntityUseCaseReadTodoListImplResultParameters,
  ): CustomerEntityUseCaseReadTodoListImplResult {
    const { count, offset, description, isDone } = parameters;
    this._todoItemAggregateListRepoFilter.create({
      count,
      offset,
      description,
      isDone,
    });
    const result: OperationResult<ListFromStorage<TodoItemAggregate>> =
      await this._todoItemAggregateListRepo.read(this._todoItemAggregateListRepoFilter);

    if (!result.isSuccess) {
      return result.result;
    }
    return result.result;
  }
}
