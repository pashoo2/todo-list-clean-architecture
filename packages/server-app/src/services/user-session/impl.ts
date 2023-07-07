import { type Session } from 'express-session';
import { ok as assert } from 'assert';

import { UserSessionData, type UserSession } from './types';
import { type UserRole } from '../../types';

export class UserSessionImpl implements UserSession {
  public get userId(): string | undefined {
    return this._userId;
  }
  public get role(): UserRole | undefined {
    return this._role;
  }
  protected _userId?: string;
  protected _role?: UserRole;
  constructor(protected _expressSession: Session) {
    assert(_expressSession, 'Session is not available');

    this._initFromExpressSession(_expressSession);
  }

  public async save(sessionData: UserSessionData): Promise<void> {
    const { role, userId } = sessionData;

    assert(role, '"role" should be defined');
    assert(userId, '"userId" should be defined');

    Object.assign(this._expressSession, sessionData);
    await new Promise<void>((res, rej) =>
      this._expressSession.save((err?: Error) => {
        this._initFromExpressSession(this._expressSession);
        if (err) {
          rej(err);
        } else {
          res();
        }
      }),
    );
  }

  public async destroy(): Promise<void> {
    await new Promise<void>((res, rej) =>
      this._expressSession.destroy((err?: Error) => {
        this._initFromExpressSession(this._expressSession);
        if (err) {
          rej(err);
        } else {
          res();
        }
      }),
    );
  }

  protected _initFromExpressSession(expressSession: Session): void {
    this._userId = (expressSession as unknown as UserSession).userId;
    this._role = (expressSession as unknown as UserSession).role;
  }
}
