import type { EntityType } from '@react-node-monorepo/domain';

import type { RestApiRootEndpointPathForEntityUseCase } from '../../types';
import { REST_API_ENDPOINT_CUSTOMER_ROOT_PATH_V1 } from '../const';
import { RestAPIRequestMethod } from '../../enum';

export const REST_API_ENDPOINT_CUSTOMER_ROOT_PATH_V1_LIST: RestApiRootEndpointPathForEntityUseCase<
  EntityType.Customer,
  'list'
> = `${REST_API_ENDPOINT_CUSTOMER_ROOT_PATH_V1}/list`;

export const REST_API_ENDPOINT_CUSTOMER_LIST_METHOD = RestAPIRequestMethod.GET;
