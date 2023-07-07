import { UserPasswordVOImpl, EmailVOImpl, type CustomerEntity } from '@react-node-monorepo/domain';

import { CustomerEntityRepositoryCRUD, OperationResult } from '../../repository';
import { UseCase } from '../types';

export interface CustomerEntityUseCaseLogInImplParameters {
  email: string;
  password: string;
}

export type CustomerEntityUseCaseLogInImplResult = Promise<CustomerEntity | Error>;

export class CustomerEntityUseCaseLogInImpl
  implements
    UseCase<CustomerEntityUseCaseLogInImplParameters, CustomerEntityUseCaseLogInImplResult>
{
  constructor(protected readonly _customerEntityCRUDRepo: CustomerEntityRepositoryCRUD) {}

  public async run(
    parameters: CustomerEntityUseCaseLogInImplParameters,
  ): CustomerEntityUseCaseLogInImplResult {
    const { email, password } = parameters;

    const emailVO = new EmailVOImpl(email);
    const passwordVO = new UserPasswordVOImpl(password);

    const result: OperationResult<CustomerEntity | Error> =
      await this._customerEntityCRUDRepo.logIn({
        email: emailVO,
        password: passwordVO,
      });

    if (!result.isSuccess) {
      throw result.result;
    }
    return result.result;
  }
}
