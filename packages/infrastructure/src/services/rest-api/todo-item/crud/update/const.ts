import type { EntityType } from '@react-node-monorepo/domain';

import type { RestApiRootEndpointPathForEntityUseCase } from '../../../types';
import { RestAPIRequestMethod } from '../../../enum';
import { REST_API_ENDPOINT_TODO_ITEM_ROOT_PATH_V1 } from '../../const';

export const REST_API_ENDPOINT_TODO_ITEM_ROOT_PATH_V1_UPDATE: RestApiRootEndpointPathForEntityUseCase<
  EntityType.TodoItem,
  'update'
> = `${REST_API_ENDPOINT_TODO_ITEM_ROOT_PATH_V1}/update`;

export const REST_API_ENDPOINT_TODO_ITEM_UPDATE_METHOD = RestAPIRequestMethod.POST;
