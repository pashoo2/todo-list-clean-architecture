import { ok as assert } from 'assert';
import type {
  TodoItemAggregateRestAPIRequestUpdatePayload,
  TodoItemAggregateRestAPIResponseUpdatePayload,
} from './types';
import type { RestAPIRequestDescription } from '../../../types';
import { RestAPIRequestMethod, RestApiResponseBodyFormat } from '../../../enum';
import {
  REST_API_ENDPOINT_TODO_ITEM_ROOT_PATH_V1_UPDATE,
  REST_API_ENDPOINT_TODO_ITEM_UPDATE_METHOD,
} from './const';

export class RestAPIRequestDescriptionTodoItemAggregateUpdate
  implements
    RestAPIRequestDescription<
      TodoItemAggregateRestAPIRequestUpdatePayload,
      TodoItemAggregateRestAPIResponseUpdatePayload
    >
{
  public get endpointPath(): string {
    return REST_API_ENDPOINT_TODO_ITEM_ROOT_PATH_V1_UPDATE;
  }
  public get method(): RestAPIRequestMethod {
    return REST_API_ENDPOINT_TODO_ITEM_UPDATE_METHOD;
  }
  public get responseFormat(): RestApiResponseBodyFormat.EMPTY {
    return RestApiResponseBodyFormat.EMPTY;
  }
  public readonly payload: TodoItemAggregateRestAPIRequestUpdatePayload;
  constructor({ todoItem }: TodoItemAggregateRestAPIRequestUpdatePayload) {
    assert(todoItem, 'TodoItem is required');
    this.payload = {
      todoItem,
    };
  }
}
