import { ok as assert } from 'assert';
import { EntityType } from '@react-node-monorepo/domain';

import { DTOForEntityAbstractImpl } from '../dto-for-entity-abstract';
import type { DTOTodoItemAggregate, DTOTodoItemAggregateType } from './types';

export type DTOBikeEntityImplConstructorParameters = Omit<DTOTodoItemAggregate, 'type'>;

export class DTOTodoItemEntityImpl
  extends DTOForEntityAbstractImpl<DTOTodoItemAggregateType>
  implements DTOTodoItemAggregate
{
  public readonly description: DTOTodoItemAggregate['description'];
  public readonly isDone: DTOTodoItemAggregate['isDone'];
  public readonly user: DTOTodoItemAggregate['user'];
  constructor(parameters: DTOBikeEntityImplConstructorParameters) {
    super({
      ...parameters,
      type: EntityType.TodoItem,
    });

    const { description, isDone, user } = parameters;

    assert(description, '"description" parameter is not defined');
    assert(isDone, '"isDone" parameter is not defined');
    assert(user, '"user" parameter is not defined');

    this.description = description;
    this.isDone = isDone;
    this.user = user;
  }
}
