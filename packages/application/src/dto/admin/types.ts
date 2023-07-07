import type { UserEntityData, EntityType } from '@react-node-monorepo/domain';
import { type DTOForEntityCommonFields, DTOOmitCommonFields } from '../types';

export type DTOAdminEntityType = EntityType.Admin;

export interface DTOAdminEntity
  extends DTOForEntityCommonFields<DTOAdminEntityType>,
    DTOOmitCommonFields<UserEntityData<EntityType.Admin>> {
  name: string;
  email: string;
}
