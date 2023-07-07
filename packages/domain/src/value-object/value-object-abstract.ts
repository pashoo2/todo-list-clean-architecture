import type { ValueObject } from './types';

export abstract class ValueObjectAbstractImpl<T> implements ValueObject<T> {
  static HashPartsSeparator = '/';
  abstract readonly type: T;

  abstract readonly hash: string;

  public isEqualTo(vo: ValueObject<T>): boolean {
    return vo.hash === this.hash && vo.type === this.type;
  }

  protected _joinHashParts(...hashParts: string[]): string {
    return hashParts
      .map((hashPart: string): string => hashPart.trim())
      .join(ValueObjectAbstractImpl.HashPartsSeparator);
  }
}
