import type { EntityType } from '@react-node-monorepo/domain';

import type { RestApiRootEndpointPathForEntityUseCase } from '../../types';
import { REST_API_ENDPOINT_CUSTOMER_ROOT_PATH_V1 } from '../const';
import { RestAPIRequestMethod } from '../../enum';

export const REST_API_ENDPOINT_CUSTOMER_ROOT_PATH_V1_READ_BY_ID: RestApiRootEndpointPathForEntityUseCase<
  EntityType.Customer,
  'get'
> = `${REST_API_ENDPOINT_CUSTOMER_ROOT_PATH_V1}/get`;

export const REST_API_ENDPOINT_CUSTOMER_READ_BY_ID_METHOD = RestAPIRequestMethod.GET;
