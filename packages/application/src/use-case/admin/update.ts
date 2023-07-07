import { type AdminEntity } from '@react-node-monorepo/domain';

import { AdminEntityRepositoryCRUD, OperationResult } from '../../repository';
import type { UseCase } from '../types';

export interface AdminEntityUseCaseUpdateImplParameters {
  admin: AdminEntity;
}

export type AdminEntityUseCaseUpdateImplResult = Promise<void>;

export class AdminEntityUseCaseUpdateImpl
  implements UseCase<AdminEntityUseCaseUpdateImplParameters, AdminEntityUseCaseUpdateImplResult>
{
  constructor(protected readonly _adminEntityCRUDRepo: AdminEntityRepositoryCRUD) {}

  public async run(
    parameters: AdminEntityUseCaseUpdateImplParameters,
  ): AdminEntityUseCaseUpdateImplResult {
    const { admin } = parameters;

    if (!admin.id) {
      throw Error('A newly created instance should have a non empty id');
    }

    const result: OperationResult<void> = await this._adminEntityCRUDRepo.update(admin);

    if (!result.isSuccess) {
      throw result.result;
    }
  }
}
