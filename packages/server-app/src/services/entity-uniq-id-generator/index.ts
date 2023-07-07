import { randomUUID } from 'crypto';
import { type EntityUniqueIdGenerator } from '../types';

export const entityUniqueIdGeneratorImpl: EntityUniqueIdGenerator =
  function generateEntityUniqId(): string {
    return randomUUID();
  };
