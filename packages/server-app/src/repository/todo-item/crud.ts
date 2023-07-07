import {
  DTOTodoItemFromAggregateImpl,
  type OperationResultAsync,
  DateTimeSerializationServiceImpl,
  type DateTimeSerializationService,
  TodoItemAggregateRepositoryCRUD,
  DTOTodoItemToAggregateImpl,
  type DTOTodoItemAggregate,
} from '@react-node-monorepo/application';
import { type TodoItemAggregate } from '@react-node-monorepo/domain';

import { DataBase, EntityUniqueIdGenerator } from '../../services';
import { DB_KEY_TODO_ITEM } from './const';

export class TodoItemAggregateRepositoryCRUDImpl implements TodoItemAggregateRepositoryCRUD {
  static dbKey = DB_KEY_TODO_ITEM;

  // TODO: use Dependency Injection
  protected _dtoTodoItemToAggregateImpl = new DTOTodoItemToAggregateImpl();
  protected _dtoTodoItemFromAggregateImpl = new DTOTodoItemFromAggregateImpl();
  protected _dateTimeSerialization: DateTimeSerializationService =
    new DateTimeSerializationServiceImpl();

  constructor(
    protected _databaseConnection: DataBase,
    protected _entityUniqueIdGenerator: EntityUniqueIdGenerator,
  ) {
    if (!_databaseConnection.has(TodoItemAggregateRepositoryCRUDImpl.dbKey)) {
      _databaseConnection.set(TodoItemAggregateRepositoryCRUDImpl.dbKey, []);
    }
  }

  public async create(entity: TodoItemAggregate): OperationResultAsync<TodoItemAggregate> {
    const todoItemId = this._entityUniqueIdGenerator();
    const dtoTodoItem: DTOTodoItemAggregate = this._dtoTodoItemFromAggregateImpl.derive(entity);
    const dateCreatedStringified = this._getCurrentDateStringified();
    const dtoTodoItemAggregate: DTOTodoItemAggregate = {
      ...dtoTodoItem,
      dateCreated: dateCreatedStringified,
      dateModified: dateCreatedStringified,
      id: todoItemId,
    };

    this._writeTodoITem(dtoTodoItemAggregate);

    const todoItemWithId: TodoItemAggregate = this._dtoTodoItemToAggregateImpl.derive(
      dtoTodoItemAggregate,
      {
        user: entity.user,
      },
    );

    return {
      isSuccess: true,
      result: todoItemWithId,
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async read(_id: string): OperationResultAsync<TodoItemAggregate | undefined> {
    throw new Error('Not implemented'); // TODO: implement.
  }

  public async update(entity: TodoItemAggregate): OperationResultAsync<void> {
    const dtoTodoItem: DTOTodoItemAggregate = this._dtoTodoItemFromAggregateImpl.derive(entity);
    const dateCreatedStringified = this._getCurrentDateStringified();
    const dtoTodoItemAggregate: DTOTodoItemAggregate = {
      ...dtoTodoItem,
      dateModified: dateCreatedStringified,
    };

    this._writeTodoITem(dtoTodoItemAggregate);
    return {
      isSuccess: true,
      result: void undefined,
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async delete(_id: string): OperationResultAsync<void> {
    throw new Error('Not implemented'); // TODO: implement.
  }

  public async removeAll(): OperationResultAsync<void> {
    this._databaseConnection.set(TodoItemAggregateRepositoryCRUDImpl.dbKey, []);
    return {
      isSuccess: true,
      result: void undefined,
    };
  }

  protected _readAllTodoItems(): DTOTodoItemAggregate[] {
    const todoItems = this._databaseConnection.get(TodoItemAggregateRepositoryCRUDImpl.dbKey) as
      | DTOTodoItemAggregate[]
      | undefined;

    return todoItems ?? [];
  }

  protected _writeTodoITem(todoItem: DTOTodoItemAggregate): void {
    if (!todoItem.id) {
      throw new Error('An entity should have a non-empty identity');
    }

    const todoItems = this._readAllTodoItems();
    const existingTodoItem = todoItems.find(todoItemDB => todoItemDB.id === todoItem.id);

    if (existingTodoItem) {
      Object.assign(existingTodoItem, todoItem);
    } else {
      todoItems.push(todoItem);
    }
    this._databaseConnection.set(TodoItemAggregateRepositoryCRUDImpl.dbKey, todoItems);
  }

  protected _getCurrentDateStringified(): string {
    return this._dateTimeSerialization.toString(new Date());
  }
}
