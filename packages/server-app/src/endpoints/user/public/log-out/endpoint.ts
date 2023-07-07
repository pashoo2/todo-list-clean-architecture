import {
  RestAPIRequestMethod,
  REST_API_ENDPOINT_USER_ROOT_PATH_V1_LOG_OUT,
  REST_API_ENDPOINT_USER_LOG_OUT_METHOD,
} from '@react-node-monorepo/infrastructure';
import { type Request } from 'express';

import { type EndpointPublic } from '../../../types';

export class EndpointPublicUserEntityLogOut implements EndpointPublic<void> {
  public get isPublic(): true {
    return true;
  }
  public get path(): string {
    return REST_API_ENDPOINT_USER_ROOT_PATH_V1_LOG_OUT;
  }
  public get method(): RestAPIRequestMethod {
    return REST_API_ENDPOINT_USER_LOG_OUT_METHOD;
  }

  public async handle(request: Request): Promise<void> {
    await new Promise<void>((res, rej) => {
      request.session.destroy(err => {
        if (err) {
          rej(err);
        } else {
          res();
        }
      });
    });
  }
}
