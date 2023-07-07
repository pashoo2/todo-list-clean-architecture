import type { EntityType } from '@react-node-monorepo/domain';

import type { RestApiRootEndpointPathForEntityUseCase } from '../../types';
import { REST_API_ENDPOINT_CUSTOMER_ROOT_PATH_V1 as REST_API_ENDPOINT_USER_ROOT_PATH_V1 } from '../../customer/const';
import { RestAPIRequestMethod } from '../../enum';

export const REST_API_ENDPOINT_USER_ROOT_PATH_V1_SIGN_IN: RestApiRootEndpointPathForEntityUseCase<
  EntityType.Customer,
  'sign-in'
> = `${REST_API_ENDPOINT_USER_ROOT_PATH_V1}/sign-in`;

export const REST_API_ENDPOINT_USER_SIGN_IN_METHOD = RestAPIRequestMethod.POST;
