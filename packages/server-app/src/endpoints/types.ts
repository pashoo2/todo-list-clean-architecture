import { type RestAPIRequestMethod } from '@react-node-monorepo/infrastructure';
import { type Request } from 'express';
import { UserRole } from '../types';
import { UserSession } from '../services';

export interface Endpoint<R> {
  readonly isPublic: boolean;
  readonly path: string;
  readonly method: RestAPIRequestMethod;
  handle(request: Request): Promise<R>;
}

export interface EndpointPublic<R> extends Endpoint<R> {
  readonly isPublic: true;
}

export interface EndpointPrivate<R> extends Endpoint<R> {
  readonly isPublic: false;
  readonly roles: Readonly<UserRole[]>;
  readonly userSession?: UserSession;
}
