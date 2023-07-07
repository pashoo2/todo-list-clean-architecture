import { ok as assert } from 'assert';
import { type TodoItemDescriptionVO } from '../../value-object';
import { EntityAbstract, type EntityAbstractConstructorParameters } from '../entity-abstract';
import { EntityType } from '../enum';
import { type CustomerEntity } from '../user';
import type { TodoItemAggregate } from './types';

export interface TodoItemAggregateImplConstructorParameters
  extends EntityAbstractConstructorParameters {
  user: CustomerEntity;
  description: TodoItemDescriptionVO;
  isDone: boolean;
}

export class TodoItemAggregateImpl
  extends EntityAbstract<EntityType.TodoItem>
  implements TodoItemAggregate
{
  public get type(): EntityType.TodoItem {
    return EntityType.TodoItem;
  }
  public get description(): TodoItemDescriptionVO {
    return this._description;
  }
  public get isDone(): boolean {
    return this.isDone;
  }
  public get user(): CustomerEntity {
    return this._user;
  }
  protected _description: TodoItemDescriptionVO;
  protected _isDone: boolean;
  protected readonly _user: CustomerEntity;
  constructor(parameters: TodoItemAggregateImplConstructorParameters) {
    super(parameters);

    const { description, isDone, user } = parameters;

    assert(typeof isDone === 'boolean', '"isDone" parameter should be a boolean value');
    assert(description, '"model" parameter is required');
    assert(user, '"user" parameter is required');

    this._isDone = isDone;
    this._user = user;
    this._description = description;
  }

  public setIsDone(isDone: boolean): void {
    this._isDone = isDone;
  }

  public unsetIsDone(): void {
    this._isDone = false;
  }

  public setDescription(description: TodoItemDescriptionVO): void {
    this._description = description;
  }
}
