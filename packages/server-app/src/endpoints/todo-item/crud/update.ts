import {
  RestAPIRequestMethod,
  HTTPErrorClientSideImpl,
  TodoItemAggregateRestAPIResponseUpdatePayload,
  REST_API_ENDPOINT_TODO_ITEM_ROOT_PATH_V1_UPDATE,
  REST_API_ENDPOINT_TODO_ITEM_UPDATE_METHOD,
  TodoItemAggregateRestAPIRequestUpdatePayload,
} from '@react-node-monorepo/infrastructure';
import {
  TodoItemAggregateRepositoryCRUD,
  CustomerEntityRepositoryCRUD,
  DTOTodoItemToAggregateImpl,
  DTOTodoItemFromAggregateImpl,
  CustomerEntityUseCaseUpdateTodoItemImpl,
} from '@react-node-monorepo/application';
import { type Request } from 'express';
import { EntityType, type TodoItemAggregate } from '@react-node-monorepo/domain';

import { type EndpointPrivate } from '../../types';
import type { UserRole } from '../../../types';
import { EndpointPrivateAbstractImpl } from '../../private-abstract';

export class EndpointTodoItemAggregateUpdate
  extends EndpointPrivateAbstractImpl<TodoItemAggregateRestAPIResponseUpdatePayload>
  implements EndpointPrivate<TodoItemAggregateRestAPIResponseUpdatePayload>
{
  public get isPublic(): false {
    return false;
  }
  public get path(): string {
    return REST_API_ENDPOINT_TODO_ITEM_ROOT_PATH_V1_UPDATE;
  }
  public get method(): RestAPIRequestMethod {
    return REST_API_ENDPOINT_TODO_ITEM_UPDATE_METHOD;
  }
  public get roles(): Readonly<UserRole[]> {
    return Object.freeze([EntityType.Customer]);
  }
  protected _dtoTodoItemToAggregateImpl = new DTOTodoItemToAggregateImpl();
  protected _dtoTodoItemFromAggregateImpl = new DTOTodoItemFromAggregateImpl();

  constructor(
    protected _todoItemAggregateCRUDRepo: TodoItemAggregateRepositoryCRUD,
    protected _customerEntityRepositoryCRUDImpl: CustomerEntityRepositoryCRUD,
  ) {
    super();
  }

  protected async _handlePrivate(
    request: Request,
  ): Promise<TodoItemAggregateRestAPIResponseUpdatePayload> {
    const { todoItem } = request.body as TodoItemAggregateRestAPIRequestUpdatePayload;

    const todoItemUserId = todoItem.user;
    const todoItemUserReadOperationResult = await this._customerEntityRepositoryCRUDImpl.read(
      todoItemUserId,
    );

    if (!todoItemUserReadOperationResult.isSuccess) {
      throw todoItemUserReadOperationResult.result;
    }

    const userEntityOrUndefined = todoItemUserReadOperationResult.result;

    if (!userEntityOrUndefined) {
      throw new HTTPErrorClientSideImpl(`There is no user with the id "${todoItemUserId}" found`);
    }

    const todoItemAggregate: TodoItemAggregate = this._dtoTodoItemToAggregateImpl.derive(todoItem, {
      user: userEntityOrUndefined,
    });
    const useCase = new CustomerEntityUseCaseUpdateTodoItemImpl(this._todoItemAggregateCRUDRepo);

    await useCase.run({
      todoItem: todoItemAggregate,
    });
  }
}
