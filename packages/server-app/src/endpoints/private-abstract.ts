import { type Request } from 'express';

import { UserRole } from '../types';
import type { EndpointPrivate } from './types';
import { EndpointAbstractImpl } from './abstract';

export abstract class EndpointPrivateAbstractImpl<R>
  extends EndpointAbstractImpl<R>
  implements EndpointPrivate<R>
{
  public get isPublic(): false {
    return false;
  }

  public abstract readonly roles: Readonly<UserRole[]>;
  protected _handle(request: Request): Promise<R> {
    const sessionOrUndefined = this._userSession;
    if (
      !sessionOrUndefined ||
      !sessionOrUndefined.userId ||
      !sessionOrUndefined.role ||
      !this.roles.includes(sessionOrUndefined.role)
    ) {
      // TODO: should throw an exception, but it seems that express-session
      // doesn't work as expected
      // throw new HttpErrorNoAccessImpl('Access is not permitted');
    }
    return this._handlePrivate(request);
  }
  protected abstract _handlePrivate(request: Request): Promise<R>;
}
