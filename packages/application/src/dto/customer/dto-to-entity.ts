import {
  CustomerEntity,
  EmailVOImpl,
  UserNameVOImpl,
  CustomerEntityImpl,
} from '@react-node-monorepo/domain';
import { ok as assert } from 'assert';

import type { DTOToEntity } from '../types';
import type { DTOCustomerEntity, DTOCustomerEntityType } from './types';
import { DTOToEntityAbstractImpl } from '../dto-to-entity-abstract';

export class DTOCustomerEntityToEntityImpl
  extends DTOToEntityAbstractImpl<DTOCustomerEntityType>
  implements DTOToEntity<DTOCustomerEntityType>
{
  public derive(dto: DTOCustomerEntity): CustomerEntity {
    assert(dto, '"dto" value is not defined');

    const { email, name } = dto;

    const emailVO = new EmailVOImpl(email);
    const nameVO = new UserNameVOImpl(name);

    const entityConstructorParameters: ConstructorParameters<typeof CustomerEntityImpl>[0] = {
      ...dto,
      ...this._convertStringsToDatesFromDTOCommonFields(dto),
      email: emailVO,
      name: nameVO,
    };

    return new CustomerEntityImpl(entityConstructorParameters);
  }
}
