import { type Request } from 'express';
import { type RestAPIRequestMethod } from '@react-node-monorepo/infrastructure';

import type { Endpoint } from './types';
import { UserSession, UserSessionImpl } from '../services';

export abstract class EndpointAbstractImpl<R> implements Endpoint<R> {
  public abstract isPublic: boolean;
  public get userSession(): UserSession | undefined {
    return this._userSession;
  }
  public abstract readonly path: string;
  public abstract readonly method: RestAPIRequestMethod;
  protected _userSession?: UserSession;
  public handle(request: Request): Promise<R> {
    this._startUserSession(request);
    return this._handle(request);
  }
  protected abstract _handle(request: Request): Promise<R>;

  protected _startUserSession(request: Request): void {
    this._userSession = new UserSessionImpl(request.session);
  }
}
