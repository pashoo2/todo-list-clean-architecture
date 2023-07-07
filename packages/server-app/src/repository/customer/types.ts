import { type DTOCustomerEntity } from '@react-node-monorepo/application';

export interface CustomerDataWithPassword extends DTOCustomerEntity {
  // TODO: it should be a hash string derived from a password
  password: string;
}
