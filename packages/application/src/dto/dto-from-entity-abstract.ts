import { Entity, type EntityType } from '@react-node-monorepo/domain';
import type { DTOForEntityCommonFields, DTOFromEntity } from './types';
import { type DateTimeSerializationService, DateTimeSerializationServiceImpl } from '../services';

export interface StringsDerivedFromDates<E extends Entity<EntityType>> {
  dateCreated: E['dateCreated'] extends undefined ? undefined : string;
  dateModified: E['dateModified'] extends undefined ? undefined : string;
}

export abstract class DTOFromEntityAbstractImpl<T extends EntityType> implements DTOFromEntity<T> {
  // TODO: use DI to inject the value on the flight.
  protected _dateTimeSerialization: DateTimeSerializationService =
    new DateTimeSerializationServiceImpl();

  abstract derive(entity: Entity<T>): DTOForEntityCommonFields<T>;

  protected _convertDatesToStringsFromEntity(
    entity: Entity<T>,
  ): StringsDerivedFromDates<typeof entity> {
    const { dateCreated, dateModified } = entity;
    return {
      dateCreated: dateCreated ? dateCreated.toISOString() : undefined,
      dateModified: dateModified ? dateModified.toISOString() : undefined,
    } as StringsDerivedFromDates<typeof entity>;
  }
}
