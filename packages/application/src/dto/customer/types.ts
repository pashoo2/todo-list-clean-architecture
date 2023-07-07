import type { UserEntityData, EntityType } from '@react-node-monorepo/domain';
import { type DTOForEntityCommonFields, DTOOmitCommonFields } from '../types';

export type DTOCustomerEntityType = EntityType.Customer;

export interface DTOCustomerEntity
  extends DTOForEntityCommonFields<DTOCustomerEntityType>,
    DTOOmitCommonFields<UserEntityData<EntityType.Customer>> {
  name: string;
  email: string;
}
