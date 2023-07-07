import type { EmailVO, UserNameVO } from '../../value-object';
import type { EntityType } from '../enum';
import type { Entity, EntityData } from '../types';

export type UserEntityType = EntityType.Customer | EntityType.Admin;

export interface UserEntityData<T extends UserEntityType> extends EntityData<T> {
  readonly name: UserNameVO;
  readonly email: EmailVO;
}

export interface UserEntity<T extends UserEntityType> extends Entity<T>, UserEntityData<T> {
  setName(name: UserNameVO): void;
}

export type CustomerEntity = UserEntity<EntityType.Customer>;

export type AdminEntity = UserEntity<EntityType.Admin>;
