import { type CustomerEntity } from '@react-node-monorepo/domain';

import { CustomerEntityRepositoryCRUD, OperationResult } from '../../repository';
import { UseCase } from '../types';

export interface CustomerEntityUseCaseUpdateImplParameters {
  customer: CustomerEntity;
}

export type CustomerEntityUseCaseUpdateImplResult = Promise<void>;

export class CustomerEntityUseCaseUpdateImpl
  implements
    UseCase<CustomerEntityUseCaseUpdateImplParameters, CustomerEntityUseCaseUpdateImplResult>
{
  constructor(protected readonly _customerEntityCRUDRepo: CustomerEntityRepositoryCRUD) {}

  public async run(
    parameters: CustomerEntityUseCaseUpdateImplParameters,
  ): CustomerEntityUseCaseUpdateImplResult {
    const { customer } = parameters;

    if (!customer.id) {
      throw Error('A newly created instance should have a non empty id');
    }

    const result: OperationResult<void> = await this._customerEntityCRUDRepo.update(customer);

    if (!result.isSuccess) {
      throw result.result;
    }
  }
}
