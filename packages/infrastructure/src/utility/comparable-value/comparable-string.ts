import { ComparableValue } from './types';

export class ComparableString implements ComparableValue<string> {
  constructor(public readonly value: string) {}
  public isGreaterThan(otherValue: string | ComparableValue<string>): boolean {
    if (typeof otherValue === 'string') {
      return this._isGreaterThanString(otherValue);
    }
    return !otherValue.isGreaterThan(this.value);
  }

  protected _isGreaterThanString(otherValue: string): boolean {
    return this.value.localeCompare(otherValue) > 0;
  }
}
