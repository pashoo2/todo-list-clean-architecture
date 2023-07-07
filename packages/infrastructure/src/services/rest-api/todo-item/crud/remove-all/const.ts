import type { EntityType } from '@react-node-monorepo/domain';

import type { RestApiRootEndpointPathForEntityUseCase } from '../../../types';
import { RestAPIRequestMethod } from '../../../enum';
import { REST_API_ENDPOINT_TODO_ITEM_ROOT_PATH_V1 } from '../../const';

export const REST_API_ENDPOINT_TODO_ITEM_ROOT_PATH_V1_REMOVE_ALL: RestApiRootEndpointPathForEntityUseCase<
  EntityType.TodoItem,
  'remove-all'
> = `${REST_API_ENDPOINT_TODO_ITEM_ROOT_PATH_V1}/remove-all`;

export const REST_API_ENDPOINT_TODO_ITEM_REMOVE_ALL_METHOD = RestAPIRequestMethod.GET;
