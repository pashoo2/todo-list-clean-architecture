import type { CustomerEntityRestAPIResponseListPayload } from './types';
import type { RestAPIRequestDescription } from '../../types';
import { RestAPIRequestMethod, RestApiResponseBodyFormat } from '../../enum';
import {
  REST_API_ENDPOINT_CUSTOMER_LIST_METHOD,
  REST_API_ENDPOINT_CUSTOMER_ROOT_PATH_V1_LIST,
} from './const';
import { CustomerEntityRepositoryListFilter } from '@react-node-monorepo/application';

export class RestAPIRequestDescriptionCustomerList
  implements
    RestAPIRequestDescription<
      CustomerEntityRepositoryListFilter,
      CustomerEntityRestAPIResponseListPayload
    >
{
  public get endpointPath(): string {
    return REST_API_ENDPOINT_CUSTOMER_ROOT_PATH_V1_LIST;
  }
  public get method(): RestAPIRequestMethod {
    return REST_API_ENDPOINT_CUSTOMER_LIST_METHOD;
  }
  public get responseFormat(): RestApiResponseBodyFormat.JSON {
    return RestApiResponseBodyFormat.JSON;
  }

  constructor(public readonly payload: CustomerEntityRepositoryListFilter) {}
}
