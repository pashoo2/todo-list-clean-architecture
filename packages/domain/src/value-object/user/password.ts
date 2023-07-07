import { ValueObjectAbstractImpl } from '../value-object-abstract';
import { UserVOType } from './enum';
import { UserPasswordVO } from './types';

const USER_PASSWORD_MIN_LENGTH = 3;

const USER_PASSWORD_MAX_LENGTH = 20;

export class UserPasswordVOImpl
  extends ValueObjectAbstractImpl<UserVOType.Password>
  implements UserPasswordVO
{
  public get type(): UserVOType.Password {
    return UserVOType.Password;
  }

  public get hash(): string {
    return this._hash;
  }

  protected _hash: string;

  constructor(public readonly password: string) {
    super();
    if (!password) {
      throw new Error('The password value is required');
    }
    if (password.length < USER_PASSWORD_MIN_LENGTH) {
      throw new Error(`The password length is at least ${USER_PASSWORD_MIN_LENGTH} characters`);
    }
    if (password.length > USER_PASSWORD_MAX_LENGTH) {
      throw new Error(`The password length is at maximum ${USER_PASSWORD_MAX_LENGTH} characters`);
    }
    this._hash = this._joinHashParts(this.type, password.toLowerCase());
  }
}
