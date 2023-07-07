import type { EntityType } from '@react-node-monorepo/domain';

import type { RestApiRootEndpointPathForEntityUseCase } from '../../types';
import { REST_API_ENDPOINT_TODO_ITEM_ROOT_PATH_V1 } from '../const';
import { RestAPIRequestMethod } from '../../enum';

export const REST_API_ENDPOINT_TODO_ITEM_PATH_V1_LIST: RestApiRootEndpointPathForEntityUseCase<
  EntityType.TodoItem,
  'list'
> = `${REST_API_ENDPOINT_TODO_ITEM_ROOT_PATH_V1}/list`;

export const REST_API_ENDPOINT_TODO_ITEM_LIST_METHOD = RestAPIRequestMethod.GET;
