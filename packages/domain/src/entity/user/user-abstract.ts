import { ok as assert } from 'assert';
import type { UserEntity, UserEntityType } from './types';
import { EntityAbstract, type EntityAbstractConstructorParameters } from '../entity-abstract';
import { type EmailVO, type UserNameVO } from '../../value-object';

export interface UserEntityAbstractImplConstructorParameters
  extends EntityAbstractConstructorParameters {
  name: UserNameVO;
  email: EmailVO;
}

export abstract class UserEntityAbstractImpl<T extends UserEntityType>
  extends EntityAbstract<T>
  implements UserEntity<T>
{
  public get name(): UserNameVO {
    return this._name;
  }
  public get email(): EmailVO {
    return this._email;
  }
  protected _name: UserNameVO;
  protected readonly _email: EmailVO;

  constructor(parameters: UserEntityAbstractImplConstructorParameters) {
    super(parameters);

    const { name, email } = parameters;

    assert(name, 'The user name parameter is required');
    assert(email, 'The name parameter is required');

    this._name = name;
    this._email = email;
  }

  public setName(name: UserNameVO): void {
    this._name = name;
  }
}
