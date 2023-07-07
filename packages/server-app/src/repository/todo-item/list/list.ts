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
  ComparableDTOTodoItemAggregateByDescriptionAlphabetOrderComparableValue,
  CompareForSortFunction,
  JSONSerializerImpl,
  TodoItemAggregateRepositoryListFilterImpl,
  compareDTOTodoItemsByDescription,
} from '@react-node-monorepo/infrastructure';
import { type TodoItemAggregate } from '@react-node-monorepo/domain';

import { DB_KEY_TODO_ITEM } from '../const';

import { type DataBase } from '../../../services';
export class TodoItemAggregateRepositoryListImpl implements TodoItemAggregateRepositoryList {
  static dbKey = DB_KEY_TODO_ITEM;
  // TODO: use Dependency Injection
  protected _dtoTodoItemToAggregateImpl = new DTOTodoItemToAggregateImpl();
  protected _JSONSerializerImpl = new JSONSerializerImpl();
  protected _compareForSortDTOTodoItem: CompareForSortFunction<ComparableDTOTodoItemAggregateByDescriptionAlphabetOrderComparableValue> =
    compareDTOTodoItemsByDescription;

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
    const {
      count,
      offset,
      description: filterDescription,
      isDone: filterIsDone,
    } = filterQueryParsed;

    const todoItems: DTOTodoItemAggregate[] = this._readAllTodoItems();

    const offsetNumber = Number(offset || 0);
    const countNumber = Number(count || 1);
    let todoItemsFiltered: DTOTodoItemAggregate[] = todoItems.slice(
      offsetNumber,
      offsetNumber + countNumber,
    );

    // TODO: the order should depend on a filter value
    todoItemsFiltered.sort(this._compareForSortDTOTodoItem);

    if (filterIsDone) {
      const filterFunction =
        String(filterIsDone) === 'true' // TODO: it comes as a string in querystring parameters
          ? this.$filterTodoItemsIsDone
          : this.$filterTodoItemsIsNotDone;
      todoItemsFiltered = todoItemsFiltered.filter(filterFunction);
    }
    if (filterDescription) {
      todoItemsFiltered = todoItemsFiltered.filter(todoItem =>
        todoItem.description.includes(filterDescription),
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

  private $filterTodoItemsIsDone = (
    firstTodoItemDTO: Pick<DTOTodoItemAggregate, 'isDone'>,
  ): boolean => {
    return firstTodoItemDTO.isDone;
  };

  private $filterTodoItemsIsNotDone = (
    firstTodoItemDTO: Pick<DTOTodoItemAggregate, 'isDone'>,
  ): boolean => {
    return !firstTodoItemDTO.isDone;
  };
}
