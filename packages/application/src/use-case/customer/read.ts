import type { CustomerEntity } from '@react-node-monorepo/domain';

import type { CustomerEntityRepositoryCRUD, OperationResult } from '../../repository';
import type { UseCase } from '../types';

export interface CustomerEntityUseCaseReadImplParameters {
  customerId: string;
}

export type CustomerEntityUseCaseReadImplResult = Promise<CustomerEntity | undefined>;

export class CustomerEntityUseCaseReadImpl
  implements UseCase<CustomerEntityUseCaseReadImplParameters, CustomerEntityUseCaseReadImplResult>
{
  constructor(protected readonly _customerEntityCRUDRepo: CustomerEntityRepositoryCRUD) {}

  public async run(
    parameters: CustomerEntityUseCaseReadImplParameters,
  ): CustomerEntityUseCaseReadImplResult {
    const { customerId } = parameters;

    if (!customerId) {
      throw Error('The "id" is a required parameter');
    }

    const result: OperationResult<CustomerEntity | undefined> =
      await this._customerEntityCRUDRepo.read(customerId);

    if (result.isSuccess === false) {
      throw result.result;
    }
    return result.result;
  }
}
