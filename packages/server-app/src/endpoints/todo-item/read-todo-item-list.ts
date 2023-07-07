import {
  RestAPIRequestMethod,
  HTTPErrorClientSideImpl,
  TodoItemAggregateRestAPIResponseListPayload,
  REST_API_ENDPOINT_TODO_ITEM_PATH_V1_LIST,
  REST_API_ENDPOINT_TODO_ITEM_LIST_METHOD,
  TodoItemAggregateRestAPIRequestListPayload,
} from '@react-node-monorepo/infrastructure';
import {
  CustomerEntityUseCaseReadTodoListImpl,
  TodoItemAggregateRepositoryList,
  TodoItemAggregateRepositoryListFilter,
  DTOTodoItemFromAggregateImpl,
} from '@react-node-monorepo/application';
import { EntityType, type TodoItemAggregate } from '@react-node-monorepo/domain';

import { type Request } from 'express';
import { EndpointPrivateAbstractImpl } from '../private-abstract';
import type { EndpointPrivate } from '../types';
import type { UserRole } from '../../types';
import { TodoItemAggregateRepositoryListFilterImpl } from '../../repository/todo-item';

export class EndpointPrivateReadTodoItemList
  extends EndpointPrivateAbstractImpl<TodoItemAggregateRestAPIResponseListPayload>
  implements EndpointPrivate<TodoItemAggregateRestAPIResponseListPayload>
{
  public get isPublic(): false {
    return false;
  }
  public get path(): string {
    return REST_API_ENDPOINT_TODO_ITEM_PATH_V1_LIST;
  }
  public get method(): RestAPIRequestMethod {
    return REST_API_ENDPOINT_TODO_ITEM_LIST_METHOD;
  }

  public get roles(): Readonly<UserRole[]> {
    return [EntityType.Customer];
  }

  // TODO: inject via DI
  protected readonly _todoItemAggregateListRepoFilter: TodoItemAggregateRepositoryListFilter;
  protected readonly _dtoTodoItemFromAggregateImpl = new DTOTodoItemFromAggregateImpl();

  constructor(protected readonly _todoItemAggregateListRepo: TodoItemAggregateRepositoryList) {
    super();
    this._todoItemAggregateListRepoFilter = new TodoItemAggregateRepositoryListFilterImpl();
  }

  protected async _handlePrivate(
    request: Request,
  ): Promise<TodoItemAggregateRestAPIResponseListPayload> {
    // TODO: the list order should also be passed via parameters
    const parameters = request.query as unknown as TodoItemAggregateRestAPIRequestListPayload;
    const useCase = new CustomerEntityUseCaseReadTodoListImpl(
      this._todoItemAggregateListRepo,
      this._todoItemAggregateListRepoFilter,
    );
    const result = await useCase.run(parameters);

    if (result instanceof Error) {
      throw new HTTPErrorClientSideImpl(String(result));
    }
    return {
      ...result,
      // TODO: should be filtered by the current user id
      values: result.values.map(this.$convertEntityToDTO),
    };
  }

  private $convertEntityToDTO = (entity: TodoItemAggregate) =>
    this._dtoTodoItemFromAggregateImpl.derive(entity);
}
