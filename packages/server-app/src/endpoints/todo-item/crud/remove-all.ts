import {
  RestAPIRequestMethod,
  HTTPErrorClientSideImpl,
  TodoItemAggregateRestAPIResponseRemoveAllPayload,
  REST_API_ENDPOINT_TODO_ITEM_ROOT_PATH_V1_REMOVE_ALL,
  REST_API_ENDPOINT_TODO_ITEM_REMOVE_ALL_METHOD,
} from '@react-node-monorepo/infrastructure';
import { TodoItemAggregateRepositoryCRUD } from '@react-node-monorepo/application';
import { EntityType } from '@react-node-monorepo/domain';

import { type EndpointPrivate } from '../../types';
import type { UserRole } from '../../../types';
import { EndpointPrivateAbstractImpl } from '../../private-abstract';

export class EndpointTodoItemAggregateRemoveAll
  extends EndpointPrivateAbstractImpl<TodoItemAggregateRestAPIResponseRemoveAllPayload>
  implements EndpointPrivate<TodoItemAggregateRestAPIResponseRemoveAllPayload>
{
  public get isPublic(): false {
    return false;
  }
  public get path(): string {
    return REST_API_ENDPOINT_TODO_ITEM_ROOT_PATH_V1_REMOVE_ALL;
  }
  public get method(): RestAPIRequestMethod {
    return REST_API_ENDPOINT_TODO_ITEM_REMOVE_ALL_METHOD;
  }
  public get roles(): Readonly<UserRole[]> {
    return Object.freeze([EntityType.Customer]);
  }

  constructor(protected _todoItemAggregateCRUDRepo: TodoItemAggregateRepositoryCRUD) {
    super();
  }

  protected async _handlePrivate(): Promise<void> {
    const todoItemUserReadOperationResult = await this._todoItemAggregateCRUDRepo.removeAll();

    if (!todoItemUserReadOperationResult.isSuccess) {
      throw new HTTPErrorClientSideImpl(String(todoItemUserReadOperationResult.result));
    }
  }
}
