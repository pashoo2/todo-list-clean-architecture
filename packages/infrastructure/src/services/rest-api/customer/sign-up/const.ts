import type { EntityType } from '@react-node-monorepo/domain';

import type { RestApiRootEndpointPathForEntityUseCase } from '../../types';
import { REST_API_ENDPOINT_CUSTOMER_ROOT_PATH_V1 } from '../const';
import { RestAPIRequestMethod } from '../../enum';

export const REST_API_ENDPOINT_CUSTOMER_ROOT_PATH_V1_SIGN_UP: RestApiRootEndpointPathForEntityUseCase<
  EntityType.Customer,
  'sign-up'
> = `${REST_API_ENDPOINT_CUSTOMER_ROOT_PATH_V1}/sign-up`;

export const REST_API_ENDPOINT_CUSTOMER_SIGN_UP_METHOD = RestAPIRequestMethod.POST;
