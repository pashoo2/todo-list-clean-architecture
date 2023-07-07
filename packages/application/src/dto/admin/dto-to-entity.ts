import {
  AdminEntity,
  AdminEntityImpl,
  EmailVOImpl,
  UserNameVOImpl,
} from '@react-node-monorepo/domain';
import { ok as assert } from 'assert';

import type { DTOToEntity } from '../types';
import type { DTOAdminEntity, DTOAdminEntityType } from './types';
import { DTOToEntityAbstractImpl } from '../dto-to-entity-abstract';

export class DTOAdminEntityToEntityImpl
  extends DTOToEntityAbstractImpl<DTOAdminEntityType>
  implements DTOToEntity<DTOAdminEntityType>
{
  public derive(dto: DTOAdminEntity): AdminEntity {
    assert(dto, '"dto" value is not defined');

    const { email, name } = dto;

    const emailVO = new EmailVOImpl(email);
    const nameVO = new UserNameVOImpl(name);

    const entityConstructorParameters: ConstructorParameters<typeof AdminEntityImpl>[0] = {
      ...dto,
      ...this._convertStringsToDatesFromDTOCommonFields(dto),
      email: emailVO,
      name: nameVO,
    };

    return new AdminEntityImpl(entityConstructorParameters);
  }
}
