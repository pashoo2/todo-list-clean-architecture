import { type REST_API_ENDPOINT_ROOT } from '../const';

export type RestApiRootEndpointPathForEntity<
  ENTITY_NAME extends string,
  ENDPOINT_VERSION extends number = 1,
> = `/${typeof REST_API_ENDPOINT_ROOT}/${Lowercase<ENTITY_NAME>}/v${ENDPOINT_VERSION}`;

export type RestApiRootEndpointPathForEntityUseCase<
  ENTITY_NAME extends string,
  USE_CASE_NAME extends string,
  ENDPOINT_VERSION extends number = 1,
> = `/${Lowercase<
  typeof REST_API_ENDPOINT_ROOT
>}/${Lowercase<ENTITY_NAME>}/v${ENDPOINT_VERSION}/${Lowercase<USE_CASE_NAME>}`;
