import { ValueObjectAbstractImpl } from '../value-object-abstract';
import { VOType } from '../enum';
import type { EmailVO } from './types';

export class EmailVOImpl extends ValueObjectAbstractImpl<VOType.Email> implements EmailVO {
  public get type(): VOType.Email {
    return VOType.Email;
  }

  public get hash(): string {
    return this._hash;
  }

  protected _hash: string;

  protected readonly _regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  constructor(public readonly email: string) {
    super();
    if (!email) {
      throw new Error('The "email" is required');
    }
    this._validateAgainstRegExp(email);
    this._hash = this._joinHashParts(this.type, email.toLowerCase());
  }

  protected _validateAgainstRegExp(email: string): void {
    if (!this._regex.test(email)) {
      throw new Error('Incorrect email');
    }
  }
}
