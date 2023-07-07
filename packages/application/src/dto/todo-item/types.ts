import type { TodoItemAggregateData, EntityType } from '@react-node-monorepo/domain';
import type { DTOOmitCommonFields, DTOForEntityCommonFields } from '../types';

export type DTOTodoItemAggregateType = EntityType.TodoItem;

export interface DTOTodoItemAggregate
  extends DTOForEntityCommonFields<DTOTodoItemAggregateType>,
    Omit<DTOOmitCommonFields<TodoItemAggregateData>, 'user'> {
  /**
   * User id instead of the whole user object.
   *
   * @type {string}
   */
  user: string;
  description: string;
  isDone: boolean;
}
