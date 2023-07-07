import type { TodoItemAggregate } from '@react-node-monorepo/domain';
import type {
  EntityCRUDRepo,
  EntityListRepo,
  Filter,
  FilterListParameters,
  OperationResultAsync,
} from '../type';

export interface TodoItemAggregateRepositoryCRUD extends EntityCRUDRepo<TodoItemAggregate> {
  removeAll(): OperationResultAsync<void>;
}

export interface TodoItemAggregateRepositoryListFilterParameters extends FilterListParameters {
  isDone: boolean;
  description: string;
}

export type TodoItemAggregateRepositoryListFilter = Filter<
  Partial<TodoItemAggregateRepositoryListFilterParameters>
>;

export type TodoItemAggregateRepositoryList = EntityListRepo<
  TodoItemAggregate,
  TodoItemAggregateRepositoryListFilter
>;
