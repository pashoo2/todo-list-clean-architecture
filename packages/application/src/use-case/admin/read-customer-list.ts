import { CustomerEntity } from '@react-node-monorepo/domain';

import type {
  CustomerEntityRepositoryList,
  CustomerEntityRepositoryListFilter,
  FilterListParameters,
  ListFromStorage,
  OperationResult,
} from '../../repository';
import type { UseCase } from '../types';

export type AdminEntityUseCaseReadCustomerListImplResult = Promise<
  ListFromStorage<CustomerEntity> | Error
>;

export type AdminEntityUseCaseReadCustomerListImplParameters = Partial<FilterListParameters>;

export class AdminEntityUseCaseReadCustomerListImpl
  implements
    UseCase<
      AdminEntityUseCaseReadCustomerListImplParameters,
      AdminEntityUseCaseReadCustomerListImplResult
    >
{
  constructor(
    protected readonly _customerEntityListRepo: CustomerEntityRepositoryList,
    protected readonly _customerEntityListRepoFilter: CustomerEntityRepositoryListFilter,
  ) {}

  public async run(
    parameters: AdminEntityUseCaseReadCustomerListImplParameters,
  ): AdminEntityUseCaseReadCustomerListImplResult {
    const { count, offset } = parameters;
    this._customerEntityListRepoFilter.create({
      count,
      offset,
    });
    const result: OperationResult<ListFromStorage<CustomerEntity>> =
      await this._customerEntityListRepo.read(this._customerEntityListRepoFilter);

    if (!result.isSuccess) {
      return result.result;
    }
    return result.result;
  }
}
