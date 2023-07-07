import type { AdminEntity, EmailVO, UserPasswordVO } from '@react-node-monorepo/domain';
import type {
  EntityCRUDRepo,
  EntityListRepo,
  Filter,
  FilterListParameters,
  OperationResultAsync,
} from '../type';

export interface AdminEntityRepositoryCRUDMethodLogInParameters {
  email: EmailVO;
  password: UserPasswordVO;
}

export type AdminEntityRepositoryCRUDMethodLogInResult = OperationResultAsync<AdminEntity | Error>;

export interface AdminEntityRepositoryCRUDMethodCreateParameters {
  admin: AdminEntity;
  password: UserPasswordVO;
}

export interface AdminEntityRepositoryCRUD extends Omit<EntityCRUDRepo<AdminEntity>, 'create'> {
  logIn(
    parameters: AdminEntityRepositoryCRUDMethodLogInParameters,
  ): AdminEntityRepositoryCRUDMethodLogInResult;
  create(
    parameters: AdminEntityRepositoryCRUDMethodCreateParameters,
  ): OperationResultAsync<AdminEntity | Error>;
}

export interface AdminEntityRepositoryListFilterParameters extends FilterListParameters {
  name?: string;
}

export type AdminEntityRepositoryListFilter = Filter<
  Partial<AdminEntityRepositoryListFilterParameters>
>;

export type AdminEntityRepositoryList = EntityListRepo<
  AdminEntity,
  AdminEntityRepositoryListFilter
>;
