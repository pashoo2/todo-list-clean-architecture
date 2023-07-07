import { AppExecutionEnvironment } from '../enum';
import {
  REST_API_SERVER_HOST,
  REST_API_SERVER_PORT,
  REST_API_SERVER_PROTOCOL,
  CLIENT_HOST_NAME,
  CLIENT_HOST_PORT,
  CLIENT_HOST_PROTOCOL,
} from './const';
import type { ApplicationConfiguration } from './types';

export const applicationConfiguration: ApplicationConfiguration = {
  resetApi: {
    serverUrl: new URL(
      `${REST_API_SERVER_PROTOCOL}://${REST_API_SERVER_HOST}:${REST_API_SERVER_PORT}`,
    ),
  },
  client: {
    // TODO: use this config for Webpack Dev server as well.
    hostPort: CLIENT_HOST_PORT,
    url: new URL(`${CLIENT_HOST_PROTOCOL}://${CLIENT_HOST_NAME}:${CLIENT_HOST_PORT}`),
  },
  environment: {
    env: AppExecutionEnvironment.DEV, // TODO: read it dynamically
  },
};
