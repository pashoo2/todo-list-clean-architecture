import type { DTOTodoItemAggregate } from '@react-node-monorepo/application';

import type { PayloadDataSerializable } from '../../../../../types';

// TODO: we can leverage SWAGGER documentation automatic generator
//  https://github.com/Surnet/swagger-jsdoc

export interface TodoItemAggregateRestAPIRequestCreatePayload extends PayloadDataSerializable {
  todoItem: DTOTodoItemAggregate;
}

export interface TodoItemAggregateRestAPIResponseCreatePayload extends PayloadDataSerializable {
  todoItem: DTOTodoItemAggregate;
}
