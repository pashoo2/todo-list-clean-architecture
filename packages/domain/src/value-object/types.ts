export interface ValueObject<T> {
  readonly type: T;
  /**
   * The hash value uniquely identities the value object.
   *
   * @type {string}
   * @memberof ValueObject
   */
  readonly hash: string;
  isEqualTo(vo: ValueObject<T>): boolean;
}
