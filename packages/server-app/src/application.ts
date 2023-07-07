import express, { type Application, type Request, type Response } from 'express';

import { type Endpoint, createEndpoints } from './endpoints';
import {
  type EntityUniqueIdGenerator,
  connectToDatabase,
  createLogger,
  entityUniqueIdGeneratorImpl,
  DataBase,
} from './services';
import {
  AppExecutionEnvironment,
  RestAPIRequestMethod,
  applicationConfiguration,
  type HttpError,
  HttpErrorStatusCode,
  HttpSuccessStatusCode,
} from '@react-node-monorepo/infrastructure';
import { type Logger } from 'winston';
import cors, { type CorsOptions } from 'cors';
import session, { type SessionOptions } from 'express-session';
import sessionFileStore, { Options as SessionFileStoreOptions } from 'session-file-store';
import type { ApplicationRestApiRequestHandlerMethod } from './types';
import { resolve } from 'path';
const corsOptions: CorsOptions = {
  origin:
    applicationConfiguration.environment.env === AppExecutionEnvironment.DEV
      ? '*'
      : String(applicationConfiguration.client.url),
  optionsSuccessStatus: 200,
};

const SessionFileStore = sessionFileStore(session);
const sessionSecret = 'session_secret_123';
const sessionFileStoreOptions: SessionFileStoreOptions = {
  path: resolve(__dirname, '../db/sessions'),
  secret: sessionSecret,
};
const sessionOptions: SessionOptions = {
  secret: sessionSecret, // TODO: use more secure value
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 * 24 }, // TODO - day
  resave: true,
  store: new SessionFileStore(sessionFileStoreOptions),
};

// TODO: refine the codebase

function deriveErrorResponseStatusCodeByErrorObject(error: Error | HttpError): number {
  return (error as HttpError).statusCode ?? HttpErrorStatusCode.Server;
}

function addPublicEndpoint(
  applicationMethod: ApplicationRestApiRequestHandlerMethod,
  endpoint: Endpoint<unknown>,
  logger: Logger,
) {
  const path = endpoint.path;
  const handlerBound = endpoint.handle.bind(endpoint);

  applicationMethod(path, (req: Request, res: Response, next) => {
    handlerBound(req)
      .then((bodyPayload: unknown) => {
        res.status(HttpSuccessStatusCode.Default).json(bodyPayload).end();
      })
      .catch((err: Error | HttpError) => {
        const statusCode = deriveErrorResponseStatusCodeByErrorObject(err);
        logger.error(`Endpoint failed:${path}:"${statusCode}"::${err.message}`);
        res.status(statusCode).send(err.message).end();
      })
      .finally(next);
  });

  logger.info('Added public endpoint handler', path);
}

function errorHandler(
  err: Error | HttpError,
  _req: Request,
  res: Response,
  next: (err: Error) => void,
): void {
  if (res.headersSent) {
    return next(err);
  }
  res.status(deriveErrorResponseStatusCodeByErrorObject(err));
  res.end({ error: err });
}

export async function runApplication(port: number): Promise<Application> {
  const dbConnection: DataBase = connectToDatabase();
  const uniqueIdGenerator: EntityUniqueIdGenerator = entityUniqueIdGeneratorImpl;
  const logger = createLogger();
  const endpoints: Endpoint<unknown>[] = await createEndpoints(dbConnection, uniqueIdGenerator);

  const app = express();

  app.use(cors(corsOptions));
  app.use(session(sessionOptions));
  app.use(express.json());
  // app.get(express.urlencoded());

  const restApiMethodToAppMethodMap: Record<
    RestAPIRequestMethod,
    ApplicationRestApiRequestHandlerMethod
  > = {
    [RestAPIRequestMethod.GET]: app.get.bind(app),
    [RestAPIRequestMethod.DELETE]: app.delete.bind(app),
    [RestAPIRequestMethod.PUT]: app.put.bind(app),
    [RestAPIRequestMethod.PATCH]: app.patch.bind(app),
    [RestAPIRequestMethod.POST]: app.post.bind(app),
  };
  let endpoint: Endpoint<unknown>;
  for (endpoint of endpoints) {
    const appMethod: ApplicationRestApiRequestHandlerMethod =
      restApiMethodToAppMethodMap[endpoint.method as RestAPIRequestMethod];

    addPublicEndpoint(appMethod, endpoint, logger);
  }
  app.use(errorHandler);
  app.listen(port, () => {
    logger.info(`Server is running at http://localhost:${port}`);
  });

  return app;
}
