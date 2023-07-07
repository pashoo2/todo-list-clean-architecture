import { AppExecutionEnvironment } from '../enum';

export interface ResetApiConfiguration {
  serverUrl: URL;
}

export interface ClientHostConfiguration {
  hostPort: number;
  url: URL;
}

export interface ExecutionEnvironment {
  env: AppExecutionEnvironment;
}

export interface ApplicationConfiguration {
  resetApi: ResetApiConfiguration;
  client: ClientHostConfiguration;
  environment: ExecutionEnvironment;
}
