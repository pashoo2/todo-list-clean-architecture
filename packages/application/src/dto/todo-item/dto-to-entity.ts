import { ok as assert } from 'assert';
import {
  TodoItemAggregate,
  ToDoItemDescriptionVOImpl,
  TodoItemAggregateImpl,
  TodoItemAggregateImplConstructorParameters,
  CustomerEntity,
} from '@react-node-monorepo/domain';

import type { DTOToAggregate, DTOToAggregateIncorporatedEntities } from '../types';
import type { DTOTodoItemAggregate, DTOTodoItemAggregateType } from './types';

import { DTOToEntityAbstractImpl } from '../dto-to-entity-abstract';

export interface DTOToAggregateIncorporatedEntitiesParameter
  extends DTOToAggregateIncorporatedEntities {
  user: CustomerEntity;
}

export class DTOTodoItemToAggregateImpl
  extends DTOToEntityAbstractImpl<DTOTodoItemAggregateType>
  implements DTOToAggregate<DTOTodoItemAggregateType, DTOToAggregateIncorporatedEntitiesParameter>
{
  public derive(
    dto: Omit<DTOTodoItemAggregate, 'user'>,
    incorporatedEntities: DTOToAggregateIncorporatedEntitiesParameter,
  ): TodoItemAggregate {
    assert(dto, '"dto" value is not defined');
    assert(incorporatedEntities, '"incorporatedEntities" parameter is required');

    const { description, isDone } = dto;

    assert(typeof isDone === 'boolean', '"isDone" parameter should be a boolean value');

    const { user } = incorporatedEntities;

    assert(user, '"user" entity is required');

    const descriptionVO = new ToDoItemDescriptionVOImpl(description);

    const entityConstructorParameters: TodoItemAggregateImplConstructorParameters = {
      ...dto,
      ...this._convertStringsToDatesFromDTOCommonFields(dto),
      description: descriptionVO,
      isDone,
      user,
    };

    return new TodoItemAggregateImpl(entityConstructorParameters);
  }
}
