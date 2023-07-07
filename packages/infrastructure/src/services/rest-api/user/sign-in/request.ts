import { EmailVOImpl, UserPasswordVOImpl } from '@react-node-monorepo/domain';

import type { UserRestAPIRequestLogInPayload, UserRestAPIResponseLogInPayload } from './types';
import type { RestAPIRequestDescription } from '../../types';
import { RestAPIRequestMethod, RestApiResponseBodyFormat } from '../../enum';
import {
  REST_API_ENDPOINT_USER_ROOT_PATH_V1_SIGN_IN,
  REST_API_ENDPOINT_USER_SIGN_IN_METHOD,
} from './const';

export class RestAPIRequestDescriptionUserLogIn
  implements
    RestAPIRequestDescription<UserRestAPIRequestLogInPayload, UserRestAPIResponseLogInPayload>
{
  public get endpointPath(): string {
    return REST_API_ENDPOINT_USER_ROOT_PATH_V1_SIGN_IN;
  }
  public get method(): RestAPIRequestMethod {
    return REST_API_ENDPOINT_USER_SIGN_IN_METHOD;
  }
  public get responseFormat(): RestApiResponseBodyFormat.JSON {
    return RestApiResponseBodyFormat.JSON;
  }
  public readonly payload: UserRestAPIRequestLogInPayload;
  constructor({ email, password }: UserRestAPIRequestLogInPayload) {
    this.payload = {
      email: new EmailVOImpl(email).email,
      password: new UserPasswordVOImpl(password).password,
    };
  }
}
