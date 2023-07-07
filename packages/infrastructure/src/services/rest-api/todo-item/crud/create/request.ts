import { ok as assert } from 'assert';
import type {
  TodoItemAggregateRestAPIRequestCreatePayload,
  TodoItemAggregateRestAPIResponseCreatePayload,
} from './types';
import type { RestAPIRequestDescription } from '../../../types';
import { RestAPIRequestMethod, RestApiResponseBodyFormat } from '../../../enum';
import {
  REST_API_ENDPOINT_TODO_ITEM_ROOT_PATH_V1_CREATE,
  REST_API_ENDPOINT_TODO_ITEM_CREATE_METHOD,
} from './const';

export class RestAPIRequestDescriptionTodoItemAggregateCreate
  implements
    RestAPIRequestDescription<
      TodoItemAggregateRestAPIRequestCreatePayload,
      TodoItemAggregateRestAPIResponseCreatePayload
    >
{
  public get endpointPath(): string {
    return REST_API_ENDPOINT_TODO_ITEM_ROOT_PATH_V1_CREATE;
  }
  public get method(): RestAPIRequestMethod {
    return REST_API_ENDPOINT_TODO_ITEM_CREATE_METHOD;
  }
  public get responseFormat(): RestApiResponseBodyFormat.JSON {
    return RestApiResponseBodyFormat.JSON;
  }
  public readonly payload: TodoItemAggregateRestAPIRequestCreatePayload;
  constructor({ todoItem }: TodoItemAggregateRestAPIRequestCreatePayload) {
    assert(todoItem, 'TodoItem is required');
    this.payload = {
      todoItem,
    };
  }
}
