import type { TodoItemAggregateRestAPIResponseListPayload } from './types';
import type { RestAPIRequestDescription } from '../../types';
import { RestAPIRequestMethod, RestApiResponseBodyFormat } from '../../enum';
import {
  REST_API_ENDPOINT_TODO_ITEM_LIST_METHOD,
  REST_API_ENDPOINT_TODO_ITEM_PATH_V1_LIST,
} from './const';
import { TodoItemAggregateRepositoryListFilter } from '@react-node-monorepo/application';

export class RestAPIRequestDescriptionTodoItemAggregateList
  implements
    RestAPIRequestDescription<
      TodoItemAggregateRepositoryListFilter,
      TodoItemAggregateRestAPIResponseListPayload
    >
{
  public get endpointPath(): string {
    return REST_API_ENDPOINT_TODO_ITEM_PATH_V1_LIST;
  }
  public get method(): RestAPIRequestMethod {
    return REST_API_ENDPOINT_TODO_ITEM_LIST_METHOD;
  }
  public get responseFormat(): RestApiResponseBodyFormat.JSON {
    return RestApiResponseBodyFormat.JSON;
  }

  constructor(public readonly payload: TodoItemAggregateRepositoryListFilter) {}
}
