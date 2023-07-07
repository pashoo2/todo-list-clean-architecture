import { EntityType } from '@react-node-monorepo/domain';
import { ok as assert } from 'assert';

import { DTOForEntityAbstractImpl } from '../dto-for-entity-abstract';
import type { DTOAdminEntity, DTOAdminEntityType } from './types';

export interface DTOAdminEntityImplConstructorParameters extends Omit<DTOAdminEntity, 'type'> {
  name: DTOAdminEntity['name'];
  email: DTOAdminEntity['email'];
}

export class DTOAdminEntityImpl
  extends DTOForEntityAbstractImpl<DTOAdminEntityType>
  implements DTOAdminEntity
{
  public readonly name: DTOAdminEntity['name'];
  public readonly email: DTOAdminEntity['email'];

  constructor(parameters: DTOAdminEntityImplConstructorParameters) {
    super({
      ...parameters,
      type: EntityType.Admin,
    });

    const { name, email } = parameters;

    assert(name, '"name" parameter is not defined');
    assert(email, '"email" parameter is not defined');

    this.name = name;
    this.email = email;
  }
}
