import { ok as assert } from 'assert';
import type {
  CustomerRestAPIRequestReadByIdPayload,
  CustomerRestAPIResponseReadByIdPayload,
} from './types';
import type { RestAPIRequestDescription } from '../../types';
import { RestAPIRequestMethod, RestApiResponseBodyFormat } from '../../enum';
import {
  REST_API_ENDPOINT_CUSTOMER_ROOT_PATH_V1_READ_BY_ID,
  REST_API_ENDPOINT_CUSTOMER_READ_BY_ID_METHOD,
} from './const';

export class RestAPIRequestDescriptionCustomerReadById
  implements
    RestAPIRequestDescription<
      CustomerRestAPIRequestReadByIdPayload,
      CustomerRestAPIResponseReadByIdPayload
    >
{
  public get endpointPath(): string {
    return REST_API_ENDPOINT_CUSTOMER_ROOT_PATH_V1_READ_BY_ID;
  }
  public get method(): RestAPIRequestMethod {
    return REST_API_ENDPOINT_CUSTOMER_READ_BY_ID_METHOD;
  }
  public get responseFormat(): RestApiResponseBodyFormat.JSON {
    return RestApiResponseBodyFormat.JSON;
  }
  public readonly payload: CustomerRestAPIRequestReadByIdPayload;
  constructor({ id }: CustomerRestAPIRequestReadByIdPayload) {
    assert(typeof id === 'string', 'Id should be a string');
    assert(id, 'Id should be defined');
    this.payload = {
      id,
    };
  }
}
