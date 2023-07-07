import { type DTOAdminEntity } from '@react-node-monorepo/application';

export interface AdminDataWithPassword extends DTOAdminEntity {
  // TODO: it should be a hash string derived from a password
  password: string;
}
