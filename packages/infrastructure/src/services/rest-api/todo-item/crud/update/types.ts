import type { DTOTodoItemAggregate } from '@react-node-monorepo/application';

import type { PayloadDataSerializable } from '../../../../../types';

// TODO: we can leverage SWAGGER documentation automatic generator
//  https://github.com/Surnet/swagger-jsdoc

export interface TodoItemAggregateRestAPIRequestUpdatePayload extends PayloadDataSerializable {
  todoItem: DTOTodoItemAggregate;
}

export type TodoItemAggregateRestAPIResponseUpdatePayload = void;
