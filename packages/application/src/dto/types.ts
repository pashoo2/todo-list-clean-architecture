import type { Entity, EntityType } from '@react-node-monorepo/domain';

export interface DTOForEntityCommonFields<T extends EntityType> {
  readonly type: T;
  readonly id: string;
  readonly dateCreated?: string;
  readonly dateModified?: string;
}

export type DTOOmitCommonFields<T> = {
  [key in keyof Omit<T, keyof DTOForEntityCommonFields<EntityType>>]:
    | string
    | number
    | boolean
    | null;
};

export interface DTOToEntity<T extends EntityType> {
  derive(dto: DTOForEntityCommonFields<T>): Entity<T>;
}

export type DTOToAggregateIncorporatedEntities = Record<string, unknown>;

export interface DTOToAggregate<
  T extends EntityType,
  D extends DTOToAggregateIncorporatedEntities,
> {
  derive(dto: Omit<DTOForEntityCommonFields<T>, keyof D>, incorporatedEntities: D): Entity<T>;
}

export interface DTOFromEntity<T extends EntityType> {
  derive(entity: Entity<T>): DTOForEntityCommonFields<T>;
}
