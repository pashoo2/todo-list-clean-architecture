import type {
  CustomerEntityRestAPIRequestSignUpPayload,
  CustomerEntityRestAPIResponseSignUpPayload,
} from './types';
import type { RestAPIRequestDescription } from '../../types';
import { RestAPIRequestMethod, RestApiResponseBodyFormat } from '../../enum';
import {
  REST_API_ENDPOINT_CUSTOMER_ROOT_PATH_V1_SIGN_UP,
  REST_API_ENDPOINT_CUSTOMER_SIGN_UP_METHOD,
} from './const';
import { UserPasswordVOImpl } from '@react-node-monorepo/domain';

export class RestAPIRequestDescriptionCustomerSignUp
  implements
    RestAPIRequestDescription<
      CustomerEntityRestAPIRequestSignUpPayload,
      CustomerEntityRestAPIResponseSignUpPayload
    >
{
  public get endpointPath(): string {
    return REST_API_ENDPOINT_CUSTOMER_ROOT_PATH_V1_SIGN_UP;
  }
  public get method(): RestAPIRequestMethod {
    return REST_API_ENDPOINT_CUSTOMER_SIGN_UP_METHOD;
  }
  public get responseFormat(): RestApiResponseBodyFormat.JSON {
    return RestApiResponseBodyFormat.JSON;
  }
  public readonly payload: CustomerEntityRestAPIRequestSignUpPayload;
  constructor({ customer, password }: CustomerEntityRestAPIRequestSignUpPayload) {
    this.payload = {
      customer,
      password: new UserPasswordVOImpl(password).password,
    };
  }
}
