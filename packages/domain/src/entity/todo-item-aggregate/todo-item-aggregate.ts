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

export type TodoItemAggregateListener = (todoItemAggregate: TodoItemAggregate) => void;

export class TodoItemAggregateImpl
  extends EntityAbstract<EntityType.TodoItem>
  implements TodoItemAggregate
{
  static _listenersStatusChange = new Set<TodoItemAggregateListener>();
  // TODO: it should be a domain event
  static subscribeTodoItemStatusChange(listener: TodoItemAggregateListener): void {
    this._listenersStatusChange.add(listener);
  }
  static unSubscribeTodoItemStatusChange(listener: TodoItemAggregateListener): void {
    this._listenersStatusChange.delete(listener);
  }

  static _listenerNewItem = new Set<TodoItemAggregateListener>();
  // TODO: it should be a domain event
  static subscribeNewTodoItem(listener: TodoItemAggregateListener): void {
    this._listenerNewItem.add(listener);
  }
  static unSubscribeNewTodoItem(listener: TodoItemAggregateListener): void {
    this._listenerNewItem.delete(listener);
  }

  public get type(): EntityType.TodoItem {
    return EntityType.TodoItem;
  }
  public get description(): TodoItemDescriptionVO {
    return this._description;
  }
  public get isDone(): boolean {
    return this._isDone;
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

    TodoItemAggregateImpl._listenerNewItem.forEach(this.$callListenerWithCurrentInstance);
  }

  public setIsDone(): void {
    const prevIsDoneStatus = this._isDone;
    if (prevIsDoneStatus) {
      return;
    }
    this._isDone = true;
    this._notifyIdDoneStatusChangeListeners();
  }

  public unsetIsDone(): void {
    const prevIsDoneStatus = this._isDone;
    if (!prevIsDoneStatus) {
      return;
    }
    this._isDone = false;
    this._notifyIdDoneStatusChangeListeners();
  }

  public setDescription(description: TodoItemDescriptionVO): void {
    this._description = description;
  }

  protected _notifyIdDoneStatusChangeListeners(): void {
    TodoItemAggregateImpl._listenersStatusChange.forEach(this.$callListenerWithCurrentInstance);
  }

  private $callListenerWithCurrentInstance = (listener: TodoItemAggregateListener): void => {
    try {
      listener(this);
    } catch (err) {
      console.error(err);
      throw err;
    }
  };
}
