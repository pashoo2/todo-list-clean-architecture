import type { TodoItemAggregateRestAPIResponseRemoveAllPayload } from './types';
import type { RestAPIRequestDescriptionNoPayload } from '../../../types';
import { RestAPIRequestMethod, RestApiResponseBodyFormat } from '../../../enum';
import {
  REST_API_ENDPOINT_TODO_ITEM_REMOVE_ALL_METHOD,
  REST_API_ENDPOINT_TODO_ITEM_ROOT_PATH_V1_REMOVE_ALL,
} from './const';

export class RestAPIRequestDescriptionTodoItemAggregateRemoveAll
  implements RestAPIRequestDescriptionNoPayload<TodoItemAggregateRestAPIResponseRemoveAllPayload>
{
  public get endpointPath(): string {
    return REST_API_ENDPOINT_TODO_ITEM_ROOT_PATH_V1_REMOVE_ALL;
  }
  public get method(): RestAPIRequestMethod {
    return REST_API_ENDPOINT_TODO_ITEM_REMOVE_ALL_METHOD;
  }
  public get responseFormat(): RestApiResponseBodyFormat.EMPTY {
    return RestApiResponseBodyFormat.EMPTY;
  }
}
