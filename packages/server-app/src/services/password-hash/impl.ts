import { hash, compare } from 'bcrypt';
import { ok as assert } from 'assert';

import type { PasswordHash, PasswordHashCompareMethodParameters } from '../types';
import { SALT_ROUNDS } from './const';

export class PasswordHashImpl implements PasswordHash {
  public async calculate(password: string): Promise<string> {
    const hashString = await hash(password, SALT_ROUNDS);

    return hashString;
  }

  public async compare(parameters: PasswordHashCompareMethodParameters): Promise<boolean> {
    const { hash, password } = parameters;

    assert(hash, '"hash" should not be empty');
    assert(typeof hash === 'string', '"hash" should be a string');
    assert(password, '"password" should not be empty');
    assert(typeof password === 'string', '"password" should be a string');

    const result = await compare(password, hash);

    return result;
  }
}
