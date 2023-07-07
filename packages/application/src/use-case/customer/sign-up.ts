import { UserPasswordVOImpl, CustomerEntity } from '@react-node-monorepo/domain';

import { CustomerEntityRepositoryCRUD, OperationResult } from '../../repository';
import { UseCase } from '../types';

export interface CustomerEntityUseCaseSignUpImplParameters {
  customer: CustomerEntity;
  password: string;
}

export type CustomerEntityUseCaseSignUpImplResult = Promise<CustomerEntity | Error>;

export class CustomerEntityUseCaseSignUpImpl
  implements
    UseCase<CustomerEntityUseCaseSignUpImplParameters, CustomerEntityUseCaseSignUpImplResult>
{
  constructor(protected readonly _customerEntityCRUDRepo: CustomerEntityRepositoryCRUD) {}

  public async run(
    parameters: CustomerEntityUseCaseSignUpImplParameters,
  ): CustomerEntityUseCaseSignUpImplResult {
    const { customer, password } = parameters;

    if (customer.id) {
      throw Error('A newly created instance should have an empty id');
    }

    const passwordVO = new UserPasswordVOImpl(password);

    const result: OperationResult<CustomerEntity | Error> =
      await this._customerEntityCRUDRepo.signUp({
        customer,
        password: passwordVO,
      });

    if (!result.isSuccess) {
      throw result.result;
    }
    return result.result;
  }
}
