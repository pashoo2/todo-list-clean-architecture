import type { RestAPIRequestMethod, RestApiResponseBodyFormat } from '../enum';

export interface RestAPIRequestDescriptionWithResponseFormat<R> {
  readonly responseFormat: R extends void
    ? RestApiResponseBodyFormat.EMPTY
    : RestApiResponseBodyFormat;
}

export interface RestAPIRequestDescriptionNoPayload<R = void>
  extends RestAPIRequestDescriptionWithResponseFormat<R> {
  readonly endpointPath: string;
  readonly method: RestAPIRequestMethod;
}

export interface RestAPIRequestDescription<P, R = void>
  extends RestAPIRequestDescriptionNoPayload<R> {
  readonly payload: P;
}
