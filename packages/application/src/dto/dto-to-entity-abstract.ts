import { type Entity, type EntityType } from '@react-node-monorepo/domain';
import type { DTOForEntityCommonFields, DTOToEntity } from './types';
import { DateTimeSerializationServiceImpl, type DateTimeSerializationService } from '../services';

interface DatesDerivedFromStrings<D extends DTOForEntityCommonFields<EntityType>> {
  dateCreated: D['dateCreated'] extends undefined ? undefined : Date;
  dateModified: D['dateModified'] extends undefined ? undefined : Date;
}

export abstract class DTOToEntityAbstractImpl<T extends EntityType> implements DTOToEntity<T> {
  // TODO: use DI to inject the value on the flight.
  protected _dateTimeSerialization: DateTimeSerializationService =
    new DateTimeSerializationServiceImpl();

  abstract derive(dto: DTOForEntityCommonFields<T>, parameters?: unknown): Entity<T>;

  protected _convertStringsToDatesFromDTOCommonFields(
    dto: DTOForEntityCommonFields<T>,
  ): DatesDerivedFromStrings<typeof dto> {
    const { dateCreated, dateModified } = dto;
    return {
      dateCreated: dateCreated ? this._dateTimeSerialization.fromString(dateCreated) : undefined,
      dateModified: dateModified ? this._dateTimeSerialization.fromString(dateModified) : undefined,
    } as DatesDerivedFromStrings<typeof dto>;
  }
}
