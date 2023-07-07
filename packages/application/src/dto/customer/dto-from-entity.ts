import { CustomerEntity, EntityType } from '@react-node-monorepo/domain';
import { ok as assert } from 'assert';

import type { DTOFromEntity } from '../types';
import type { DTOCustomerEntity, DTOCustomerEntityType } from './types';
import { DTOFromEntityAbstractImpl } from '../dto-from-entity-abstract';

export class DTOCustomerEntityFromEntityImpl
  extends DTOFromEntityAbstractImpl<DTOCustomerEntityType>
  implements DTOFromEntity<DTOCustomerEntityType>
{
  public derive(entity: CustomerEntity): DTOCustomerEntity {
    assert(entity, '"entity" value is not defined');

    const { id, name, email } = entity;

    const dto: DTOCustomerEntity = {
      id,
      type: EntityType.Customer,
      name: name.name,
      email: email.email,
      ...this._convertDatesToStringsFromEntity(entity),
    };

    return dto;
  }
}
