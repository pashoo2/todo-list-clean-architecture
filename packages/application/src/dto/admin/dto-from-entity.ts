import { AdminEntity, EntityType } from '@react-node-monorepo/domain';
import { ok as assert } from 'assert';

import type { DTOFromEntity } from '../types';
import type { DTOAdminEntity, DTOAdminEntityType } from './types';
import { DTOFromEntityAbstractImpl } from '../dto-from-entity-abstract';

export class DTOAdminEntityFromEntityImpl
  extends DTOFromEntityAbstractImpl<DTOAdminEntityType>
  implements DTOFromEntity<DTOAdminEntityType>
{
  public derive(entity: AdminEntity): DTOAdminEntity {
    assert(entity, '"entity" value is not defined');

    const { id, name, email } = entity;

    const dto: DTOAdminEntity = {
      id,
      type: EntityType.Admin,
      name: name.name,
      email: email.email,
      ...this._convertDatesToStringsFromEntity(entity),
    };

    return dto;
  }
}
