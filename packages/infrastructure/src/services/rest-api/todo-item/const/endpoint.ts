import { EntityType } from '@react-node-monorepo/domain';
import { RestApiRootEndpointPathForEntity } from '../../types';
import { REST_API_ENDPOINT_ROOT } from '../../const';

export const REST_API_ENDPOINT_TODO_ITEM_ROOT_PATH_V1: RestApiRootEndpointPathForEntity<EntityType.TodoItem> =
  `/${REST_API_ENDPOINT_ROOT}/todoitem/v1` as const;
