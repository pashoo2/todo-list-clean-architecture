import type { AdminEntity } from '@react-node-monorepo/domain';

import type { AdminEntityRepositoryCRUD, OperationResult } from '../../repository';
import type { UseCase } from '../types';

export interface AdminEntityUseCaseReadImplParameters {
  adminId: string;
}

export type AdminEntityUseCaseReadImplResult = Promise<AdminEntity | undefined>;

export class AdminEntityUseCaseReadImpl
  implements UseCase<AdminEntityUseCaseReadImplParameters, AdminEntityUseCaseReadImplResult>
{
  constructor(protected readonly _adminEntityCRUDRepo: AdminEntityRepositoryCRUD) {}

  public async run(
    parameters: AdminEntityUseCaseReadImplParameters,
  ): AdminEntityUseCaseReadImplResult {
    const { adminId } = parameters;

    if (!adminId) {
      throw Error('The "id" is a required parameter');
    }

    const result: OperationResult<AdminEntity | undefined> = await this._adminEntityCRUDRepo.read(
      adminId,
    );

    if (result.isSuccess === false) {
      throw result.result;
    }
    return result.result;
  }
}
