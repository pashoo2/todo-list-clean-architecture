import type { TodoItemAggregate } from '@react-node-monorepo/domain';
import type { EntityCRUDRepo, EntityListRepo, Filter, FilterListParameters } from '../type';

export type TodoItemAggregateRepositoryCRUD = EntityCRUDRepo<TodoItemAggregate>;

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
