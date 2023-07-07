import type {
  DTOTodoItemAggregate,
  ListFromStorage,
  TodoItemAggregateRepositoryListFilterParameters,
} from '@react-node-monorepo/application';

// TODO: we can leverage SWAGGER documentation automatic generator
//  https://github.com/Surnet/swagger-jsdoc

export type TodoItemAggregateRestAPIRequestListPayload =
  TodoItemAggregateRepositoryListFilterParameters;

export type TodoItemAggregateRestAPIResponseListPayload = ListFromStorage<DTOTodoItemAggregate>;
