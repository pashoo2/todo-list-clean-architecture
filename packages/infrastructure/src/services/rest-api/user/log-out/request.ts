import type { RestAPIRequestDescriptionNoPayload } from '../../types';
import { RestAPIRequestMethod, RestApiResponseBodyFormat } from '../../enum';
import {
  REST_API_ENDPOINT_USER_LOG_OUT_METHOD,
  REST_API_ENDPOINT_USER_ROOT_PATH_V1_LOG_OUT,
} from './const';

export class RestAPIRequestDescriptionUserLogOut implements RestAPIRequestDescriptionNoPayload {
  public get endpointPath(): string {
    return REST_API_ENDPOINT_USER_ROOT_PATH_V1_LOG_OUT;
  }
  public get method(): RestAPIRequestMethod {
    return REST_API_ENDPOINT_USER_LOG_OUT_METHOD;
  }
  public get responseFormat(): RestApiResponseBodyFormat.EMPTY {
    return RestApiResponseBodyFormat.EMPTY;
  }
}
