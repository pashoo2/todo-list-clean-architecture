import type { UserPasswordVO, EmailVO, CustomerEntity } from '@react-node-monorepo/domain';
import type {
  EntityCRUDRepo,
  EntityListRepo,
  Filter,
  FilterListParameters,
  OperationResultAsync,
} from '../type';

export interface CustomerEntityRepositoryCRUDMethodLogInParameters {
  email: EmailVO;
  password: UserPasswordVO;
}

export type CustomerEntityRepositoryCRUDMethodLogInResult = OperationResultAsync<
  CustomerEntity | Error
>;

export interface CustomerEntityRepositoryCRUDMethodSignUpParameters {
  customer: CustomerEntity;
  password: UserPasswordVO;
}

export type CustomerEntityRepositoryCRUDMethodSignUpResult = OperationResultAsync<
  CustomerEntity | Error
>;

export interface CustomerEntityRepositoryCRUD
  extends Omit<EntityCRUDRepo<CustomerEntity>, 'create'> {
  logIn(
    parameters: CustomerEntityRepositoryCRUDMethodLogInParameters,
  ): CustomerEntityRepositoryCRUDMethodLogInResult;
  signUp(
    parameters: CustomerEntityRepositoryCRUDMethodSignUpParameters,
  ): CustomerEntityRepositoryCRUDMethodSignUpResult;
}

export interface CustomerEntityRepositoryListFilterParameters extends FilterListParameters {
  name?: string;
}

export type CustomerEntityRepositoryListFilter = Filter<
  Partial<CustomerEntityRepositoryListFilterParameters>
>;

export type CustomerEntityRepositoryList = EntityListRepo<
  CustomerEntity,
  CustomerEntityRepositoryListFilter
>;
