import { ok as assert } from 'assert';
import { EntityType, TodoItemAggregate } from '@react-node-monorepo/domain';

import type { DTOFromEntity } from '../types';
import type { DTOTodoItemAggregate, DTOTodoItemAggregateType } from './types';
import { DTOFromEntityAbstractImpl } from '../dto-from-entity-abstract';

export class DTOTodoItemFromAggregateImpl
  extends DTOFromEntityAbstractImpl<DTOTodoItemAggregateType>
  implements DTOFromEntity<DTOTodoItemAggregateType>
{
  public derive(entity: TodoItemAggregate): DTOTodoItemAggregate {
    assert(entity, '"entity" value is not defined');

    const { id, description, isDone, user } = entity;

    const dto: DTOTodoItemAggregate = {
      id,
      type: EntityType.TodoItem,
      description: description.description,
      isDone,
      user: user.id,
      ...this._convertDatesToStringsFromEntity(entity),
    };

    return dto;
  }
}
