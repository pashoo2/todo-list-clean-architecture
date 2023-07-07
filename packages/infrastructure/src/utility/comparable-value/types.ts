export interface ComparableValue<T> {
  readonly value: T;
  isGreaterThan(otherValue: T | ComparableValue<T>): boolean;
}
