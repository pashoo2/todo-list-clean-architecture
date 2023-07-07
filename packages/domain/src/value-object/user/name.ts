import { ValueObjectAbstractImpl } from '../value-object-abstract';
import { UserVOType } from './enum';
import { UserNameVO } from './types';

export class UserNameVOImpl extends ValueObjectAbstractImpl<UserVOType.Name> implements UserNameVO {
  public get type(): UserVOType.Name {
    return UserVOType.Name;
  }

  public get hash(): string {
    return this._hash;
  }

  protected _hash: string;

  constructor(public readonly name: string) {
    super();
    if (!name) {
      throw new Error('The user name is required');
    }
    this._hash = this._joinHashParts(this.type, name.toLowerCase());
  }
}
