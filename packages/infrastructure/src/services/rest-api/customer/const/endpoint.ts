import { EntityType } from '@react-node-monorepo/domain';
import { RestApiRootEndpointPathForEntity } from '../../types';
import { REST_API_ENDPOINT_ROOT } from '../../const';

export const REST_API_ENDPOINT_CUSTOMER_ROOT_PATH_V1: RestApiRootEndpointPathForEntity<EntityType.Customer> =
  `/${REST_API_ENDPOINT_ROOT}/customer/v1` as const;
