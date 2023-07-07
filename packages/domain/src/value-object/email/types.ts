import type { VOType } from '../enum';
import type { ValueObject } from '../types';

export interface EmailVO extends ValueObject<VOType.Email> {
  readonly email: string;
}
