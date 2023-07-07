import type { AdminEntityRepositoryCRUD, OperationResult } from '../../repository';
import type { UseCase } from '../types';

export interface AdminEntityUseCaseDeleteImplParameters {
  adminId: string;
}

export type AdminEntityUseCaseDeleteImplResult = Promise<void>;

export class AdminEntityUseCaseDeleteImpl
  implements UseCase<AdminEntityUseCaseDeleteImplParameters, AdminEntityUseCaseDeleteImplResult>
{
  constructor(protected readonly _adminEntityCRUDRepo: AdminEntityRepositoryCRUD) {}

  public async run(
    parameters: AdminEntityUseCaseDeleteImplParameters,
  ): AdminEntityUseCaseDeleteImplResult {
    const { adminId } = parameters;

    if (!adminId) {
      throw Error('The "id" is a required parameter');
    }

    const result: OperationResult<void> = await this._adminEntityCRUDRepo.delete(adminId);

    if (!result.isSuccess) {
      throw result.result;
    }
  }
}
