import {
  ListFromStorage,
  TodoItemAggregateRepositoryList,
  DTOTodoItemAggregate,
  DTOTodoItemToAggregateImpl,
  OperationResultAsync,
  TodoItemAggregateRepositoryListFilterParameters,
  CustomerEntityRepositoryCRUD,
} from '@react-node-monorepo/application';
import {
  JSONSerializerImpl,
  TodoItemAggregateRepositoryListFilterImpl,
} from '@react-node-monorepo/infrastructure';
import { type TodoItemAggregate } from '@react-node-monorepo/domain';

import { DB_KEY_TODO_ITEM } from '../const';

import { type DataBase } from '../../../services';

export class TodoItemAggregateRepositoryListImpl implements TodoItemAggregateRepositoryList {
  static dbKey = DB_KEY_TODO_ITEM;
  // TODO: use Dependency Injection
  protected _dtoTodoItemToAggregateImpl = new DTOTodoItemToAggregateImpl();
  protected _JSONSerializerImpl = new JSONSerializerImpl();

  constructor(
    protected _databaseConnection: DataBase,
    protected _customerCRUDRepository: CustomerEntityRepositoryCRUD,
  ) {}

  public async read(
    filter: TodoItemAggregateRepositoryListFilterImpl,
  ): OperationResultAsync<ListFromStorage<TodoItemAggregate>> {
    const filterQuery: string = filter.toQuery(); // TODO: it should be a database SQL string or another type in case of a NoSQL database
    // TODO: this won't be necessary with a real database
    const filterQueryParsed = this._JSONSerializerImpl.parse(
      filterQuery,
    ) as unknown as TodoItemAggregateRepositoryListFilterParameters;
    const { count, offset, description, isDone } = filterQueryParsed;

    const todoItems: DTOTodoItemAggregate[] = this._readAllTodoItems();
    let todoItemsFiltered: DTOTodoItemAggregate[] = todoItems.slice(
      Number(offset),
      Number(offset + count),
    );

    if (typeof isDone === 'boolean') {
      todoItemsFiltered = todoItemsFiltered.filter(todoItem => todoItem.isDone === isDone);
    }
    if (description) {
      todoItemsFiltered = todoItemsFiltered.filter(todoItem =>
        todoItem.description.includes(description),
      );
    }

    return {
      isSuccess: true,
      result: {
        offset: Number(offset),
        total: todoItems.length,
        values: await Promise.all(todoItemsFiltered.map(this.$createTodoItemAggregateFromDTO)),
      },
    };
  }

  protected _readAllTodoItems(): DTOTodoItemAggregate[] {
    const todoItems = this._databaseConnection.get(TodoItemAggregateRepositoryListImpl.dbKey) as
      | DTOTodoItemAggregate[]
      | undefined;

    return todoItems ?? [];
  }

  private $createTodoItemAggregateFromDTO = async (
    todoItemDTO: DTOTodoItemAggregate,
  ): Promise<TodoItemAggregate> => {
    const readUserEntityOperationResult = await this._customerCRUDRepository.read(todoItemDTO.user);
    if (!readUserEntityOperationResult.isSuccess) {
      throw new Error('An unknown error occurred while reading the user');
    }
    const userEntityOrUndefined = readUserEntityOperationResult.result;
    if (!userEntityOrUndefined) {
      throw new Error(`There is no user with the id "${todoItemDTO.user}"`);
    }
    return this._dtoTodoItemToAggregateImpl.derive(todoItemDTO, {
      user: userEntityOrUndefined,
    });
  };
}
