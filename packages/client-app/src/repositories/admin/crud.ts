import {
  AdminEntityRepositoryCRUDMethodLogInParameters,
  OperationResult,
  DTOAdminEntityFromEntityImpl,
  DTOAdminEntityToEntityImpl,
  AdminEntityRepositoryCRUD,
  AdminEntityRepositoryCRUDMethodCreateParameters,
} from '@react-node-monorepo/application';
import { EntityType, AdminEntity } from '@react-node-monorepo/domain';
import {
  HttpError,
  OperationResultByHttpError,
  RestAPIRequestDescriptionUserLogIn,
  UserRestAPIRequestLogInPayload,
  UserRestAPIResponseLogInPayload,
} from "@react-node-monorepo/infrastructure";

import { type RestAPIService } from "../../services";

  export class AdminEntityRepositoryCRUDImpl implements AdminEntityRepositoryCRUD {
    // TODO: use Dependency Injection
    protected _dtoAdminEntityToEntityImpl = new DTOAdminEntityToEntityImpl();
    protected _dtoAdminEntityFromEntityImpl = new DTOAdminEntityFromEntityImpl();

    constructor(
      protected _restAPIService: RestAPIService,
    ) {}
  
    public async logIn(
      parameters: AdminEntityRepositoryCRUDMethodLogInParameters,
    ) {
      const { email, password } = parameters;
      const payload: UserRestAPIRequestLogInPayload = {
        email: email.email,
        password: password.password,
      }
      const request = new RestAPIRequestDescriptionUserLogIn(payload)
      try {
        const responseSignUpPayload = await this._restAPIService.sendRequest(request) as UserRestAPIResponseLogInPayload // TODO: resolve type cast
        if (responseSignUpPayload.user.type === EntityType.Admin) {
          const adminEntity: AdminEntity = this._dtoAdminEntityToEntityImpl.derive(responseSignUpPayload.user);
          return {
            isSuccess: true,
            result: adminEntity,
          };
        } else {
          throw new Error('The user is not an admin')
        }
      } catch(err) {
        return this._getOperationResult(err);
      }
    }
  
    public async create(
      _parameters: AdminEntityRepositoryCRUDMethodCreateParameters,
    ): Promise<OperationResult<AdminEntity | Error>> {
      throw new Error('Not supported')
    }
  
    public async read(_id: string): Promise<any> {
      throw new Error('Not supported')
    }
  
    public async update(_entity: AdminEntity): Promise<any> {
      throw new Error('Not supported')
    }
  
    public async delete(_id: string): Promise<any> {
      throw new Error('Not supported')
    }

    protected _getOperationResult(err): OperationResult<typeof err> {
      return new OperationResultByHttpError(err as Error | HttpError);
    }
  }
  