import { TodoItemAggregate } from '@react-node-monorepo/domain';

import type {
  ListFromStorage,
  OperationResult,
  TodoItemAggregateRepositoryList,
  TodoItemAggregateRepositoryListFilter,
  TodoItemAggregateRepositoryListFilterParameters,
} from '../../repository';
import type { UseCase } from '../types';

export type CustomerEntityUseCaseReadTodoListDoneImplResult = Promise<
  ListFromStorage<TodoItemAggregate> | Error
>;

export type CustomerEntityUseCaseReadTodoListDoneImplResultParameters =
  Partial<TodoItemAggregateRepositoryListFilterParameters>;

export class CustomerEntityUseCaseReadTodoListDoneImpl
  implements
    UseCase<
      CustomerEntityUseCaseReadTodoListDoneImplResultParameters,
      CustomerEntityUseCaseReadTodoListDoneImplResult
    >
{
  constructor(
    protected readonly _todoItemAggregateListRepo: TodoItemAggregateRepositoryList,
    protected readonly _todoItemAggregateListRepoFilter: TodoItemAggregateRepositoryListFilter,
  ) {}

  public async run(
    parameters: CustomerEntityUseCaseReadTodoListDoneImplResultParameters,
  ): CustomerEntityUseCaseReadTodoListDoneImplResult {
    const { count, offset } = parameters;
    this._todoItemAggregateListRepoFilter.create({
      count,
      offset,
    });
    const result: OperationResult<ListFromStorage<TodoItemAggregate>> =
      await this._todoItemAggregateListRepo.read(this._todoItemAggregateListRepoFilter);

    if (!result.isSuccess) {
      return result.result;
    }
    return result.result;
  }
}
