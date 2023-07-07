import {
  RestAPIRequestMethod,
  REST_API_ENDPOINT_CUSTOMER_ROOT_PATH_V1_READ_BY_ID,
  REST_API_ENDPOINT_CUSTOMER_READ_BY_ID_METHOD,
  TodoItemAggregateRestAPIRequestCreatePayload,
  TodoItemAggregateRestAPIResponseCreatePayload,
  HTTPErrorClientSideImpl,
} from '@react-node-monorepo/infrastructure';
import {
  TodoItemAggregateRepositoryCRUD,
  CustomerEntityRepositoryCRUD,
  CustomerEntityUseCaseAddTodoItemImpl,
  DTOTodoItemToAggregateImpl,
  DTOTodoItemFromAggregateImpl,
} from '@react-node-monorepo/application';
import { type Request } from 'express';
import { EntityType, type TodoItemAggregate } from '@react-node-monorepo/domain';

import { type EndpointPrivate } from '../../types';
import type { UserRole } from '../../../types';
import { EndpointPrivateAbstractImpl } from '../../private-abstract';

export class EndpointTodoItemAggregateCreate
  extends EndpointPrivateAbstractImpl<TodoItemAggregateRestAPIResponseCreatePayload>
  implements EndpointPrivate<TodoItemAggregateRestAPIResponseCreatePayload>
{
  public get isPublic(): false {
    return false;
  }
  public get path(): string {
    return REST_API_ENDPOINT_CUSTOMER_ROOT_PATH_V1_READ_BY_ID;
  }
  public get method(): RestAPIRequestMethod {
    return REST_API_ENDPOINT_CUSTOMER_READ_BY_ID_METHOD;
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

  protected async _handle(
    request: Request,
  ): Promise<TodoItemAggregateRestAPIResponseCreatePayload> {
    const { todoItem } = request.body as TodoItemAggregateRestAPIRequestCreatePayload;

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
    const useCase = new CustomerEntityUseCaseAddTodoItemImpl(this._todoItemAggregateCRUDRepo);
    const todoItemAggregateCreated: TodoItemAggregate = await useCase.run({
      todoItem: todoItemAggregate,
    });

    return {
      todoItem: this._dtoTodoItemFromAggregateImpl.derive(todoItemAggregateCreated),
    };
  }
}
