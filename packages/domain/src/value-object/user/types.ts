import { ValueObject } from '../types';
import { UserVOType } from './enum';

export interface UserNameVO extends ValueObject<UserVOType.Name> {
  readonly name: string;
}

export interface UserPasswordVO extends ValueObject<UserVOType.Password> {
  readonly password: string;
}
