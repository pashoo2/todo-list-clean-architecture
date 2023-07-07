import { UserPasswordVOImpl, EmailVOImpl, AdminEntity } from '@react-node-monorepo/domain';

import { AdminEntityRepositoryCRUD, OperationResult } from '../../repository';
import { UseCase } from '../types';

export interface AdminEntityUseCaseLogInImplParameters {
  email: string;
  password: string;
}

export type AdminEntityUseCaseLogInImplResult = Promise<AdminEntity | Error>;

export class AdminEntityUseCaseLogInImpl
  implements UseCase<AdminEntityUseCaseLogInImplParameters, AdminEntityUseCaseLogInImplResult>
{
  constructor(protected readonly _adminEntityCRUDRepo: AdminEntityRepositoryCRUD) {}

  public async run(
    parameters: AdminEntityUseCaseLogInImplParameters,
  ): AdminEntityUseCaseLogInImplResult {
    const { email, password } = parameters;

    const emailVO = new EmailVOImpl(email);
    const passwordVO = new UserPasswordVOImpl(password);

    const result: OperationResult<AdminEntity | Error> = await this._adminEntityCRUDRepo.logIn({
      email: emailVO,
      password: passwordVO,
    });

    if (!result.isSuccess) {
      throw result.result;
    }
    return result.result;
  }
}
