import { UserPasswordVOImpl, type AdminEntity } from '@react-node-monorepo/domain';

import { AdminEntityRepositoryCRUD, OperationResult } from '../../repository';
import { UseCase } from '../types';

export interface AdminEntityUseCaseCreateImplParameters {
  admin: AdminEntity;
  password: string;
}

export type AdminEntityUseCaseCreateImplResult = Promise<AdminEntity | Error>;

export class AdminEntityUseCaseCreateImpl
  implements UseCase<AdminEntityUseCaseCreateImplParameters, AdminEntityUseCaseCreateImplResult>
{
  constructor(protected readonly _adminEntityCRUDRepo: AdminEntityRepositoryCRUD) {}

  public async run(
    parameters: AdminEntityUseCaseCreateImplParameters,
  ): AdminEntityUseCaseCreateImplResult {
    const { admin, password } = parameters;

    if (admin.id) {
      throw Error('A newly created instance should have an empty id');
    }

    const passwordVO = new UserPasswordVOImpl(password);

    const result: OperationResult<AdminEntity | Error> = await this._adminEntityCRUDRepo.create({
      admin: admin,
      password: passwordVO,
    });

    if (!result.isSuccess) {
      throw result.result;
    }
    return result.result;
  }
}
