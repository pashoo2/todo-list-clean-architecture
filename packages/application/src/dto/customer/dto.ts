import { EntityType } from '@react-node-monorepo/domain';
import { ok as assert } from 'assert';

import { DTOForEntityAbstractImpl } from '../dto-for-entity-abstract';
import type { DTOCustomerEntity, DTOCustomerEntityType } from './types';

export interface DTOCustomerEntityImplConstructorParameters
  extends Omit<DTOCustomerEntity, 'type'> {
  name: DTOCustomerEntity['name'];
  email: DTOCustomerEntity['email'];
}

export class DTOCustomerEntityImpl
  extends DTOForEntityAbstractImpl<DTOCustomerEntityType>
  implements DTOCustomerEntity
{
  public readonly name: DTOCustomerEntity['name'];
  public readonly email: DTOCustomerEntity['email'];

  constructor(parameters: DTOCustomerEntityImplConstructorParameters) {
    super({
      ...parameters,
      type: EntityType.Customer,
    });

    const { name, email } = parameters;

    assert(name, '"name" parameter is not defined');
    assert(email, '"email" parameter is not defined');

    this.name = name;
    this.email = email;
  }
}
