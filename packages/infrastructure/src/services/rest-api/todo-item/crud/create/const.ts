import type { EntityType } from '@react-node-monorepo/domain';

import type { RestApiRootEndpointPathForEntityUseCase } from '../../../types';
import { RestAPIRequestMethod } from '../../../enum';
import { REST_API_ENDPOINT_TODO_ITEM_ROOT_PATH_V1 } from '../../const';

export const REST_API_ENDPOINT_TODO_ITEM_ROOT_PATH_V1_CREATE: RestApiRootEndpointPathForEntityUseCase<
  EntityType.TodoItem,
  'create'
> = `${REST_API_ENDPOINT_TODO_ITEM_ROOT_PATH_V1}/create`;

export const REST_API_ENDPOINT_TODO_ITEM_CREATE_METHOD = RestAPIRequestMethod.POST;
